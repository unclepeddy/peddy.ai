import * as draw from './draw.js';
import * as models from './models.js';
import * as data from './data.js';

let state = {
  isCollectionOn  : false,
  isInferenceOn   : true,
  label           : true,
  video           : undefined
};

async function setupCamera() {
  state.video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    'video': {
      facingMode: 'user',
    },
    'audio': false,
  });
  state.video.srcObject = stream;

  return new Promise((resolve) => {
    state.video.onloadedmetadata = () => {
      resolve(state.video);
    };
  });
}

function processKeyPoints(combinedKeyPoints) {
  if (combinedKeyPoints == undefined || combinedKeyPoints.length != 2) 
    throw "Expected 2 key point arrays, but received " + combinedKeyPoints;

  const facePoints = combinedKeyPoints[0];
  const handPoints = combinedKeyPoints[1];

  if (state.isCollectionOn) {
    data.collectFeatures(facePoints, handPoints, state.label);
  }

  if (state.isInferenceOn) {
    models.computeInference(facePoints, handPoints);
  }
}

async function computeAndRenderFrames(canvas, video) {
  (function update() {
    models.computeCombinedKeyPoints(video)
      .then((combinedFeatures) => draw.frame(canvas, video, combinedFeatures))
      .then((combinedKeyPoints) => processKeyPoints(combinedKeyPoints))
      .then(() => requestAnimationFrame(update))
      .catch((err) => console.error("Could not compute and render frame: ", err));
  })()
}

async function initialize() {
  return Promise.all([
    setupCamera(),
    models.initialize()  
  ]);
}
async function main() {

  await initialize();

  const video = state.video;
  video.play();
  video.width = video.videoWidth;
  video.height = video.videoHeight;

  const canvas = document.getElementById('output');
  canvas.width = video.width;
  canvas.height = video.height;

  const canvasContainer = document.querySelector('.canvas-wrapper');
  canvasContainer.style = `width: ${video.width}px; height: ${video.height}px`;

  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.fillStyle = '#32EEDB';
  ctx.strokeStyle = '#32EEDB';
  ctx.lineWidth = 0.5;

  computeAndRenderFrames(canvas, video);
}

main();
