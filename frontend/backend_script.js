export async function loadStudents() {
    const response = await fetch(
        "http://localhost:3000/students"
    );

    const students = await response.json();

    //we can combine above two const in one single too
    //like this 
    //const students = await(await fetch("API Here")).json();

    console.log(students);
}

export async function addStudent(name) {

    const response = await fetch(
        "http://localhost:3000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    }
    );

    return (response.json());
}