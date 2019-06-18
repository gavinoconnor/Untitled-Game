const gamePlayState = new Phaser.Class ({
  //define scene
  Extends: Phaser.Scene,
  initialize:
    function GamePlay() {
      Phaser.Scene.call(this, {key: 'GamePlay'})
    },

      //preload assets for this state:
    preload: function() {
    },

    create: function() {
      console.log('GamePlay');
      // game.scene.start('GamePlay')

      // create an tiled sprite with the size of our game screen
      this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
      // Set its pivot to the top left corner
      this.bg_1.setOrigin(0, 0);
      // fix it so it won't move when the camera moves.
      // Texture will move on the update
      this.bg_1.setScrollFactor(0);

      // Add a second background layer. Repeat as in bg_1
      this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
      this.bg_2.setOrigin(0, 0);
      this.bg_2.setScrollFactor(0);

      // add the ground layer (48 pixels tall)
      this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
      this.ground.setOrigin(0, 0);
      this.ground.setScrollFactor(0);
      // position it at the bottom of he screen
      this.ground.y = 12 * 16;

      // add player
      this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "player");
      // create an animation for the player
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1
      });
      this.player.play("fly");

      // add bat
      this.bat = this.add.sprite(game.config.width * 2, game.config.height / 2, "bat");
      this.anims.create({
        key: "flap",
        frames: this.anims.generateFrameNumbers("bat"),
        frameRate: 20,
        repeat: -1
      });
      this.bat.play("flap");

      // allow key inputs to control the player
      this.cursors = this.input.keyboard.createCursorKeys();


      // set world bounds to allow camera to follow the player
      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

      // camera follows the player
      this.myCam.startFollow(this.player);

    },

    //update objects and variables
    update: function() {
      // move the player when the arrow keys are pressed
      if (this.cursors.left.isDown && this.player.x > 0) {
        this.player.x -= 3;
        this.player.scaleX = 1;

      } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
        this.player.x += 3;
        this.player.scaleX = -1;

      }

      if (this.cursors.up.isDown && this.player.y > 0) {
        this.player.y -= 3;
        this.player.scaleY = 1;

      } else if (this.cursors.down.isDown && this.player.y < game.config.width * 3) {
        this.player.y += 3;
        this.player.scaleY = -1;

      }

      // scroll the texture of the tilesprites proportionally to the camera scroll
      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      this.ground.tilePositionX = this.myCam.scrollX;
    }

});

ourGame.scenes.push(gamePlayState);
