import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';

import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import DeleteAccount from './pages/DeleteAccount';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import OtpVerification from './pages/Auth/OtpVerification';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import ReferAndEarn from './pages/Profile/ReferAndEarn';
import WalletTopup from './pages/Wallet/WalletTopup';
import Recharge from './pages/Services/Recharge';
import DthRecharge from './pages/Services/DthRecharge';
import BillPayments from './pages/Services/BillPayments';
import ProviderSelection from './pages/Services/ProviderSelection';
import PlanSelection from './pages/Services/PlanSelection';
import Payment from './pages/Services/Payment';
import PaymentConfirmation from './pages/Services/PaymentConfirmation';
import PaymentSuccess from './pages/Services/PaymentSuccess';
import Insurance from './pages/Services/Insurance';
import Accounting from './pages/Services/Accounting';
import HR from './pages/Services/HR';
import Reports from './pages/Reports/Reports';
import ProtectedRoute from './components/ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <AutoLogout />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/refer" element={<ProtectedRoute><ReferAndEarn /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><WalletTopup /></ProtectedRoute>} />
        
        {/* Services */}
        <Route path="/recharge" element={<ProtectedRoute><Recharge /></ProtectedRoute>} />
        <Route path="/dth-recharge" element={<ProtectedRoute><DthRecharge /></ProtectedRoute>} />
        <Route path="/bill-payments" element={<ProtectedRoute><BillPayments /></ProtectedRoute>} />
        <Route path="/provider-selection" element={<ProtectedRoute><ProviderSelection /></ProtectedRoute>} />
        <Route path="/plan-selection" element={<ProtectedRoute><PlanSelection /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment-confirmation" element={<ProtectedRoute><PaymentConfirmation /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />

        {/* Business & Services */}
        <Route path="/insurance" element={<ProtectedRoute><Insurance /></ProtectedRoute>} />
        <Route path="/accounting" element={<ProtectedRoute><Accounting /></ProtectedRoute>} />
        <Route path="/hr" element={<ProtectedRoute><HR /></ProtectedRoute>} />
        
        {/* Reports / Passbook */}
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
