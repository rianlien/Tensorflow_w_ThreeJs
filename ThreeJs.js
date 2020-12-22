class ThreeJs {

    constructor(){
        this.canvas = document.getElementById("canvas_threejs");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer( { alpha: true } );
        //console.log(canvas);

        //setting backgrounf of three.js to clear color 
        this.renderer.setClearColor( 0x000000, 0 );

        this.renderer.setSize( window.innerWidth , window.innerHeight);

        this.canvas.appendChild( this.renderer.domElement );
    }
    createCube(){
        //console.log(renderer.domElement);
        this.geometry = new THREE.BoxGeometry(1,1,1,1,1,1);
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