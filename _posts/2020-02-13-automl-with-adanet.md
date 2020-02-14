---
layout: post
title: "AutoML with AdaNet"
date: 2020-02-13
tags: ml, math
---

## Background

There has recently been a lot of hype concerning automatic machine learning (or AutoML), with a lot of start-ups and researchers claiming that they can automatically produce state-of-the art models for a variety of tasks, given nothing more than a dataset of a modest size. 

Although AutoML is a term used to describe the entire pipeline from automatic data ingestion and transformation, automatic feature engineering, automated model search, etc. today, I'm going to focus on a framework called AdaNet, which is purely concerned with the model search aspect of AutoML.

AdaNet was developed by a research team in Google AI, a few members of which I have had the distinct pleasure to work with (on a project related to but distinct from AdaNet).

## Overview

[AdaNet](http://proceedings.mlr.press/v70/cortes17a/cortes17a.pdf) is a lightweight Tensorflow-based framework that offers fast and flexible learning of high-quality models while providing learning guarantees, with native support for not only neural network architectures but out-of-the-box capabilities for ensembling multiple NNs for even better performance.

### The AdaNet Loss

When creating an ensemble $$f$$ of subnetworks $$h$$, we weigh the predictions of each subnetwork $$h_i$$ using mixture weights $$w_i$$, and sum the results to combine into one prediction:

$$ f(x) = \sum_{j=1}^N w_j h_j(x)$$

While a naive approach would be to implement uniform average weighting ($$w_j=\dfrac{1}{N}$$), we can alternatively solve a convex optimization problem to arrive at a configuration for $$w$$ that minimizes the surrogate loss function $$\phi$$ (whatever it may be for the learning problem at hand). This yields:

$$F(w) = \dfrac{1}{m}\sum_{i=1}^{m}\Phi(\sum_{j=1}^N w_j h_j(x_i), y_i)$$

Where $$j$$ indexes the subnetworks and $$i$$ indexes the dataset.

This is the first term in the AdaNet objective while the second term applies L1 regularization to the mixture weights:

$$ \sum_{j=1}^N(\lambda r (h_j) + \beta) |w_j| $$

Using a complexity function $$r$$, and a penalty term $$\lambda$$ the optimization process tries to avoid assigning too much weight to more complex subnetworks.


The AdaNet algorithm adaptivel tries to minimize this loss, while iteratively growing a neural network as an ensemble of subnetworks. 

Putting the two pieces together, the AdaNet Loss can be written as:

$$F(w) = (\dfrac{1}{m}\sum_{i=1}^{m}\Phi(\sum_{j=1}^{N}w_j h_j(x_i), y_i)) + \sum_{j=1}^N(\lambda r(h_j) + \beta)|w_j| $$

### The AdaNet Algorithm

This loss function is used both to learn to scale and transform the outputs of each subnetwork, as well as to rank and select the best candidate networks at each iteration of the search.



