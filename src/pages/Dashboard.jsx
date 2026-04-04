import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubjects } from '../services/subjectService';
import { getDashboardStats, getRecentActivities } from '../services/progressService.js';
import DailyQuote from '../components/DailyQuote';
import AchievementBadges from '../components/AcheivementBadges';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsRes, statsRes, activitiesRes] = await Promise.all([
        getSubjects(),
        getDashboardStats(),
        getRecentActivities()
      ]);
      setSubjects(subjectsRes.data);
      setStats(statsRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  const upcomingDeadlines = subjects.filter(s => !s.completed && new Date(s.examDate) > new Date()).slice(0, 3);
  const totalHours = stats.totalHours || 0;
  const completedSubjects = stats.completedSubjects || 0;
  const streak = stats.streak || 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>Keep up the great work! 🔥</p>
        </div>
        <DailyQuote />
      </div>

      <div className="stats-grid">
        <div className="stat-card"><h3>Total Subjects</h3><p>{stats.totalSubjects || 0}</p></div>
        <div className="stat-card"><h3>Completed</h3><p>{completedSubjects}</p></div>
        <div className="stat-card"><h3>Study Hours</h3><p>{totalHours}h</p></div>
        <div className="stat-card"><h3>Study Streak</h3><p>{streak} days</p></div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>📚 Upcoming Deadlines</h3>
          {upcomingDeadlines.length === 0 ? (
            <p>No upcoming deadlines. Great job!</p>
          ) : (
            upcomingDeadlines.map(s => (
              <div key={s._id} className="deadline-item">
                <span>{s.name}</span>
                <span>{new Date(s.examDate).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h3>🕒 Recent Activity</h3>
          {activities.length === 0 ? (
            <p>No recent activity</p>
          ) : (
            activities.slice(0, 5).map(a => (
              <div key={a._id} className="activity-item">{a.description}</div>
            ))
          )}
        </div>
      </div>

      <AchievementBadges streak={streak} totalHours={totalHours} completedSubjects={completedSubjects} />
    </div>
  );
}

export default Dashboard;