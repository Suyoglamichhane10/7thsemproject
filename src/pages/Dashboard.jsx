import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  // Mock user data
  const user = {
    name: "Ram Sharma",
    level: "Bachelor CSIT 5th Sem",
    avatar: null, // will use icon
  };

  // Mock stats
  const stats = {
    totalHours: 24,
    completedTopics: 12,
    upcomingExams: 3,
    streak: 7,
  };

  // Today's focus tasks (from planner)
  const todayFocus = [
    { subject: "Mathematics", task: "Chapter 5: Calculus", duration: "2h", priority: "high" },
    { subject: "Physics", task: "Chapter 3: Thermodynamics", duration: "1.5h", priority: "medium" },
    { subject: "CSIT", task: "Data Structures: Trees", duration: "2h", priority: "high" },
  ];

  // Upcoming deadlines
  const deadlines = [
    { subject: "Mathematics", exam: "Mid Term", date: "2025-05-15", daysLeft: 5 },
    { subject: "Physics", exam: "Quiz", date: "2025-05-12", daysLeft: 2 },
    { subject: "CSIT", exam: "Assignment", date: "2025-05-10", daysLeft: 0 },
  ];

  // Recent activities
  const activities = [
    { id: 1, description: "Completed Mathematics Chapter 5", time: "Today, 10:30 AM" },
    { id: 2, description: "Scored 85% in Physics Quiz", time: "Yesterday" },
    { id: 3, description: "Started Data Structures module", time: "2 days ago" },
  ];

  // Subject progress
  const subjectsProgress = [
    { name: "Mathematics", completed: 75, total: 100, color: "#1e3a8a" },
    { name: "Physics", completed: 45, total: 80, color: "#dc2626" },
    { name: "CSIT", completed: 30, total: 60, color: "#facc15" },
    { name: "English", completed: 20, total: 50, color: "#10b981" },
  ];

  // Weekly study hours (simple bar chart using CSS)
  const weeklyHours = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 2 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 3.5 },
  ];

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="dashboard-page">
      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="user-info">
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="avatar-placeholder">👤</span>
            )}
          </div>
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p className="user-level">{user.level}</p>
            <p className="current-date">{currentDate}</p>
          </div>
        </div>
        <div className="quote">
          <p>"The secret of getting ahead is getting started."</p>
          <span>– Mark Twain</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⏱️</span>
          <div>
            <h3>Total Hours</h3>
            <p className="stat-value">{stats.totalHours} <small>hrs</small></p>
            <small>This week</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <h3>Completed</h3>
            <p className="stat-value">{stats.completedTopics} <small>topics</small></p>
            <small>Out of 20</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div>
            <h3>Upcoming Exams</h3>
            <p className="stat-value">{stats.upcomingExams}</p>
            <small>Next in 5 days</small>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <h3>Study Streak</h3>
            <p className="stat-value">{stats.streak} <small>days</small></p>
            <small>Keep it up!</small>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-col">
          {/* Today's Focus */}
          <div className="card">
            <h3 className="card-title">🎯 Today's Focus</h3>
            <div className="focus-list">
              {todayFocus.map((item, idx) => (
                <div key={idx} className={`focus-item priority-${item.priority}`}>
                  <div>
                    <span className="focus-subject">{item.subject}</span>
                    <span className="focus-task">{item.task}</span>
                  </div>
                  <span className="focus-duration">{item.duration}</span>
                </div>
              ))}
            </div>
            <Link to="/planner" className="card-link">View full planner →</Link>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card">
            <h3 className="card-title">⏰ Upcoming Deadlines</h3>
            <div className="deadline-list">
              {deadlines.map((item, idx) => (
                <div key={idx} className="deadline-item">
                  <div>
                    <span className="deadline-subject">{item.subject}</span>
                    <span className="deadline-exam">{item.exam}</span>
                  </div>
                  <div className="deadline-info">
                    <span className="deadline-date">{item.date}</span>
                    <span className={`days-left ${item.daysLeft === 0 ? 'urgent' : ''}`}>
                      {item.daysLeft === 0 ? 'Today!' : `${item.daysLeft} days left`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-col">
          {/* Weekly Study Hours */}
          <div className="card">
            <h3 className="card-title">📊 Weekly Study Hours</h3>
            <div className="weekly-hours">
              {weeklyHours.map((item, idx) => (
                <div key={idx} className="bar-item">
                  <span className="bar-label">{item.day}</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(item.hours / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="bar-value">{item.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Progress */}
          <div className="card">
            <h3 className="card-title">📚 Subject Progress</h3>
            <div className="subject-progress">
              {subjectsProgress.map((subj, idx) => (
                <div key={idx} className="subject-item">
                  <div className="subject-header">
                    <span style={{ color: subj.color }}>●</span>
                    <span className="subject-name">{subj.name}</span>
                    <span className="subject-percent">
                      {Math.round((subj.completed / subj.total) * 100)}%
                    </span>
                  </div>
                  <div className="progress-bg">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(subj.completed / subj.total) * 100}%`,
                        backgroundColor: subj.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="card-title">🕒 Recent Activity</h3>
            <div className="activity-list">
              {activities.map((act) => (
                <div key={act.id} className="activity-item">
                  <span className="activity-time">{act.time}</span>
                  <span className="activity-desc">{act.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;