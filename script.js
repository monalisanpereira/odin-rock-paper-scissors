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

const themeToggleButton = document.querySelector('#theme-toggle__button');
const infoText = document.querySelector('#info-text');
const infoBox = document.querySelector('#info-box');
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

  // changeAppearanceOnClick(this, 'control-click');

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
      roundMessage += `<br>End of match! Congratulations, you won!`;
    } else {
      roundMessage += `<br>End of match! You lost, good luck next time...`;
    }
  }

  // Display result of round/match

  infoText.innerHTML = roundMessage;
}

function changeWinsPerMatch(newWinsPerMatch) {
  winsPerMatch = newWinsPerMatch;
}

function restartGame(element = null) {
  if (element) {
    console.log(element)
    changeAppearanceOnClick(element, 'button-click');
  }
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

function changeAppearanceOnClick(element, className) {
  element.classList.add(className);
  setTimeout(function(element, className){element.classList.remove(className)}, 200, element, className);
}

function focusInfoBox() {
  infoBox.classList.add('info__box--focus');
  let className = 'info__box--focus'
  setTimeout(function(infoBox, className){infoBox.classList.remove(className)}, 400, infoBox,className);
}

function handleControlClick(eventTarget, theThis, controlValue) {
  if (isGameOver()) {
    focusInfoBox();
    return;
  }
  
  if (eventTarget !== theThis) {
    changeAppearanceOnClick(eventTarget.parentElement, 'control-click');
  } else {
    changeAppearanceOnClick(eventTarget, 'control-click');
  }
  playGame(controlValue);
}

// ---------- EVENT LISTENERS ----------

themeToggleButton.addEventListener('change', ()=>{
  document.body.classList.toggle('light-theme')
})
playerRock.addEventListener('click', function(e){handleControlClick(e.target, this, "rock")});
playerPaper.addEventListener('click', function(e){handleControlClick(e.target, this, "paper")});
playerScissors.addEventListener('click', function(e){handleControlClick(e.target, this, "scissors")});
restartButton.addEventListener('click', function(e){restartGame(e.target)});

for (let i = 0; i < 5; i++) {
  let numberOfWins = parseInt(winsPerMatchOptions[i].getAttribute("value"));
  winsPerMatchOptions[i].addEventListener('click', function(e){changeWinsPerMatch(numberOfWins), restartGame(e.target)});
}

restartGame();