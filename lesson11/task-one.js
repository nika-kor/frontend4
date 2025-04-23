let totalSeconds = 60 * 60; // Початковий час - 1 година (60 хвилин * 60 секунд)
const timerDisplay = document.getElementById('timer'); // Елемент, де відображатиметься таймер
const messageDisplay = document.getElementById('message'); // Елемент для повідомлень (необов'язково)
let timerInterval;

function updateTimerDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timerDisplay.textContent = formattedTime;
}

function checkHalfTime() {
  if (totalSeconds === 30 * 60) {
    messageDisplay.textContent = 'Залишилось менше половини часу!';
    // Можна додати тут інші дії, наприклад, зміну стилю таймера
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    totalSeconds--;
    updateTimerDisplay();
    checkHalfTime();

    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      messageDisplay.textContent = 'Час вийшов!';
      // Можна додати тут дії після закінчення таймера
    }
  }, 1000); // Оновлення кожну секунду
}

// Для запуску таймера після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  // Перевіряємо, чи є на сторінці елемент з id 'timer'
  if (!timerDisplay) {
    const newTimerDisplay = document.createElement('div');
    newTimerDisplay.id = 'timer';
    document.body.appendChild(newTimerDisplay);
  }

  // Перевіряємо, чи є на сторінці елемент з id 'message'
  if (!messageDisplay) {
    const newMessageDisplay = document.createElement('div');
    newMessageDisplay.id = 'message';
    document.body.appendChild(newMessageDisplay);
  }
  updateTimerDisplay(); // Відображаємо початковий час
  startTimer();
});