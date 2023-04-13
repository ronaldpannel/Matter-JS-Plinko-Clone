// module aliases
const Engine = Matter.Engine,
  //Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.events;

let boundary;
let bucket;
let boundaryArray = [];
let circleArray = [];
let pegsArray = [];
let bucketsArray = [];
let numberOfBuckets = 7;
let scorePadArray = [];
let scorePad;
let colorArray = ["red", "blue", "green", "yellow", "orange"];
let world;
let engine;
let collides;
let rows = 6;
let cols = 6;
let score = 0;
let scoreDisplay



function preload() {
  bellSound = loadSound("bell.wav");
}

function setup() {
  createCanvas(440, 600);
  frameRate(30);

 
  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);

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
    bucket = new Bucket(x, height, 5, 150, 0);
    bucketsArray.push(bucket);
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

function mousePressed() {
  let color = colorArray[Math.floor(Math.random() * colorArray.length)];
  circleArray.push(new Circle(mouseX, mouseY, 12, color));
}

function draw() {
  background(0);

  //draw pegs
  for (let i = 0; i < pegsArray.length; i++) {
    pegsArray[i].draw();
  }

  for (let i = 0; i < bucketsArray.length; i++) {
    bucketsArray[i].draw();
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
  //ball pin collision detection
  for (let i = 0; i < circleArray.length; i++) {
    for (let j = 0; j < pegsArray.length; j++) {
      let posC = circleArray[i].body.position;
      let posP = pegsArray[j].body.position;
      let dx = posC.x - posP.x;
      let dy = posC.y - posP.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (circleArray[i].r + pegsArray[j].r > distance) {
        bellSound.play();
        score++;
        scoreDisplay = (document.getElementById("score").innerHTML = score);
      
        console.log(score)
  
      }
    }
  }
  
  for (let i = 0; i < boundaryArray.length; i++) {
    boundaryArray[i].draw();
  }
  //console.log(circleArray.length, world.bodies.length);
}

function windowResized() {
  resizeCanvas(600, 600);
  draw();
  //draw end
}
