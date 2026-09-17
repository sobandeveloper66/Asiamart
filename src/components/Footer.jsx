import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success(`Subscribed ${email.trim()} for updates!`, {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-brand-card border-t border-brand-border text-brand-secondary py-12 px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center select-none max-w-[150px]">
            <div className="h-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" className="h-full w-auto">
                <defs>
                  <linearGradient id="brandGradFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff7b7b" />
                    <stop offset="100%" stop-color="#ff2a2a" />
                  </linearGradient>
                </defs>
                <g transform="translate(10, 10)">
                  <circle cx="50" cy="50" r="45" fill="url(#brandGradFoot)" />
                  <g fill="#ffffff">
                    <path d="M 22,33 Q 50,40 78,33 C 82,32 84,36 80,38 Q 50,46 20,38 C 16,36 18,32 22,33 Z" />
                    <path d="M 27,45 Q 50,50 73,45 C 76,44 77,47 74,49 Q 50,54 26,49 C 23,47 24,44 27,45 Z" />
                    <path d="M 36,50 L 28,80 C 27,83 31,85 33,83 L 39,51 Z" />
                    <path d="M 64,50 L 72,80 C 73,83 69,85 67,83 L 61,51 Z" />
                    <rect x="35" y="62" width="30" height="4" rx="2" />
                  </g>
                </g>
                <g transform="translate(125, 68)">
                  <text font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800" fill="currentColor" letter-spacing="0.5" className="text-brand-primary">Asia</text>
                  <text font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800" fill="url(#brandGradFoot)" x="88" letter-spacing="0.5">Mart</text>
                  <text font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="700" fill="currentColor" x="2" y="24" letter-spacing="3.8" className="text-brand-secondary">BEST OF ASIA AT INDIAN PRICES</text>
                </g>
              </svg>
            </div>
          </Link>
          <p className="text-sm text-brand-secondary max-w-xs">
            Premium Asian Goods Delivered to India. Experience the finest flavours and lifestyles.
          </p>
          <p className="text-xs text-brand-secondary opacity-80 mt-2">
            © {new Date().getFullYear()} AsiaMart India. Premium Asian Goods Delivered.
          </p>
        </div>

        {/* Help & Info Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-brand-primary text-sm font-semibold tracking-wider uppercase">Help & Info</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/delivery-info" className="hover:text-brand-primary transition-colors">India Delivery Info</Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-brand-primary transition-colors">Customer Service</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Shop Regions Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-brand-primary text-sm font-semibold tracking-wider uppercase">Shop Regions</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/category/japan" className="hover:text-brand-primary transition-colors">Japan Section</Link>
            </li>
            <li>
              <Link to="/category/south korea" className="hover:text-brand-primary transition-colors">Korea Section</Link>
            </li>
            <li>
              <Link to="/category/china" className="hover:text-brand-primary transition-colors">China Section</Link>
            </li>
            <li>
              <Link to="/category/thailand" className="hover:text-brand-primary transition-colors">Thailand Section</Link>
            </li>
          </ul>
        </div>

        {/* Stay Updated Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-brand-primary text-sm font-semibold tracking-wider uppercase">Stay Updated</h4>
          <p className="text-sm text-brand-secondary">
            Get notified about new arrivals and flash deals.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2 max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary pl-4 pr-12 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-red hover:bg-brand-red-hover text-white p-2 rounded-md transition-colors cursor-pointer"
            >
              <FiArrowRight size={14} />
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}
