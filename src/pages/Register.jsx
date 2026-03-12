import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentLevel: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <Link to="/" className="register-logo">
            <h1>Study<span>Nep</span> 🇳🇵</h1>
          </Link>
          <h2>Create Account</h2>
          <p>Join thousands of Nepalese students</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Study Level</label>
            <select
              value={formData.studentLevel}
              onChange={(e) => setFormData({...formData, studentLevel: e.target.value})}
              required
            >
              <option value="">Select your level</option>
              <option value="plus2">+2</option>
              <option value="bachelor">Bachelor</option>
            </select>
          </div>

          <button type="submit" className="register-btn">Create Account</button>
        </form>

        <div className="social-register">
          <p className="or-divider">Or sign up with</p>
          <div className="social-buttons">
            <button className="social-btn google-btn">
              <FcGoogle className="social-icon" /> Google
            </button>
            <button className="social-btn facebook-btn">
              <FaFacebook className="social-icon" /> Facebook
            </button>
          </div>
        </div>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;