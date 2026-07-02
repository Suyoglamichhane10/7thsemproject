import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
// Import your image from assets folder
import navIcon from '../assets/l.png';

function Navbar() {
  const { user, logout } = useAuth();

  const commonLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/resources' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const studentLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    // { label: 'Planner', path: '/planner' },
    // { label: 'Schedule', path: '/schedule' },
    // { label: 'Progress', path: '/progress' },
    // { label: 'Materials', path: '/student/materials' },
  ];

  const teacherLinks = [
    { label: 'Teacher Hub', path: '/teacher/dashboard' },
    { label: 'Students', path: '/teacher/students' },
    { label: 'Materials', path: '/teacher/materials' },
    { label: 'Quizzes', path: '/teacher/quizzes' },
  ];

  const adminLinks = [
    { label: 'Admin', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Reports', path: '/admin/reports' },
  ];

  const navLinks = user
    ? [
        ...commonLinks,
        ...(user.role === 'student' ? studentLinks : []),
        ...(user.role === 'teacher' ? teacherLinks : []),
        ...(user.role === 'admin' ? adminLinks : []),
      ]
    : commonLinks;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-content">
              <h1 className="brand-text">Study<span>Nep</span></h1>
              <img src={navIcon} alt="StudyNep Logo" className="nav-icon" />
            </div>
          </Link>
        </div>
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-buttons">
          {user ? (
            <>
              <Link to="/profile" className="btn-login">Profile</Link>
              <button className="btn-register" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;