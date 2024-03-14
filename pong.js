let ball;
let paddle;
let canvasSize = 400;
let scoreRight = 0;
let scoreLeft = 0;

function Paddle(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;

  this.draw = function() {
    fill(255, 255, 255); 
    rect(this.x, this.y, this.width, this.height);
  };

  this.moveUp = function() {
    this.y -= this.speed;
  };

  this.moveDown = function() {
    this.y += this.speed
  };
};

function Ball(x, y, xSpeed, ySpeed, size) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed
  this.size = size;

  this.draw = function() {
    fill (255, 255, 255);
    rect(this.x, this.y, this.size, this.size);
  };

  this.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  };

  this.bounceX = function() {
    this.xSpeed = this.xSpeed * -1;
  };

  this.bounceY = function() {
    this.ySpeed = this.ySpeed * -1;
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);

  // Create a paddle object
  paddleLeft = new Paddle(20, canvasSize / 2 - 30, 10, 60, 5);

  // Create a paddle object
  paddleRight = new Paddle(360, canvasSize / 2 -30, 10, 60, 5);

  // Create a ball object
  ball = new Ball(canvasSize / 2, canvasSize / 2, -3, 3, 15);
};

function draw() {
  background(0);

  paddleLeft.draw();

  paddleRight.draw();

  ball.draw();

  ball.move();

  if (upKeyPressed && paddleRight.y > 0) {
    paddleRight.moveUp();
  }
  if (downKeyPressed && (paddleRight.y + paddleRight.height) < canvasSize) {
    paddleRight.moveDown();
  }

  if (wKeyPressed && paddleLeft.y > 0) {
    paddleLeft.moveUp();
  }
  if (sKeyPressed && (paddleLeft.y + paddleLeft.height) < canvasSize) {
    paddleLeft.moveDown();
  }

  if (ball.y <= 0 || ball.y >= height - ball.size) {
    ball.bounceY();
  };

  let ballDiameter = 15; // Diameter of the ball

  if (ball.x + ballDiameter >= paddleRight.x && ball.x <= paddleRight.x + paddleRight.width &&
      ball.y + ballDiameter >= paddleRight.y && ball.y <= paddleRight.y + paddleRight.height) {
    ball.bounceX();
  } else if (ball.x <= paddleLeft.x + paddleLeft.width && ball.x + ballDiameter >= paddleLeft.x &&
      ball.y + ballDiameter >= paddleLeft.y && ball.y <= paddleLeft.y + paddleLeft.height) {
  ball.bounceX();
  };

  let leftScore = document.querySelector('.leftScoreNum');
  let rightScore = document.querySelector('.rightScoreNum');
  if (ball.x >= canvasSize) {
    scoreLeft ++;
    leftScore.textContent = scoreLeft;
    ball.x = canvasSize / 2;
    ball.y = canvasSize / 2;
  } else if (ball.x <= 0) {
    scoreRight ++;
    rightScore.textContent = scoreRight;
    ball.x = canvasSize / 2;
    ball.y = canvasSize / 2;
  }
};

let upKeyPressed = false;
let downKeyPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

function keyPressed() {
  if (keyCode === UP_ARROW) {
    upKeyPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    downKeyPressed = true;
  } else if (key === 'w') {
    wKeyPressed = true;
  } else if (key === 's') {
    sKeyPressed = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    upKeyPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downKeyPressed = false;
  } else if (key === 'w') {
    wKeyPressed = false;
  } else if (key === 's') {
    sKeyPressed = false;
  };
};
