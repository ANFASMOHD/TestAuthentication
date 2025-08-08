import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Api";
import Navbar from "../Components/Navbar";

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const navigate = useNavigate();

  // Fetch questions when page loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/test/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load questions");
      }
    };
    fetchQuestions();
    console.log("**use",questions)
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Handle selecting an answer
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  // Handle submit test
  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
        questionId: qId,
        selectedAnswer: ans,
      }));

      const res = await API.post("/test/submit", { answers: formattedAnswers });

      // Store score in localStorage so Result.jsx can use it
      localStorage.setItem("score", res.data.score);

      navigate("/result");
    } catch (err) {
      console.error(err);
      alert("Failed to submit test");
    }
  };

  // Determine question status for left panel
  const getQuestionStatus = (qId) => {
    if (answers[qId]) return "bg-green-400"; // Attended
    if (currentIndex === questions.findIndex((q) => q._id === qId))
      return "bg-yellow-400"; // Current question
    return "bg-red-400"; // Not Attended
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Left Panel - Question navigation */}
        <div className="w-1/5 p-4 border-r">
          <div className="grid grid-cols-2 gap-2">
            {questions.map((q, index) => (
              <button
                key={q._id}
                onClick={() => setCurrentIndex(index)}
                className={`text-white font-bold rounded w-10 h-10 ${getQuestionStatus(
                  q._id
                )}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p>
              <span className="inline-block w-4 h-4 bg-green-400 mr-2"></span>
              Attended
            </p>
            <p>
              <span className="inline-block w-4 h-4 bg-red-400 mr-2"></span>
              Not Attended
            </p>
            <p>
              <span className="inline-block w-4 h-4 bg-yellow-400 mr-2"></span>
              Current
            </p>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="w-4/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">
              Question {currentIndex + 1} / {questions.length}
            </h1>
            <div className="bg-yellow-200 px-3 py-1 rounded font-semibold">
              ⏳ {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          {questions.length > 0 && (
            <div className="p-4 border rounded bg-white shadow">
              <h2 className="font-semibold mb-2">
                {questions[currentIndex].questionText}
              </h2>

              <div className="space-y-2">
                {questions[currentIndex].options.map((option, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${questions[currentIndex]._id}`}
                      value={option}
                      checked={answers[questions[currentIndex]._id] === option}
                      onChange={() =>
                        handleAnswerChange(questions[currentIndex]._id, option)
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
