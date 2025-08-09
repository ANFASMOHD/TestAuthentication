const express = require("express");
const { submitFeedback } = require("../controllers/feedbackController");
const protect = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.post("/feed", protect, submitFeedback);

module.exports = router;
