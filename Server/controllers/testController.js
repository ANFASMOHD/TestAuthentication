
const Qustion = require("../Modals/Qustion");
const TestResult=require("../Modals/Test")


const getQuestions = async (req, res) => {
  const questions = await Qustion.find().limit(10);
  res.json(questions);
};

const submitTest = async (req, res) => {
  const { answers } = req.body;
  try {
    let score = 0;
    for (let ans of answers) {
      const q = await Qustion.findById(ans.questionId);
      if (q.correctAnswer === ans.selectedAnswer) {
        score += 5;
      }
    }
    await TestResult.create({ userId: req.user, score, answers });
    res.json({ score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getQuestions, submitTest };
