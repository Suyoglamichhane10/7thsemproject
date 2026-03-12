import { useState } from "react";
import { Link } from "react-router-dom";
import "./TeacherDashboard.css";

function TeacherDashboard() {
  const [stats] = useState({
    totalStudents: 45,
    activeMaterials: 23,
    pendingFeedback: 8,
    averagePerformance: 78,
  });

  const [recentActivity] = useState([
    { id: 1, student: "Ram Sharma", activity: "Completed Physics quiz", time: "5 min ago" },
    { id: 2, student: "Sita KC", activity: "Submitted assignment", time: "1 hour ago" },
    { id: 3, student: "Binod Thapa", activity: "Requested feedback", time: "3 hours ago" },
  ]);

  const [studentPerformance] = useState([
    { name: "Ram Sharma", subject: "Mathematics", score: 85 },
    { name: "Sita KC", subject: "Physics", score: 78 },
    { name: "Binod Thapa", subject: "CSIT", score: 92 },
    { name: "Gita Rai", subject: "Chemistry", score: 68 },
  ]);

  return (
    <div className="teacher-dashboard">
      <h1>Teacher Dashboard</h1>

      {/* Stats Cards */}
      <div className="teacher-stats">
        <div className="stat-card">
          <h3>👥 Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>📚 Materials</h3>
          <p>{stats.activeMaterials}</p>
        </div>
        <div className="stat-card">
          <h3>💬 Pending Feedback</h3>
          <p>{stats.pendingFeedback}</p>
        </div>
        <div className="stat-card">
          <h3>📊 Avg. Performance</h3>
          <p>{stats.averagePerformance}%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/teacher/materials" className="action-btn">➕ Upload Material</Link>
          <Link to="/teacher/students" className="action-btn">👥 View Students</Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map(act => (
            <div key={act.id} className="activity-item">
              <span className="student-name">{act.student}</span>
              <span className="activity-desc">{act.activity}</span>
              <span className="activity-time">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="performance-table">
        <h2>Student Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {studentPerformance.map((student, idx) => (
              <tr key={idx}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td className={student.score >= 80 ? "high-score" : student.score >= 60 ? "medium-score" : "low-score"}>
                  {student.score}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherDashboard;