import { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaClock, FaFlag, FaCheckCircle, FaRegCircle, 
  FaEdit, FaTrash, FaBrain, FaFire, FaStar, FaRocket,
  FaGraduationCap, FaBookOpen
} from 'react-icons/fa';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../services/subjectService';
import './Studyplanner.css';

function Studyplanner() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [recommendations, setRecommendations] = useState([]);
  
  const [newSubject, setNewSubject] = useState({
    name: '',
    examDate: '',
    priority: 'Medium',
    hoursPerDay: '',
    description: '',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      generateRecommendations();
    }
  }, [subjects]);

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

  const generateRecommendations = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const activeSubjects = subjects.filter(s => !s.completed);
    
    const sorted = [...activeSubjects].sort((a, b) => {
      const aDate = new Date(a.examDate).setHours(0, 0, 0, 0);
      const bDate = new Date(b.examDate).setHours(0, 0, 0, 0);
      const aDaysLeft = Math.ceil((aDate - today) / (1000 * 60 * 60 * 24));
      const bDaysLeft = Math.ceil((bDate - today) / (1000 * 60 * 60 * 24));
      
      const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const aScore = (priorityWeight[a.priority] || 1) * (aDaysLeft > 0 ? 10 / aDaysLeft : 10);
      const bScore = (priorityWeight[b.priority] || 1) * (bDaysLeft > 0 ? 10 / bDaysLeft : 10);
      
      return bScore - aScore;
    });
    
    setRecommendations(sorted.slice(0, 3));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.examDate || !newSubject.hoursPerDay) return;
    try {
      if (editingSubject) {
        const res = await updateSubject(editingSubject._id, {
          ...newSubject,
          hoursPerDay: parseFloat(newSubject.hoursPerDay),
        });
        setSubjects(subjects.map(sub => sub._id === editingSubject._id ? res.data : sub));
        setEditingSubject(null);
      } else {
        const res = await createSubject({
          ...newSubject,
          hoursPerDay: parseFloat(newSubject.hoursPerDay),
        });
        setSubjects([...subjects, res.data]);
      }
      setNewSubject({ name: '', examDate: '', priority: 'Medium', hoursPerDay: '', description: '' });
      setShowForm(false);
    } catch (err) {
      alert('Failed to save subject');
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const subject = subjects.find(s => s._id === id);
      await updateSubject(id, { ...subject, completed: !completed });
      setSubjects(subjects.map(sub =>
        sub._id === id ? { ...sub, completed: !completed } : sub
      ));
    } catch (err) {
      alert('Failed to update subject');
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setNewSubject({
      name: subject.name,
      examDate: subject.examDate ? subject.examDate.split('T')[0] : '',
      priority: subject.priority,
      hoursPerDay: subject.hoursPerDay || '',
      description: subject.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    try {
      await deleteSubject(id);
      setSubjects(subjects.filter(sub => sub._id !== id));
    } catch (err) {
      alert('Failed to delete subject');
    }
  };

  const getFilteredAndSortedSubjects = () => {
    let filtered = [...subjects];
    
    switch(filter) {
      case 'active':
        filtered = filtered.filter(s => !s.completed);
        break;
      case 'completed':
        filtered = filtered.filter(s => s.completed);
        break;
      case 'high':
        filtered = filtered.filter(s => s.priority === 'High' && !s.completed);
        break;
      default:
        break;
    }
    
    switch(sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
        break;
      case 'priority':
        const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
        filtered.sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const getDaysUntilExam = (examDate) => {
    if (!examDate) return null;
    const today = new Date().setHours(0, 0, 0, 0);
    const exam = new Date(examDate).setHours(0, 0, 0, 0);
    return Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
  };

  const filteredSubjects = getFilteredAndSortedSubjects();
  
  const totalHoursPerDay = subjects
    .filter(s => !s.completed)
    .reduce((acc, s) => acc + (s.hoursPerDay || 0), 0);

  const activeCount = subjects.filter(s => !s.completed).length;
  const completedCount = subjects.filter(s => s.completed).length;
  const highPriorityCount = subjects.filter(s => s.priority === 'High' && !s.completed).length;

  if (loading) return <div className="loading">Loading study planner...</div>;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="studyplanner-page">
      <div className="planner-header">
        <div className="header-left">
          <h1>Study Planner</h1>
          <p className="header-subtitle">Plan your success, one subject at a time</p>
        </div>
        <button className="add-subject-btn" onClick={() => setShowForm(!showForm)}>
          <span className="btn-icon">+</span> {showForm ? 'Cancel' : 'Add Subject'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="planner-stats">
        <div className="stat-card active">
          <div className="stat-icon"><FaBookOpen /></div>
          <div className="stat-content">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon"><FaGraduationCap /></div>
          <div className="stat-content">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card hours">
          <div className="stat-icon"><FaClock /></div>
          <div className="stat-content">
            <span className="stat-value">{totalHoursPerDay.toFixed(1)}h</span>
            <span className="stat-label">Daily</span>
          </div>
        </div>
        <div className="stat-card priority">
          <div className="stat-icon"><FaFire /></div>
          <div className="stat-content">
            <span className="stat-value">{highPriorityCount}</span>
            <span className="stat-label">High Priority</span>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <div className="recommendations-header">
            <FaBrain className="brain-icon" />
            <div>
              <h3>Today's Smart Recommendations</h3>
              <p>Based on your deadlines and priorities</p>
            </div>
          </div>
          <div className="recommendations-list">
            {recommendations.map((subject, index) => {
              const daysLeft = getDaysUntilExam(subject.examDate);
              const isUrgent = daysLeft !== null && daysLeft <= 3;
              return (
                <div key={subject._id} className="recommendation-item">
                  <div className="rec-rank">
                    <span className="rec-number">{index + 1}</span>
                    {index === 0 && <FaStar className="rec-star" />}
                  </div>
                  <div className="rec-info">
                    <span className="rec-subject">{subject.name}</span>
                    <span className={`rec-priority priority-${subject.priority.toLowerCase()}`}>
                      {subject.priority}
                    </span>
                  </div>
                  {isUrgent && (
                    <span className="rec-urgent">
                      <FaFire /> Urgent
                    </span>
                  )}
                  <span className="rec-days">
                    {daysLeft <= 0 ? 'Today!' : `${daysLeft} days`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingSubject ? '✏️ Edit Subject' : '➕ Add New Subject'}</h2>
            <form onSubmit={handleAddSubject}>
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
              <div className="form-row">
                <div className="form-group">
                  <label>Exam Date</label>
                  <input
                    type="date"
                    name="examDate"
                    value={newSubject.examDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hours/Day</label>
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
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select name="priority" value={newSubject.priority} onChange={handleInputChange}>
                  <option value="High">🔴 High</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  value={newSubject.description}
                  onChange={handleInputChange}
                  placeholder="Add notes about this subject..."
                  rows="2"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingSubject ? 'Update Subject' : 'Add Subject'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => {
                  setShowForm(false);
                  setEditingSubject(null);
                  setNewSubject({ name: '', examDate: '', priority: 'Medium', hoursPerDay: '', description: '' });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="planner-controls">
        <div className="control-group">
          <label>🔍 Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Subjects</option>
            <option value="active">📚 Active</option>
            <option value="completed">✅ Completed</option>
            <option value="high">🔥 High Priority</option>
          </select>
        </div>
        <div className="control-group">
          <label>📊 Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">📅 Exam Date</option>
            <option value="priority">⚡ Priority</option>
            <option value="name">📝 Name</option>
          </select>
        </div>
      </div>

      {/* Subjects List */}
      {filteredSubjects.length === 0 ? (
        <div className="no-data">
          <FaBookOpen className="no-data-icon" />
          <h3>No subjects found</h3>
          <p>Click the "Add Subject" button to start planning your studies</p>
        </div>
      ) : (
        <div className="subjects-list">
          {filteredSubjects.map(subject => {
            const daysLeft = getDaysUntilExam(subject.examDate);
            const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
            
            return (
              <div key={subject._id} className={`subject-card priority-${subject.priority.toLowerCase()}`}>
                <div className="subject-header">
                  <div className="subject-title">
                    <button 
                      onClick={() => handleToggleComplete(subject._id, subject.completed)}
                      className={`complete-btn ${subject.completed ? 'completed' : ''}`}
                    >
                      {subject.completed ? <FaCheckCircle /> : <FaRegCircle />}
                    </button>
                    <h3>{subject.name}</h3>
                  </div>
                  <span className={`priority-badge priority-${subject.priority.toLowerCase()}`}>
                    {subject.priority}
                  </span>
                </div>

                <div className="subject-body">
                  <div className="subject-meta">
                    <span className="meta-item">
                      <FaCalendarAlt /> {new Date(subject.examDate).toLocaleDateString()}
                    </span>
                    <span className="meta-item">
                      <FaClock /> {subject.hoursPerDay}h/day
                    </span>
                    {daysLeft !== null && (
                      <span className={`days-badge ${isUrgent ? 'urgent' : ''}`}>
                        {daysLeft <= 0 ? '📅 Today!' : `📅 ${daysLeft} days left`}
                      </span>
                    )}
                  </div>

                  {subject.description && (
                    <p className="subject-description">{subject.description}</p>
                  )}
                </div>

                <div className="subject-actions">
                  <button onClick={() => handleEdit(subject)} className="action-btn edit">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(subject._id)} className="action-btn delete">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Studyplanner;