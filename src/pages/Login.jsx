import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo, just navigate to dashboard
    // In real app, you'd validate credentials here
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login clicked");
    // For demo, navigate to dashboard
    navigate("/dashboard");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log("Facebook login clicked");
    // For demo, navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="login-logo">
            <h1>Study<span>Nep</span> 🇳🇵</h1>
          </Link>
          <h2>Welcome Back!</h2>
          <p>Login to continue your study journey</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="social-login">
          <p className="or-divider">Or continue with</p>
          
          <div className="social-buttons">
            <button 
              onClick={handleGoogleLogin} 
              className="social-btn google-btn"
            >
              <FcGoogle className="social-icon" />
              Google
            </button>
            
            <button 
              onClick={handleFacebookLogin} 
              className="social-btn facebook-btn"
            >
              <FaFacebook className="social-icon" />
              Facebook
            </button>
          </div>
        </div>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;