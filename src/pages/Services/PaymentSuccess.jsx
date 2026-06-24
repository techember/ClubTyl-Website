import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, FileText } from 'lucide-react';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, message, amount, orderId, transactionId, operatorRefId, isGooglePlay } = location.state || {};

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-card">
        <div className="success-icon-container">
          <CheckCircle size={64} color="#00C853" className="success-check-icon" />
        </div>
        
        <h2 className="success-title">{title || 'Payment Successful!'}</h2>
        <p className="success-message">{message || 'Your request has been processed successfully.'}</p>
        
        <div className="success-details-box">
          {amount && (
            <div className="success-detail-row">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value amount-paid">₹{amount}</span>
            </div>
          )}
          {orderId && (
            <div className="success-detail-row">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{orderId}</span>
            </div>
          )}
          {transactionId && (
            <div className="success-detail-row">
              <span className="detail-label">Transaction ID</span>
              <span className="detail-value">{transactionId}</span>
            </div>
          )}
          {operatorRefId && (
            <div className="success-detail-row">
              <span className="detail-label">{isGooglePlay ? 'Redeem Code' : 'Operator Ref ID'}</span>
              <span className="detail-value" style={{ fontWeight: 'bold', color: isGooglePlay ? '#00C300' : '#111' }}>
                {operatorRefId}
              </span>
            </div>
          )}
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            <Home size={18} />
            Back to Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate('/reports')}>
            <FileText size={18} />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
