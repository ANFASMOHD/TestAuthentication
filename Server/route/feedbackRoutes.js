const express = require("express");
const { submitFeedback } = require("../controllers/feedbackController");
const protect = require("../MiddleWare/authmiddleware");

const router = express.Router();

router.post("/", protect, submitFeedback);

module.exports = router;
