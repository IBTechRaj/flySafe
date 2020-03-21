import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import FormUtil from '../Objects/FormUtil';
import Align from '../Objects/Align';
import AlignGrid from '../Objects/AlignGrid';

export default class DisplayScoreScene extends Phaser.Scene {
    constructor() {
        super('DisplayScore');
    }

init(data){
  this.score = data.level;
}

preload() {
}

create() {
  this.user = '';
  this.scoreList = [];
  this.user = this.inputName();
this.quitGameBtn = new Button(this, config.width / 2, config.height / 2 + 130,
      'blueButton1', 'blueButton2', 'Exit Game', 'Title');
      this.quitGameBtn.setScrollFactor(0);
    
  // let topFive = this.getScores();
// .then(data => {
  // console.log(topFive);
  // this.displayPlayersScore(topFive);
// });
  // console.log(this.scoreList);
  // this.scoreList.push({"user:" + this.user, "score:" this.score});
  // console.log(this.scoreList);
}

inputName() {
  this.userName = this.add.text(config.width / 2 - 270, config.height / 2 - 78,
    'Enter your Name : ', {
    fontSize: this.game.config.width / 40,
    align: 'center',
    backgroundColor: '#000000',
  });
  this.userName.setScrollFactor(0);
  this.formUtil = new FormUtil({
    scene: this,
    rows: 11,
    cols: 11
  });
  this.formUtil.scaleToGameW("area51", .3);
  this.formUtil.scaleToGameH("area51", .08);
  this.formUtil.placeElementAt(75, "area51", true, true);
  this.user = this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
  this.formUtil.scaleToGameW("btnSend", .25);
  this.formUtil.placeElementAt(97, "btnSend");
  this.formUtil.addClickCallback("btnSend", this.displayLeaderboard, this);
//  console.log(` ${this.user}   ' = '    ${this.score} `);
  return this.user;
}

textAreaChanged() {
  this.user = this.formUtil.getTextAreaValue("area51");
  console.log(` ${this.user}   ' first '    ${this.score} `);
  
  return this.user;
}

displayLeaderboard(){
 this.postScore(this.user, this.score);
  this.userName.setText('');
  let elno = document.getElementById("area51");
  elno.style.display = "none";
  elno = document.getElementById("btnSend");
  elno.style.display = "none";
  
  this.scoreLine1 = this.add.text(config.width / 2 - 50, config.height / 2 ,
    'Top Scores', {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine1.setScrollFactor(0);
  setTimeout(() => {
  this.getScores();
  },2000 );
}

async getScores(){
  let topScores = [];
  // fetch('https://jsonplaceholder.typicode.com/users/')
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/')
      // .then(response => response.json())
      // .then(json => console.log(json))
    .then(response => response.json())
    .then(scores => {//console.log(scores));
    // let mydata=[];
    // mydata.push(scores);
    // console.log(scores);
    const { result } = scores;
// const u = scores.result.user;
    result.forEach(function(row) {
      const { user, score} = row;
    // console.log( user,score);
    topScores.push([user, score]);
    // topScores.push(['user:' + `${user}`, 'score:' + `${score}`]);
    //                                 ${user.name}
    //                             </li>
    //                         `;
                      });
    // console.log(topScores);
    topScores.sort(function (x, y) {
    if (x[1]=== y[1]){
    return 0;
    }else{
        return (y[1] - x[1]);
    }
    });
    console.log('ok');
    console.log(topScores);
    this.displayPlayersScore(topScores);
                
// let first = mydata[0][0];
// console.log((mydata.slice(0,1)).slice(0,1));
// mydata.sort(function (x, y) {
//     return x.user - y.user;
// });
// console.log(mydata);
                });
return topScores;
}

  async getScores1() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/';
    let ascores;
    fetch(url).then(response => response.json())
      .then(ascores => {
      Object.keys(ascores).forEach(function(ascore){
      console.log(`${ascore.user}, ${ascore.score}`)})    
    });
    return ascores;

  }
// async getScores() {
//     const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/';
//     const userData = await fetch(url);
//     const scores = await userData.json();
//     return scores;
//   }

displayPlayersScore(data) {
  // let allPlayers = [];
  //  console.log(data);
    console.log('in d p s');
console.log(data.length);
// data.forEach(function(row) {
let [ user, score] = data[0];
this.scoreLine2 = this.add.text(config.width / 2 - 80, config.height / 2 + 30,
    `${user}   -   ${score}`, {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine2.setScrollFactor(0);

[ user, score] = data[1];
this.scoreLine3 = this.add.text(config.width / 2 - 80, config.height / 2 + 50,
    `${user}   -   ${score}`, {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine3.setScrollFactor(0);

[ user, score] = data[2];
this.scoreLine4 = this.add.text(config.width / 2 - 80, config.height / 2 + 70,
    `${user}   -   ${score}`, {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine4.setScrollFactor(0);

[ user, score] = data[3];
this.scoreLine5 = this.add.text(config.width / 2 - 80, config.height / 2 + 90,
    `${user}   -   ${score}`, {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine5.setScrollFactor(0);

[ user, score] = data[4];
this.scoreLine6 = this.add.text(config.width / 2 - 80, config.height / 2 + 110,
    `${user}   -   ${score}`, {
      fontSize: this.game.config.width / 40,
      align: 'center',
      backgroundColor: '#000000',
    });
  this.scoreLine6.setScrollFactor(0);

// });
//  for (const {result: { user: u, score: s, },} of data) {
//      console.log('user:' + `${u}` + ', score: ' + `${s}`);
//  }
// let temp='';
                    // for (const [ user, score ] of Object.entries(data)) {
                    //     // allPlayers.push(['user: ' + user + ',score: ' + score]);
                    //     allPlayers.push([user , score]);
                    // temp = score;
                    // console.log('u : ' + temp);
                    // // console.log(allPlayers.length);
                    //     console.log(user, score);
                    // }
// console.log(allPlayers);
// console.log(allPlayers.length);
// allPlayers.forEach(function (e) {
        // console.log(e.user + '=	' + e.score );
// });


//this.showPlayerList(allPlayers);
//console.log(allPlayers);
//     const {result: {user, score, }, }  = data;
//      console.log([user, score]);
// // console.log([user, score]);
}
 

async postScore(u,s) {
    // Game: flySafe, {result: "Game with ID: BxAIfHmwEjEPsh8DTd3o added."}
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BxAIfHmwEjEPsh8DTd3o/scores/';

    const userScore = {
      user: u,
      score: s,
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
      .then(res => res.json())
    .then(res => console.log(res));
  }

//   showPlayerList(twodarr) {
//     twodarr.forEach(function (e) {
//         console.log(e.user + '	' + e.score );
// 	//twodarr.push('name:' + e.name + 'salary:' + e.salary);
//     });
// }
    update() {}
}