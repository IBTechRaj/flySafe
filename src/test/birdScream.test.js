import { birdScream } from '../Scenes/GameScene';

test('checks if score is reduced by penalty points', () => {
  this.score = 10;
  this.penalty = 5;
  expect(this.netScore).toBe(10);
});

