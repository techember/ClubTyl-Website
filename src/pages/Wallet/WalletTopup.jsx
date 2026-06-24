import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getData, postData } from '../../API';
import { ArrowLeft, Clock } from 'lucide-react';
import './WalletTopup.css';

export default function WalletTopup() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userData = user?.Data || user?.user || user;
  
  const [amount, setAmount] = useState('50');
  const [wallet, setWallet] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(false);

  const quickAmounts = ['50', '100', '200', '500', '1000'];

  useEffect(() => {
    fetchWallet();
    fetchLedger();
  }, [userData]);

  const fetchWallet = async () => {
    try {
      const res = await getData('api/wallet/info');
      if (res?.Status || res?.success) {
        setWallet(res?.Data || res?.data);
      }
    } catch (error) {
      console.error('Wallet fetch error:', error);
    }
  };

  const fetchLedger = async () => {
    if (!userData?._id) return;
    try {
      const res = await getData(`api/txn/list/${userData._id}`);
      if (res?.Data) {
        setLedger(res.Data.slice(0, 5)); // show latest 5
      }
    } catch (error) {
      console.error('Ledger fetch error:', error);
    }
  };

  const generateOrderId = () => {
    return 'ORDUPI_' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleContinue = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const orderId = generateOrderId();
      const body = {
        amount: Number(amount),
        orderId,
        redirectUrl: window.location.origin + '/payment-receipt',
        note: 'Add money to wallet using Web PG',
      };

      const res = await postData('api/payment/upi/create-order', body);
      if (res?.Data?.payment_url) {
        window.location.href = res.Data.payment_url;
      } else {
        alert('Payment link not found!');
      }
    } catch (err) {
      console.error(err);
      alert('Unable to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-container">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span className="current">Wallet Topup</span>
          </div>
        </div>
      </header>

      <div className="wallet-content">
        <div className="wallet-grid">
          {/* Topup Form Column */}
          <div className="form-column">
            <div className="wallet-card-web">
              <div className="wallet-balance-section">
                {wallet?.balance < 500 && <span className="low-balance-tag">Low Balance</span>}
                <p className="balance-label">Current Balance</p>
                <h2 className={wallet?.balance < 500 ? 'balance-red' : 'balance-normal'}>
                  ₹ {wallet?.balance !== undefined ? wallet.balance : '0.00'}
                </h2>
              </div>

              <div className="wallet-input-section">
                <label className="topup-label">Enter Amount to Topup</label>
                <div className="amount-input-wrapper">
                  <span className="rupee-symbol">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="quick-amounts-web">
                {quickAmounts.map(amt => (
                  <button 
                    key={amt} 
                    className={`quick-btn-web ${amount === amt ? 'active' : ''}`}
                    onClick={() => setAmount(amt)}
                  >
                    + ₹{amt}
                  </button>
                ))}
              </div>

              <button className="proceed-btn mt-4" onClick={handleContinue} disabled={loading}>
                {loading ? 'Processing...' : 'PROCEED TO PAY'}
              </button>
            </div>
          </div>

          {/* History Column */}
          <div className="history-column">
            <div className="history-section">
              <h3 className="history-title">Recent Wallet Transactions</h3>
              <p className="history-subtitle">View full details in Passbook</p>
              
              {ledger.length > 0 ? (
                <div className="history-list">
                  {ledger.map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-left">
                        <div className="history-icon" style={{background: item.txnType === 'credit' ? '#ECFDF5' : '#FEF2F2'}}>
                          <Clock size={18} color={item.txnType === 'credit' ? '#10B981' : '#EF4444'} />
                        </div>
                        <div>
                          <p className="history-number">{item.txnName || 'Add Money'}</p>
                          <p className="history-date">{new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <p className={`history-amount ${item.txnType === 'credit' ? 'text-green' : 'text-red'}`}>
                        {item.txnType === 'credit' ? '+' : '-'}₹{item.txnAmount}
                      </p>
                    </div>
                  ))}
                  <button className="view-all-btn" onClick={() => navigate('/reports')}>View All in Passbook</button>
                </div>
              ) : (
                <div className="history-empty">
                  <p>No recent transactions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
