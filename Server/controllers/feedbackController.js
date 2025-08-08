const Feedback = require("../Modals/Feedback");


const submitFeedback = async (req, res) => {
  const { emoji } = req.body;
  try {
    await Feedback.create({ userId: req.user, emoji });
    res.json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitFeedback };
