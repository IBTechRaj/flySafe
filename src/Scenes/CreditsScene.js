/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits to Microverse', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Raja Sekhar Katakamsetty', { fontSize: '26px', fill: '#fff' });
    this.emailText = this.add.text(0, 0, 'krs30018@gmail.com; raj_shk@rediffmail.com', { fontSize: '18px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.emailText,
      this.zone,
    );

    this.madeByText.setY(1000);
    this.emailText.setY(900);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
        // this.destroy();
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 0,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
        // this.madeByTween.destroy;
        // this.scene.start('Title');
      }, // .bind(this)
    });

    this.emailTween = this.tweens.add({
      targets: this.emailText,
      y: 30,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function x() {
        // this.emailTween.destroy();
        setTimeout(() => {
          this.scene.start('Title');
        }, 2000);
      }.bind(this),
    });
  }
}