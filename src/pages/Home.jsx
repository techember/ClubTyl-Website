import React from 'react';
import { Smartphone, Zap, Shield, Briefcase, Gift, DollarSign, Users, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-fade-up">
            <div className="badge">Welcome to ClubTyl</div>
            <h1 className="hero-title">
              The Ultimate <span className="text-gradient">Fintech App</span> for All Your Needs
            </h1>
            <p className="hero-subtitle">
              Recharges, Bill Payments, Insurance, HR, and Accounting Services in one powerful platform. Earn shares and commissions on every transaction.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <Smartphone size={20} />
                Download for Android
              </button>
              <button className="btn btn-secondary">
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
              <Gift size={48} color="var(--accent-color)" />
              <h3>Earn Company Shares</h3>
              <p>Retailers earn shares on every recharge made through the platform.</p>
              <div className="share-bar">
                <div className="share-progress"></div>
              </div>
              <p className="share-text">245 Shares Earned This Month!</p>
            </div>
          </div>
          
          <div className="benefits-content animate-fade-up delay-200">
            <h2>Why Choose <span className="text-gradient">ClubTyl?</span></h2>
            <ul className="benefits-list">
              <li>
                <div className="benefit-icon"><Gift size={24} /></div>
                <div className="benefit-text">
                  <h4>Retailer Shares</h4>
                  <p>Unlike other platforms, our retailers get company shares for doing recharges. Grow with us!</p>
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
