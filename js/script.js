'use strict';

var player;
var computer;
var game;
var computerMove;
var playerMove;
var computerResult = 0;
var playerResult = 0;
var gamesNum = 0;
var gamesMax = 0;
var paper = document.getElementById('paper-button');
var stone = document.getElementById('stone-button');
var scissors = document.getElementById('scissors-button');
var output = document.getElementById('output');
var result = document.getElementById('result');
var newGame = document.getElementById('new-game');
var end = document.getElementById('end');

//funkcja ruch gracza  
var playerMove = function(move) {
  if (move == 'paper'){
    player = 'paper';
  } else if (move == 'stone') {
   player = 'stone';
  } else if (move == 'scissors') {
    player = 'scissors';
  }

// Losowanie liczby z zakresu 1-3 i zapisywanie w zmiennej
var compMove = function(){
var move = Math.floor(Math.random() * 3 + 1);
  if (move==1){
    return 'paper';
  } 
  if (move==2){
    return 'stone';
  }
  if (move==3){
    return 'scissors';
  }
}

// W oparciu o wylosowaną liczbę, skrypt decyduje czy wynikiem jest remis, wygrana gracza, czy wygrana komputera
 computerMove = compMove();
  if ((move == computerMove)){
    show ('Draw!');
  } else if ((move =='stone' && computerMove == 'scissors')
  ||
  (move == 'paper' && computerMove == 'stone')
  ||
  (move == 'scissors' && computerMove =='paper')){
    playerResult++;
    game(playerResult, gamesMax);
    show ('You won!');
  } else {
    computerResult++;
    game(computerResult, gamesMax);
    show ('You lost!');
  }
}

// funkcja do wyświetlania tekstu na stronie
function show(text) {
  output.insertAdjacentHTML('afterbegin', text + ' You played ' + player + ' and computer played ' + computerMove + '<br>');
   result.innerHTML = playerResult + ' - '+ computerResult + '<br>';
}

var game = function(){
    if (computerResult == gamesMax) {
    end.innerHTML = 'YOU LOST THE ENTIRE GAME!! TRY AGAIN! <br> CLICK NEW GAME!';
  } else if (playerResult == gamesMax){
    end.innerHTML = 'YOU WON THE ENTIRE GAME!! <br> CLICK NEW GAME!';
  }
} 

// funkcja po kliknięciu
paper.addEventListener('click', function(){
  playerMove('paper');
});
stone.addEventListener('click', function(){
  playerMove('stone');
});
scissors.addEventListener('click', function(){
  playerMove('scissors');
});
newGame.addEventListener('click', function(){
  gamesMax = window.prompt('How many rounds do you want to play?');
  computerResult = 0;
  playerResult = 0;
  show(0, 0);
  output.innerHTML = ' ';
  end.innerHTML = ' ';
});