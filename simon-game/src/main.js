let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

function humanTurn() {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateTile(tile) {
  const tileElement = document.querySelector(`[data-tile="${tile}"]`);
  
  tileElement.classList.add('active');
  
  setTimeout(() => {
    tileElement.classList.remove('active');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((tile, index) => {
    setTimeout(() => {
      activateTile(tile);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'yellow', 'blue'];
  const randomTile = tiles[Math.floor(Math.random() * tiles.length)];

  return randomTile;
}

function nextRound() {
  level++;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Watch the sequence';
  heading.textContent = `Level ${level} of 20`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn();
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if(humanSequence.length === 20) {
      resetGame('Congratulations! You have completed the game');
      return;
    }

    humanSequence = [];
    info.textContent = 'Success! Keep going!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden'); 
  info.classList.remove('hidden');
  info.textContent = 'Watch the sequence';
  
  nextRound();
}

tileContainer.addEventListener('click', event => {
  const {tile} = event.target.dataset;
  if (tile) handleClick(tile);
});

startButton.addEventListener('click', startGame);