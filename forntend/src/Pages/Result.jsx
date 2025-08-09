import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import API from "../Services/Api";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(50);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const emojis = [
    { label: "Very Bad", icon: "😡" },
    { label: "Bad", icon: "😞" },
    { label: "Neutral", icon: "😐" },
    { label: "Good", icon: "😊" },
    { label: "Excellent", icon: "🤩" },
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    setScore(savedScore);

    const fetchSummary = async () => {
      try {
        const res = await API.get("/test/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTotalQuestions(res.data.totalQuestions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!selectedEmoji) {
      alert("Please select an emoji rating");
      return;
    }
    try {
      await API.post(
        "/feedback/feed",
        { emoji: selectedEmoji, comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Thank you for your feedback!");
      setSelectedEmoji("");
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-6 px-3 sm:px-6 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
          {/* Success Icon */}
          <div className="text-green-500 text-4xl sm:text-5xl mb-2">✔</div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl font-bold mb-2">
            Congratulations you have Successfully Completed The Test
          </h1>

          {/* Score */}
          {score !== null && (
            <p className="text-base sm:text-lg font-medium mb-4">
              Score:{" "}
              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                {score}/{totalQuestions}
              </span>
            </p>
          )}

          {/* Enrollment ID */}
          {user?.enrollmentId && (
            <p className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold inline-block mb-4 text-sm sm:text-base">
              Your ID : {user.enrollmentId}
            </p>
          )}

          {/* Feedback Section */}
          <div className="mt-6 text-left">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Feedback</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Give us a feedback! Your input is important for us.
            </p>

            {/* Emoji Picker */}
            <div className="flex flex-wrap justify-between sm:justify-around gap-3 mb-4">
              {emojis.map((e, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEmoji(e.icon)}
                  className={`text-2xl sm:text-3xl transition transform hover:scale-110 ${
                    selectedEmoji === e.icon ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {e.icon}
                </button>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 text-sm sm:text-base"
              rows={3}
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleFeedbackSubmit}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Submit Feedback
            </button>
          </div>

          {/* Back to Home */}
          <button
            onClick={() => navigate("/welcome")}
            className="mt-6 text-gray-600 hover:underline flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            ⬅ Back to home
          </button>
        </div>
      </div>
    </>
  );
}
