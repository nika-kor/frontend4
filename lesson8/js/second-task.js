

// Форма збереження даних

// Створіть просту форму з полями вводу і кнопкою, яка зберігає дані в localStorage. При наступному завантаженні сторінки зчитайте збережені дані з localStorage та відобразіть їх у відповідних полях вводу.



const form = document.querySelector('#formApp');
const nameInput = document.querySelector('#username');
const emailInput = document.querySelector('#password');
const saveBtn = document.querySelector('#saveBtn');

function saveData() {
    const name = nameInput.value;
    const email = emailInput.value;

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
}

function renderData() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    nameInput.value = name;
    emailInput.value = email;
}

saveBtn.addEventListener('click', saveData);

renderData();





