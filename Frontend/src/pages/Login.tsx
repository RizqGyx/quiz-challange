import { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "../components/LoginPage/Leaderboard";
import LoginForm from "../components/LoginPage/LoginForm";
import { History, HistoryResponse } from "../lib/types";

const LoginPage: React.FC = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHistories = async () => {
      setLoading(true);
      try {
        const response = await axios.get<HistoryResponse>(
          "http://localhost:3000/api/v1/history"
        );
        setHistories(response.data.histories);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getHistories();
  }, []);

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
    <div className="min-h-screen flex flex-col-reverse md:flex-row overflow-hidden bg-[#406470]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Leaderboard histories={histories} />
      )}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-[#406470] to-[#2f4858] h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
