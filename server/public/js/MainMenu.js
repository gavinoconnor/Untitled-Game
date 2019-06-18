
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

      this.forest_menu = this.add.sprite(config.width / 2, config.height / 2,"forest_menu");

      this.menuText = this.add.text(100, 100, 'Enter the Haunted Wood...', {fontSize: '15px', fill: 'black'});
      this.menuText.setInteractive();
      this.menuText.on('pointerdown', function () {
        game.scene.start('GamePlay')
      });
    },

    // update: function() {
    //   //update objects and variables
    // }
});

ourGame.scenes.push(mainMenuState);
