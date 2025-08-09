const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  answers: [{ questionId: String,
     selectedAnswer: String }]
});

module.exports = mongoose.model("TestResult", testResultSchema);
