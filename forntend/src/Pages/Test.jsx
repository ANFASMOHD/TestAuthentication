import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Api";
import Navbar from "../Components/Navbar";

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: selectedAnswer,
      };
      // Recalculate score after answer change
      let currentScore = 0;
      questions.forEach((q) => {
        if (updated[q._id] && updated[q._id] === q.correctAnswer) {
          currentScore += 1;
        }
      });
      localStorage.setItem("score", currentScore);
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
        questionId: qId,
        selectedAnswer: ans,
      }));
      const res = await API.post("/test/submit", { answers: formattedAnswers });
      localStorage.setItem("score", res.data.score);
      navigate("/result");
    } catch (err) {
      console.error(err);
      alert("Failed to submit test");
    }
  };

  const getQuestionStatus = (qId) => {
    if (answers[qId]) return "bg-green-500 text-white";
    if (currentIndex === questions.findIndex((q) => q._id === qId))
      return "border-2 border-blue-500";
    return "bg-gray-100";
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
  
        <div className="lg:w-1/5 bg-white border-b lg:border-b-0 lg:border-r p-4">
    
          <div className="flex lg:grid lg:grid-cols-3 gap-2 overflow-x-auto pb-2">
            {questions.map((q, index) => (
              <button
                key={q._id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 rounded-lg w-10 h-10 font-semibold flex items-center justify-center ${getQuestionStatus(
                  q._id
                )}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="hidden lg:block mt-6 text-sm space-y-2">
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-green-500 rounded"></span>
              Attended
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-red-500 border rounded"></span>
              Not Attend
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-blue-500 rounded"></span>
              Current
            </p>
          </div>
        </div>

     
        <div className="flex-1 p-4 lg:p-6">
       
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
            <h1 className="text-lg font-bold">
              {currentIndex + 1}/{questions.length}
            </h1>
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
              ⏳ {formatTime(timeLeft)}
            </div>
          </div>

          {questions.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                {questions[currentIndex].questionText}
              </h2>
              <div className="space-y-3">
                {questions[currentIndex].options.map((option, i) => {
                  const isSelected =
                    answers[questions[currentIndex]._id] === option;
                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        isSelected
                          ? "bg-green-100 border-green-500"
                          : "hover:bg-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questions[currentIndex]._id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() =>
                          handleAnswerChange(
                            questions[currentIndex]._id,
                            option
                          )
                        }
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

 
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="bg-gray-200 px-5 py-2 rounded-lg font-medium disabled:opacity-50 w-full sm:w-auto"
            >
              ← Previous
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  // Recalculate score on Next
                  let currentScore = 0;
                  questions.forEach((q) => {
                    if (answers[q._id] && answers[q._id] === q.correctAnswer) {
                      currentScore += 1;
                    }
                  });
                  localStorage.setItem("score", currentScore);
                  setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
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
