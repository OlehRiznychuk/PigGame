"use strict";

// Elements selection
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

// game initial conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

let totalScores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

//Roll the dice

function initGame() {
  isPlaying = true;
  currentScore = 0;
  totalScores = [0, 0];
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  document.getElementById(`score--0`).textContent = totalScores[0];
  document.getElementById(`score--1`).textContent = totalScores[1];

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  player0Element.classList.add("player--active");
}

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // 1.Generate random number

    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2 Display number on the dice

    diceElement.classList.remove("hidden");
    diceElement.src = `./img/dice${diceNumber}.png`;

    // 3 if the number is 1, switch to the next player, if not - add number to the current score

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // 1. Add current score to acrive player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. If total score of active player >= 100, active player won, if not - switch the player
    if (totalScores[activePlayer] >= 100) {
      diceElement.classList.add("hidden");
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
