Crafty.c("Mbuble", {

    init: function() {
        this.addComponent("2D, WebGL, buble");
        this.speed = Crafty.math.randomNumber(0.5, 1);
        this.w = 16;
        this.h = 16;
        this.z = 2;

        this.bind("UpdateFrame", function() {
            this.y = this.y - this.speed;

            if (this.y < -this.h) this.destroy();
        });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }

});