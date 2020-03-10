/*  global Phaser  */
/*  eslint no-undef: "error"  */

import 'phaser';


export default class UserScore extends Phaser.Scene {
 constructor() {
    super('UserScore');
  }
  async getScores() {
    const url;
    url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/IQGIv2Nx5h002UPpElPS/scores/';
    const userData = await fetch(url);
    const scores = await userData.json();
    return scores;
  }

  async postGame() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    const gameName = {
      'name': 'flySafe',
    };
    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(gameName),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    // send POST request
    fetch(url, options)
      .then(res => res.json())
      .then(res => console.log(res));
  }


  async postScore() {
    // Game: flySafe, {result: "Game with ID: BxAIfHmwEjEPsh8DTd3o added."}
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/`;

    const userScore = {
      'user': 'Raj',
      'score': this.netScore
    };
    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(userScore),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // send POST request
    fetch(url, options)
      .then(res => res.json())
      .then(res => console.log(res));
  }
}