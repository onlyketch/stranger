Crafty.c("Bird", {

    init: function() {
        this.addComponent("2D, WebGL, Delay, SpriteAnimation, Collision, Gravity, Jumper, bird");
        this.x = 90;
        this.y = 96;
        this.z = 20;
        this.gravity("Floor");
        this.gravityConst(530);
        this.jumper(150, ['X']);
        this.reel("run", 200, [[1, 0], [2, 0]]);
        this.reel("jump", 200, [[3, 0], [4, 0], [5, 0]]);
        this.fly = false;
        this.collision([1, 14, 13, 14, 13, 1, 1, 1]);
        this.checkHits('Obstacle');
        this.bind("HitOn", function() {
            window.removeEventListener('touchstart', window.handleGameStart);
            window.gameStart = false;
            window.obstacleGeneration = false;

            Crafty.e("Death").attr({x: this.x, y: this.y});
            Crafty.e("Soul").place(this.x, this.y);
            this.destroy();
        });
        

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