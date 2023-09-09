class Frame {
  constructor(frameNumber, roll1, roll2 = null, roll3 = null) {
    this.frameNumber = frameNumber;
    this.roll1 = roll1;
    this.roll2 = roll2;
    this.roll3 = roll3;
    this.spare = false;
    this.strike = false;
    this.bonus = false;
    this.score = 0;

    this.isValid();
    this.setSpareOrStrike();
    this.setBonus();
  }

  isValid() {
    if (0 < this.frameNumber && this.frameNumber < 10) {
      if (this.roll1 === 10 && this.roll2 === null && this.roll3 === null) {
        return true; // strike and no roll 2 or 3 entered
      } else if (this.roll1 + this.roll2 <= 10 && this.roll3 === null) {
        return true; // spare and no roll 3 entered
      }
    } else if (this.frameNumber === 10) {
      if (
        (this.roll1 === 10 ||
          this.roll1 + this.roll2 === 10 ||
          this.roll1 + this.roll2 === 20) &&
        this.roll3 != null
      ) {
        return true;
      } else if (this.roll1 + this.roll2 < 10 && this.roll3 === null) {
        return true;
      }
    }
    throw new Error("Frame entered is invalid");
  }

  setSpareOrStrike() {
    if (this.roll1 === 10) {
      this.strike = true;
    } else if (this.roll1 + this.roll2 === 10) {
      this.spare = true;
    }
  }

  setBonus() {
    if (this.frameNumber === 10 && (this.spare || this.strike)) {
      this.bonus = true;
    }
  }

  total() {
    return this.roll1 + this.roll2 + this.roll3;
  }
}

module.exports = Frame;
