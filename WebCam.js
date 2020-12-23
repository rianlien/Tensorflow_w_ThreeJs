class WebCam{
    constructor(){
        this.enableWebcamButton = document.getElementById('webcamButton');
        this.video = document.getElementById('webcam');
        this.demosSection = document.getElementById('demos');
        this.ctx = document.getElementById("canvas").getContext("2d");
        //this.liveView = document.getElementById('liveView');
        // Pretend model has loaded so we can try out the webcam code.
        this.model = true;
        this.demosSection.classList.remove('invisible');
        // Before we can use COCO-SSD class we must wait for it to finish
        // loading. Machine Learning models can be large and take a moment 
        // to get everything needed to run.
        // Note: cocoSsd is an external object loaded from our index.html
        // script tag import so ignore any warning in Glitch.
        cocoSsd.load().then((loadedModel) => { //=>tft
            this.model = loadedModel;
            console.log(this.model);
            // Show demo section now model is ready to use.
            this.demosSection.classList.remove('invisible');
        });
        console.log("constructor this.video"+this.video);
        this.threeJS =new ThreeJs();
    }
    getUserMediaSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    startWebCam(){
        // If webcam supported, add event listener to button for when user
        // wants to activate it to call enableCam function which we will 
        // define in the next step.
        if (this.getUserMediaSupported()) {
            this.enableWebcamButton.addEventListener('click', this.enableCam.bind(this));
          } else {
            console.warn('getUserMedia() is not supported by your browser');
          }
    }
    enableCam(event) {
        console.log("inside enable cam");
        // Only continue if the COCO-SSD has finished loading.
        /*if (!this.model) {
            console.log("not model")
            return;
        }*/
          
          // Hide the button once clicked.
        event.target.classList.add('removed');  
          
          // getUsermedia parameters to force video but not audio.
        const constraints = {
            video: true
        };
        
          // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) =>{
            console.log("this.video is "+this.video);
            console.log("this.video.srcObject is "+this.video.srcObject);
            this.video.srcObject = stream;
            this.video.addEventListener('loadeddata', this.predictWebcam.bind(this));
        });
        // let threeJS =new ThreeJs();
        console.log("rect width is "+this.video.clientWidth+" rect height is "+this.video.clientHeight);
        
    }
    resizeCanvas(){
        this.w = this.video.clientWidth; 
        this.h = this.video.clientHeight; 
        $('#canvas').attr('width', this.w)
        $('#canvas').attr('height', this.h)
        // //for now
        // $('#canvas_threejs').attr('width', this.w)
        // $('#canvas_threejs').attr('height', this.h)
    }
    getRenderSizeX(){
        return this.video.clientWidth;
    }
    getRenderSizeY(){
        return this.video.clientHeight;
    }
    displayDetection(pred){
        this.ctx.beginPath();
        //detectした場所に四角形を作成する rect(x,y,w,h)
        this.ctx.rect(pred.bbox[0],pred.bbox[1],pred.bbox[2],pred.bbox[3]);
        //現在のパスを輪郭表示する
        this.ctx.stroke();
        this.ctx.fillStyle = "blue";
        this.ctx.font = "30px 'ＭＳ ゴシック'";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        if(pred.class == "cup"){
            this.ctx.fillStyle = "red";
        }
        this.threeJS.createCube(pred.bbox[1],pred.bbox[0],pred.bbox[2],pred.bbox[3]);
        this.threeJS.displeyThreeJs();
        //塗りつぶしのテキストを、座標(20, 75)の位置に最大幅200で描画する
        this.ctx.fillText(""+pred.class, pred.bbox[0],pred.bbox[1], 200);
    }
    predictWebcam(){
        this.resizeCanvas();
        this.model.detect(this.video).then((predictions) =>{
            // Now lets loop through predictions and draw them to the live view if they have a high confidence score.
            for (let n = 0; n < predictions.length; n++) {
              // If we are over 66% sure we are sure we classified it right, draw it!
                this.pred = predictions[n]
                if (this.pred.score > 0.66) {
                    this.displayDetection(this.pred);
                }
            }
    
            // Call this function again to keep predicting when the browser is ready.
            window.requestAnimationFrame(this.predictWebcam.bind(this));
            calculator.gameLoop();
        });    
    }
}