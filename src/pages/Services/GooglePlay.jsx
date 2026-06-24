import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, PlaySquare } from 'lucide-react';
import './Recharge.css'; // Reuse Recharge CSS for similar layout

export default function GooglePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ServiceId, name } = location.state || {};

  const userState = useSelector(state => state.user.user);
  const userData = userState?.Data || userState?.user || userState;
  const userMobile = userData?.phone || userData?.mobile || '';

  const [amount, setAmount] = useState('');

  const handleProceed = () => {
    if (!amount || Number(amount) <= 0) {
      alert('Enter a valid amount');
      return;
    }

    if (!userMobile || userMobile.length < 10) {
      alert('Your profile does not have a valid mobile number. Please update your profile first.');
      return;
    }

    navigate('/payment-confirmation', {
      state: {
        from: 'googleplay',
        operatorDetail: { name: 'Google Play', ServiceId, operator_name: 'Google Play' },
        rechargeData: { amount: amount, number: userMobile, rs: amount },
        isPrePaid: true // Skip bill fetch
      }
    });
  };

  return (
    <div className="recharge-container">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span className="current">Google Play Recharge</span>
          </div>
        </div>
      </header>

      <div className="recharge-content">
        <div className="form-column" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="input-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <PlaySquare size={32} color="#00C300" />
              <h2 style={{ margin: 0 }}>Google Play Recharge</h2>
            </div>
            <p className="subtitle">Buy Google Play Gift Code. We'll use your registered mobile number for delivery.</p>
            
            <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '15px', color: '#333' }}>Enter Amount</h3>
            <div className="input-wrapper">
              <span className="prefix">₹</span>
              <input 
                type="tel" 
                placeholder="e.g. 100" 
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <button 
              className="proceed-btn" 
              onClick={handleProceed}
              disabled={!amount}
              style={{ marginTop: '30px' }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
