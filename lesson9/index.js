
// Завдання:

// Створіть програму для зберігання контактів — ім'я, прізвище, телефон та електронна адреса. Зберігайте контакти в localStorage та дозволяйте користувачу додавати, видаляти та редагувати контакти.


const name = document.getElementById('name');
const surname = document.getElementById('surname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const saveBtn = document.getElementById('save');
function loadContacts() {
    const contactsJSON = localStorage.getItem('contacts');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function renderContacts() {
    const contacts = loadContacts();
    const contactsList = document.getElementById('contacts');
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${contact.firstName} ${contact.lastName} - ${contact.phone} (${contact.email})
            <button class="edit-btn" onclick="editContact(${index})">Редагувати</button>
            <button class="delete-btn" onclick="deleteContact(${index})">Видалити</button>
        `;
        contactsList.appendChild(listItem);
    });
}

function addContact() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const newContact = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (newContact.firstName && newContact.lastName && newContact.phone && newContact.email) {
        const contacts = loadContacts();
        contacts.push(newContact);
        saveContacts(contacts);

        firstNameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
    } else {
        alert('Будь ласка, заповніть усі поля.');
    }
}

let editingIndex = -1; // Індекс контакту, який редагується

function editContact(index) {
    const contacts = loadContacts();
    const contactToEdit = contacts[index];

    document.getElementById('firstName').value = contactToEdit.firstName;
    document.getElementById('lastName').value = contactToEdit.lastName;
    document.getElementById('phone').value = contactToEdit.phone;
    document.getElementById('email').value = contactToEdit.email;

    document.querySelector('#contact-form h2').textContent = 'Редагувати контакт';
    document.querySelector('#contact-form button').textContent = 'Зберегти зміни';
    document.querySelector('#contact-form button').onclick = function() { saveEditedContact(index); };

    editingIndex = index;
}

function saveEditedContact(index) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const updatedContact = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (updatedContact.firstName && updatedContact.lastName && updatedContact.phone && updatedContact.email) {
        const contacts = loadContacts();
        contacts[index] = updatedContact;
        saveContacts(contacts);

        document.querySelector('#contact-form h2').textContent = 'Додати новий контакт';
        document.querySelector('#contact-form button').textContent = 'Додати';
        document.querySelector('#contact-form button').onclick = addContact;

        firstNameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        editingIndex = -1;
    } else {
        alert('Будь ласка, заповніть усі поля.');
    }
}

function deleteContact(index) {
    if (confirm('Ви впевнені, що хочете видалити цей контакт?')) {
        const contacts = loadContacts();
        contacts.splice(index, 1);
        saveContacts(contacts);
    }
}

// Завантаження контактів при завантаженні сторінки
renderContacts();



