import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login not implemented in demo`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="login-logo">
            <h1>Study<span>Nep</span> 🇳🇵</h1>
          </Link>
          <h2>Welcome Back!</h2>
          <p>Log in to continue your study journey</p>
        </div>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <span className="checkmark"></span> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <div className="social-login">
          <p className="or-divider">Or continue with</p>
          <div className="social-buttons">
            <button onClick={() => handleSocialLogin('Google')} className="social-btn google-btn">
              <FcGoogle className="social-icon" /> Google
            </button>
            <button onClick={() => handleSocialLogin('Facebook')} className="social-btn facebook-btn">
              <FaFacebook className="social-icon" /> Facebook
            </button>
          </div>
        </div>
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;