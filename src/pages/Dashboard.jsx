// Remove Navbar import - just keep Sidebar
import { FaUserCircle } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  // Mock user data
  const user = {
    name: "Ram Sharma",
    email: "ram.sharma@student.com",
    level: "Bachelor CSIT 5th Sem",
    profileImage: null
  };

  return (
    <>
      <div className="dashboard-header">
        <div className="profile-section">
          <div className="profile-avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} />
            ) : (
              <FaUserCircle className="default-avatar" />
            )}
          </div>
          <div className="profile-info">
            <h2>Welcome back, {user.name}!</h2>
            <p className="user-email">{user.email}</p>
            <p className="user-level">{user.level}</p>
          </div>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="card-container">
          <div className="card">
            <h3>TOTAL STUDY HOURS</h3>
            <p>24 hrs</p>
            <small>This week</small>
          </div>
          <div className="card">
            <h3>COMPLETED TOPICS</h3>
            <p>12</p>
            <small>Out of 20</small>
          </div>
          <div className="card">
            <h3>UPCOMING EXAMS</h3>
            <p>3</p>
            <small>Next in 5 days</small>
          </div>
          <div className="card">
            <h3>STUDY STREAK</h3>
            <p>5 days</p>
            <small>Keep going! 🔥</small>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Study Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">Today, 10:30 AM</span>
              <span className="activity-desc">Completed Mathematics Chapter 5</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">Yesterday, 3:15 PM</span>
              <span className="activity-desc">Physics Practice Test - 85%</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">Yesterday, 11:00 AM</span>
              <span className="activity-desc">Programming Assignment Submitted</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;