// Завдання 1

// Створіть слайдер на сторінці, який показує зображення. При переміщенні слайдера виконуйте деякі дії, наприклад, змінюйте розмір зображення. Використайте debounce для того, щоб ці дії виконувалися не занадто часто при швидкому переміщенні слайдера.


const slider = document.querySelector('.slider');
const sliderImage = document.querySelector('.slider__image');
const sliderInput = document.querySelector('.slider__input');

function onInput(e) {
    sliderImage.style.width = `${e.target.value}%`;
    return sliderImage.style.width
}

sliderInput.addEventListener('input', debounce(onInput, 1000));
















