/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["preload"] }]  */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    this.displayResult = '';
    // this.gameOver = '';
    this.score = 0;
    this.penalty = 0;
    this.netScore = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);


    this.plane = this.physics.add.sprite(this.centerX, this.centerY, 'plane');
    this.plane.body.collideWorldBounds = true;
    this.plane.displayWidth = this.game.config.width * 0.15;
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
      collideWorldBounds: true,
    });

    this.birdGroup.children.iterate((child) => {
      const xx = Math.floor(Math.random() * this.background.displayWidth);
      const yy = Math.floor(Math.random() * this.background.displayHeight);
      child.x = xx;
      child.y = yy;
      // Align.scaleToGameW(child, .1);
      child.displayWidth = this.game.config.width * 0.05;
      child.scaleY = child.scaleX;
      // -1,0,1
      let vx = Math.floor(Math.random() * 2) - 1;
      let vy = Math.floor(Math.random() * 2) - 1;
      if (vx === 0 && vy === 0) {
        vx = 1;
        vy = 1;
      }
      const speed = Math.floor(Math.random() * 100) + 15;
      child.body.setVelocity(vx * speed, vy * speed);
    });

    this.physics.add.collider(this.birdGroup, this.plane, this.birdScream, null, this);
    this.makeInfo();
  }

  birdScream(plane, bird) {
    this.sound.play('scream');
    // bird.setVelocity(0);
    bird.destroy();
    this.penalty += 5;
    this.text1.setText(`Score Earned: ${this.score}`);
    this.text2.setText(`Score Lost  : ${this.penalty}`);
    this.netScore = this.score - this.penalty;
    this.text3.setText(`Your Score  : ${this.netScore}`);
    if (this.netScore < 0 || this.netScore > 1000) {
      this.endGame();
    }
  }

  makeInfo() {
    this.text1 = this.add.text(10, 10, 'Score Earned: ', {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
    this.text2 = this.add.text(10, 30, 'Score Lost  : ', {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
    this.text3 = this.add.text(10, 50, 'Your Score   : ', {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.text3.setScrollFactor(0);
  }

  upscore() {
    if (this.netScore < 0 || this.netScore > 1000) {
      this.endGame();
    }
    this.score += 1;
    this.text1.setText(`Score Earned: ${this.score}`);
    this.text2.setText(`Score Lost  : ${this.penalty}`);
    this.netScore = this.score - this.penalty;
    this.text3.setText(`Your Score  : ${this.netScore}`);
  }

  endGame() {
    this.gameOver = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'GAME OVER ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.result = this.add.text('');

    if (this.netScore > 0) {
      this.result = `Congrats, you have scored  ${this.netScore}`;
    }
    if (this.netScore < 0) {
      this.result = 'Sorry, you lost, Try Again';
    }

    this.displayResult = this.add.text(config.width / 2 - 280, config.height / 2 - 80,
      this.result, {
        fontSize: this.game.config.width / 20,
        align: 'center',
        backgroundColor: '#000000',
      });

    if (this.netScore > 0) {
      this.scoreLine1 = this.add.text(config.width / 2 - 80, config.height / 2,
        'User   -   Score', {
          fontSize: this.game.config.width / 40,
          align: 'center',
          backgroundColor: '#000000',
        });
      this.scoreLine2 = this.add.text(config.width / 2 - 80, config.height / 2 + 30,
        `Raj    -    ${this.netScore}`, {
          fontSize: this.game.config.width / 40,
          align: 'center',
          backgroundColor: '#000000',
        });
      this.scoreLine2.setScrollFactor(0);
    }
    this.scoreLine1.setScrollFactor(0);

    this.gameOver.setScrollFactor(0);
    this.displayResult.setScrollFactor(0);

    this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 80,
      'blueButton1', 'blueButton2', 'Quit Game', 'Title');
    this.quitGameBtn.setScrollFactor(0);
  }

  update() {
    this.plane.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.plane.body.setVelocityX(-80);
      this.upscore();
    } else if (this.cursors.right.isDown) {
      this.plane.body.setVelocityX(80);
      this.upscore();
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.plane.body.setVelocityY(-80);
      this.upscore();
    } else if (this.cursors.down.isDown) {
      this.plane.body.setVelocityY(80);
      this.upscore();
    }
  }
}
