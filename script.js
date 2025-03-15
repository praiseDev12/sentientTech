'use strict';

///////////////////////////////////////////////////////////
// CONSTANT ELEMENTS

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const rulesModal = document.querySelector('.modal');
const winner = document.querySelector('.win');
const overlay = document.querySelector('.overlay');
const btnRules = document.querySelector('.btn--rules');
const creditModal = document.querySelector('.credit-modal');
const configModal = document.querySelector('.config-modal');
const btnMultiP = document.querySelector('.multiplayer');
const btnsingleP = document.querySelector('.bot-button');
const gameMode = document.querySelector('.player-select');
const overlayGM = document.querySelector('.oms');
const name0 = document.querySelector('.p1');
const name1 = document.querySelector('.p2');

// VARIABLES
let scores, currenScore, activePlayer, playing, win, againstAi, pvp;
let keysConfig = document;
win = [0, 0];

// /////////////////////////////////////////////////////
// FUNCTIONS

// CLOSE MODAL FUNCTION
const closeModalF = function () {
  rulesModal.classList.add('hidden');
  overlay.classList.add('hidden');
  creditModal.classList.add('hidden');
  configModal.classList.add('hidden');
  keysConfig = document;
};

// RESET FUNCTION
const reset = function () {
  scores = [0, 0];
  currenScore = 0;
  activePlayer = 0;
  playing = true;

  pvp === true ? (pvp = true) : (againstAi = true);
  pvp === true ? (name1.textContent = 'Player 2') : (name1.textContent = 'BOT');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('.winner--0').classList.add('hidden');
  document.querySelector('.winner--1').classList.add('hidden');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

reset();

// SWITCH PLAYER FUNCTION
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currenScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const switchToAi = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currenScore = 0;
  // activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer = 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

///////////////////////////////////////////////////////////////////////
//////////////////// MULTIPLAYER FUNCTIONS ////////////////////////////
// ROLL DICE FUNCTION
const rollDice = function () {
  if (playing && pvp) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currenScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenScore;
    } else {
      switchPlayer();
    }
  }
};

// HOLD POINTS FUNCTION
const holdPoints = function () {
  // Keeping Scores
  if (playing && pvp) {
    scores[activePlayer] = scores[activePlayer] + currenScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // winner function
    if (scores[activePlayer] >= 100) {
      win[activePlayer] = win[activePlayer] + 1;
      playing = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');
      setTimeout(function () {
        document.querySelector(`.scoreBoard-${activePlayer}`).textContent =
          win[activePlayer];
      }, 1000);
    } else {
      switchPlayer();
    }
  }
};

////////////////////////////////////////////////////////////////
///////////////// SINGLE PLAYER ////////////////////////////////
const rolDice = function () {
  if (againstAi && activePlayer === 0) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currenScore += dice;
      document.getElementById('current--0').textContent = currenScore;
    } else {
      switchPlayer();
      activePlayer = 1;
      aiFunction();
    }
  }
};

const holPoints = function () {
  // Keeping Scores
  if (againstAi && activePlayer === 0) {
    scores[0] = scores[0] + currenScore;
    document.getElementById(`score--0`).textContent = scores[0];

    // winner function
    if (scores[0] >= 100) {
      win[0] = win[0] + 1;
      againstAi = false;
      document.querySelector(`.player--0`).classList.add('player--winner');

      document.querySelector(`.player--0`).classList.remove('player--active');
      document.querySelector(`.winner--0`).classList.remove('hidden');
      setTimeout(function () {
        document.querySelector(`.scoreBoard-0`).textContent = win[0];
      }, 1000);
      // switchPlayer();
    } else {
      switchPlayer();
      aiFunction();
      // activePlayer = 1;
    }
  }
};

/////////////////////////////////////////////////////////////////
/////////////////// AI FUNCTIONS ////////////////////////////////

const aiRollDice = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currenScore += dice;

    document.getElementById('current--1').textContent = currenScore;
  } else {
    switchPlayer();
    activePlayer = 0;
  }
};

const aiHoldPoints = function () {
  if (againstAi && activePlayer === 1) {
    scores[1] = scores[1] + currenScore;
    document.getElementById(`score--1`).textContent = scores[1];

    // winner function
    if (scores[1] >= 100) {
      win[1] = win[1] + 1;
      againstAi = true;
      document.querySelector(`.player--1`).classList.add('player--winner');

      document.querySelector(`.player--1`).classList.remove('player--active');
      document.querySelector(`.winner--1`).classList.remove('hidden');
      setTimeout(function () {
        document.querySelector(`.scoreBoard-1`).textContent = win[1];
      }, 1000);
      // switchPlayer();
    } else {
      switchPlayer();
      // activePlayer = 1;
    }
  }
};

