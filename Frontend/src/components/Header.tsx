import React from "react";
import { RiTimerFill } from "react-icons/ri";
import { HeaderProps } from "../lib/types";

const Header: React.FC<HeaderProps> = ({
  username,
  onLogout,
  timer,
  formatTimer,
}) => {
  return (
    <header className="flex justify-between items-center mb-4 p-4 bg-gradient-to-l from-[#bbdbbe] to-[#93bdac] rounded-b-lg">
      <h1 className="text-2xl font-bold text-gray-800">Hello, {username}!</h1>
      {timer !== undefined && formatTimer && (
        <div className="flex items-center gap-2 text-2xl text-gray-800">
          <RiTimerFill className="text-3xl" />
          <p className="font-bold">{formatTimer(timer)}</p>
        </div>
      )}
      <button
        className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
