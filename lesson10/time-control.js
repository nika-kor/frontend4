function timeControl() {
    const timeInSeconds = parseInt(prompt("Введіть час в секундах:"));
  
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      alert("Будь ласка, введіть коректне позитивне число секунд.");
      return;
    }
  
    setTimeout(function() {
      alert(`Час вийшов! Пройшло ${timeInSeconds} секунд.`);
    }, timeInSeconds * 1000);
  
    console.log(`Таймер встановлено на ${timeInSeconds} секунд.`);
  }
  
  timeControl();