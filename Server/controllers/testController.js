
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
        score += 1;
      }
    }
    // check if test result already exists for user
    const existingTest = await TestResult.findOne({ userId: req.user });
    if (existingTest) {
      existingTest.score = score;
      existingTest.answers = answers;
      await existingTest.save();
      res.json({ score, updated: true });
    } else {
      await TestResult.create({ userId: req.user, score, answers });
      res.json({ score, created: true });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTestSummary = async (req, res) => {
  try {
    const totalQuestions = await Qustion.countDocuments();
    res.json({ totalQuestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getQuestions, submitTest, getTestSummary };
