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