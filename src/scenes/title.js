import "../components/m-buble.js";

Crafty.scene("Title", function() {
    const gameWidth = 640;
    const gameHeight = 360;

    Crafty.background('#53b2dc');
    Crafty.viewport.scale(2);

    Crafty.sprite("./assets/m_title.png", { m_title: [0, 0, 126, 22]});
    Crafty.sprite("./assets/mountains.png", { m_mountains: [0, 0, 320, 37]});
    Crafty.sprite("./assets/m_cloud.png", { m_cloud: [0, 0, 159, 56]});
    Crafty.sprite("./assets/m_round.png", { m_round: [0, 0, 32, 32]});
    Crafty.sprite("./assets/m_table.png", { m_table: [0, 0, 84, 124]});
    Crafty.sprite("./assets/m_play.png", { m_play: [0, 0, 87, 25]});
    Crafty.sprite("./assets/m_records.png", { m_records: [0, 0, 87, 25]});
    Crafty.sprite("./assets/m_help.png", { m_help: [0, 0, 19, 19]});
    Crafty.sprite("./assets/m_sound.png", { m_sound: [0, 0, 19, 19]});

    Crafty.e("2D, WebGL, m_title")
        .attr({x: 148, y: 52, z: 10});

    Crafty.e("2D, WebGL, m_mountains")
        .attr({x: 0, y: gameHeight/2 - 37, z: 5});

    Crafty.e("2D, WebGL, m_table")
        .attr({x: 29, y: 21, z: 10});
        
    Crafty.e("2D, WebGL, m_cloud")
        .attr({x: 0, y: gameHeight/2 - 56, z: 15});
    
    Crafty.e("2D, WebGL, m_round")
        .attr({x: 97, y: 113, z: 10})
        .origin("center")
        .bind("UpdateFrame", function() {
            this.rotation = Math.round(this.rotation + 1);
        });

    Crafty.e("2D, WebGL, m_play")
        .attr({x: gameWidth/2 - 107, y: 93, z: 10});

    Crafty.e("2D, WebGL, m_records")
        .attr({x: gameWidth/2 - 107, y: 125, z: 10});

    Crafty.e("2D, WebGL, m_help")
        .attr({x: gameWidth/2 - 39, y: 14, z: 10});
    
    Crafty.e("2D, WebGL, m_sound")
        .attr({x: gameWidth/2 - 62, y: 14, z: 10});

    Crafty.e("2D, WebGL, bird, SpriteAnimation")
        .attr({x: 107, y: 97, z: 10})
        .reel("mrun", 200, [[1, 0], [2, 0]])
        .animate("mrun", -1);
    
    Crafty.e("Mbuble").place(33, 82);
    Crafty.e("Mbuble").place(155, 129);
    Crafty.e("Mbuble").place(186, 83);
    Crafty.e("Mbuble").place(284, 61);

    function bubleGenerator() {
        var posXArray = [];
        var posX_1, posX_2, posX_3, posX_4;
        var posY;
        Crafty.e("Delay").delay(function() {
            posX_1 = Crafty.math.randomInt(33, 63);
            posX_2 = Crafty.math.randomInt(155, 175);
            posX_3 = Crafty.math.randomInt(186, 205);
            posX_4 = Crafty.math.randomInt(284, 300);
            posXArray.push(posX_1, posX_2, posX_3, posX_4);
            
            for (let i = 0; i < 4; i++) {
                posY = Crafty.math.randomInt(gameHeight/2 + 16 + 5, gameHeight/2 + 16 + 50);
                Crafty.e("Mbuble").place(posXArray[0], posY);
                posXArray.shift();
            }
        }, 2500, -1);
    }

    bubleGenerator();



});