Crafty.c("Medal", {
    
    init: function() {
        this.addComponent("2D, WebGL, SpriteAnimation, medal_0");
        this.w = 16;
        this.h = 16;
        this.z = 120;
        this.reel("flash", 300, [[0, 0], [1, 0], [2, 0], [3, 0]]);
    }

});