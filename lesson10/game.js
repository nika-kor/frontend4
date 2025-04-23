const clickableElement = document.getElementById('clickableElement');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

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
        clickableElement.disabled = true;
        clickableElement.textContent = 'Гра закінчена!';
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
    clickableElement.disabled = false;
    clickableElement.textContent = 'Натисни мене!';
    gameInterval = setInterval(updateTimer, 1000);
}

clickableElement.addEventListener('click', handleClick);

// Запускаємо гру при завантаженні сторінки
startGame();