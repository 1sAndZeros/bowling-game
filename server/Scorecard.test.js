const Scorecard = require("./Scorecard");
const Frame = require("./Frame");

describe("addFrame", () => {
  test("frame added successfully", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(3, 5);
    const frame1 = new Frame(1, 3, 5);
    expect(scorecard.frames).toEqual([frame1]);
    scorecard.addFrame(2, 4);
    const frame2 = new Frame(2, 2, 4);
    expect(scorecard.frames).toEqual([frame1, frame2]);
  });
});

describe("currentScore", () => {
  test("add frame and check score is correct", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(3, 6);
    expect(scorecard.currentScore).toBe(9);
    scorecard.addFrame(2, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(6, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(2, 0);
    expect(scorecard.currentScore).toBe(29);
  });
  test("add frame and check score is correct", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(3, 6);
    expect(scorecard.currentScore).toBe(9);
    scorecard.addFrame(2, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(6, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(2, 0);
    expect(scorecard.currentScore).toBe(29);
    scorecard.addFrame(10);
    expect(scorecard.currentScore).toBe(29);
    scorecard.addFrame(10);
    expect(scorecard.currentScore).toBe(29);
    scorecard.addFrame(10);
    expect(scorecard.currentScore).toBe(59);
  });
  test("gutter game", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    scorecard.addFrame(0, 0);
    expect(scorecard.currentScore).toBe(0);
  });
  test("perfect game", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    scorecard.addFrame(10);
    expect(scorecard.currentScore).toBe(180);
    scorecard.addFrame(10);
    expect(scorecard.currentScore).toBe(210);
    scorecard.addFrame(10, 10, 10);
    expect(scorecard.currentScore).toBe(300);
  });
  test("add 10 frames with regular rolls and check score is correct", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(3, 6);
    expect(scorecard.currentScore).toBe(9);
    scorecard.addFrame(2, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(6, 4);
    expect(scorecard.currentScore).toBe(15);
    scorecard.addFrame(2, 0);
    expect(scorecard.currentScore).toBe(29);
    scorecard.addFrame(7, 1);
    expect(scorecard.currentScore).toBe(37);
    scorecard.addFrame(3, 2);
    expect(scorecard.currentScore).toBe(42);
    scorecard.addFrame(5, 3);
    expect(scorecard.currentScore).toBe(50);
    scorecard.addFrame(8, 0);
    expect(scorecard.currentScore).toBe(58);
    scorecard.addFrame(4, 2);
    expect(scorecard.currentScore).toBe(64);
    scorecard.addFrame(9, 1, 5); // Spare
    expect(scorecard.currentScore).toBe(79);
  });

  test("add 10 frames with strikes and spares and check score is correct", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(0);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(0);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(30);
    scorecard.addFrame(9, 1); // Spare
    expect(scorecard.currentScore).toBe(79);
    scorecard.addFrame(5, 5); // Spare
    expect(scorecard.currentScore).toBe(94);
    scorecard.addFrame(3, 2);
    expect(scorecard.currentScore).toBe(112);
    scorecard.addFrame(2, 8); // Spare
    expect(scorecard.currentScore).toBe(112);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(132);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(132);
    scorecard.addFrame(10, 10, 10); // Three strikes in the 10th frame
    expect(scorecard.currentScore).toBe(222);
  });

  test("check example given", () => {
    const scorecard = new Scorecard();
    scorecard.addFrame(1, 4);
    expect(scorecard.currentScore).toBe(5);
    scorecard.addFrame(4, 5);
    expect(scorecard.currentScore).toBe(14);
    scorecard.addFrame(6, 4); // Spare
    expect(scorecard.currentScore).toBe(14);
    scorecard.addFrame(5, 5); // Spare
    expect(scorecard.currentScore).toBe(29);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(49);
    scorecard.addFrame(0, 1);
    expect(scorecard.currentScore).toBe(61);
    scorecard.addFrame(7, 3); // Spare
    expect(scorecard.currentScore).toBe(61);
    scorecard.addFrame(6, 4); // Spare
    expect(scorecard.currentScore).toBe(77);
    scorecard.addFrame(10); // Strike
    expect(scorecard.currentScore).toBe(97);
    scorecard.addFrame(2, 8, 6); // Spare then 6 on bonus
    expect(scorecard.currentScore).toBe(133);
  });
});
