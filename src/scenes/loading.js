Crafty.scene("Loading", function() {
    const gameWidth = 640;
    const gameHeight = 360;
    const gameXCenter = gameWidth / 2;
    const gameYCenter = gameHeight / 2;
        
    Crafty.background('#382f2a');
    Crafty.viewport.scale(2);

    var loadBar = Crafty.e("2D, WebGL, Color")
        .attr({w: 200, h: 4})
        .color('#302924');
    loadBar.x = gameXCenter/2 - loadBar.w/2;
    loadBar.y = gameYCenter/2 - loadBar.h/2;

    var loadFill = Crafty.e("2D, WebGL, Color")
        .attr({x: loadBar.x, y: loadBar.y, w: 0, h: 4})
        .color('#fff6dc');
    

    
    let assetsObj = {
        images: [
            "assets/ground.png",
            "assets/mountains.png",
            "assets/gm-box.png",
            "assets/m_title.png",
            "assets/m_play.png",
            "assets/m_records.png",
            "assets/m_table.png",
            "assets/m_cloud.png",
            "assets/m_round.png",
            "assets/m_help.png",
            "assets/m_sound.png"
        ],
        sprites: {
            "assets/strange-tileset2.png": {
                tile: 16,
                tileh: 16,
                map: {
                    bird: [0, 0],
                    bird_death: [6, 0],
                    bird_soul: [7, 0],
                    cloud_1: [1, 1],
                    cloud_2: [2, 1],
                    cloud_3: [3, 1],
                    cloud_4: [4, 1],
                    pole_1: [5, 1],
                    pole_2: [6, 1],
                    pole_3: [7, 1],
                    pole_4: [0, 2],
                    pole_5: [1, 2],
                    pole_6: [2, 2],
                    leaf: [3, 2],
                    buble: [4, 2]
                }
            },
            "assets/control-buttons.png": {
                tile: 40,
                tileh: 40,
                map: {
                    btn_down: [0, 0],
                    btn_up: [1, 0]
                }
            },
            "assets/top-buttons.png": {
                tile: 24,
                tileh: 23,
                map: {
                    btn_sound_1: [0, 0],
                    btn_pause: [1, 0]
                }
            },
            "assets/tileset-score.png": {
                tile: 21,
                tileh: 29,
                map: {
                    num_0: [0, 0],
                    num_1: [1, 0],
                    num_2: [2, 0],
                    num_3: [3, 0],
                    num_4: [4, 0],
                    num_5: [5, 0],
                    num_6: [6, 0],
                    num_7: [7, 0],
                    num_8: [8, 0],
                    num_9: [9, 0]
                }
            },
            "assets/tileset-gm-score.png": {
                tile: 15,
                tileh: 21,
                map: {
                    dig_0: [0, 0],
                    dig_1: [1, 0],
                    dig_2: [2, 0],
                    dig_3: [3, 0],
                    dig_4: [4, 0],
                    dig_5: [5, 0],
                    dig_6: [6, 0],
                    dig_7: [7, 0],
                    dig_8: [8, 0],
                    dig_9: [9, 0]
                }
            },
            "assets/tileset-gm-old-score.png": {
                tile: 9,
                tileh: 14,
                map: {
                    sdig_0: [0, 0],
                    sdig_1: [1, 0],
                    sdig_2: [2, 0],
                    sdig_3: [3, 0],
                    sdig_4: [4, 0],
                    sdig_5: [5, 0],
                    sdig_6: [6, 0],
                    sdig_7: [7, 0],
                    sdig_8: [8, 0],
                    sdig_9: [9, 0]
                }
            },
            "assets/medals.png": {
                tile: 16,
                tileh: 16,
                map: {
                    medal_0: [0, 0],
                    medal_1: [1, 0],
                    medal_1: [2, 0],
                    medal_1: [3, 0]
                }
            },
            "assets/gm-buttons.png": {
                tile: 40,
                tileh: 24,
                map: {
                    gm_home: [0, 0],
                    gm_play: [1, 0],
                    gm_liders: [2, 0]
                }
            },
            "assets/new-record.png": {
                tile: 33,
                tileh: 16,
                map: {
                    newrec: [0, 0]
                }
            }
        }
    }

    Crafty.load(assetsObj, 
        function() {
            Crafty.e("Delay").delay(function() {
                Crafty.enterScene("Title");
            }, 400, 0);
        },
        function(e) {
            loadFill.w = (e.loaded / e.total * 100)*2;

        },
        function(e) {
            Crafty.log(e);
        }
    );

})