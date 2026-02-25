import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">StudyNep</h2>
        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>My Tasks</li>
          <li>Schedule</li>
          <li>Assignments</li>
          <li>Projects</li>
          <li>PDF Notes</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="main-section">
        {/* Navbar */}
        <div className="navbar">
          <div>
            <h2>Dashboard Overview</h2>
            <p className="subtitle">
              Manage your study progress efficiently
            </p>
          </div>

          <div className="profile">
            <span>Suyog Lamichhane</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
            />
          </div>
        </div>

        {/* Content */}
        <div className="content">

          {/* Cards */}
          <div className="cards">
            <div className="card">
              <h4>Total Tasks</h4>
              <p>24</p>
              <span className="card-sub">All academic tasks</span>
            </div>

            <div className="card">
              <h4>Completed</h4>
              <p>18</p>
              <span className="success">75% Completed</span>
            </div>

            <div className="card">
              <h4>Pending</h4>
              <p>6</p>
              <span className="warning">Needs Attention</span>
            </div>

            <div className="card">
              <h4>Productivity</h4>
              <p>75%</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>

          {/* Activity + Upcoming */}
          <div className="bottom-section">

            <div className="activity">
              <h3>Recent Activities</h3>
              <ul>
                <li>✔ Completed Web Technology Assignment</li>
                <li>📝 Added new Study Plan</li>
                <li>📘 Uploaded PDF Notes</li>
                <li>📊 Viewed Performance Report</li>
              </ul>
            </div>

            <div className="upcoming">
              <h3>Upcoming Exams</h3>
              <ul>
                <li>📘 Class 12- 5 Days Left</li>
                <li>💻 Web Technology – 8 Days Left</li>
                <li>📊 Software Engineering – 12 Days Left</li>
              </ul>
            </div>

          </div>

          {/* Footer */}
          <footer className="footer">
            © 2026 Smart Study Planner | Designed for Academic Productivity
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;