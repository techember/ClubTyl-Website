import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft, Filter } from 'lucide-react';
import { getData } from '../../API';
import './Reports.css';

export default function Reports() {
  const user = useSelector(state => state.user.user?.Data || state.user.user?.user);
  
  const [activeTab, setActiveTab] = useState('Ledger'); // 'Ledger', 'mobile', 'dth', 'bill'
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState(null);
  const [ledger, setLedger] = useState([]);
  
  const [stocksPortfolio, setStocksPortfolio] = useState([]);
  const [stocksPending, setStocksPending] = useState([]);
  const [stocksActiveTab, setStocksActiveTab] = useState('portfolio');
  
  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [txnType, setTxnType] = useState(''); // 'credit', 'debit'
  const [status, setStatus] = useState(''); // 'SUCCESS', 'FAILED', 'PENDING'

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // Fetch Services History
      const resData = await getData('api/user/combined-history');
      if (resData) setData(resData);

      // Fetch Ledger (Wallet history)
      if (user?._id) {
        const resLedger = await getData(`api/txn/list/${user._id}`);
        if (resLedger?.Data) setLedger(resLedger.Data);
      }

      // Fetch Stocks
      try {
        const [portRes, pendRes] = await Promise.all([
          getData('api/user/rewards/portfolio'),
          getData('api/user/rewards/pending'),
        ]);
        if (portRes?.success) setStocksPortfolio(portRes.data);
        if (pendRes?.success) setStocksPending(pendRes.data);
      } catch (err) {
        console.error("Error fetching stocks", err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    if (activeTab === 'Ledger') return ledger || [];
    if (activeTab === 'stocks') return stocksActiveTab === 'portfolio' ? stocksPortfolio : stocksPending;
    if (!data?.Data) return [];
    if (activeTab === 'mobile') return data.Data.mobile || [];
    if (activeTab === 'dth') return data.Data.dth || [];
    if (activeTab === 'bill') return data.Data.bbps || [];
    return [];
  };

  const applyFilters = (list) => {
    let filtered = [...list];
    
    if (activeTab === 'Ledger' && txnType) {
      filtered = filtered.filter(item => item.txnType === txnType);
    }
    
    if (activeTab !== 'Ledger' && status) {
      filtered = filtered.filter(item => item.status?.toUpperCase() === status.toUpperCase());
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const listToRender = applyFilters(getCurrentData());

  return (
    <div className="reports-container">
      <header className="reports-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => window.history.back()}>
            <ArrowLeft size={24} color="#fff" />
          </button>
          <h1>Passbook & Reports</h1>
        </div>
        <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={20} color="#fff" /> Filter
        </button>
      </header>

      {/* Tabs */}
      <div className="reports-tabs">
        {['Ledger', 'mobile', 'dth', 'bill', 'stocks'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'mobile' ? 'Mobile Recharges' : tab === 'dth' ? 'DTH' : tab === 'bill' ? 'Bill Payments' : tab === 'stocks' ? 'Stocks' : 'Wallet Ledger'}
          </button>
        ))}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="filters-panel">
          {activeTab === 'Ledger' ? (
            <div className="filter-group">
              <label>Transaction Type:</label>
              <select value={txnType} onChange={(e) => setTxnType(e.target.value)}>
                <option value="">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          ) : (
            <div className="filter-group">
              <label>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="SUCCESS">Success</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Table List */}
      <div className="reports-content">
        {activeTab === 'stocks' && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button 
              className={`tab-btn ${stocksActiveTab === 'portfolio' ? 'active' : ''}`} 
              onClick={() => setStocksActiveTab('portfolio')}
              style={{ padding: '6px 12px', fontSize: '14px', borderRadius: '20px', border: '1px solid #ccc', background: stocksActiveTab === 'portfolio' ? '#4A00E0' : '#fff', color: stocksActiveTab === 'portfolio' ? '#fff' : '#333' }}
            >
              Portfolio
            </button>
            <button 
              className={`tab-btn ${stocksActiveTab === 'pending' ? 'active' : ''}`} 
              onClick={() => setStocksActiveTab('pending')}
              style={{ padding: '6px 12px', fontSize: '14px', borderRadius: '20px', border: '1px solid #ccc', background: stocksActiveTab === 'pending' ? '#4A00E0' : '#fff', color: stocksActiveTab === 'pending' ? '#fff' : '#333' }}
            >
              Pending
            </button>
          </div>
        )}

        {loading ? (
          <div className="center-loader">
            <div className="spinner-blue"></div>
            <p>Loading History...</p>
          </div>
        ) : listToRender.length === 0 ? (
          <div className="no-data">
            <p>No records found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="reports-table">
              <thead>
                <tr>
                  {activeTab !== 'stocks' && <th>Date & Time</th>}
                  {activeTab === 'stocks' ? (
                    stocksActiveTab === 'portfolio' ? (
                      <>
                        <th>Share Name</th>
                        <th>Total Quantity</th>
                        <th>Status</th>
                      </>
                    ) : (
                      <>
                        <th>Reward Type</th>
                        <th>Rule Applied</th>
                        <th>Eligible Rewards</th>
                        <th>Status</th>
                      </>
                    )
                  ) : activeTab === 'Ledger' ? (
                    <>
                      <th>Transaction Name</th>
                      <th>Order ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Closing Balance</th>
                    </>
                  ) : (
                    <>
                      <th>Service/Operator</th>
                      <th>Number/ID</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {listToRender.map((item, idx) => {
                  const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleString() : '';
                  
                  if (activeTab === 'stocks') {
                    if (stocksActiveTab === 'portfolio') {
                      return (
                        <tr key={idx}>
                          <td>{item.shareName}</td>
                          <td className="fw-bold">{item.totalQuantity} Rewards</td>
                          <td><span className="status-badge status-success">OWNED</span></td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={idx}>
                          <td>{item.transactionType} Reward</td>
                          <td className="fw-bold" style={{color: '#FF9800'}}>{item.eligibleShares} Rewards</td>
                          <td><span className="status-badge status-pending">PENDING</span></td>
                        </tr>
                      );
                    }
                  } else if (activeTab === 'Ledger') {
                    return (
                      <tr key={idx}>
                        <td>{dateStr}</td>
                        <td>{item.txnName}</td>
                        <td>{item.orderId || '-'}</td>
                        <td className={item.txnType === 'credit' ? 'text-green' : 'text-red'}>
                          {item.txnType?.toUpperCase()}
                        </td>
                        <td className="fw-bold">₹{item.txnAmount}</td>
                        <td>₹{item.closingBalance || 0}</td>
                      </tr>
                    );
                  } else {
                    const isSuccess = item.status?.toUpperCase() === 'SUCCESS';
                    const isPending = item.status?.toUpperCase() === 'PENDING';
                    let statusClass = 'status-badge status-failed';
                    if (isSuccess) statusClass = 'status-badge status-success';
                    else if (isPending) statusClass = 'status-badge status-pending';

                    return (
                      <tr key={idx}>
                        <td>{dateStr}</td>
                        <td>{item.operatorName || 'Service'}</td>
                        <td>{item.number || item.customerID}</td>
                        <td className="fw-bold">₹{item.amount}</td>
                        <td><span className={statusClass}>{item.status?.toUpperCase() || 'UNKNOWN'}</span></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
