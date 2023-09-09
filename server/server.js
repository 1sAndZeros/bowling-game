const express = require("express");
const Scorecard = require("./Scorecard");

const app = express();
const port = 3000;
const scorecard = new Scorecard();

app.get("/frames", (req, res) => {
  const data = {};
  const frames = scorecard.frames.map((frame) => {
    const { frameNumber, roll1, roll2, roll3, strike, spare, bonus, score } =
      frame;
    console.log(score);
    return {
      frameNumber,
      rolls: [roll1, roll2, roll3],
      strike,
      spare,
      bonus,
      frameScore: score,
    };
  });
  data.frames = frames;
  data.currentScore = scorecard.currentScore;
  res.json(data);
});

app.post("/add/:frame", (req, res) => {
  const frame = req.params.frame;
  let [roll1, roll2, roll3] = frame.split("-");
  roll1 = Number(roll1) || null;
  roll2 = Number(roll2) || null;
  roll3 = Number(roll3) || null;
  scorecard.addFrame(roll1, roll2, roll3);
  res.send("Frame added successfully");
});

// eslint-disable-next-line no-console
app.listen(port || 3000, () => {
  console.log(`Server listening on http://localhost:${port || 3000}`);
});
