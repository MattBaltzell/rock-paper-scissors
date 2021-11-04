// DOM Elements
const btnChoose = document.querySelectorAll(".weapon");
const btnChooseRock = document.querySelector(".weapon__rock");
const btnChoosePaper = document.querySelector(".weapon__paper");
const btnChooseScissors = document.querySelector(".weapon__scissors");
const btnPlayAgain = document.querySelector(".play-again");

const playerContainers = document.querySelectorAll(".player");
const player1Container = document.querySelector(".player-1");
const player2Container = document.querySelector(".player-2");

const scoreDisplay = document.querySelectorAll(".player__score");
const player1Score = document.querySelector(".player-1__score");
const player2Score = document.querySelector(".player-2__score");

const allChoices = document.querySelectorAll(".player__choice");
const player1Choice = document.querySelector(".player-1__choice");
const player2Choice = document.querySelector(".player-2__choice");

const instruction = document.querySelector("#turn-indicator");

const choices = ["", ""];

// Variables
let currentPlayer;
let scores = [0, 0];

// Functions
const choiceHandler = (e) => {
  displayChoice(e);
  player1Choice.classList.add("player__choice--made");
  cpuChoice();
};

const cpuChoice = () => {
  nextPlayer();
  instruction.textContent = "Computer is thinking...";
  setTimeout(() => {
    player2Choice.textContent = ".";
    let int = setInterval(() => {
      player2Choice.textContent = player2Choice.textContent + ".";
    }, 500);
    setTimeout(() => {
      let cpuPick = Math.floor(Math.random() * 3);
      console.log(cpuPick);
      clearInterval(int);
      if (cpuPick === 0) {
        player2Choice.textContent = "Rock";
      } else if (cpuPick === 1) {
        player2Choice.textContent = "Paper";
      } else if (cpuPick === 2) {
        player2Choice.textContent = "Scissors";
      }
      player2Choice.classList.add("player__choice--made");
      checkWinner();
    }, 2000);
  }, 500);
  btnChoose.forEach((el) => el.removeEventListener("click", choiceHandler));
};

const updateScore = () => {
  scoreDisplay.forEach((el, i) => (el.textContent = scores[i].toString()));
};

const displayChoice = (e) => {
  (currentPlayer === 1 ? player1Choice : player2Choice).textContent =
    e.target.textContent;
};

const nextPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
};

const checkWinner = () => {
  console.log(player1Choice.textContent, player2Choice.textContent);
  let [p1, p2] = [player1Choice.textContent, player2Choice.textContent];
  p1 === p2 ? (instruction.textContent = "It's a Tie!") : null;
  if (
    (p1 === "Rock" && p2 === "Scissors") ||
    (p1 === "Paper" && p2 === "Rock") ||
    (p1 === "Scissors" && p2 === "Paper")
  ) {
    scores[0] += 1;
    player1Container.classList.add("winner");
    instruction.textContent = "You Win!";
  } else if (
    (p2 === "Rock" && p1 === "Scissors") ||
    (p2 === "Paper" && p1 === "Rock") ||
    (p2 === "Scissors" && p1 === "Paper")
  ) {
    scores[1] += 1;
    player2Container.classList.add("winner");
    instruction.textContent = "You Lose!";
  }
  updateScore();

  btnPlayAgain.classList.remove("hidden");
};

btnPlayAgain.addEventListener("click", (e) => {
  e.preventDefault();
  init();
});

const init = () => {
  updateScore();
  instruction.textContent = "Make Your Choice!";
  btnPlayAgain.classList.add("hidden");
  btnChoose.forEach((el) => el.addEventListener("click", choiceHandler));
  currentPlayer = 1;
  allChoices.forEach((el) => {
    el.classList.remove("player__choice--made");
    el.textContent = "...";
  });
  playerContainers.forEach((el) => el.classList.remove("winner"));
};

init();
