let player;
let bgImg;
let playerImage;
let obsImg;
let obstacles = [];
let wordClassifier;

function preload() {
  bgImg = loadImage("bg.jpg");
  playerImage = loadImage("player.png");
  obsImg = loadImage("obstacle.png");

  let options = {
    probabilityThreshold: 0.85,
  };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
  wordClassifier.classify(heardWord);
}
function heardWord(error, results) {
  console.log(results[0].label + " " + results[0].confidence);
  if (results[0].label === "up") {
    player.jump();
  }
}

function draw() {
  background(bgImg);

  if (random(1) < 0.007) {
    obstacles.push(new Obstacle());
  }

  for (let obs of obstacles) {
    obs.show();
    obs.move();

    if (player.collided(obs) === true) {
      console.log("game over");
      noLoop();
    }
  }

  player.show();
  player.move();
}

function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
