// module aliases
const Engine = Matter.Engine,
  //Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

let boundary;
let boundaryArray = [];
let circleArray = [];
let pegsArray = []
let colorArray = ['red', 'blue', 'green', 'yellow', 'orange']
let world;
let engine;
let rows = 6
let cols = 6

function setup() {
  createCanvas(400, 600);
  frameRate(30);

  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);

  boundaryArray.push(
    
    new Boundary(width/2,height +22, width*2, 50, 0.0),
    new Boundary(-35,0,width/6,height*2, 0.0),
    new Boundary(width+ 35, 0,width/6,height*2, 0.0)
  );
  let spacing = 70;


  for (let j = 0; j < rows; j++) {
    for(let i = 0; i < cols; i++){
      let color = colorArray[Math.floor(Math.random() * colorArray.length)];
      let x = 60 + i * spacing
       if (j % 2 == 0) {
         x -= spacing / 2;
       }
      let y = (spacing +50) + j * spacing
      let p = new Peg(x, y, 10, color)
      pegsArray.push(p);

    }
      
  }

  //setup end
}


function mousePressed() {
  let color = colorArray[Math.floor(Math.random() * colorArray.length)];
  circleArray.push(new Circle(mouseX, mouseY, 18, color));
}

function draw() {
  background(0);

  //draw pegs
  for(let i = 0; i < pegsArray.length; i++){
    pegsArray[i].draw()
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
  //console.log(circleArray.length, world.bodies.length);
}

function windowResized() {
  resizeCanvas(600, 600);
  draw();
  //draw end
}
