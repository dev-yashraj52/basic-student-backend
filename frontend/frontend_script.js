import * as API from './backend_script.js'

const buttons = document.querySelectorAll('.toggle-btn');
const boxes = document.querySelectorAll('.content-student');

async function loadStudents() {
    const students = await API.getStudents();
    const studentList = document.getElementById('student-list');

    studentList.innerHTML = " ";
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.id} - ${student.name}`

        studentList.appendChild(li);
    })
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetBox = document.getElementById(targetId);

        const isAlreadyActive = button.classList.contains('active');

        buttons.forEach(btn => btn.classList.remove('active'));
        boxes.forEach(box => box.classList.add('hidden'));

        if (!isAlreadyActive) {
            button.classList.add('active');
            targetBox.classList.remove('hidden');
        }
    })
})

const messageDisplay = document.getElementById('message-display');

document.getElementById("add-student-btn").addEventListener("click", async () => {

    const nameField = document.getElementById("add-student-name-field");
    const response = await API.addStudent(nameField.value);
    nameField.value = '';
    messageDisplay.textContent = response.message;
    setTimeout(() => {
        messageDisplay.textContent = '';
    }, 2000)
})

document.getElementById('load-student-btn').addEventListener("click", () => { loadStudents() });
