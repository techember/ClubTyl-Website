import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getData, postData } from '../../API';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider, ServiceId, name } = location.state || {};

  const [connNo, setConnNo] = useState('');
  const [lastRecharges, setLastRecharges] = useState([]);

  useEffect(() => {
    fetchLastRecharge();
  }, []);

  const fetchLastRecharge = async () => {
    try {
      const res = await getData(`api/cyrus/last-recharge?type=BBPS&subType=${name}`);
      if (res?.Status && Array.isArray(res.Data)) {
        setLastRecharges(res.Data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetchBill = () => {
    if (!connNo) {
      alert(`Please enter a valid ${provider?.displayname || 'Consumer ID'}`);
      return;
    }
    
    // Validate Regex
    if (provider?.regex) {
      const pattern = new RegExp(provider.regex);
      if (!pattern.test(connNo)) {
        alert(`Invalid format for ${provider?.displayname}`);
        return;
      }
    }

    // Go to Bill Fetch / Confirmation
    navigate('/payment-confirmation', {
      state: {
        operatorDetail: { ...provider, ServiceId, UniqueId: connNo },
        isPrePaid: false
      }
    });
  };

  return (
    <div className="bbps-payment-container">
      {/* Header */}
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span>Bill Payment</span> <span className="separator">/</span> <span className="current">{provider?.operator_name || 'Provider'}</span>
          </div>
        </div>
      </header>

      <div className="bbps-content">
        <div className="bbps-grid">
          {/* Input Form Column */}
          <div className="form-column">
            <div className="input-card">
              <h2>Fetch Bill</h2>
              <p className="subtitle">Enter details to fetch your current bill</p>
              
              <div className="input-section">
                <label className="bbps-label">{provider?.displayname || 'Consumer ID'}</label>
                <div className="input-wrapper">
                  <input 
                    type="text"
                    placeholder="e.g. CX09AB1234"
                    value={connNo}
                    onChange={(e) => setConnNo(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <button className="proceed-btn" onClick={handleFetchBill}>
                FETCH BILL
              </button>
            </div>
          </div>

          {/* History Column */}
          <div className="history-column">
            {lastRecharges.length > 0 ? (
              <div className="history-section">
                <h3 className="history-title">Recent Bill Payments</h3>
                <p className="history-subtitle">Tap to reuse Consumer ID</p>
                <div className="history-list">
                  {lastRecharges.map((item, index) => (
                    <div 
                      key={index} 
                      className="history-item"
                      onClick={() => setConnNo(item.number)}
                    >
                      <div className="history-left">
                        <div className="history-icon">
                          <span style={{ fontWeight: 'bold', color: '#4A00E0' }}>#</span>
                        </div>
                        <div>
                          <p className="history-number">{item.number}</p>
                          <p className="history-date">{item.createdAt?.slice(0, 10)}</p>
                        </div>
                      </div>
                      <p className="history-amount">₹{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="history-empty">
                <p>No recent bill payments found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
