// Quiz API
const QUIZ_URL: string = "https://opentdb.com/api.php";

// Question Amount
const QUIZ_AMOUNT: number = 10;

// Difficulty Type - Easy, Medium, and Hard
type Difficulty = "easy" | "medium" | "hard";
const QUIZ_DIFFICULTY: Difficulty = "easy";

export { QUIZ_URL, QUIZ_AMOUNT, QUIZ_DIFFICULTY };
