import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages to make website super fast
const Home = lazy(() => import('./pages/Home'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Refund = lazy(() => import('./pages/Refund'));
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const OtpVerification = lazy(() => import('./pages/Auth/OtpVerification'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ReferAndEarn = lazy(() => import('./pages/Profile/ReferAndEarn'));
const WalletTopup = lazy(() => import('./pages/Wallet/WalletTopup'));

const Recharge = lazy(() => import('./pages/Services/Recharge'));
const DthRecharge = lazy(() => import('./pages/Services/DthRecharge'));
const BillPayments = lazy(() => import('./pages/Services/BillPayments'));
const ProviderSelection = lazy(() => import('./pages/Services/ProviderSelection'));
const PlanSelection = lazy(() => import('./pages/Services/PlanSelection'));
const Payment = lazy(() => import('./pages/Services/Payment'));
const PaymentConfirmation = lazy(() => import('./pages/Services/PaymentConfirmation'));
const PaymentSuccess = lazy(() => import('./pages/Services/PaymentSuccess'));
const GooglePlay = lazy(() => import('./pages/Services/GooglePlay'));

const Insurance = lazy(() => import('./pages/Services/Insurance'));
const Accounting = lazy(() => import('./pages/Services/Accounting'));
const HR = lazy(() => import('./pages/Services/HR'));

const Reports = lazy(() => import('./pages/Reports/Reports'));

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
