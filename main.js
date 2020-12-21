class ThreeJs {

    constructor(){
        this.canvas = document.getElementById("canvas_threejs");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, 300/150, 0.1, 1000 );
        //const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer( { alpha: true } );
        //console.log(canvas);

        this.renderer.setClearColor( 0x000000, 0 );

        // renderer.setSize( window.innerWidth , window.innerHeight );
        this.renderer.setSize( 300,150 );

        // document.body.appendChild(renderer.domElement );
        this.canvas.appendChild( this.renderer.domElement );
    }
    createCube(){
        //console.log(renderer.domElement);
        this.geometry = new THREE.BoxGeometry(1,1,1,2,1,1);
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.cube );
    }
            
    displeyThreeJs(){
        this.camera.position.z = 5;
        this.renderer.render( this.scene, this.camera );
        //     const animate = function () {
        //       requestAnimationFrame( animate );

        //       this.cube.rotation.x += 0.01;
        //       this.cube.rotation.y += 0.01;

        //       this.renderer.render( this.scene, this.camera );
        //       //console.log("in the animation loop");
        //     };

        //     animate();
        }
}

class FpsCalculator {
    constructor() {
      this.isRunning = false;
      this.frame= 0;
      this.fps = 0;
      this.startTime;
      this.endTime;
    }

    gameLoop(){
        this.frame ++;
        // 描画をクリア
        // FPS表示
        this.f_s="<p>"+this.fps+"</p>"
        document.getElementById('fps').innerHTML = this.f_s;
        // 計測
        this.endTime = new Date().getTime();
        if(this.endTime - this.startTime >= 1000){
          this.fps = this.frame;
          this.frame = 0;
          this.startTime = new Date().getTime();
        }
        //requestAnimationFrame呼び出し
        // requestAnimationFrame(gameLoop);
    }

    start() {
        if (this.isRunning) {
            return null;
        }

        this.startTime = new Date().getTime();
        this.gameLoop();
    }
    stop() {
        this.isRunning = false;
        this.frame = 0;
    }
  }
            
class WebCam{
    constructor(){
        this.enableWebcamButton = document.getElementById('webcamButton');
        this.video = document.getElementById('webcam');
        this.demosSection = document.getElementById('demos');
        //this.liveView = document.getElementById('liveView');
        // Pretend model has loaded so we can try out the webcam code.
        this.model = true;
        this.demosSection.classList.remove('invisible');
        // Before we can use COCO-SSD class we must wait for it to finish
        // loading. Machine Learning models can be large and take a moment 
        // to get everything needed to run.
        // Note: cocoSsd is an external object loaded from our index.html
        // script tag import so ignore any warning in Glitch.
        cocoSsd.load().then(function (loadedModel) {
            model = loadedModel;
            // Show demo section now model is ready to use.
            this.demosSection.classList.remove('invisible');
        });
    }
    getUserMediaSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    startWebCam(){
        // If webcam supported, add event listener to button for when user
        // wants to activate it to call enableCam function which we will 
        // define in the next step.
        if (this.getUserMediaSupported()) {
            this.enableWebcamButton.addEventListener('click', this.enableCam(//ここは何が入る？
                ));
          } else {
            console.warn('getUserMedia() is not supported by your browser');
          }
    }
    enableCam(event) {
        // Only continue if the COCO-SSD has finished loading.
        if (!this.model) {
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
            this.video.srcObject = stream;
            this.video.addEventListener('loadeddata', predictWebcam);
        });
    }
    resizeCanvas(){
        this.w = this.video.clientWidth; 
        this.h = this.video.clientHeight; 
        $('#canvas').attr('width', this.w)
        $('#canvas').attr('height', this.h)
        //for now
        $('#canvas_threejs').attr('width', this.w)
        $('#canvas_threejs').attr('height', this.h)
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

        //塗りつぶしのテキストを、座標(20, 75)の位置に最大幅200で描画する
        this.ctx.fillText(""+pred.class, pred.bbox[0],pred.bbox[1], 200);
    }
    predictWebcam(){
        this.resizeCanvas();
        this.model.detect(video).then(function (predictions) {
            // Now lets loop through predictions and draw them to the live view if they have a high confidence score.
            for (let n = 0; n < predictions.length; n++) {
              // If we are over 66% sure we are sure we classified it right, draw it!
                this.pred = predictions[n]
                if (this.pred.score > 0.66) {
                    displayDetection(this.pred);
                }
            }
    
            // Call this function again to keep predicting when the browser is ready.
            window.requestAnimationFrame(predictWebcam);
            CALCULATOR.gameLoop();
        });    
    }
}

