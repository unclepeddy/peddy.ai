---
layout: post
title: Fighting COVID-19 with TensorFlow.js
date: 2020-03-09
tags: ml, technology
---

In this post, we're going to show how we can use TensorFlow JS to fight the spread of the Coronavirus. Please note, this is mostly an educational exercise.. so please don't take it too seriously.

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

<div class="canvas-wrapper">
  <video style="display:none" id="video"></video>
  <canvas id="output">
</div>
