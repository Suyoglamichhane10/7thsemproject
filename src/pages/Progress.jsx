import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";
import "./Progress.css";

function Progress() {
  // Mock data for demonstration
  const [weeklyData] = useState([
    { day: "Mon", hours: 2.5, completed: 1 },
    { day: "Tue", hours: 3, completed: 2 },
    { day: "Wed", hours: 1.5, completed: 1 },
    { day: "Thu", hours: 2, completed: 1 },
    { day: "Fri", hours: 2.5, completed: 2 },
    { day: "Sat", hours: 4, completed: 3 },
    { day: "Sun", hours: 3.5, completed: 2 },
  ]);

  const [subjectProgress] = useState([
    { name: "Mathematics", completed: 75, total: 100, color: "#1e3a8a" },
    { name: "Physics", completed: 60, total: 80, color: "#dc2626" },
    { name: "Computer Science", completed: 45, total: 60, color: "#facc15" },
    { name: "English", completed: 30, total: 50, color: "#10b981" },
  ]);

  const [timeDistribution] = useState([
    { name: "Mathematics", value: 18, color: "#1e3a8a" },
    { name: "Physics", value: 12, color: "#dc2626" },
    { name: "Computer Science", value: 15, color: "#facc15" },
    { name: "English", value: 8, color: "#10b981" },
    { name: "Break", value: 5, color: "#9ca3af" },
  ]);

  const [performanceTrend] = useState([
    { week: "W1", score: 65 },
    { week: "W2", score: 70 },
    { week: "W3", score: 68 },
    { week: "W4", score: 75 },
    { week: "W5", score: 80 },
    { week: "W6", score: 82 },
  ]);

  const [recentActivities] = useState([
    { id: 1, activity: "Completed Mathematics Chapter 5", time: "Today, 10:30 AM", type: "complete" },
    { id: 2, activity: "Physics Practice Test - 85%", time: "Yesterday, 3:15 PM", type: "quiz" },
    { id: 3, activity: "Programming Assignment Submitted", time: "Yesterday, 11:00 AM", type: "assignment" },
    { id: 4, activity: "Started New Topic: Data Structures", time: "2 days ago", type: "start" },
  ]);

  // Calculate summary stats
  const totalStudyHours = weeklyData.reduce((acc, day) => acc + day.hours, 0);
  const completedTopics = subjectProgress.reduce((acc, sub) => acc + sub.completed, 0);
  const totalTopics = subjectProgress.reduce((acc, sub) => acc + sub.total, 0);
  const avgScore = (performanceTrend[performanceTrend.length - 1].score); // latest week score
  const studyStreak = 7; // mock streak

  return (
    <div className="progress-page">
      <h1>Study Progress</h1>

      {/* Summary Cards */}
      <div className="progress-summary">
        <div className="summary-card">
          <h3>📚 Total Study Hours</h3>
          <p>{totalStudyHours} hrs</p>
          <small>This week</small>
        </div>
        <div className="summary-card">
          <h3>✅ Completed Topics</h3>
          <p>{completedTopics}/{totalTopics}</p>
          <small>{Math.round((completedTopics/totalTopics)*100)}% complete</small>
        </div>
        <div className="summary-card">
          <h3>📊 Average Score</h3>
          <p>{avgScore}%</p>
          <small>+5% from last week</small>
        </div>
        <div className="summary-card">
          <h3>🔥 Study Streak</h3>
          <p>{studyStreak} days</p>
          <small>Keep going!</small>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Weekly Study Hours Chart */}
        <div className="chart-card">
          <h3>Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#1e3a8a" name="Hours" />
              <Bar dataKey="completed" fill="#10b981" name="Topics Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend Chart */}
        <div className="chart-card">
          <h3>Performance Trend (Weekly Avg Score)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Progress Bars */}
        <div className="chart-card">
          <h3>Subject Progress</h3>
          <div className="subject-progress-list">
            {subjectProgress.map((sub, idx) => (
              <div key={idx} className="subject-progress-item">
                <div className="subject-info">
                  <span style={{ color: sub.color }}>●</span>
                  <span>{sub.name}</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(sub.completed/sub.total)*100}%`, backgroundColor: sub.color }}
                  ></div>
                </div>
                <span className="progress-percent">{Math.round((sub.completed/sub.total)*100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution Pie Chart */}
        <div className="chart-card">
          <h3>Time Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={timeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivities.map((act) => (
            <div key={act.id} className={`activity-item ${act.type}`}>
              <span className="activity-time">{act.time}</span>
              <span className="activity-desc">{act.activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;