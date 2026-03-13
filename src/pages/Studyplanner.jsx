import { useState, useEffect } from 'react';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../services/subjectService';
import './Studyplanner.css';

function Studyplanner() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', examDate: '', priority: 'Medium', hoursPerDay: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.examDate || !newSubject.hoursPerDay) return;
    try {
      const res = await createSubject({ ...newSubject, hoursPerDay: parseFloat(newSubject.hoursPerDay) });
      setSubjects([...subjects, res.data]);
      setNewSubject({ name: '', examDate: '', priority: 'Medium', hoursPerDay: '' });
      setShowForm(false);
    } catch (err) {
      alert('Failed to add subject');
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateSubject(id, { completed: !completed });
      setSubjects(subjects.map(sub => sub._id === id ? { ...sub, completed: !completed } : sub));
    } catch (err) {
      alert('Failed to update subject');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteSubject(id);
      setSubjects(subjects.filter(sub => sub._id !== id));
    } catch (err) {
      alert('Failed to delete subject');
    }
  };

  const sortedSubjects = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
  const activeSubjects = sortedSubjects.filter(s => !s.completed);
  const totalHoursPerDay = activeSubjects.reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="studyplanner-page">
      <h1>Study Planner</h1>
      <div className="planner-summary">
        <div className="summary-card"><h3>📚 Active Subjects</h3><p>{activeSubjects.length}</p></div>
        <div className="summary-card"><h3>⏰ Total Study / Day</h3><p>{totalHoursPerDay} hrs</p></div>
        <div className="summary-card"><h3>🎯 Next Exam</h3><p>{activeSubjects[0]?.name || 'None'}</p></div>
        <div className="summary-card"><h3>✅ Completed</h3><p>{subjects.filter(s => s.completed).length}/{subjects.length}</p></div>
      </div>
      <button className="add-subject-btn" onClick={() => setShowForm(!showForm)}>{showForm ? '− Cancel' : '+ Add Subject'}</button>
      {showForm && (
        <form className="subject-form" onSubmit={handleAddSubject}>
          <h3>Add New Subject</h3>
          <div className="form-group"><label>Subject Name</label><input type="text" name="name" value={newSubject.name} onChange={handleInputChange} required /></div>
          <div className="form-group"><label>Exam Date</label><input type="date" name="examDate" value={newSubject.examDate} onChange={handleInputChange} required /></div>
          <div className="form-group"><label>Priority</label><select name="priority" value={newSubject.priority} onChange={handleInputChange}><option>High</option><option>Medium</option><option>Low</option></select></div>
          <div className="form-group"><label>Hours per Day</label><input type="number" name="hoursPerDay" value={newSubject.hoursPerDay} onChange={handleInputChange} step="0.5" required /></div>
          <button type="submit" className="submit-btn">Add to Plan</button>
        </form>
      )}
      <div className="subject-list">
        <h2>Your Study Plan</h2>
        <div className="subject-cards">
          {sortedSubjects.map(sub => (
            <div key={sub._id} className={`subject-card ${sub.completed ? 'completed' : ''}`}>
              <div className="subject-header"><h3>{sub.name}</h3><span className={`priority-badge ${sub.priority?.toLowerCase()}`}>{sub.priority}</span></div>
              <div className="subject-details">
                <p><strong>Exam:</strong> {new Date(sub.examDate).toLocaleDateString()}</p>
                <p><strong>Daily:</strong> {sub.hoursPerDay} hours</p>
                <div className="progress-bar"><div className="progress-fill" style={{ width: sub.completed ? '100%' : '0%' }}></div></div>
              </div>
              <div className="subject-actions">
                <button onClick={() => handleToggleComplete(sub._id, sub.completed)} className="complete-btn">{sub.completed ? 'Undo' : 'Mark Complete'}</button>
                <button onClick={() => handleDelete(sub._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Studyplanner;