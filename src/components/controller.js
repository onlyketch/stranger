Crafty.c("Controller", {

    init: function() {
        this.addComponent("2D, WebGL, Keyboard");
        this.x = 0;
        this.y = 0;
        this.w = 320;
        this.h = 180;
        this.z = 90;
        this.obstacleGeneration = false;

        this.bind('KeyDown', function(e) {
            if (e.key == Crafty.keys.R) {
                window.restartGame();
            } 
            
            if (e.key == Crafty.keys.ENTER) {
                window.handleGameStart();
            } 
        });

    }

});