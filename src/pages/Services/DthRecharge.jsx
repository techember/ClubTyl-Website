import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Tv } from 'lucide-react';
import { getData } from '../../API';
import './DthRecharge.css';

export default function DthRecharge() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ServiceId, name } = location.state || {};

  const [subscriberId, setSubscriberId] = useState('');
  const [amount, setAmount] = useState('');
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingOps, setFetchingOps] = useState(true);

  useEffect(() => {
    fetchDthOperators();
  }, []);

  const fetchDthOperators = async () => {
    try {
      const response = await getData('/api/cyrus/operator-list');
      if (response?.Data) {
        // Find operators that belong to DTH
        const dthOps = response.Data.filter(op => 
          op.ServiceId === ServiceId || 
          (op.category && op.category.toLowerCase() === 'dth') ||
          (op.operator_name && op.operator_name.toLowerCase().includes('dth')) ||
          (op.operator_name && op.operator_name.toLowerCase().includes('dish')) ||
          (op.operator_name && op.operator_name.toLowerCase().includes('sun direct')) ||
          (op.operator_name && op.operator_name.toLowerCase().includes('tata play'))
        );
        // Fallback to manual list if none matched properly
        if (dthOps.length > 0) {
          setOperators(dthOps);
        } else {
          setOperators([
            { op_id: '12', operator_name: 'Airtel Digital TV' },
            { op_id: '13', operator_name: 'Dish TV' },
            { op_id: '14', operator_name: 'Sun Direct' },
            { op_id: '15', operator_name: 'Tata Play' },
            { op_id: '16', operator_name: 'Videocon d2h' }
          ]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch operators', err);
      // Hardcoded fallback
      setOperators([
        { op_id: '12', operator_name: 'Airtel Digital TV' },
        { op_id: '13', operator_name: 'Dish TV' },
        { op_id: '14', operator_name: 'Sun Direct' },
        { op_id: '15', operator_name: 'Tata Play' },
        { op_id: '16', operator_name: 'Videocon d2h' }
      ]);
    } finally {
      setFetchingOps(false);
    }
  };

  const handleProceed = () => {
    if (!selectedOperator) {
      alert('Please select an operator');
      return;
    }
    if (!subscriberId || subscriberId.length < 5) {
      alert('Please enter a valid Subscriber ID');
      return;
    }
    if (!amount || Number(amount) < 10) {
      alert('Please enter a valid amount (Min ₹10)');
      return;
    }

    const rechargeData = {
      amount: amount,
      number: subscriberId,
      customerID: subscriberId,
      rs: amount,
      desc: 'DTH Recharge'
    };

    const operatorDetail = {
      UniqueId: subscriberId,
      Mobile: subscriberId,
      Operator: selectedOperator.operator_name,
      OpCode: selectedOperator.op_id,
      DthOpCode: selectedOperator.op_id,
      DthName: selectedOperator.operator_name,
      CircleCode: '1', // Default circle
      ServiceId: ServiceId || 'DTH',
      op_id: selectedOperator.op_id,
      operator_name: selectedOperator.operator_name,
    };

    navigate('/payment-confirmation', {
      state: {
        operatorDetail,
        rechargeData,
        isDTH: true
      }
    });
  };

  return (
    <div className="dth-page-wrapper">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span>DTH Recharge</span>
          </div>
        </div>
      </header>

      <div className="dth-content-container">
        <div className="dth-card">
          <div className="dth-card-header">
            <Tv size={32} color="#4A00E0" />
            <div className="dth-header-text">
              <h2>DTH Recharge</h2>
              <p>Recharge your DTH connection instantly</p>
            </div>
          </div>

          <div className="dth-form">
            <div className="form-group">
              <label>Select Operator</label>
              {fetchingOps ? (
                <div className="operator-skeleton">Loading operators...</div>
              ) : (
                <div className="operator-grid">
                  {operators.map(op => (
                    <div 
                      key={op.op_id}
                      className={`operator-chip ${selectedOperator?.op_id === op.op_id ? 'selected' : ''}`}
                      onClick={() => setSelectedOperator(op)}
                    >
                      {op.operator_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Subscriber ID / Registered Mobile Number</label>
              <div className="input-wrapper-dth">
                <input 
                  type="text" 
                  placeholder="Enter Subscriber ID" 
                  value={subscriberId}
                  onChange={(e) => setSubscriberId(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Amount (₹)</label>
              <div className="input-wrapper-dth">
                <span className="currency-symbol">₹</span>
                <input 
                  type="number" 
                  placeholder="Enter Amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="proceed-btn" 
              onClick={handleProceed}
              disabled={!selectedOperator || !subscriberId || !amount || loading}
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
