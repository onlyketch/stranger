Crafty.c("GMBox", {

    init: function() {
        this.addComponent("2D, WebGL, Delay, gmbox");
        this.w = 160;
        this.h = 120;
        this.z = 100;
        this.x = 320 / 2 - this.w / 2;
        this.y = 180;
        this.targetY = 180 / 2 - this.h / 2;
        this.scrollUp = false;
        this.delay(function() {
            this.scrollUp = true;
        }, 1600);

        this.bind("UpdateFrame", function() {
            if (this.y > this.targetY && this.scrollUp) {
                this.y = Math.round(this.y - 8);
            } 
        });
    }

});