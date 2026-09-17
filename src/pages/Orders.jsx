import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiMapPin, FiCalendar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Orders() {
  const { orders } = useCart();
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  // Return badge style based on order status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Out for Delivery': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700/50';
    }
  };

  // Check which step index corresponds to the status
  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const handleTrackOrder = (order) => {
    setActiveTrackingOrder(order);
    // Scroll smoothly to tracker on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set the default tracking view to the latest order if available
  const currentTrackingOrder = activeTrackingOrder || orders[0];

  const steps = [
    { label: 'Ordered', desc: 'Order placed and confirmed.' },
    { label: 'Processing', desc: 'Order verified and packed at warehouse.' },
    { label: 'Shipped', desc: 'Package handed over to carrier.' },
    { label: 'Out for Delivery', desc: 'Delivery executive is en route.' },
    { label: 'Delivered', desc: 'Delivered successfully to door.' }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-white mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-[#161616] rounded-3xl border border-[#1f1f1f] p-8 max-w-md mx-auto space-y-4">
          <FiPackage className="mx-auto text-zinc-700" size={48} />
          <p className="text-zinc-400 text-sm">You haven't placed any orders yet.</p>
          <Link to="/" className="inline-block bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-6 py-3 rounded-xl transition-all">
            Browse Asian Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left / Main Column: Orders list (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Order History</h2>
            
            {orders.map((order) => {
              const isActiveTrack = currentTrackingOrder?.id === order.id;
              return (
                <div 
                  key={order.id} 
                  className={`rounded-2xl border bg-[#161616] p-5 space-y-4 transition-all ${
                    isActiveTrack ? 'border-brand-red/50 shadow-brand-glow' : 'border-[#1f1f1f] hover:border-zinc-800'
                  }`}
                >
                  {/* Order header row */}
                  <div className="flex flex-wrap gap-3 items-center justify-between border-b border-[#222] pb-3">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 font-medium">Order ID</p>
                      <p className="text-sm font-bold text-white">#AM-{order.id}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="text-xs font-medium text-zinc-500 flex items-center gap-1.5 bg-[#202020] px-2.5 py-1 rounded-md border border-[#2d2d2d]">
                        <FiCalendar size={12} />
                        {order.date}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items list */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.productId || item.product?.id || Math.random()} className="flex gap-3 items-center">
                        <img 
                          src={item.image || (item.product && item.product.images[0])} 
                          alt={item.name || (item.product && item.product.name)} 
                          className="w-10 h-10 object-cover rounded-lg bg-zinc-950 border border-[#222]" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-200 truncate">{item.name || (item.product && item.product.name)}</p>
                          <p className="text-[10px] text-zinc-500">Qty {item.quantity} × ₹{item.price || (item.product && item.product.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order footer summary */}
                  <div className="border-t border-[#222] pt-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-zinc-500 font-medium">Total Paid: </span>
                      <span className="text-sm font-bold text-white">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => handleTrackOrder(order)}
                      className="text-xs font-bold text-brand-peach hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Track Package
                      <FiArrowRight size={12} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Live Tracking widget (1/3 width) */}
          {currentTrackingOrder && (
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#161616] p-5 sm:p-6 space-y-6 lg:sticky lg:top-24">
              <div className="border-b border-[#222] pb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FiTruck size={16} className="text-brand-red" />
                  Live Delivery Tracker
                </h3>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wide">Tracking order #AM-{currentTrackingOrder.id}</p>
              </div>

              {/* Step timeline progress display */}
              <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                
                {steps.map((step, idx) => {
                  const activeStepIndex = getStatusStepIndex(currentTrackingOrder.status);
                  const isCompleted = idx <= activeStepIndex;
                  const isCurrent = idx === activeStepIndex;
                  
                  // Get timestamp for step
                  const stepTime = currentTrackingOrder.trackingTimeline?.find(t => t.status === step.label)?.time || 
                                   (idx === 0 ? currentTrackingOrder.date : '');

                  return (
                    <div key={idx} className="relative text-xs">
                      
                      {/* Timeline status indicator node */}
                      <span className={`absolute -left-[23px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                        isCompleted 
                          ? 'bg-brand-red border-brand-red text-white' 
                          : 'bg-[#161616] border-[#2d2d2d] text-zinc-700'
                      }`}>
                        {isCompleted && <FiCheckCircle size={10} className="stroke-[3]" />}
                      </span>

                      {/* Timeline label text details */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`font-bold uppercase tracking-wider ${isCompleted ? 'text-white' : 'text-zinc-600'}`}>
                            {step.label}
                          </h4>
                          {stepTime && (
                            <span className="text-[9px] text-zinc-500 font-mono">{stepTime}</span>
                          )}
                        </div>
                        <p className={`text-[10px] font-light leading-relaxed ${isCompleted ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {isCurrent ? (currentTrackingOrder.trackingTimeline?.find(t => t.status === step.label)?.desc || step.desc) : step.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Shipping address details info */}
              <div className="border-t border-[#222] pt-4 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FiMapPin size={14} className="text-brand-peach" />
                  Shipping Address
                </h4>
                <div className="text-[10px] text-zinc-500 font-light leading-relaxed">
                  <p className="font-semibold text-zinc-300">{currentTrackingOrder.shippingAddress.fullName}</p>
                  <p className="mt-0.5">{currentTrackingOrder.shippingAddress.addressLine1}</p>
                  {currentTrackingOrder.shippingAddress.addressLine2 && <p>{currentTrackingOrder.shippingAddress.addressLine2}</p>}
                  <p>{currentTrackingOrder.shippingAddress.city}, {currentTrackingOrder.shippingAddress.state} - {currentTrackingOrder.shippingAddress.pincode}</p>
                  <p className="mt-1">Contact: +91 {currentTrackingOrder.shippingAddress.mobileNumber}</p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
