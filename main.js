// Tic Tac Toe game
// [X] Add ability to add X's or O's turn by turn.
// [ ] Check for win or draw every turn.
// [ ] Show end screen if won on draw.


const boxElements = document.querySelectorAll('[data-box]');

let gameBoard = ['', '', '', '', '', '', '', '', ''];

boxElements.forEach(box => {
    box.addEventListener('click', handleClick, { once: true })
})

let move = true; // If true O start first. If false X start first.

function handleClick(e) {
    move = !move;

    let id = e.target.id;

    if (move == true) {
        document.getElementById(id).classList.add("x");
        gameBoard[id] = "X";
    } else {
        document.getElementById(id).classList.add("o");
        gameBoard[id] = "O";
    }

    console.log(gameBoard);


}