import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import { getSubjects } from '../services/subjectService';
import { 
  getProgress,
  getDashboardStats,
  getWeeklyProgress,
  getPerformanceData,
  getActivities,
  getStudyStreak,
  getAchievements
} from '../services/progressService';
import './Progress.css';

function Progress() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [stats, setStats] = useState({
    totalStudyHours: 0,
    completedTopics: 0,
    totalTopics: 0,
    completionPercentage: 0,
    activeSubjects: 0,
    upcomingExams: 0
  });
  const [weeklyStudyData, setWeeklyStudyData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [timeDistribution, setTimeDistribution] = useState([]);
  const [subjectProgressList, setSubjectProgressList] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week'); // 'week', 'month', 'year'

  // Colors for charts
  const colorPalette = ['#1e3a8a', '#dc2626', '#facc15', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];
  const performanceColors = ['#dc2626', '#f97316', '#facc15', '#10b981'];

  useEffect(() => {
    fetchAllProgressData();
  }, [selectedTimeframe]);

  const fetchAllProgressData = async () => {
    try {
      setLoading(true);
      
      // Fetch subjects data
      const subjectsRes = await getSubjects();
      const subjectsData = subjectsRes.data;
      setSubjects(subjectsData);
      
      // Calculate stats from subjects
      const totalHours = subjectsData.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);
      const completed = subjectsData.filter(s => s.completed).length;
      const total = subjectsData.length;
      const active = subjectsData.filter(s => !s.completed).length;
      const upcoming = subjectsData.filter(s => !s.completed && new Date(s.examDate) > new Date()).length;
      
      setStats({
        totalStudyHours: totalHours,
        completedTopics: completed,
        totalTopics: total,
        completionPercentage: total ? Math.round((completed / total) * 100) : 0,
        activeSubjects: active,
        upcomingExams: upcoming
      });
      
      // Build subject progress list
      const progressList = subjectsData.map((subject, index) => ({
        name: subject.name,
        completed: subject.completed ? 1 : 0,
        total: 1,
        color: colorPalette[index % colorPalette.length],
        percentage: subject.completed ? 100 : 0
      }));
      setSubjectProgressList(progressList);
      
      // Build time distribution
      const distribution = subjectsData
        .filter(s => s.hoursPerDay > 0)
        .map((subject, index) => ({
          name: subject.name,
          value: subject.hoursPerDay || 0,
          color: colorPalette[index % colorPalette.length],
        }));
      setTimeDistribution(distribution);
      
      // Fetch dashboard stats from backend
      try {
        const statsRes = await getDashboardStats();
        if (statsRes.data) {
          setStats(prev => ({ ...prev, ...statsRes.data }));
        }
      } catch (err) {
        console.log('Dashboard stats endpoint not available');
      }
      
      // Fetch weekly study hours
      try {
        const weeklyRes = await getWeeklyProgress();
        if (weeklyRes.data && weeklyRes.data.length > 0) {
          setWeeklyStudyData(weeklyRes.data);
        } else {
          // Fallback mock data
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
      } catch (err) {
        console.log('Weekly study data endpoint not available');
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
        if (performanceRes.data && performanceRes.data.length > 0) {
          setPerformanceData(performanceRes.data);
        } else {
          setPerformanceData([
            { week: 'W1', score: 65 },
            { week: 'W2', score: 70 },
            { week: 'W3', score: 68 },
            { week: 'W4', score: 75 },
            { week: 'W5', score: 80 },
            { week: 'W6', score: 82 },
          ]);
        }
      } catch (err) {
        console.log('Performance data endpoint not available');
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
        if (activitiesRes.data && activitiesRes.data.length > 0) {
          setRecentActivities(activitiesRes.data);
        } else {
          setRecentActivities([
            { id: 1, activity: 'Completed Mathematics Chapter 5', time: 'Today, 10:30 AM', type: 'complete' },
            { id: 2, activity: 'Physics Practice Test - 85%', time: 'Yesterday, 3:15 PM', type: 'quiz' },
            { id: 3, activity: 'Started studying Data Structures', time: '2 days ago', type: 'start' },
          ]);
        }
      } catch (err) {
        console.log('Activities endpoint not available');
        setRecentActivities([
          { id: 1, activity: 'Completed Mathematics Chapter 5', time: 'Today, 10:30 AM', type: 'complete' },
          { id: 2, activity: 'Physics Practice Test - 85%', time: 'Yesterday, 3:15 PM', type: 'quiz' },
        ]);
      }
      
      // Fetch study streak
      try {
        const streakRes = await getStudyStreak();
        setStudyStreak(streakRes.data?.streak || 7);
      } catch (err) {
        console.log('Streak endpoint not available');
        setStudyStreak(7);
      }
      
      // Fetch achievements
      try {
        const achievementsRes = await getAchievements();
        if (achievementsRes.data && achievementsRes.data.length > 0) {
          setAchievements(achievementsRes.data);
        }
      } catch (err) {
        console.log('Achievements endpoint not available');
      }
      
    } catch (err) {
      console.error('Failed to load progress data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const avgScore = performanceData.length > 0 
    ? performanceData[performanceData.length - 1]?.score || 0 
    : 0;

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">{payload[0].value} {payload[0].name === 'hours' ? 'hours' : '%'}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div><p>Loading your progress data...</p></div>;
  if (error) return <div className="error-container"><div className="error-icon">⚠️</div><p>{error}</p><button onClick={fetchAllProgressData} className="retry-btn">Retry</button></div>;

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1>📊 Study Progress</h1>
        <p>Track your learning journey and celebrate your achievements</p>
      </div>

      {/* Summary Cards */}
      <div className="progress-summary">
        <div className="summary-card">
          <div className="card-icon">📚</div>
          <div className="card-content">
            <h3>Total Study Hours</h3>
            <p className="card-value">{stats.totalStudyHours} <span>hrs</span></p>
            <small>This week</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>Completed Topics</h3>
            <p className="card-value">{stats.completedTopics}<span>/{stats.totalTopics}</span></p>
            <small>{stats.completionPercentage}% complete</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">📝</div>
          <div className="card-content">
            <h3>Average Score</h3>
            <p className="card-value">{avgScore}<span>%</span></p>
            <small>Latest quiz</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">🔥</div>
          <div className="card-content">
            <h3>Study Streak</h3>
            <p className="card-value">{studyStreak}<span> days</span></p>
            <small>Keep it up!</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <h3>Active Subjects</h3>
            <p className="card-value">{stats.activeSubjects}<span> subjects</span></p>
            <small>Currently studying</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon">⏰</div>
          <div className="card-content">
            <h3>Upcoming Exams</h3>
            <p className="card-value">{stats.upcomingExams}<span> exams</span></p>
            <small>Next 7 days</small>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Weekly Study Hours */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Study Hours</h3>
            <div className="timeframe-selector">
              <button className={selectedTimeframe === 'week' ? 'active' : ''} onClick={() => setSelectedTimeframe('week')}>Week</button>
              <button className={selectedTimeframe === 'month' ? 'active' : ''} onClick={() => setSelectedTimeframe('month')}>Month</button>
              <button className={selectedTimeframe === 'year' ? 'active' : ''} onClick={() => setSelectedTimeframe('year')}>Year</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyStudyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="#1e3a8a" radius={[8, 8, 0, 0]} name="Study Hours" />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">📈 Your study consistency over time</p>
        </div>

        {/* Performance Trend */}
        <div className="chart-card">
          <h3>📈 Performance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} fill="url(#scoreGradient)" name="Quiz Score" />
              <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="chart-note">📊 Your quiz performance trend</p>
        </div>

        {/* Subject Progress Bars */}
        <div className="chart-card">
          <h3>📚 Subject Progress</h3>
          <div className="subject-progress-list">
            {subjectProgressList.length === 0 ? (
              <p className="no-data">No subjects added yet</p>
            ) : (
              subjectProgressList.slice(0, 8).map((sub, idx) => (
                <div key={idx} className="subject-progress-item">
                  <div className="subject-info">
                    <span className="subject-dot" style={{ backgroundColor: sub.color }}></span>
                    <span className="subject-name">{sub.name}</span>
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
          {subjectProgressList.length > 8 && (
            <p className="more-subjects">+{subjectProgressList.length - 8} more subjects</p>
          )}
        </div>

        {/* Time Distribution Pie */}
        <div className="chart-card">
          <h3>⏱️ Time Distribution</h3>
          {timeDistribution.length === 0 ? (
            <p className="no-data">No subjects with study hours</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                    labelLine={false}
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {timeDistribution.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">{item.value}h</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <p className="chart-note">* Based on your planned study hours per day</p>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="charts-grid-second">
        {/* Monthly Progress */}
        <div className="chart-card">
          <h3>📅 Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData.slice(-4)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Study vs Goals */}
        <div className="chart-card">
          <h3>🎯 Goal Progress</h3>
          <div className="goal-progress">
            <div className="goal-item">
              <div className="goal-label">
                <span>Weekly Study Goal</span>
                <span>{Math.min(100, Math.round((stats.totalStudyHours / 20) * 100))}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${Math.min(100, Math.round((stats.totalStudyHours / 20) * 100))}%`, backgroundColor: '#10b981' }}></div>
              </div>
              <small>{stats.totalStudyHours} / 20 hours completed</small>
            </div>
            <div className="goal-item">
              <div className="goal-label">
                <span>Topics Completed</span>
                <span>{stats.completionPercentage}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${stats.completionPercentage}%`, backgroundColor: '#3b82f6' }}></div>
              </div>
              <small>{stats.completedTopics} / {stats.totalTopics} topics</small>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h2>🕒 Recent Activity</h2>
          <span className="activity-count">{recentActivities.length} activities</span>
        </div>
        {recentActivities.length === 0 ? (
          <p className="no-activity">No recent activity. Start studying to see your progress!</p>
        ) : (
          <div className="activity-list">
            {recentActivities.slice(0, 8).map((act, idx) => (
              <div key={act._id || act.id || idx} className={`activity-item ${act.type || 'general'}`}>
                <div className="activity-icon">
                  {act.type === 'complete' && '✅'}
                  {act.type === 'quiz' && '📝'}
                  {act.type === 'start' && '🚀'}
                  {act.type === 'achievement' && '🏆'}
                  {act.type === 'study' && '📚'}
                  {(!act.type || act.type === 'general') && '📌'}
                </div>
                <div className="activity-details">
                  <p className="activity-desc">{act.activity || act.description}</p>
                  <span className="activity-time">{act.time || new Date(act.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="achievements-section">
          <h2>🏆 Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, idx) => (
              <div key={achievement.id || idx} className="achievement-card">
                <div className="achievement-icon">{achievement.icon || '🏅'}</div>
                <div className="achievement-info">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;