import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ScoreDetails from "../components/SummaryPage/ScoreDetails";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const correctAnswer = localStorage.getItem("correctAnswersCount");
    const wrongAnswer = localStorage.getItem("wrongAnswersCount");
    const questions = localStorage.getItem("questions");

    if (!username || !correctAnswer || !wrongAnswer || !questions) {
      navigate("/login");
    }
  }, [navigate]);

  const username: string = localStorage.getItem("username") || "User";
  const correctAnswer: number = parseInt(
    localStorage.getItem("correctAnswersCount") || "0",
    10
  );
  const wrongAnswer: number = parseInt(
    localStorage.getItem("wrongAnswersCount") || "0",
    10
  );
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");
  const countQuestion: number = questions.length;

  const notAnswered = countQuestion - (correctAnswer + wrongAnswer);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handlePlayAgain = () => {
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("correctAnswersCount");
    localStorage.removeItem("wrongAnswersCount");
    localStorage.removeItem("timer");
    localStorage.removeItem("questionsAnsweredCount");
    localStorage.removeItem("questions");
    navigate("/quiz-play");
  };

  return (
    <div className="bg-gradient-to-l from-[#93bdac] to-[#71a09a] h-screen w-full">
      <Header username={username} onLogout={handleLogout} />
      <main className="w-full flex justify-center items-center">
        <div className="w-3/4">
          <ScoreDetails
            correctAnswer={correctAnswer}
            wrongAnswer={wrongAnswer}
            notAnswered={notAnswered}
            totalQuestions={countQuestion}
          />
          <div className="w-full bg-gray-800 flex flex-col pb-10 justify-between items-center rounded-b-lg shadow-lg">
            <button
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SummaryPage;
