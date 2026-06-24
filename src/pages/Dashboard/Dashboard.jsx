import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../API';
import { IMAGE_URL } from '../../constants/URL';
import { Wallet, Bell, ChevronRight, User } from 'lucide-react';
import { setUser } from '../../redux/slices/userSlice';
import './Dashboard.css';

export default function Dashboard() {
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(userState?.Data || userState?.user || userState);
  const [banners, setBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [services, setServices] = useState({});
  const [news, setNews] = useState([]);

  const bannerRef = useRef(null);
  const bottomBannerRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      if (bannerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = bannerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          bannerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          bannerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    if (bottomBanners.length <= 1) return;
    const interval = setInterval(() => {
      if (bottomBannerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = bottomBannerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          bottomBannerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          bottomBannerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 3500); // slightly different interval so they don't slide exactly together
    return () => clearInterval(interval);
  }, [bottomBanners]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        userRes,
        bannerRes,
        bottomRes,
        svcRes,
        affRes,
        newsRes
      ] = await Promise.all([
        getData('/api/user/profile').catch(e => { console.error(e); return null; }),
        getData('api/home-banner/list').catch(e => { console.error(e); return null; }),
        getData('api/bottom-banner/list').catch(e => { console.error(e); return null; }),
        getData('api/service/list?status=true').catch(e => { console.error(e); return null; }),
        getData('api/affiliate/list').catch(e => { console.error(e); return null; }),
        getData('api/news/active').catch(e => { console.error(e); return null; })
      ]);

      // Set User Profile
      if (userRes?.Status) {
        setUserData(userRes.Data);
        dispatch(setUser({ ...userState, user: userRes.Data }));
      }

      // Set Banners
      if (bannerRes?.Data) setBanners(bannerRes.Data);
      if (bottomRes?.Data) setBottomBanners(bottomRes.Data);

      // Set Services
      const combined = [...(svcRes?.Data || []), ...(affRes?.Data || [])];
      const grouped = combined.reduce((acc, item) => {
        const sectionName = item.section && item.section.trim() !== '' && item.section !== 'undefined' && item.section !== 'null' ? item.section : 'more';
        if (!acc[sectionName]) acc[sectionName] = [];
        acc[sectionName].push(item);
        return acc;
      }, {});
      setServices(grouped);

      // Set News
      if (newsRes?.Data) {
        setNews(newsRes.Data.map(n => n.text));
      }

    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-page">
      {/* News Ticker */}
      {news.length > 0 && (
        <div className="news-ticker-web">
          <div className="news-content-web">
            {news.join(' • ')}
          </div>
        </div>
      )}

      <div className="web-banner-container" ref={bannerRef}>
        <div className="web-banner-track">
          {banners.map((b, i) => (
            <div key={i} className="web-banner-slide">
              <img src={`${IMAGE_URL}/${b.image}`} alt="Promo Banner" />
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-wrapper">
        {/* Welcome Hero */}
        <div className="welcome-hero-card">
          <div className="hero-info">
            <h2>Welcome Back, {userData?.firstName || 'User'}! 👋</h2>
            <p>Manage your payments, view reports, and earn cashbacks easily.</p>
          </div>
          <div className="hero-wallet" onClick={() => navigate('/wallet')}>
            <div className="wallet-balance-info">
              <span>Wallet Balance</span>
              <h3>₹ {userData?.wallet?.balance || '0.00'}</h3>
            </div>
            <div className="wallet-icon-box">
              <Wallet size={24} color="#4A00E0" />
            </div>
          </div>
        </div>

        {/* Quick Links (Hardcoded Missing Services) */}
        <div className="service-section">
          <div className="section-header">
            <h3>Quick Access</h3>
          </div>
          <div className="service-grid">
            <div className="service-card" onClick={() => navigate('/wallet')}>
              <div className="icon-wrapper quick-icon"><Wallet size={28} color="#4A00E0" /></div>
              <span>Add Money</span>
            </div>

            <div className="service-card" onClick={() => navigate('/reports')}>
              <div className="icon-wrapper quick-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A00E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <span>Reports</span>
            </div>
            <div className="service-card" onClick={() => navigate('/profile')}>
              <div className="icon-wrapper quick-icon"><User size={28} color="#4A00E0" /></div>
              <span>My Profile</span>
            </div>
          </div>
        </div>

        {/* Dynamic Services Grids */}
        {Object.entries(services).map(([section, items]) => {
          if (!items.length || section === 'undefined' || section === 'null' || section.trim() === '' || section.toLowerCase() === 'more') return null;
          
          const title = section === 'account' ? 'Account Settings' : 
            (section === 'recharge' ? 'Recharge & Bills' : 
             section.charAt(0).toUpperCase() + section.slice(1));

          return (
            <div key={section} className="service-section">
              <div className="section-header">
                <h3>{title}</h3>
                <ChevronRight size={20} color="#4A00E0" />
              </div>
              <div className="service-grid">
                {items.map((item, idx) => (
                  <div key={idx} className="service-card" onClick={() => {
                    const lowerName = item.name.toLowerCase();
                    if (lowerName.includes('mobile') || lowerName.includes('recharge')) {
                      navigate('/recharge', { state: { ServiceId: item._id, name: item.name } });
                    } else if (lowerName.includes('dth')) {
                      navigate('/dth-recharge', { state: { ServiceId: item._id, name: item.name } });
                    } else if (lowerName.includes('google play')) {
                      navigate('/google-play', { state: { ServiceId: item._id, name: item.name } });
                    } else if (section === 'account') {
                      navigate('/profile');
                    } else {
                      navigate('/provider-selection', { state: { ServiceId: item._id, name: item.name } });
                    }
                  }}>
                    <div className="icon-wrapper">
                      <img src={`${IMAGE_URL}/${item.icon}`} alt={item.name} />
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-wrapper" style={{ paddingTop: 0 }}>
        {/* Business & Services */}
        <div className="service-section">
          <div className="section-header">
            <h3>Business & Services</h3>
            <ChevronRight size={20} color="#4A00E0" />
          </div>
          <div className="service-grid">
            <div className="service-card" onClick={() => navigate('/insurance')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <span>Insurance</span>
            </div>
            <div className="service-card" onClick={() => navigate('/accounting')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line></svg>
              </div>
              <span>Accounting</span>
            </div>
            <div className="service-card" onClick={() => navigate('/hr')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <span>HR</span>
            </div>
          </div>
        </div>

        {/* Reports & Community */}
        <div className="service-section">
          <div className="section-header">
            <h3>Reports & Community</h3>
            <ChevronRight size={20} color="#4A00E0" />
          </div>
          <div className="service-grid">
            <div className="service-card" onClick={() => navigate('/reports')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <span>Ledger</span>
            </div>
            <div className="service-card" onClick={() => window.open('https://wa.me/917489252106', '_blank')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span>WhatsApp</span>
            </div>
            <div className="service-card" onClick={() => window.open('https://youtube.com/@clubtylofficial9568?si=83SZ5v47jiAdQWuj', '_blank')}>
              <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </div>
              <span>YouTube</span>
            </div>
          </div>
        </div>
      </div>
      {bottomBanners.length > 0 && (
        <div className="web-banner-container" ref={bottomBannerRef} style={{ marginBottom: 0, paddingBottom: 40 }}>
          <div className="web-banner-track">
            {bottomBanners.map((b, i) => (
              <div key={i} className="web-banner-slide">
                <img src={`${IMAGE_URL}/${b.image}`} alt="Bottom Promo" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
