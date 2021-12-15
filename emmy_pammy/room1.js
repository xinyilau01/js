class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {
     
    }

    preload() {
        var map = this.load.tilemapTiledJSON("room1",'assets/room1.json');

        this.load.image("classroompng","assets/classroom32x32.png");
        this.load.image("shelvespng","assets/shelves32x32.png");
        this.load.image("flying_books","assets/flying_books_1.png");
        this.load.audio("pling", "assets/pling.mp3");


        // characters
        this.load.atlas('emmy', 'assets/player.png', 'assets/player.json');

    }

    create() {
        console.log('*** room1 scene');

           let map = this.make.tilemap({key: "room1"});

           //sound
           this.pling = this.sound.add('pling');

           let tileset1= map.addTilesetImage("classroom32x32", "classroompng");
           let tileset2= map.addTilesetImage("shelves32x32", "shelvespng");

           let tilesArray = [tileset1,tileset2];

           this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
           this.tableLayer = map.createLayer("tableLayer", tilesArray, 0, 0);
           this.chairLayer = map.createLayer("chairLayer", tilesArray, 0, 0);
           this.cabinetLayer = map.createLayer("cabinetLayer", tilesArray, 0, 0);

           // Enable debugging
           window.player = this.player;

        // this.physics.world.bounds.width = this.groundLayer.width;
        // this.physics.world.bounds.height = this.groundLayer.height;
        
        // load player into phytsics
        this.player = this.physics.add.sprite(333, 550, "emmy");
        
        //enable
        window.player = this.player;

        //flying_books
        this.flying_books_1 = this.physics.add.sprite(430, 574, "flying_books");
        this.flying_books_2 = this.physics.add.sprite(530, 366, "flying_books");
        this.flying_books_3 = this.physics.add.sprite(136, 296, "flying_books");

        this.player.setCollideWorldBounds(true); //don't go out of this map
        
        this.cabinetLayer.setCollisionByExclusion (-1,true);
        this.chairLayer.setCollisionByExclusion (-1,true);
        this.tableLayer.setCollisionByExclusion (-1,true);
        // this.bookLayer.setCollisionByExclusion (-1,true);

        // this.physics.add.collider(this.player,this.cabinetLayer);
        this.physics.add.collider(this.player,this.chairLayer);
        this.physics.add.collider(this.player,this.tableLayer);
        this.physics.add.collider(this.player,this.cabinetLayer);
        // this.physics.add.collider(this.player,this.bookLayer);

        this.physics.add.overlap( this.player, this.flying_books_1, this.collectFlying_books, null, this)
        this.physics.add.overlap( this.player, this.flying_books_2, this.collectFlying_books, null, this)
        this.physics.add.overlap( this.player, this.flying_books_3, this.collectFlying_books, null, this)

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);


    } // end of create //  

        update() {
            
            if(
                this.player.x > 295 &&
                this.player.x < 362 &&
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
        playerPos.x = 346;
        playerPos.y = 480;
        playerPos.dir = "emmy";

        this.scene.start("world",{playerPos: playerPos});
    }

    collectFlying_books(player, flying_books) {
        console.log("collect Flying_books");
        flying_books.disableBody(true,true);

        this.pling.play();

        // flying_books(true,true);

        window.flying_books = window.flying_books +1;
        console.log("flying_books: ",window.flying_books);

        // this.Score.setText("flying_books:"+ window.flying_books);

        // score += 10;
        // scoreText.setText

    } // end of collectFlying_books//

}
