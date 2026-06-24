import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { getData } from '../../API';
import './Recharge.css';

export default function Recharge() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ServiceId } = location.state || {}; // Passed from dashboard

  const [mobile, setMobile] = useState('');
  const [lastRecharges, setLastRecharges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLastRecharge();
  }, []);

  const fetchLastRecharge = async () => {
    try {
      const res = await getData('api/cyrus/recharge_history');
      if (res?.Status && Array.isArray(res.Data)) {
        setLastRecharges(res.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProceed = async () => {
    if (!mobile || mobile.length < 10) {
      alert('Enter valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await getData(`/api/cyrus/operator_by_phone?phone=${mobile}`);
      if (response?.Status) {
        // Navigate to Plan Screen (to be created in Phase 3/4)
        navigate('/plan-selection', {
          state: {
            operatorDetail: response.Data,
            ServiceId,
            mobile
          }
        });
      } else {
        alert(response?.Remarks || 'Operator lookup failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching operator details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recharge-container">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span className="current">Mobile Recharge</span>
          </div>
        </div>
      </header>

      <div className="recharge-content">
        <div className="recharge-grid">
          {/* Input Form Column */}
          <div className="form-column">
            <div className="input-card">
              <h2>Enter Mobile Number</h2>
              <p className="subtitle">Enter your 10-digit prepaid mobile number</p>
              
              <div className="input-wrapper">
                <span className="prefix">+91</span>
                <input 
                  type="tel"
                  maxLength="10"
                  placeholder="e.g. 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              
              <button 
                className="proceed-btn" 
                onClick={handleProceed}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'PROCEED'}
              </button>
            </div>
          </div>

          {/* History Column */}
          <div className="history-column">
            {lastRecharges.length > 0 ? (
              <div className="history-section">
                <h3 className="history-title">Recent Recharges</h3>
                <p className="history-subtitle">Click to quick-recharge</p>
                <div className="history-list">
                  {lastRecharges.map((item, index) => (
                    <div 
                      key={index} 
                      className="history-item"
                      onClick={() => setMobile(item.number?.slice(-10))}
                    >
                      <div className="history-left">
                        <div className="history-icon">
                          <Clock size={18} color="#4A00E0" />
                        </div>
                        <div>
                          <p className="history-number">{item.number}</p>
                          <p className="history-date">{item.createdAt}</p>
                        </div>
                      </div>
                      <p className="history-amount">₹{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="history-empty">
                <p>No recent recharges found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
