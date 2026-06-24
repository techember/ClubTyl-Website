import React from 'react';

const Terms = () => {
  return (
    <div className="page-wrapper legal-page">
      <div className="container">
        <div className="legal-header animate-fade-up">
          <h1>Terms & Conditions</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="legal-content animate-fade-up delay-200">
          <h2>1. Introduction</h2>
          <p>Welcome to ClubTyl. By accessing our app and website, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
          
          <h2>2. Services Provided</h2>
          <p>ClubTyl provides a platform for mobile and DTH recharges, BBPS bill payments, Fastag recharge, insurance, HR, and accounting services. The availability of services may vary.</p>
          
          <h2>3. Retailer Shares and Commissions</h2>
          <p>Retailers using our platform to process transactions may be eligible for company shares and commissions. The distribution of shares and commission rates are at the sole discretion of ClubTyl and may be subject to change.</p>
          
          <h2>4. User Responsibilities</h2>
          <p>You agree to provide accurate information when registering and using our services. You are responsible for maintaining the confidentiality of your account credentials.</p>
          
          <h2>5. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at clubtyl2022@gmail.com.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
