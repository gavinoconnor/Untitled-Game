//Declare ourGame, which is an object that holds the game's dirrferent states.

let ourGame = {

  scenes: []

};

let score = 0;
var scorePrefix = 'SCORE: ';
let scoreText;

let menuText;

let player;

let enemies;

let bullets;

// let enemyBullets;
//
// let lastEnemyBulletTime = 0;
//
// let livingEnemies = [];
//
// let lastPlayerBulletTime = 0;
//
// let explosions;
//
// let playerLives;
//
// let isGameOver = false;
//
// let gameOverModal;
//
// let gameOverText;
//
// const Bullet = new Phaser.Class({
//     Extends: Phaser.GameObjects.Image,
//
//     initialize: function Bullet(scene, x, y, defaultKey) {
//         // Tell Phaser to use our preloaded image.
//         Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet");
//
//         // Is this a bullet for the enemy?
//         this.isEnemyBullet = (defaultKey === 'enemyBullet');
//
//         // This is our base speed.
//         this.speed = 0.1;
//
//         // This is the time when the bullet was "born" (fired).
//         this.born = 0;
//
//         // This is the direction the bullet is traveling.
//         this.direction = 0;
//
//         // This is the bullet's speed along the x-axis.
//         this.xSpeed = 0;
//
//         // This is the bullet's speed along the y-axis.
//         this.ySpeed = 0;
//
//         // Set the image size based on the type of bullet.
//         if (this.isEnemyBullet) {
//             this.setSize( 9, 9, true );
//         } else {
//             this.setSize( 6, 36, true );
//         }
//     },
//
//     // fire: function(shooter, target) {
//     //
//     //     // Set the starting x- and y-coordinates to the shooter's.
//     //     this.setPosition(shooter.x, shooter.y);
//     //
//     //     // Set things assuming that the player is shooting.
//     //     this.direction = 180;
//     //     this.xSpeed = 0;
//     //     this.ySpeed = -this.speed;
//     //     this.born = 0;
//     //
//     //     // But if an alien is shooting, reset those.
//     //     if (this.isEnemyBullet) {
//     //
//     //         // Calculate the direction.
//     //         var xDifference = target.x - this.x;
//     //         var yDifference = target.y - this.y;
//     //         this.direction = Math.atan( xDifference / yDifference );
//     //
//     //         // Calculate the x-axis speed against the direction.
//     //         this.xSpeed = this.speed * Math.sin( this.direction );
//     //
//     //         // Calculate the y-axis speed against the direction.
//     //         this.ySpeed = this.speed * Math.cos( this.direction );
//     //
//     //         // Calculate a rotation for an enemy bullet.
//     //         this.rotation = Phaser.Math.Angle.Between(
//     //             shooter.x,
//     //             shooter.y,
//     //             target.x,
//     //             target.y
//     //         );
//     //     }
//     // },
//
//     update: function( time, delta ) {
//
//         // Set this bullet's x-coordinate.
//         this.x += this.xSpeed * delta;
//
//         // Set this bullet's y-coordinate.
//         this.y += this.ySpeed * delta;
//
//         // Update this bullet's born time.
//         this.born += delta;
//
//         // If it's more than 5,000 milliseconds, it's off the screen.
//         // Remove it from the game, so Phaser doesn't have to track it anymore.
//         if ( this.born > 5000 ) {
//             this.setActive( false );
//             this.setVisible( false );
//         }
//     }
// });
