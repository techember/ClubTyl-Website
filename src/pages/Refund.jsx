import React from 'react';

const Refund = () => {
  return (
    <div className="page-wrapper legal-page">
      <div className="container">
        <div className="legal-header animate-fade-up">
          <h1>Refund & Cancellation Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="legal-content animate-fade-up delay-200">
          <h2>1. Recharges and Bill Payments</h2>
          <p>All mobile/DTH recharges and bill payments made through the ClubTyl app are final and generally non-refundable. Please ensure that the details entered are correct before proceeding with the payment.</p>
          
          <h2>2. Failed Transactions</h2>
          <p>If a transaction fails but the amount is deducted from your account, the amount will be automatically refunded to your original payment method within 5-7 business days.</p>
          
          <h2>3. Discrepancies</h2>
          <p>In case of any discrepancy or unauthorized transaction, please reach out to our support team immediately.</p>
          
          <h2>4. Contact for Refunds</h2>
          <p>For any refund-related queries, please contact our support team:</p>
          <ul>
            <li>Phone: +91 9039825246</li>
            <li>WhatsApp: +91 7489252106</li>
            <li>Email: clubtyl2022@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Refund;
