let gameBoard = document.querySelector('.game-board');
let resetButton = document.querySelector('.reset-button');
let FirstWin = false;
let levelCounter = 0;
let tiles = [];
let selectedTiles = [];
let PlayerOnTile= [];
function getRandomColor() {
    let colors = ['#60E0EB', '#5557FB', '#52ADA2', '#FFFFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}
class Player {
  constructor() {
    this.health = 1900;
    this.shield = 50;
    this.invincible = false;
    this.invincibilityTimer = 0;
  }

  takeDamage = (damage) => {
    if (this.shield > 0) {
      this.shield -= damage;
      if (this.shield < 0) {
        this.health += this.shield;
        this.shield = 0;
      }
    } else {
      this.health -= damage;
      playerInstance.makeInvincible(20)
      console.log("hit")
    }

    if (this.health <= 0) {
      this.die();
    }
  }

  update = () => {
    if (this.invincible) {
      this.invincibilityTimer--;
      if (this.invincibilityTimer <= 0) {
        this.invincible = false;
      }
    }
  }

  makeInvincible = (duration) => {
    this.invincible = true;
    this.invincibilityTimer = duration;
  }

  die = () => {
    alert('Game Over!');
    this.health = 1900;
    resetGame();
  }
}
class TheShadow {
  constructor() {
    this.health = 100;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  stun(duration) {
    this.isStunned = true;
    setTimeout(() => {
      this.isStunned = false;
    }, duration);
  }

  die() {
   
  }
}


const player = document.querySelector('.player');

// INITAL POS
let playerX = 50;
let playerY = 60;


const playerSpeed = 5;


document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      movePlayer(0, -100);
      break;
    case 'a':
      movePlayer(-100, 0);
      break;
    case 's':
      movePlayer(0, 100);
      break;
    case 'd':
      movePlayer(100, 0);
      break;
    case 'q':
      dash();
      break;
    case 'e':
      shield();
      break;
    case 'r':
      specialAttack();
      break;
  }
});


function movePlayer(dx, dy) {
  previousPlayerX = playerX;
  previousPlayerY = playerY;
  playerX += dx;
  playerY += dy;
  player.style.top = `${playerY}px`;
  player.style.left = `${playerX}px`;
}





// Dash
function dash() {
  const dashDistance = 20;
  const dashSpeed = 10;
  const dashDirection = getDirection();


  for (let i = 0; i < dashDistance; i++) {
    movePlayer(dashDirection.x * dashSpeed, dashDirection.y * dashSpeed);
  }

 
  const dash = document.createElement('div');
  dash.classList.add('dash');
  dash.style.top = `${playerY}px`;
  dash.style.left = `${playerX}px`;
  document.querySelector('.game-board').appendChild(dash);

 
  setTimeout(() => {
    dash.remove();
  }, 700);
}

// Shield
function shield() {
  
  const shield = document.createElement('div');
  shield.classList.add('shield');
  shield.style.top = `${playerY}px`;
  shield.style.left = `${playerX}px`;
  document.querySelector('.game-board').appendChild(shield);
	player.shield=true;
  
  setTimeout(() => {
    shield.remove();
  }, 1000);
}

// SP ATK
function specialAttack() {
 
  const specialAttack = document.createElement('div');
  specialAttack.classList.add('special-attack');
  specialAttack.style.top = `${playerY}px`;
  specialAttack.style.left = `${playerX}px`;
  document.querySelector('.game-board').appendChild(specialAttack);

  setTimeout(() => {
    specialAttack.remove();
  }, 1000);
}
// dir of the player mvmt
let previousPlayerX = playerX;
let previousPlayerY = playerY;

function getDirection() {
  const direction = {
    x: 0,
    y: 0,
  };

  if (playerX < previousPlayerX) {
    direction.x = -1;
  } else if (playerX > previousPlayerX) {
    direction.x = 1;
  }

  if (playerY < previousPlayerY) {
    direction.y = -1;
  } else if (playerY > previousPlayerY) {
    direction.y = 1;
  }

  previousPlayerX = playerX;
  previousPlayerY = playerY;

  return direction;
}



