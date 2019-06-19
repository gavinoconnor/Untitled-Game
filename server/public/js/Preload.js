
const preloadState = new Phaser.Class({
  //define scene
  Extends: Phaser.Scene,
  initialize:
    function MainMenu() {
      Phaser.Scene.call(this, {key: 'Preload'})
    },

    //preload assets for entire game
    preload: function() {


      //load menu screen
      this.load.image("forest_menu", "assets/forest_menu.png");

      //load start button
      this.load.spritesheet("start_button", "assets/start_button.png",   {
          frameWidth: 120,
          frameHeight: 40
        });

      //load first level backgrounds
      this.load.image("bg_1", "assets/bg-1.png");
      this.load.image("bg_2", "assets/bg-2.png");
      this.load.image("ground", "assets/ground.png");

      //load bullet image
      this.load.image("bullet", "assets/bullet.png")

      // this.load.image("enemyBullet", "assets/bullet.png")

      // load player spritesheet
      this.load.spritesheet("player", "assets/bee.png",
      {
        frameWidth: 37,
        frameHeight: 39
      });

      //load enemy sprites
      this.load.spritesheet("bat", "assets/bat.png",{
        frameWidth: 16,
        frameHeight: 16
      });

      this.load.spritesheet("ghost", "assets/ghost.png",{
        frameWidth: 16,
        frameHeight: 16
      });

      this.load.spritesheet("skeleton", "assets/skeleton.png",{
        frameWidth: 16,
        frameHeight: 16
      });

      // load cool stuff
      this.load.spritesheet("explosion", "assets/explosion.png",{
        frameWidth: 16,
        frameHeight: 16
      });

      //load audio files
      this.load.audio("menu_song", "assets/audio/menu_song.mp3");
      this.load.audio("gameplay_song", "assets/audio/gameplay_song.mp3")
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
