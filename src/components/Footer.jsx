import React from 'react';
import { Link } from 'react-router-dom';
import { PlaySquare, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-logo" style={{ marginBottom: '24px' }}>
              <img src={logo} alt="ClubTyl Logo" className="logo-img" />
            </Link>
            <p className="footer-desc">
              Your one-stop fintech solution for mobile & DTH recharges, fastag, BBPS bill payments, insurance, HR, and accounting services.
            </p>
            <div className="social-links">
              <a href="https://youtube.com/@clubtylofficial9568?si=83SZ5v47jiAdQWuj" target="_blank" rel="noopener noreferrer" className="social-icon">
                <PlaySquare size={20} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/reports">Passbook & Reports</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#download">Download App</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <Phone size={18} />
                <span>+91 9039825246<br/>+91 7489252106 (WhatsApp)</span>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:clubtyl2022@gmail.com">clubtyl2022@gmail.com</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ClubTyl. A product of <strong>CTYL VENTURES PRIVATE LIMITED</strong>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
