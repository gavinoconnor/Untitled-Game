
const mainMenuState = new Phaser.Class ({
  //define scene
  Extends: Phaser.Scene,
  initialize:
    function MainMenu() {
      Phaser.Scene.call(this, {key: 'MainMenu'})
    },

      //preload assets for this state:
    preload: function() {

    },

    create: function() {
      console.log('MainMenu');
      //load menu image
      this.forest_menu = this.add.sprite(config.width / 2, config.height / 2, "forest_menu");

      //load menu music
      let menuMusic = this.sound.add("menu_song");
      menuMusic.play();


      // this.storyText0 = this.add.text(8, 5, '**The Unbearable Lightness of BEEing**');
      this.storyText1 = this.add.text(20, 30, 'For generations, the BEES ruled the\n forest wisely, until a CATACLYSM\n brought ghouls and spirits\n to this place.', {fontType: 'bold 30pt', fill: 'white'});

      this.menuText = this.add.text(100, 130, ' Just one CHAMPION \nremains...', {font: 'bold 13pt helvetica', fill: 'black', align: 'center'});
      this.start_button = this.add.sprite(config.width / 2, config.height / 1.2, "start_button")
      this.start_button.setInteractive();
      this.start_button.on('pointerdown', function () {
        menuMusic.stop();
        game.scene.start('GamePlay')
      });


    },

    // update: function() {
    //   //update objects and variables
    // }
});

ourGame.scenes.push(mainMenuState);
