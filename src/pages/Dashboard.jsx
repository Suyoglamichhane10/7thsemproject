import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubjects } from '../services/subjectService';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalHours: 0,
    completedTopics: 0,
    upcomingExams: 0,
    streak: 7,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubjects();
        const subjectsData = res.data;
        setSubjects(subjectsData);
        const totalHours = subjectsData.reduce((acc, sub) => acc + (sub.hoursPerDay || 0), 0);
        const completed = subjectsData.filter(s => s.completed).length;
        const upcoming = subjectsData.filter(s => !s.completed && new Date(s.examDate) > new Date()).length;
        setStats({ totalHours, completedTopics: completed, upcomingExams: upcoming, streak: 7 });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-alert">Error: {error}</div>;

  const activities = [
    { id: 1, description: 'Completed Mathematics Chapter 5', time: 'Today' },
    { id: 2, description: 'Scored 85% in Physics Quiz', time: 'Yesterday' },
  ];

  return (
    <div className="dashboard-page">
      <div className="welcome-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p className="user-level">{user.level}</p>
            <p className="current-date">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="quote">“The secret of getting ahead is getting started.”</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⏱️</span>
          <div>
            <h3>Total Hours</h3>
            <p className="stat-value">{stats.totalHours} <small>hrs</small></p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <h3>Completed</h3>
            <p className="stat-value">{stats.completedTopics} <small>topics</small></p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div>
            <h3>Upcoming Exams</h3>
            <p className="stat-value">{stats.upcomingExams}</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <h3>Study Streak</h3>
            <p className="stat-value">{stats.streak} <small>days</small></p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="left-col">
          <div className="card">
            <h3 className="card-title">🎯 Today's Focus</h3>
            <div className="focus-list">
              {subjects.filter(s => !s.completed).slice(0, 3).map(sub => (
                <div key={sub._id} className={`focus-item priority-${sub.priority?.toLowerCase()}`}>
                  <span className="focus-subject">{sub.name}</span>
                  <span className="focus-duration">{sub.hoursPerDay}h</span>
                </div>
              ))}
            </div>
            <Link to="/planner" className="card-link">View full planner →</Link>
          </div>
        {/* Upcoming Deadlines */}
<div className="card">
  <h3 className="card-title">⏰ Upcoming Deadlines</h3>
  <div className="deadline-list">
    {subjects
      // Only include future or today's exams
      .filter(s => !s.completed && s.examDate && new Date(s.examDate) >= new Date().setHours(0,0,0,0))
      // Sort by nearest date
      .sort((a, b) => new Date(a.examDate) - new Date(b.examDate))
      // Take first 3
      .slice(0, 3)
      .map(sub => {
        // Compare dates without time
        const today = new Date().setHours(0,0,0,0);
        const exam = new Date(sub.examDate).setHours(0,0,0,0);
        const daysLeft = Math.round((exam - today) / (1000 * 60 * 60 * 24));
        return (
          <div key={sub._id} className="deadline-item">
            <span className="deadline-subject">{sub.name}</span>
            <div className="deadline-info">
              <span className="deadline-date">{new Date(sub.examDate).toLocaleDateString()}</span>
              <span className={`days-left ${daysLeft <= 1 ? 'urgent' : ''}`}>
                {daysLeft === 0 ? 'Today!' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days left`}
              </span>
            </div>
          </div>
        );
      })}
    {/* Show a message if no deadlines */}
    {subjects.filter(s => !s.completed && s.examDate && new Date(s.examDate) >= new Date().setHours(0,0,0,0)).length === 0 && (
      <p className="no-deadlines">No upcoming deadlines</p>
    )}
  </div>
</div>
        </div>
        <div className="right-col">
          <div className="card">
            <h3 className="card-title">📚 Subject Progress</h3>
            <div className="subject-progress">
              {subjects.map(sub => (
                <div key={sub._id} className="subject-item">
                  <div className="subject-header">
                    <span className="subject-name">{sub.name}</span>
                    <span className="subject-percent">{sub.completed ? 100 : 0}%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{ width: sub.completed ? '100%' : '0%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">🕒 Recent Activity</h3>
            <div className="activity-list">
              {activities.map(act => (
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