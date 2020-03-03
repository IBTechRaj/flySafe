import 'phaser';

export default {
  // type: Phaser.AUTO,
  // parent: 'phaser-example',
  // width: 800,
  // height: 600
  type: Phaser.AUTO,
  parent: 'content',
  width: 400,
  height: 300,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false // set to true to view zones
    }
  }

};