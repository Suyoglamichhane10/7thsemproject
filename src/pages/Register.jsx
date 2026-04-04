import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, level });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="register-logo"><h1>Study<span>Nep</span></h1></Link>
          <h2>Create Account</h2>
        </div>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-group"><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="form-group"><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <div className="form-group"><input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
          <div className="form-group">
            <select value={level} onChange={(e) => setLevel(e.target.value)} required>
              <option value="">Select Study Level</option>
              <option value="+2 Science">+2 Science</option>
              <option value="+2 Management">+2 Management</option>
              <option value="Bachelor CSIT">Bachelor CSIT</option>
              <option value="Bachelor Engineering">Bachelor Engineering</option>
            </select>
          </div>
          <button type="submit" className="register-btn" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
        </form>
        <p className="login-link">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default Register;