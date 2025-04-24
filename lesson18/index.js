document.addEventListener('DOMContentLoaded', () => {
    const getStudentsBtn = document.getElementById('get-students-btn');
    const addStudentForm = document.getElementById('add-student-form');
    const studentsTableBody = document.querySelector('#students-table tbody');

    let studentsData = []; // In-memory storage for students (simulates database)

    // Load initial data from students.json (simulated)
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            studentsData = data.students;
            renderStudents(studentsData);
        })
        .catch(error => console.error('Error loading students:', error));

    // Function to render students in the table
    function renderStudents(students) {
        studentsTableBody.innerHTML = '';
        students.forEach(student => {
            const row = studentsTableBody.insertRow();
            row.insertCell().textContent = student.id;
            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.age;
            row.insertCell().textContent = student.course;
            row.insertCell().textContent = student.skills.join(', ');
            row.insertCell().textContent = student.email;
            row.insertCell().textContent = student.isEnrolled ? 'Так' : 'Ні';

            const actionsCell = row.insertCell();
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Оновити';
            updateButton.addEventListener('click', () => openUpdateModal(student.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Видалити';
            deleteButton.addEventListener('click', () => deleteStudent(student.id));

            actionsCell.appendChild(updateButton);
            actionsCell.appendChild(deleteButton);
        });
    }

    // Function to simulate GET request
    function getStudents() {
        renderStudents(studentsData);
    }

    // Function to simulate POST request
    function addStudent(e) {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const courseInput = document.getElementById('course');
        const skillsInput = document.getElementById('skills');
        const emailInput = document.getElementById('email');
        const isEnrolledInput = document.getElementById('isEnrolled');

        const newStudent = {
            id: studentsData.length > 0 ? Math.max(...studentsData.map(s => s.id)) + 1 : 1,
            name: nameInput.value,
            age: parseInt(ageInput.value),
            course: courseInput.value,
            skills: skillsInput.value.split(',').map(skill => skill.trim()),
            email: emailInput.value,
            isEnrolled: isEnrolledInput.checked
        };

        studentsData.push(newStudent);
        renderStudents(studentsData);

        // Clear the form
        addStudentForm.reset();
    }

    // Function to simulate PATCH request (opens a modal for editing)
    function openUpdateModal(id) {
        const studentToUpdate = studentsData.find(student => student.id === id);
        if (studentToUpdate) {
            // For simplicity, let's just log the student data for now.
            // In a real application, you would populate a modal form.
            console.log('Updating student:', studentToUpdate);
            const newName = prompt("Введіть нове ім'я:", studentToUpdate.name);
            if (newName !== null) {
                studentToUpdate.name = newName;
                renderStudents(studentsData);
            }
            // You would typically have a more elaborate modal with fields for all properties.
        }
    }

    // Function to simulate DELETE request
    function deleteStudent(id) {
        studentsData = studentsData.filter(student => student.id !== id);
        renderStudents(studentsData);
    }

    // Event listeners
    getStudentsBtn.addEventListener('click', getStudents);
    addStudentForm.addEventListener('submit', addStudent);
});