import { useState, useEffect } from 'react';
import { getSubjects } from '../services/subjectService';
import './Schedule.css';

function Schedule() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getSubjects();
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getScheduleForDay = (day) => {
    return subjects.filter(s => !s.completed).slice(0, 3).map((sub, idx) => ({
      time: `${8 + idx * 2}:00 - ${10 + idx * 2}:00`,
      subject: sub.name,
      duration: `${sub.hoursPerDay}h`,
      color: sub.priority === 'High' ? '#dc2626' : sub.priority === 'Medium' ? '#f59e0b' : '#10b981',
    }));
  };

  if (loading) return <div className="loading">Loading schedule...</div>;

  return (
    <div className="schedule-page">
      <h1>Weekly Study Schedule</h1>
      <div className="week-schedule">
        {weekDays.map(day => {
          const daySchedule = getScheduleForDay(day);
          return (
            <div key={day} className={`day-card ${day === today ? 'today' : ''}`}>
              <h3 className="day-header">{day}</h3>
              <div className="sessions">
                {daySchedule.length > 0 ? daySchedule.map((sess, idx) => (
                  <div key={idx} className="session-item" style={{ borderLeftColor: sess.color }}>
                    <span className="session-time">{sess.time}</span>
                    <span className="session-subject">{sess.subject}</span>
                    <span className="session-duration">{sess.duration}</span>
                  </div>
                )) : <p className="no-session">No study planned</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule;