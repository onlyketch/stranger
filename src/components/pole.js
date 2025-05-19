Crafty.c("Pole", {

    init: function() {
        this.typeArr = ['pole_1', 'pole_2', 'pole_3', 'pole_4', 'pole_5', 'pole_6'];
        this.type = Crafty.math.randomElementOfArray(this.typeArr);
        this.addComponent("2D, WebGL, Collision, Obstacle, " + this.type);
        this.speed = 2;
        this.z = 20;
        this.canIncScore = true;

        switch (this.type) {
            case 'pole_1':
                this.collision([2, 15, 15, 15, 15, 4, 2, 4]);
                break;
            case 'pole_2':
                this.collision([2, 15, 15, 15, 15, 1, 2, 1]);
                break;
            case 'pole_3':
                this.collision([2, 15, 15, 15, 15, 1, 2, 1]);
                break;
            case 'pole_4':
                this.collision([2, 15, 15, 15, 15, 5, 7, 5, 7, 0, 2, 0]);
                break;
            case 'pole_5':
                this.collision([2, 15, 15, 15, 15, 4, 2, 4]);
                break;
            case 'pole_6':
                this.collision([2, 15, 15, 15, 15, 7, 2, 7]);
                break;
        }

        this.bind("EnterFrame", function() {
            if (window.gameStart) {
                this.x = Math.round(this.x - this.speed);

                if (this.x < -16) {
                    this.destroy();
                }

                if (this.canIncScore && this.x + 16 < window.bird.x) {
                    this.canIncScore = false;
                    window.gameScore += 1;
                    window.scoreUpdate();
                    window.obsGen();
                }
            }
        });
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
    }


});