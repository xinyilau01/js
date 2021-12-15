class world extends Phaser.Scene {
  constructor() 
  {
    super({ key: "world" });
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {

    var map = this.load.tilemapTiledJSON('map1','assets/map1.json');

   
    this.load.image("landpng", "assets/land32x32.png");
    this.load.image("tileset1png", "assets/tileset1.png");
    this.load.image("tileset2png", "assets/tileset2.png");
    this.load.image("housepng", "assets/house32x32.png");


    // characters
    this.load.atlas('emmy', 'assets/player.png', 'assets/player.json');
    

  } // end of preload //

  create() {

    console.log("world map")

    let map = this.make.tilemap({key: "map1"});

 

    let tileset1 = map.addTilesetImage("land32x32", "landpng");
    let tileset2 = map.addTilesetImage("tileset1", "tileset1png");
    let tileset3 = map.addTilesetImage("tileset2", "tileset2png");
    let tileset4 = map.addTilesetImage("house32x32", "housepng");

    let tilesArray = [tileset1, tileset2, tileset3, tileset4];

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
    this.thingsLayer = map.createLayer("thingsLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
    this.hallLayer = map.createLayer("hallLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
      );

    this.anims.create({
        key:"left",
        frames:[
            {key:"emmy",frame:"left1"},
            {key:"emmy",frame:"left2"},
            {key:"emmy",frame:"left3"},
            {key:"emmy",frame:"left4"},
            {key:"emmy",frame:"left5"},
            {key:"emmy",frame:"left6"},
            {key:"emmy",frame:"left7"},
            {key:"emmy",frame:"left8"},
            {key:"emmy",frame:"left9"},
        ],
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:"right",
        frames:[
            {key:"emmy",frame:"right1"},
            {key:"emmy",frame:"right2"},
            {key:"emmy",frame:"right3"},
            {key:"emmy",frame:"right4"},
            {key:"emmy",frame:"right5"},
            {key:"emmy",frame:"right6"},
            {key:"emmy",frame:"right7"},
            {key:"emmy",frame:"right8"},
            {key:"emmy",frame:"right9"},
        ],
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:"up",
        frames:[
            {key:"emmy",frame:"back1"},
            {key:"emmy",frame:"back2"},
            {key:"emmy",frame:"back3"},
            {key:"emmy",frame:"back4"},
            {key:"emmy",frame:"back5"},
            {key:"emmy",frame:"back6"},
            {key:"emmy",frame:"back7"},
            {key:"emmy",frame:"back8"},
            {key:"emmy",frame:"back9"},
        ],
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:"down",
        frames:[
            {key:"emmy",frame:"front1"},
            {key:"emmy",frame:"front2"},
            {key:"emmy",frame:"front3"},
            {key:"emmy",frame:"front4"},
            {key:"emmy",frame:"front5"},
            {key:"emmy",frame:"front6"},
            {key:"emmy",frame:"front7"},
            {key:"emmy",frame:"front8"},
            {key:"emmy",frame:"front9"},
        ],
        frameRate:10,
        repeat:-1
    });



this.physics.world.bounds.width = this.groundLayer.width;
this.physics.world.bounds.height = this.groundLayer.height;

// load player into phytsics

//enable
window.player = this.player;

this.thingsLayer.setCollisionByExclusion (-1,true);
this.treeLayer.setCollisionByExclusion (-1,true);
this.buildingLayer.setCollisionByExclusion (-1,true);

this.physics.add.collider(this.player,this.thingsLayer);
this.physics.add.collider(this.player,this.treeLayer);
this.physics.add.collider(this.player,this.buildingLayer);

//  Input Events
this.cursors = this.input.keyboard.createCursorKeys();

// make the camera follow the player
this.cameras.main.startFollow(this.player);


} // end of create //

update () {    

    if (
        this.player.x > 319 &&
        this.player.x < 369 &&
        this.player.y > 450 &&
        this.player.y < 466
    ){
        this.room1();
    }
    
    if(
        this.player.x > 320 &&
        this.player.x < 360 &&
        this.player.y > 149 &&
        this.player.y < 173 
    ){
        this.room2();
    } 

    if(
        this.player.x > 722 &&
        this.player.x < 816 &&
        this.player.y > 400 &&
        this.player.y < 550 
    ){
        this.room3();
    } 

    
if (this.cursors.left.isDown) 
{
    this.player.setVelocityX(-200);
    this.player.anims.play('right', true);
} 
else if (this.cursors.right.isDown)
{
    this.player.setVelocityX(200);
    this.player.anims.play('left', true);
}
else if (this.cursors.up.isDown)
{
    this.player.setVelocityY(-200);
    this.player.anims.play('up', true);
}
else if (this.cursors.down.isDown)
{
    this.player.setVelocityY(200);
    this.player.anims.play('down', true);
} else {
    this.player.setVelocity(0);
}


} // end of update // 

//function to jump to 
room1(player, title) {
    console.log("room1 function");
    this.scene.start("room1");
}

room2(player, title){
    console.log("room2 function");
    this.scene.start("room2");
}

room3(player, title){
    console.log("room3 function");
    this.scene.start("room3");
}

}