const User = require("../Modals/User");
const TestResult = require("../Modals/Test");
const Feedback = require("../Modals/Feedback");

// Get all students with their test mark and feedback
const getAllStudentsWithDetails = async (req, res) => {
  try {
    // Find all users with role 'student'
  const students = await User.find({ role: "student" }).select("fullName email");

    // For each student get their test result and feedback
    const studentDetails = await Promise.all(
      students.map(async (student) => {
        const testResult = await TestResult.findOne({ userId: student._id }).select("score");
        // Populate all feedbacks for the student
        const feedbacks = await Feedback.find({ userId: student._id }).select("emoji comment createdAt");
        // console.log("**feedback**",feedbacks)

        return {
          fullName: student.fullName,
          email: student.email,
          testMark: testResult ? testResult.score : null,
          feedbacks: feedbacks.length > 0 ? feedbacks : null,
        };
      })
    );
 console.log(studentDetails);
 
    // Format feedbacks for better readability
    const formattedDetails = studentDetails.map(student => ({
      ...student,
      feedbacks: student.feedbacks
        ? student.feedbacks.map(fb => ({
            emoji: fb.emoji,
            comment: fb.comment,
            createdAt: fb.createdAt
          }))
        : null
    }));
    res.json(formattedDetails);
  } catch (err) {
    console.error("Error fetching students details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllStudentsWithDetails,
  // other exports like registerUser, loginUser etc.
};
