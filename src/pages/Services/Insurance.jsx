import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { postData } from '../../API';
import './Enquiry.css';

export default function Insurance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    insuranceType: 'Motor Insurance',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const insuranceTypes = [
    'Motor Insurance',
    'Health Insurance',
    'Life Insurance',
    'Travel Insurance',
    'Commercial Insurance',
    'Other Insurance',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert('Please enter your Full Name'); return; }
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) { alert('Please enter a valid 10-digit mobile number'); return; }
    if (!formData.termsAccepted) { alert('Please accept the Terms and Conditions to proceed.'); return; }

    try {
      setLoading(true);
      const res = await postData('api/user/insurance/lead', formData);
      
      if (res?.success || res?.Status) {
        alert(res.message || res.Message || 'Thank you! Our team will contact you shortly.');
        navigate(-1);
      } else {
        alert(res?.Remarks || res?.Message || res?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.Remarks || error.response?.data?.message || 'Something went wrong. Please try again later.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-page-wrapper">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <h1>Insurance Services</h1>
        </div>
      </header>

      <div className="enquiry-content">
        <div className="enquiry-card">
          <div className="enquiry-header-area">
            <div className="enquiry-icon">
              <Shield size={48} color="#4A00E0" />
            </div>
            <h2>Get the Best Insurance</h2>
            <p>Protect what matters most. Show your interest and our experts will guide you to the right plan.</p>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Insurance Type</label>
              <select
                value={formData.insuranceType}
                onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                disabled={loading}
              >
                {insuranceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="terms-checkbox-row">
              <input
                type="checkbox"
                id="ins-terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                disabled={loading}
              />
              <label htmlFor="ins-terms">
                I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and authorize ClubTYL to contact me.
              </label>
            </div>

            <button type="submit" className="enquiry-submit-btn" disabled={loading || !formData.termsAccepted}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
