const timerDisplay = document.getElementById('timer-second');
  const animationDisplay = document.getElementById('animation');
  const startButton = document.getElementById('startButton');
  let timeLeft = 30000; // 30 секунд у мілісекундах
  let timerInterval;

  function updateTimerDisplay() {
    const seconds = Math.floor(timeLeft / 1000);
    const milliseconds = timeLeft % 1000;
    timerDisplay.textContent = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  }

  function startTimer() {
    startButton.disabled = true;
    timeLeft = 30000;
    updateTimerDisplay();
    animationDisplay.style.display = 'none'; // Приховати анімацію при старті

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 10000 && timeLeft > 0) {
        animationDisplay.style.display = 'inline'; // Показати анімацію
      } else {
        animationDisplay.style.display = 'none'; // Приховати анімацію, якщо не в діапазоні
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        startButton.disabled = false;
        timerDisplay.textContent = 'Час вийшов!';
        // Тут можна додати іншу дію, яку потрібно виконати після закінчення таймера
      }
    }, 1); // Оновлювати кожну мілісекунду
  }

  startButton.addEventListener('click', startTimer);