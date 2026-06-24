import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Info, Upload } from 'lucide-react';
import { postDataMultipart } from '../../API';
import './Enquiry.css';

export default function HR() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    companyName: '',
    requirementDetails: '',
    termsAccepted: true,
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert('Please enter your Full Name'); return; }
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) { alert('Please enter a valid 10-digit mobile number'); return; }

    try {
      setLoading(true);
      
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('mobileNumber', formData.mobileNumber);
      formPayload.append('companyName', formData.companyName);
      formPayload.append('requirementDetails', formData.requirementDetails);
      formPayload.append('termsAccepted', formData.termsAccepted);
      if (cvFile) {
        formPayload.append('cv', cvFile);
      }

      const res = await postDataMultipart('api/user/hr/enquiry', formPayload);
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
          <h1>HR Services</h1>
        </div>
      </header>

      <div className="enquiry-content">
        <div className="enquiry-card">
          <div className="enquiry-header-area">
            <div className="enquiry-icon">
              <Users size={40} color="white" />
            </div>
            <h2>HR & Recruitment Services</h2>
            <p>Find the right talent or the right job. Our HR team connects businesses with skilled professionals.</p>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="enquiry-notice">
              <Info size={18} color="#4338CA" style={{ flexShrink: 0, marginTop: 2 }} />
              <p>A one-time registration fee of <strong>₹500</strong> is required. You will be redirected to the payment page.</p>
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
              <label>Company Name (if applicable)</label>
              <input type="text" placeholder="Your company or organization name" value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Requirement Details</label>
              <textarea placeholder="Describe your HR requirement (e.g. hiring for X position, team size, job role...)"
                value={formData.requirementDetails}
                onChange={(e) => setFormData({ ...formData, requirementDetails: e.target.value })} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Upload CV (Optional)</label>
              <div className="file-upload-wrapper">
                <input type="file" id="cvUpload" accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files[0])} disabled={loading} style={{ display: 'none' }} />
                <label htmlFor="cvUpload" className="file-upload-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: '#f9fafb' }}>
                  <Upload size={18} />
                  {cvFile ? cvFile.name : 'Choose CV File'}
                </label>
              </div>
            </div>

            <button type="submit" className="enquiry-submit-btn" disabled={loading} style={{ marginTop: '20px' }}>
              {loading ? 'Processing...' : 'Proceed to Pay ₹500'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
