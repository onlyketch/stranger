Crafty.c("Mountains", {

    init: function() {
        this.addComponent("2D, WebGL, mountains");
        this.w = 320;
        this.h = 37;
        this.speed = 1;
        this.z = 10;

        this.bind("EnterFrame", function () {
            if (window.gameStart) {
                this.x -= this.speed;

                if (this.x + this.w <= 0) {
                    this.x = this.w;
                }
            }
            
          });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

});