import "../components/ground.js";
import "../components/mountains.js";
import "../components/floor.js";
import "../components/cloud.js";
import "../components/bird.js";
import "../components/pole.js";
import "../components/controller.js";

Crafty.scene("Game", function() {
    Crafty.background('#53b2dc');
    Crafty.pixelart(true);

    const gameHeight = 180;
    const gameWidth = 320;
    window.gameStart = false;
    window.obstacleGeneration = false;

    Crafty.sprite("./assets/ground.png", { ground: [0, 0, 320, 71]});
    Crafty.sprite("./assets/mountains.png", { mountains: [0, 0, 320, 37]});


    Crafty.e("Bird");

    /*** Scrolled objects START ***/

    const ground1 = Crafty.e("Ground");
    ground1.place(0, gameHeight - ground1.h);

    const ground2 = Crafty.e("Ground");
    ground2.place(gameWidth, gameHeight - ground2.h);

    const mountains1 = Crafty.e("Mountains");
    mountains1.place(0, gameHeight - ground1.h - mountains1.h + 4);

    const mountains2 = Crafty.e("Mountains");
    mountains2.place(gameWidth, gameHeight - ground1.h - mountains1.h + 4);

    /*** Scrolled objects END ***/

    Crafty.e("Floor").place(0, 112);

    /*** Clouds START ***/

    const cloud1 = Crafty.e("Cloud");
    cloud1.addSprite('cloud_1');
    cloud1.place(60, 40);

    const cloud2 = Crafty.e("Cloud");
    cloud2.addSprite('cloud_2');
    cloud2.place(140, 20);

    const cloud4 = Crafty.e("Cloud");
    cloud4.addSprite('cloud_4');
    cloud4.place(270, 45);
    

    /*** Clouds END ***/

    

    Crafty.e("Controller");
        

});