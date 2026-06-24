import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages to make website super fast
// Handle chunk load errors when a new version is deployed
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return { default: () => <div /> }; // Return empty component while reloading
      }
      throw error;
    }
  });

const Home = lazyWithRetry(() => import('./pages/Home'));
const Terms = lazyWithRetry(() => import('./pages/Terms'));
const Privacy = lazyWithRetry(() => import('./pages/Privacy'));
const Refund = lazyWithRetry(() => import('./pages/Refund'));
const DeleteAccount = lazyWithRetry(() => import('./pages/DeleteAccount'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const About = lazyWithRetry(() => import('./pages/About'));
const FAQ = lazyWithRetry(() => import('./pages/FAQ'));

const Login = lazyWithRetry(() => import('./pages/Auth/Login'));
const Register = lazyWithRetry(() => import('./pages/Auth/Register'));
const OtpVerification = lazyWithRetry(() => import('./pages/Auth/OtpVerification'));
const Dashboard = lazyWithRetry(() => import('./pages/Dashboard/Dashboard'));
const Profile = lazyWithRetry(() => import('./pages/Profile/Profile'));
const ReferAndEarn = lazyWithRetry(() => import('./pages/Profile/ReferAndEarn'));
const WalletTopup = lazyWithRetry(() => import('./pages/Wallet/WalletTopup'));

const Recharge = lazyWithRetry(() => import('./pages/Services/Recharge'));
const DthRecharge = lazyWithRetry(() => import('./pages/Services/DthRecharge'));
const BillPayments = lazyWithRetry(() => import('./pages/Services/BillPayments'));
const ProviderSelection = lazyWithRetry(() => import('./pages/Services/ProviderSelection'));
const PlanSelection = lazyWithRetry(() => import('./pages/Services/PlanSelection'));
const Payment = lazyWithRetry(() => import('./pages/Services/Payment'));
const PaymentConfirmation = lazyWithRetry(() => import('./pages/Services/PaymentConfirmation'));
const PaymentSuccess = lazyWithRetry(() => import('./pages/Services/PaymentSuccess'));
const GooglePlay = lazyWithRetry(() => import('./pages/Services/GooglePlay'));

const Insurance = lazyWithRetry(() => import('./pages/Services/Insurance'));
const Accounting = lazyWithRetry(() => import('./pages/Services/Accounting'));
const HR = lazyWithRetry(() => import('./pages/Services/HR'));

const Reports = lazyWithRetry(() => import('./pages/Reports/Reports'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
  }, [pathname]);

  return null;
};

// Reusable Suspense Wrapper that prevents infinite freeze on back navigation
const LazyWrap = ({ component: Component, isProtected }) => {
  const content = (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(0,0,0,0.1)', borderLeftColor: '#4A00E0', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    }>
      <Component />
    </Suspense>
  );
  return isProtected ? <ProtectedRoute>{content}</ProtectedRoute> : content;
};

function App() {
  return (
    <Router>
      <AutoLogout />
      <ScrollToTop />
      <Navbar />
      <Routes>
          <Route path="/" element={<LazyWrap component={Home} />} />
          <Route path="/login" element={<LazyWrap component={Login} />} />
          <Route path="/register" element={<LazyWrap component={Register} />} />
          <Route path="/otp-verify" element={<LazyWrap component={OtpVerification} />} />
          
          {/* Static Content */}
          <Route path="/terms" element={<LazyWrap component={Terms} />} />
          <Route path="/privacy" element={<LazyWrap component={Privacy} />} />
          <Route path="/refund" element={<LazyWrap component={Refund} />} />
          <Route path="/delete-account" element={<LazyWrap component={DeleteAccount} />} />
          <Route path="/contact" element={<LazyWrap component={Contact} />} />
          <Route path="/about" element={<LazyWrap component={About} />} />
          <Route path="/faq" element={<LazyWrap component={FAQ} />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<LazyWrap component={Dashboard} isProtected />} />
          <Route path="/profile" element={<LazyWrap component={Profile} isProtected />} />
          <Route path="/refer-and-earn" element={<LazyWrap component={ReferAndEarn} isProtected />} />
          <Route path="/wallet" element={<LazyWrap component={WalletTopup} isProtected />} />

          {/* Services */}
          <Route path="/recharge" element={<LazyWrap component={Recharge} isProtected />} />
          <Route path="/dth-recharge" element={<LazyWrap component={DthRecharge} isProtected />} />
          <Route path="/google-play" element={<LazyWrap component={GooglePlay} isProtected />} />
          <Route path="/bill-payments" element={<LazyWrap component={BillPayments} isProtected />} />
          <Route path="/provider-selection" element={<LazyWrap component={ProviderSelection} isProtected />} />
          <Route path="/plan-selection" element={<LazyWrap component={PlanSelection} isProtected />} />
          <Route path="/payment" element={<LazyWrap component={Payment} isProtected />} />
          <Route path="/payment-confirmation" element={<LazyWrap component={PaymentConfirmation} isProtected />} />
          <Route path="/payment-success" element={<LazyWrap component={PaymentSuccess} isProtected />} />
          
          {/* External Lead/Business Services */}
          <Route path="/insurance" element={<LazyWrap component={Insurance} isProtected />} />
          <Route path="/accounting" element={<LazyWrap component={Accounting} isProtected />} />
          <Route path="/hr" element={<LazyWrap component={HR} isProtected />} />

          {/* Reports / Passbook */}
          <Route path="/reports" element={<LazyWrap component={Reports} isProtected />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
