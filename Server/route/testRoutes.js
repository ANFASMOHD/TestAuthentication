const express = require("express");
const { getQuestions, submitTest, getTestSummary } = require("../controllers/testController");
const protect = require("../MiddleWare/authmiddleware");

const router = express.Router();


router.get("/summary", protect, getTestSummary);
router.get("/questions", protect, getQuestions);
router.post("/submit", protect, submitTest);

module.exports = router;
