import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const HomePage: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("correctAnswersCount");
    localStorage.removeItem("wrongAnswersCount");
    localStorage.removeItem("timer");
    localStorage.removeItem("questionsAnsweredCount");
    localStorage.removeItem("questions");
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="wrap-Hero w-full flex items-center justify-center bg-gradient-to-r from-[#93bdac] to-[#71a09a] h-screen">
        <div className="w-full max-w-md p-10 flex flex-col gap-5 bg-white/60 rounded-md">
          <img src="/dot_indonesia_logo.jpg" alt="Logo DOT" />
          <Link
            to="/login"
            className="flex items-center justify-center gap-3 bg-lime-800 rounded-full p-2 text-white hover:bg-lime-600"
          >
            <FaPlay /> <p>Play Quiz Game</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
