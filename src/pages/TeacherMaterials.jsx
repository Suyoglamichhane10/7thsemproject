import { useState, useEffect } from 'react';
import { getMaterials, createMaterial, deleteMaterial } from '../services/materialService';
import './TeacherMaterials.css';

function TeacherMaterials() {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'PDF', subject: '', fileUrl: '' });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await getMaterials();
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await createMaterial(newMaterial);
      setNewMaterial({ title: '', type: 'PDF', subject: '', fileUrl: '' });
      setShowForm(false);
      fetchMaterials();
    } catch (err) {
      alert('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMaterial(id);
      fetchMaterials();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="teacher-materials">
      <h1>Study Materials</h1>
      <button className="upload-btn" onClick={() => setShowForm(!showForm)}>{showForm ? '− Cancel' : '+ Upload New Material'}</button>
      {showForm && (
        <form className="material-form" onSubmit={handleUpload}>
          <h3>Upload Material</h3>
          <div className="form-group"><label>Title</label><input type="text" value={newMaterial.title} onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })} required /></div>
          <div className="form-group"><label>Subject</label><input type="text" value={newMaterial.subject} onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })} required /></div>
          <div className="form-group"><label>Type</label><select value={newMaterial.type} onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}><option>PDF</option><option>Video</option><option>Link</option></select></div>
          <div className="form-group"><label>File URL</label><input type="url" value={newMaterial.fileUrl} onChange={(e) => setNewMaterial({ ...newMaterial, fileUrl: e.target.value })} required /></div>
          <button type="submit" className="submit-btn">Upload</button>
        </form>
      )}
      <div className="materials-list">
        <h2>Uploaded Materials</h2>
        <div className="material-grid">
          {materials.map(mat => (
            <div key={mat._id} className="material-card">
              <div className="material-icon">📄</div>
              <div className="material-info">
                <h3>{mat.title}</h3>
                <p>Subject: {mat.subject}</p>
                <p>Type: {mat.type}</p>
              </div>
              <div className="material-actions">
                <a href={mat.fileUrl} target="_blank" rel="noopener noreferrer" className="download-btn">⬇️ Download</a>
                <button onClick={() => handleDelete(mat._id)} className="delete-btn">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherMaterials;