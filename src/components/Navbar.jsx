import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <h1>Study<span>Nep</span></h1>
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/resources">Resources</Link></li>
        </ul>
        <div className="nav-buttons">
          {/* <button className="theme-toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button> */}
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;