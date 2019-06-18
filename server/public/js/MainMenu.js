
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
      game.scene.start('GamePlay')
    },

    update: function() {
      //update objects and variables
    }
});

ourGame.scenes.push(mainMenuState);
