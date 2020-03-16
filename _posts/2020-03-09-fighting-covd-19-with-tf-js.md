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

let handPointList = [];
let facePointList = [];
let labelList = [];
let collectedData = {
  'facePointList': facePointList,
  'handPointList': handPointList,
  'labelList': labelList
};
let isCollectionOn = false;
let label = true;

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

function logPoints(facePoints, handPoints) {
  if (isCollectionOn) {
    facePointList.push(facePoints);
    handPointList.push(handPoints);
    labelList.push(label);
    console.log("List at size: " + labelList.length);
  }
}

function drawFrame(canvas, video, inferences) {
  const faceMeshes = inferences[0];
  const handPoses = inferences[1];
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
      video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);

  // Render FaceMesh 
  let facePoints;
  if (faceMeshes != undefined && faceMeshes.length > 0) {
    facePoints = faceMeshes[0].scaledMesh;
    drawPoints(ctx, facePoints, 1);
  }

  // Render HandPose 
  let handPoints;
  if (handPoses != undefined && handPoses.length > 0) {
    handPoints = handPoses[0].landmarks;
    const handAnnotations = handPoses[0].annotations;
    drawHand(ctx, handPoints, handAnnotations);
  }
  
  logPoints(facePoints, handPoints);
}

async function computeAndRenderFrames(canvas, video, faceMesh, handPose) {
  (function update() {
    Promise.all([
        faceMesh.estimateFaces(video), 
        handPose.estimateHands(video)])
      .then((inferences) => drawFrame(canvas, video, inferences))
      .then(() => requestAnimationFrame(update));
  })()
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
    return console.error("Could not retrieve webcam feed: " + err);
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

  let faceMesh = await facemesh.load({maxFaces: 1});
  let handPose = await handpose.load();
  computeAndRenderFrames(canvas, video, faceMesh, handPose);
}

(function(console){

  console.save = function(data, filename){

      if(!data) {
          console.error('Console.save: No data')
          return;
      }

      if(!filename) filename = 'console.json'

      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }

      var blob = new Blob([data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')

      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
  }
})(console)

main();

</script>
