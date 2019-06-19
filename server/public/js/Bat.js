// class Bat extends Phaser.GameObjects.Sprite{
//
//
//   constructor(scene){
//     var bat;
//
//     var x = scene.bat.x - 15;
//     var y = scene.bat.y;
//
//     super(scene, x, y, "bat");
//
//     scene.add.existing(this);
//
//     // 4.2 add the bat to the projectiles group
//     scene.projectiles.add(this);
//
//   }
//
//   create: function() {
//
//     bat = game.add.sprite(0,0, 'bat')
//
//
//     this.anims.create({
//       key: "bat_anim",
//       frames: this.anims.generateFrameNumbers("bat"),
//       frameRate: 20,
//       repeat: -1
//     });
//
//
//     this.play("bat_anim");
//     scene.physics.world.enableBody(this);
//     this.body.velocity.x = - 250;
//     // this.newBat = new Bat(this)
//
//   }
//
//
//   update(){
//     this.moveEnemie(this.bat, 5);
//     // 3.4 Frustum culling
//     if(this.x < config.width ){
//       this.destroy();
//     }
//   }
// }
