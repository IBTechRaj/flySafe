import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    this.score = 0;
    this.penalty = 0;
    this.netScore = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.centerX = game.config.width / 2;
    this.centerY = game.config.height / 2;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);


    this.plane = this.physics.add.sprite(this.centerX, this.centerY, 'plane');
    this.plane.body.collideWorldBounds = true;
    this.plane.displayWidth = game.config.width * 0.15;
    this.plane.scaleY = this.plane.scaleX;

    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.plane, true);

    this.birdGroup = this.physics.add.group({
      key: 'birds',
      frame: [0, 1, 2],
      frameQuantity: 5,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true
    });

    this.birdGroup.children.iterate(function (child) {
      var xx = Math.floor(Math.random() * this.background.displayWidth);
      var yy = Math.floor(Math.random() * this.background.displayHeight);
      child.x = xx;
      child.y = yy;
      // Align.scaleToGameW(child, .1);
      child.displayWidth = game.config.width * 0.05;
      child.scaleY = child.scaleX;
      //-1,0,1
      var vx = Math.floor(Math.random() * 2) - 1;
      var vy = Math.floor(Math.random() * 2) - 1;
      if (vx == 0 && vy == 0) {
        vx = 1;
        vy = 1;
      }
      var speed = Math.floor(Math.random() * 200) + 10;
      child.body.setVelocity(vx * speed, vy * speed);

    }.bind(this));

    this.physics.add.collider(this.plane, this.birdGroup, this.birdScream, null, this);
    this.makeInfo();

  }
  birdScream() {
    this.sound.play('scream');
    this.penalty += 20;
    this.text1.setText("Score Earned: " + this.score);
    this.text2.setText("Score Lost  : " + this.penalty);
    this.text3.setText("Your Score  : " + this.score - this.penalty);
  }
  makeInfo() {
    this.text1 = this.add.text(10, 10, "Score Earned: ", {
      fontSize: game.config.width / 40,
      align: "center",
      backgroundColor: '#000000'
    });
    this.text2 = this.add.text(10, 30, "Score Lost  : ", {
      fontSize: game.config.width / 40,
      align: "center",
      backgroundColor: '#000000'
    });
    this.text3 = this.add.text(10, 50, "Your Score   : ", {
      fontSize: game.config.width / 40,
      align: "center",
      backgroundColor: '#000000'
    });
    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.text3.setScrollFactor(0);
  }
  upscore() {
    this.score += 1;
    this.text1.setText("Score Earned: " + this.score);
    this.text2.setText("Score Lost  : " + this.penalty);
    this.text3.setText("Your Score  : " + this.score - this.penalty);
  }

  update() {

    this.plane.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.plane.body.setVelocityX(-80);
      this.upscore();
    }
    else if (this.cursors.right.isDown) {
      this.plane.body.setVelocityX(80);
      this.upscore();
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.plane.body.setVelocityY(-80);
      this.upscore();
    }
    else if (this.cursors.down.isDown) {
      this.plane.body.setVelocityY(80);
      this.upscore();
    }

  }


};
