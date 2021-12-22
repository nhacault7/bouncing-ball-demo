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

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;             // Starting horizontal position
    this.y = y;             // Starting vertical position
    this.velX = velX;       // Horizontal velocity
    this.velY = velY;       // Vertical velocity
    this.color = color;     // Ball color
    this.size = size;       // Ball size
  }

  draw() {
    ctx.beginPath();                              // State we want to "draw" on canvas
    ctx.fillStyle = this.color;                   // Define the color of the shape
    ctx.arc(                                      // Draw circle
      this.x, this.y, this.size, 0, 2 * Math.PI   // 0 = starting degree, 2 * PI = 360 (radians)
      );                                          
    ctx.fill();                                   // State we want to finish "drawing"
  }
}