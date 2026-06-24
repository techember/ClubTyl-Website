import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData } from '../../API';
import { IndiaData } from '../../constants/indiaData';
import './Register.css';

export default function Register() {
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [referCode, setReferCode] = useState('');
  
  // Location
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [districtsList, setDistrictsList] = useState([]);
  
  // Terms
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Populate districts when state changes
  useEffect(() => {
    if (stateName) {
      const stateObj = IndiaData.find(s => s.value === stateName);
      if (stateObj) {
        setDistrictsList(stateObj.districts.map(d => d.value));
        setDistrict(''); // Reset district when state changes
      }
    } else {
      setDistrictsList([]);
      setDistrict('');
    }
  }, [stateName]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || firstName.length < 3) {
      alert('Please enter a valid first name (at least 3 characters)');
      return;
    }
    if (!stateName) {
      alert('Please select your state');
      return;
    }
    if (!district) {
      alert('Please select your district');
      return;
    }
    if (!mobile || mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions to proceed');
      return;
    }

    setIsLoading(true);
    try {
      // payload structure matches app
      const payload = {
        firstName,
        lastName,
        phone: mobile,
        email,
        dob,
        referCode,
        stateName,
        district
      };

      const response = await postData('api/auth/user-register', payload);

      if (response.Status) {
        // OTP sent successfully, navigate to verify OTP screen
        alert('OTP sent successfully to your mobile number.');
        navigate('/verify-otp', { state: { registrationData: payload } });
      } else {
        alert(response.Remarks || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.Remarks || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-left-panel">
        <div className="left-panel-content">
          <h1 className="brand-title">ClubTYL</h1>
          <h2 className="panel-heading">Start Your Journey Today</h2>
          <p className="panel-subheading">
            Create an account to unlock exclusive cashback, seamless bill payments, and premium financial services.
          </p>

          <div className="feature-cards">
            <div className="glass-feature-card">
              <div className="feature-icon">💰</div>
              <div className="feature-text">
                <h4>Guaranteed Cashback</h4>
                <p>Earn cashback on every successful transaction.</p>
              </div>
            </div>
            <div className="glass-feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h4>Superfast Processing</h4>
                <p>No waiting. Recharges happen in a blink.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="circle-shape shape-1"></div>
        <div className="circle-shape shape-2"></div>
      </div>

      <div className="register-right-panel">
        <div className="register-card">
          <div className="register-card-header">
            <h2>Create Account ✨</h2>
            <p>Fill in the details below to get started</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>User Type</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value="Retailer"
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name*</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State*</label>
                <div className="input-wrapper">
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {IndiaData.map((s, idx) => (
                      <option key={idx} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>District*</label>
                <div className="input-wrapper">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!stateName}
                    required
                  >
                    <option value="">Select District</option>
                    {districtsList.map((d, idx) => (
                      <option key={idx} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Mobile Number*</label>
              <div className="input-wrapper">
                <span className="prefix">+91</span>
                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  maxLength="10"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <div className="input-wrapper">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Referral Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="If any"
                    value={referCode}
                    onChange={(e) => setReferCode(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="terms-checkbox-row">
              <input
                type="checkbox"
                id="termsCheck"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="termsCheck">
                I agree to the <Link to="/terms" target="_blank" style={{color: '#4A00E0', textDecoration: 'underline'}}>Terms & Conditions</Link>, <Link to="/privacy" target="_blank" style={{color: '#4A00E0', textDecoration: 'underline'}}>Privacy Policy</Link> and <Link to="/refund" target="_blank" style={{color: '#4A00E0', textDecoration: 'underline'}}>Refund Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Create Account'}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
