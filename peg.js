class Peg {
  constructor(x, y, r, color) {
    let options = {
      friction: 0.001,
      restitution: 0.9,
      isStatic: true
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.color = color
    Composite.add(engine.world, [this.body]);
  }
  isOffScreen() {
    let pos = this.body.position;
    if (pos.x < 0 || pos.x > width || pos.y > height) {
      return true;
    } else {
      return false;
    }
  }
  removeFromWorld() {
    Composite.remove(world, this.body);
  }
  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(this.color);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
