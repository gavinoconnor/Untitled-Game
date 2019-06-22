
 class MenuScene extends Phaser.Scene {
    constructor() {
      super({key: 'MenuScene'});
    }

    preload() {
        this.load.audio("menu_song", "assets/audio/menu_song.mp3");
        this.load.audio("gameplay_song", "assets/audio/gameplay_song.mp3")
        //load menu screen
        this.load.image("forest_menu", "assets/forest_menu.png");
        //load start button
        this.load.spritesheet("start_button", "assets/start_button.png",   {
           frameWidth: 120,
           frameHeight: 40
         });
       }

    create() {
      console.log('MainMenu');
      //load menu image
      this.forest_menu = this.add.sprite(config.width / 2, config.height / 2, "forest_menu");
      //load menu music
      let menuMusic = this.sound.add("menu_song");
      menuMusic.play();
      //set up the narrative
      this.storyText1 = this.add.text(20, 30, 'For generations, the BEES ruled the\n forest wisely, until a CATACLYSM\n brought ghouls and spirits\n to this place.', {fontType: 'bold 30pt', fill: 'white'});
      this.menuText = this.add.text(100, 130, ' Just one CHAMPION \nremains...', {font: 'bold 13pt helvetica', fill: 'black', align: 'center'});
      this.start_button = this.add.sprite(config.width / 2, config.height / 1.2, "start_button")
      this.start_button.setInteractive();
      this.start_button.on('pointerdown', function () {
        menuMusic.stop();
        game.scene.start('Game')
      });
    };
}
