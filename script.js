'use strict';
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.getElementsByClassName('player--0');
// console.log(player0El);
const player1El = document.getElementsByClassName('player--1');
// console.log(player1El);

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* // Starting conditions of game
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0]; // will use this to update the total score of each player
let currentScore = 0;
let activePlayer = 0;
let playing = true; // state variable */

let scores, currentScore, activePlayer, playing;

const inIt = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  diceEl.classList.add('hidden'); // hide the dice

  // setting current score of players to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  // setting total score of players to 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Removing the class "player--winner" from the active player
  player0El[0].classList.remove('player--winner');
  player1El[0].classList.remove('player--winner');

  player0El[0].classList.add('player--active');
  player1El[0].classList.remove('player--active');
};

inIt(); // calling to initialize

// functional expresion to switch the player dynamically
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El[0].classList.toggle('player--active');
  player1El[0].classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice number
    const diceNo = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNo}.png`;

    // 3. check for rolled 1
    if (diceNo !== 1) {
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Listening to the hold button
btnHold.addEventListener('click', () => {
  if (playing) {
    // Add current score to the players total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // if total score is < 100 switch player
    if (scores[activePlayer] < 20) {
      // switch player, make the currentScore 0
      switchPlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceEl.classList.add('hidden');
    }
  }
});

btnNew.addEventListener('click', inIt); // To call the
