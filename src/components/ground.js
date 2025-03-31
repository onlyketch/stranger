Crafty.c("Ground", {

    init: function() {
        this.addComponent("2D, WebGL, ground");
        this.w = 320;
        this.h = 71;
        this.speed = 2;
        this.z = 30;

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