const emojis = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍉",
  "🍉",
  "🍓",
  "🍓",
  "🍒",
  "🍒",
  "🍑",
  "🍑",
  "🥝",
  "🥝",
];

let firstCard = null;
let secondCard = null;
let attempts = 0;
let lockBoard = false;

const gameBoard = document.getElementById("game-board");
const attemptsDisplay = document.getElementById("attempts");
const restartButton = document.getElementById("restart");
const giveUpButton = document.getElementById("give-up");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(emojis);
  gameBoard.innerHTML = "";
  emojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    frontFace.innerText = emoji;

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.innerText = "";

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("flipped"))
    return;
  this.classList.add("flipped");
  attempts++;
  attemptsDisplay.innerText = attempts;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function giveUp() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("flipped");
    card.removeEventListener("click", flipCard);
  });
}

restartButton.addEventListener("click", () => {
  attempts = 0;
  attemptsDisplay.innerText = attempts;
  gameBoard.style.animation = "none";
  setTimeout(() => {
    gameBoard.style.animation = "";
  }, 10);
  createBoard();
  resetBoard();
});

giveUpButton.addEventListener("click", giveUp);

createBoard();
