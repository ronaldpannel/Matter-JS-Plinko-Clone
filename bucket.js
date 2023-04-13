class Bucket {
  constructor(x, y, w, h, a) {
    let options = {
      friction: 0.001,
      restitution: 0.9,
      isStatic: true,
      angle: a,
    };
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    Composite.add(engine.world, [this.body]);
  }
  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    strokeWeight(10);
    stroke(255);
    pop();
  }
}
