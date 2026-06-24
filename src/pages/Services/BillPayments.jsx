import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { IMAGE_URL } from '../../constants/URL';
import './BillPayments.css';

export default function BillPayments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { service } = location.state || {}; // Array of sub-services passed from Dashboard

  const [services, setServices] = useState([]);

  useEffect(() => {
    if (service) {
      setServices(service);
    }
  }, [service]);

  const handleServiceClick = (item) => {
    if (item.name === 'Google Play') {
      navigate('/google-play-payment', { state: { ServiceId: item._id } });
    } else {
      navigate('/provider-selection', { state: { ServiceId: item._id, name: item.name } });
    }
  };

  return (
    <div className="bill-container">
      {/* Header */}
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span className="current">Bill Services</span>
          </div>
        </div>
      </header>

      <div className="bill-content">
        <div className="bill-grid">
          {services.map((item, index) => (
            <div key={index} className="bill-card" onClick={() => handleServiceClick(item)}>
              <div className="icon-wrapper">
                {item.icon ? (
                  <img src={`${IMAGE_URL}/${item.icon}`} alt={item.name} />
                ) : (
                  <Zap size={28} color="#0078FF" />
                )}
              </div>
              <p className="card-title">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
