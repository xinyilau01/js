class WinScene extends Phaser.Scene {

  constructor() {
      super({ key: 'WinScene' });
      
      // Put global variable here
  }

  init(data) {
    this.playerPos = data.playerPos
}

  preload() {

    this.load.image("WinScene", "assets/WinScene.png");

  }

  create() {
      console.log('ending');

      this.spaceSnd = this.sound.add("spaceS");

      this.add.image(0, 0, 'WinScene').setOrigin(0, 0);

      window.room1 = 0
      window.room2 = 0
      window.room3 = 0

  // Check for spacebar or any key here
  var spaceDown = this.input.keyboard.addKey("SPACE");

  // On spacebar event, call the world scene
  
  spaceDown.on(
    "down",
    function () {
      console.log("Jump to WinScene scene");

      this.spaceSnd.play();

      let playerPos = {};
      playerPos.x = 337;
      playerPos.y = 916;
      playerPos.dir = "up";

      this.scene.start("room3", { playerPos: playerPos })
      },
      this
  );

  // Add any text in the main page
  this.add.text(55, 455, "PRESS SPACEBAR TO RESTART", {
    font: "14px Gaegu",
    fill: "#804000",
  });
     }

  update() {

  }

}


