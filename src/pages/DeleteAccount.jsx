import React, { useState } from 'react';
import { ShieldAlert, Trash2 } from 'lucide-react';
import './DeleteAccount.css';

const DeleteAccount = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      alert("Account deletion request submitted. Our team will contact you within 48 hours.");
    }
  };

  return (
    <div className="delete-account-page">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        
        <div className="delete-card animate-fade-up">
          <div className="delete-header">
            <div className="warning-icon">
              <ShieldAlert size={28} strokeWidth={2} />
            </div>
            <div className="delete-header-text">
              <h2>Request Account Deletion</h2>
              <p>We're sorry to see you go. If you are sure you want to delete your account and all associated data, please fill out the request form below. This process may take up to 48 hours.</p>
            </div>
          </div>

          <div className="delete-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your registered name" required />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Registered Email / Mobile</label>
                <input type="text" id="contact" placeholder="Email or Mobile number" required />
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Leaving</label>
                <textarea id="reason" rows="4" placeholder="Please let us know how we can improve..."></textarea>
              </div>

              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="confirmDelete" 
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="confirmDelete">
                  I understand that this action is permanent and cannot be undone. All my wallet balances, transaction history, and KYC data will be permanently removed.
                </label>
              </div>

              <button type="submit" className="btn-danger" disabled={!isChecked}>
                Confirm Deletion <Trash2 size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeleteAccount;
