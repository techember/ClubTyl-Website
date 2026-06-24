import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="page-wrapper contact-page">
      <div className="container">
        <div className="contact-header animate-fade-up">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out to us for any queries or support.</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info-cards animate-fade-up delay-100">
            <div className="contact-card glass-card">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <h3>Call Us</h3>
              <p>+91 9039825246</p>
              <p>+91 7489252106 (WhatsApp)</p>
            </div>
            
            <div className="contact-card glass-card delay-200">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <h3>Email Us</h3>
              <p>clubtyl2022@gmail.com</p>
            </div>
            
            <div className="contact-card glass-card delay-300">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <h3>Visit Us</h3>
              <p>India</p>
            </div>
          </div>

          <div className="contact-form-wrapper glass-card animate-fade-up delay-400">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" rows="5" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 mt-4">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
