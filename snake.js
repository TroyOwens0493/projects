let snake = [];
let snakeLength = 1;
let gridSize = 20;
let direction = 'right';
let highScore = 0;
let apple = {
  x:0,
  y:0
};
let running = true;

//Create the Html canvas
function setup() {
  createCanvas(400, 400);
  frameRate(70);
  spawnApple();
  snake.push({ x: 1, y: 1});
  drawApple();
}

function draw() {
  if (running === true) {
    aiBrain();
    updateGame();
    updateDisp();
  } else {
    restart();
  }
}

function updateGame() {
  moveSnake();
  colisionDetect();
}

//Function that will update all of the things on screen.
function updateDisp() {
  background(0);//Set the background to black.
  drawSnake();//Call funt to draw the snake.
  drawApple();//Call funct to draw the apple
  drawScore();//Call funct to draw the score, score = snake length.
}

//Draw the snake.
function drawSnake() {
  for (let i =0; i < snake.length; i++ ) {//Loop that will repeat for the lenght of the snake.
    fill(0, 255, 0);//Set color to green
    noStroke();//Remove the outlline.
    rect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);//Draw the squares.
  }
}

//Draw the apple.
function drawApple() {
  fill(255, 0, 0);
  noStroke();
  rect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

//Draw the score.
function drawScore() {
  let scoreNumElement = document.querySelector('.scoreNum');

  if(scoreNumElement) {
    scoreNumElement.textContent = snakeLength;
  } else {
    console.error('Score element was not found');
  }
}

function colisionDetect() {
  //Check to see if we have eaten the apple.
  if (snake[0].x == apple.x && snake[0].y === apple.y) {
    snakeLength++;
    spawnApple();
  }

  //Function that will check to see if we have hit the body of the snake.
  for (let i =1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      endGame();
    }
  }

  //A funtion to see if we have hit any of the walls.
  if (snake[0].x * 20 === gridSize * gridSize || 
    snake[0].x * 20 < 0 || 
    snake[0].y * 20 === gridSize * gridSize || 
    snake[0].y * 20 < 0) {
    endGame();
  }
}

function aiBrain() {
  let rightSide = {
    x: snake[0].x + 1,
    y: snake[0].y
  };
  let leftSide = {
    x: snake[0].x - 1,
    y: snake[0].y
  };
  let upSide = {
    x: snake[0].x,
    y: snake[0].y - 1
  };
  let downSide = {
    x: snake[0].x,
    y: snake[0].y + 1
  };

  let appealRight = Math.abs(rightSide.x - apple.x) + Math.abs(rightSide.y - apple.y);
  let appealLeft = Math.abs(leftSide.x - apple.x) + Math.abs(leftSide.y - apple.y);
  let appealUp = Math.abs(upSide.x - apple.x) + Math.abs(upSide.y - apple.y);
  let appealDown = Math.abs(downSide.x - apple.x) + Math.abs(downSide.y - apple.y);

  for (let i = 1; i < snake.length; i++) {
    if (rightSide.x === snake[i].x && rightSide.y === snake[i].y) {
      appealRight += 1000;
    } else if (leftSide.x === snake[i].x && leftSide.y === snake[i].y) {
      appealLeft += 1000;
    } else if (upSide.x === snake[i].x && upSide.y === snake[i].y) {
      appealUp += 1000;
    } else if (downSide.x === snake[i].x && downSide.y === snake[i].y) {
      appealDown += 1000;
    }
  }

  if (
    appealRight <= appealLeft &&
    appealRight <= appealUp &&
    appealRight <= appealDown
  ) {
    direction = 'right';
  } else if (
    appealLeft <= appealRight &&
    appealLeft <= appealUp &&
    appealLeft <= appealDown
  ) {
    direction = 'left';
  } else if (
    appealUp <= appealRight &&
    appealUp <= appealLeft &&
    appealUp <= appealDown
  ) {
    direction = 'up';
  } else {
    direction = 'down';
  }
}


function moveSnake() {
  if (direction === 'up') {//If statements that will find what dir we are moving and then they will move the snake and trim the tail.
    snake.unshift({x: snake[0].x, y: snake[0].y - 1});
  } else if (direction === 'down') {
    snake.unshift({x: snake[0].x, y: snake[0].y + 1});
  } else if (direction === 'right') {
    snake.unshift({x: snake[0].x + 1, y: snake[0].y});
  } else if (direction === 'left') {
    snake.unshift({x: snake[0].x - 1, y: snake[0].y});
  }

  if (snake.length > snakeLength) {
    snake.pop();
  }
}

function spawnApple() {
  let newApple = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
  for (let i = 0; i < snake.length; i++) {
    if (newApple.x == snake[i].x && newApple.y == snake[i].y) {
      newApple = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      };
      i = 0;
    } else {
      apple = newApple;
    }
  }
}

function endGame() {
  if (snakeLength > highScore) {
    highScore = snakeLength;
    let highScoreNumElement = document.querySelector('.highScoreNum');
    if(highScoreNumElement) {
      highScoreNumElement.textContent = highScore;
    } else {
      console.error('Score element was not found');
    }
  }
  running = false;
}

function restart() {
  snake = [];
  snakeLength = 1;
  direction = 'right';
  setup();
  running = true;
}