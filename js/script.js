"use strict";

var playerMove;
var computerMove;
var output = document.getElementById("output");
var result = document.getElementById("result");
var newGame = document.getElementById("new-game");
var params = {
    computerResult: 0,
    playerResult: 0,
    gamesNum: 0,
    gamesMax: 0,
    result: 0,
    progress: []
};

var move = ['paper', 'stone', 'scissors'];


//  Wygrana lub przegrana
var game = function() {
    if (params.computerResult == params.gamesMax) {
        // console.log("Przegrales");
        showModal('#lost');
    } else if (params.playerResult == params.gamesMax) {
        // console.log("Wygrałes");
        showModal('#win');
    }
};

function show(text) {
    output.insertAdjacentHTML("afterbegin", text + " You played " + playerMove + " and computer played " + computerMove + "<br>");

    result.innerHTML = params.playerResult + " - " + params.computerResult + "<br>";
}

function compMove() {
    var random = Math.floor(Math.random() * 3 + 1);
    return move[random - 1];
}

function playGame(playerMove) {
    computerMove = compMove();
    var winner;

    if (playerMove == computerMove) {
        show("Draw!");
        winner = 'draw';
    } else if (
        (playerMove == "stone" && computerMove == "scissors") ||
        (playerMove == "paper" && computerMove == "stone") ||
        (playerMove == "scissors" && computerMove == "paper")
    ) {
        params.playerResult++;
        game(params.playerResult, params.gamesMax);
        show("You won!");
        winner = 'player';
    } else {
        params.computerResult++;
        game(params.computerResult, params.gamesMax);
        show("You lost!");
        winner = 'computer';
    }

    params.progress.push({
        playerMove: playerMove,
        computerMove: computerMove,
        result: winner
    });
}

// Nowa gra
newGame.addEventListener("click", function() {
    params.gamesMax = window.prompt("How many rounds do you want to play?");
    params.computerResult = 0;
    params.playerResult = 0;
    show(0, 0);
    output.innerHTML = " ";
    content.innerHTML = " ";
    html = " ";
});

//funkcja ruch gracza
var player = document.querySelectorAll(".player-move");

for (var i = 0; i < player.length; i++) {
    player[i].addEventListener("click", function(event) {
        playerMove = event.target.getAttribute("data-move");
        playGame(playerMove);
    });
}


// Modal


var showModal = function(modal) {
    document.querySelector('#modal-overlay').classList.add('show');
    var modalWrapper = document.querySelector(modal);
    modalWrapper.classList.add('show');

    var content = modalWrapper.querySelector('.content table');
    console.log(content);

    var html = "";
    html += '<tbody>';
    for (var i = 0; i < params.progress.length; i++) {
        html += '<tr>';
        html += '<td>' + 'Round number: ' + (i + 1) + '</td>';
        html += '<td>' + 'Player result: ' + params.progress[i].playerMove + '</td>';
        html += '<td>' + 'Computer result: ' + params.progress[i].computerMove + '</td>';
        html += '<td>' + 'Result: ' + params.progress[i].result + '</td>';
        html += '</tr>';
    }
    html += '</tbody>';

    content.innerHTML = html;
};

var hideModal = function(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event) {
        event.stopPropagation();
    });
}