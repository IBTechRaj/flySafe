/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 50, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 100, 'checkedBox');
    this.musicText = this.add.text(250, 100, 'Music Enabled', { fontSize: 24 });

    // this.soundButton = this.add.image(200, 150, 'checkedBox');
    // this.soundText = this.add.text(250, 150, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    // this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    // this.soundButton.on('pointerdown', () => {
    //   this.model.soundOn = !this.model.soundOn;
    //   this.updateAudio();
    // });

    // this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Back', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    // if (this.model.soundOn === false) {
    //   this.soundButton.setTexture('box');
    // } else {
    //   this.soundButton.setTexture('checkedBox');
    // }
  }
}
