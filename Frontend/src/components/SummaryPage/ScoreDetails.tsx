import React from "react";
import { ScoreDetailsProps } from "../../lib/types";

const ScoreDetails: React.FC<ScoreDetailsProps> = ({
  correctAnswer,
  wrongAnswer,
  notAnswered,
  totalQuestions,
}) => {
  const score = (correctAnswer * 100) / totalQuestions;

  return (
    <div className="w-full bg-gray-800 flex flex-col justify-between items-center p-4 mt-10 rounded-t-lg shadow-lg">
      <div className="flex-col w-full p-6 text-white font-bold text-center">
        <h1 className="text-4xl mb-4">Your Score Is {score}</h1>
        <div className="mb-4">
          <h1 className="text-2xl text-lime-500">
            Correct Answers: {correctAnswer}
          </h1>
          <h1 className="text-2xl text-red-500">
            Wrong Answers: {wrongAnswer}
          </h1>
          <h1 className="text-2xl text-neutral-500">
            Not Answered: {notAnswered}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ScoreDetails;
