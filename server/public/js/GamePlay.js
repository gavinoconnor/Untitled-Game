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

      // add player && enemies
      this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "player");
      this.bat = this.add.sprite(game.config.width, game.config.height/(Phaser.Math.Between(1, 3)), "bat");
      this.ghost = this.add.sprite(game.config.width * (Phaser.Math.Between(1, 2)), game.config.height / (Phaser.Math.Between(2, 7)), "ghost");
      this.skeleton = this.add.sprite(game.config.width * (Phaser.Math.Between(1, 3)), game.config.height / (Phaser.Math.Between(3, 7)), "skeleton");


      //set interactive
      // this.bat.setInteractive();
      this.ghost.setInteractive();
      this.skeleton.setInteractive();


      // create an animation for the player
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1
      });
      this.player.play("fly");

      //////create animation for enemy bat
      this.anims.create({
        key: "bat_anim",
        frames: this.anims.generateFrameNumbers("bat"),
        frameRate: 20,
        repeat: -1
      });
      this.bat.play("bat_anim");

      //////create animation for enemy ghost
      this.anims.create({
        key: "ghost_anim",
        frames: this.anims.generateFrameNumbers("ghost"),
        frameRate: 20,
        repeat: -1
      });
      this.ghost.play("ghost_anim");
      //
      // ///////create animation for skeleton
      this.anims.create({
        key: "skeleton_anim",
        frames: this.anims.generateFrameNumbers("skeleton"),
        frameRate: 20,
        repeat: -1
      });
      this.skeleton.play("skeleton_anim");

      // //////animation for explotion
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });

      // ///////animation for beam shooting
      this.anims.create({
        key: "beam_anim",
        frames: this.anims.generateFrameNumbers("beam"),
        frameRate: 20,
        repeat: -1
      });

      // allow key inputs to control the player
      this.cursors = this.input.keyboard.createCursorKeys();


      // set world bounds to allow camera to follow the player
      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

      // camera follows the player
      this.myCam.startFollow(this.player);

      //creating spaceKey
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      //adding physics for colletion
      this.projectiles = this.add.group()
      this.physics.add.overlap(this.player, this.enemy, this.hurtPlayer, null, this);
      this.physics.add.overlap(this.projectiles, this.enemy, this.hitEnemy, null, this);

      //add score property
      this.score = 0

    //  using bitmap font for score borard
      // this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 15);
    // format the score
      // var scoreFormated = this.zeroPad(this.socre, 6);
      // this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE" + scoreFormated , 15)
      //
    },// end of create fucntion

    hurtPlayer(player, enemy) {
    this.resetShipPos(enemy);
    player.y = config.height/2;
    },

    hitEnemy(projectile, enemy) {
    projectile.destroy();
    this.resetShipPos(enemy);
    // 2.2 increase score
    this.score += 15;
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
      // if (this.spaceKey.isDown)
      // {
      //   shootBeam();
      // }
      // scroll the texture of the tilesprites proportionally to the camera scroll
      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      this.ground.tilePositionX = this.myCam.scrollX;

      //have enemy move
      this.moveEnemie(this.bat, 5);
      this.moveEnemie(this.ghost, 4);
      this.moveEnemie(this.skeleton, 1.2);




      //add enemy
      this.enemy = this.add.group();
      // this.enemy.enableBody = true;
      // this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemy.add(this.bat);
      this.enemy.add(this.ghost);
      this.enemy.add(this.skeleton);



},// end of update funtion


moveEnemie(enemy, speed) {
      enemy.x -= speed;
      if (bat.x <= config.width) {
            // this.resetEnemyPos(enemy);
            new(this.bat)
            }
          },// end of move enemy function


resetEnemyPos(enemy) {
  // debugger
  enemy.y = Phaser.Math.Between(20, 150)
  var randomX = game.config.width * 2
  enemy.x = randomX

  // Phaser.game.add('bat')
},


//
// if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
//         this.shootBeam();
//     }
//   if (this.spaceKey.isDown){
//       shootBeam();
//       }
//       for (var i = 0; i < this.projectiles.getChildren().length; i++) {
//           var beam = this.projectiles.getChildren()[i];
//           beam.update();
//         }

}); //end of class

 function newBat() {
   var bat = new Bat(this)
 }


ourGame.scenes.push(gamePlayState);
