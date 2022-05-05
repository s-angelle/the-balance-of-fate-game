const nyanCatPlayer = 'x';
const tacoDogPlayer = 'y';
const nyanCatImage = document.getElementById('cat')
const tacoDogImage = document.getElementById('dog')
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
const boxElements = document.querySelectorAll('[data-box]');
const gameBoard = document.getElementById('gameBoard')

const startWindow = document.getElementById('startWindow')
const startWindowTxt = document.querySelector('[data-start-window-text]')

const winMessage = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const playButton = document.getElementById('playButton')
const winMessageTxt = document.querySelector('[data-win-message-text]')
let isTacoDogPlayerTurn 

function displayGameWindow(){
 startWindow.classList.remove('show')
}

startPlay();

function startPlay(){
    let isTacoDogPlayerTurn = false;
    boxElements.forEach(box => {
        box.classList.remove(nyanCatPlayer)
        box.classList.remove(tacoDogPlayer)
        box.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverPlayer() 
    winMessage.classList.remove('show')
    
}

function handleClick(e) {
    const box = e.target
    const currentPlayer = isTacoDogPlayerTurn ? tacoDogPlayer : nyanCatPlayer
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
winMessageTxt.innerText = ` It's a Draw!!`
} else {
    winMessageTxt.innerHTML = `${isTacoDogPlayerTurn ? `Taco Dog` : `Nyan Cat`} Wins !!`
} 
    winMessage.classList.add('show')
}

function isDraw(){
    return [...boxElements].every(box =>{
        return box.classList.contains(nyanCatPlayer) || box.classList.contains(tacoDogPlayer)
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
    gameBoard.classList.remove(tacoDogPlayer)
    if(isTacoDogPlayerTurn){
        gameBoard.classList.add(tacoDogPlayer)
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

playButton.addEventListener('click', displayGameWindow)


