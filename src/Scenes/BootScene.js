import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/sky1.png');
    this.load.image('plane', 'assets/biplane.png');
    this.load.spritesheet('birds', 'assets/birds.svg', {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}