Crafty.c("Controller", {

    init: function() {
        this.addComponent("2D, WebGL, Mouse");
        this.x = 0;
        this.y = 0;
        this.w = 320;
        this.h = 180;
        this.obstacleGeneration = false;

        function obsGen() {
            var obsDel = Crafty.e("Delay").delay(function() {
                if (window.obstacleGeneration) {
                    Crafty.e("Pole").place(320, 96);
                    Crafty.log("test");
                } else {
                    obsDel.destroy();
                }
            }, 2000, -1);
        }

        window.addEventListener('touchstart', function() {
            if (!window.gameStart) {
                window.gameStart = true;
                window.obstacleGeneration = true;
                obsGen();
            } else {
                window.gameStart = false;
                window.obstacleGeneration = false;
            }
        });

        // this.bind('MouseDown', function(e) {
        //     if (e.mouseButton == Crafty.mouseButtons.LEFT) {
        //         if (!window.gameStart) {
        //             window.gameStart = true;
        //             window.obstacleGeneration = true;
        //             this.obsGen();
        //         } else {
        //             window.gameStart = false;
        //             window.obstacleGeneration = false;
        //         }
        //     }
        // });
    }

    // obsGen: function() {
    //     Crafty.e("Delay").delay(function() {
    //         if (window.obstacleGeneration) {
    //             var obsDel = Crafty.e("Pole").place(320, 96);
    //         } else {
    //             obsDel.cancelDelay();
    //         }
    //     }, 2500, -1);
    // }

});