const aiFunction = function () {
  if (activePlayer === 1) {
    const aiRollInterval = setInterval(function () {
      const aiChance = Math.trunc(Math.random() * 6) + 1;
      const aiChance2 = Math.trunc(Math.random() * 5) + 1;
      const aiChance3 = Math.trunc(Math.random() * 6) + 1;

      if (activePlayer === 1) {
        aiRollDice();
      } else {
        switchPlayer();
      }
      if (aiChance === 1) {
        aiHoldPoints();
      }
      /////////// AI Risk Taking //////////////////////////////
      if (currenScore + scores[1] >= 100) {
        console.log('winner');
        aiHoldPoints();
      }
      if (
        aiChance !== 1 &&
        (aiChance2 === 1 || aiChance2 === 2) &&
        currenScore > 20
      ) {
        console.log('aiChance2   20', aiChance2);
        aiHoldPoints();
      } else if (aiChance !== 1 && aiChance2 === 3 && currenScore > 35) {
        console.log('aiChance2   35', aiChance2);
        aiHoldPoints();
      } else if (aiChance !== 1 && aiChance2 === 4 && currenScore > 45) {
        console.log('aiChance2   45', aiChance2);
        aiHoldPoints();
      }
      if (aiChance !== 1 && aiChance3 === 1 && currenScore > 10) {
        aiHoldPoints();
      }
      if (aiChance !== 1 && aiChance3 === 3 && currenScore > 10) {
        aiHoldPoints();
      }
      //////// AI WIN /////////////////////////////////
      if (activePlayer === 0 || scores[1] >= 100) {
        clearInterval(aiRollInterval);
      }
    }, 1000);
  }
};

////////////////////////////////////////////////////////////////
//////////////// EVENT LISTENERS //////////////////////////////

/////////////// KEYBOARD CONFIGURATION ////////////////////////
// PLAYER 1
keysConfig.addEventListener('keydown', function (e) {
  if (overlay.classList.contains('hidden')) {
    if (activePlayer === 0) {
      if (e.key === 'w') {
        rollDice();
        rolDice();
      } else if (e.key === 's') {
        holdPoints();
        holPoints();
      }
    }
  }
});

// PLAYER 2
keysConfig.addEventListener('keydown', function (e) {
  if (overlay.classList.contains('hidden')) {
    if (activePlayer === 1) {
      if (e.key === 'o') {
        rollDice();
      } else if (e.key === 'l') {
        holdPoints();
      }
    }
  }
});

// ESCAPE BUTTON TO RESET
keysConfig.addEventListener('keydown', function (e) {
  if (overlay.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      reset();
    }
  }
});

// ESCAPE BUTTON TO CLOSE MODAL
keysConfig.addEventListener('keydown', function (e) {
  if (!overlay.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeModalF();
    }
  }
});

// ROLL BUTTON
// btnRoll.addEventListener('click', rollDice);
btnRoll.addEventListener('click', rolDice);
btnRoll.addEventListener('click', rollDice);

// HOLD BUTTON
// btnHold.addEventListener('click', holdPoints);
btnHold.addEventListener('click', holPoints);
btnHold.addEventListener('click', holdPoints);

// NEW GAME BUTTON
btnNew.addEventListener('click', reset);

// GAME RULE BUTTON
btnRules.addEventListener('click', function () {
  rulesModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// /////////// GAME MODE BUTTONS ///////////////////
// Mutiplayer Button
btnMultiP.addEventListener('click', function () {
  // aiOrTwoPlayer = true;
  pvp = true;
  againstAi = false;
  name1.textContent = 'Player 2';
  // reset();
  setTimeout(function () {
    gameMode.classList.add('hidden');
    overlayGM.classList.add('hidden');
  }, 500);
});

// single player Button
btnsingleP.addEventListener('click', function () {
  // aiOrTwoPlayer = false;
  againstAi = true;
  pvp = false;
  name1.textContent = 'BOT';
  setTimeout(function () {
    gameMode.classList.add('hidden');
    overlayGM.classList.add('hidden');
  }, 500);
});

// CREDITS BUTTON
document.querySelector('.btn--credit').addEventListener('click', function () {
  creditModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// KEY CONFIGURATION BUTTON
document.querySelector('.btn--config').addEventListener('click', function () {
  configModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// CLOSE MODAL BUTTONS
document.querySelector('.close-modal').addEventListener('click', closeModalF);
document.querySelector('.cmcr').addEventListener('click', closeModalF);
document.querySelector('.cmc').addEventListener('click', closeModalF);

// OVERLAY RESET
overlay.addEventListener('click', closeModalF);
