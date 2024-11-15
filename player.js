

const player = document.querySelector('.player');

// INITAL POS
let playerX = 50;
let playerY = 60;


const playerSpeed = 5;


document.addEventListener('keydown', (event) => {
  switch (event.key) {
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


document.addEventListener('mousemove', (event) => {
    const tileSize = 100; // Assuming your tiles are of this size
    playerX = event.clientX - (tileSize / 2);
    playerY = event.clientY - (tileSize / 2);
    updatePlayerPosition();
});




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

