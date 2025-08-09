const Feedback = require("../Modals/Feedback");


const submitFeedback = async (req, res) => {
  const { emoji, comment } = req.body;
  try {
    await Feedback.findOneAndUpdate(
      { userId: req.user },
      { emoji, comment },
      { upsert: true, new: true }
    );
    res.json({ message: "Feedback submitted/updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitFeedback };
