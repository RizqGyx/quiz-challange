import React from "react";
import { AnswerListProps } from "../../lib/types";

const AnswerList: React.FC<AnswerListProps> = ({ answers, onAnswer }) => {
  return (
    <ul className="space-y-2">
      {answers.map((answer, index) => (
        <li key={index}>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onAnswer(answer)}
          >
            {answer}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AnswerList;
