import React, { useState } from 'react';
import { FiUser, FiGift, FiCopy, FiCheck, FiInfo, FiTrendingUp, FiShield, FiSliders, FiLock, FiTerminal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { user, coins, orders, products } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user?.referralCode || 'AM-AARAV50');
    setCopied(true);
    toast.success('Referral code copied to clipboard!', {
      style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Compile coin transaction ledger history dynamically for standard members
  const coinHistory = [
    { desc: 'New Account Welcome Reward', amount: 150, date: 'July 5, 2026', type: 'credit' }
  ];

  orders.forEach(order => {
    const points = Math.floor(order.totalAmount * 0.1);
    if (points > 0) {
      coinHistory.push({
        desc: `Earned points from purchase #AM-${order.id}`,
        amount: points,
        date: order.date,
        type: 'credit'
      });
    }
  });

  // ==========================================
  // SPECIAL ADMIN OVERSEER PROFILE VIEW
  // ==========================================
  if (user?.isAdmin) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
        
        {/* Admin Executive Header Banner */}
        <div className="rounded-3xl border-2 border-brand-red/40 bg-brand-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="h-20 w-20 rounded-2xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0 shadow-[0_0_25px_rgba(229,9,20,0.2)]">
              <FiShield size={38} />
            </div>
            <div className="space-y-1.5">
              <span className="bg-brand-red/20 text-brand-red text-[10px] px-3 py-1 rounded-full border border-brand-red/30 font-black uppercase tracking-widest">
                🛡️ EXECUTIVE OVERSEER & ADMINISTRATOR
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight mt-1">{user.name}</h1>
              <p className="text-xs text-brand-secondary font-mono">{user.email} · System Role: Superuser</p>
            </div>
          </div>
          <div className="bg-brand-bg rounded-2xl border border-brand-border p-4 text-center shrink-0 w-full sm:w-auto shadow-sm">
            <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1.5">Security Level</span>
            <span className="text-sm font-black text-green-500 flex items-center justify-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Level 5 (Full Access)
            </span>
            <span className="text-[10px] text-brand-secondary block mt-1">Gateway Diagnostics Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Admin Command Center Quick Summary */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-brand-border bg-brand-card p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                <h2 className="text-base font-bold text-brand-primary flex items-center gap-2">
                  <FiSliders className="text-brand-red" />
                  Executive Control Capabilities
                </h2>
                <Link
                  to="/admin"
                  className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-brand-glow flex items-center gap-1.5"
                >
                  Go to Admin Console →
                </Link>
              </div>
              
              <p className="text-xs text-brand-secondary leading-relaxed">
                As a designated System Administrator, consumer marketing programs (such as 10% loyalty cashback, coin ledger rewards, and referral friend discounts) are automatically disabled for your session to provide a clean, distraction-free auditing workspace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-brand-bg rounded-xl border border-brand-border p-4 space-y-2">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-2">
                    📦 Catalog Oversight
                  </span>
                  <p className="text-[11px] text-brand-secondary">
                    You currently oversee <strong className="text-brand-primary">{products.length} listed products</strong> across Japan, Korea, Thailand & China regions.
                  </p>
                </div>
                <div className="bg-brand-bg rounded-xl border border-brand-border p-4 space-y-2">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-2">
                    ⚡ Live Transaction Feed
                  </span>
                  <p className="text-[11px] text-brand-secondary">
                    You have visibility over <strong className="text-brand-primary">{orders.length} total customer orders</strong> with full state-override permissions.
                  </p>
                </div>
              </div>
            </div>

            {/* System Status Log */}
            <div className="rounded-2xl border border-brand-border bg-brand-card p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <FiTerminal className="text-brand-red" />
                Live Gateway & Database Diagnostics
              </h3>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center bg-brand-bg p-3 rounded-xl border border-brand-border/60">
                  <span className="text-brand-secondary">Razorpay Payments Integration</span>
                  <span className="text-green-500 font-bold">● Operational & Secured</span>
                </div>
                <div className="flex justify-between items-center bg-brand-bg p-3 rounded-xl border border-brand-border/60">
                  <span className="text-brand-secondary">Inventory Low Stock Triggers</span>
                  <span className="text-green-500 font-bold">● Active Alerts Enabled</span>
                </div>
                <div className="flex justify-between items-center bg-brand-bg p-3 rounded-xl border border-brand-border/60">
                  <span className="text-brand-secondary">Session Authentication Mode</span>
                  <span className="text-brand-peach font-bold">🔒 JWT Overseer Token</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Privilege Checklist Card */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 space-y-5 h-fit shadow-sm">
            <div className="border-b border-brand-border/60 pb-3">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <FiLock className="text-brand-red" />
                Overseer Permissions
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs text-brand-secondary">
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0"></span>
                <span>Create, Edit & Delete Products</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0"></span>
                <span>Manage Order Fulfillment Tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0"></span>
                <span>Perform Live Checkout QA Tests</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0"></span>
                <span>Bypass Consumer Coupon Solicitations</span>
              </li>
            </ul>
            <Link
              to="/admin"
              className="w-full mt-4 block text-center bg-brand-bg hover:bg-brand-card-hover text-brand-primary font-bold py-3 rounded-xl border border-brand-border transition-all text-xs"
            >
              Open Inventory Suite →
            </Link>
          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // STANDARD MEMBER / CUSTOMER PROFILE VIEW
  // ==========================================
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Profile Overview banner card */}
      <div className="rounded-3xl border border-brand-border bg-brand-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 mb-8 shadow-sm">
        <div className="h-20 w-20 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shrink-0">
          <FiUser size={36} />
        </div>
        <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
          <span className="bg-brand-red/10 text-brand-red text-[10px] px-2.5 py-0.5 rounded-full border border-brand-red/20 font-bold uppercase tracking-wider">
            👑 VIP Member
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-brand-primary truncate mt-1">{user?.name || 'Valued Member'}</h1>
          <p className="text-xs text-brand-secondary truncate">{user?.email || 'member@example.com'}</p>
        </div>
        <div className="bg-brand-bg rounded-2xl border border-brand-border p-4 text-center shrink-0 shadow-sm">
          <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1">Coin Balance</span>
          <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
            🪙
            {coins}
          </span>
          <span className="text-[10px] text-brand-secondary block mt-1">Value: <strong className="text-brand-primary">₹{coins}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Coins details & ledger logs (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Coin Rules Details Card */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-brand-primary flex items-center gap-2">
              <FiInfo className="text-brand-red" />
              AsiaMart Rewards Program
            </h2>
            <p className="text-xs text-brand-secondary font-light leading-relaxed">
              Earn as you shop! Every order placed on AsiaMart awards you <strong className="text-brand-primary">10% of the total amount back</strong> as AsiaMart loyalty coins. You can redeem these coins at checkout for instant discounts on future purchases.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="bg-brand-bg rounded-xl border border-brand-border p-3 shadow-sm">
                <span className="text-brand-primary block font-bold text-lg">10%</span>
                <span className="text-[10px] text-brand-secondary">Coins Cashback</span>
              </div>
              <div className="bg-brand-bg rounded-xl border border-brand-border p-3 shadow-sm">
                <span className="text-brand-primary block font-bold text-lg">1 Coin</span>
                <span className="text-[10px] text-brand-secondary">= ₹1 Discount</span>
              </div>
              <div className="bg-brand-bg rounded-xl border border-brand-border p-3 shadow-sm">
                <span className="text-green-500 block font-bold text-lg">Unlimited</span>
                <span className="text-[10px] text-brand-secondary">Coin Expiry</span>
              </div>
            </div>
          </div>

          {/* Coin Ledger transaction history */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-brand-primary flex items-center gap-2">
              <FiTrendingUp className="text-brand-red" />
              Coin Ledger Logs
            </h2>
            
            <div className="divide-y divide-brand-border/60 text-xs">
              {coinHistory.reverse().map((txn, idx) => (
                <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-semibold text-brand-primary">{txn.desc}</p>
                    <p className="text-[10px] text-brand-secondary">{txn.date}</p>
                  </div>
                  <span className={`font-mono font-bold text-sm ${txn.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                    {txn.type === 'credit' ? '+' : '-'}{txn.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Referrals widget (1/3 width) */}
        <div className="rounded-2xl border border-brand-border bg-brand-card p-5 sm:p-6 space-y-5 shadow-sm">
          <div className="border-b border-brand-border/60 pb-4">
            <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
              <FiGift size={16} className="text-brand-red" />
              Refer & Earn Program
            </h3>
            <p className="text-xs text-brand-secondary mt-1 font-light leading-relaxed">
              Invite friends to shop! They get ₹100 off their first order, and you earn <strong className="text-brand-primary">100 Coins (worth ₹100)</strong> when they make a purchase!
            </p>
          </div>

          {/* Referral Code Copy Card */}
          <div className="bg-brand-bg rounded-xl border border-brand-border p-4 text-center space-y-2.5 shadow-sm">
            <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block">Your Referral Code</span>
            <div className="flex bg-brand-card border border-brand-border rounded-lg p-2 items-center justify-between shadow-sm">
              <span className="text-sm font-mono font-black text-brand-primary pl-2 select-all uppercase">
                {user?.referralCode || 'AM-AARAV50'}
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-brand-red hover:bg-brand-red-hover text-white p-2 rounded-md transition-colors cursor-pointer shadow-sm"
                title="Copy code"
              >
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
            </div>
          </div>

          {/* Social icons links mock */}
          <div className="space-y-2.5 text-xs">
            <h4 className="text-brand-secondary text-[10px] uppercase font-bold tracking-wider">Quick Share</h4>
            <div className="grid grid-cols-2 gap-2 text-center font-bold">
              <a href="#" onClick={(e) => {e.preventDefault(); toast.success('WhatsApp referral text copied!');}} className="bg-green-600/10 border border-green-600/20 text-green-500 hover:bg-green-600/20 py-2 rounded-lg transition-all">
                WhatsApp
              </a>
              <a href="#" onClick={(e) => {e.preventDefault(); toast.success('Telegram referral link generated!');}} className="bg-blue-600/10 border border-blue-600/20 text-blue-500 hover:bg-blue-600/20 py-2 rounded-lg transition-all">
                Telegram
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
