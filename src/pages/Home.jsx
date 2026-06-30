import React, { useState } from 'react';
import { Smartphone, Zap, Shield, Briefcase, Gift, DollarSign, Users, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';
import './Home.css';

const Home = () => {
  const [showIosModal, setShowIosModal] = useState(false);

  return (
    <div className="page-wrapper">
      {/* iOS Modal */}
      {showIosModal && (
        <div className="ios-modal-overlay" onClick={() => setShowIosModal(false)}>
          <div className="ios-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ios-modal-icon">
              <Smartphone size={32} />
            </div>
            <h3 className="ios-modal-title">Coming Soon!</h3>
            <p className="ios-modal-text">Our iOS app is currently in development. Stay tuned for an amazing experience on your Apple devices!</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowIosModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-fade-up">
            <div className="badge">Welcome to ClubTyl</div>
            <h1 className="hero-title">
              The Ultimate <span className="text-gradient">Fintech App</span> for All Your Needs
            </h1>
            <p className="hero-subtitle">
              Recharges, Bill Payments, Insurance, HR, and Accounting Services in one powerful platform. Earn high commissions on every transaction.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <Smartphone size={20} />
                Download for Android
              </button>
              <button className="btn btn-secondary" onClick={() => setShowIosModal(true)}>
                <Smartphone size={20} />
                Download for iOS
              </button>
            </div>
          </div>
          <div className="hero-image animate-fade-up delay-200">
            <div className="mockup-frame">
              <div className="mockup-screen">
                <div className="mockup-header">
                  <img src={logo} alt="CT" className="logo-icon-small" style={{ objectFit: 'cover' }} />
                  <span>ClubTyl</span>
                </div>
                <div className="mockup-body">
                  <div className="mockup-card balance-card">
                    <span>Wallet Balance</span>
                    <h2>₹24,500.00</h2>
                  </div>
                  <div className="mockup-grid">
                    <div className="mockup-item"><Zap size={24} color="var(--primary-blue)" /><span>Recharge</span></div>
                    <div className="mockup-item"><Shield size={24} color="var(--primary-blue)" /><span>Insurance</span></div>
                    <div className="mockup-item"><Briefcase size={24} color="var(--primary-blue)" /><span>HR Services</span></div>
                    <div className="mockup-item"><DollarSign size={24} color="var(--primary-blue)" /><span>BBPS</span></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative background blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features section-padding">
        <div className="container">
          <div className="section-header text-center animate-fade-up">
            <h2>Everything You Need, <span className="text-gradient">Simplified</span></h2>
            <p>From mobile recharges to full accounting services, ClubTyl has you covered.</p>
          </div>
          
          <div className="features-grid">
            {[
              { icon: <Zap size={32} />, title: "Mobile & DTH Recharge", desc: "Instant recharges for all operators with guaranteed cashback." },
              { icon: <Shield size={32} />, title: "Insurance Services", desc: "Protect what matters with our comprehensive insurance plans." },
              { icon: <DollarSign size={32} />, title: "BBPS Bill Payments", desc: "Pay electricity, water, gas, and fastag bills seamlessly." },
              { icon: <Briefcase size={32} />, title: "HR & Accounting", desc: "Professional HR and accounting services for your business." }
            ].map((feature, idx) => (
              <div key={idx} className="feature-card glass-card animate-fade-up" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits section-padding bg-surface">
        <div className="container benefits-container">
          <div className="benefits-image animate-fade-up">
            <div className="glass-card reward-card">
              <DollarSign size={48} color="var(--accent-color)" />
              <h3>Earn Extra Income</h3>
              <p>Retailers earn high commissions on every recharge and bill payment made through the platform.</p>
              <div className="share-bar">
                <div className="share-progress"></div>
              </div>
              <p className="share-text">Maximize your earnings every month!</p>
            </div>
          </div>
          
          <div className="benefits-content animate-fade-up delay-200">
            <h2>Why Choose <span className="text-gradient">ClubTyl?</span></h2>
            <ul className="benefits-list">
              <li>
                <div className="benefit-icon"><Gift size={24} /></div>
                <div className="benefit-text">
                  <h4>Exclusive Rewards</h4>
                  <p>Get exciting rewards and bonuses for being an active retailer on our platform. Grow with us!</p>
                </div>
              </li>
              <li>
                <div className="benefit-icon"><DollarSign size={24} /></div>
                <div className="benefit-text">
                  <h4>High Commissions</h4>
                  <p>Earn industry-leading commissions on BBPS and utility bill payments.</p>
                </div>
              </li>
              <li>
                <div className="benefit-icon"><Users size={24} /></div>
                <div className="benefit-text">
                  <h4>Referral Rewards</h4>
                  <p>Invite friends and other retailers to ClubTyl and earn exciting referral bonuses.</p>
                </div>
              </li>
            </ul>
            <button className="btn btn-primary mt-4">
              Join Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section-padding">
        <div className="container text-center">
          <div className="cta-box glass-card animate-fade-up">
            <h2>Ready to transform your digital payments?</h2>
            <p>Download the ClubTyl app today and start earning rewards on every transaction.</p>
            <div className="hero-actions justify-center">
              <button className="btn btn-primary">
                <Smartphone size={20} /> Play Store
              </button>
              <button className="btn btn-secondary">
                <Smartphone size={20} /> App Store
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
