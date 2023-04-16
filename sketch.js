// module aliases
const Engine = Matter.Engine,
  //Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Composite = Matter.Composite;

let boundary;
let bucket;
let bucketContainer;
let boundaryArray = [];
let circleArray = [];
let pegsArray = [];
let bucketsArray = [];
let numberOfBuckets = 6;
let bucketContainerArray = [];
let scorePadArray = [];
let bucketScoreArray = [0];
let scorePad;
let colorArray = ["red", "blue", "green", "yellow", "orange"];
let world;
let engine;
let collides;
let rows = 6;
let cols = 6;
let score = 0;
let bucketScore = 0;
let totalScore = 0;
let pinScoreDisplay;
let bucketScoreDisplay;
let totalScoreDisplay;
let textColor0 = "purple";
let textColor1 = "purple";
let textColor2 = "purple";
let textColor3 = "purple";
let textColor4 = "purple";
let textColor5 = "purple";

function preload() {
  bellSound = loadSound("bell.wav");
}

function setup() {
  createCanvas(440, 600);
  frameRate(30);

  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);

  function collision(event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA == "peg" && labelB == "ball") {
        bellSound.play();
        score++;
        scoreDisplay = document.getElementById("score").innerHTML = score;
      }
      if (labelA == "ball" && labelB == "peg") {
        bellSound.play();
        score++;
        pinScoreDisplay = document.getElementById("score").innerHTML = score;
      }
    }
  }
  Events.on(engine, "collisionStart", collision);

  function padCollision(event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA == "scorePad" && labelB == "ball") {
        bellSound.play();
      }
      if (labelA == "ball" && labelB == "scorePad") {
        bellSound.play();
        score++;
        pinScoreDisplay = document.getElementById("score").innerHTML = score;
      }
    }
  }
  Events.on(engine, "collisionStart", padCollision);

  boundaryArray.push(
    new Boundary(width / 2, height + 22, width * 2, 50, 0.0),
    new Boundary(-35, 0, width / 6, height * 2, 0.0),
    new Boundary(width + 35, 0, width / 6, height * 2, 0.0)
  );
  for (let i = 0; i < 6; i++) {
    let spacing = 66;
    let x = 43 + i * (spacing + 6);
    scorePad = new Bucket(x, height - 5, 5, 60, PI / 2);
    scorePadArray.push(scorePad);
  }

  for (let i = 0; i < numberOfBuckets; i++) {
    let spacing = 72;
    let x = 5 + i * spacing;
    bucket = new Bucket(x, height, 1, 150, 0);
    bucketsArray.push(bucket);
  }

  for (let i = 0; i < numberOfBuckets; i++) {
    let spacing = 74;
    let x = 3 + i * spacing;
    bucketContainer = new BucketContainer(x, height, 68, 75, "purple");
    bucketContainerArray.push(bucketContainer);
  }

  let spacing = 70;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let color = colorArray[Math.floor(Math.random() * colorArray.length)];
      let x = 60 + i * spacing;
      if (j % 2 == 0) {
        x -= spacing / 2;
      }
      let y = spacing + 40 + j * spacing;
      let p = new Peg(x, y, 10, color);
      pegsArray.push(p);
    }
  }

  //setup end
}

function ballBucketCollision() {
  for (let i = 0; i < circleArray.length; i++) {
    for (let j = 0; j < bucketContainerArray.length; j++) {
      let pos = circleArray[i].body.position;

      if (
        pos.y + circleArray[i].r * 2 > bucketContainerArray[j].y &&
        pos.x + circleArray[i].r > bucketContainerArray[j].x &&
        pos.x - circleArray[i].r <
          bucketContainerArray[j].x + bucketContainerArray[j].w
      ) {
        bucketContainerArray[j].color = "yellow";

        if (j == 0) {
          bucketScore = 10;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor0 = "yellow";
        }
        if (j == 1) {
          bucketScore = 30;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor1 = "yellow";
        }

        if (j == 2) {
          bucketScore = 100;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor2 = "yellow";
        }
        if (j == 3) {
          bucketScore = 50;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor3 = "yellow";
        }
        if (j == 4) {
          bucketScore = 30;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor4 = "yellow";
        }
        if (j == 5) {
          bucketScore = 10;
          bucketScoreDisplay = document.getElementById("bScore").innerHTML =
            bucketScore;
          totalScore = bucketScore + score;
          totalScoreDisplay = document.getElementById("tScore").innerHTML =
            totalScore;
          textColor5 = "yellow";
        }
      }
    }
  }
}
function drawBucketText() {
  stroke(textColor0);
  textSize(32);
  text("10", 20, 570);

  stroke(textColor1);
  textSize(32);
  text("30", 90, 570);

  stroke(textColor2);
  textSize(32);
  text("100", 160, 570);

  stroke(textColor3);
  textSize(32);
  text("50", 240, 570);

  stroke(textColor4);
  textSize(32);
  text("30", 320, 570);

  stroke(textColor5);
  textSize(32);
  text("10", 390, 570);
}

function mousePressed() {
  let color = colorArray[Math.floor(Math.random() * colorArray.length)];
  circleArray.push(new Circle(mouseX, mouseY, 12, color));
  score = 0;
}

function draw() {
  background(0);
  drawBucketText();

  for (let i = 0; i < pegsArray.length; i++) {
    pegsArray[i].draw();
  }

  for (let i = 0; i < bucketsArray.length; i++) {
    bucketsArray[i].draw();
  }
  for (let i = 0; i < bucketContainerArray.length; i++) {
    bucketContainerArray[i].draw();
  }

  for (let i = 0; i < scorePadArray.length; i++) {
    scorePadArray[i].draw();
  }

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    if (circleArray[i].isOffScreen()) {
      circleArray[i].removeFromWorld();
      circleArray.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < boundaryArray.length; i++) {
    boundaryArray[i].draw();
  }

  ballBucketCollision();
}

function windowResized() {
  resizeCanvas(440, 600);
  //draw end
}
