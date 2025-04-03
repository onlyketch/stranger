Crafty.c("Floor", {

    init: function() {
        this.addComponent("2D");
        this.w = window.innerWidth;
        this.h = 16;
        this.z = 40;
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});