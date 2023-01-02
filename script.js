// ---------- VARIABLES AND ELEMENTS ----------

const OPTIONS = ["rock", "paper", "scissors"];
const OPTIONS_EMOJI = ["✊", "🖐️", "✌️"];
const POSSIBLE_MATCHES = [["rock", "scissors"], 
                       ["scissors", "paper"], 
                       ["paper", "rock"]];
let playerWins = 0;
let computerWins = 0;
let round = 0;
let winsPerMatch = 3;

const infoText = document.querySelector('#info-text');
const playerChoiceDisplay = document.querySelector('#player-choice');
const playerRock = document.querySelector('#player-rock');
const playerPaper = document.querySelector('#player-paper');
const playerScissors = document.querySelector('#player-scissors');
const computerChoiceDisplay = document.querySelector('#computer-choice');
const winsPerMatchOptions = document.querySelectorAll('.info__dropdown-option');
const restartButton = document.querySelector('#restart-button');
const playerWinsDisplay = document.querySelector('#player-wins');
const computerWinsDisplay = document.querySelector('#computer-wins');


// ---------- FUNCTIONS ----------

function getComputerChoice() {
  let index = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[index];
}

function playRound(playerChoice, computerChoice) {
  round++;

  if (playerChoice == computerChoice) {
    return "tie";
  }

  for (let i = 0; i < POSSIBLE_MATCHES.length; i++) {
    if (playerChoice == POSSIBLE_MATCHES[i][0] && computerChoice == POSSIBLE_MATCHES[i][1]) {
      playerWins++;
      return "win";
    } else if (playerChoice == POSSIBLE_MATCHES[i][1] && computerChoice == POSSIBLE_MATCHES[i][0]) {
      computerWins++;
      return "lose";
    }
  }
}

function getRoundMessage(round, result, playerChoice, computerChoice) {
  let message;

  switch (result) {
    case "tie":
      message = `Round ${round}: It's a tie!`;
      break;
  
    case "win":
      message = `Round ${round}: You won! ${playerChoice[0].toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}!`;
      break;

    case "lose":
      message = `Round ${round}: You lost! ${computerChoice[0].toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}!`;
  }

  return message;
}

function isGameOver() {
  return playerWins == winsPerMatch || computerWins == winsPerMatch;
}

function playGame(playerChoice) {
  if (isGameOver()) {
    return;
  }

  let computerChoice = getComputerChoice();
  let result = playRound(playerChoice, computerChoice);
  let roundMessage = getRoundMessage(round, result, playerChoice, computerChoice);

  // Display choices

  for (let i = 0; i < OPTIONS.length; i++) {
    if (playerChoice == OPTIONS[i]) {
      playerChoiceDisplay.innerText = OPTIONS_EMOJI[i];
    }
  }

  for (let i = 0; i < OPTIONS.length; i++) {
    if (computerChoice == OPTIONS[i]) {
      computerChoiceDisplay.innerText = OPTIONS_EMOJI[i];
    }
  }

  updateScore(result);

  // Check for end of match

  if (isGameOver()) {
    if (playerWins > computerWins) {
      roundMessage += `<br>End of match! Congratulation, you won!`;
    } else {
      roundMessage += `<br>End of match! You lost, good luck next time...`;
    }
  }

  // Display result of round/match

  infoText.innerHTML = roundMessage;
}

function changeWinsPerMatch(newWinsPerMatch) {
  winsPerMatch = newWinsPerMatch;
  restartGame();
}

function restartGame() {
  playerWins = 0;
  computerWins = 0;
  round = 0;
  infoText.innerHTML = `Choose the number of wins per match and make your choice to begin the game!<br>Wins per match: ${winsPerMatch}`;
  playerChoiceDisplay.innerText = "";
  computerChoiceDisplay.innerText = "";
  updateScore();
}

function updateScore(roundResult = null) {
  if (roundResult == "win") {
    playerWinsDisplay.textContent = playerWins;
  } else if (roundResult == "lose") {
    computerWinsDisplay.textContent = computerWins;
  } else {
    playerWinsDisplay.textContent = playerWins;
    computerWinsDisplay.textContent = computerWins;
  }
}

// ---------- EVENT LISTENERS ----------

playerRock.addEventListener('click', function(){playGame("rock")});
playerPaper.addEventListener('click', function(){playGame("paper")});
playerScissors.addEventListener('click', function(){playGame("scissors")});
restartButton.addEventListener('click', restartGame);

for (let i = 0; i < 5; i++) {
  let numberOfWins = parseInt(winsPerMatchOptions[i].getAttribute("value"));
  winsPerMatchOptions[i].addEventListener('click', function(){changeWinsPerMatch(numberOfWins)});
}

restartGame();