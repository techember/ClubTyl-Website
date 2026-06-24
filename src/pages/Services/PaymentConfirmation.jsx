import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Wallet, ShieldCheck, CheckCircle, Smartphone, CreditCard } from 'lucide-react';
import { getData, postData } from '../../API';
import './PaymentConfirmation.css';

export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { operatorDetail, rechargeData: initialRechargeData, isPrePaid, isDTH, from } = location.state || {};
  const userState = useSelector(state => state.user.user);
  const userData = userState?.Data || userState?.user || userState;
  const userWallet = userData?.wallet?.balance || 0;

  const [loading, setLoading] = useState(false);
  const [fetchingBill, setFetchingBill] = useState(!isPrePaid && !initialRechargeData);
  const [rechargeData, setRechargeData] = useState(initialRechargeData || null);
  const [method, setMethod] = useState('wallet');
  const [mpin, setMpin] = useState('');
  const [showMpinModal, setShowMpinModal] = useState(false);
  const [noBill, setNoBill] = useState(false);

  useEffect(() => {
    if (!isPrePaid && !initialRechargeData) {
      fetchBbpsBill();
    }
  }, []);

  const fetchBbpsBill = async () => {
    setFetchingBill(true);
    try {
      const res = await postData(`/api/cyrus/bbps/new-bill-fetch`, {
        number: operatorDetail?.UniqueId,
        operator: operatorDetail?.op_id,
      });
      if (res.status === 204) {
        setNoBill(true);
        return;
      }
      const data = res?.Data?.data || res?.Data;
      if (data) {
        setRechargeData({
          customerName: data.customerName ?? data.customer_name ?? data.userName ?? 'Unknown',
          number: data.cellNumber ?? operatorDetail?.UniqueId,
          billDate: data.billDate ?? data.billdate ?? null,
          dueDate: data.dueDate ?? data.due ?? null,
          amount: data.amount ?? data.billAmount ?? 0,
          ...data
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching bill. Please check Consumer ID.');
      navigate(-1);
    } finally {
      setFetchingBill(false);
    }
  };

  const handleProceedClick = () => {
    if (method === 'wallet') {
      const amountToPay = Number(rechargeData?.rs || rechargeData?.amount || 0);
      if (userWallet < amountToPay) {
        alert('Insufficient Wallet Balance! Please top up.');
        navigate('/wallet');
        return;
      }
      setShowMpinModal(true);
    } else {
      handleGatewayPayment();
    }
  };

  const handleGatewayPayment = async () => {
    setLoading(true);
    try {
      const amountToPay = Number(rechargeData?.rs || rechargeData?.amount || 0);
      const orderId = `PP${Date.now()}`;
      const purpose = isPrePaid ? `Recharge - ${operatorDetail?.Operator}` : `Bill - ${operatorDetail?.operator_name}`;

      const orderRes = await postData('api/payment/upi/create-order', {
        amount: amountToPay,
        orderId,
        number: operatorDetail?.Mobile || rechargeData?.number,
        note: purpose,
        redirectUrl: window.location.origin + '/payment-success',
      });

      if (orderRes?.Data?.payment_url) {
        window.location.href = orderRes.Data.payment_url;
      } else {
        alert('Unable to generate payment link.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to initiate gateway payment.');
    } finally {
      setLoading(false);
    }
  };

  const verifyMpinAndPay = async () => {
    if (!mpin || mpin.length !== 4) {
      alert('Enter a valid 4-digit MPIN');
      return;
    }
    setLoading(true);
    try {
      const verifyRes = await postData('api/user/mpin-verify', { mPin: mpin });
      if (!verifyRes?.Status) {
        alert('Invalid MPIN');
        setLoading(false);
        return;
      }

      // Execute specific API
      let res;
      if (from === 'googleplay') {
        res = await postData('api/cyrus/bbps/google-play?type=wallet', {
          amount: rechargeData?.amount,
          mobileNumber: rechargeData?.number,
          number: rechargeData?.number,
          ServiceId: operatorDetail?.ServiceId,
          mpin: mpin,
        });
      } else if (isDTH) {
        res = await getData(
          `api/cyrus/dth_request?number=${rechargeData?.customerID || operatorDetail?.Mobile}&operator=${operatorDetail.DthOpCode}&amount=${rechargeData.amount || rechargeData.rs}&mPin=${mpin}&operatorName=${operatorDetail.DthName}&type=wallet`
        );
      } else if (isPrePaid) {
        res = await getData(
          `api/cyrus/recharge_request?number=${operatorDetail?.Mobile}&amount=${rechargeData?.rs}&mPin=${mpin}&operator=${operatorDetail.OpCode}&circle=${operatorDetail.CircleCode}&isPrepaid=true&operatorName=${operatorDetail.Operator}&type=wallet`
        );
      } else {
        res = await postData('api/cyrus/bbps/new-bill-payment?type=wallet', {
          number: rechargeData.number,
          operatorCode: operatorDetail.op_id,
          operatorName: operatorDetail.operator_name,
          operatorId: operatorDetail.op_id,
          amount: rechargeData.amount,
          serviceId: operatorDetail.ServiceId,
          mPin: mpin,
          operatorCategory: operatorDetail.categoryId,
          billDetails: rechargeData,
          ad: operatorDetail.ad || '',
        });
      }

      if (res?.Status) {
        navigate('/payment-success', {
          state: {
            title: 'Payment Successful!',
            message: res?.Message || 'Your request has been processed successfully.',
            amount: rechargeData.amount || rechargeData.rs,
            transactionId: res?.Data?.transactionId || res?.Data?.order_id,
            operatorRefId: res?.Data?.operator_ref_id,
            isGooglePlay: from === 'googleplay'
          }
        });
      } else {
        alert(res?.Remarks || res?.message || 'Payment Failed');
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.Remarks || 'Transaction Error');
    } finally {
      setLoading(false);
      setShowMpinModal(false);
      setMpin('');
    }
  };

  if (fetchingBill) {
    return (
      <div className="center-loader">
        <div className="spinner-blue"></div>
        <p>Fetching your bill details...</p>
      </div>
    );
  }

  if (noBill) {
    return (
      <div className="no-bill-container">
        <h2>No Due Bills!</h2>
        <p>You have no outstanding bills for this connection.</p>
        <button className="go-home-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="payment-confirmation-container">
      <header className="page-header">
        <div className="page-header-left">
          <button className="back-btn-subtle" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="#333" />
          </button>
          <div className="breadcrumb">
            <span>Dashboard</span> <span className="separator">/</span> <span>Payment Confirmation</span>
          </div>
        </div>
      </header>

      <div className="payment-confirmation-content">
        <div className="payment-checkout-grid">
          {/* Left Column: Summary */}
          <div className="checkout-summary-col">
            <div className="checkout-card">
              <h2 className="checkout-title">Transaction Summary</h2>
              
              <div className="summary-amount-display">
                <span className="currency">₹</span>
                <span className="amount">{rechargeData?.rs || rechargeData?.amount}</span>
              </div>
              
              <p className="service-desc">
                {from === 'googleplay' ? 'Google Play Recharge' : isDTH ? 'DTH Recharge' : isPrePaid ? 'Mobile Recharge' : `Bill Payment for ${operatorDetail?.displayname || 'Service'}`}
              </p>

              <div className="details-box">
                <div className="detail-row">
                  <span>Operator</span>
                  <strong>{operatorDetail?.Operator || operatorDetail?.operator_name}</strong>
                </div>
                <div className="detail-row">
                  <span>Number / ID</span>
                  <strong>{operatorDetail?.Mobile || operatorDetail?.UniqueId}</strong>
                </div>
                {isPrePaid && rechargeData?.desc && (
                  <div className="detail-row">
                    <span>Plan Details</span>
                    <strong>{rechargeData.desc}</strong>
                  </div>
                )}
                {!isPrePaid && rechargeData?.customerName && (
                  <div className="detail-row">
                    <span>Customer Name</span>
                    <strong>{rechargeData.customerName}</strong>
                  </div>
                )}
                {!isPrePaid && rechargeData?.dueDate && (
                  <div className="detail-row">
                    <span>Due Date</span>
                    <strong>{rechargeData.dueDate}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Payment */}
          <div className="checkout-payment-col">
            <div className="checkout-card">
              <h3 className="payment-method-title">Select Payment Method</h3>
              <div className="payment-methods-stack">
                <label className={`method-card-web ${method === 'wallet' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="method" 
                    value="wallet" 
                    checked={method === 'wallet'} 
                    onChange={() => setMethod('wallet')} 
                  />
                  <div className="method-info">
                    <Wallet size={20} />
                    <span>ClubTYL Wallet</span>
                  </div>
                </label>

                <label className={`method-card-web ${method === 'pg' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="method" 
                    value="pg" 
                    checked={method === 'pg'} 
                    onChange={() => setMethod('pg')} 
                  />
                  <div className="method-info">
                    <CreditCard size={20} />
                    <span>UPI / Card (Gateway)</span>
                  </div>
                </label>
              </div>

              <button 
                className="proceed-pay-btn" 
                onClick={handleProceedClick}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'PROCEED TO PAY'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium MPIN Modal */}
      {showMpinModal && (
        <div className="modal-overlay">
          <div className="mpin-modal-premium">
            <div className="mpin-header">
              <div className="mpin-icon-wrapper">
                <ShieldCheck size={32} color="#4A00E0" />
              </div>
              <h3>Enter Security PIN</h3>
              <p>Please enter your 4-digit MPIN to authorize this payment of ₹{rechargeData?.rs || rechargeData?.amount}</p>
            </div>
            
            <div className="mpin-input-wrapper">
              <input 
                type="password" 
                maxLength="4" 
                value={mpin} 
                onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                autoFocus
                className="mpin-premium-input"
              />
            </div>
            
            <div className="mpin-actions">
              <button className="mpin-cancel-btn" onClick={() => setShowMpinModal(false)} disabled={loading}>Cancel</button>
              <button className="mpin-verify-btn" onClick={verifyMpinAndPay} disabled={loading || mpin.length < 4}>
                {loading ? <span className="loader-small"></span> : 'Authorize & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
