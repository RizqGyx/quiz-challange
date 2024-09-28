import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const score: number = correctAnswer;

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("correctAnswersCount");
    localStorage.removeItem("wrongAnswersCount");
    localStorage.removeItem("timer");
    localStorage.removeItem("questionsAnsweredCount");
    localStorage.removeItem("questions");
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
      <header className="flex justify-between items-center mb-4 p-4 bg-gradient-to-l from-[#bbdbbe] to-[#93bdac] rounded-b-lg">
        <h1 className="text-2xl font-bold text-gray-800">Hello, {username}!</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="w-full flex justify-center items-center">
        <div className="w-3/4">
          <div className="w-full bg-gray-800 flex flex-col justify-between items-center p-4 mt-10 rounded-lg shadow-lg">
            <div className="flex-col w-full p-6 text-white font-bold text-center">
              <h1 className="text-4xl mb-4">
                Your Score Is {(score * 100) / countQuestion}
              </h1>
              <div className="mb-4">
                <h1 className="text-2xl text-lime-500">
                  Correct Answers: {correctAnswer}
                </h1>
                <h1 className="text-2xl text-red-500">
                  Wrong Answers: {wrongAnswer}
                </h1>
                <h1 className="text-2xl text-neutral-500">
                  Not Answered: {countQuestion - (correctAnswer + wrongAnswer)}
                </h1>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 mt-4"
                onClick={handlePlayAgain}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SummaryPage;
