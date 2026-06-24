import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft, Copy, Share2, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ReferAndEarn.css';

export default function ReferAndEarn() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user.user);
  const userData = userState?.Data || userState?.user || userState;
  
  const referCode = userData?.referalId || 'CLUBTYL_USER';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join ClubTYL',
      text: `Join ClubTYL using my refer code: ${referCode} and get amazing rewards!`,
      url: 'https://clubtyl.com',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopy();
        alert('Code copied! Share it with your friends.');
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <div className="refer-page-wrapper">
      <div className="refer-dashboard">
        <header className="refer-header">
          <button className="back-btn-web" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} color="#0F172A" />
          </button>
          <h1>Refer & Earn</h1>
        </header>

        <div className="refer-main-content">
          <div className="refer-illustration">
            <Gift size={80} color="#4A00E0" />
          </div>
          <h2>Invite Friends & Earn Rewards</h2>
          <p>Share your unique referral code with your friends. When they sign up using your code, both of you earn exclusive rewards and cashback on your first transactions!</p>

          <div className="refer-code-box">
            <span className="refer-code-label">Your Referral Code</span>
            <div className="refer-code-display">
              <span className="code-text">{referCode}</span>
              <button className="copy-btn" onClick={handleCopy}>
                <Copy size={20} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button className="share-btn-large" onClick={handleShare}>
            <Share2 size={20} />
            <span>Share with Friends</span>
          </button>

          <div className="how-it-works">
            <h3>How it works?</h3>
            <ul>
              <li>Share your code with friends and family.</li>
              <li>They download the ClubTYL app/web and register using your code.</li>
              <li>You both get amazing cashback rewards instantly!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
