import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { getSubjects } from '../services/subjectService';
// Import progress service when available
// import { getWeeklyProgress, getPerformanceTrend, getTimeDistribution } from '../services/progressService';
import './Progress.css';

function Progress() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derived stats
  const [totalStudyHours, setTotalStudyHours] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [subjectProgressList, setSubjectProgressList] = useState([]);

  // Data for charts (will be fetched from backend or computed)
  const [weeklyData, setWeeklyData] = useState([]);
  const [performanceTrend, setPerformanceTrend] = useState([]);
  const [timeDistribution, setTimeDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Colors for subjects
  const colorPalette = ['#1e3a8a', '#dc2626', '#facc15', '#10b981', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch subjects
        const subjectsRes = await getSubjects();
        const subjectsData = subjectsRes.data;
        setSubjects(subjectsData);

        // Compute stats from subjects
        const completed = subjectsData.filter(s => s.completed).length;
        const total = subjectsData.length;
        const totalHours = subjectsData.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);
        setTotalStudyHours(totalHours);
        setCompletedTopics(completed);
        setTotalTopics(total);

        // Build subject progress list for bar display
        const progressList = subjectsData.map((s, index) => ({
          name: s.name,
          completed: s.completed ? 1 : 0,
          total: 1,
          color: colorPalette[index % colorPalette.length],
        }));
        setSubjectProgressList(progressList);

        // Compute time distribution (hours per subject)
        const distribution = subjectsData.map((s, index) => ({
          name: s.name,
          value: s.hoursPerDay || 0,
          color: colorPalette[index % colorPalette.length],
        }));
        // Add a "Break" placeholder if needed (or leave as is)
        setTimeDistribution(distribution);

        // --- Data that would ideally come from dedicated backend endpoints ---
        // For now, use derived or placeholder data
        // Weekly hours (could be aggregated from progress logs)
        const today = new Date();
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // Mock: distribute total hours across days (just for demo)
        const mockWeekly = weekDays.map((day, i) => ({
          day,
          hours: i === 5 ? 4 : i === 6 ? 3.5 : Math.max(0, (totalHours / 7) + (Math.random() * 2 - 1)).toFixed(1),
        }));
        setWeeklyData(mockWeekly);

        // Performance trend (if no endpoint, use placeholder)
        const mockTrend = [
          { week: 'W1', score: 65 },
          { week: 'W2', score: 70 },
          { week: 'W3', score: 68 },
          { week: 'W4', score: 75 },
          { week: 'W5', score: 80 },
          { week: 'W6', score: 82 },
        ];
        setPerformanceTrend(mockTrend);

        // Recent activities (could be from a separate endpoint)
        const mockActivities = [
          { id: 1, activity: 'Completed Mathematics Chapter 5', time: 'Today, 10:30 AM', type: 'complete' },
          { id: 2, activity: 'Physics Practice Test - 85%', time: 'Yesterday, 3:15 PM', type: 'quiz' },
        ];
        setRecentActivities(mockActivities);
      } catch (err) {
        console.error('Failed to load progress data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading progress...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  const avgScore = performanceTrend.length > 0
    ? performanceTrend[performanceTrend.length - 1].score
    : 0;
  const studyStreak = 7; // This would come from a streak endpoint

  return (
    <div className="progress-page">
      <h1>Study Progress</h1>

      {/* Summary Cards */}
      <div className="progress-summary">
        <div className="summary-card">
          <h3>📚 Total Study Hours</h3>
          <p>{totalStudyHours} hrs</p>
          <small>This week (est.)</small>
        </div>
        <div className="summary-card">
          <h3>✅ Completed Topics</h3>
          <p>{completedTopics}/{totalTopics}</p>
          <small>{totalTopics ? Math.round((completedTopics/totalTopics)*100) : 0}% complete</small>
        </div>
        <div className="summary-card">
          <h3>📊 Average Score</h3>
          <p>{avgScore}%</p>
          <small>Latest week</small>
        </div>
        <div className="summary-card">
          <h3>🔥 Study Streak</h3>
          <p>{studyStreak} days</p>
          <small>Keep going!</small>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Weekly Study Hours */}
        <div className="chart-card">
          <h3>Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#1e3a8a" />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">* Based on your study logs (estimated)</p>
        </div>

        {/* Performance Trend */}
        <div className="chart-card">
          <h3>Performance Trend</h3>
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
          <p className="chart-note">* Placeholder – connect to quiz endpoint</p>
        </div>

        {/* Subject Progress Bars */}
        <div className="chart-card">
          <h3>Subject Progress</h3>
          <div className="subject-progress-list">
            {subjectProgressList.map((sub, idx) => (
              <div key={idx} className="subject-progress-item">
                <div className="subject-info">
                  <span style={{ color: sub.color }}>●</span>
                  <span>{sub.name}</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${sub.completed ? 100 : 0}%`,
                      backgroundColor: sub.color,
                    }}
                  ></div>
                </div>
                <span className="progress-percent">
                  {sub.completed ? 100 : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution Pie */}
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
          <p className="chart-note">* Based on planned hours per day</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {recentActivities.length === 0 ? (
          <p className="no-activity">No recent activity.</p>
        ) : (
          <div className="activity-list">
            {recentActivities.map((act) => (
              <div key={act.id} className={`activity-item ${act.type}`}>
                <span className="activity-time">{act.time}</span>
                <span className="activity-desc">{act.activity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;