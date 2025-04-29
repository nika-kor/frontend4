const clickableElement1 = document.getElementById('circle1');
const clickableElement2 = document.getElementById('circle2');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

const gameContainer = document.querySelector('.game-container');


const endGame = document.createElement('p');
gameContainer.appendChild(endGame);

let score = 0;
let timeLeft = 10;
let gameInterval;

function updateScore() {
    scoreDisplay.textContent = `Рахунок: ${score}`;
}

function updateTimer() {
    timerDisplay.textContent = `Час: ${timeLeft} секунд`;
    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clickableElement1.disabled = true;
        clickableElement2.disabled = true;
        endGame.textContent = 'Гра закінчена!';

        clickableElement1.removeEventListener('click', handleClick);
        clickableElement2.removeEventListener('click', handleClick);
    }
    timeLeft--;
}

function handleClick() {
    score++;
    updateScore();
}

function startGame() {
    score = 0;
    timeLeft = 10;
    updateScore();
    updateTimer();
    clickableElement1.disabled = false;
    clickableElement2.disabled = false;
    gameInterval = setInterval(updateTimer, 1000);
}

clickableElement1.addEventListener('click', handleClick);
clickableElement2.addEventListener('click', handleClick);

startGame();