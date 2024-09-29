export interface History {
  gameId: string;
  playerId: string;
  username: string;
  correctAnswers: number;
  wrongAnswers: number;
  questionsCount: number;
  score: number;
  status: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryResponse {
  code: number;
  status: string;
  histories: History[];
  pagination: {
    totalData: number;
    totalPages: number;
    pageNum: number;
    limitData: number;
  };
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ApiResponse {
  statusCode: number;
  data: {
    results: Question[];
  };
}

export interface HeaderProps {
  username: string;
  onLogout: () => void;
  timer?: number;
  formatTimer?: (timer: number) => string;
}

export interface ScoreDetailsProps {
  correctAnswer: number;
  wrongAnswer: number;
  notAnswered: number;
  totalQuestions: number;
}

export interface AnswerListProps {
  answers: string[];
  onAnswer: (answer: string) => void;
}

export interface QuestionCounterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export interface StatisticsProps {
  correctAnswersCount: number;
  wrongAnswersCount: number;
}
