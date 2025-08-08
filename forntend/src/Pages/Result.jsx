import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import API from "../Services/Api";
import { useAuth } from "../Context/AuthContext";

export default function Result() {
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const {user}=useAuth()
  useEffect(() => {
    // Get stored score from localStorage
    const savedScore = localStorage.getItem("score");
    setScore(savedScore);

    // Optionally fetch total questions from backend
    const fetchSummary = async () => {
      try {
        const res = await API.get("/test/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTotalQuestions(res.data.totalQuestions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-lg text-center w-96">
          <h1 className="text-2xl font-bold mb-4">Test Result</h1>
            {user ?  (
        <div className="font-semibold text-blue-600">
          Enrollment ID: {user.enrollmentId}
        </div>
      ) : ""}
          {score !== null ? (
            <>
              <p className="text-lg font-medium">
                🎯 Your Score:{" "}
                <span className="text-green-600">{score}</span>
                {totalQuestions && (
                  <> / <span className="text-blue-600">{totalQuestions}</span></>
                )}
              </p>

              <p className="mt-4">
                {score >= totalQuestions / 2
                  ? "✅ Well done! You passed."
                  : "❌ Keep practicing and try again."}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No score found. Please take the test first.</p>
          )}

          <button
            onClick={() => window.location.href = "/test"}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retake Test
          </button>
        </div>
      </div>
    </>
  );
}
