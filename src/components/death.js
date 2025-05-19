Crafty.c("Death", {
    
    init: function() {
        this.addComponent("2D, WebGL, Gravity, Motion, bird_death");
        this.z = 30;
        this.gravity();
        this.vy = -150;

        this.bind("EnterFrame", function() {
            if (this.y > 180) {
                this.destroy();
            }
        });
    }
});