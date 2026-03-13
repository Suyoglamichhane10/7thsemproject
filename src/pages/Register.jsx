import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    level: '',
    role: 'student',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.level) newErrors.level = 'Please select your level';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        level: formData.level,
        role: formData.role,
      });
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleSocialSignUp = (provider) => {
    alert(`${provider} sign-up not implemented in demo`);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="register-logo">
            <h1>Study<span>Nep</span> 🇳🇵</h1>
          </Link>
          <h2>Create Account</h2>
          <p>Join thousands of Nepalese students</p>
        </div>
        {apiError && <div className="error-alert">{apiError}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <label>Study Level</label>
            <select name="level" value={formData.level} onChange={handleChange} className={errors.level ? 'error' : ''}>
              <option value="">Select your level</option>
              <option value="+2 Science">+2 Science</option>
              <option value="+2 Management">+2 Management</option>
              <option value="Bachelor CSIT">Bachelor CSIT</option>
              <option value="Bachelor Engineering">Bachelor Engineering</option>
              <option value="Other">Other</option>
            </select>
            {errors.level && <span className="error-message">{errors.level}</span>}
          </div>
          <button type="submit" className="register-btn">Sign Up</button>
        </form>
        <div className="social-register">
          <p className="or-divider">Or sign up with</p>
          <div className="social-buttons">
            <button onClick={() => handleSocialSignUp('Google')} className="social-btn google-btn">
              <FcGoogle className="social-icon" /> Google
            </button>
            <button onClick={() => handleSocialSignUp('Facebook')} className="social-btn facebook-btn">
              <FaFacebook className="social-icon" /> Facebook
            </button>
          </div>
        </div>
        <div className="login-prompt">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;