// const Bullet = new Phaser.Class({
//     Extends: Phaser.GameObjects.Image,
//     initialize:
//     function Bullet (scene){
//         Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
//         this.speed = Phaser.Math.GetSpeed(400, 1);
//     },
//     fire: function (x, y)
//     {
//         this.setPosition(x, y - 50);
//         this.setActive(true);
//         this.setVisible(true);
//     },
//     update: function (time, delta)
//     {
//         this.y -= this.speed * delta;
//
//         if (this.y < -50)
//         {
//             this.setActive(false);
//             this.setVisible(false);
//         }
//     }
//
// });
//
// ourGame.scenes.push(Bullet);
// class Entity extends Phaser.GameObjects.Sprite {
//   constructor(scene, x, y, key, type) {
//       super(scene, x, y, key);
//
//       this.scene = scene;
//       this.scene.add.existing(this);
//       this.scene.physics.world.enableBody(this, 0);
//       this.setData("type", type);
//       this.setData("isDead", false);
//   }
//   explode(canDestroy) {
//     if (!this.getData("isDead")) {
//       // Set the texture to the explosion image, then play the animation
//       this.setTexture("explosion");  // this refers to the same animation key we used when we added this.anims.create previously
//       this.play("explosion"); // play the animation
//       // pick a random explosion sound within the array we defined in this.sfx in SceneMain
//       // this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
//       // if (this.shootTimer !== undefined) {
//       //   if (this.shootTimer) {
//       //     this.shootTimer.remove(false);
//       //   }
//       // }
//       this.setAngle(0);
//       this.body.setVelocity(0, 0);
//       this.on('animationcomplete', function() {
//         if (canDestroy) {
//           this.destroy();
//         }
//         else {
//           this.setVisible(false);
//         }
//       }, this);
//       this.setData("isDead", true);
//     }
//   }
// }
//
// class Player extends Entity {
//   constructor(scene, x, y, key) {
//     super(scene, x, y, key, "player");
//
//     // this.setData("speed", 200);
//
//     this.setData("isShooting", false);
//     this.setData("timerShootDelay", 10);
//     this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
//   }
//
//   onDestroy() {
//     this.scene.time.addEvent({ // go to game over scene
//       delay: 1000,
//       callback: function() {
//         this.scene.scene.start("GameOver");
//       },
//       callbackScope: this,
//       loop: false
//     });
//   }
//               ////((((((((((((((((((((()))))))))))))))))))))
//   update() {
//
//     if (this.getData("isShooting")) {
//       if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
//         this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
//       }
//       else { // when the "manual timer" is triggered:
//         var laser = new PlayerLaser(this.scene, this.x, this.y);
//         this.scene.playerLasers.add(laser);
//
//         this.scene.sfx.laser.play(); // play the laser sound effect
//         this.setData("timerShootTick", 0);
//       }
//     }
//   }
// }
//
// class PlayerLaser extends Entity {
//  constructor(scene, x, y) {
//  super(scene, x, y, "laser");
//  this.body.velocity.y = -200;
//  }
// }
//
// class EnemyLaser extends Entity {
//   constructor(scene, x, y) {
//     super(scene, x, y, "laser");
//     this.body.velocity.y = 200;
//   }
// }
//
// class Bat extends Entity {
//   constructor(scene, x, y) {
//     super(scene, x, y, "laser", "bat");
//
//     this.body.velocity.y = Phaser.Math.Between(50, 100);
//
//     this.states = {
//       MOVE_DOWN: "MOVE_DOWN",
//       CHASE: "CHASE"
//     };
//     this.state = this.states.MOVE_DOWN;
//   }
//
//   update() {
//     if (!this.getData("isDead") && this.scene.player) {
//       if (Phaser.Math.Distance.Between(
//         this.x,
//         this.y,
//         this.scene.player.x,
//         this.scene.player.y
//       ) < 320) {
//
//         this.state = this.states.CHASE;
//       }
//
//       if (this.state == this.states.CHASE) {
//         var dx = this.scene.player.x - this.x;
//         var dy = this.scene.player.y - this.y;
//
//         var angle = Math.atan2(dy, dx);
//
//         var speed = 100;
//         this.body.setVelocity(
//           Math.cos(angle) * speed,
//           Math.sin(angle) * speed
//         );
//
//         if (this.x < this.scene.player.x) {
//           this.angle -= 5;
//         }
//         else {
//           this.angle += 5;
//         }
//       }
//     }
//   }
// }
//
// class Ghost extends Entity {
//   constructor(scene, x, y) {
//     super(scene, x, y, "laser", "ghost");
//     this.play("laser");
//
//     this.body.velocity.y = Phaser.Math.Between(50, 100);
//
//     this.shootTimer = this.scene.time.addEvent({
//       delay: 1000,
//       callback: function() {
//         var laser = new EnemyLaser(
//           this.scene,
//           this.x,
//           this.y
//         );
//         laser.setScale(this.scaleX);
//         this.scene.enemyLasers.add(laser);
//       },
//       callbackScope: this,
//       loop: true
//     });
//   }
//
//   onDestroy() {
//     if (this.shootTimer !== undefined) {
//       if (this.shootTimer) {
//         this.shootTimer.remove(false);
//       }
//     }
//   }
// }
