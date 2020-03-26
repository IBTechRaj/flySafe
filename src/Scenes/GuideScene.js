/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["centerButtonText"] }]  */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GuideScene extends Phaser.Scene {
  constructor() {
    super('Guide');
  }

  create() {
    // Game Title

    this.gameTitle = this.add.text(config.width / 2 - 80, config.height / 2 - 100, 'FLY SAFE ', {
      fontSize: this.game.config.width / 20,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.gameTitle = this.add.text(config.width / 2 - 300, config.height / 2 - 50, 'When '
      + 'the game opens, you will see a plane and \nsome birds flying across.'
      + 'You will keep on scoring\n as long as you move without hitting a bird. Once you hit'
      + ' \na bird, your game ends. Use arrow keys in the keyboard to \nmove up, '
      + 'down, forward and backward. ', {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });

    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Play', 'Game');
  }
}
