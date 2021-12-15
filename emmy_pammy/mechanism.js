class mechanism extends Phaser.Scene {
    constructor() {
      super({
        key: "mechanism",
      });
  
      // Put global variable here
    }
  
    preload() {
      this.load.image("mechanism", "assets/mechanism.jpg");
  
    }
  
    create() {
      console.log("mechanism");
  
      this.add.image(0, 0, 'mechanism').setOrigin(0, 0).setScale(1.1);
  
      // Add any sound and music here
      // ( 0 = mute to 1 is loudest )
      //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume
  
      //this.music.play()
      //window.music = this.music
  
      // Add image and detect spacebar keypress
      //this.add.image(0, 0, 'main').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("SPACE");
  
      // On spacebar event, call the world scene   //\\only last scene jump to the world.js
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to mechanism scene");
  
          let playerPos = {};
          playerPos.x = 626;
          playerPos.y = 493;
          playerPos.dir = "emmy" ;
  
          this.scene.start("instruction",{playerPos: playerPos})  
        },
        this
      );
  
      // Add any text in the IntroScene
    this.add.text(170, 600, "Press spacebar to continue", {
        font: "30px Gaegu",
        fill: "#FFFFFF",
      });
  
      // Create all the game animations here
    }
  }
  