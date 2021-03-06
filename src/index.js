/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import GuideScene from './Scenes/GuideScene';
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

    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Guide', GuideScene);
    this.scene.add('DispalyScore', DisplayScoreScene);
    this.scene.start('Boot');
  }
}

// let game;
window.game = new Game({ render: this.render });