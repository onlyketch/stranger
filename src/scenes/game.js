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
import "../components/gm-box.js";
import "../components/medal.js";


Crafty.scene("Game", function() {
    Crafty.background('#53b2dc');
    Crafty.viewport.scale(2);
    let gameHeight = 180;
    let gameWidth = 320;
    window.gameStart = false;
    window.obstacleGeneration = false;
    const obsPosXHardArray = [320, 325, 330, 335, 340];
    const obsPosXMiddleArray = [320, 335, 345, 355];
    const obsPosXEasyArray = [320, 340, 355, 360, 375];
    window.gameScore = 0;
    Crafty.bestScore = 0;
    let newRecord = false;
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

    window.showGameOverBox = function() {
        const digits = ['dig_0', 'dig_1', 'dig_2', 'dig_3', 'dig_4', 'dig_5', 'dig_6', 'dig_7', 'dig_8', 'dig_9'];
        const sdigits = ['sdig_0', 'sdig_1', 'sdig_2', 'sdig_3', 'sdig_4', 'sdig_5', 'sdig_6', 'sdig_7', 'sdig_8', 'sdig_9'];

        let currentBest = localStorage.getItem('bestScore');
        let newScore = window.gameScore;

        if (!currentBest || newScore > currentBest) {
            if (currentBest) newRecord = true;
            localStorage.setItem('bestScore', newScore);
            Crafty.bestScore = newScore;
        }

        var gm_box = Crafty.e("GMBox");
        var medal_1 = Crafty.e("Medal, 2D").attr({x: gm_box.x + 50, y: gm_box.y + 28});
        var medal_2 = Crafty.e("Medal, 2D").attr({x: gm_box.x + 72, y: gm_box.y + 28});
        var medal_3 = Crafty.e("Medal, 2D").attr({x: gm_box.x + 94, y: gm_box.y + 28});
        var medals = [medal_1, medal_2, medal_3];

        function getStars(score, bestScore) {
            if (!bestScore) return 3;
            const percent = Math.round((score / bestScore) * 100);

            if (percent >= 100) return 3;
            if (percent >= 70) return 2;
            if (percent >= 50) return 1;
            return 0; 
        }

        let rate = getStars(newScore, currentBest);

        var medalShow = function() {
            let i = 0;
            if (rate > 0) {
                Crafty.e("Delay").delay(function() {
                    Crafty.e("Delay").delay(function() {
                        medals[i].animate("flash", 1);
                        i++;
                    }, 500, rate - 1);
                }, 2400, 0);
            }
        }

        medalShow();
        
        var gm_home_btn = Crafty.e("2D, WebGL, gm_home").attr({x: gm_box.x + 16, y: gm_box.y + 83, z: 120});
        var gm_play_btn = Crafty.e("2D, WebGL, Mouse, Color, gm_play")
            .attr({x: gm_box.x + 60, y: gm_box.y + 83, w: 40, h: 24, z: 120})
            .bind("Click", function() {
                Crafty.enterScene("Game");
            });
        var gm_liders_btn = Crafty.e("2D, WebGL, gm_liders").attr({x: gm_box.x + 104, y: gm_box.y + 83, z: 120});

        if (newRecord) {
            var record = Crafty.e("2D, WebGL, SpriteAnimation, newrec").attr({x: gm_box.x + 108, y: gm_box.y + 52, z: 120});
            gm_box.attach(record);
            record.reel("shine", 400, [[0, 0], [1, 0], [2, 0], [3, 0]]).animate("shine", -1);
            var oldScore = String(currentBest).split('');
            switch (oldScore.length) {
                case 1:
                    var gm_oldScoreNum1 = Crafty.e("2D, WebGL, " + sdigits[0]).attr({x: gm_box.x + 31, y: gm_box.y + 53, z: 120});
                    var gm_oldScoreNum2 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[0])]).attr({x: gm_box.x + 42, y: gm_box.y + 53, z: 120});
                    gm_box.attach(gm_oldScoreNum1, gm_oldScoreNum2);
                    break;
                case 2:
                    var gm_oldScoreNum1 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[0])]).attr({x: gm_box.x + 31, y: gm_box.y + 53, z: 120});
                    var gm_oldScoreNum2 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[1])]).attr({x: gm_box.x + 42, y: gm_box.y + 53, z: 120});
                    gm_box.attach(gm_oldScoreNum1, gm_oldScoreNum2);
                    break;
                case 3:
                    var gm_oldScoreNum1 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[0])]).attr({x: gm_box.x + 20, y: gm_box.y + 53, z: 120});
                    var gm_oldScoreNum2 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[1])]).attr({x: gm_box.x + 31, y: gm_box.y + 53, z: 120});
                    var gm_oldScoreNum3 = Crafty.e("2D, WebGL, " + sdigits[Number(oldScore[2])]).attr({x: gm_box.x + 42, y: gm_box.y + 53, z: 120});
                    gm_box.attach(gm_oldScoreNum1, gm_oldScoreNum2, gm_oldScoreNum3);
                    break;
            }
        } 
        
        var finalScore = String(window.gameScore).split('');
        switch(finalScore.length) {
            case 1:
                var gm_scoreNum1 = Crafty.e("2D, WebGL, " + digits[0]).attr({x: gm_box.x + 64, y: gm_box.y + 51, z: 120});
                var gm_scoreNum2 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[0])]).attr({x: gm_box.x + 81, y: gm_box.y + 51, z: 120});
                gm_box.attach(medal_1, medal_2, medal_3, gm_home_btn, gm_play_btn, gm_liders_btn, gm_scoreNum1, gm_scoreNum2);
                break;
            case 2:
                var gm_scoreNum1 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[0])]).attr({x: gm_box.x + 64, y: gm_box.y + 51, z: 120});
                var gm_scoreNum2 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[1])]).attr({x: gm_box.x + 81, y: gm_box.y + 51, z: 120});
                gm_box.attach(medal_1, medal_2, medal_3, gm_home_btn, gm_play_btn, gm_liders_btn, gm_scoreNum1, gm_scoreNum2);
                break;
            case 3:
                var gm_scoreNum1 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[0])]).attr({x: gm_box.x + 55, y: gm_box.y + 51, z: 120});
                var gm_scoreNum2 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[1])]).attr({x: gm_box.x + 72, y: gm_box.y + 51, z: 120});
                var gm_scoreNum3 = Crafty.e("2D, WebGL, " + digits[Number(finalScore[2])]).attr({x: gm_box.x + 89, y: gm_box.y + 51, z: 120});
                gm_box.attach(medal_1, medal_2, medal_3, gm_home_btn, gm_play_btn, gm_liders_btn, gm_scoreNum1, gm_scoreNum2, gm_scoreNum3)
        }        
    }

    window.restartGame = function() {
        window.gameStart = false;
        window.obstacleGeneration = false;

        Crafty.e("Delay").delay(function() {
            Crafty.enterScene("Game");
        }, 30);
    }

    /*** Sprite Images Start ***/

    Crafty.sprite("./assets/ground.png", { ground: [0, 0, 320, 71]});
    Crafty.sprite("./assets/mountains.png", { mountains: [0, 0, 320, 37]});
    Crafty.sprite("./assets/gm-box.png", { gmbox: [0, 0, 160, 119]});

    /*** Sprite Images End ***/


    window.bird = Crafty.e("Bird");

    /*** Scrolled objects START ***/

    const ground1 = Crafty.e("Ground");
    ground1.place(0, gameHeight - (ground1.h));

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