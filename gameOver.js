// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    createCanvas, loadImage, background, color, createButton, width, height, createImg, frameRate, textAlign, CENTER
 *    tint, textSize, text, fill, textFont, seconds, timer, textAlign, CENTER
 */

let endBackground, gameStarted, button, gameIcon, highscore;

//this one makes a million tabs if u allow popups
//var gameOverTime = window.open("https://forest-carnelian-journey.glitch.me/gamescript.html");
//gameOverTime.myVariable = timeSurvived;

//this one AUTOMATICALLY makes tabs for u
//var gameOverTime = location.search.substring(1);

//i hate both of them

function setup() {
  createCanvas(700, 500);
  gameStarted = false;
  timer = 200;
  
  //background
  endBackground = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fbackground_0.png?v=1595867675122"
  );
  
  //back to start screen button
  button = createImg('https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2F914646d74ba39a0.png?v=1596045956656');
  button.position(width / 2 - 40, height * 0.65);
  button.size(125, 150);
  button.mousePressed(startGame);
  
  //game over image
  gameIcon = createImg('https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2F181109dc777b33c.png?v=1596051217177');
  gameIcon.position(width * 0.25 , -10);
  gameIcon.size(400, 400);

  //highscore = 0;
}

function draw() {
  background(endBackground); 
  
  //some mf text
  textSize(20);
  textFont('Courier');
  textAlign(CENTER);
  
  var currentTime = localStorage.getItem("time");
  text('You have survived: ' + currentTime + ' seconds', width * 0.5, height * .58);

  
}

function startGame() {
  gameStarted = true;
  screenSwitch();
}

function screenSwitch() {
  if (gameStarted == true) {
    window.open("/index.html", "_self");  
  }
}