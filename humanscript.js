
    var blk = document.querySelectorAll(".blk");
    var toggle = document.getElementById("toggle");
    var updateMessage = document.getElementById("updateMessage");

    var gameOver = false;
    toggle.style.display = "none";
    var playerOScore = 0;
    var playerXScore = 0;
    var array = [];
    var currentPlayer = "O";

    function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    for (let i = 0; i < blk.length; i++) {
      blk[i].addEventListener("click", playerTurn);
    }

    function playerTurn() {
      if (this.value === " " && !gameOver) {
        this.value = currentPlayer;

        // Check for winning condition
        if (winningCombination(currentPlayer)) {
          gameOver = true;
          updateMessage.textContent = "Player " + currentPlayer + " wins!";
          updateScore();
          toggle.style.display = "block";
          setTimeout(resetGame, 1500);
        }

        // Check for a draw
        else if (vacantChecker()) {
          gameOver = true;
          toggle.style.display = "block";
          updateMessage.textContent = "It's a draw!";
          setTimeout(resetGame, 1500);
        }

        // Switch to the next player
        currentPlayer = currentPlayer === "O" ? "X" : "O";
      }
    }

    function vacantChecker() {
      for (let i = 0; i < blk.length; i++) {
        if (blk[i].value === " ") {
          return false;
        }
      }
      return true;
    }

    function winningCombination(player) {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (
          blk[i * 3].value === player &&
          blk[i * 3 + 1].value === player &&
          blk[i * 3 + 2].value === player
        ) {
          return true;
        }
      }

      // Check columns
      for (let i = 0; i < 3; i++) {
        if (
          blk[i].value === player &&
          blk[i + 3].value === player &&
          blk[i + 6].value === player
        ) {
          return true;
        }
      }

      // Check diagonals
      if (
        (blk[0].value === player && blk[4].value === player && blk[8].value === player) ||
        (blk[2].value === player && blk[4].value === player && blk[6].value === player)
      ) {
        return true;
      }

      return false;
    }

    function updateScore() {
      if (currentPlayer === "O") {
        playerOScore += 1;
      } else {
        playerXScore += 1;
      }

      document.getElementById("HUMAN1").textContent = "Player O - " + playerOScore;
      document.getElementById("HUMAN2").textContent = "Player X - " + playerXScore;
    }

    function resetGame() {
      currentPlayer = "O";
      gameOver = false;
      toggle.style.display = "none";
      updateMessage.textContent = "";
      array = [];

      for (let i = 0; i < blk.length; i++) {
        blk[i].value = " ";
      }
    }
