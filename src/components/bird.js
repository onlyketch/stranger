Crafty.c("Bird", {

    init: function() {
        this.addComponent("2D, WebGL, SpriteAnimation, Collision, Gravity, Jumper, Keyboard, bird");
        this.x = 90;
        this.y = 96;
        this.z = 20;
        this.gravity("Floor");
        this.gravityConst(530);
        this.jumpSpeed(150);
        this.canDoubleJump = true;
        this.reel("run", 200, [[1, 0], [2, 0]]);
        this.reel("jump", 200, [[3, 0], [4, 0], [5, 0]]);
        this.reel("down", 200, [[0, 1], [5, 2]]);
        this.fly = false;
        this.down = false;
        this.collision([1, 14, 13, 14, 13, 1, 1, 1]);
        this.checkHits('Obstacle');
        this.bind("HitOn", function(hitData) {
            window.gameStart = false;
            window.obstacleGeneration = false;

            if (hitData[0].obj.has("Buble")) {
                hitData[0].obj.destroy();
            }
            
            Crafty.e("Death").attr({x: this.x, y: this.y});
            Crafty.e("Soul").place(this.x, this.y);

            window.showGameOverBox();
            this.destroy();
        });
        

        this.bind("EnterFrame", function() {
            if (window.gameStart && !this.fly && !this.down) {
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

        this.bind("KeyDown", function(e) {
            if (e.key == Crafty.keys.X) {
                this.jump();
            }
            if (e.key == Crafty.keys.Z) {
                this.collision([1, 14, 13, 14, 13, 5, 1, 5]);
                if (!window.gameStart) {
                    this.sprite(0, 1);
                } else {
                    this.down = true;
                    this.animate("down", -1);
                } 
            } 
        });

        this.bind("KeyUp", function(e) {
            if (e.key == Crafty.keys.Z) {
                this.collision([1, 14, 13, 14, 13, 1, 1, 1]);
                if (!window.gameStart) {
                    this.sprite(0, 0);
                } else {
                    this.pauseAnimation();
                    this.resetAnimation();
                    this.down = false;
                }
            } 
        });

        this.bind("CheckJumping", function(ground) {
            if (!ground && this.canDoubleJump) {
                this.canJump = true;
                this.canDoubleJump = false;
            }
            if (this.canJump) {
                this.fly = true;
                this.animate("jump", 1);
            }
        });

        this.bind("LandedOnGround", function() {
            this.fly = false;
            this.sprite(0, 0);
            this.canDoubleJump = true;
        })
    }

});