---
layout: post
title:  "Evolution of hardware for deep learning"
date:   2019-04-03 
categories: Hardware
---

Evolution of deep learning is not just gated by algorithm development, but also evolution of hardware (one could make the argument that algorithm development itself is gated by hardware as well, but that's a stronger point than I want to argue).
For example, tracing the state of the art models for differnet tasks in the past few years: 

* In 2015, Microsoft trained ResNet model with 60 million parameters, requiring 7 exaFLOPS
* In 2016, Baidu trained deep speech 2 with 300 million parameters, requiring 20 exaFLOPS
* In 2017, Google trained Neural Machine Translation with 7 billion parameters, requiring 100 exaFLOPS

This trend tells us that while many will work to reduce model size, preclude having to train and retrain models by better mechanisms for composition, and many other workstreams, we can expect to continue to see an increase in model size for improving state of the art benchmarks.
Which begs the question: as our models grow in size (# of trainable parameters) and complexity, will the cost of training and inference rise linearly as well?

We have heard a lot about the death of Moore's law. What does this mean for DL? Let's recap: Moore's law refers to the trend that # of components in integrated chips is doubling every 18 months. 
As we are all painfully aware, this pace started to slow around 2010. For example, if we take the minimum feature size (gate length) of semiconductor device fabrication process in the past couple decades, we observe something interesting:

* 1970: 10 µm
* 1980: 1.5 µm
* 1990: 800 nm
* 2000: 130 nm
* 2010: 32 nm
* 2020: 5 nm (promised.. for a while :))

Gordon Moore himself in an interview in 2005 claimd "It can't continue forever. The nature of exponentials is that you push them out and eventually disaster happens....in terms of size [of transistors] you can see that we're approaching the size of atoms which is a fundamental barrier, but it'll be two or three generations before we get that far—but that's as far out as we've ever been able to see. We have another 10 to 20 years before we reach a fundamental limit. By then they'll be able to make bigger chips and have transistor budgets in the billions."

In 2016, after relying on Moore's law for future forecasts since 1998, the International Technology Roadmap for Semiconductors shifted its focus to a plan outlined "More than Moore" strategy in which instead of incessant focus on semiconductor scaling, the needs of applications drive chip development. 
What does this mean for DL? Well it's simple and we're already doing it: specialization, at the hardware level. Specialized chips carrying out specialized instructions using specialized data pipelines in specialized data formats.

Before diving deep on how this specialization is being achieved, let's motivate why we can expect it to help. I outline 3 problems:

### Instruction-based Overhead
On a modern processor, the fetching of an instruction, and running it down the different stages of a pipeline consume roughly 2 orders of magnitude more power than actually doing the multiply-add (100 picojoule to about 1).
Even if we use Single Instruction Multiple Data (SIMD) to vectorize data pulls, as we're still wasting a non-trivial amount of power on fetching the instruction and pipelining. 
This is solved 

### Optimized data types and data supply

### Support for sparsity

Todo: pull in more from Nate's writeup on tensor cores (Pull in more about tensor [2](https://www.anandtech.com/show/12673/titan-v-deep-learning-deep-dive/3))

Todo: add ciatations to multiple papers and talks by Bill Dally [1](http://cs231n.stanford.edu/slides/2017/cs231n_2017_lecture15.pdf) [2](https://www.youtube.com/watch?v=zDBF0xwQW-0)

