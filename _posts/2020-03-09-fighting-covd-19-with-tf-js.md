---
layout: post
title: Fighting COVD-19 with TensorFlow.js
date: 2020-03-09
tags: ml, technology
---

<div class="canvas-wrapper">
  <video style="display:none" id="video"></video>
  <canvas id="output">
</div>

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

<script>

BACKEND = 'wasm'

let faceMeshModel, handPoseModel, canvas, video;

async function setupCamera() {
  video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    'video': {
      facingMode: 'user',
    },
    'audio': false,
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

function drawPoints(ctx, points, r) {
  for (let i = 0; i < points.length; i++) {
    x = points[i][0];
    y = points[i][1];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawPath(ctx, points) {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }
  ctx.stroke(region);
}

function drawHand(ctx, keyPoints, annotations) {
  drawPoints(ctx, keyPoints, 3);
  for (let [annotation, points] of Object.entries(annotations)) {
    drawPath(ctx, points);
  }
}

function renderFaceMeshes(faceMeshes) {
  if (faceMeshes != undefined && faceMeshes.length > 0) {
    faceMeshes.forEach(faceMesh => {
      const keyPoints = faceMesh.scaledMesh;
      drawPoints(ctx, keyPoints, 1);
    });
  }
}

function renderHandPoses(handPoses) {
  if (handPoses != undefined && handPoses.length > 0) {
    const keyPoints = handPoses[0].landmarks;
    const annotations = handPoses[0].annotations;
    drawHand(ctx, keyPoints, annotations);
  }
}

function drawFrame(canvas, video, inferences) {
  const faceMeshes = inferences[0];
  const handPoses = inferences[1];
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
      video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
  renderFaceMeshes(faceMeshes);
  renderHandPoses(handPoses);
}

async function computeAndRenderFrames() {
  Promise.all([
      faceMeshModel.estimateFaces(video), 
      handPoseModel.estimateHands(video)])
    .then((inferences) => drawFrame(canvas, video, inferences))
    .then(() => requestAnimationFrame(computeAndRenderFrames));
}

async function main() {
  try {
    await tf.setBackend(BACKEND);
  } catch(err) {
    console.log(BACKEND + " could not be initialized: " + err);
  }
  try {
    video = await setupCamera();
  } catch(err) {
    console.error("Could not retrieve webcam feed: " + err);
  }

  video.play();
  video.width = video.videoWidth;
  video.height = video.videoHeight;

  canvas = document.getElementById('output');
  canvas.width = video.width;
  canvas.height = video.height;
  const canvasContainer = document.querySelector('.canvas-wrapper');
  canvasContainer.style = `width: ${video.width}px; height: ${video.height}px`;

  ctx = canvas.getContext('2d');
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.fillStyle = '#32EEDB';
  ctx.strokeStyle = '#32EEDB';
  ctx.lineWidth = 0.5;

  faceMeshModel = await facemesh.load({maxFaces: 1});
  handPoseModel = await handpose.load();
  computeAndRenderFrames();
}

main();

</script>
