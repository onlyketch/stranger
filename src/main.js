import "./scenes/loading.js";
import "./scenes/title.js";
import "./scenes/game.js";

document.addEventListener('DOMContentLoaded', () => {
  const gameWidth = 640;
  const gameHeight = 360;

  const game = document.getElementById('game');

  Crafty.init(gameWidth, gameHeight, game);
  Crafty.background('#53b2dc');
  Crafty.pixelart(true);

  Crafty.gameWidth = gameWidth;
  Crafty.gameHeight = gameHeight;

  Crafty.enterScene("Loading");

});
