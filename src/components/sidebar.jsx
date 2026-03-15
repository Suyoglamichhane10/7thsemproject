import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCalendarAlt, FaChartBar, FaClock, FaSignOutAlt, FaChalkboardTeacher, FaUsers, FaUpload, FaCog, FaUserCog } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  if (!user) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Study<span>Nep</span></h2>
          <p>🇳🇵 Smart Study Planner</p>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-section">⚙️ Account</li>
          <li><Link to="/" className={isActive('/')}><FaSignOutAlt className="menu-icon" /><span>Logout</span></Link></li>
        </ul>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Study<span>Nep</span></h2>
        <p>🇳🇵 Smart Study Planner</p>
      </div>

      <ul className="sidebar-menu">
        {/* Student Section */}
        {user.role === 'student' && (
          <>
            <li className="sidebar-section">🎓 Student</li>
            <li><Link to="/dashboard" className={isActive('/dashboard')}><FaHome className="menu-icon" /><span>Dashboard</span></Link></li>
            <li><Link to="/planner" className={isActive('/planner')}><FaBook className="menu-icon" /><span>Study Planner</span></Link></li>
            <li><Link to="/schedule" className={isActive('/schedule')}><FaCalendarAlt className="menu-icon" /><span>Schedule</span></Link></li>
            <li><Link to="/progress" className={isActive('/progress')}><FaChartBar className="menu-icon" /><span>Progress</span></Link></li>
            <li><Link to="/focus" className={isActive('/focus')}><FaClock className="menu-icon" /><span>Focus Timer</span></Link></li>
          </>
        )}

        {/* Teacher Section */}
        {user.role === 'teacher' && (
          <>
            <li className="sidebar-section">👨‍🏫 Teacher</li>
            <li><Link to="/teacher/dashboard" className={isActive('/teacher/dashboard')}><FaChalkboardTeacher className="menu-icon" /><span>Teacher Dashboard</span></Link></li>
            <li><Link to="/teacher/materials" className={isActive('/teacher/materials')}><FaUpload className="menu-icon" /><span>Materials</span></Link></li>
            <li><Link to="/teacher/students" className={isActive('/teacher/students')}><FaUsers className="menu-icon" /><span>Students</span></Link></li>
          </>
        )}

        {/* Admin Section */}
        {user.role === 'admin' && (
          <>
            <li className="sidebar-section">👑 Admin</li>
            <li><Link to="/admin/dashboard" className={isActive('/admin/dashboard')}><FaCog className="menu-icon" /><span>Admin Dashboard</span></Link></li>
            <li><Link to="/admin/users" className={isActive('/admin/users')}><FaUserCog className="menu-icon" /><span>Manage Users</span></Link></li>
            <li><Link to="/admin/reports" className={isActive('/admin/reports')}><FaChartBar className="menu-icon" /><span>Reports</span></Link></li>
            {/* Add more admin links as needed */}
          </>
        )}

        {/* Common Account Section */}
        <li className="sidebar-section">⚙️ Account</li>
        <li><Link to="/" className={isActive('/')}><FaSignOutAlt className="menu-icon" /><span>Logout</span></Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;