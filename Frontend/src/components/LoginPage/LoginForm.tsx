import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setMessage("Login berhasil!");
      localStorage.setItem("username", username);
      setTimeout(() => {
        navigate("/quiz-play");
      }, 1000);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md p-6 py-10 bg-white rounded-md shadow-md"
      method="POST"
    >
      <div>
        <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-black md:text-2xl">
          <Link
            to="/"
            className="bg-lime-500 rounded-full p-1 text-white hover:bg-lime-600"
          >
            <IoMdArrowRoundBack />
          </Link>
          Masuk
        </h1>
      </div>
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-xs font-bold text-black"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className={`bg-gray-50 border ${
            !username ? "border-red-500" : "border-gray-300"
          } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || isSuccess}
        className={`w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          loading || isSuccess ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Loading..." : "Masuk"}
      </button>
      {isSuccess && (
        <div className="flex justify-center mt-4">
          <div
            className={`${
              isSuccess ? "bg-lime-800" : "bg-[#FF0000]"
            } text-center text-white text-sm font-medium px-6 py-4 rounded-xl inline-block`}
          >
            <h1>{message}</h1>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
