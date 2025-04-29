

const timeInput = document.getElementById("time-input");
const timeReturn = document.querySelector(".time-return");

function timeControl() {
  const timeInSeconds = parseInt(timeInput.value);
  
  if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
    timeReturn.textContent = "Будь ласка, введіть коректне позитивне число секунд.";
    return;
  }
  
  setTimeout(function() {
    timeReturn.textContent = `Час вийшов! Пройшло ${timeInSeconds} секунд.`;
  }, timeInSeconds * 1000);
  
  timeReturn.textContent = `Таймер встановлено на ${timeInSeconds} секунд.`;
}
  
timeInput.addEventListener("input", timeControl);