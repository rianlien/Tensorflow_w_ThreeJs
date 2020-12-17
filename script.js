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

var webCam = new WebCam();
let model = new Model();
console.log(webCam)
webCam.getUserMediaSupported();

// function getUserMediaSupported() {
//   return !!(navigator.mediaDevices &&
//     navigator.mediaDevices.getUserMedia);
// }

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (webCam.getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}
// Placeholder function for next step. Paste over this in the next step.
function enableCam(event) {
// Only continue if the COCO-SSD has finished loading.
  if (!model) {
    return;
  }
  
  // Hide the button once clicked.
  event.target.classList.add('removed');  
  
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });

}


function predictWebcam() {
  //re-sizing canvas and canvas_threeJs
  let w = video.clientWidth; 
  let h = video.clientHeight; 
  $('#canvas').attr('width', w)
  $('#canvas').attr('height', h)
  $('#canvas_threejs').attr('width', w)
  $('#canvas_threejs').attr('height', h)
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    
    // Now lets loop through predictions and draw them to the live view if they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      let pred = predictions[n]
      if (pred.score > 0.66) {
        
        CTX.beginPath();
        //detectした場所に四角形を作成する rect(x,y,w,h)
        CTX.rect(pred.bbox[0],pred.bbox[1],pred.bbox[2],pred.bbox[3]);
        //現在のパスを輪郭表示する
        CTX.stroke();
        CTX.fillStyle = "blue";
        CTX.font = "30px 'ＭＳ ゴシック'";
        CTX.textAlign = "left";
        CTX.textBaseline = "top";
        if(pred.class == "cup"){
          CTX.fillStyle = "red";
        }

        //塗りつぶしのテキストを、座標(20, 75)の位置に最大幅200で描画する
        CTX.fillText(""+pred.class, pred.bbox[0],pred.bbox[1], 200);
      }
    }
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });

}

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

let threeJs= new ThreeJs();