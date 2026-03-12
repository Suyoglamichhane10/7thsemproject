import { useState } from "react";
import "./TeacherStudents.css";

function TeacherStudents() {
  const [students] = useState([
    { id: 1, name: "Ram Sharma", level: "Bachelor CSIT", email: "ram@example.com", progress: 78, lastActive: "Today" },
    { id: 2, name: "Sita KC", level: "+2 Science", email: "sita@example.com", progress: 85, lastActive: "Yesterday" },
    { id: 3, name: "Binod Thapa", level: "Bachelor CSIT", email: "binod@example.com", progress: 92, lastActive: "2 days ago" },
    { id: 4, name: "Gita Rai", level: "+2 Management", email: "gita@example.com", progress: 62, lastActive: "Today" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState("");

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const sendFeedback = () => {
    if (selectedStudent && feedback) {
      alert(`Feedback sent to ${selectedStudent.name}: ${feedback}`);
      setFeedback("");
      setSelectedStudent(null);
    }
  };

  return (
    <div className="teacher-students">
      <h1>Students</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="students-container">
        <div className="students-list">
          <h2>All Students ({filteredStudents.length})</h2>
          {filteredStudents.map(student => (
            <div 
              key={student.id} 
              className={`student-card ${selectedStudent?.id === student.id ? 'selected' : ''}`}
              onClick={() => setSelectedStudent(student)}
            >
              <div className="student-avatar">👤</div>
              <div className="student-details">
                <h3>{student.name}</h3>
                <p>{student.level}</p>
                <p>{student.email}</p>
                <span className="last-active">Last active: {student.lastActive}</span>
              </div>
              <div className="student-progress">
                <div className="progress-circle" style={{ 
                  background: `conic-gradient(#1e3a8a ${student.progress * 3.6}deg, #e5e7eb 0deg)` 
                }}>
                  <span>{student.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedStudent && (
          <div className="feedback-panel">
            <h2>Feedback for {selectedStudent.name}</h2>
            <div className="feedback-form">
              <textarea
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
              />
              <button onClick={sendFeedback} className="send-feedback-btn">Send Feedback</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherStudents;