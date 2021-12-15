class room2 extends Phaser.Scene {

    constructor() {
        super('room2');
        
        // Put global variable here
    }


    init(data) {
     
    }

    preload() {
        var map = this.load.tilemapTiledJSON("room2",'assets/room2.json');

        this.load.image("classroompng","assets/classroom32x32.png");
        this.load.image("streetpng","assets/street32x32.png");
        this.load.image("chemistry_1","assets/chemistry_1.png");
        this.load.audio("ping", "assets/pling.mp3");

        // characters
        this.load.atlas('emmy', 'assets/player.png', 'assets/player.json');

    }

    create() {
        console.log('*** room2 scene');

           let map = this.make.tilemap({key: "room2"});

           //sound
           this.pling = this.sound.add('pling');

           let tileset1= map.addTilesetImage("classroom32x32", "classroompng");
           let tileset2= map.addTilesetImage("street32x32", "streetpng");

           let tilesArray = [tileset1,tileset2];

           this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
           this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
           this.boardLayer = map.createLayer("boardLayer", tilesArray, 0, 0);
           this.tableLayer = map.createLayer("tableLayer", tilesArray, 0, 0);
           this.thingsLayer = map.createLayer("thingsLayer", tilesArray, 0, 0);

           // Enable debugging
           window.player = this.player;

        // this.physics.world.bounds.width = this.groundLayer.width;
        // this.physics.world.bounds.height = this.groundLayer.height;
        
        // load player into phytsics
        this.player = this.physics.add.sprite(333, 550, "emmy")
        
        //enable
        window.player = this.player;

        //potion 
        this.chemistry_1 = this.physics.add.sprite(170, 523, "chemistry_1");
        this.chemistry_2 = this.physics.add.sprite(144, 398, "chemistry_1");
        this.chemistry_3 = this.physics.add.sprite(623, 300, "chemistry_1");
        

        this.player.setCollideWorldBounds(true); //don't go out of this map
        
        this.wallLayer.setCollisionByExclusion (-1,true);
        this.boardLayer.setCollisionByExclusion (-1,true);
        this.tableLayer.setCollisionByExclusion (-1,true);
        // this.thingsLayer.setCollisionByExclusion (-1,true);

        this.physics.add.collider(this.player,this.wallLayer);
        this.physics.add.collider(this.player,this.boardLayer);
        // this.physics.add.collider(this.player,this.tableLayer);

        this.physics.add.overlap( this.player, this.chemistry_1, this.collectPotion, null, this)
        this.physics.add.overlap( this.player, this.chemistry_2, this.collectPotion, null, this)
        this.physics.add.overlap( this.player, this.chemistry_3, this.collectPotion, null, this)

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

    } // end of create //  

        update() {
            
            if(
                this.player.x > 310 &&
                this.player.x < 340 &&
                this.player.y > 600 &&
                this.player.y < 621
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
        playerPos.x = 329;
        playerPos.y = 177;
        playerPos.dir = "emmy" ;

        this.scene.start("world",{playerPos: playerPos});
    }

    collectPotion(player, potion) {
        console.log("collect Potion");
        potion.disableBody(true,true);

        this.pling.play();

        // potion(true,true);

        window.potion = window.potion +1;
        console.log("potion: ",window.potion);

        // this.Score.setText("potion:"+ window.potion);


        // score += 10;
        // scoreText.setText

    } // end of collectPotion //
    

}
