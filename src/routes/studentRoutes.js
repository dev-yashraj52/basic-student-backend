const express = require("express");
const router = express.Router();

const { getStudents,
    getStudentById,
    createNewStudent,
    updateStudentNameById,
    deleteStudentById
} = require("../controllers/studentControllers.js");

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);

router.post("/students", createNewStudent);

router.put("/students/:id", updateStudentNameById);

router.delete("/students/:id", deleteStudentById);

module.exports = router;