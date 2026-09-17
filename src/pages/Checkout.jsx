import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiShield, FiTrash2, FiPlus, FiMinus, FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiCalendar, FiShoppingBag, FiAward, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart, addOrder, coins, redeemCoins, isAuthenticated, setIsAuthModalOpen, token, user } = useCart();
  const navigate = useNavigate();
  const [useCoins, setUseCoins] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated, navigate, setIsAuthModalOpen]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: user?.address?.fullName || '',
    mobileNumber: user?.address?.mobileNumber || '',
    addressLine1: user?.address?.addressLine1 || '',
    addressLine2: user?.address?.addressLine2 || '',
    pincode: user?.address?.pincode || '',
    city: user?.address?.city || '',
    state: user?.address?.state || ''
  });

  // Auto-fill if user object loads after initial render
  useEffect(() => {
    if (user?.address) {
      setFormData(user.address);
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price Calculations
  const packagingFee = cart.length > 0 ? 50 : 0;
  const deliveryFee = 0; // Free
  const coinsDiscount = useCoins ? Math.min(coins, cartTotal) : 0;
  const totalAmount = cartTotal + packagingFee + deliveryFee - coinsDiscount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQtyChange = (productId, delta) => {
    updateQuantity(productId, delta);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    // Check if cart is empty
    if (cart.length === 0) {
      toast.error('Your cart is empty!', {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      return;
    }

    // Validate form fields
    const { fullName, mobileNumber, addressLine1, pincode, city, state } = formData;
    if (!fullName || !mobileNumber || !addressLine1 || !pincode || !city || !state) {
      toast.error('Please fill in all shipping details.', {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number.', {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit PIN code.', {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      return;
    }

    // Process payment via API
    setIsSubmitting(true);
    
    const paymentPayload = {
      amount: totalAmount,
      method: paymentMethod,
      cardNumber: '4111111111111111', // Dummy data for mock UI
      expiry: '12/25',
      cvv: '123'
    };

    const processPayment = async () => {
      // 1. If Cash on Delivery, bypass network entirely
      if (paymentMethod === 'cod') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ transactionId: `cod_${Math.random().toString(36).substr(2, 9)}` });
          }, 1000); // 1-second simulation delay
        });
      }

      // 2. Load Razorpay script dynamically
      const resScript = await loadRazorpayScript();
      if (!resScript) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 3. Call backend to create Razorpay order
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: totalAmount })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment processing failed');
      
      if (!data.keyId) {
        throw new Error('Razorpay API Key is missing. Please ensure your backend server has been restarted after updating the .env file!');
      }

      // 4. Open Razorpay UI and wait for payment
      return new Promise((resolve, reject) => {
        const options = {
          key: data.keyId,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "AsiaMart",
          description: "Order Payment",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              // 5. Verify signature on our backend
              const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              const verifyData = await verifyRes.json();
              
              if (verifyData.success) {
                resolve({ transactionId: response.razorpay_payment_id });
              } else {
                reject(new Error(verifyData.message || 'Signature verification failed.'));
              }
            } catch (err) {
              reject(new Error('Payment verification failed.'));
            }
          },
          prefill: {
            name: formData.fullName,
            contact: formData.mobileNumber
          },
          theme: {
            color: "#e23636"
          },
          modal: {
            ondismiss: function() {
              reject(new Error('Payment cancelled by user.'));
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response){
           reject(new Error(response.error.description || 'Payment Failed'));
        });
        rzp.open();
      });
    };

    toast.promise(
      processPayment(),
      {
        loading: 'Connecting to secure payment gateway...',
        success: (data) => (
          <div className="text-sm">
            <p className="font-bold text-brand-primary">Payment Successful!</p>
            <p className="text-brand-secondary mt-0.5 text-xs">Transaction ID: {data.transactionId}</p>
          </div>
        ),
        error: (err) => err.message
      },
      {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' },
        success: { duration: 3000 }
      }
    ).then(async (data) => {
      const timestamp = new Date().toLocaleString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      });
      const paymentMethodNames = {
        upi: 'UPI / QR Code',
        card: 'Credit / Debit Card',
        cod: 'Cash on Delivery (COD)'
      };

      const orderRes = await addOrder({
        date: timestamp,
        items: cart,
        totalAmount: totalAmount,
        status: 'Processing',
        shippingAddress: formData,
        useCoins: useCoins,
        coinsDiscount: coinsDiscount,
        paymentMethod: paymentMethodNames[paymentMethod] || paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        trackingTimeline: [
          { status: 'Ordered', time: timestamp, desc: 'Order placed and confirmed successfully.' },
          { status: 'Processing', time: timestamp, desc: 'Your order has been verified and is being prepared in our local warehouse.' }
        ]
      });
      if (useCoins && typeof redeemCoins === 'function') {
        redeemCoins(coinsDiscount);
      }
      setIsSubmitting(false);



      setOrderSuccessData({
        orderId: orderRes?.order?.id || orderRes?.order?._id || Math.floor(100000 + Math.random() * 900000),
        transactionId: data?.transactionId || `TXN_${Date.now()}`,
        date: timestamp,
        items: [...cart],
        totalAmount: totalAmount,
        cartTotal: cartTotal,
        packagingFee: packagingFee,
        coinsDiscount: useCoins ? coinsDiscount : 0,
        paymentMethod: paymentMethodNames[paymentMethod] || paymentMethod,
        shippingAddress: { ...formData },
        coinsEarned: Math.floor(totalAmount * 0.1)
      });
      clearCart();
    }).catch(() => {
      setIsSubmitting(false);
    });
  };

  const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
  ];

  if (orderSuccessData) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Success Header Box */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-24 h-24 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.25)]">
            <FiCheckCircle size={52} className="text-green-500" />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-green-500/20">
            <FiCheck size={14} className="stroke-[3]" />
            Order Confirmed
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-brand-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Thank you for shopping with <span className="text-brand-peach font-bold">AsiaMart</span>! We have received your payment and our local warehouse team is packing your Asian delicacies right now.
          </p>
        </div>

        {/* Metadata Banner Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-brand-card rounded-2xl border border-brand-border p-5 sm:p-6 mb-8 shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Order ID</span>
            <p className="text-sm sm:text-base font-extrabold text-brand-primary font-mono">#AM-{orderSuccessData.orderId}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Payment Method</span>
            <p className="text-sm sm:text-base font-bold text-brand-primary">{orderSuccessData.paymentMethod}</p>
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Transaction ID</span>
            <p className="text-xs sm:text-sm font-semibold text-brand-peach font-mono truncate" title={orderSuccessData.transactionId}>{orderSuccessData.transactionId}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Est. Delivery</span>
            <p className="text-sm sm:text-base font-extrabold text-green-400 flex items-center gap-1.5">
              <FiTruck size={15} />
              2 - 4 Days
            </p>
          </div>
        </div>

        {/* Cashback Coins Reward Banner */}
        {orderSuccessData.coinsEarned > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 via-brand-red/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-8 flex items-center justify-between shadow-[0_0_25px_rgba(245,158,11,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0 border border-amber-500/30">
                🪙
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-amber-400 flex items-center gap-2">
                  Coins Cashback Unlocked!
                  <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-black uppercase">10% Reward</span>
                </h4>
                <p className="text-xs text-brand-secondary mt-0.5">
                  You earned <strong className="text-amber-400">{orderSuccessData.coinsEarned} AsiaMart Coins</strong> from this purchase! Use them for instant discounts on your next order.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <FiAward size={16} />
              Added to Wallet
            </div>
          </div>
        )}

        {/* Detailed Two Column Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Left Column: Shipping Address & Delivery Tracker Preview */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-4">
                <h3 className="text-base font-bold text-brand-primary flex items-center gap-2">
                  <FiMapPin size={18} className="text-brand-red" />
                  Shipping Details
                </h3>
                <span className="text-[11px] font-bold text-brand-secondary bg-brand-bg px-2.5 py-1 rounded-md border border-brand-border">
                  Verified Address
                </span>
              </div>
              
              <div className="text-xs sm:text-sm text-brand-secondary space-y-1.5 leading-relaxed font-light">
                <p className="font-bold text-brand-primary text-sm">{orderSuccessData.shippingAddress.fullName}</p>
                <p>{orderSuccessData.shippingAddress.addressLine1}</p>
                {orderSuccessData.shippingAddress.addressLine2 && <p>{orderSuccessData.shippingAddress.addressLine2}</p>}
                <p className="font-medium text-brand-primary">{orderSuccessData.shippingAddress.city}, {orderSuccessData.shippingAddress.state} - {orderSuccessData.shippingAddress.pincode}</p>
                <div className="pt-2 mt-2 border-t border-brand-border/50 flex items-center gap-2 text-brand-primary font-medium">
                  <span className="text-brand-secondary font-normal">Contact Number:</span>
                  +91 {orderSuccessData.shippingAddress.mobileNumber}
                </div>
              </div>
            </div>

            {/* Quick Timeline Status */}
            <div className="bg-brand-bg rounded-xl border border-brand-border p-4 mt-6">
              <h4 className="text-xs font-bold text-brand-primary mb-3 flex items-center gap-2">
                <FiPackage size={14} className="text-brand-peach" />
                Live Status: <span className="text-green-400">Processing at Local Warehouse</span>
              </h4>
              <div className="w-full bg-brand-card-hover h-2 rounded-full overflow-hidden flex">
                <div className="w-1/4 bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-1000 animate-pulse"></div>
              </div>
              <p className="text-[11px] text-brand-secondary mt-2">
                We will send SMS updates to <strong>+91 {orderSuccessData.shippingAddress.mobileNumber}</strong> once out for delivery.
              </p>
            </div>
          </div>

          {/* Right Column: Items Summary & Financial Breakdown */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-4">
                <h3 className="text-base font-bold text-brand-primary flex items-center gap-2">
                  <FiShoppingBag size={18} className="text-brand-red" />
                  Order Summary ({orderSuccessData.items.reduce((acc, i) => acc + i.quantity, 0)} {orderSuccessData.items.length === 1 ? 'item' : 'items'})
                </h3>
                <span className="text-[11px] font-mono text-brand-secondary">
                  {orderSuccessData.date}
                </span>
              </div>

              {/* Scrollable list of ordered items */}
              <div className="divide-y divide-brand-border max-h-52 overflow-y-auto pr-1 space-y-3">
                {orderSuccessData.items.map(({ product, quantity }, idx) => (
                  <div key={product.id || idx} className="flex gap-3 items-center pt-3 first:pt-0">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-xl bg-brand-bg border border-brand-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-brand-primary text-xs sm:text-sm font-semibold truncate">{product.name}</h5>
                      <p className="text-brand-secondary text-[11px]">{product.country} Section · Qty: <strong className="text-brand-primary">{quantity}</strong></p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-brand-primary block">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-brand-secondary block">₹{product.price} each</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="border-t border-brand-border pt-4 space-y-2.5 text-xs sm:text-sm mt-4">
              <div className="flex justify-between text-brand-secondary">
                <span>Subtotal ({orderSuccessData.items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="text-brand-primary font-semibold">₹{orderSuccessData.cartTotal.toLocaleString('en-IN')}</span>
              </div>
              {orderSuccessData.coinsDiscount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>AsiaMart Coins Redeemed</span>
                  <span className="font-bold">-₹{orderSuccessData.coinsDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-secondary">
                <span>Packaging Fee</span>
                <span className="text-brand-primary font-semibold">₹{orderSuccessData.packagingFee}</span>
              </div>
              <div className="flex justify-between text-brand-secondary">
                <span>Delivery Charges</span>
                <span className="text-green-400 font-bold uppercase">FREE</span>
              </div>
              
              <div className="border-t border-brand-border pt-3.5 flex justify-between items-baseline">
                <span className="text-sm font-bold text-brand-primary">Grand Total Paid</span>
                <span className="text-xl sm:text-2xl font-black text-brand-peach">₹{orderSuccessData.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto">
          <Link
            to="/orders"
            className="w-full sm:flex-1 bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 rounded-xl shadow-brand-glow flex items-center justify-center gap-2 text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
          >
            <FiPackage size={18} />
            Track My Order
          </Link>
          <Link
            to="/"
            className="w-full sm:flex-1 bg-brand-card hover:bg-brand-card-hover text-brand-primary border border-brand-border hover:border-zinc-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
          >
            <FiShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      

      {/* Checkout Navbar Header */}
      <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6">
        <Link to="/" className="text-brand-secondary hover:text-brand-primary flex items-center gap-2 text-xs font-semibold">
          <FiArrowLeft size={16} />
          Back to Shopping
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-brand-peach font-bold uppercase tracking-wider">
          <FiLock size={12} className="text-brand-red" />
          Secure Checkout
        </div>
      </div>

      <h1 className="text-2xl font-black text-brand-primary mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-brand-card rounded-3xl border border-brand-border p-8 max-w-md mx-auto space-y-4">
          <p className="text-brand-secondary">Your shopping cart is currently empty.</p>
          <Link to="/" className="inline-block bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold px-6 py-3 rounded-xl transition-all">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Summary and Shipping form (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Summary Card */}
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6">
              <h2 className="text-base font-bold text-brand-primary mb-4 border-b border-brand-border pb-3">
                Order Summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h2>

              <div className="divide-y divide-brand-border max-h-80 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 items-center justify-between py-4 first:pt-0 last:pb-0">
                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-xl bg-brand-bg border border-brand-border" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-brand-primary text-sm font-semibold truncate">{product.name}</h4>
                      <p className="text-brand-secondary text-xs mt-0.5">{product.country} Section</p>
                      
                      {/* Quantity controls in card */}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-brand-border rounded-md bg-brand-card-hover px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.id, -1)}
                            disabled={quantity <= 1}
                            className="p-1 text-brand-secondary hover:text-brand-primary disabled:opacity-30 cursor-pointer"
                          >
                            <FiMinus size={10} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-brand-primary select-none">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.id, 1)}
                            disabled={quantity >= product.stock}
                            className="p-1 text-brand-secondary hover:text-brand-primary disabled:opacity-30 cursor-pointer"
                          >
                            <FiPlus size={10} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(product.id)}
                          className="text-brand-secondary hover:text-brand-red text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <FiTrash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-brand-primary block">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-brand-secondary mt-0.5 block">₹{product.price} each</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information Form Card */}
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6">
              <h2 className="text-base font-bold text-brand-primary mb-5 border-b border-brand-border pb-3">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Mobile Number */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Mobile Number (For Delivery Updates)</label>
                  <div className="flex">
                    <span className="bg-brand-card-hover text-brand-primary text-sm font-semibold px-4 py-2.5 rounded-l-lg border-y border-l border-brand-border select-none flex items-center justify-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-r-lg border border-brand-border focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                {/* Flat, Building, etc */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Flat, House no., Building, Company, Apartment</label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    placeholder="E.g., Apartment 4B, Lotus Tower"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Area, Street, etc */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Area, Street, Sector, Village</label>
                  <input
                    type="text"
                    name="addressLine2"
                    placeholder="E.g., Sector 62, Landmark Building"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    placeholder="6 digits [0-9] PIN"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Town/City */}
                <div>
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">Town/City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="E.g., New Delhi"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* State */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-brand-secondary block mb-1.5 uppercase tracking-wider">State</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg text-sm text-brand-primary px-4 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red cursor-pointer"
                  >
                    <option value="" disabled>Choose a state</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Payments and price summary (1/3 width) */}
          <div className="space-y-6">
            
            {/* Payment Method Selection Card */}
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6">
              <h2 className="text-base font-bold text-brand-primary mb-4 border-b border-brand-border pb-3">Payment Method</h2>
              <div className="space-y-3">
                
                {/* UPI Option */}
                <label className={`flex gap-3 items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'upi' ? 'border-brand-red bg-brand-red/5' : 'border-brand-border bg-brand-card hover:bg-brand-card-hover'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="h-4 w-4 text-brand-red bg-brand-card-hover border-brand-border focus:ring-0 accent-brand-red mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">UPI / QR Code</h4>
                    <p className="text-[10px] text-brand-secondary mt-0.5">Google Pay, PhonePe, Paytm</p>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex gap-3 items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'card' ? 'border-brand-red bg-brand-red/5' : 'border-brand-border bg-brand-card hover:bg-brand-card-hover'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-brand-red bg-brand-card-hover border-brand-border focus:ring-0 accent-brand-red mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">Credit / Debit Card</h4>
                    <p className="text-[10px] text-brand-secondary mt-0.5">Visa, Mastercard, RuPay</p>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`flex gap-3 items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-brand-red bg-brand-red/5' : 'border-brand-border bg-brand-card hover:bg-brand-card-hover'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-brand-red bg-brand-card-hover border-brand-border focus:ring-0 accent-brand-red mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-brand-primary">Cash on Delivery</h4>
                    <p className="text-[10px] text-brand-secondary mt-0.5">Pay when you receive</p>
                  </div>
                </label>

              </div>
            </div>

            {/* Price Details Card */}
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-bold text-brand-primary border-b border-brand-border pb-3">Price Details</h2>
              
              {/* Redeem coins option */}
              {coins > 0 && (
                <div className="bg-brand-bg rounded-xl border border-brand-border p-3 flex items-center justify-between text-xs mb-2">
                  <div className="space-y-0.5">
                    <p className="font-bold text-brand-primary">Redeem AsiaMart Coins</p>
                    <p className="text-[10px] text-brand-secondary font-light">Balance: 🪙{coins} (Save ₹{Math.min(coins, cartTotal)})</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={useCoins}
                    onChange={(e) => setUseCoins(e.target.checked)}
                    className="h-4 w-4 rounded border-brand-border bg-brand-card-hover text-brand-red focus:ring-0 accent-brand-red cursor-pointer"
                  />
                </div>
              )}

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-brand-secondary">
                  <span>Price ({cartCount} items)</span>
                  <span className="text-brand-primary font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                {coinsDiscount > 0 && (
                  <div className="flex justify-between text-brand-secondary">
                    <span>Coins Redeemed</span>
                    <span className="text-green-500 font-semibold">-₹{coinsDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-secondary">
                  <span>Delivery Charges</span>
                  <span className="text-green-500 font-semibold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-brand-secondary">
                  <span>Packaging Fee</span>
                  <span className="text-brand-primary font-semibold">₹{packagingFee}</span>
                </div>
              </div>

              <div className="border-t border-brand-border pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-brand-primary">Total Amount</span>
                <span className="text-xl font-extrabold text-brand-peach">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-brand-glow disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <FiLock size={14} />
                    Proceed to Pay 
                  </>
                )}
              </button>

              <div className="text-[10px] text-brand-secondary text-center flex items-center justify-center gap-1.5 pt-1">
                <FiShield size={12} className="text-brand-peach" />
                <span>Safe and Secure Payments. Easy returns.</span>
              </div>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
