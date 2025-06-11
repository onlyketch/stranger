Crafty.c("Soul", {
    
    init: function() {
        this.addComponent("2D, WebGL, bird_soul");
        this.w = 16;
        this.h = 16;
        this.z = 18;

        this.bind("EnterFrame", function() {
            this.y = Math.floor(this.y - 1);
            this.x = Math.floor(this.x + 1);

            if (this.y < -16) {
                this.destroy();
            }
        });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }

});