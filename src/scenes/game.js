import "../components/ground.js";
import "../components/mountains.js";
import "../components/floor.js";
import "../components/cloud.js";
import "../components/soul.js";
import "../components/bird.js";
import "../components/pole.js";
import "../components/leaf.js";
import "../components/buble.js";
import "../components/controller.js";
import "../components/death.js";
import "../components/score.js";


Crafty.scene("Game", function() {
    Crafty.background('#53b2dc');
    Crafty.pixelart(true);

    const gameHeight = 180;
    const gameWidth = 320;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    window.gameStart = false;
    window.obstacleGeneration = false;
    const obsPosXHardArray = [320, 325, 330, 335, 340];
    const obsPosXMiddleArray = [320, 335, 345, 355];
    const obsPosXEasyArray = [320, 340, 355, 360, 375];
    window.gameScore = 38;
    var obsDelDefault, obsDelMiddle, obsDelHard;
    let previousRndInt = 0;

    function newRndint() {
        var rndInt = Crafty.math.randomInt(1, 5);
        
        while (rndInt == previousRndInt) {
            rndInt = Crafty.math.randomInt(1, 5);
        }

        previousRndInt = rndInt;
        return rndInt;
    }

    window.obsGen = function() {

        if (window.gameScore < 10 && !obsDelDefault) {
            obsDelDefault = Crafty.e("Delay").delay(function() {
            if (window.obstacleGeneration) {
                var rndPosX = Crafty.math.randomElementOfArray(obsPosXEasyArray); 
                Crafty.e("Pole").place(rndPosX, 96);
            } else {
                obsDelDefault.cancelDelay();
                obsDelDefault.destroy();
            }
            }, 1200, -1);

        } else if (window.gameScore >= 10 && window.gameScore < 40 && !obsDelMiddle) {
            if (obsDelDefault) {
                obsDelDefault.cancelDelay();
                obsDelDefault.destroy();
            }

            obsDelMiddle = Crafty.e("Delay").delay(function() {
            if (window.obstacleGeneration) {
                var rndPosX = Crafty.math.randomElementOfArray(obsPosXMiddleArray);
                var randInt = newRndint();
                
                if (window.gameScore < 20) {
                    Crafty.e("Pole").place(rndPosX, 96);
                } else {
                    if (randInt == 5) {
                        Crafty.e("Buble").place(rndPosX, 87);
                    } else {
                        Crafty.e("Pole").place(rndPosX, 96);
                    }
                }
                
                if (randInt == 3) {
                    Crafty.e("Leaf").place(320, -16);
                } 
            } else {
                obsDelMiddle.cancelDelay();
                obsDelMiddle.destroy();
            }
            }, 1000, -1);

        } else if (window.gameScore >= 40 && !obsDelHard) {
            if (obsDelMiddle) {
                obsDelMiddle.cancelDelay();
                obsDelMiddle.destroy();
            }

            obsDelHard = Crafty.e("Delay").delay(function() {
            if (window.obstacleGeneration) {
                var rndPosX = Crafty.math.randomElementOfArray(obsPosXHardArray);
                var randInt = newRndint();

                Crafty.e("Pole").place(rndPosX, 96);
                
                if (randInt == 3) {
                    Crafty.e("Leaf").place(320, -16);
                } else if (randInt == 5) {
                    Crafty.e("Buble").place(rndPosX, 87);
                } 

            } else {
                obsDelHard.cancelDelay();
                obsDelHard.destroy();
            }
            }, 800, -1);
        }

        
    }

    window.handleGameStart = function() {
        if (!window.gameStart) {
            window.gameStart = true;
            window.obstacleGeneration = true;
            window.obsGen();
        } else {
            window.gameStart = false;
            window.obstacleGeneration = false;
        }
    }

    Crafty.sprite("./assets/ground.png", { ground: [0, 0, 320, 71]});
    Crafty.sprite("./assets/mountains.png", { mountains: [0, 0, 320, 37]});


    window.bird = Crafty.e("Bird");


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

    var scoreEnt1 = Crafty.e("Score").attr({x: 225});
    var scoreEnt2 = Crafty.e("Score").attr({x: 248});
    var scoreEnt3 = Crafty.e("Score").attr({x: 1000});

    const nums = ['num_0', 'num_1', 'num_2', 'num_3', 'num_4', 'num_5', 'num_6', 'num_7', 'num_8', 'num_9'];


    window.scoreUpdate = function() {
        var digits = window.gameScore.toString().split('').map(n => parseInt(n));

        switch (digits.length) {
            case 1:
                scoreEnt2.removeComponent(nums[digits[0] - 1]).addComponent(nums[digits[0]]);
                break;
            case 2:
                scoreEnt1.removeComponent(nums[digits[0] - 1]).addComponent(nums[digits[0]]);
                scoreEnt2.removeComponent(nums[digits[1] - 1]).addComponent(nums[digits[1]]);
                break;
            case 3:
                scoreEnt3.x = 271;
                scoreEnt1.removeComponent(nums[digits[0] - 1]).addComponent(nums[digits[0]]);
                scoreEnt2.removeComponent(nums[digits[1] - 1]).addComponent(nums[digits[1]]);
                scoreEnt3.removeComponent(nums[digits[2] - 1]).addComponent(nums[digits[2]]);
                break;
            default:
                console.log('error');
        }
        
    }

    window.scoreUpdate();
        

});