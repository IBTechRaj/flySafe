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
  this.netScore = data.level;
}

    preload() {}
    create() {
this.user = '';
      this.inputName();
// this.displayLeaderboard();
    }



    inputName() {

this.userName = this.add.text(config.width / 2 - 200, config.height / 2 - 80,
                    'Enter your Name : ', {
                      fontSize: this.game.config.width / 40,
                      align: 'center',
                      backgroundColor: '#000000',
                    });
                  this.userName.setScrollFactor(0);
// console.log('discore');
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
       // this.formUtil.showNumbers();
        //
        //
        // //
        // this.formUtil.scaleToGameW("myText", .3);
        // this.formUtil.placeElementAt(13, 'myText', true);
        // //
        //
        //
        this.formUtil.scaleToGameW("area51", .3);
        this.formUtil.scaleToGameH("area51", .05);
        this.formUtil.placeElementAt(75, "area51", true, true);
        this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
        //
        //
        //
        this.formUtil.scaleToGameW("btnSend", .25);
        this.formUtil.placeElementAt(97, "btnSend");
        //
        //
        // //
        // this.formUtil.scaleToGameW("btnCancel", .25);
        // this.formUtil.placeElementAt(107, "btnCancel");
        // //
        //
        //
        this.formUtil.addClickCallback("btnSend", this.displayLeaderboard, this);
        // this.formUtil.addClickCallback("btnCancel", this.cancelForm, this);
    }
    sendForm() {
        console.log("sendForm");
    }
    // cancelForm() {
    //     console.log("cancelForm");
    // }
    textAreaChanged() {
        this.user = this.formUtil.getTextAreaValue("area51");
        console.log(` ${user}   ' : '    ${this.netScore} `);
return this.user;
    }



    displayLeaderboard(){

 this.scoreLine1 = this.add.text(config.width / 2 - 80, config.height / 2,
                    'Users   -   Score', {
                      fontSize: this.game.config.width / 40,
                      align: 'center',
                      backgroundColor: '#000000',
                    });
                  this.scoreLine1.setScrollFactor(0);
                  this.scoreLine2 = this.add.text(config.width / 2 - 80, config.height / 2 + 30,
                    `${this.user}    -    ${this.netScore}`, {
                      fontSize: this.game.config.width / 40,
                      align: 'center',
                      backgroundColor: '#000000',
                    });
                  this.scoreLine2.setScrollFactor(0);
    }
    update() {}
}