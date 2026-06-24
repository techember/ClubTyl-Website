import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postData } from '../../API';
import { setUser } from '../../redux/slices/userSlice';
import './Register.css'; // Reusing styles

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registrationData = location.state?.registrationData;

  if (!registrationData) {
    // If no data, send back to register
    navigate('/register');
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      alert('Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Pass the complete data along with OTP
      const payload = {
        ...registrationData,
        otp
      };

      const response = await postData('api/auth/user-register', payload);

      if (response.Status) {
        alert('Account created successfully!');
        // Usually, the API might return user details. If so, log them in. 
        // Or if it requires a separate login, redirect to login.
        if (response.Data || response.token) {
           dispatch(setUser(response.Data || response));
           navigate('/dashboard');
        } else {
           navigate('/login');
        }
      } else {
        alert(response.Remarks || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.Remarks || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const payload = { phone: registrationData.phone };
      const response = await postData('api/auth/user-register', payload);
      if (response.Status) {
        alert('OTP resent successfully.');
      } else {
        alert(response.Remarks || 'Failed to resend OTP.');
      }
    } catch (error) {
       alert('Error resending OTP.');
    }
  };

  return (
    <div className="register-page-wrapper" style={{ minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="register-card" style={{ maxWidth: '400px', margin: 'auto' }}>
        <div className="register-card-header">
          <h2>Verify OTP ✨</h2>
          <p>Enter the code sent to +91 {registrationData.phone}</p>
        </div>

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label>Enter OTP</label>
            <div className="input-wrapper" style={{ justifyContent: 'center' }}>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength="6"
                required
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ marginTop: '20px' }}>
            {isLoading ? 'Verifying...' : 'Verify & Register'}
          </button>
        </form>

        <div className="login-link">
          Didn't receive OTP? <span onClick={resendOtp} style={{ color: '#4A00E0', fontWeight: '600', cursor: 'pointer' }}>Resend</span>
        </div>
      </div>
    </div>
  );
}
