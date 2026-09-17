import React, { useState } from 'react';
import { FiX, FiLock, FiMail, FiUser, FiGift, FiEye, FiEyeOff } from 'react-icons/fi';

import { useCart } from '../context/CartContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, socialLogin } = useCart();
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form State for normal email login/register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);

    let res;
    if (isLoginView) {
      res = await login(email, password);
    } else {
      if (!name) {
        setLoading(false);
        return;
      }
      res = await register(name, email, password, referralCode);
    }

    setLoading(false);
    if (res?.success) {
      handleClose();
      // Reset forms
      setName('');
      setEmail('');
      setPassword('');
      setReferralCode('');
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close (disabled during loading) */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-sm rounded-2xl border border-brand-border bg-brand-card p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto scrollbar-none space-y-4">
        
        {/* Close Button */}
        {!loading && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary p-1 cursor-pointer transition-colors"
          >
            <FiX size={20} />
          </button>
        )}

        {/* Heading */}
        <div className="text-center space-y-1 pt-1">
          <h3 className="text-lg font-bold text-brand-primary uppercase tracking-wider">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-[10px] text-brand-secondary font-light">
            {isLoginView ? 'Log in to access your orders and loyalty rewards.' : 'Register now to unlock instant 150 welcome coins!'}
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs pt-1">
          
          {/* Register Name field */}
          {!isLoginView && (
            <div className="space-y-1">
              <label className="text-brand-secondary font-bold block">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                  <FiUser size={14} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-bg text-brand-primary pl-9 pr-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red placeholder-brand-secondary"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label className="text-brand-secondary font-bold block">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                <FiMail size={14} />
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-bg text-brand-primary pl-9 pr-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red placeholder-brand-secondary"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="text-brand-secondary font-bold block">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                <FiLock size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-bg text-brand-primary pl-9 pr-10 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red placeholder-brand-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-primary focus:outline-none cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
              </button>
            </div>
          </div>

          {/* Register Referral Code field */}
          {!isLoginView && (
            <div className="space-y-1">
              <label className="text-brand-secondary font-bold block">Referral Code (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary">
                  <FiGift size={14} />
                </span>
                <input
                  type="text"
                  placeholder="E.g., AM-FRIEND50"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full bg-brand-bg text-brand-primary pl-9 pr-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red placeholder-brand-secondary uppercase"
                />
              </div>
            </div>
          )}

          {/* Submit Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-brand-card-hover text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer mt-2 shadow-brand-glow"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              isLoginView ? 'Log In' : 'Sign Up'
            )}
          </button>
        </form>


        {/* View Switcher toggle */}
        <div className="text-center text-[10px] text-brand-secondary pt-2 border-t border-brand-border">
          <span>
            {isLoginView ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            disabled={loading}
            className="text-brand-peach hover:text-brand-primary font-bold cursor-pointer transition-colors"
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </div>
  );
}
