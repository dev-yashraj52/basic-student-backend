//this creates a server that listens on port 3000
const express = require("express");
const mysql = require("mysql2");
require('dotenv').config({ path: '.env' })

const app = express();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_STUDENT_NAME
});


db.connect((err) => {
    if (err) {
        console.log(`Database Error: ${err}`);
        return;
    }
    console.log("Connected to MySql Database!")
});
app.use(express.json());

// //Fake Database
// const students = [
//     { id: 1, name: "Yash" },
//     { id: 2, name: "Akash" },
//     { id: 3, name: "Sandeep" },
//     { id: 4, name: "Rohan" },
// ]

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

//this creates a route, whenever someone request/visit for "/", it will send response as given
app.get("/", (req, res) => {
    res.send("Your Very First Server is Live");
});


app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM students",
        (err, results) => {
            if (err) {
                return res.status(500).send("Database Error");
            }
            res.json(results);
        }
    );

});

//read data from students db
app.get("/students/:id", (req, res) => {


    db.query(
        "SELECT * FROM students WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).send("Database Error");
            }
            if (results.length === 0) {
                return res.status(404).send("Student Not Found");
            }
            res.status(200).json(results[0]);
        }
    );
    // const student = students.find(
    //     s => s.id === Number(req.params.id)
    // );

    // if (!student) {
    //     return res.status(404).send("Student Not Found");
    // }

    // res.status(200).json(students);


});

//create new data in students array
app.post("/students", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send("Name is Required")
    }

    db.query(
        "INSERT INTO students (name) VALUES (?)",
        [name],
        (err, results) => {
            if (err) {
                return res.status(500).send("Database Error");
            }

            res.status(201).json({
                message: "Student Created",
                id: results.insertId
            });
        }


    );

    // students.push({
    //     id: students.length + 1,
    //     name
    // });

    // res.json(students);
});

//delete existing data in student array
app.delete("/students/:id", (req, res) => {

    db.query("DELETE FROM students WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).send("Database Error");
            }

            if (results.affectedRows === 0) {
                return res.status(404).send("Student not Found");
            }

            res.status(200).send("Student Deleted");
        }
    );


    // const indexToDelete = students.findIndex(s => s.id === Number(req.params.id));
    // if (indexToDelete !== -1) {
    //     students.splice(indexToDelete, 1);
    //     res.status(200).json(students);
    // } else {
    //     res.status(404).send("Student not found");
    // }
})

//update name in exisiting student array
app.put("/students/:id", (req, res) => {

    if (!req.body.name) {
        return res.status(400).send("Name is Required")
    }

    db.query("UPDATE students SET name = ? WHERE id = ?",
        [req.body.name, req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).send("Database Error");
            }

            if (results.affectedRows === 0) {
                return res.status(404).send("Student not Found");
            }

            res.status(200).send("Student Name Updated");
        }
    );


    // const student = students.find(s => s.id === Number(req.params.id));

    // if (!student) {
    //     return res.status(404).send("Student Not Found");
    // }

    // student.name = req.body.name;

    // res.status(200).json(students);



})