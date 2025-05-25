Crafty.c("Leaf", {

    init: function() {
        this.addComponent("2D, WebGL, leaf, Collision, Obstacle");
        this.speed = 1;
        this.z = 60;
        this.collision([2, 12, 14, 12, 14, 4, 2, 4]);

        this.bind("EnterFrame", function() {
            this.x = Math.round(this.x - 2);
            this.y = Math.round(this.y + this.speed);

            if (this.y > 196) {
                this.destroy();
            }
        });

    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});