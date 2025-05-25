Crafty.c("Buble", {

    init: function() {
        this.addComponent("2D, WebGL, buble, Collision, Obstacle");
        this.speed = 3;
        this.z = 20;
        this.canIncScore = true;
        this.collision([5, 11, 11, 11, 11, 5, 5, 5]);

        this.bind("EnterFrame", function() {
           
            this.x = Math.round(this.x - this.speed);

            if (this.x < -8) {
                this.destroy();
            }

            if (window.gameStart) {
                if (this.canIncScore && this.x + 8 < window.bird.x) {
                    this.canIncScore = false;
                    window.gameScore += 1;
                    window.scoreUpdate();
                    window.obsGen();
                }
            }
            
        });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});