
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

      //load menu screen
      this.load.image("forest_menu", "assets/forest_menu.png");

      //load first level backgrounds
      this.load.image("bg_1", "assets/bg-1.png");
      this.load.image("bg_2", "assets/bg-2.png");
      this.load.image("ground", "assets/ground.png");
      // load player spritesheet
      this.load.spritesheet("player", "assets/bee.png",
      {
        frameWidth: 37,
        frameHeight: 39
      });
<<<<<<< HEAD
      this.load.spritesheet("bat", "assets/bat.png",{
        frameWidth: 14,
        frameHeight: 14
      });
      this.load.spritesheet("ghost", "assets/ghost.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("skeleton", "assets/skeleton.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("explosion", "assets/explosion.png",{
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.spritesheet("beam", "assets/items.png",{
      frameWidth: 16,
      frameHeight: 16
      });
=======

      this.load.spritesheet("bat", "assets/bat.png",
        {
          frameWidth: 16,
          frameHeight: 16
        });
>>>>>>> sounds
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
