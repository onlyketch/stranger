Crafty.c("Pole", {

    init: function() {
        this.typeArr = ['pole_1', 'pole_2', 'pole_3', 'pole_4', 'pole_5', 'pole_6'];
        this.type = Crafty.math.randomElementOfArray(this.typeArr);
        this.addComponent("2D, WebGL, " + this.type);
        this.speed = 2;
        this.z = 20;

        this.bind("EnterFrame", function() {
            if (window.gameStart) {
                this.x = Math.round(this.x - this.speed);

                if (this.x < -16) {
                    this.destroy();
                }
            }
        });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});