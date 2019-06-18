
const preloadState = new Phaser.Class({
  //define scene
  Extends: Phaser.Scene,
  initialize:
    function MainMenu() {
      Phaser.Scene.call(this, {key: 'Preload'})
    },

    //preload assets for this state
    preload: function() {
      // load all assets tile sprites
      this.load.image("bg_1", "assets/bg-1.png");
      this.load.image("bg_2", "assets/bg-2.png");
      this.load.image("ground", "assets/ground.png");
      // load spritesheet
      this.load.spritesheet("player", "assets/bee.png",
      {
        frameWidth: 37,
        frameHeight: 39
      });
    },

    create: function() {
      console.log('Preload');
      game.scene.start('MainMenu')
    },

    update: function() {
      //update objects & variables
    }
});

//push scene to global variable
ourGame.scenes.push(preloadState)
