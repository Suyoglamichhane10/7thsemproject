import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./FocusTimer.css";

function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Focus Timer</h1>
        <div className="timer-container">
          <div className="timer-display">
            <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
            <p>Focus Mode Active</p>
          </div>
          <div className="timer-controls">
            <button onClick={startTimer}>Start Focus</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;