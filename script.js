// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    createCanvas, loadImage, background, color, createButton, width, height, createImg, frameRate,
 *    tint, textSize, text, fill, textFont
 */

let startBackground, gameStarted, button, timer, gameIcon;

function setup() {
  createCanvas(700, 500);
  gameStarted = false;
  timer = 200;
  
  //background
  startBackground = loadImage(
    "https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2Fbackground_0.png?v=1595867675122"
  );
  
  //start button
  button = createImg('https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2FUntitled_Artwork%202.gif?v=1596042051296');
  button.position(width / 2 - 80, height * 0.65);
  button.size(220, 75);
  button.mousePressed(startGame);
  
  //shows game icon
  gameIcon = createImg('https://cdn.glitch.com/f5638e79-2a83-4713-8c68-86e9c26dcfcb%2FgameIcon.png?v=1596040085165')
  gameIcon.position(width * 0.36 , height * 0.1);
  gameIcon.size(250, 250);
}

function draw() {
  background(startBackground); 
  
  //some mf text
  textSize(20);
  textFont('Courier');
  text('Created by: Hannah Kim, Yusi Ng, Gianna Maisano', width * .1, height * .85);
  text('Google CSSI 2020', width * .35, height * .9);
  
  textSize(17);
  text('This game uses a microphone.', width * .3, height * .53);
}

function startGame() {
  gameStarted = true;
  screenSwitch();
}

function screenSwitch() {
  if (gameStarted == true) {
    window.open("/gamescript.html", "_self");  
  }
}