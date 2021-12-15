class room3 extends Phaser.Scene {

    constructor() {
        super('room3');
        
        // Put global variable here
    }


    init(data) {
     
    }

    preload() {
        var map = this.load.tilemapTiledJSON("room3",'assets/room3.json');

        this.load.image("streetpng","assets/Street32x32.png");
        this.load.image("walljpg","assets/wall32x32.jpg");
        this.load.image("bedroompng","assets/bedroom32x32.png");
        this.load.image("piano_sheets","assets/piano_sheets_1.png");
        this.load.audio("pling", "assets/pling.mp3");


        // characters
        this.load.atlas('emmy', 'assets/player.png', 'assets/player.json');

        this.load.atlas('pammy', 'assets/npc.png', 'assets/npc.json');

    }

    create() {
        console.log("*** room3 scene");

           let map = this.make.tilemap({
               key: "room3"
            });

            //sound
           this.pling = this.sound.add('pling');


           let tileset1= map.addTilesetImage("bedroom32x32", "bedroompng");
           let tileset2= map.addTilesetImage("Street32x32", "streetpng");
           let tileset3= map.addTilesetImage("wall32x32", "walljpg");

           let tilesArray = [tileset1, tileset2, tileset3];

           this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
           this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
           this.furnitureLayer = map.createLayer("furnitureLayer", tilesArray, 0, 0);
           this.thingsLayer = map.createLayer("thingsLayer", tilesArray, 0, 0);

            // Enable debugging
            window.player = this.player;


        // this.physics.world.bounds.width = this.groundLayer.width;
        // this.physics.world.bounds.height = this.groundLayer.height;
        
        // load player into phytsics
        this.player = this.physics.add.sprite(333, 550, "emmy")

         //enable
         window.player = this.player;

         //piano sheets
        this.piano_sheets_1 = this.physics.add.sprite(307, 488, "piano_sheets");
        this.piano_sheets_2 = this.physics.add.sprite(547, 560, "piano_sheets");
        this.piano_sheets_3 = this.physics.add.sprite(287, 272, "piano_sheets");
        

        this.player.setCollideWorldBounds(true); //don't go out of this map
        
        this.wallLayer.setCollisionByExclusion (-1,true);
        this.furnitureLayer.setCollisionByExclusion (-1,true);
        this.thingsLayer.setCollisionByExclusion (-1,true);

        this.physics.add.collider(this.player,this.wallLayer);
        this.physics.add.collider(this.player,this.furnitureLayer);
        this.physics.add.collider(this.player,this.thingsLayer);

        this.physics.add.overlap( this.player, this.piano_sheets_1, this.collectSheets, null, this)
        this.physics.add.overlap( this.player, this.piano_sheets_2, this.collectSheets, null, this)
        this.physics.add.overlap( this.player, this.piano_sheets_3, this.collectSheets, null, this)

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

    } // end of create //  

        update() {
            
            if(
                this.player.x > 310 &&
                this.player.x < 368 &&
                this.player.y > 621
            ){
                this.world();
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

    //function to jump to world
    world(player,tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 772;
        playerPos.y = 551;
        playerPos.dir = "emmy" ;

        this.scene.start("world",{playerPos: playerPos});
    }

    collectSheets(player, sheets) {
        console.log("collect Sheets");
        sheets.disableBody(true,true);

        this.pling.play();

        // sheets(true,true);

        window.sheets = window.sheets +1;
        console.log("sheets: ",window.sheets);

        // this.Score.setText("sheets:"+ window.sheets);
        

        // score += 10;
        // scoreText.setText

    } // end of collectSheets //



}
