import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { postData } from '../../API';
import './Login.css';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState('password');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLoginPassword = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const deviceToken = "web-token-" + Date.now();
      const response = await postData('api/auth/login-password', {
        phone: mobile,
        password: password,
        deviceToken: deviceToken,
      });

      if (response.Status) {
        dispatch(setUser(response));
        navigate('/dashboard', { replace: true });
      } else {
        alert(response.Remarks || 'Invalid credentials');
      }
    } catch (err) {
      alert(err.response?.data?.Remarks || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }
    setIsLoading(true);
    try {
      const response = await postData('api/auth/send-otp', { phone: mobile });
      if (response.Status) {
        setOtpSent(true);
        alert('OTP Sent Successfully!');
      } else {
        alert(response.Remarks || 'Failed to send OTP');
      }
    } catch (err) {
      alert(err.response?.data?.Remarks || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      alert('Please enter a valid OTP');
      return;
    }
    setIsLoading(true);
    try {
      const deviceToken = "web-token-" + Date.now();
      const response = await postData('api/auth/login-otp', {
        phone: mobile,
        otp: otp,
        deviceToken: deviceToken,
      });

      if (response.Status) {
        dispatch(setUser(response));
        navigate('/dashboard', { replace: true });
      } else {
        alert(response.Remarks || 'Invalid OTP');
      }
    } catch (err) {
      alert(err.response?.data?.Remarks || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-left-panel">
        <div className="left-panel-content">
          <h1 className="brand-title">ClubTYL</h1>
          <h2 className="panel-heading">Empower Your Digital Payments</h2>
          <p className="panel-subheading">
            Join the ultimate fintech platform. Experience seamless recharges, bill payments, and instant cashbacks all in one place.
          </p>

          <div className="feature-cards">
            <div className="glass-feature-card">
              <div className="feature-icon">🚀</div>
              <div className="feature-text">
                <h4>Lightning Fast</h4>
                <p>Instant transactions with zero downtime.</p>
              </div>
            </div>
            <div className="glass-feature-card">
              <div className="feature-icon">🛡️</div>
              <div className="feature-text">
                <h4>Bank-Grade Security</h4>
                <p>Your data and money are 100% safe.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="circle-shape shape-1"></div>
        <div className="circle-shape shape-2"></div>
      </div>

      <div className="login-right-panel">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome Back 👋</h2>
            <p>Login to your account to continue</p>
          </div>
          
          <div className="login-type-toggle">
            <button 
              className={`toggle-btn ${loginType === 'password' ? 'active' : ''}`}
              onClick={() => setLoginType('password')}
            >
              Password
            </button>
            <button 
              className={`toggle-btn ${loginType === 'otp' ? 'active' : ''}`}
              onClick={() => {
                setLoginType('otp');
                setOtpSent(false);
                setOtp('');
              }}
            >
              OTP
            </button>
          </div>

          {loginType === 'password' && (
            <form onSubmit={handleLoginPassword}>
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-wrapper">
                  <span className="prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="form-group password-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={mobile.length < 10 || !password || isLoading}
              >
                {isLoading ? <span className="loader"></span> : 'Continue'}
              </button>
            </form>
          )}

          {loginType === 'otp' && (
            <div className="otp-login-section">
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-wrapper">
                  <span className="prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    maxLength="10"
                    disabled={otpSent}
                  />
                </div>
              </div>

              {otpSent && (
                <div className="form-group">
                  <label>Enter OTP</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter 6 digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      maxLength="6"
                    />
                  </div>
                </div>
              )}

              {!otpSent ? (
                <button 
                  className="submit-btn" 
                  onClick={handleSendOtp}
                  disabled={mobile.length < 10 || isLoading}
                >
                  {isLoading ? <span className="loader"></span> : 'Send OTP'}
                </button>
              ) : (
                <button 
                  className="submit-btn" 
                  onClick={handleVerifyOtp}
                  disabled={otp.length < 4 || isLoading}
                >
                  {isLoading ? <span className="loader"></span> : 'Verify & Login'}
                </button>
              )}
            </div>
          )}

          <div className="toggle-section">
            <a href="/register" className="toggle-link">
              Don't have an account? <span>Create account</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
