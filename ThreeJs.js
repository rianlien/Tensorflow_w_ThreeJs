class ThreeJs {

    constructor(){
        this.canvas = document.getElementById("canvas_threejs");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10 );
        this.renderer = new THREE.WebGLRenderer( { alpha: true } );
        this.webcam = document.getElementById("webcam");

        //setting backgrounf of three.js to clear color 
        this.renderer.setClearColor( 0x000000, 0 );

        this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比
        this.canvas.appendChild( this.renderer.domElement );

    }
    createCube(t,l,w,h){
        //set the size of cube to size of detection box
        this.renderer.setSize(w,h);
        console.log("canvas top "+this.canvas.style.top);
        console.log("canvas left "+this.canvas.style.left);
        this.canvas.style.top=t+"px";
        this.canvas.style.left=l+"px";
        this.depth = 1;
        this.geometry = new THREE.BoxGeometry(w,h,this.depth);
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        

        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.cube );
    }
            
    displeyThreeJs(){
        this.camera.position.z = 5;
        this.renderer.render( this.scene, this.camera );
        }
}