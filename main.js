// Tic Tac Toe game
// [X] Add ability to add X's or O's turn by turn.
// [X] Check for win or draw every turn.
// [X] Show end screen if won or draw.
// [X] Add player names.
// [ ] Add selection who start first X or O.
// [ ] Add option for AI player.


const boxElements = document.querySelectorAll('[data-box]');

let gameBoard = ['', '', '', '', '', '', '', '', ''];

let move = true; // If true O start first. If false X start first.
let moveCount = 0;
let scoreX = 0;
let scoreO = 0;

const winCombos = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxElements.forEach(box => {
    box.addEventListener('click', handleClick, { once: true })
})

if (move) {
    playerMove(0); // O
} else {
    playerMove(1); // X
}

function handleClick(e) {
    move = !move;
    moveCount++;

    let id = e.target.id;

    if (move) {
        playerMove(0);
        document.getElementById(id).classList.add("x");
        gameBoard[id] = "X";
    } else {
        playerMove(1);
        document.getElementById(id).classList.add("o");
        gameBoard[id] = "O";
    }

    checkResult();
}

function checkResult() { // Check if win or draw

    playerX = document.querySelector("#playerX").value;
    playerO = document.querySelector("#playerO").value;

    if (playerX == "") {
        playerX = "Player X";
    }
    if (playerO == "") {
        playerO = "Player O";
    }

    let won = false;

    winCombos.forEach(combo => {
        let x = 0;
        let o = 0;
        combo.forEach(pos => {
            if (gameBoard[pos] == "X") {
                x++
            } else if (gameBoard[pos] == "O") {
                o++
            }

            if (x == 3) {
                endGame(playerX, 1);
                scoreX++;
                won = true;
            }
            if (o == 3) {
                endGame(playerO, 2);
                scoreO++;
                won = true;
            }
        });
    });
    if (won == false && moveCount == 9) {
        endGame(null, 0);
    }

    updateScore();
}

function nextRound() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    moveCount = 0;
    boxElements.forEach(box => {
        box.removeEventListener('click', handleClick);
        box.addEventListener('click', handleClick, { once: true });
        box.classList.remove("x");
        box.classList.remove("o");

    })

    document.querySelector("#end-screen").classList.remove("show");
}

function restartGame() {
    if (confirm("You sure you want to restart? Scores will be wiped.") == true) {
        scoreX = 0;
        scoreO = 0;
        updateScore();
        nextRound();
    }
}

function endGame(name, status) {
    if(status == 0) {
        document.querySelector("#endMessage").innerHTML = "It's a draw!"
    } else {
        document.querySelector("#endMessage").innerHTML = `${name} won!`;
    }
    document.querySelector("#end-screen").classList.add("show");
}

function updateScore() {
    document.querySelector("#scoreX").innerHTML = scoreX;
    document.querySelector("#scoreO").innerHTML = scoreO;
}

function playerMove(x) {
    const gameboard = document.querySelector(".gameboard");

    if (x) {
        gameboard.classList.remove("o");
        gameboard.classList.add("x");
    } else {
        gameboard.classList.remove("x");
        gameboard.classList.add("o");
    }
    
}