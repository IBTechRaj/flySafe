import { birdScream } from '../Scenes/GameScene';

test('checks if score is reduced by penalty points', () => {
  this.score = 10;
  this.penalty = 5;
  expect(this.netScore).toBe(10);
});

// import endGame from '../Scenes/GameScene';

// test('checks if proper message displayed when lost', () => {
//   this.netScore = -10;

//   expect(this.result).toBe('Sorry, you lost, Try Again');
// });



// birdScream(plane, bird) {
//   this.sound.play('scream');
//   // bird.setVelocity(0);
//   bird.destroy();
//   this.penalty += 5;
//   this.text1.setText(`Score Earned: ${this.score}`);
//   this.text2.setText(`Score Lost  : ${this.penalty}`);
//   this.netScore = this.score - this.penalty;
//   this.text3.setText(`Your Score  : ${this.netScore}`);
//   if (this.netScore < 0 || this.netScore > 1000) {
//     this.endGame();
//   }
// }