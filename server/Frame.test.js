const Frame = require("./Frame");

describe("isValid", () => {
  it("returns true", () => {
    const frame1 = new Frame(1, 10);
    expect(frame1.isValid()).toBe(true);
    const frame2 = new Frame(2, 0, 8);
    expect(frame2.isValid()).toBe(true);
    const frame3 = new Frame(3, 1, 2);
    expect(frame3.isValid()).toBe(true);
    const frame4 = new Frame(10, 10, 10, 10);
    expect(frame4.isValid()).toBe(true);
    const frame5 = new Frame(10, 5, 5, 10);
    expect(frame5.isValid()).toBe(true);
    const frame6 = new Frame(10, 10, 3, 7);
    expect(frame6.isValid()).toBe(true);
    const frame7 = new Frame(1, 3, 5);
    expect(frame7.isValid()).toBe(true);
  });
  it("returns false", () => {
    const frame1 = () => new Frame(1, 11);
    expect(frame1).toThrowError("Frame entered is invalid");
    const frame2 = () => new Frame(2, 4, 8);
    expect(frame2).toThrowError("Frame entered is invalid");
    const frame3 = () => new Frame(10, 1, 9);
    expect(frame3).toThrowError("Frame entered is invalid");
    const frame4 = () => new Frame(10, 10, 5);
    expect(frame4).toThrowError("Frame entered is invalid");
    const frame5 = () => new Frame(10, 5, 4, 1);
    expect(frame5).toThrowError("Frame entered is invalid");
    const frame6 = () => new Frame(10, 10, 10);
    expect(frame6).toThrowError("Frame entered is invalid");
    const frame7 = () => new Frame(7, 5, 5, 5);
    expect(frame7).toThrowError("Frame entered is invalid");
  });
});

describe("spareOrStrike", () => {
  test("strike is true", () => {
    const frame1 = new Frame(1, 10);
    expect(frame1.spare).toBe(false);
    expect(frame1.strike).toBe(true);
    const frame2 = new Frame(10, 10, 3, 4);
    expect(frame2.spare).toBe(false);
    expect(frame2.strike).toBe(true);
  });
  test("spare is true", () => {
    const frame1 = new Frame(1, 2, 8);
    expect(frame1.spare).toBe(true);
    expect(frame1.strike).toBe(false);
    const frame2 = new Frame(10, 3, 7, 5);
    expect(frame2.spare).toBe(true);
    expect(frame2.strike).toBe(false);
  });
  test("spare and strike is false", () => {
    const frame1 = new Frame(2, 1, 8);
    expect(frame1.spare).toBe(false);
    expect(frame1.strike).toBe(false);
    const frame2 = new Frame(10, 1, 8);
    expect(frame2.spare).toBe(false);
    expect(frame2.strike).toBe(false);
  });
});

describe("checkBonus", () => {
  test("bonus is true", () => {
    const frame1 = new Frame(10, 10, 1, 1);
    expect(frame1.bonus).toBe(true);
    const frame2 = new Frame(10, 5, 5, 3);
    expect(frame2.bonus).toBe(true);
  });
  test("bonus is false", () => {
    const frame1 = new Frame(5, 10);
    expect(frame1.bonus).toBe(false);
    const frame2 = new Frame(10, 4, 3);
    expect(frame2.bonus).toBe(false);
    const frame3 = new Frame(9, 4, 6);
    expect(frame3.bonus).toBe(false);
  });
});
