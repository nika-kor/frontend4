


// Завдання 1

// Створити таймер, який буде починати відлік з 1 години та зменшувати час кожну хвилину. При досягненні 30 хвилин, таймер повинен відправляти повідомлення екран про те, що залишилось менше половини часу.

const timer = document.querySelector('.timer');
const timerSeconds = document.querySelector('.timer__seconds');
const timerMinutes = document.querySelector('.timer__minutes');
const timerHours = document.querySelector('.timer__hours');

let hours = 1;
let minutes = 0;
let seconds = 0;

const timerId = setInterval(() => {
    seconds -= 1;
    if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
        if (minutes < 0) {
            minutes = 59;
            hours -= 1;
            if (hours < 0) {
                clearInterval(timerId);
            }
        }
    }
    timerSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
    timerMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    timerHours.textContent = hours < 10 ? `0${hours}` : hours;
}, 1000);













