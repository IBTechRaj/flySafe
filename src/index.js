/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import DisplayScoreScene from './Scenes/DisplayScoreScene';
import Model from './Model';
// import FormUtil from './Scenes/util/formUtil';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
// const formUtil = new FormUtil({
//             scene: this,
//             rows: 11,
//             cols: 11
//         });scene.add()
    
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('DispalyScore', DisplayScoreScene);
    this.scene.start('Boot');
  }
}

// let game;
window.game = new Game();