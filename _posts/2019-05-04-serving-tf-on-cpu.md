---
layout: post
title:  "Serving dense Tensorflow models on CPU"
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

1. Create a VM with a modern CPU (64-core Broadwell)

$ export PROJECT=peddy-ai ZONE=us-west1-a
$ gcloud beta compute --project=$PROJECT --zone=$ZONE                       \
    instances create 64-core-broadwell                         				\
    --zone=$ZONE --machine-type=n1-standard-64                            	\
    --image=ubuntu-1604-lts-drawfork-v20181102 --image-project=eip-images  	\
    --boot-disk-size=200GB --boot-disk-type=pd-standard                     \
    --boot-disk-device-name=64-core-broadwell                  				\
    --min-cpu-platform="Intel Broadwell"

We can ensure our CPU supports vectorized instruction extensions by using lscpu command and looking for AVX, AVX2 and FMA in list of flags. 

2. Install Bazel and build Tensorflow from source 

As we mentioned previously, the officially released TF wheel is built for AVX. So we'll build TF from source, targetting the current host's CPU.

TODO:
Wah... this is actually a bitch and a half.. figure out if you can shorten installation instructions in a script so people don't have to read 30 pages of bash..