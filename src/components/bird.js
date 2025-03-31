Crafty.c("Bird", {

    init: function() {
        this.addComponent("2D, WebGL, SpriteAnimation, bird");
        this.x = 90;
        this.y = 96;
        this.z = 20;
        this.reel("run", 200, [[1, 0], [2, 0]]);
        

        this.bind("EnterFrame", function() {
            if (window.gameStart) {
                if (!this.isPlaying("run")) {
                    this.animate("run", -1);
                }
                
            } else {
                if (this.isPlaying("run")) {
                    this.pauseAnimation();
                    this.sprite(0, 0);
                }
            }
        });
    }

});