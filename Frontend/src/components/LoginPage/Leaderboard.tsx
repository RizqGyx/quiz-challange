import React from "react";
import { History } from "../../lib/types";
import { Link } from "react-router-dom";

interface LeaderboardProps {
  histories: History[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ histories }) => {
  const sortedHistories = [...histories]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.questionsCount - a.questionsCount;
    })
    .slice(0, 10);

  return (
    <div className="block w-full md:w-1/2 h-screen p-6">
      <div className="flex items-center gap-5 mb-4">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <Link
          to="/history"
          className="bg-white rounded-full p-2 text-lime-800 font-bold hover:bg-gray-300 hover:text-lime-600 text-center"
        >
          Lihat Semua History Permainan
        </Link>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-100px)]">
        <table className="w-full text-left bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Player ID</th>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Correct Answers</th>
              <th className="py-2 px-4">Wrong Answers</th>
              <th className="py-2 px-4">Questions Count</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistories.map((history, index) => (
              <tr key={history.gameId} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
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
      </div>
    </div>
  );
};

export default Leaderboard;
