/* global console.log, createCanvas, mouseX, mouseY, rect, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse, loadImage, loadSound, image*/

let drop1, drop2, numberOfDrops, drops, rainDropImage, lawnmowerImage, lawnmowerSound, numberOfBlades, blades;

function setup() {
  createCanvas(500, 500);
  rainDropImage = loadImage ('https://cdn.glitch.com/5cf1c294-0cab-4fda-bf5a-c8ca6a60f880%2Fcomputer-icons-color-raindrop-png-clip-art.png?v=1594840327250');
  lawnmowerImage = loadImage('https://cdn.glitch.com/dc27ea0c-bb43-45e2-b0ad-9a76e954edcf%2Funnamed.png?v=1594928855925');
  //lawnmowerSound = loadSound('https://cdn.glitch.com/dc27ea0c-bb43-45e2-b0ad-9a76e954edcf%2Flawn-mower-01.mp3?v=1594929220217');
  
  colorMode(HSB, 100);
  numberOfDrops = 50;
  numberOfBlades = 1000;
  drops = [];
  blades = [];
  let x=0;

  while(x<numberOfDrops){
    drops.push(new RainDrop())
    x++;
  }

  image(rainDropImage, this.x, this.y);
  image(lawnmowerImage,mouseX,mouseY, 30, 30);
   let y=0;

  while(y <numberOfBlades){
    blades.push(new Grass())
    y++;
  }
}

function draw() {
  background(0, 0, 95);
  
  for(var i=0; i<drops.length; i++) {
    drops[i].drip();
    drops[i].show();
  }

  for(var i=0; i<blades.length; i++) {
    blades[i].grow();
    blades[i].show();
  }
  
  image(lawnmowerImage,mouseX,mouseY-50, 50, 50);
}

function mouseDragged() {
  for (let g = 0; g < numberOfBlades; g++) {
    if(mouseX > blades[g].x - 5 && mouseX < blades[g].x + 5 && mouseY > blades[g].y) {
      blades[g].h = height - mouseY;
      blades[g].y = mouseY;
      //lawnmowerSound.play();
    }
  }
}

class RainDrop {
  constructor(h,w,fallSpeed) {
    this.x = random(width);
    this.y = random(height);
    this.h = random(2,4);
    this.w = random(20,30);
    this.fallSpeed = random(8,20);
  }

  drip() {
    this.y += this.fallSpeed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    image(rainDropImage, this.x, this.y, this.h, this.w);
  }
}

class Grass {
  constructor() {
    this.x = random(width);
    this.w = width/numberOfBlades;
    this.h = random(0,15);
    this.y = height-this.h
  }
  
  grow() {
    this.h = this.h + .25;
    this.y = this.y - .25;
  }
  
  show() {
    noStroke();
    fill(30, 80, 80);
    rect(this.x,this.y,this.w,this.h);
  }
}