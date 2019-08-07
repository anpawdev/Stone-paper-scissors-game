'use strict';

// var player;
// var computer;
// var game;
// var computerMove;
var output = document.getElementById('output');
var result = document.getElementById('result');
var newGame = document.getElementById('new-game');
var params = {
  computerResult: 0,
  playerResult: 0,
  gamesNum: 0,
  gamesMax: 0,
  progress: []
}
var move = {
  1: 'paper',
  2: 'stone',
  3: 'scissors'
}


//funkcja ruch gracza  
var player = document.querySelectorAll('.player-move');

for (var i = 0; i < player.length; i++) {
  player[i].addEventListener('click', function (event) {
    var move = event.target.getAttribute('data-move');
    playerMove(move);
  })
};


// Losowanie liczby z zakresu 1-3 i zapisywanie w zmiennej
// var compMove = function () {
//   var move = Math.floor(Math.random() * 3 + 1);
//   if (move == 1) {
//     return 'paper';
//   }
//   if (move == 2) {
//     return 'stone';
//   }
//   if (move == 3) {
//     return 'scissors';
//   }
// }

function compMove() {
  var computerMove = Math.floor((Math.random() * 3) + 1);
  return computerMove;
};

// W oparciu o wylosowaną liczbę, skrypt decyduje czy wynikiem jest remis, wygrana gracza, czy wygrana komputera
computerMove = compMove();
if ((move == computerMove)) {
  show('Draw!');
} else if ((move == 'stone' && computerMove == 'scissors') ||
  (move == 'paper' && computerMove == 'stone') ||
  (move == 'scissors' && computerMove == 'paper')) {
  playerResult++;
  game(playerResult, gamesMax);
  show('You won!');
} else {
  computerResult++;
  game(computerResult, gamesMax);
  show('You lost!');
}

// funkcja do wyświetlania tekstu na stronie
function show(text) {
  output.insertAdjacentHTML('afterbegin', text + ' You played ' + player + ' and computer played ' + computerMove + '<br>');
  result.innerHTML = playerResult + ' - ' + computerResult + '<br>';
}

// Modal

var showModal = function () {
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show');
  };
  document.getAttribute('data-modal').classList.add('show');
  document.querySelector('#modal-overlay').classList.add('show');
};

var hideModal = function (event) {
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .js--close-modal');

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal);
}

for (var i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', hideModal);
}

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function (event) {
    event.stopPropagation();
  });
}

//  Wygrana lub przegrana
var game = function () {
  if (computerResult == gamesMax) {
    showModal('#lost');
  } else if (playerResult == gamesMax) {
    showModal('#win');
  }
}


// Nowa gra
newGame.addEventListener('click', function () {
  gamesMax = window.prompt('How many rounds do you want to play?');
  computerResult = 0;
  playerResult = 0;
  show(0, 0);
  output.innerHTML = ' ';
});