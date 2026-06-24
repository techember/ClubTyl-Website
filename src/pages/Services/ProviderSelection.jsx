import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Tag, ChevronRight } from 'lucide-react';
import { getData } from '../../API';
import './ProviderSelection.css';

export default function ProviderSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ServiceId, name } = location.state || {}; 

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, [ServiceId]);

  const fetchProviders = async () => {
    try {
      const res = await getData('/api/cyrus/bbps/operator-list?serviceId=' + ServiceId);
      if (res?.Data) {
        setProviders(res.Data);
        setFilteredProviders(res.Data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
    if (!text.trim()) {
      setFilteredProviders(providers);
      return;
    }
    const filtered = providers.filter(item =>
      item.operator_name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  const handleSelect = (item) => {
    navigate('/payment', { state: { provider: item, ServiceId, name } });
  };

  return (
    <div className="provider-container">
      {/* Header */}
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span className="current">Select Provider</span>
          </div>
        </div>
      </header>

      <div className="provider-content">
        <div className="search-bar">
          <Search size={20} color="#888" />
          <input 
            type="text" 
            placeholder="Search provider..." 
            value={search}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner-blue"></div>
            <p>Loading Providers...</p>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="no-data">
            <p>No providers found.</p>
          </div>
        ) : (
          <div className="provider-grid">
            {filteredProviders.map((item, idx) => (
              <div 
                key={idx} 
                className="provider-card"
                onClick={() => handleSelect(item)}
              >
                <div className="provider-logo-wrapper">
                  {item.icon || item.Logo ? (
                    <img src={item.icon || item.Logo} alt="Logo" />
                  ) : (
                    <span style={{ fontWeight: 'bold', color: '#4A00E0' }}>
                      {item.operator_name ? item.operator_name.charAt(0) : item.Operator?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="provider-name">{item.operator_name || item.Operator}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