function createGameBoard() {
  const colors = ['#60E0EB', '#5557FB', '#52ADA2', '#FFFFFF'];
  const colorPairs = [];
  for (let i = 0; i < 8; i++) {
    colorPairs.push(colors[i % 4]);
    colorPairs.push(colors[i % 4]);
  }
  shuffleArray(colorPairs);

  for (let i = 0; i < 16; i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.background = colorPairs[i];
    tile.addEventListener('click', selectTile);
    tile.style.setProperty('--glow-color', tile.style.background); 
    gameBoard.appendChild(tile);
    tiles.push(tile);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function selectTile(event) {
  let tile = event.target;
  if (tile.tagName.toLowerCase() === 'div' && !tile.classList.contains('matched') && !tile.classList.contains('selected')) {
    tile.classList.add('selected');
    tile.style.setProperty('--glow-color', tile.style.background); 
    tile.classList.add('glow');
    selectedTiles.push(tile);
  }
  if (selectedTiles.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
    let tile1 = selectedTiles[0];
    let tile2 = selectedTiles[1];
    if (tile1.style.background === tile2.style.background) {
        tile1.classList.remove('shake');
        tile2.classList.remove('shake');
        tile1.classList.add('matched');
        tile2.classList.add('matched');
        setTimeout(() => {
            tile1.remove();
            tile2.remove();
            tiles = tiles.filter(tile => tile !== tile1 && tile !== tile2);
            selectedTiles = [];
            if (tiles.length === 0) {
                alert('Congratulations! You won!');
            }
        }, 580); // ani finish
    } else {
        tile1.classList.add('shake');
        tile2.classList.add('shake');
        setTimeout(() => {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
            tile1.classList.remove('shake');
            tile2.classList.remove('shake');
            tile1.classList.remove('glow'); 
            tile2.classList.remove('glow'); 
            selectedTiles = [];
        }, 500);
    }
    
    let tileLeft = parseInt(tile1.style.left);
    let tileTop = parseInt(tile1.style.top);
    if (playerX === tileLeft && playerY === tileTop) {
        let tileBackground = getComputedStyle(tile1).backgroundColor;
        if (tileBackground === 'rgb(0, 0, 0)' || tileBackground === 'black') {
            gameOver();
        }
    }
}
// shadow start

document.querySelector('.shadow-body').addEventListener('animationiteration', () => {
  document.querySelector('.shadow-body').style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
});

document.querySelector('.shadow-eyes').addEventListener('animationiteration', () => {
  document.querySelector('.shadow-eyes').style.transform = `scale(${Math.random() * 1.5 + 1})`;
});
//shadow-attack


function basicAttack() {
  const tendril = document.createElement('div');
  tendril.classList.add('tendril');
  tendril.style.top = `${Math.random() * 100}px`;
  tendril.style.left = `${Math.random() * 100}px`;
  document.querySelector('.game-board').appendChild(tendril);

  setTimeout(() => {
    tendril.remove();
  }, 1000);
}


function ShadowSpecialAttack() {
  const blast = document.createElement('div');
  blast.classList.add('blast');
  blast.style.top = '50%';
  blast.style.left = '50%';
  document.querySelector('.game-board').appendChild(blast);

  setTimeout(() => {
    blast.remove();
  }, 1000);
}


function areaOfEffectAttack() {
  const wave = document.createElement('div');
  wave.classList.add('wave');
  wave.style.top = '0';
  wave.style.left = '0';
  document.querySelector('.game-board').appendChild(wave);

  function removeWave() {
    wave.remove();
  }

  setTimeout(removeWave, 1000);
}

function shadowAttack() {
  const attacks = [basicAttack, ShadowSpecialAttack, areaOfEffectAttack];
  const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
  randomAttack();
}

setInterval(shadowAttack, 5000);

//player


document.querySelectorAll('.tile.red').forEach((tile) => {
  tile.addEventListener('click', () => {
    TheShadow.takeDamage(20);
  });
});


document.querySelector('.player').addEventListener('dash', () => {
  TheShadow.takeDamage(30);
  TheShadow.stun(500);
});

const playerInstance = new Player();

function checkCollisions() {
  const playerRect = player.getBoundingClientRect();

  const tendrilRects = document.querySelectorAll('.tendril').forEach((tendril) => {
    const tendrilRect = tendril.getBoundingClientRect();
    

    if (
      playerRect.x < tendrilRect.x + tendrilRect.width &&
      playerRect.x + playerRect.width > tendrilRect.x &&
      playerRect.y < tendrilRect.y + tendrilRect.height &&
      playerRect.y + playerRect.height > tendrilRect.y
    ) {
      if (!playerInstance.invincible) {
        playerInstance.takeDamage(100);
      }
    }
  });

  const blastRects = document.querySelectorAll('.blast').forEach((blast) => {
    const blastRect = blast.getBoundingClientRect();

    if (
      playerRect.x < blastRect.x + blastRect.width &&
      playerRect.x + playerRect.width > blastRect.x &&
      playerRect.y < blastRect.y + blastRect.height &&
      playerRect.y + playerRect.height > blastRect.y
    ) {
      if (!playerInstance.invincible) {
        playerInstance.takeDamage(200);
        
        
      }
    }
  });

  const waveRects = document.querySelectorAll('.wave').forEach((wave) => {
    const waveRect = wave.getBoundingClientRect();

    if (
      playerRect.x < waveRect.x + waveRect.width &&
      playerRect.x + playerRect.width > waveRect.x &&
      playerRect.y < waveRect.y + waveRect.height &&
      playerRect.y + playerRect.height > waveRect.y
    ) {
      if (!playerInstance.invincible) {
      	
        playerInstance.takeDamage(30);
        
      }
    }
  });
}
setInterval(() => {
	playerInstance.update();
  checkCollisions(playerInstance);
}, 16);

function gameOver() {
    alert('Game Over! You lost!');
    resetGame();
}
function resetGame() {
    gameBoard.innerHTML = '';
    tiles = [];
    selectedTiles = [];
    createGameBoard();
}

document.querySelector('.player-body').addEventListener('animationiteration', () => {
  document.querySelector('.player-body').style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
});

resetButton.addEventListener('click', resetGame);
createGameBoard();
