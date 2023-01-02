let options = ["rock", "paper", "scissors"];

function getPlayerChoice(options, round) {
  let playerChoice;
  do {
    playerChoice = prompt(`Enter your choice for round ${round}:`);
  } while (!(options.includes(playerChoice.toLowerCase())));
  return playerChoice;
}

function getComputerChoice(options) {
  let index = Math.floor(Math.random() * options.length);
  return options[index];
}

function playRound(playerSelection, computerSelection) {

  let playerChoice = playerSelection.toLowerCase();
  let computerChoice = computerSelection.toLowerCase();
  let winnerMatches = [["rock", "scissors"], 
                        ["scissors", "paper"], 
                        ["paper", "rock"]];
  let win = ["win", playerChoice, computerChoice];
  let lose = ["lose", computerChoice, playerChoice];
  let result;

  if (playerChoice == computerChoice) {
    return ["tie", playerChoice, computerChoice];
  }

  for (let i = 0; i < winnerMatches.length; i++) {
    if (playerChoice == winnerMatches[i][0] && computerChoice == winnerMatches[i][1]) {
      result = win;
      break;
    } else if (playerChoice == winnerMatches[i][1] && computerChoice == winnerMatches[i][0]) {
      result = lose;
      break;
    }
  }

  return result;
}

function game(options) {
  let round = 0;
  let playerVictories = 0;
  let computerVictories = 0;

  do {
    round++;

    let roundResult = playRound(getPlayerChoice(options, round), getComputerChoice(options));
    roundMessage = `You ${roundResult[0]}! ${roundResult[1][0].toUpperCase() + roundResult[1].slice(1).toLowerCase()} beats ${roundResult[2].toLowerCase()}!`;

    if (roundResult[0] == "tie") {
      roundMessage = "It's a tie!";
    } else if (roundResult[0] == "win") {
      playerVictories++;
    } else {
      computerVictories++;
    }

    console.log(`Round ${round}: ${roundMessage}`)

    if (playerVictories == 3 || computerVictories == 3) {
      console.log(`The end! Player ${playerVictories} x ${computerVictories} Computer`);
    }
  } while (playerVictories < 3 && computerVictories < 3)
}
