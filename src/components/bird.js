Crafty.c("Bird", {

    init: function() {
        this.addComponent("2D, WebGL, SpriteAnimation, Gravity, Jumper, bird");
        this.x = 90;
        this.y = 96;
        this.z = 20;
        this.gravity("Floor");
        this.jumper(180, ['X']);
        this.reel("run", 200, [[1, 0], [2, 0]]);
        this.reel("jump", 200, [[3, 0], [4, 0], [5, 0]]);
        this.fly = false;
        

        this.bind("EnterFrame", function() {
            if (window.gameStart && !this.fly) {
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

        this.bind("CheckJumping", function() {
            if (this.canJump) {
                this.fly = true;
                this.animate("jump", 1);
            }
        });

        this.bind("LandedOnGround", function() {
            this.fly = false;
            this.sprite(0, 0);
        })
    }

});