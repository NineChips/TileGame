let gameBoard = document.querySelector('.game-board');
let resetButton = document.querySelector('.reset-button');
let FirstWin = false;
let tiles = [];
let selectedTiles = [];
function getRandomColor() {
    let colors = ['#60E0EB', '#5557FB', '#52ADA2', '#FFFFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
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
        }, 580); // wait for animation to finish
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
}
function resetGame() {
    gameBoard.innerHTML = '';
    tiles = [];
    selectedTiles = [];
    createGameBoard();
}



resetButton.addEventListener('click', resetGame);
createGameBoard();
