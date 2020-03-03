import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.image('logo', 'assets/logo.png');
  }

  create() {
    // this.add.image(400, 300, 'logo');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.centerX = game.config.width / 2;
    this.centerY = game.config.height / 2;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);


    this.plane = this.physics.add.sprite(this.centerX, this.centerY, 'plane');
    this.plane.body.collideWorldBounds = true;
    this.plane.displayWidth = game.config.width * 0.15;
    this.plane.scaleY = this.plane.scaleX;

    // this.background.scaleX = this.plane.scaleX;
    // this.background.scaleY = this.plane.scaleY;
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

    this.physics.add.collider(this.plane, this.birds);


  }
  update() {
    this.plane.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.plane.body.setVelocityX(-80);
    }
    else if (this.cursors.right.isDown) {
      this.plane.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.plane.body.setVelocityY(-80);
    }
    else if (this.cursors.down.isDown) {
      this.plane.body.setVelocityY(80);
    }

  }


};
