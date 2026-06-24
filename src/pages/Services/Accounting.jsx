import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Info } from 'lucide-react';
import { postData } from '../../API';
import './Enquiry.css';

export default function Accounting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    businessName: '',
    serviceType: 'GST Filing',
    requirementDetails: '',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const accountingServices = [
    'GST Filing',
    'Income Tax Return (ITR)',
    'Bookkeeping',
    'TDS Filing',
    'Business Registration',
    'Financial Statements',
    'Payroll Management',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert('Please enter your Full Name'); return; }
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) { alert('Please enter a valid 10-digit mobile number'); return; }
    if (!formData.termsAccepted) { alert('Please accept the Terms and Conditions to proceed.'); return; }

    try {
      setLoading(true);
      const res = await postData('api/user/accounting/enquiry', formData);
      if (res?.success || res?.Status) {
        alert(res.message || res.Message || 'Thank you! Our team will contact you shortly.');
        navigate(-1);
      } else {
        alert(res?.Remarks || res?.Message || res?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.Remarks || error.response?.data?.message || 'Network error. Please try again later.';
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
          <h1>Accounting Services</h1>
        </div>
      </header>

      <div className="enquiry-content">
        <div className="enquiry-card">
          <div className="enquiry-header-area">
            <div className="enquiry-icon">
              <Calculator size={40} color="white" />
            </div>
            <h2>Expert Accounting Services</h2>
            <p>GST, ITR, Bookkeeping and more — let our experts handle your financial compliance.</p>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="enquiry-notice">
              <Info size={18} color="#4338CA" style={{ flexShrink: 0, marginTop: 2 }} />
              <p>Fill this form and our Chartered Accountant team will call you within 24 hours with a customized quote.</p>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="Enter your full name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input type="tel" placeholder="10-digit mobile number" maxLength={10} value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Business / Company Name</label>
              <input type="text" placeholder="Your business or company name" value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Service Required</label>
              <select value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })} disabled={loading}>
                {accountingServices.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Additional Details</label>
              <textarea placeholder="Describe your requirement in detail..." value={formData.requirementDetails}
                onChange={(e) => setFormData({ ...formData, requirementDetails: e.target.value })} disabled={loading} />
            </div>

            <div className="terms-checkbox-row">
              <input
                type="checkbox"
                id="acc-terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                disabled={loading}
              />
              <label htmlFor="acc-terms">
                I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and authorize ClubTYL to contact me.
              </label>
            </div>

            <button type="submit" className="enquiry-submit-btn" disabled={loading || !formData.termsAccepted}>
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
