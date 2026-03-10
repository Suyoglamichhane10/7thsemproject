import "./Progress.css";
// NO Navbar import here!

function Progress() {
  return (
    <>
      <h1>Study Progress</h1>
      <div className="progress-container">
        <div className="progress-stats">
          <div className="progress-card">
            <h3>This Week's Study</h3>
            <p>18.5 hrs</p>
            <small>Target: 25 hrs</small>
          </div>
          <div className="progress-card">
            <h3>Subjects Completed</h3>
            <p>5/12</p>
            <small>42% complete</small>
          </div>
          <div className="progress-card">
            <h3>Average Score</h3>
            <p>78%</p>
            <small>+5% from last week</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;