import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <h1>Study<span>Nep</span> 🇳🇵</h1>
          </Link>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/planner">Planner</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;