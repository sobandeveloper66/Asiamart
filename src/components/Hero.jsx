import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-card px-6 py-20 shadow-2xl sm:px-12 sm:py-28 lg:px-16 border border-brand-border">
        
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1500&q=80"
            alt="Hero Background"
            className="h-full w-full object-cover filter contrast-125 transition-all duration-300"
            style={{ opacity: 'var(--hero-opacity)', mixBlendMode: 'var(--hero-blend)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl flex flex-col items-start gap-5">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase"
          >
            Brand Opening
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-brand-primary sm:text-5xl lg:text-6xl leading-[1.1]"
          >
            Best of Asia at <br />
            <span className="text-brand-red bg-gradient-to-r from-brand-red to-brand-peach bg-clip-text text-transparent">Indian Prices.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-sm sm:text-base text-brand-secondary font-light leading-relaxed"
          >
            Experience the vibrant flavors, cutting-edge beauty, and minimalist lifestyle products from China, Japan, Thailand, and South Korea, delivered reliably to your door.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4"
          >
            <button
              onClick={() => navigate('/category/all')}
              className="rounded-xl bg-brand-red px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-red-hover hover:scale-105 hover:shadow-brand-glow cursor-pointer"
            >
              Start Exploring
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
