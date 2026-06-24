import React from 'react';

const FAQ = () => {
  return (
    <div className="page-wrapper legal-page">
      <div className="container">
        <div className="legal-header animate-fade-up">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about ClubTYL</p>
        </div>
        <div className="legal-content animate-fade-up delay-200">
          <h2>1. What is ClubTYL?</h2>
          <p>ClubTYL is a comprehensive digital payments platform that allows you to pay utility bills, recharge mobile/DTH, and access various financial services while earning cashback and commissions.</p>
          
          <h2>2. How do I add money to my wallet?</h2>
          <p>You can add money to your wallet instantly using UPI, Debit/Credit Cards, or Net Banking from the 'Add Money' section in your Wallet dashboard.</p>

          <h2>3. Is it safe to transact on ClubTYL?</h2>
          <p>Yes! We use bank-grade encryption and partner with RBI-approved payment gateways to ensure that your money and personal information are 100% secure.</p>
          
          <h2>4. How does the Refer & Earn program work?</h2>
          <p>You can share your unique referral code with friends. When they sign up and make their first transaction, both you and your friend receive exclusive cashback rewards directly into your wallets.</p>

          <h2>5. What should I do if my recharge fails but money is deducted?</h2>
          <p>If a transaction fails, the deducted amount is automatically refunded to your ClubTYL wallet or source account within 24-48 working hours. You can also contact our 24/7 support for immediate assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
