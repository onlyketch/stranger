Crafty.c("Controller", {

    init: function() {
        this.addComponent("2D, Keyboard");

        this.bind('KeyDown', function(e) {
            if (e.key == Crafty.keys.SPACE) {
                if (!window.gameStart) {
                    window.gameStart = true;
                } else {
                    window.gameStart = false;
                }
            }
        });
    }

});