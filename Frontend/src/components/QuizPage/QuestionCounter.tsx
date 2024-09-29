import React from "react";
import { QuestionCounterProps } from "../../lib/types";

const QuestionCounter: React.FC<QuestionCounterProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div className="text-lg bg-gray-500 p-4 rounded-lg font-bold text-white">
      {currentQuestionIndex + 1}/{totalQuestions}
    </div>
  );
};

export default QuestionCounter;
