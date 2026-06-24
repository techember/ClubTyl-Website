import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Info, Phone, FileText, HelpCircle, MessageSquare, Star, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { logoutUser } from '../../redux/slices/userSlice';
import './Profile.css';

export default function Profile() {
  const userState = useSelector((state) => state.user.user);
  const userData = userState?.Data || userState?.user || userState;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const accountOptions = [
    { icon: <Share2 size={20} color="#4A00E0" />, title: 'Refer & Earn', action: () => navigate('/refer') },
    { icon: <MessageSquare size={20} color="#4A00E0" />, title: 'Feedback', isMail: true, action: () => {} },
    { icon: <Star size={20} color="#4A00E0" />, title: 'Give 5 Star', action: () => alert('Opening App Store/Play Store...') },
  ];

  const legalOptions = [
    { icon: <Phone size={20} color="#4A00E0" />, title: 'Contact Support', action: () => navigate('/contact') },
    { icon: <ShieldCheck size={20} color="#4A00E0" />, title: 'Privacy Policy', action: () => navigate('/privacy') },
    { icon: <FileText size={20} color="#4A00E0" />, title: 'Terms & Conditions', action: () => navigate('/terms') },
    { icon: <FileText size={20} color="#4A00E0" />, title: 'Refund Policy', action: () => navigate('/refund') },
    { icon: <HelpCircle size={20} color="#4A00E0" />, title: "FAQ's", action: () => navigate('/faq') },
    { icon: <Info size={20} color="#4A00E0" />, title: 'About Us', action: () => navigate('/about') },
  ];

  return (
    <div className="profile-page-wrapper">
      <div className="profile-dashboard">
        {/* Left Sidebar - User Summary */}
        <div className="profile-sidebar">
          <div className="user-hero-card">
            <div className="avatar-large-wrapper">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Avatar" className="avatar-large" />
            </div>
            <h2>{userData?.firstName} {userData?.lastName}</h2>
            <p className="user-phone">+91 {userData?.phone}</p>
            
            <div className="sidebar-divider"></div>
            
            <button className="logout-btn-web" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Secure Logout</span>
            </button>
          </div>
          <p className="version-text-web">ClubTYL Version : 1.1.7 (Web)</p>
        </div>

        {/* Right Main Area - Settings */}
        <div className="profile-main-area">
          <div className="settings-header">
            <h1>Account Settings</h1>
            <p>Manage your account preferences and view legal information.</p>
          </div>

          <div className="settings-group">
            <h3>Quick Actions</h3>
            <div className="settings-list">
              {accountOptions.map((opt, idx) => {
                const itemContent = (
                  <>
                    <div className="settings-item-left">
                      <div className="settings-icon">{opt.icon}</div>
                      <span>{opt.title}</span>
                    </div>
                    <ChevronRight size={18} color="#94A3B8" />
                  </>
                );

                if (opt.isMail) {
                  return (
                    <a key={idx} href="mailto:clubtyl2022@gmail.com" className="settings-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {itemContent}
                    </a>
                  );
                }

                return (
                  <div key={idx} className="settings-item" onClick={opt.action}>
                    {itemContent}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="settings-group">
            <h3>Support & Legal</h3>
            <div className="settings-list">
              {legalOptions.map((opt, idx) => (
                <div key={idx} className="settings-item" onClick={opt.action}>
                  <div className="settings-item-left">
                    <div className="settings-icon">{opt.icon}</div>
                    <span>{opt.title}</span>
                  </div>
                  <ChevronRight size={18} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
