const allCells = document.querySelectorAll('.cell');
const updateText = document.querySelector('#update-text');
const button = document.querySelector('.button');
//An array of arrays of the win conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currPlayer = 'X';
let running = false;

initialize();

function initialize() {
    running = true;
    allCells.forEach(cell => cell.addEventListener('click', cellClicked));
    button.addEventListener('click', restartGame);
    updateText.textContent = `${currPlayer}'s turn`;

}

//Cell can only be clicked if it is not already selected and the selection is not captured in the options array
function cellClicked() {
    const index = this.getAttribute('cell-index');

    if (options[index] != '' || !running)
        return;
    else {
        updateCell(this, index);
        checkWinner();
    }

}

function updateCell(cell, index) {

    options[index] = currPlayer;
    cell.textContent = currPlayer;
}

function changePlayer() {
    //Ternary operator to change current player
    currPlayer = (currPlayer == 'X') ? 'O' : 'X';
    updateText.textContent = `${currPlayer}'s turn`;
}

function checkWinner() {
    let win = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const conditionCellA = options[condition[0]];
        const conditionCellB = options[condition[1]];
        const conditionCellC = options[condition[2]];

        //If any of the cells are empty continue with the game and change player
        if (conditionCellA == '' || conditionCellB == '' || conditionCellC == '')
            continue;
        //If a player has won
        if (conditionCellA == conditionCellB && conditionCellB == conditionCellC) {
            win = true;
            break;
        }
    }
    if (win) {
        updateText.textContent = `${currPlayer}'s won!`;
        running = false;
    }
    //Game is a draw if there are no spaces left
    else if (!options.includes('')) {
        updateText.textContent = 'It\'s a Draw';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {

    currPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    updateText.textContent = `${currPlayer}'s turn`;
    allCells.forEach(cell => cell.textContent = '');
    running = true;
}