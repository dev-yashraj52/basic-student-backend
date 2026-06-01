const db = require("../config/db.js");

const getExams = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM exams"
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};

const getExamsById = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM exams WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            res.status(404).json({
                message: "Exam not Found"
            })
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};
const createNewExam = async (req, res) => {
    try {
        const { title, totalMarks } = req.body;

        if (!title || !totalMarks) {
            return res.status(400).json({
                message: "Exam Title or Total Marks cannot be empty"
            });
        }


        const [result] = await db.promise().query(
            "INSERT INTO exams (title, totalMarks) VALUES (?, ?)",
            [title, totalMarks]
        );

        console.log("REached here");

        res.status(201).json({
            message: "New Exam Created in database",
            id: result.insertId
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};

const updateExamNameById = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Exam Title cannot be empty"
            });
        }

        const [result] = await db.promise().query(
            "UPDATE exams SET title = ? WHERE id = ?",
            [title, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Exam by such Id not found"
            });
        }

        res.status(200).json({
            message: "Updated Exam Title"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};
const updateExamMarksbyId = async (req, res) => {
    try {
        const { totalMarks } = req.body;

        if (!totalMarks) {
            return res.status(400).json({
                message: "Updated Marks cannot be empty"
            });
        }

        const [result] = await db.promise().query(
            "UPDATE exams SET totalMarks = ? WHERE id = ?",
            [totalMarks, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Exam by such Id not found"
            });
        }

        res.status(200).json({
            message: "Updated Exam Total Marks"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};
const deleteExamById = async (req, res) => {
    try {
        const [result] = await db.promise().query(
            "DELETE FROM exams WHERE id= ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Exam by such id not Found"
            });
        }

        res.status(200).json({
            message: "Exam deleted from datbase"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};

module.exports = {
    getExams,
    getExamsById,
    createNewExam,
    updateExamNameById,
    updateExamMarksbyId,
    deleteExamById
};