
/* ===== WELCOME TO THE BALANCE OF FATE GAME V. 2062 ===== */


// Assigning variables for important game elements.

const nyanCatPlayer = 'x';
const tacoDogPlayer = 'y';
const startWindow = document.getElementById('startWindow');
const startWindowTxt = document.querySelector('[data-start-window-text]');
const gameBoard = document.getElementById('gameBoard');
const boxElements = document.querySelectorAll('[data-box]');
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
const winMessage = document.getElementById('winMessage');
const winMessageTxt = document.querySelector('[data-win-message-text]');
const restartButton = document.getElementById('restartButton');
const playButton = document.getElementById('playButton');
let isTacoDogPlayerTurn = false;


// Creating a function to remove initial start-up screen. On line 169, this function is called upon when the player clicks the "play" button.

function displayGameWindow() {

 startWindow.classList.remove('show');

 playButton.style.display = 'none';

}


// Creating a function that will display a player's character once the player hovers over a box with their character. This can only happen if it is the player's turn.

function setBoardHoverPlayer() {
    
    gameBoard.classList.remove(nyanCatPlayer);

    gameBoard.classList.remove(tacoDogPlayer);
    
    if (isTacoDogPlayerTurn) {
        
        gameBoard.classList.add(tacoDogPlayer);
        
    } else {
        
        gameBoard.classList.add(nyanCatPlayer);
    }
}


// Creating a function that will mark/display the current player's character into a box.  

function placeMark(box, currentPlayer) {
    
    box.classList.add(currentPlayer);
}


// Creating a function that will switch turns.

function switchTurns() {
    
    isTacoDogPlayerTurn = !isTacoDogPlayerTurn;
}


// Creating a function that will check the win/lose status of the game by determining if the box elements' character meets the criteria of the previously assigned winning combos array. 

function checkWin(currentPlayer) {

return winningCombos.some(combo => {

    return combo.every(index => {

        return boxElements[index].classList.contains(currentPlayer);
    })
})

}


// Creating a function that will determine whether the game board fits the criteria of being a draw.

function isDraw() {
    
    return [...boxElements].every(box =>{
        
        return box.classList.contains(nyanCatPlayer) || box.classList.contains(tacoDogPlayer);
    })
}


// Creating a function that will display the winning message and text upon a player winning. It also displays a message in the result of a draw.

function endGame(draw) {

    if (draw) {

    winMessageTxt.innerText = ` It's a Draw!!`;

    } else {

    winMessageTxt.innerHTML = `${isTacoDogPlayerTurn ? `Taco Dog` : `Nyan Cat`} Wins !!`;

    }

    winMessage.classList.add('show');

}


// Creating a function that will implement the aforementioned placeMark function. This function will also register each player's click, while simultaneously checking the win/lose/draw status of the game. If no player has won, the game will proceed to the next player's turn. 

function handleClick(e) {

    const box = e.target;

    let currentPlayer = isTacoDogPlayerTurn ? tacoDogPlayer : nyanCatPlayer;

    placeMark(box, currentPlayer);

    if(checkWin(currentPlayer)) {

        endGame(false);

    } else if (isDraw()) {

        endGame(true);

    } else {

        switchTurns();

        setBoardHoverPlayer();
    }

}


// Creating a function that will "start" the game and implement the handleClick function. A for loop is also established to reset the game. On line 167, this will happen upon a player clicking the "restart" button.

startPlay();

function startPlay() {

    isTacoDogPlayerTurn = false;

    boxElements.forEach(box => {

        box.classList.remove(nyanCatPlayer);

        box.classList.remove(tacoDogPlayer);
        
        box.addEventListener('click', handleClick, {once: true});

    })   

    setBoardHoverPlayer();

    winMessage.classList.remove('show');
    
}    


// Adding event listeners to that will implement previously mentioned functions when a player clicks either the "play" or "restart" button.

restartButton.addEventListener('click', startPlay);

playButton.addEventListener('click', displayGameWindow);