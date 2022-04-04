let player;
const playerYPosition = 200;

const canvasWidth = 600;
const canvasHeight = 400;
let fallSpeed = 0;
let jumpHeight = canvasHeight / 2;

let gameClock;
let points;
const pointsPer = 100;
const fontHeight = 25;

const gameCanvas = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.querySelector('#title'));
  }
}

let block;
const minblockHeight = canvasHeight / 4;
const maxBlockWidth = canvasWidth / 10;
const minBlockSpeed = canvasWidth / 100;
const maxBlockSpeed = canvasWidth / 50;

class Player {
  constructor(ctx, width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    this.ctx = ctx;
    this.isJumping = false;
  }

  draw() {
    this.ctx.fillStyle = '#CCC';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fall() {
    this.y += fallSpeed;
    fallSpeed += 0.1;
    this.checkForGround();
  }

  jump() {
    this.y -= jumpHeight;
  }

  checkForGround() {
    const ground = canvasHeight - this.height;
    if (this.y > ground) {
      this.y = ground;
      fallSpeed = 0;
    }
  }

  handleKeyStrokes(e) {
    if (e.code == 'Space') {
      this.jump();
    }
  }
}

class Block {
  constructor(ctx) {
    this.ctx = ctx;
    this.initialize();
  }

  draw() {
    if (this.offcanvas()) {
      this.initialize();
    }
    this.ctx.fillStyle = '#F00';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= this.speed;
  }

  replay() {
    this.initialize();
  }

  offcanvas() {
    return this.x < 0;
  }

  initialize() {
    this.width = this.determineWidth();
    this.height = this.determineHeight();
    this.speed = this.determineSpeed();
    this.x = canvasWidth;
    this.y = canvasHeight - this.height;
  }

  determineHeight() {
    const height = Math.round(Math.random() * canvasHeight / 3);
    return height < minblockHeight ? minblockHeight : height;
  }

  determineWidth() {
    const width = Math.round(Math.random() * canvasWidth);
    return width > maxBlockWidth ? maxBlockWidth : width;
  }

  determineSpeed() {
    const speed = Math.round(Math.random() * canvasWidth / 10);
    if (speed >= minBlockSpeed && speed <= maxBlockSpeed) {
      return speed;
    } else if (speed < minBlockSpeed) {
      return minBlockSpeed;
    } else {
      return maxBlockSpeed;
    }
  }
}

class Points {
  constructor(ctx, x, y, points = 0) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.points = points;
  }

  draw() {
    this.ctx.font = `${fontHeight}px monospace`;
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(this.getText(), this.x, this.y);
  }

  increment() {
    this.points += pointsPer;
  }

  displayFinal() {
    this.clearTally();
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.getFinalText(), canvasWidth/2, canvasHeight/2);
  }

  getText() {
    return `Points: ${this.points}`;
  }

  getFinalText() {
    return `Total Points: ${this.points}`;
  }

  clearTally() {
    this.ctx.clearRect(0, 0, canvasWidth, this.x + fontHeight);
  }
}

const detectCollision = (player, block) => {
  playerLeft = player.x;
  playerRight = player.x + player.width;
  blockLeft = block.x;
  blockRight = block.x + block.width;

  playerBottom = player.y + player.height;
  blockTop = block.y;

  return playerRight > blockLeft
    && playerLeft < blockLeft
    && playerBottom > blockTop;
};

const updateGame = (ctx, player, block) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  block.move();
  if (block.offcanvas()) {
    points.increment();
  }
  block.draw();
  player.fall();
  player.draw();
  points.draw();

  if (detectCollision(player, block)) {
    clearInterval(gameClock);
    points.displayFinal();

    const button = document.createElement('button');
    button.innerText = 'Reset Game'
    button.classList.add('reset');
    button.addEventListener('click', (event) => {
      startGame();
      event.target.remove();
    });

    document.body.insertBefore(button, document.querySelector('#title'));
  };
};

const startGame = () => {
  gameCanvas.start();
  const ctx = gameCanvas.context;

  player = new Player(ctx, 30, 30, 10);
  block = new Block(ctx);
  points = new Points(ctx, 10, 30);

  document.addEventListener('keydown', player.handleKeyStrokes.bind(player));
  gameClock = setInterval(() => updateGame(ctx, player, block), 20);
};

startGame();