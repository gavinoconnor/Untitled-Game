// 
// class Beam extends Phaser.GameObjects.Sprite{
//   constructor(scene){
//
//     var x = scene.player.x - 15;
//     var y = scene.player.y;
//
//     super(scene, x, y, "beam");
//
//     // 3.2 add to scene
//     scene.add.existing(this);
//
//     // 3.3
//     this.play("beam_anim");
//     scene.physics.world.enableBody(this);
//     this.body.velocity.x = - 250;
//
//
//     // 4.2 add the beam to the projectiles group
//     scene.projectiles.add(this);
//
//   }
//
//
//   update(){
//
//     // 3.4 Frustum culling
//     if(this.x < 80 ){
//       this.destroy();
//     }
//   }
// };
