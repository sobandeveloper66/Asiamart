import React, { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success(`Subscribed ${email.trim()} successfully!`, {
        style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
      });
      setEmail('');
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-16">
      <div className="relative overflow-hidden rounded-3xl bg-brand-card px-6 py-12 sm:px-12 sm:py-16 lg:px-16 border border-brand-border text-center flex flex-col items-center">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-peach/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <FiMail size={12} className="text-brand-red" />
            Stay Connected
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary tracking-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="text-brand-secondary text-sm font-light">
            Subscribe to our newsletter to receive updates on new products, flash sales, and exclusive regional offers.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-brand-bg text-sm text-brand-primary placeholder-brand-secondary px-5 py-3 rounded-xl border border-brand-border focus:outline-none focus:border-brand-red transition-all w-full sm:max-w-md"
            />
            <button
              type="submit"
              className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:shadow-brand-glow hover:scale-[1.02] cursor-pointer"
            >
              Subscribe
              <FiArrowRight size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
