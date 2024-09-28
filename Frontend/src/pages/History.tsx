import React, { useEffect, useState } from "react";
import axios from "axios";
import { History, HistoryResponse } from "../lib/types";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const HistoryPage: React.FC = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [filteredHistories, setFilteredHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchHistories = async () => {
      setLoading(true);
      try {
        const response = await axios.get<HistoryResponse>(
          "http://localhost:3000/api/v1/history"
        );
        setHistories(response.data.histories);
        setFilteredHistories(response.data.histories);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  useEffect(() => {
    const filtered = histories.filter((history) =>
      history.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHistories(filtered);
  }, [searchTerm, histories]);

  return (
    <div className="p-6 bg-[#2f4858] h-screen shadow-md">
      <div>
        <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-white md:text-2xl">
          <Link to="/login" className="bg-white rounded-full p-1 text-lime-600">
            <IoMdArrowRoundBack />
          </Link>
          Game History
        </h1>
      </div>
      <input
        type="text"
        placeholder="Search by player name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="w-full text-left bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Player ID</th>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Correct Answers</th>
              <th className="py-2 px-4">Wrong Answers</th>
              <th className="py-2 px-4">Questions Count</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistories.map((history) => (
              <tr key={history.gameId} className="border-b">
                <td className="py-2 px-4">{history.playerId}</td>
                <td className="py-2 px-4">{history.username}</td>
                <td className="py-2 px-4">{history.correctAnswers}</td>
                <td className="py-2 px-4">{history.wrongAnswers}</td>
                <td className="py-2 px-4">{history.questionsCount}</td>
                <td className="py-2 px-4">{history.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;
