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
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider) => {
    // Open a popup window for simulated OAuth
    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "",
      `${provider} Login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      // Write mock login page into the popup
      popup.document.write(`
        <html>
          <head>
            <title>${provider} Login</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              .container {
                text-align: center;
                background: rgba(255,255,255,0.2);
                padding: 2rem;
                border-radius: 10px;
                backdrop-filter: blur(10px);
              }
              button {
                background: #fff;
                color: #333;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
                margin-top: 1rem;
              }
              button:hover {
                background: #f0f0f0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>${provider} Login (Demo)</h2>
              <p>Click the button below to simulate successful login.</p>
              <button onclick="window.opener.postMessage('auth-success', '*'); window.close();">
                Simulate Success
              </button>
            </div>
          </body>
        </html>
      `);

      // Listen for message from the popup
      const messageHandler = (event) => {
        if (event.data === 'auth-success') {
          window.removeEventListener('message', messageHandler);
          popup.close();
          navigate('/dashboard');
        }
      };
      window.addEventListener('message', messageHandler);
    } else {
      alert('Popup blocked. Please allow popups for this site to use social login.');
    }
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

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="social-login">
          <p className="or-divider">Or continue with</p>
          <div className="social-buttons">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="social-btn google-btn"
            >
              <FcGoogle className="social-icon" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="social-btn facebook-btn"
            >
              <FaFacebook className="social-icon" />
              Facebook
            </button>
          </div>
        </div>

        <div className="signup-prompt">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; // ✅ Make sure this is present!