import { useState } from "react";
import "./Studyplanner.css";

function Studyplanner() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", examDate: "2025-05-15", priority: "High", hoursPerDay: 2, completed: false },
    { id: 2, name: "Physics", examDate: "2025-05-20", priority: "Medium", hoursPerDay: 1.5, completed: false },
    { id: 3, name: "Computer Science", examDate: "2025-05-10", priority: "High", hoursPerDay: 2.5, completed: false },
    { id: 4, name: "English", examDate: "2025-05-25", priority: "Low", hoursPerDay: 1, completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    examDate: "",
    priority: "Medium",
    hoursPerDay: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.examDate || !newSubject.hoursPerDay) return;
    const subject = {
      id: Date.now(),
      ...newSubject,
      hoursPerDay: parseFloat(newSubject.hoursPerDay),
      completed: false,
    };
    setSubjects([...subjects, subject]);
    setNewSubject({ name: "", examDate: "", priority: "Medium", hoursPerDay: "" });
    setShowForm(false);
  };

  const toggleComplete = (id) => {
    setSubjects(subjects.map(sub =>
      sub.id === id ? { ...sub, completed: !sub.completed } : sub
    ));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  // Sort subjects by exam date (closer first)
  const sortedSubjects = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

  // Calculate total study hours per day (sum of all active subjects)
  const totalHoursPerDay = subjects.reduce((acc, sub) => acc + (sub.completed ? 0 : sub.hoursPerDay), 0);

  // Get today's date for comparison
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="studyplanner-page">
      <h1>Study Planner</h1>

      {/* Summary Cards */}
      <div className="planner-summary">
        <div className="summary-card">
          <h3>📚 Active Subjects</h3>
          <p>{subjects.filter(s => !s.completed).length}</p>
        </div>
        <div className="summary-card">
          <h3>⏰ Total Study / Day</h3>
          <p>{totalHoursPerDay} hrs</p>
        </div>
        <div className="summary-card">
          <h3>🎯 Next Exam</h3>
          <p>{sortedSubjects.length > 0 ? sortedSubjects[0].name : "None"}</p>
          <small>{sortedSubjects.length > 0 ? sortedSubjects[0].examDate : ""}</small>
        </div>
        <div className="summary-card">
          <h3>✅ Completed</h3>
          <p>{subjects.filter(s => s.completed).length}/{subjects.length}</p>
        </div>
      </div>

      {/* Today's Focus (adaptive schedule simulation) */}
      {sortedSubjects.length > 0 && (
        <div className="today-focus">
          <h2>🎯 Today's Focus</h2>
          <div className="focus-items">
            {sortedSubjects.slice(0, 3).map(sub => (
              <div key={sub.id} className={`focus-item priority-${sub.priority.toLowerCase()}`}>
                <span className="subject-name">{sub.name}</span>
                <span className="subject-hours">{sub.hoursPerDay} hrs</span>
                {sub.examDate === today && <span className="urgent-badge">Today!</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Subject Button */}
      <button className="add-subject-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "− Cancel" : "+ Add Subject"}
      </button>

      {/* Add Subject Form */}
      {showForm && (
        <form className="subject-form" onSubmit={addSubject}>
          <h3>Add New Subject</h3>
          <div className="form-group">
            <label>Subject Name</label>
            <input
              type="text"
              name="name"
              value={newSubject.name}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics"
              required
            />
          </div>
          <div className="form-group">
            <label>Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={newSubject.examDate}
              onChange={handleInputChange}
              min={today}
              required
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={newSubject.priority} onChange={handleInputChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hours per Day</label>
            <input
              type="number"
              name="hoursPerDay"
              value={newSubject.hoursPerDay}
              onChange={handleInputChange}
              step="0.5"
              min="0.5"
              placeholder="e.g., 2"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add to Plan</button>
        </form>
      )}

      {/* Subject List */}
      <div className="subject-list">
        <h2>Your Study Plan</h2>
        {sortedSubjects.length === 0 ? (
          <p className="no-data">No subjects added yet. Click "+ Add Subject" to start planning.</p>
        ) : (
          <div className="subject-cards">
            {sortedSubjects.map(sub => (
              <div key={sub.id} className={`subject-card ${sub.completed ? 'completed' : ''}`}>
                <div className="subject-header">
                  <h3>{sub.name}</h3>
                  <span className={`priority-badge ${sub.priority.toLowerCase()}`}>{sub.priority}</span>
                </div>
                <div className="subject-details">
                  <p><strong>Exam:</strong> {new Date(sub.examDate).toLocaleDateString()}</p>
                  <p><strong>Daily:</strong> {sub.hoursPerDay} hours</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: sub.completed ? '100%' : '0%' }}></div>
                  </div>
                </div>
                <div className="subject-actions">
                  <button onClick={() => toggleComplete(sub.id)} className="complete-btn">
                    {sub.completed ? 'Undo' : 'Mark Complete'}
                  </button>
                  <button onClick={() => deleteSubject(sub.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Studyplanner;