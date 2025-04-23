
//1


let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Повідомлення №${count}`);
  if (count >= 5) {
    clearInterval(intervalId);
    console.log("Інтервал зупинено.");
  }
}, 1000);

//2



const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

let size1 = 50;
let growing1 = true;
let colorIndex1 = 0;
const colors1 = ['lightblue', 'lightgreen', 'lightsalmon', 'lightseagreen'];

let size2 = 50;
let growing2 = false;
let opacity2 = 1;

setInterval(() => {
  // Анімація для першого кружечка (зміна розміру та кольору)
  if (growing1) {
    size1 += 5;
    if (size1 > 100) {
      growing1 = false;
      colorIndex1 = (colorIndex1 + 1) % colors1.length;
    }
  } else {
    size1 -= 5;
    if (size1 < 50) {
      growing1 = true;
    }
  }
  circle1.style.width = size1 + 'px';
  circle1.style.height = size1 + 'px';
  circle1.style.backgroundColor = colors1[colorIndex1];

  // Анімація для другого кружечка (зміна розміру та прозорості)
  if (growing2) {
    size2 += 3;
    opacity2 -= 0.05;
    if (size2 > 80) {
      growing2 = false;
    }
  } else {
    size2 -= 3;
    opacity2 += 0.05;
    if (size2 < 30) {
      growing2 = true;
    }
  }
  circle2.style.width = size2 + 'px';
  circle2.style.height = size2 + 'px';
  circle2.style.opacity = Math.max(0, Math.min(1, opacity2)); // Обмежуємо прозорість між 0 та 1

}, 100); // Інтервал у 100 мілісекунд (10 разів на секунду)


















