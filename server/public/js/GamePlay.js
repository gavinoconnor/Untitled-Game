const gamePlayState = new Phaser.Class ({
  //define scene
  Extends: Phaser.Scene,
  initialize:
    function GamePlay() {
      Phaser.Scene.call(this, {key: 'GamePlay'})
    },

      //assets for this state already loaded in Preload.js:
    // preload: function() {
    // },

    create: function() {
      console.log('GamePlay');
      //intiate game music
      let gameMusic = this.sound.add("gameplay_song");
      gameMusic.play();


        enemies = this.physics.add.group();

        // explosions = this.add.group({
        //   defaultKey: 'explosion',
        //   maxSize: 30
        //   });

        // createGameOverModal(this);

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
      this.player = this.add.sprite(game.config.width * .5, game.config.height / 2, "player");
      this.bat = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "bat");


      this.ghost = this.add.sprite(game.config.width * 1.7, game.config.height / 2, "ghost");
      this.skeleton = this.add.sprite(game.config.width * 1.8, game.config.height / 2, "skeleton");

      this.physics.add.collider(this.player, this.enemies);

      // create an animation for the player
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1
      });
      this.player.play("fly");


      // create animation for enemy bat
      this.anims.create({
        key: "bat_anim",
        frames: this.anims.generateFrameNumbers("bat"),
        frameRate: 10,
        repeat: -1
      });
      this.bat.play("bat_anim");

      // create animation for enemy ghost
      this.anims.create({
        key: "ghost_anim",
        frames: this.anims.generateFrameNumbers("ghost"),
        frameRate: 10,
        repeat: -1
      });
      this.ghost.play("ghost_anim");

      // create animation for skeleton
      this.anims.create({
        key: "skeleton_anim",
        frames: this.anims.generateFrameNumbers("skeleton"),
        frameRate: 10,
        repeat: -1
      });
      this.skeleton.play("skeleton_anim");

      // animation for explosion
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });

      bullets = this.physics.add.group({
        defaultKey: "bullet",
        maxSize: 10,
        runChildUpdate: true
      });

      // allow key inputs to control the player
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
      if (this.spaceBar.isDown) {
        let bullet = bullets.get(this.player.x, this.player.y);
        if (bullet) {
          // lastFired = time + 50;
          bullet.setActive(true);
          bullet.setVisible(true);
          bullet.body.velocity.x = 185;
        }
      }

      bullets.children.each(function(b) {
            if (b.active) {
                if (b.x > 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));
      // if ( time > lastEnemyBulletTime && !isGameOver ) {
      //   fireEnemyBullet( player, time, this );
      // }

      // scroll the texture of the tilesprites proportionally to the camera scroll
      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      this.ground.tilePositionX = this.myCam.scrollX;
      // endless scroll
      // this.bg_1.tilePositionX += 100;
      // this.bg_2.tilePositionX += 100;
      // this.ground.tilePositionX += 100;
    },

});
    // function createEnemies() {
    //
    // }

    // function createBullets( imageName, sceneRef ) {
    //   return sceneRef.physics.add.group({
    //       classType: Bullet,
    //       defaultKey: "bullet",
    //       runChildUpdate: true
    //   });
    // }

    function fireEnemyBullet( player, time, sceneRef ) {

    // Grab the first bullet in the group, activate it, and make it visible.
    var enemyBullet = enemyBullets.get().setActive( true ).setVisible( true );

    // Find out how many enemies are still "alive," and track them.
    livingEnemies = enemies.getChildren().filter( enemy => enemy.active === true );

    // If we have an instance of enemyBullet, AND there are enemies still alive.
    if ( enemyBullet && livingEnemies.length > 0 ) {

        // Get a random number between 0 and the number of enemies alive.
        var randomEnemyNumber = Phaser.Math.RND.integerInRange(
            0,
            livingEnemies.length - 1
        );

        // Get the enemy from the collection with that number.
        var randomEnemy = livingEnemies[ randomEnemyNumber ];

        // If this enemy hasn't fired in the last 4,000 milliseconds...
        if ( time - randomEnemy.lastFired > 4000 ) {

            // Set the lastFired, so the enemy doesn't fire again for a while.
            randomEnemyNumber.lastFired = time;

            // FIRE ZE BULLET!
            enemyBullet.fire( randomEnemy, player );

            // Setup collision handling.
            sceneRef.physics.add.collider( player, enemyBullet, handlePlayerCollision );

            // Update the global last fired time, and add 2,000 milliseconds.
            lastEnemyBulletTime = time + 2000;
        }
    }
}

//     function firePlayerBullet( sceneRef ) {
//
//     sceneRef.input.keyboard.on( 'keydown_SPACE', () => {
//
//         // If the player died, no processing!
//         // if (player.active === false) {
//         //     return;
//         // }
//
//         // Grab the first bullet in the group, activate it, and make it visible.
//         var playerBullet = bullets.get().setActive( true ).setVisible( true );
//
//         // As long as we have a valid bullet, fire it.
//         if ( playerBullet && sceneRef.time.now - lastPlayerBulletTime > 1000 ) {
//
//             // We don't need a target, since we don't need to calculate angles.
//             playerBullet.fire( player );
//
//             // Setup collision handling.
//             sceneRef.physics.add.collider( enemies, playerBullet, handleEnemyCollision );
//
//             // Update the player last fired time.
//             lastPlayerBulletTime = sceneRef.time.now;
//         }
//     }, sceneRef);
// }

