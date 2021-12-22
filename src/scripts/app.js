// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random RGB color

function randomColor() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}

// Recursive animation loop function

function loop() {
  // called every frame to cover ball position in previous frame
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';      // Set the canvas fill color
  ctx.fillRect(0, 0, width, height);          // Draws a rectangle of the color

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].detectCollision();
  }

  requestAnimationFrame(loop);
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;             // Starting horizontal position
    this.y = y;             // Starting vertical position
    this.velX = velX;       // Horizontal velocity
    this.velY = velY;       // Vertical velocity
    this.color = color;     // Ball color
    this.size = size;       // Ball size
  }

  /**
   * Draw a ball on the canvas
   */
  draw() {
    ctx.beginPath();                              // State we want to "draw" on canvas
    ctx.fillStyle = this.color;                   // Define the color of the shape
    ctx.arc(                                      // Draw circle
      this.x, this.y, this.size, 0, 2 * Math.PI   // 0 = starting degree, 2 * PI = 360 (radians)
      );                                          
    ctx.fill();                                   // State we want to finish "drawing"
  }
  
  /**
   * Checks if touching edge of screen then updates balls position
   */
  update() {
    if ((this.x + this.size) >= width) {    // if the x coordinate is greater than the width of the canvas
      this.velX = -(this.velX);             // (the ball is going off the right edge)
    }

    if ((this.x - this.size) <= 0) {        // if the x coordinate is smaller than 0
      this.velX = -(this.velX);             // (the ball is going off the left edge)
    }

    if ((this.y + this.size) >= height) {   // if the y coordinate is greater than the height of the canvas
      this.velY = -(this.velY);             // (the ball is going off the bottom edge)
    }
  
    if ((this.y - this.size) <= 0) {        // if the y coordinate is smaller than 0
      this.velY = -(this.velY);             // (the ball is going off the top edge)
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  detectCollision() {
    for (let i = 0; i < balls.length; i++) {
      if (!(this === balls[i])) {
        const dx = this.x - balls[i].x;
        const dy = this.y - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[i].size) {
          balls[i].color = this.color = randomColor();
        }
      }
    }
  }
}

let balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),            
    random(0 + size, height - size),           
    random(-7, 7),                                                
    random(-7, 7),                                                
    randomColor(), 
    size,                                               
  );

  balls.push(ball);
}

loop();