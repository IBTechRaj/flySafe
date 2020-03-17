/*  global Phaser  */
/*  eslint no-undef: "error"  */
/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["getScores", "postGame"] }] */

import 'phaser';
// import GameScene from '../Scenes/GameScene';
import config from '../Config/config';
import Button from '../Objects/Button';
import AlignGrid from './util/alignGrid';
// import FormUtil from '../formUtil';

export default class UserScore extends Phaser.Scene {
  constructor() {
    super('UserScore');
  }
init(data){
  this.netScore = data.level;
// this.playerName='';
}

  create(){
//  this.formUtil = new FormUtil({
//             scene: this,
//             rows: 11,
//             cols: 11
// //         });
this.alignGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });

    console.log( this.netScore)
    
    

// function dispScore() { console.log('display score'); }





this.gettingName( this.displayScore);

}
  async getScores() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/IQGIv2Nx5h002UPpElPS/scores/';
    const userData = await fetch(url);
    const scores = await userData.json();
    return scores;
  }

  async postGame() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    const gameName = {
      name: 'flySafe',
    };
    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(gameName),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send POST request
    fetch(url, options)
      .then(res => res.json());
    // .then(res => console.log(res));
  }


  async postScore() {
    // Game: flySafe, {result: "Game with ID: BxAIfHmwEjEPsh8DTd3o added."}
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/';

    const userScore = {
      user: 'Raj',
      score: this.netScore,
    };
    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(userScore),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send POST request
    fetch(url, options)
      .then(res => res.json());
    // .then(res => console.log(res));
  }

gettingName( callback) {
console.log('get the name and then');
this.playerName = this.getName();
callback();
}

  displayScore(){
console.log('done');
    // console.log(this.playerName);
    // console.log( this.netScore);
  }

  getName() {
    this.placeElementAt(400, 'myText', true);
    const button = document.querySelector('button');
    this.placeElementAt(456, button, true);
   
    button.addEventListener('click', event => {
      this.player=this.getTextAreaValue("myText");
    console.log(this.player);
      return this.player;
    });
    // callback();


}
// function create(){
// }
textAreaChanged() {
    	var text=getTextAreaValue("myText");
    }

getTextAreaValue(elName){
        var el = document.getElementById(elName);
        return el.value;
    }
// centerX = true, centerY = false
placeElementAt(index, elName, centerX = true, centerY = false ) {
//get the position from the grid
        var pos = this.alignGrid.getPosByIndex(index);
        //extract to local vars
        var x = pos.x;
        var y = pos.y;
        //get the element
        var el = document.getElementById(elName);
        //set the position to absolute
        el.style.position = "absolute";
        //get the width of the element
        var w = el.style.width;
        //convert to a number
        w = this.toNum(w);
        //
        //
        //center horizontal in square if needed
        if (centerX == true) {
            x -= w / 2;
        }
        //
        //get the height
        //        
        var h = el.style.height;
        //convert to a number
        h = this.toNum(h);
        //
        //center verticaly in square if needed
        //
        if (centerY == true) {
            y -= h / 2;
        }
        //set the positions
        el.style.top = y + "px";
        el.style.left = x + "px";
    }
        // var el = document.getElementById(elName);    
    
}

// this.gameTitle = this.add.text(config.width / 2 - 80, config.height / 2 - 150, 'FLY SAFE ', {
//       fontSize: this.game.config.width / 20,
//       align: 'center',
//       backgroundColor: '#000000',
//     });

    
    // this.gameButton = new Button(this, config.width / 2, config.height / 2 - 60, 'blueButton1', 'blueButton2', 'Play', 'Game');