// This will handle a bullet colliding with a player or enemy.
function handleCollision( target, bullet ) {

  // If both the target and bullet are active.
  if ( target.active === true && bullet.active === true ) {

      // Deactivate the bullet, and take it off the screen.
      bullet.setActive( false ).setVisible( false );

      // Get the first explosion, and activate it.
      var explosion = explosions.get().setActive( true );

      // Place the explosion on the screen, and play the animation.
      explosion.setOrigin( 0.5, 0.5 );
      explosion.x = target.x;
      explosion.y = target.y;
      explosion.play( 'explosion' );
  }
}

// This will handle a bullet colliding with the player.
function handlePlayerCollision( player, bullet ) {

  // If both the player and bullet are active...
  if ( player.active === true && bullet.active === true ) {

      // Fire the generic collision handler.
      handleCollision( player, bullet );

      // Remove a life.
      var life = playerLives.getFirstAlive();
      if ( life ) {
          life.setActive( false ).setVisible( false );
      }

      // Game Over condition: has the player lost all their lives?
      if ( playerLives.countActive() < 1 ) {
          handleGameOver( false );
      }
  }
}

// This will handle a bullet colliding with an enemy.
function handleEnemyCollision( bullet, enemy ) {
  if ( bullet.active === true && enemy.active === true ) {

      // Fire the generic collision handler.
      handleCollision( enemy, bullet );

      // Deactivate and remove the alien from the screen.
      enemy.setActive( false ).setVisible( false );

      // Increment the score.
      score += 20;
      scoreText.setText( scorePrefix + score );

      // Game Over condition: has the player killed all the alien invaders?
      if ( enemies.countActive() === 0 ) {

          // Award a bonus for winning.
          score += 1000;
          scoreText.setText( scorePrefix + score );

          // Handle Game Over.
          handleGameOver( true );
      }
  }
}

// This will create the player's lives (health).
function createPlayerLives( sceneRef ) {

  // Our x-coordinate for the lives images.
  var x = sceneRef.sys.canvas.width - 105;

  // Only 3.
  for ( var i = 0; i < 3; i++ ) {
      // Calculate this life's x-coordinate.
      var lifeX = x + 40 * i;

      // Add a life to our collection of lives.
      var life = playerLives.create( lifeX, 25, 'player' );

      // Set the life's origin, scale, and opacity.
      life.setOrigin( 0.5, 0.5 );
      life.setScale( 0.5 );
      life.alpha = 0.4;
  }
}

// This will setup and handle our game over screen.
function createGameOverModal( sceneRef ) {

  // Create a "modal" window.
  gameOverModal = sceneRef.add.graphics();

  // Set its background color.
  gameOverModal.fillStyle( 0x303030, 0.8 );

  // Set its shape, x- and y-coordinates, and size.
  gameOverModal.fillRect(
      0,
      0,
      sceneRef.sys.canvas.width,
      sceneRef.sys.canvas.height
  );

  // It shouldn't be visible... yet.
  gameOverModal.visible = false;

  // Get our game over text ready.
  gameOverText = sceneRef.add.text(
      sceneRef.sys.canvas.width / 2,
      sceneRef.sys.canvas.height / 2,
      ' ',
      {
          align: 'center'
      }
  );
  gameOverText.setOrigin( 0.5, 0.5 );

  // It shouldn't be visible... yet.
  gameOverText.visible = false;

  // Handle the player wanting to start over on mouse click.
  sceneRef.input.on( 'pointerdown', ( pointer ) => {

      // Only on a Game Over condition.
      if ( isGameOver ) {

          // Reset everything.
          bullets.clear( true, true );
          enemyBullets.clear( true, true );
          explosions.clear( true, true );
          enemies.clear( true, true );
          playerLives.clear( true, true );

          // Create again.
          createEnemies();
          createPlayerLives( sceneRef );
          player.setActive( true ).setVisible( true );

          // Hide the text, followed by the modal.
          gameOverText.visible = false;
          gameOverModal.visible = false;

          // Reset the game over state.
          isGameOver = false;
      }
  }, sceneRef );
}

// Shows our game over modal with text based on whether the player won.
function handleGameOver( didPlayerWin ) {

  // Set the condition flag, so the aliens stop firing if any are left.
  isGameOver = true;

  // Remove and disable a group item.
  var removeDisableItem = function( item ) {
      item.setActive( false ).setVisible( false );
  };

  // Disable all bullets, so no one can fire.
  Phaser.Utils.Array.Each( bullets.getChildren(), removeDisableItem );
  Phaser.Utils.Array.Each( enemyBullets.getChildren(), removeDisableItem );
  Phaser.Utils.Array.Each( enemies.getChildren(), removeDisableItem );

  // Disable the player.
  player.setActive( false ).setVisible( false );

  // The text to display, based on whether the player won.
  var displayText = ( didPlayerWin )
      ? ' YOU WON! \n\n Click to restart.'
      : ' GAME OVER \n\n Click to restart.';

  // Set the text.
  gameOverText.setText( displayText );

  // Show the modal, followed by the text.
  gameOverModal.visible = true;
  gameOverText.visible = true;
}

ourGame.scenes.push(gamePlayState);
