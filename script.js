var blk = document.querySelectorAll(".blk");
var defendChecker = "undefend";
var attackChecker = "unattack";
var firstTurn = 0;
var userMiddleTurn = 0;
var deadZoneTurn = 0;
var commonBlocker = 0;
var clickPreventer = 0;
var diagonalDeadZone1 = 0;
var diagonalDeadZone2 = 0;

var AI = document.getElementById("AI");
var HUMAN = document.getElementById("HUMAN");
var toggle = document.getElementById("toggle");
var updateMessage = document.getElementById("updateMessage");

var gameOver = false;
toggle.style.display = "none";
var humanScore = 0;
var AIScore = 0;
var array = [ ];

for(let i = 0; i < blk.length; i++) {
  blk[i].addEventListener("click",inIt);
}

function inIt() {
  if(this.value !== "x" && this.value === " " && gameOver === false && clickPreventer === 0) {
    this.value = "0";
        clickPreventer = 1;

        //cheacking human wining condition
    if(winningCombination("0")) {

      gameOver = true;
            humanScore += 1;
      HUMAN.textContent = "YOU(O) - " + humanScore;
            toggle.style.display = "block";
            updateMessage.textContent = "Congratulation ! you won.";
            setTimeout(resetGame,1500);
        }

    //checking for game draw
    else if (vacantChecker() && !winningCombination("0") && !winningCombination("x") ) {

      gameOver = true;
            toggle.style.display = "block";
            updateMessage.textContent = "Well tried, It's draw.";
            setTimeout(resetGame,1500);
        }

    if(gameOver === false) {
      AIplay();
    }
    }

}

// Define player symbols
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize the game state
let currentPlayer = PLAYER_X;
let gameOver = false;

// Get all the buttons on the board
const buttons = document.querySelectorAll('.blk');

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if the button is empty and the game is not over
    if (button.value === ' ' && !gameOver) {
      // Set the current player's symbol on the button
      button.value = currentPlayer;

      // Check for a winner or a tie
      if (checkWinner()) {
        // alert(`${currentPlayer} wins!`);
        updateMessage.textContent = 'Player ' + currentPlayer + ' wins!';
        resetGame();
      } else if (checkTie()) {
        // alert('It\'s a tie!');
        updateMessage.textContent = "Well tried, It's draw.";
        resetGame();
      } else {
        // Switch to the next player
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      }
    }
  });
});


// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['a', 'd', 'g'],
    ['b', 'e', 'h'],
    ['c', 'f', 'i'],
    ['a', 'e', 'i'],
    ['c', 'e', 'g'],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      buttons[a.charCodeAt(0) - 97].value !== ' ' &&
      buttons[a.charCodeAt(0) - 97].value === buttons[b.charCodeAt(0) - 97].value &&
      buttons[a.charCodeAt(0) - 97].value === buttons[c.charCodeAt(0) - 97].value
    ) {
      return true; // There's a winner
    }
  }
  return false; // No winner yet
}

// Function to check for a tie
function checkTie() {
  return Array.from(buttons).every(button => button.value !== ' ');
}


// Function to check for a winner
// function checkWinner() {
  // Logic to check for a winner
// }

// Function to check for a tie
// function checkTie() {
  // Logic to check for a tie
// }

// Function to reset the game
function resetGame() {
  buttons.forEach(button => {
    button.value = ' ';
  });

  // toggle.style.display = "none";
  updateMessage.style.color = "green";

  currentPlayer = PLAYER_X;
  gameOver = false;
}
