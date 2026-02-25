import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleGoogle = () => {
    window.open("https://accounts.google.com/", "_blank");
  };

  const handleFacebook = () => {
    window.open("https://www.facebook.com/login", "_blank");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        <h1 className="brand">Study<span>Nep</span></h1>

        {!isSignup ? (
          <>
            <h2>Login to your account</h2>

            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />

              <div className="options">
                {/* <label>
                  <input type="checkbox" /> Remember me
                </label> */}
                <p>Forgot password?</p>
              </div>

              <button type="submit" className="primary-btn">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <button className="social-btn" onClick={handleGoogle}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="google"
              />
              Continue with Google
            </button>

            <button className="social-btn facebook" onClick={handleFacebook}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                alt="facebook"
              />
              Continue with Facebook
            </button>

            <p className="switch">
              Don’t have an account?{" "}
              <span onClick={() => setIsSignup(true)}>Create Account</span>
            </p>
          </>
        ) : (
          <>
            <h2>Create Student Account</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />

              <select required>
                <option value="">Select Level</option>
                <option>+2</option>
                <option>Bachelor</option>
              </select>

              <select required>
                <option value="">Select Faculty</option>
                <option>BSc CSIT</option>
                <option>BCA</option>
                <option>BBS</option>
                <option>Bio Science</option>
                <option>Management</option>
                <option>Computer science</option>
              </select>

              <input type="text" placeholder="Enter Subjects (e.g. DAA, Web Tech)" required />

              <input type="password" placeholder="Create Password" required />
              <input type="password" placeholder="Confirm Password" required />

              <button type="submit" className="primary-btn">
                Sign Up
              </button>
            </form>

            <p className="switch">
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;