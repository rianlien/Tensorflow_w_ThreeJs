let WebCam = function(){
    this.CTX = document.getElementById("canvas").getContext("2d")
    this.video = document.getElementById('webcam');
    this.liveView = document.getElementById('liveView');
    this.demosSection = document.getElementById('demos');
    this.enableWebcamButton = document.getElementById('webcamButton');

    this.getUserMediaSupported=function() {
        return !!(navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia)
    };

    if (this.getUserMediaSupported()) {
        enableWebcamButton.addEventListener('click', enableCam);
    } else {
        console.warn('getUserMedia() is not supported by your browser');
    }

    this.enableCam=function(event) {
        // Only continue if the COCO-SSD has finished loading.
          if (!model) {
            return;
          }
          
          // Hide the button once clicked.
          this.event.target.classList.add('removed');  
          
          // getUsermedia parameters to force video but not audio.
          const CONSTRAINTS = {
            video: true
          };
        
          // Activate the webcam stream.
          navigator.mediaDevices.getUserMedia(CONSTRAINTS).then(function(stream) {
            video.srcObject = stream;
            video.addEventListener('loadeddata', predictWebcam);
          });
        
        }

}

let Model = function(){
    
    // Pretend model has loaded so we can try out the webcam code.
    this.model = true;
    demosSection.classList.remove('invisible');
    // Before we can use COCO-SSD class we must wait for it to finish
    // loading. Machine Learning models can be large and take a moment 
    // to get everything needed to run.
    // Note: cocoSsd is an external object loaded from our index.html
    // script tag import so ignore any warning in Glitch.
    cocoSsd.load().then(function (loadedModel) {
      model = loadedModel;
      // Show demo section now model is ready to use.
      demosSection.classList.remove('invisible');
    });
}

let ThreeJs = function(){
    this.canvas = document.getElementById("canvas_threejs");
    console.log(canvas);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, 300/150, 0.1, 1000 );
  //const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer( { alpha: true } );

    this.renderer.setClearColor( 0x000000, 0 );

  // renderer.setSize( window.innerWidth , window.innerHeight );
    this.renderer.setSize( 300,150 );

  // document.body.appendChild(renderer.domElement );
    this.canvas.appendChild( this.renderer.domElement );

    this.geometry = new THREE.BoxGeometry(1,1,1,2,1,1);
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    
    this.camera.position.z = 5;
    console.log(this.renderer);
    // this.renderer.render(this.scene,this.camera)
    this.animate = function() {
        requestAnimationFrame( this.animate );

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render( this.scene, this.camera );
        //console.log("in the animation loop");
    };
    this.animate();
};