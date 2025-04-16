import { greet } from './moduleA.js';
import { message } from './moduleB.js';

const appDiv = document.getElementById('app');
appDiv.innerHTML = `${greet('Користувач')} <br> ${message}`;