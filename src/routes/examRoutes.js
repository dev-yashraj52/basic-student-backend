const express = require("express");
const router = express.Router();

const { getExams,
    getExamsById,
    createNewExam,
    updateExamNameById,
    updateExamMarksbyId,
    deleteExamById
} = require("../controllers/examControllers.js");

router.get("/exams", getExams);
router.get("/exams/:id", getStudentById);

router.post("/students", createNewExam);

router.put("/students/:id", updateExamNameById);
router.put("/students/:id", updateExamMarksbyId);

router.delete("/students/:id", deleteExamById);

module.exports = router;