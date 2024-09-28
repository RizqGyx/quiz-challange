import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { RiTimerFill } from "react-icons/ri";
import { Question, ApiResponse } from "../lib/types";

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
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
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

  const shuffleAnswers = (question: Question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
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
    if (timer > 0 && !isQuizFinished && !loading) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      finishQuiz();
    }
  }, [timer, isQuizFinished, loading]);

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
      finishQuiz();
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

  const finishQuiz = () => {
    setIsQuizFinished(true);
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <p className="text-white text-4xl font-bold">Loading...</p>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Selesai</h2>
        <p>Total Soal: {questions.length}</p>
        <p>
          Jawaban Tidak Terjawab:{" "}
          {questions.length - (correctAnswersCount + wrongAnswersCount)}
        </p>
        <p>Jawaban Benar: {correctAnswersCount}</p>
        <p>Jawaban Salah: {wrongAnswersCount}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-l from-[#93bdac] to-[#71a09a] h-screen w-full">
      <header className="flex justify-between items-center mb-4 p-4 bg-gradient-to-l from-[#bbdbbe] to-[#93bdac] rounded-b-lg">
        <h1 className="text-2xl font-bold text-gray-800">Hello, {username}!</h1>
        <div className="flex items-center gap-2 text-2xl text-gray-800">
          <RiTimerFill className="text-3xl" />
          <p className="font-bold">{formatTimer(timer)}</p>
        </div>
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
            <div className="flex justify-between items-center w-full p-6">
              <p className="text-lg bg-gray-500 p-4 rounded-lg font-bold text-white">
                {currentQuestionIndex + 1}/{questions.length}
              </p>
              <div className="flex flex-col items-center justify-center bg-gray-500 text-white rounded-lg font-bold px-10">
                <p className="text-lg">B: {correctAnswersCount}</p>
                <p className="text-lg">S: {wrongAnswersCount}</p>
              </div>
            </div>

            {questions.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                <h3 className="text-2xl mb-4 text-center text-white font-bold">
                  {questions[currentQuestionIndex].question}
                </h3>
                <ul className="space-y-2">
                  {shuffledAnswers.map((answer, index) => (
                    <li key={index}>
                      <button
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleAnswer(answer)}
                      >
                        {answer}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
