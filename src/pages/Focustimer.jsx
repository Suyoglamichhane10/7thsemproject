import { useState } from "react";
import "./FocusTimer.css";
// IMPORTANT: NO Navbar import here!

function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus"); // focus, break

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setMode("focus");
  };

  return (
    <div className="focus-timer-page">
      <h1>Focus Timer</h1>
      <div className="timer-container">
        <div className="timer-mode">
          <span className={mode === "focus" ? "active" : ""}>Focus</span>
          <span className={mode === "break" ? "active" : ""}>Break</span>
        </div>
        <div className="timer-display">
          <h2>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h2>
          <p>{mode === "focus" ? "Study Time" : "Break Time"}</p>
        </div>
        <div className="timer-controls">
          {!isActive ? (
            <button onClick={startTimer} className="start-btn">Start</button>
          ) : (
            <button onClick={resetTimer} className="reset-btn">Reset</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;