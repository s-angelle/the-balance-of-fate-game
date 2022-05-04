const nyanCatPlayer = 'x';

const nyanDogPlayer = 'circle';

const boxElements = document.getElementsByClassName('[data-cell]');

const gameBoard = document.getElementById('game-board');

const winMessageElement = document.getElementById('win-message');

const restartBtn = document.getElementById('restartBtn');

const winMessageTxtElement = document.getElementById('winMessageTxt');
let = isNyanDogPlayerTurn = false;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];


boxElements.forEach(box => {
    box.addEventListener('click', handleClick, {once: true} )
})

function handleClick(e) {
    console.log('clicked')
}