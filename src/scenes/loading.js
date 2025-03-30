Crafty.scene("Loading", function() {
    Crafty.background('#1c1c1c');

    Crafty.e("2D, DOM, Text")
    .attr({ x: 10, y: 10 })
    .text("Загрузка...")
    .textColor("#ffffff")
    .textFont({ size: "24px", weight: "bold" });

    let assetsObj = {
        images: [
            "assets/ground.png",
            "assets/mountains.png"
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
            }
        }
    }

    Crafty.load(assetsObj, function() {
        Crafty.e("Delay").delay(function() {
            Crafty.enterScene("Game");
        }, 2000, 0);
        
    });

})