import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Dashboard</h1>
        <div className="card-container">
          <div className="card">
            <h3>Total Study Hours</h3>
            <p>24 hrs</p>
          </div>
          <div className="card">
            <h3>Completed Topics</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Upcoming Exams</h3>
            <p>3</p>
          </div>
          <div className="card">
            <h3>Study Streak</h3>
            <p>5 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;