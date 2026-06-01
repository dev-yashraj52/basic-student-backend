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
router.get("/exams/:id", getExamsById);

router.post("/exams", createNewExam);

router.put("/exams/:id/title", updateExamNameById);
router.put("/exams/:id/marks", updateExamMarksbyId);

router.delete("/exams/:id", deleteExamById);

module.exports = router;