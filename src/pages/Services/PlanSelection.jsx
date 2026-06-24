import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { getData } from '../../API';
import { URL as API_BASE_URL } from '../../constants/URL';
import './PlanSelection.css';

export default function PlanSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { operatorDetail, ServiceId, mobile } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [groupedPlan, setGroupedPlan] = useState({});
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [searchPrice, setSearchPrice] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getData(
        `api/cyrus/plan_fetch?Operator_Code=${operatorDetail?.OpCode}&Circle_Code=${operatorDetail?.CircleCode}&MobileNumber=${mobile}`
      );
      
      if (response?.Status) {
        const grouped = response.Data.reduce((groups, item) => {
          const type = item.Type || 'Others';
          if (!groups[type]) groups[type] = [];
          groups[type].push(item);
          return groups;
        }, {});
        
        const names = Object.keys(grouped);
        setGroupedPlan(grouped);
        setTabs(names);
        setSelectedTab(names[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = item => {
    if (!item?.rs) return 0;
    return Number(String(item.rs).replace(/[^0-9]/g, '')) || 0;
  };

  const parseDesc = (desc = '') => {
    if (!desc) return [];
    return desc
      .replace(/\n+/g, ' ')
      .replace(/\|/g, '#')
      .replace(/,/g, '#')
      .replace(/;/g, '#')
      .replace(/\+\s?/g, '#')
      .replace(/ and /gi, '#')
      .replace(/\s+/g, ' ')
      .split('#')
      .map(t => t.trim())
      .filter(t => t.length > 0);
  };

  const getAllPlans = () => Object.values(groupedPlan).flat();

  const filteredPlans = (
    searchPrice ? getAllPlans() : (groupedPlan[selectedTab] || [])
  ).filter(item => {
    if (!searchPrice) return true;
    const actualPrice = getPrice(item);
    const value = searchPrice.trim().replace(/[^0-9-]/g, '');

    if (value.includes('-')) {
      const [min, max] = value.split('-').map(Number);
      return actualPrice >= min && actualPrice <= max;
    }
    return actualPrice.toString().includes(value);
  }).sort((a, b) => getPrice(a) - getPrice(b));

  const handleRecharge = (item) => {
    navigate('/payment-confirmation', {
      state: {
        rechargeData: item,
        operatorDetail: { ...operatorDetail, Mobile: mobile, ServiceId },
        isPrePaid: true
      }
    });
  };

  return (
    <div className="plan-container">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span>Recharge</span> <span className="separator">/</span> <span className="current">Plans</span>
          </div>
        </div>
        <div className="header-info-subtle">
          <p className="mobile-no">{mobile}</p>
          <p className="circle-name">{operatorDetail?.Operator} - {operatorDetail?.Circle}</p>
        </div>
      </header>

      <div className="plan-content">
        {/* Search */}
        <div className="plan-search">
          <Search size={18} color="#777" />
          <input 
            type="text"
            placeholder="Search by Price (e.g. 299 or 300-400)"
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
          />
        </div>

        {/* Tabs */}
        {!searchPrice && tabs.length > 0 && (
          <div className="plan-tabs-wrapper">
            <div className="plan-tabs">
              {tabs.map((t, idx) => (
                <button 
                  key={idx} 
                  className={`tab-btn ${selectedTab === t ? 'active' : ''}`}
                  onClick={() => setSelectedTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner-blue"></div>
            <p>Fetching best plans...</p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="no-data">No plans found</div>
        ) : (
          <div className="plan-list">
            {filteredPlans.map((item, idx) => (
              <div key={idx} className="plan-card">
                <div className="plan-row">
                  <span className="plan-price">₹{item.rs}</span>
                  <span className="plan-validity">{item.validity}</span>
                </div>
                <div className="plan-desc">
                  {parseDesc(item.desc).map((line, i) => (
                    <p key={i}>• {line}</p>
                  ))}
                </div>
                <button className="plan-recharge-btn" onClick={() => handleRecharge(item)}>
                  Recharge
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
