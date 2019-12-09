import p5 from "p5";

import ConstantPoint from "./ConstantPoint";

const s = p => {
  const w = 640;
  const h = 480;

  let frameCounter = 0;

  // Pick inital random point between first and last 1/4th of the screen
  let randomPoint = p.createVector(
    Math.floor((Math.random() * 3 * w) / 2 + w / 4),
    Math.floor((Math.random() * 3 * h) / 2 + h / 4)
  );
  const randomPoints = [randomPoint];

  const constantPoints = Array(3).fill(null);

  p.setup = function() {
    p.createCanvas(w, h);
    p.background("black");

    // Add constant points
    constantPoints[0] = new ConstantPoint(
      this,
      "A",
      p.createVector(w / 2, 100)
    );
    constantPoints[1] = new ConstantPoint(
      this,
      "B",
      p.createVector(w / 5, h - 100)
    );
    constantPoints[2] = new ConstantPoint(
      this,
      "C",
      p.createVector(w - w / 5, h - 100)
    );
  };

  p.draw = function() {
    // Draw constant points
    constantPoints.forEach(point => point.display());

    // Draw random points
    randomPoints.forEach(point => {
      p.stroke("white");
      p.strokeWeight("2");
      p.point(point);
    });

    // Add new random point every 10 frame
    if (frameCounter % 10 == 0) {
      // Roll the dice
      let diceResult = Math.floor(Math.random() * 6) + 1;
      let newPointX, newPointY;

      switch (diceResult) {
        case 1:
        case 2:
          // Go half way towards A
          newPointX = parseInt((constantPoints[0].posV.x + randomPoint.x) / 2);
          newPointY = parseInt((constantPoints[0].posV.y + randomPoint.y) / 2);
          break;
        case 3:
        case 4:
          // Go half way towards B
          newPointX = parseInt((constantPoints[1].posV.x + randomPoint.x) / 2);
          newPointY = parseInt((constantPoints[1].posV.y + randomPoint.y) / 2);
          break;
        case 5:
        case 6:
          // Go half way towards C
          newPointX = parseInt((constantPoints[2].posV.x + randomPoint.x) / 2);
          newPointY = parseInt((constantPoints[2].posV.y + randomPoint.y) / 2);
          break;
        default:
          break;
      }

      // Add new random point
      randomPoint = p.createVector(newPointX, newPointY);
      randomPoints.push(randomPoint);
    }

    // Increase frame counter on every frame
    ++frameCounter;
  };
};

new p5(s, document.getElementById("sketch"));
