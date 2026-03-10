import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Study<span>Nep</span> 🇳🇵</h3>
          <p>Empowering Nepalese students with smart study planning and resources.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/planner">Study Planner</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Students</h4>
          <ul>
            <li><a href="/+2">+2 Resources</a></li>
            <li><a href="/bachelor">Bachelor Resources</a></li>
            <li><a href="/questions">Past Questions</a></li>
            <li><a href="/notes">Study Notes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@studynep.com</p>
          <p>📱 01-4xxxxxx</p>
          <p>📍 Kathmandu, Nepal</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 StudyNep. All rights reserved. 🇳🇵</p>
      </div>
    </footer>
  );
}

export default Footer;