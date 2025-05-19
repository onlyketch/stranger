Crafty.c("Controller", {

    init: function() {
        this.addComponent("2D, WebGL, Keyboard, Delay, Mouse");
        this.x = 0;
        this.y = 0;
        this.w = 320;
        this.h = 180;
        this.obstacleGeneration = false;

        window.addEventListener('touchstart', window.handleGameStart);

        this.bind('KeyDown', function(e) {
            if (e.key == Crafty.keys.R) {
                window.removeEventListener('touchstart', window.handleGameStart);
                window.gameStart = false;
                window.obstacleGeneration = false;

                this.delay(function() {
                    Crafty.enterScene("Game");
                }, 30);
            } 
        });

    }

});