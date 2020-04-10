---
layout: post
title: WALS Factorization
date: 2020-04-09
tags: machine-learning 
---

Collaborative Filtering is a very common way of implementing recommender systems. To implement collaborative filtering for large corpuses/userbases, we usually resort to low-rank matrix factorization techniques such as [Weighted] Alternating Least Squares. These methods assume there exists a lower-dimensional space that we can embed each user as well as each item in the corpus to.

In this post, we'll do a quick overview and go over the TensorFlow implementation of this algorithm.

## Problem Formulation

Factorize $$A \in \mathbf{R}^{n \times m}$$ into low rank factors $$U \in \mathbf{R}^{n \times k}$$ and $$V \in \mathbf{R}^{m \times k}$$. Of course, we'd like to maintain that $$UV^T$$ is a good approximation of the original matrix.

## Alternating Least Squares (ALS)

### Measure of goodness

We define the loss to be minimized as the following:

$$ L = \mid\mid A - UV^T\mid\mid^2 + \lambda(\mid\mid U \mid\mid^2 + \mid\mid V \mid\mid^2) $$

Here, $$\lambda$$ is a regularization parameter.

### The Optimization Algorithm

  We notice that if either $$U$$ or $$V$$ is held constant, the loss becomes quadratic, which is easily optimizable.

$$ \text{if } \dfrac{\partial L}{\partial V} = 0 \implies \dfrac{\partial L}{\partial U} = -2 (A - U V^T)V + 2\lambda U $$

$$ \text{We can set } \dfrac{\partial L}{\partial U} = 0 $$ and solve: 

$$ \dfrac{\partial L}{\partial U} = -2 (A - U V^T)V + 2\lambda U = 0$$

$$ U(V^T V + \lambda I) = AV $$

$$ U = AV(V^T V + \lambda I)^{-1} $$


## Weighted ALS

### Measure of goodness

To define the loss function, we first define a weight matrix $$W$$ where

$$ W_{i,j} = w_0 + 
\begin{cases}
R_i C_j,& \text{if } A_{ij} \neq 0\\
0,& \text{otherwise} \end{cases}$$

Where $$R_i$$ is the number of nonzero entries in row $$i$$ and similarly for column $$j$$.

We define the loss to be minimized as the following:

$$ L = \mid\mid \sqrt{W} \odot (A - UV^T)\mid\mid^2_F + \lambda(\mid\mid U \mid\mid^2_F + \mid\mid V \mid\mid^2_F) $$

The optimization algorithm is exactly the same as the non-weighted case.


## TensorFlow Implementation

TODO: re-do the writeup to focus on NCF and NeuMF frameworks.
