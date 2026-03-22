import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Study <span>Smarter</span> with StudyNep 🇳🇵</h1>
          <p>Your complete study companion for +2 and Bachelor students in Nepal</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/resources" className="btn-secondary">Browse Resources</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose StudyNep?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Smart Study Planner</h3>
            <p>Create personalized study plans based on your syllabus and exam dates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Track your study hours, completed topics, and performance analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Focus Timer</h3>
            <p>Pomodoro technique with study reminders and break management</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Study Resources</h3>
            <p>Notes, past questions, and materials for all subjects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Teacher Guidance</h3>
            <p>Get study suggestions and feedback from experienced teachers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Performance Analysis</h3>
            <p>Weekly reports and smart suggestions to improve your study</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How StudyNep Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your free account</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Set Your Subjects</h3>
            <p>Add your courses and exam dates</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Study Plan</h3>
            <p>AI-powered personalized schedule</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Progress</h3>
            <p>Monitor your improvement</p>
          </div>
        </div>
      </section>

      {/* Quick Stats Section - NEW */}
      <section className="quick-stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3>5000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Study Resources</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Expert Teachers</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Subjects Covered</p>
          </div>
        </div>
      </section>

      {/* Popular Resources Preview - NEW */}
      <section className="popular-resources">
        <h2>Popular Resources</h2>
        <div className="resource-previews">
          <div className="resource-preview">
            <span className="resource-badge">🔥</span>
            <h4>+2 Science Notes</h4>
            <p>Physics, Chemistry, Biology</p>
            <Link to="/resources" className="resource-link">Browse →</Link>
          </div>
          <div className="resource-preview">
            <span className="resource-badge">📘</span>
            <h4>CSIT Materials</h4>
            <p>All semester notes</p>
            <Link to="/resources" className="resource-link">Browse →</Link>
          </div>
          <div className="resource-preview">
            <span className="resource-badge">📝</span>
            <h4>Past Questions</h4>
            <p>Previous year papers</p>
            <Link to="/resources" className="resource-link">Browse →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"StudyNep helped me organize my CSIT studies. The planner is amazing!"</p>
            <h4>- Ram Sharma, CSIT 5th Sem</h4>
          </div>
          <div className="testimonial-card">
            <p>"Finally a study tool made for Nepali students. Very useful for +2 preparation."</p>
            <h4>- Sita KC, +2 Science</h4>
          </div>
          <div className="testimonial-card">
            <p>"The focus timer and progress tracking keep me motivated daily."</p>
            <h4>- Binod Thapa, Bachelor 3rd Year</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to start your smart study journey?</h2>
          <p>Join thousands of Nepali students already using StudyNep</p>
          <Link to="/register" className="btn-primary btn-large">Create Free Account</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;