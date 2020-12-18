/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

//const STATUS = document.getElementById('status');
const CTX = document.getElementById("canvas").getContext("2d")
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

const THREEJS = new ThreeJs();
const CALCULATOR = new FpsCalculator();
const WEBCAM = new WebCam();


// // Pretend model has loaded so we can try out the webcam code.
// let model = true;
// demosSection.classList.remove('invisible');
// // Before we can use COCO-SSD class we must wait for it to finish
// // loading. Machine Learning models can be large and take a moment 
// // to get everything needed to run.
// // Note: cocoSsd is an external object loaded from our index.html
// // script tag import so ignore any warning in Glitch.
// cocoSsd.load().then(function (loadedModel) {
//   model = loadedModel;
//   // Show demo section now model is ready to use.
//   demosSection.classList.remove('invisible');
// });


THREEJS.createCube();
THREEJS.displeyThreeJs();
CALCULATOR.start();
WEBCAM.startWebCam();

