const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  emoji:String
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
