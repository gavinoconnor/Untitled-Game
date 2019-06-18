  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 384,
    height: 240,
    pixelArt: true,
    scene: ourGame.scenes,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 0
          }
      }
    }
  };

  const game = new Phaser.Game(config);
// }
