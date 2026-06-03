import * as API from './backend_script.js'

const buttons = document.querySelectorAll('.toggle-btn');
const boxes = document.querySelectorAll('.content-student');

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

document.getElementById("add-student-btn").addEventListener("click", () => {
    API.addStudent(document.getElementById("add-student-name-field").value);
})

API.loadStudents();