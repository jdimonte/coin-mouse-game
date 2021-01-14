/* global createCanvas, rect, collideRectCircle, keyCode, noStroke, mousePressed, stroke, color, reset, noFill, collideCircleCircle, colorMode, HSB, background, random, width, height, ellipse, mouseX, mouseY, text, fill, mouseIsPressed */

let brushHue,
  backgroundColor,
  score,
  time,
  gameIsOver,
  hit,
  hitsquare,
  movinghit,
  circles,
  circles2,
  c1,
  c2,
  highscore,
  coin,
  flip,
  cursorsize,
  rectx,
  recty;

function setup() {
  // Canvas & color settings
  createCanvas(1000, 600);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  c1 = random(360);
  c2 = random(360);
  time = 1000;
  gameIsOver = false;
  hit = false;
  score = 0;
  movinghit = false;
  circles = [];
  circles2 = [];
  highscore = 0;
  coin = 30;
  flip = -1;
  cursorsize = 0;
  rectx = random(width);
  recty = random(height);

  for (var i = 0; i < 20; i++) {
    var circle = {
      x: random(width),
      y: random(height),
      r: 10,
      c: random(360),
      vx: 5,
      vy: 5
    };
    circles.push(circle);
  }

  for (var i = 0; i < 20; i++) {
    var circle2 = {
      x: random(width),
      y: random(height),
      r: 15,
      c: random(360)
    };
    circles2.push(circle2);
  }

  for (var i = 0; i < circles.length; i++) {
    fill(color(random(circles[i].c), 70, 90));
    noStroke();
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }

  for (var i = 0; i < circles2.length; i++) {
    fill(color(random(circles2[i].c), 70, 90));
    noStroke();
    ellipse(circles2[i].x, circles2[i].y, coin, circles2[i].r * 2);
  }
}
//console.log();
function draw() {
  background(backgroundColor);
  fill(c2, 70, 90);
  ellipse(mouseX, mouseY, cursorsize);
  rect(rectx, recty, 20, 20);
  fill(0);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);

  if (coin > 30 || coin < 0) {
    flip *= -1;
  }
  coin += flip;

  for (var i = 0; i < circles.length; i++) {
    fill(color(circles[i].c, 70, 90));
    noStroke();
    if (circles[i].x > width - 10 || circles[i].x < 10) {
      circles[i].vx *= -1;
    }
    if (circles[i].y > height - 10 || circles[i].y < 10) {
      circles[i].vy *= -1;
    }
    circles[i].x += circles[i].vx;
    circles[i].y += circles[i].vy;
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }

  for (var i = 0; i < circles2.length; i++) {
    fill(color(circles2[i].c, 70, 90));
    noStroke();
    ellipse(circles2[i].x, circles2[i].y, coin, circles2[i].r * 2);
  }

  play();
  addTime();
}

function play() {
  if (gameIsOver) {
    fill(0);
    text("Game Over! Press R to Restart!", 20, 80);
    cursorsize = 0;
    if (score > highscore) {
      highscore = score;
    }
    text(`Highscore: ${highscore}`, 20, 100);
    if (score < 100) {
      text("Nice try! :)", 20, 120);
    } else if (score < 200) {
      text("Good job! :)", 20, 120);
    } else if (score < 300) {
      text("Great job! :)", 20, 120);
    } else {
      text("Outstanding! :)", 20, 120);
    }
  }

  for (var i = 0; i < circles.length; i++) {
    movinghit = collideCircleCircle(
      circles[i].x,
      circles[i].y,
      20,
      mouseX,
      mouseY,
      cursorsize
    );
    if (movinghit && !gameIsOver) {
      score += 2;
      cursorsize += 1;
      circles[i].x = random(width);
      circles[i].y = random(height);
    }
  }

  for (var i = 0; i < circles2.length; i++) {
    hit = collideCircleCircle(
      circles2[i].x,
      circles2[i].y,
      30,
      mouseX,
      mouseY,
      cursorsize
    );
    if (hit && !gameIsOver) {
      score += 1;
      cursorsize += 1;
      circles2[i].x = random(width);
      circles2[i].y = random(height);
    }
    if (time % 50 === 0 && time > 0) {
      circles2[i].x = random(width);
      circles2[i].y = random(height);
    }
  }

  handleTime();
}

function keyPressed() {
  //if(mousePressed() && mouseX > 0 && mouseX < 40 && mouseY > 0 && mouseY < 20){
  //restart();
  //}
  if ((keyCode = 82)) {
    time = 1000;
    gameIsOver = false;
    hit = false;
    score = 0;
    movinghit = false;
  }
}

function addTime() {
  hitsquare = collideRectCircle(
    rectx,
    recty,
    20,
    20,
    mouseX,
    mouseY,
    cursorsize
  );
  if (hitsquare && !gameIsOver) {
    time += 50;
    rectx = random(width);
    recty = random(height);
  }
}

function handleTime() {
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
  }
}
