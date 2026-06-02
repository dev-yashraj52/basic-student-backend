async function loadStudents() {
    const response = await fetch(
        "http://localhost:3000/students"
    );

    const students = await response.json();

    console.log(students);
}

loadStudents();