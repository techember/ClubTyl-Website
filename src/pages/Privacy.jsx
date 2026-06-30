import React from 'react';

const Privacy = () => {
  return (
    <div className="page-wrapper legal-page">
      <div className="container">
        <div className="legal-header animate-fade-up">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="legal-content animate-fade-up delay-200">
          <h2>1. Information We Collect</h2>
          <p>We collect information to provide better services to our users. This includes:</p>
          <ul>
            <li>Personal information such as name, email address, and phone number.</li>
            <li>Transaction details when you use our platform for recharges or bill payments.</li>
            <li>Device information and usage data.</li>
          </ul>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Process your transactions securely.</li>
            <li>Calculate your commissions.</li>
            <li>Improve our app and website functionality.</li>
            <li>Communicate with you regarding updates, offers, and support.</li>
          </ul>
          
          <h2>3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>
          
          <h2>4. Contact Us</h2>
          <p>If you have any questions or concerns about our privacy practices, please contact us at clubtyl2022@gmail.com or via WhatsApp at 7489252106.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
