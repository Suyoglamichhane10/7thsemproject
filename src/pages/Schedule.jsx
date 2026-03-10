import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Schedule.css";

function Schedule() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Daily Study Schedule</h1>
        <div className="schedule-container">
          <div className="schedule-card">
            <h3>Monday</h3>
            <p>📚 Mathematics - 2 hours (10:00 AM - 12:00 PM)</p>
            <p>🔬 Physics - 1.5 hours (1:00 PM - 2:30 PM)</p>
            <p>💻 Programming - 2 hours (3:00 PM - 5:00 PM)</p>
          </div>
          <div className="schedule-card">
            <h3>Tuesday</h3>
            <p>📚 Mathematics - 2 hours (10:00 AM - 12:00 PM)</p>
            <p>🧪 Chemistry - 1.5 hours (1:00 PM - 2:30 PM)</p>
            <p>📊 Statistics - 2 hours (3:00 PM - 5:00 PM)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;