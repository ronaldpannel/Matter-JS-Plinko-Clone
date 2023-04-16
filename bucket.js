class Bucket {
  constructor(x, y, w, h, a) {
    let options = {
      friction: 0.9,
      restitution: 0.001,
      isStatic: true,
      angle: a,
    };
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = "scorePad";
    Composite.add(engine.world, [this.body]);
  }
  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noFill();
    strokeWeight(1);
    stroke(255, 0, 0);
    noStroke();
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class BucketContainer {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    noFill();
    strokeWeight(3);
    stroke(this.color);
    rect(this.x, this.y - this.h, this.w, this.h);
  }
}
