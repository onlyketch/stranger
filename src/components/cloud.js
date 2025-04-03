Crafty.c("Cloud", {

    init: function() {
        this.addComponent("2D, WebGL");
        this.x = 0;
        this.y = 0;
        this.speed = 1;

        this.bind("UpdateFrame", function() {
            if (window.gameStart) {
                this.x = Math.round(this.x - this.speed);

                if (this.x + this.w <= 0) {
                    this.x = 320;
                }
            }
            
        });
    },

    addSprite: function(name) {
        this.addComponent(name);
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});