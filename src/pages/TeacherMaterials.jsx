import { useState } from "react";
import "./TeacherMaterials.css";

function TeacherMaterials() {
  const [materials, setMaterials] = useState([
    { id: 1, title: "Physics Chapter 1 Notes", type: "PDF", subject: "Physics", date: "2025-03-10" },
    { id: 2, title: "Mathematics Formula Sheet", type: "PDF", subject: "Mathematics", date: "2025-03-09" },
    { id: 3, title: "CSIT Past Questions", type: "PDF", subject: "CSIT", date: "2025-03-08" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "PDF",
    subject: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewMaterial({ ...newMaterial, file: files[0] });
    } else {
      setNewMaterial({ ...newMaterial, [name]: value });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const material = {
      id: Date.now(),
      title: newMaterial.title,
      type: newMaterial.type,
      subject: newMaterial.subject,
      date: new Date().toISOString().split('T')[0],
    };
    setMaterials([material, ...materials]);
    setNewMaterial({ title: "", type: "PDF", subject: "", file: null });
    setShowForm(false);
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="teacher-materials">
      <h1>Study Materials</h1>

      <button className="upload-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "− Cancel" : "+ Upload New Material"}
      </button>

      {showForm && (
        <form className="material-form" onSubmit={handleUpload}>
          <h3>Upload Material</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newMaterial.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select name="subject" value={newMaterial.subject} onChange={handleInputChange} required>
              <option value="">Select subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="CSIT">CSIT</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={newMaterial.type} onChange={handleInputChange}>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Link">Link</option>
            </select>
          </div>
          <div className="form-group">
            <label>File</label>
            <input type="file" name="file" onChange={handleInputChange} required />
          </div>
          <button type="submit" className="submit-btn">Upload</button>
        </form>
      )}

      <div className="materials-list">
        <h2>Uploaded Materials</h2>
        {materials.length === 0 ? (
          <p>No materials yet.</p>
        ) : (
          <div className="material-grid">
            {materials.map(mat => (
              <div key={mat.id} className="material-card">
                <div className="material-icon">📄</div>
                <div className="material-info">
                  <h3>{mat.title}</h3>
                  <p>Subject: {mat.subject}</p>
                  <p>Type: {mat.type}</p>
                  <p>Uploaded: {mat.date}</p>
                </div>
                <div className="material-actions">
                  <button className="download-btn">⬇️ Download</button>
                  <button className="delete-btn" onClick={() => deleteMaterial(mat.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherMaterials;