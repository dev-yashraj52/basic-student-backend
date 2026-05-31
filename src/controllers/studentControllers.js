const db = require("../config/db.js")

const getStudents = async (req, res) => {

    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM students"
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        })
    }

    //DIRECT WAY TO FETCH FROM DB WIHOUT USING AWAIT
    //     db.query(
    //         "SELECT * FROM students",
    //         (err, results) => {
    //             if (err) {
    //                 return res.status(500).send("Database Error");
    //             }
    //             res.json(results);
    //         }
    //     );
};

const getStudentById = (req, res) => {
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
};

const createNewStudent = (req, res) => {
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
};

const updateStudentNameById = (req, res) => {
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
};

const deleteStudentById = (req, res) => {
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
};


module.exports = {
    getStudents,
    getStudentById,
    createNewStudent,
    updateStudentNameById,
    deleteStudentById
};