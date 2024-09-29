import React from "react";
import { StatisticsProps  } from "../../lib/types";

const Statistics: React.FC<StatisticsProps> = ({
  correctAnswersCount,
  wrongAnswersCount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 text-white rounded-lg font-bold px-10">
      <p className="text-lg">B: {correctAnswersCount}</p>
      <p className="text-lg">S: {wrongAnswersCount}</p>
    </div>
  );
};

export default Statistics;
