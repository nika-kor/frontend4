
// Завдання 2

// Потрібно забезпечити плавне переміщення об'єкту при русі мишкою. Рішення: використовуйте метод debounce з бібліотеки lodash. Встановіть час затримки в мілісекундах, наприклад 100мс, і передайте функцію, яка буде виконуватися при переміщенні мишкою.


const box = document.getElementById('box');

function onMove(e) {
    box.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    return box.style.transform;
}

box.addEventListener('mousemove', debounce(onMove, 100));












