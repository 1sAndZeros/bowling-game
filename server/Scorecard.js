const Frame = require("./Frame");

class Scorecard {
  constructor() {
    this.frames = [];
    this.currentScore = 0;
  }

  addFrame(turn1, turn2 = null, turn3 = null) {
    const frameNumber = this.frames.length + 1 || 1;
    const frame = new Frame(frameNumber, turn1, turn2, turn3);
    this.frames.push(frame);
    this.calculateScore();
    frame.score = this.currentScore;
  }

  calculateScore() {
    const score = this.frames.reduce((total, frame, index, frames) => {
      const nextFrame = frames[index + 1];
      const followingFrame = frames[index + 2];
      if (frame.frameNumber === 10) {
        total += frame.total();
      } else if (
        frame.strike &&
        nextFrame &&
        nextFrame.strike &&
        (followingFrame || nextFrame.frameNumber === 10)
      ) {
        if (nextFrame.frameNumber === 10) {
          total += 10 + 10 + nextFrame.roll2;
        } else {
          total += 10 + 10 + followingFrame.roll1;
        }
      } else if (frame.strike && nextFrame && !nextFrame.strike) {
        total += 10 + nextFrame.roll1 + nextFrame.roll2;
      } else if (frame.spare && nextFrame) {
        total += 10 + nextFrame.roll1;
      } else if (!frame.spare && !frame.strike) {
        total += frame.total();
      }
      return total;
    }, 0);
    this.currentScore = score;
    console.log(`Current score is: ${this.currentScore}`);
  }
}

module.exports = Scorecard;
