const nyanCatPlayer = 'x';
const TacoDogPlayer = 'y';
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
const boxElements = document.querySelectorAll('[data-box]');
const gameBoard = document.getElementById('gameBoard')
const winMessage = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const winMessageTxt = document.querySelector('[data-win-message-text]')
let isTacoDogPlayerTurn 

startPlay();

function startPlay(){
    let isNyanDogPlayerTurn =  false;
    boxElements.forEach(box => {
        box.classList.remove(nyanCatPlayer)
        box.classList.remove(TacoDogPlayer)
        box.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverPlayer()
    winMessage.classList.remove('show')
}


function handleClick(e) {
    const box = e.target
    const currentPlayer = isTacoDogPlayerTurn ? TacoDogPlayer : nyanCatPlayer
    placeMark(box, currentPlayer)
    if(checkWin(currentPlayer)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        switchTurns()
        setBoardHoverPlayer()
    }
    // Check for Win
    // Check for Draw
    // Switch Turns
}

function endGame(draw){
if (draw) {
winMessageTxt.innerText = 'Draw!!'
} else {
    winMessageTxt.innerText = `${isTacoDogPlayerTurn ? "Taco Dog" : 'Nyan Cat'} Wins !!`
} 
    winMessage.classList.add('show')
}

function isDraw(){
    return [...boxElements].every(box =>{
        return box.classList.contains(nyanCatPlayer) || box.classList.contains(TacoDogPlayer)
    } );{
    }
}

function placeMark(box, currentPlayer){
    box.classList.add(currentPlayer)
}

function switchTurns(){
    isTacoDogPlayerTurn = !isTacoDogPlayerTurn
}

function setBoardHoverPlayer(){
    gameBoard.classList.remove(nyanCatPlayer)
    gameBoard.classList.remove(TacoDogPlayer)
    if(isTacoDogPlayerTurn){
        gameBoard.classList.add(TacoDogPlayer)
    } else {
        gameBoard.classList.add(nyanCatPlayer)
    }
}

function checkWin(currentPlayer) {
return winningCombos.some(combo => {
    return combo.every(index => {
        return boxElements[index].classList.contains(currentPlayer)
    })
})
}

restartButton.addEventListener('click', startPlay);