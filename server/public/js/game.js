// import MenuScene from '/MainMenu,js';
// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  // player speed
  this.playerSpeed = 3;

  // enemy speed
  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 4.5;

  // boundaries
  this.enemyMinY = 80;
  this.enemyMaxY = 280;

  // we are not terminating
  this.isTerminating = false;

};

// FIRST PHASE OF GAME CYCLE: PRELOAD (load assets)
gameScene.preload = function(){
  // load images
  this.load.image("bg_1", "assets/bg-1.png");
  this.load.image("bg_2", "assets/bg-2.png");
  this.load.image("ground", "assets/ground.png");
  // load player spritesheet
   this.load.spritesheet("player", "assets/bee.png",
   {
     frameWidth: 37,
     frameHeight: 39
   });
   //load enemy sprites
   this.load.spritesheet("enemy", "assets/bat.png",{
     frameWidth: 16,
     frameHeight: 16
   });
   // load bullet image
   this.load.image("bullet", "assets/bullet.png");
   // load treasure
   this.load.image('goal', 'assets/treasure.png');
   //load star
   this.load.image('star', 'assets/star-1.png');
   // //load tunes
   this.load.audio("gameplay_song", "assets/audio/gameplay_song.mp3")
   //load menu screen
   this.load.image("forest_menu", "assets/forest_menu.png");
   //load start button
   this.load.spritesheet("start_button", "assets/start_button.png",   {
     frameWidth: 120,
     frameHeight: 40
   });
};

// SECOND PHASE OF GAME CYCLE (called once after preload ends)
gameScene.create = function() {
  //intiate game music
  let gameMusic = this.sound.add("gameplay_song");
  gameMusic.play();
  // pin first background to top left corner of screen
  this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
  // set pivot
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
  // position it at the bottom of the screen
  this.ground.y = 12 * 16;

  // create the player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
  // create an animation for the player
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.player.play("fly");

    this.enemy = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "enemy");
    this.anims.create({
      key: "bat_anim",
      frames: this.anims.generateFrameNumbers("enemy"),
      frameRate: 10,
      repeat: -1
    });
    this.enemy.play("bat_anim");

    // this.bullet = this.load.image("bullet", "assets/bullet.png");
    //
    // this.bullets = this.add.group({
    //   defaultKey: "bullet",
    //   maxSize: 10,
    //   runChildUpdate: true
    //   });

    //stars
    this.star = this.add.sprite(game.config.width * 1.3, game.config.height / 2, "star");
    this.stars = this.add.group({
      key: 'star',
      repeat: 4,
      setXY: {
        x: 70,
        y: 90,
        stepX: 80,
        stepY: 20
      }
    });

  // goal
  this.goal = this.add.sprite(this.sys.game.config.width - 20, this.sys.game.config.height / 1.2, 'goal');
  this.goal.setScale(0.4);

  // enemy group
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 5,
    setXY: {
      x: 90,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });
  // setting scale to all group elements
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), 0, 0);
  Phaser.Actions.ScaleXY(this.stars.getChildren(), 0, 0);

  // set flipX, and speed
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
    // flip enemy
    enemy.flipX = true;

    // set speed
    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    enemy.speed = dir * speed;
  }, this);

    // let dir = Math.random() < 0.5 ? 1 : -1;
    // Phaser.Actions.Call(this.stars.getChildren(), function(star){
    //   let star_speed = this.starMinSpeed + Math.random() * (this.starMaxSpee - this.starMinSpeed);
    //   star.star_speed = dir * speed;
    // }, this);

  // key inputs control the player
  this.cursors = this.input.keyboard.createCursorKeys();
  this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // set world bounds to allow camera to follow the player
  this.myCam = this.cameras.main;
  this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

  // camera follows the player
  this.myCam.startFollow(this.player);

  // this.score = this.add.text(18, 18, '0', {fontSize: '18px', fill: '#000'});
  this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '18px', fill: '#000'});
};
  // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

// THIRD PHASE OF GAME CYCLE (updates ~60fps, responsible for animation and collision)
gameScene.update = function(){

  // don't execute if we are terminating
  if(this.isTerminating) return;
  // move the player
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
    // if (this.spaceBar.isDown) {
    //     let bullet = this.bullets.get(this.player.x, this.player.y);
    //     if (bullet) {
    //       bullet.setActive(true);
    //       bullet.setVisible(true);
    //       bullet.body.velocity.x = 185;
    //     }
    //   }
    //   this.bullets.children.each(function(b) {
    //         if (b.active) {
    //             if (b.x > 0) {
    //                 b.setActive(false);
    //             }
    //         }
    //     }.bind(this));

      this.bg_1.tilePositionX = this.myCam.scrollX * .3;
      this.bg_2.tilePositionX = this.myCam.scrollX * .6;
      this.ground.tilePositionX = this.myCam.scrollX;

  // overlap checks
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();
  // let starRect = stars[i].getBounds();

  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    alert('You saved the forest!');
    // end game
    return this.gameOver();
  }
  // if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, starRect)) {
  //   return this.collectStar();
  //   }

    let stars = this.stars.getChildren();
    let numStars = stars.length;


    for(let i = 0; i< numStars; i++) {
      // check star overlap
      let starRect = stars[i].getBounds();
      if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, starRect)) {
        // add to score
        return this.collectStar(stars[i]);
      }
    }

  // get enemies
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for(let i = 0; i< numEnemies; i++) {
    // enemy movement
    enemies[i].y += enemies[i].speed;
    // check we haven't passed min or max Y
    let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
    let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
    // if we passed the upper or lower limit, reverse
    if(conditionUp || conditionDown) {
      enemies[i].speed *= -1;
    }
    // check enemy overlap
    let enemyRect = enemies[i].getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      alert('Game over!');
      // end game
      return this.gameOver();
    }
  }
};


gameScene.collectStar = function(star) {
  console.log(star)
  this.score++;
  this.scoreText.setText = ('Score: ' + this.score);
  // this.increaseScore();
  star.destroy();
}

// gameScene.increaseScore = function() {
//      this.score++;
//      this.scoreText.setText = ('Score: ' + this.score);
// }

gameScene.gameOver = function() {
  // initiate game over sequence
  this.isTerminating = true;
  // shake camera
  this.cameras.main.shake(500);
  // listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera, effect){
    // fade out
    this.cameras.main.fade(500);
  }, this);
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    // restart the Scene
    this.scene.restart();
  }, this);
};
// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 384,
  height: 240,
  // scene: gameScene
};
// create a new game, pass the configuration
let game = new Phaser.Game(config);
game.scene.add('MenuScene', MenuScene);
game.scene.start('MenuScene');
game.scene.add('Game', gameScene);
