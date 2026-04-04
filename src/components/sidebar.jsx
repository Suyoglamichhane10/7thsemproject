import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaBook, FaCalendarAlt, FaChartBar, FaClock, 
  FaSignOutAlt, FaBrain, FaPlus, FaList, FaChalkboardTeacher, 
  FaUsers, FaUpload, FaCog, FaUserCog 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Study<span>Nep</span></h2>
        <p>🇳🇵 Smart Study Planner</p>
      </div>

      <ul className="sidebar-menu">
        {/* ===== STUDENT SECTION ===== */}
        {user.role === 'student' && (
          <>
            <li className="sidebar-section">🎓 Student</li>
            <li><Link to="/dashboard" className={isActive('/dashboard')}><FaHome /> Dashboard</Link></li>
            <li><Link to="/planner" className={isActive('/planner')}><FaBook /> Study Planner</Link></li>
            <li><Link to="/schedule" className={isActive('/schedule')}><FaCalendarAlt /> Schedule</Link></li>
            <li><Link to="/progress" className={isActive('/progress')}><FaChartBar /> Progress</Link></li>
            <li><Link to="/focus" className={isActive('/focus')}><FaClock /> Focus Timer</Link></li>
            <li><Link to="/quiz" className={isActive('/quiz')}><FaBrain /> Take Quiz</Link></li>
          </>
        )}

        {/* ===== TEACHER SECTION (Only for teachers, NOT for admin) ===== */}
        {user.role === 'teacher' && (
          <>
            <li className="sidebar-section">👨‍🏫 Teacher</li>
            <li><Link to="/teacher/dashboard" className={isActive('/teacher/dashboard')}><FaChalkboardTeacher /> Teacher Dashboard</Link></li>
            <li><Link to="/teacher/materials" className={isActive('/teacher/materials')}><FaUpload /> Materials</Link></li>
            <li><Link to="/teacher/students" className={isActive('/teacher/students')}><FaUsers /> Students</Link></li>
            <li className="sidebar-section">📝 Quiz Management</li>
            <li><Link to="/create-quiz" className={isActive('/create-quiz')}><FaPlus /> Create Quiz</Link></li>
            <li><Link to="/teacher/quizzes" className={isActive('/teacher/quizzes')}><FaList /> My Quizzes</Link></li>
          </>
        )}

        {/* ===== ADMIN SECTION (Only for admin) ===== */}
        {user.role === 'admin' && (
          <>
            <li className="sidebar-section">👑 Admin</li>
            <li><Link to="/admin/dashboard" className={isActive('/admin/dashboard')}><FaCog /> Admin Dashboard</Link></li>
            <li><Link to="/admin/users" className={isActive('/admin/users')}><FaUserCog /> Manage Users</Link></li>
            <li><Link to="/admin/reports" className={isActive('/admin/reports')}><FaChartBar /> Reports</Link></li>
          </>
        )}

        {/* Logout */}
        <li className="logout"><a href="#" onClick={handleLogout}><FaSignOutAlt /> Logout</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;