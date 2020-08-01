/* global
 *    loadImage, createCanvas, createButton, width, height, background, gameStarted, random,
 *    noStroke, fill, image, createImg, p5, rect, map, collideRectRect, userStartAudio, createP, timeIt, counter
 *    textSize, textFont, text, noFill, seconds, round, millis, push, pop
 */

let gameBackground,
  ground,
  platform,
  boi,
  timeBoard,
  cloudGif,
  button2,
  land_array,
  cloud_array,
  textbox,
  gameOver,
  onPlatform,
  instructionTextbox,
  instruction1,
  instruction2;
let mic,
  backgroundColor,
  playerY,
  platformY,
  s,
  x,
  spriteY,
  spriteW,
  vy,
  a,
  inAir,
  spriteH;
var timer,
  counter = 0,
  seconds;
//timeSurvived;

function preload() {
  gameBackground = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fbackground_0.png?v=1595867675122"
  );
  platform = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fplatform%203.png?v=1596050356368"
  );
  boi = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2FCharacterB2.png?v=1596049715178"
  );
  timeBoard = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fca1bbd189b63161.png?v=1596047945230"
  );
  ground = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fbackground_2.png?v=1595958699051"
  );
  cloudGif = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Faaaaaa.png?v=1596221466268"
  );
}

function setup() {
  createCanvas(700, 500);
  
  cloudGif.resize(250,0);

  //home button
  button2 = createImg(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2F914646d74ba39a0.png?v=1596045956656"
  );
  button2.position(width * 0.95, height * 0.05);
  button2.size(70, 80);
  button2.mousePressed(press);
  gameOver = false;

  //textbox button, click to erase
  instructionTextbox = createImg(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Ftextbox.png?v=1596146762300"
  );
  instructionTextbox.position(250, 50);
  instructionTextbox.size(350, 140);
  //instructionTextbox.mousePressed(understoodInstructions);

  gameStarted = true;
  mic = new p5.AudioIn();
  mic.start();
  spriteH = 75;
  spriteW = 75;
  x = 250;
  platformY = height - spriteH;
  land_array = [new Land(200, 550)];
  cloud_array = [new clouds(50), new clouds(350), new clouds(600)];
  spriteY = land_array[0].y - spriteH;
  vy = 0;
  a = 0.1;
  onPlatform = true;
  inAir = false;

  //survival timer
  //timeSurvived.setTime(0);
  // timer = createP("0");
}

function draw() {
  background(gameBackground);
  localStorage.setItem("time", round(millis() / 1000));
  image(timeBoard, 10, -40);
  timeBoard.resize(150, 0);
  push();
  fill(0);
  textFont("Courier");
  textSize(28);
  text(localStorage.getItem("time"), 115, 41);
  pop();
  image(ground, 0, height - 200);
  ground.resize(width, 200);

  onPlatform = false;

  for (var i = 0; i < land_array.length; i++) {
    //making land!!!!!
    land_array[i].move();
    land_array[i].show();
  }

  for (var i = 0; i < cloud_array.length; i++) {
    //making land!!!!!
    cloud_array[i].move();
    cloud_array[i].show();
  }

  if (onPlatform) {
    spriteY = platformY - spriteH;
  } //if platform changes and sprite is there, keep him there

  noFill();
  rect(x + spriteW / 4, spriteY + spriteH - 5, spriteW / 2, 5); //rect for reference and cheaty reasons >:)
  image(boi, x, spriteY, spriteW, spriteH);

  vy += a;

  if (spriteY == platformY - spriteH && onPlatform) {
    //if the boy is on the platform, don't do anything
    vy = 0;
    inAir = false;
  }
  if (onPlatform && mic.getLevel() > 0.01) {
    //when someone screams, map volume to height
    vy += map(mic.getLevel(), 0, 1, 0, -1);
    inAir = true;
  } else if (spriteY >= platformY - spriteH && !onPlatform) {
    //if he leaves platform without jumping, fall
    vy += a;
  }

  if (vy < 0) {
    //determines where the sprite should be (above, below, or on platform)
    spriteY = Math.min(spriteY + vy, platformY - spriteH);
  } else if (vy > 0 && !inAir) {
    spriteY = Math.max(spriteY + vy, platformY - spriteH);
  } else if (vy > 0 && inAir) {
    spriteY += vy;
  }

  if (spriteY >= height) {
    //check if the sprite fell off the screen
    gameOver = true;
    screenSwitch();
  }
}

function keyPressed() {
  //to start??? user audio??
  userStartAudio();
  instructionTextbox.hide();
}

function press() {
  gameStarted = false;
  screenSwitch();
}

function screenSwitch() {
  if (gameStarted == false) {
    window.open("/index.html", "_self");
  }
  if (gameOver) {
    //console.log(timeSurvived.time);
    window.open("/gameOver.html", "_self");
  }
}

//creating platforms at random heights/with random widths
class Land {
  constructor(xval, w) {
    this.h = 15; //random(80, 150);
    this.w = w;
    this.x = xval;
    this.y = height - random(100, 200);
    this.onPlatform = false;
  }

  show() {
    noStroke();
    noFill();
    rect(this.x, this.y, this.w, this.h);
    image(platform, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= 2;
    if (
      round(this.x + this.w) == width - 100 ||
      round(this.x + this.w) == width - 99
    ) {
      //as land approaches left side, create more land
      land_array.push(new Land(width, random(200, 550)));
    }
    if (this.x <= -this.w - 10) {
      //when land leaves screen, remove so the game doesn't lag
      land_array.shift();
    }
    if (this.x <= x + spriteW && this.x + this.w >= x) {
      //when land reaches sprite, change appropriate y level
      platformY = this.y;
    }
    if (
      collideRectRect(
        this.x,
        this.y,
        this.w,
        this.h,
        x + spriteW / 4,
        spriteY + spriteH - 5,
        spriteW / 2,
        5
      )
    ) {
      //if the rect behind the sprite and land collide, the sprite has successfully landed on the platform
      onPlatform = true;
    }
  }
}

class clouds {
  constructor(xval) {
    this.x = xval;
    this.y = random(50, 150);
  }

  show() {
    noStroke();
    noFill();
    image(cloudGif, this.x, this.y);
  }

  move() {
    this.x -= 0.1;
    if (this.x == width - 250) {
      cloud_array.push(new clouds(width));
    }
    if (this.x <= -200) {
      //when cloud leaves screen, remove so the game doesn't lag
      cloud_array.shift();
    }
  }
}
