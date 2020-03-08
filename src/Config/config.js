/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';

export default {

  type: Phaser.AUTO,
  parent: 'content',
  width: 660,
  height: 320,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
    },
  },

};