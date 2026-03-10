import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Resources.css";

function Resources() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Study Resources</h1>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>📘 Mathematics</h3>
            <p>Notes, formulas, and practice questions</p>
            <button>View Resources</button>
          </div>
          <div className="resource-card">
            <h3>🔬 Physics</h3>
            <p>Numericals, theories, and past papers</p>
            <button>View Resources</button>
          </div>
          <div className="resource-card">
            <h3>🧪 Chemistry</h3>
            <p>Organic, Inorganic, and Physical chemistry</p>
            <button>View Resources</button>
          </div>
          <div className="resource-card">
            <h3>💻 Programming</h3>
            <p>Code examples, algorithms, and projects</p>
            <button>View Resources</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;