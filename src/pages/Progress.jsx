import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { getSubjects } from '../services/subjectService';
import { 
  getProgress, 
  getWeeklyStudyData, 
  getPerformanceData, 
  getActivities, 
  getStudyStreak 
} from '../services/progressService';
import './Progress.css';

function Progress() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressStats, setProgressStats] = useState(null);
  const [weeklyStudyData, setWeeklyStudyData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [studyStreak, setStudyStreak] = useState(0);

  // Colors for subjects
  const colorPalette = ['#1e3a8a', '#dc2626', '#facc15', '#10b981', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    fetchAllProgressData();
  }, []);

  const fetchAllProgressData = async () => {
    try {
      setLoading(true);
      
      // Fetch subjects data
      const subjectsRes = await getSubjects();
      const subjectsData = subjectsRes.data;
      setSubjects(subjectsData);
      
      // Fetch progress stats (optional - if endpoint exists)
      try {
        const progressRes = await getProgress();
        setProgressStats(progressRes.data);
      } catch (err) {
        console.log('Progress stats endpoint not available yet');
      }
      
      // Fetch weekly study hours
      try {
        const weeklyRes = await getWeeklyStudyData();
        setWeeklyStudyData(weeklyRes.data);
      } catch (err) {
        console.log('Weekly study data endpoint not available, using mock data');
        // Mock data if endpoint not available
        setWeeklyStudyData([
          { day: 'Mon', hours: 2.5 },
          { day: 'Tue', hours: 3 },
          { day: 'Wed', hours: 1.5 },
          { day: 'Thu', hours: 2 },
          { day: 'Fri', hours: 2.5 },
          { day: 'Sat', hours: 4 },
          { day: 'Sun', hours: 3.5 },
        ]);
      }
      
      // Fetch performance/quiz data
      try {
        const performanceRes = await getPerformanceData();
        setPerformanceData(performanceRes.data);
      } catch (err) {
        console.log('Performance data endpoint not available, using mock data');
        setPerformanceData([
          { week: 'W1', score: 65 },
          { week: 'W2', score: 70 },
          { week: 'W3', score: 68 },
          { week: 'W4', score: 75 },
          { week: 'W5', score: 80 },
          { week: 'W6', score: 82 },
        ]);
      }
      
      // Fetch recent activities
      try {
        const activitiesRes = await getActivities();
        setRecentActivities(activitiesRes.data);
      } catch (err) {
        console.log('Activities endpoint not available, using mock data');
        setRecentActivities([
          { id: 1, activity: 'Completed Mathematics Chapter 5', time: 'Today, 10:30 AM', type: 'complete' },
          { id: 2, activity: 'Physics Practice Test - 85%', time: 'Yesterday, 3:15 PM', type: 'quiz' },
        ]);
      }
      
      // Fetch study streak
      try {
        const streakRes = await getStudyStreak();
        setStudyStreak(streakRes.data.streak);
      } catch (err) {
        console.log('Streak endpoint not available, using mock data');
        setStudyStreak(7);
      }
      
    } catch (err) {
      console.error('Failed to load progress data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate subject progress from real subjects data
  const calculateSubjectProgress = () => {
    return subjects.map((subject, index) => ({
      name: subject.name,
      completed: subject.completed ? 1 : 0,
      total: 1,
      color: colorPalette[index % colorPalette.length],
      percentage: subject.completed ? 100 : 0
    }));
  };

  // Calculate time distribution from real subjects data
  const calculateTimeDistribution = () => {
    const distribution = subjects
      .filter(s => s.hoursPerDay > 0)
      .map((subject, index) => ({
        name: subject.name,
        value: subject.hoursPerDay || 0,
        color: colorPalette[index % colorPalette.length],
      }));
    
    return distribution;
  };

  // Calculate stats from subjects
  const calculateStats = () => {
    const totalHours = subjects.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);
    const completed = subjects.filter(s => s.completed).length;
    const total = subjects.length;
    
    return {
      totalStudyHours: totalHours,
      completedTopics: completed,
      totalTopics: total,
      completionPercentage: total ? Math.round((completed / total) * 100) : 0
    };
  };

  const stats = calculateStats();
  const subjectProgressList = calculateSubjectProgress();
  const timeDistribution = calculateTimeDistribution();

  // Calculate average score from performance data
  const avgScore = performanceData.length > 0 
    ? performanceData[performanceData.length - 1]?.score || 0 
    : 0;

  if (loading) return <div className="loading">Loading progress...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="progress-page">
      <h1>Study Progress</h1>

      {/* Summary Cards */}
      <div className="progress-summary">
        <div className="summary-card">
          <h3>📚 Total Study Hours</h3>
          <p>{stats.totalStudyHours} hrs</p>
          <small>This week</small>
        </div>
        <div className="summary-card">
          <h3>✅ Completed Topics</h3>
          <p>{stats.completedTopics}/{stats.totalTopics}</p>
          <small>{stats.completionPercentage}% complete</small>
        </div>
        <div className="summary-card">
          <h3>📊 Average Score</h3>
          <p>{avgScore}%</p>
          <small>Latest quiz score</small>
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
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#1e3a8a" name="Study Hours" />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">* Based on your study logs</p>
        </div>

        {/* Performance Trend */}
        <div className="chart-card">
          <h3>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} name="Quiz Score" />
            </LineChart>
          </ResponsiveContainer>
          <p className="chart-note">* Based on your quiz results</p>
        </div>

        {/* Subject Progress Bars */}
        <div className="chart-card">
          <h3>Subject Progress</h3>
          <div className="subject-progress-list">
            {subjectProgressList.length === 0 ? (
              <p className="no-data">No subjects added yet</p>
            ) : (
              subjectProgressList.map((sub, idx) => (
                <div key={idx} className="subject-progress-item">
                  <div className="subject-info">
                    <span style={{ color: sub.color }}>●</span>
                    <span>{sub.name}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${sub.percentage}%`,
                        backgroundColor: sub.color,
                      }}
                    ></div>
                  </div>
                  <span className="progress-percent">{sub.percentage}%</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Time Distribution Pie */}
        <div className="chart-card">
          <h3>Time Distribution</h3>
          {timeDistribution.length === 0 ? (
            <p className="no-data">No subjects with study hours</p>
          ) : (
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
                  label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                >
                  {timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <p className="chart-note">* Based on your planned study hours</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {recentActivities.length === 0 ? (
          <p className="no-activity">No recent activity. Start studying to see your progress!</p>
        ) : (
          <div className="activity-list">
            {recentActivities.map((act) => (
              <div key={act._id || act.id} className={`activity-item ${act.type || 'general'}`}>
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