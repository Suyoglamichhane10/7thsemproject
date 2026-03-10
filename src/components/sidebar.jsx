import { Link } from "react-router-dom";
import { FaHome, FaBook, FaClock, FaChartBar } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>StudyNep 🇳🇵</h2>

      <ul>
        <li><Link to="/dashboard"><FaHome /> Dashboard</Link></li>
        <li><Link to="/planner"><FaBook /> Study Planner</Link></li>
        <li><Link to="/schedule"><FaClock /> Schedule</Link></li>
        <li><Link to="/progress"><FaChartBar /> Progress</Link></li>
        <li><Link to="/focus">⏳ Focus Timer</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;