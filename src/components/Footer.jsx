import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  // Get the current website URL (for development, use window.location.origin)
  // For production, you can replace with your actual domain
  const websiteUrl = window.location.origin;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Study<span>Nep</span> </h3>
          <p>Smart Study Planner for Nepalese Students</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/planner">Planner</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@studynep.com</p>
          <p>📱 +977-98xxxxxxxx</p>
          <p>📍 Chitwan, Nepal</p>
        </div>

        {/* QR Code Section - Using free API */}
        <div className="footer-section qr-section">
          <h4>Scan to Share</h4>
          <div className="qr-code">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(websiteUrl)}`}
              alt="QR Code to share StudyNep"
              width="100"
              height="100"
            />
          </div>
          <p className="qr-text">Scan with your phone to open StudyNep</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 StudyNep</p>
      </div>
    </footer>
  );
}

export default Footer;