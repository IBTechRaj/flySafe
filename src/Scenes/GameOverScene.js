/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["preload"] }]  */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    // no code here
  }

  create() {
    // this.scene.start('Preloader');
    this.gameOver = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'GAME OVER ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.playAgainBtn = new Button(this, config.width / 2, config.height / 2 - 80, 'blueButton1', 'blueButton2', 'Play Again', 'Game');
    this.quitGameBtn = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Quit Game', 'Title');
  }

  startGame() {
    this.scene.start('GameScene');
  }
}