import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import QuizPage from "./pages/Quiz";
import SummaryPage from "./pages/Summary";
import HistoryPage from "./pages/History";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/quiz-play" element={<QuizPage />}></Route>
        <Route path="/summary" element={<SummaryPage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
        <Route
          path="*"
          element={
            <div className="h-screen flex flex-col justify-center items-center">
              <img
                src="/404_page.jpg"
                alt="404 Not Found"
                className="w-4/5 md:w-3/5 h-auto"
              />
              <Link
                to="/"
                className="px-16 md:px-40 py-1 md:py-2 font-bold bg-violet-400 border-4 text-white rounded-xl shadow-md hover:bg-violet-600"
              >
                Go to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
