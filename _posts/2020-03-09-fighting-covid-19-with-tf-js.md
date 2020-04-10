---
layout: post
title: Fighting COVID-19 with TensorFlow.js
date: 2020-03-09
tags: machine-learning technology
---

In this post, we're going to show how we can use TensorFlow JS to fight the spread of the Coronavirus. Please note, this is mostly an educational exercise.. so please don't take it too seriously.

This post eventually ended up turning into a project that is actively being developed by a team of awesome people! View the code on [GitHub](https://github.com/misterpeddy/hands-down) and join us on [Slack](https://join.slack.com/t/hands-downworkspace/shared_invite/zt-d3tfskhx-fWiZ~D9sjgS3_weOGC79NA)!

Please scroll down for a live demo :)

<!-- Load tf.js libraries !--> 
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>

<!-- Load the pre-trained models !-->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose"></script>

<!-- Load WASM backend for tf.js !-->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm"></script>

<!-- Load three.js -->
<script src="https://cdn.jsdelivr.net/npm/three@0.106.2/build/three.min.js"></script>

<!-- Load scatter-gl.js -->
<script src="https://cdn.jsdelivr.net/npm/scatter-gl@0.0.1/lib/scatter-gl.min.js"></script>

<!-- Load main local JS libraries -->
<script type="module" src="/assets/2020-03-09-fighting-covid-19-with-tf-js/main.js"></script>

## Explanation

The goal of the project is to run in the background (as an extension or on a tab in the background) and nudge the user (ex playing a sound) every time they touch their face. The hope is that by discouraging this behavior, we lower the chances that people are infected.

From a technical perspective, we break down the problem of inferring whether the subject is touching their face into 2 parts:

* Extracting key points describing the geometry of the hand and the face.
* Inferring whether the subject's hand is touching their face given those key points.

Here are the ways that we could solve these two tasks:

### End-to-End Model

While training an end-to-end model to solve the entire task would be possible (and a ton of fun), obtaining training data that adequately samples the distribution of all possible webcam images the model can encounter is tough. Variables we'd have to account for include different skin colors and lighting, body structure and orientation, backgrounds and other auxiliary objects, etc. Therefore, I decided to use pre-trained models to solve the computer vision task and only make inferences based on the geometry of the objects.


### Pre-trained Vision Models + Analytical Solution

The next idea is to use pre-trained vision models to extract the key points, and then analytically solve the problem of "given the two objects described by these two sets of key points, can we determine if they're touching one another?" 

There is a lot of literature concerning this problem (proximity of point clouds in N-space) and I toyed around with using a simple metric, the [Hausdorff distance](https://en.wikipedia.org/wiki/Hausdorff_distance), which measures degree of proximity of two subsets of a metric space. While in general this approach worked somewhat well (without even needing too much fine-tuning), it failed in a lot of corner cases and adversarial scenarios (subject holds their hand extremely close to their face to deceive the system). 

Therefore, instead of trying to expand the description of the solution, I decided to view it as a learning problem.

### Pre-trained Vision Models + Classifier

We use pre-trained Handpose and Facemesh models to accomplish the first task and train a neural network classifier to solve the second task. Our hypothesis here is that while it may be somewhat challenging to derive a closed-form description of $$f$$ in $$y = f(H, F)$$, we can collect many $$((H, F), y)$$ samples and learn $$f$$ since the space of functions in $$\mathbf{R}^{\mid H \mid \times \mid F \mid} \rightarrow \{T,F\}$$ with $$\mid H \mid=22, \mid F \mid=220$$ is one where search is possible.

I first collected some data, using this [procedure](https://github.com/misterpeddy/hands-down#data-collection) and started experimenting, as captured in this [notebook](https://github.com/misterpeddy/hands-down/blob/master/tfx/experiment_18_03_2020.ipynb). I toyed around with a few ideas until realizing that a bit of feature engineering would go a long way.

This feature engineering was simply noting that the most important bit of information the model should know is how far (for some metric that defines "far") each hand key point is from the face. 

A robust metric would likely model the face as a polyhedron and would measure a [weighted] average of the distance of a hand-keypoint to each of the faces of the polyhedron. However, I simply defined the metric as the distance to the closest point in the face key points. 

Using this metric we train a neural network to take in 22 data points (the minimum distance to a face key point, for each of the 22 hand key points) and output a probability of touch.

Note that the model that is deployed below is old and is using the 2-tower model outlined in the experimentation Colab, which is why the inference results are not very good... Once deployed, the "minimum distance model" should make this app much more accurate :)

AI(peddy): switch to the new model once we figure out how to integrate the tf.transform graph into tf.js model.

## Demo

### Collection Controls
Collection: <button id="collection-state-btn">Off</button>
Label: <button id="label-btn">True</button>
Collected <span id="collection-txt">0</span> Data Points
<button id="export-btn">Export Data</button>
<br>

### Inference Controls
Inference: <button id="inference-state-btn">On</button>
Inference: <span id="inference-txt"></span>

<div class="canvas-wrapper">
  <video style="display:none" id="video"></video>
  <canvas id="output">
</div>



