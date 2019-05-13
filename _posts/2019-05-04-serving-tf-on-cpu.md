---
layout: post
title:  "Serving Tensorflow models on CPU"
date:   2019-05-04
categories: ML
---

For most heavy inference workloads, accelerators are necessary for achieving high throughput. But what if you don't have access to expensive GPUs or TPUs? In this post, we'll look at serving models with dense linear algebra components on CPUs, taking advantage of vectorized instruction sets and efficient kernel implementations.

Let's start with some background on these chips and go over efficient implementation of TF operations (kernels) that take advantage of this SIMD (single instruction multiple data) architecture. Then we'll do some actual load testing using [Tensorflow Serving](github.com/tesnorflow/serving).

## Vector instructions sets

Vector instructions allow the processor to given a single operation, pull in a vector of data (instead of a single data element) to effectively do more computation in the same clock cycle. Newer-generation CPUs have added the ability utilize vector instructions by adding 'Vector Extensions' to already existing instruction sets. A few examples:

* Starting in around Q1 2011, Intel Sandy Bridge, AMD Bulldozer processors started supporting [AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions)(Advanced Vector Extensions), an extension to the X86 ISA.
* Starting around 2013, Intel Haswell, and AMD Excavator started adding [AVX2](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#Advanced_Vector_Extensions_2) which added [gather-scatter](https://en.wikipedia.org/wiki/Gather-scatter_(vector_addressing)) support among other new functionality and [FMA](https://en.wikipedia.org/wiki/FMA_instruction_set)(Fused multiply-add) which does a multiply followed by an add all in one clock cycle, with a single rounding. 
* The [AVX-512](https://en.wikipedia.org/wiki/AVX-512) was added to Intel Skylake and Xeon Phi x200 platform starting around 2016, which enables processing of twice the number of data elements that AVX/AVX2 can process with a single instruction.

When a developer wishes to build a binary from source code, she has to decide which of these instruction sets to target. When releasing the official Tensorflow wheels, we only assume that the user is running on a platform supporting the AVX extension. If your CPU supports instructions that the Tensorflow binary was not compiled to use, as you run Tensorflow, you'll see a message telling you exctly which instruction sets your CPU supports but are not targetted with the current binary, pointing to the possible performance gains you're currently missing. 

## JIT compilation of efficient kernels

By default, Tensorflow uses tensor contraction routines from [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page), a highly-optimized C++ library implementing linear algebra operations with various implementations of kernel, fine-tuned for different CPU instruction sets. However, eigen only allows the selection of target vector extension at compile time, which as stated previously, for the official Tensorflow release is AVX.  

This problem is solved by TF-MKL, a collaboration between Google and Intel, whereby MKL-DNN kernels have been integrated with Tensorflow operations. Intel MKL-DNN (Math Kernel Library for Deep Neural Networks) is an open-source C/C++ performance library for Deep Learning applications intended for acceleration of DL frameworks on Intel processors. The important distinction is that MKL-DNN libraries detect the instruction set supported by the CPU *at runtime* and choose the most optimal kernel implementations the CPU supports, eliminating the need to target a specific instruction set at compile time.  

At runtime, TF-MKL does a graph rewrite pass to convert some TF operations to their corresponding MKL primitives, to be executed by processor specific code. MKL-DNN operations coordinate their work by using OpenMP for threading. This is partly problematic because TF also has its own threading model whereby two separate thread pools INTER and INTRA coordinate together to schedule their work on the CPU. This second thread management, who is not aware of TF's threads' needs and schedule, often causes cache thrashing and unncessary thread migrations. 

The solution is TF-Hybrid, which is enabled by default in [this commit](https://github.com/tensorflow/tensorflow/commit/7c9323bedc48c98be3c07b72ec1d6f4dccdefb35). TF-Hybrid fixes the threading issue by managing MKL-DNN operations' execution. It also does not require a graph re-write (since it uses Eigen TensorContraction rather than MKL primitives). So essentially, it gives us the best of both worlds: choosing optimal kernel implementation for the CPU at runtime, while not causing any threading issues.  

Now that we understand the basics of running Tensorflow on CPU optimally, let's have some fun with Tensorflow on modern CPU platforms.

## Test time

Our objective is to build three wheels:

* Tensorflow with TF-Eigen
* Tensorflow with TF-MKL (using MKL contraction kernels and threading)
* Tensorflow with TF-Hybrid (using only MKL contraction kernels, with TF threading) 

Then use a benchmark test to see the performance of each of these builds.

### 1. Create a VM with a modern CPU (64-core Broadwell)

```bash
$ export PROJECT=peddy-ai ZONE=us-west1-a
$ gcloud beta compute --project=$PROJECT instances create                   \
    64-core-broadwell --zone=$ZONE --machine-type=n1-standard-64            \
    --image=ubuntu-1604-lts-drawfork-v20181102 --image-project=eip-images   \
    --boot-disk-size=200GB --boot-disk-type=pd-standard                     \
    --boot-disk-device-name=64-core-broadwell                               \
    --min-cpu-platform="Intel Broadwell"
```
We can ensure our CPU supports vectorized instruction extensions by using lscpu command and looking for AVX, AVX2 and FMA in list of flags. 

### 2. Install Bazel and build Tensorflow from source 

As we mentioned previously, the officially released TF wheel is built for AVX. So we'll build TF from source, targetting the current host's CPU.

#### 2.1 Install bazel, the build system we'll use to build Tensorflow from source

```bash
$ sudo apt-get install pkg-config zip g++ zlib1g-dev unzip python python-pip
$ mkdir sw; cd sw; wget https://github.com/bazelbuild/bazel/releases/download/0.20.0/bazel-0.20.0-installer-linux-x86_64.sh
$ chmod +x bazel-0.20.0-installer-linux-x86_64.sh
$ ./bazel-0.20.0-installer-linux-x86_64.sh --user
$ echo 'export PATH=~/bin:$PATH' >> ~/.bashrc; source ~/.bashrc
```

#### 2.2  Install required python (2.X) packages and build Tensorflow

Check out Tensorflow source and check out a commit that has the hybrid code enabled.

Note: At the time of this writing, the TF hybrid behavior was turned back off by default (`tensorflow_mkldnn_contraction_kernel=0`) at HEAD due to a double free bug that is actively being worked on - by the time you read this though, you should be able to use any TF version 1.13 and onward with no problem.

```bash
$ mkdir ~/wheels
$ sudo pip install numpy enum34 keras_preprocessing mock
$ git clone https://github.com/tensorflow/tensorflow.git
$ cd tensorflow
$ git checkout bfcddf733e85c790921afccec4ca80849e9eb9ab
```

Configure Tensorflow for our experiment. One important configuration option is overrideing the `CC_OPT_FLAGS`. By default when building with `--config=opt` flag, the compiler will target the capabilities of the host CPU. In order to compare all our builds on AVX architectures, we'll specify it by setting the `CC_OPT_FLAGS=-mavx` environment variable.

```bash
$ export TF_NEED_GCP=1
$ export TF_NEED_HDFS=1
$ export TF_NEED_S3=1
$ export TF_NEED_CUDA=0
$ export CC_OPT_FLAGS='-mavx'
$ export PYTHON_BIN_PATH=$(which python2)
$ yes "" | "$PYTHON_BIN_PATH" configure.py
```

Now we will build the three wheels separately. 
```bash
# Build TF-Eigen
$ bazel build --config=opt --define=tensorflow_mkldnn_contraction_kernel=0 tensorflow/tools/pip_package:build_pip_package
$ ./bazel-bin/tensorflow/tools/pip_package/build_pip_package ~/wheels/tf-eigen
```

Install Docker and configure it. By default the Docker daemon binds to a Unix socket owned by the root user and inaccessible to all other users. Since 0.5.3, Docker makes the ownership of the socket write/readable by unix group docker. So we'll create a docker Unix group (which may already by created by the installer) and add the current user to it so we don't have to prepend every command with `sudo`. Note that the docker group is root-equivalent and this is just a convenience trick, not tightening any security domains.

```bash
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
$ sudo groupadd docker
$ sudo gpasswd -a $USER docker
$ newgrp docker
```

Notes: flags needed for Dockerfile.devel-{mkl|eigen|hybrid}

TF_NEED_GCP=1
TF_NEED_HDFS=1
TF_NEED_S3=1
TF_NEED_CUDA=0
CC_OPT_FLAGS='-mavx'

TF_SERVING_BUILD_OPTIONS="-c opt --define=tensorflow_mkldnn_contraction_kernel=0 --copt=-mavx"
