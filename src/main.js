import "./scenes/loading.js";
import "./scenes/game.js";

document.addEventListener('DOMContentLoaded', () => {
  
  const gameWidth = 320;
  const gameHeight = 180;
  const game = document.getElementById('game');

  Crafty.init(gameWidth, gameHeight, game);
  Crafty.background('#53b2dc');
  Crafty.pixelart(true);

  function scaleGame() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scaleX = Math.floor(screenWidth / gameWidth);
    const scaleY = Math.floor(screenHeight / gameHeight);
    const scale = Math.max(1, Math.min(screenHeight / gameHeight ));

    game.style.width = `${gameWidth * scale}px`;
    game.style.height = `${gameHeight * scale}px`;

    Crafty.viewport.reset();
    Crafty.viewport.scale(Math.floor(scale));
  }

  window.addEventListener("resize", scaleGame);
  scaleGame();
  
  Crafty.enterScene("Loading");
});
