import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { Question, ApiResponse } from "../lib/types";
import Header from "../components/Header";
import QuestionCounter from "../components/QuizPage/QuestionCounter";
import Statistics from "../components/QuizPage/Statistic";
import AnswerList from "../components/QuizPage/AnswerList";

const Quiz: React.FC = () => {
  const { loading, fetchData } = useFetch();
  const navigate = useNavigate();

  const username: string = localStorage.getItem("username") || "User";
  const [questions, setQuestions] = useState<Question[]>(() =>
    JSON.parse(localStorage.getItem("questions") || "[]")
  );
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState<number>(
    () => parseInt(localStorage.getItem("questionsAnsweredCount") || "0")
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() =>
    parseInt(localStorage.getItem("currentQuestionIndex") || "0")
  );
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(() =>
    parseInt(localStorage.getItem("correctAnswersCount") || "0")
  );
  const [wrongAnswersCount, setWrongAnswersCount] = useState<number>(() =>
    parseInt(localStorage.getItem("wrongAnswersCount") || "0")
  );
  const [timer, setTimer] = useState<number>(() =>
    parseInt(localStorage.getItem("timer") || "60")
  );
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const getQuestion = async () => {
    try {
      const response = (await fetchData(
        `?amount=10&category=12&difficulty=easy`,
        "GET"
      )) as ApiResponse;

      if (response.statusCode === 200) {
        setQuestions(response.data.results);
        localStorage.setItem(
          "questions",
          JSON.stringify(response.data.results)
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendHistoryData = async () => {
    try {
      const score = (correctAnswersCount / questions.length) * 100;
      const response = await axios.post(
        "http://localhost:3000/api/v1/history/create",
        {
          username: username,
          correctAnswers: correctAnswersCount,
          wrongAnswers: wrongAnswersCount,
          questionsCount: questions.length,
          score: score,
        }
      );
      console.log("Response:", response.data);
      navigate("/summary");
    } catch (error) {
      console.error("Error sending history data:", error);
    }
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      setWrongAnswersCount((prev) => prev + 1);
    }

    setQuestionsAnsweredCount((prev) => prev + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      sendHistoryData();
    }
  };

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

  const shuffleAnswers = (question: Question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  };

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (questions.length === 0) {
      getQuestion();
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const shuffled = shuffleAnswers(currentQuestion);
      setShuffledAnswers(shuffled);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
    localStorage.setItem("correctAnswersCount", correctAnswersCount.toString());
    localStorage.setItem("wrongAnswersCount", wrongAnswersCount.toString());
    localStorage.setItem("timer", timer.toString());
    localStorage.setItem(
      "questionsAnsweredCount",
      questionsAnsweredCount.toString()
    );
  }, [
    currentQuestionIndex,
    correctAnswersCount,
    wrongAnswersCount,
    timer,
    questionsAnsweredCount,
  ]);

  useEffect(() => {
    if (timer > 0 && !loading) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      sendHistoryData();
    }
  }, [timer, loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <p className="text-white text-4xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-l from-[#93bdac] to-[#71a09a] h-screen w-full">
      <Header
        username={username}
        onLogout={handleLogout}
        timer={timer}
        formatTimer={formatTimer}
      />

      <main className="w-full flex justify-center items-center">
        <div className="w-3/4">
          <div className="w-full bg-gray-800 flex flex-col justify-between items-center p-4 mt-10 rounded-lg shadow-lg">
            <div className="flex justify-between items-center w-full p-6">
              <QuestionCounter
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
              />
              <Statistics
                correctAnswersCount={correctAnswersCount}
                wrongAnswersCount={wrongAnswersCount}
              />
            </div>

            {questions.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                <h3 className="text-2xl mb-4 text-center text-white font-bold">
                  {questions[currentQuestionIndex].question}
                </h3>
                <AnswerList answers={shuffledAnswers} onAnswer={handleAnswer} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
