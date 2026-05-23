import { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaFlag, FaBrain, FaFire, FaStar, FaChartLine, FaBookOpen } from 'react-icons/fa';
import { getSubjects } from '../services/subjectService';
import './Schedule.css';

function Schedule() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getSubjects();
        const subjectList = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setSubjects(subjectList);
      } catch (err) {
        console.error('Error loading schedule subjects:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load schedule data');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
    
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];

  // Calculate days left until exam
  const getDaysLeft = (examDate) => {
    if (!examDate) return null;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);
    const diffTime = exam - todayDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Check if exam is in the future
  const isUpcoming = (examDate) => {
    if (!examDate) return false;
    const daysLeft = getDaysLeft(examDate);
    return daysLeft >= 0;
  };

  // Generate schedule table based on exam dates and priorities
  const generateScheduleTable = () => {
    // Only include active subjects with FUTURE exam dates
    const activeSubjects = subjects.filter(s => !s.completed && isUpcoming(s.examDate));
    
    // Sort subjects by exam date (closer exams first)
    const sortedSubjects = [...activeSubjects].sort((a, b) => {
      const daysLeftA = getDaysLeft(a.examDate);
      const daysLeftB = getDaysLeft(b.examDate);
      
      // If days left are similar, sort by priority
      if (Math.abs(daysLeftA - daysLeftB) <= 3) {
        const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return daysLeftA - daysLeftB;
    });
    
    const table = {};
    
    // Initialize table structure
    weekDays.forEach(day => {
      table[day] = {};
      timeSlots.forEach(slot => {
        table[day][slot] = null;
      });
    });
    
    // Get the current day index for reference
    const todayIndex = weekDays.findIndex(day => day === today);
    
    // Assign subjects to days based on exam dates
    sortedSubjects.forEach((subject, idx) => {
      const daysLeft = getDaysLeft(subject.examDate);
      let dayIndex;
      
      // Assign day based on urgency (only future dates)
      if (daysLeft === 0) {
        dayIndex = todayIndex; // Today
      } else if (daysLeft === 1) {
        dayIndex = Math.min(todayIndex + 1, weekDays.length - 1); // Tomorrow
      } else if (daysLeft <= 3) {
        dayIndex = Math.min(todayIndex + 2, weekDays.length - 1); // Within 3 days
      } else if (daysLeft <= 5) {
        dayIndex = Math.min(todayIndex + 3, weekDays.length - 1);
      } else if (daysLeft <= 7) {
        dayIndex = Math.min(todayIndex + 4, weekDays.length - 1);
      } else {
        // For exams further away, distribute across remaining days
        dayIndex = Math.min(todayIndex + 5 + (idx % 2), weekDays.length - 1);
      }
      
      // Ensure dayIndex is within range and not in the past
      const finalDayIndex = Math.max(todayIndex, Math.min(dayIndex, weekDays.length - 1));
      const day = weekDays[finalDayIndex];
      
      // Find available time slot for this day
      let assigned = false;
      for (let timeIdx = 0; timeIdx < timeSlots.length; timeIdx++) {
        const timeSlot = timeSlots[timeIdx];
        if (table[day][timeSlot] === null) {
          table[day][timeSlot] = {
            subject: subject.name,
            duration: `${subject.hoursPerDay}h`,
            priority: subject.priority,
            examDate: subject.examDate ? new Date(subject.examDate).toLocaleDateString() : 'TBD',
            daysLeft: daysLeft,
            color: subject.priority === 'High' ? '#dc2626' : subject.priority === 'Medium' ? '#f59e0b' : '#10b981',
            bgColor: subject.priority === 'High' ? 'rgba(220,38,38,0.1)' : subject.priority === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)'
          };
          assigned = true;
          break;
        }
      }
      
      // If no slot available, try next day
      if (!assigned) {
        for (let offset = 1; offset < weekDays.length; offset++) {
          const nextDayIndex = (finalDayIndex + offset) % weekDays.length;
          const nextDay = weekDays[nextDayIndex];
          for (let timeIdx = 0; timeIdx < timeSlots.length; timeIdx++) {
            const timeSlot = timeSlots[timeIdx];
            if (table[nextDay][timeSlot] === null) {
              table[nextDay][timeSlot] = {
                subject: subject.name,
                duration: `${subject.hoursPerDay}h`,
                priority: subject.priority,
                examDate: subject.examDate ? new Date(subject.examDate).toLocaleDateString() : 'TBD',
                daysLeft: daysLeft,
                color: subject.priority === 'High' ? '#dc2626' : subject.priority === 'Medium' ? '#f59e0b' : '#10b981',
                bgColor: subject.priority === 'High' ? 'rgba(220,38,38,0.1)' : subject.priority === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)'
              };
              assigned = true;
              break;
            }
          }
          if (assigned) break;
        }
      }
    });
    
    return table;
  };

  const scheduleTable = generateScheduleTable();

  // Get overdue subjects (past exam dates)
  const overdueSubjects = subjects.filter(s => !s.completed && s.examDate && !isUpcoming(s.examDate));

  // Calculate days left display
  const getDaysLeftDisplay = (daysLeft) => {
    if (daysLeft === 0) return 'Today!';
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft < 0) return 'Overdue';
    return `${daysLeft} days`;
  };

  // Calculate weekly stats (only future subjects)
  const futureSubjects = subjects.filter(s => !s.completed && isUpcoming(s.examDate));
  const totalSessions = futureSubjects.length;
  const totalHours = futureSubjects.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);
  const highPriorityCount = futureSubjects.filter(s => s.priority === 'High').length;
  const completedCount = subjects.filter(s => s.completed).length;
  const completionRate = subjects.length ? Math.round((completedCount / subjects.length) * 100) : 0;
  const urgentCount = futureSubjects.filter(s => getDaysLeft(s.examDate) <= 3 && getDaysLeft(s.examDate) >= 0).length;

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return <span className="priority-badge-table high">🔴 High</span>;
      case 'Medium': return <span className="priority-badge-table medium">🟡 Medium</span>;
      case 'Low': return <span className="priority-badge-table low">🟢 Low</span>;
      default: return <span className="priority-badge-table medium">🟡 Medium</span>;
    }
  };

  if (loading) return <div className="loading"><div className="loading-spinner"></div>Loading schedule...</div>;

  if (error) return (
    <div className="schedule-page-table">
      <div className="table-header">
        <div className="header-title">
          <h1>📅 Weekly Study Schedule</h1>
          <p>{currentDate}</p>
        </div>
      </div>
      <div className="schedule-error-message">
        <div className="error-icon">⚠️</div>
        <div>
          <h3>Unable to load schedule</h3>
          <p>{error}</p>
          <p>Please make sure you are logged in and try again.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="schedule-page-table">
      {/* Header Section */}
      <div className="table-header">
        <div className="header-title">
          <h1>📅 Weekly Study Schedule</h1>
          <p>{currentDate}</p>
        </div>
        <div className="header-stats">
          <div className="stat-chip">
            <FaBookOpen /> {totalSessions} Sessions
          </div>
          <div className="stat-chip">
            <FaClock /> {totalHours}h Total
          </div>
          <div className="stat-chip">
            <FaFire /> {highPriorityCount} High Priority
          </div>
          {urgentCount > 0 && (
            <div className="stat-chip urgent">
              ⚠️ {urgentCount} Urgent
            </div>
          )}
          {overdueSubjects.length > 0 && (
            <div className="stat-chip overdue">
              📅 {overdueSubjects.length} Overdue
            </div>
          )}
          <div className="stat-chip">
            <FaChartLine /> {completionRate}% Complete
          </div>
        </div>
      </div>

      {/* Overdue Warning */}
      {overdueSubjects.length > 0 && (
        <div className="overdue-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <strong>Overdue Subjects:</strong> The following subjects have passed their exam dates without completion.
            <ul>
              {overdueSubjects.map(sub => (
                <li key={sub._id}>{sub.name} (Exam: {new Date(sub.examDate).toLocaleDateString()})</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* No Future Subjects Message */}
      {futureSubjects.length === 0 && overdueSubjects.length === 0 && (
        <div className="no-schedule-message">
          <div className="no-schedule-icon">📖</div>
          <h3>No Upcoming Exams</h3>
          <p>Add subjects with future exam dates to see your study schedule.</p>
        </div>
      )}

      {/* Main Schedule Table - Only show if there are future subjects */}
      {futureSubjects.length > 0 && (
        <>
          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th className="time-col">Time / Day</th>
                  {weekDays.map(day => (
                    <th key={day} className={`day-col ${day === today ? 'today-col' : ''}`}>
                      <div className="day-header-cell">
                        <span className="day-name">{day.slice(0, 3)}</span>
                        <span className="day-full">{day}</span>
                        {day === today && <span className="today-marker">Today</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td className="time-cell">
                      <div className="time-content">
                        <FaClock className="time-icon-table" />
                        <span>{timeSlot}</span>
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const session = scheduleTable[day][timeSlot];
                      const isUrgent = session && session.daysLeft !== undefined && session.daysLeft <= 3 && session.daysLeft >= 0;
                      return (
                        <td key={`${day}-${timeSlot}`} className="session-cell">
                          {session ? (
                            <div className={`session-card-table ${isUrgent ? 'urgent-session' : ''}`} 
                                 style={{ borderLeftColor: session.color, backgroundColor: session.bgColor }}>
                              <div className="session-subject-table">{session.subject}</div>
                              <div className="session-meta-table">
                                <span className="session-duration-table">{session.duration}</span>
                                {getPriorityBadge(session.priority)}
                              </div>
                              {session.daysLeft !== undefined && (
                                <div className="session-exam-info">
                                  <FaCalendarAlt className="exam-icon" />
                                  <span className={`exam-days ${isUrgent ? 'urgent-text' : ''}`}>
                                    {getDaysLeftDisplay(session.daysLeft)}
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="empty-session-cell">
                              <span className="dot-placeholder">•</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Weekly Summary Footer */}
          <div className="table-footer">
            <div className="summary-section">
              <h4>Weekly Study Distribution</h4>
              <div className="summary-bars">
                {weekDays.map(day => {
                  const daySessions = Object.values(scheduleTable[day]).filter(s => s !== null);
                  const hours = daySessions.reduce((acc, s) => acc + parseFloat(s.duration), 0);
                  const percentage = Math.min(100, (hours / 12) * 100);
                  return (
                    <div key={day} className="summary-bar-item">
                      <span className="summary-day-label">{day.slice(0, 3)}</span>
                      <div className="summary-bar-bg">
                        <div className="summary-bar-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="summary-hours-label">{hours}h</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="legend-section">
              <span className="legend-title">Priority Legend:</span>
              <span className="legend-item high">🔴 High Priority</span>
              <span className="legend-item medium">🟡 Medium Priority</span>
              <span className="legend-item low">🟢 Low Priority</span>
              <span className="legend-item urgent">⚠️ Urgent (≤3 days)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Schedule;