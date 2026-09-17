import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiTrendingUp, FiBox, FiPackage, FiShoppingBag, FiAward, FiShield, FiSliders, FiCheckCircle, FiHeart, FiClock, FiLock, FiArrowRight, FiZap, FiStar, FiUserCheck } from 'react-icons/fi';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { useCart } from '../context/CartContext';

export default function Home() {
  const navigate = useNavigate();
  const { products, orders, isAuthenticated, user, coins, wishlist, setIsAuthModalOpen } = useCart();

  const isAdmin = isAuthenticated && user?.isAdmin;
  const isMember = isAuthenticated && !user?.isAdmin;
  const isGuest = !isAuthenticated;

  // Filter products by section
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const flashDeals = products.filter((p) => p.flashDeal).slice(0, 4);

  // Admin analytics computations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing').length;

  // Member activity calculations
  const latestOrder = orders.length > 0 ? orders[0] : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* ==========================================
          MODULE 1: ADMIN EXECUTIVE LANDING MODULE
          ========================================== */}
      {isAdmin && (
        <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <div className="relative overflow-hidden rounded-3xl border-2 border-brand-red/40 bg-brand-card p-6 sm:p-10 shadow-[0_0_40px_rgba(226,54,54,0.12)]">
            
            {/* Top Admin Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border/80 pb-6 mb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-brand-red/15 text-brand-red text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-brand-red/30">
                  <FiSliders size={14} />
                  Admin Executive Command Hub
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-brand-primary tracking-tight">
                  Welcome back, Executive {user?.name || 'Administrator'} ⚡
                </h1>
                <p className="text-xs sm:text-sm text-brand-secondary font-light max-w-2xl">
                  You are viewing the specialized administrative control module. Review real-time store financial metrics, pending fulfillment orders, and catalog status.
                </p>
              </div>

              <Link
                to="/admin"
                className="shrink-0 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-brand-glow transition-all transform hover:-translate-y-0.5"
              >
                <FiSliders size={16} />
                Open Admin Console
              </Link>
            </div>

            {/* KPI Live Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              
              {/* Total Revenue */}
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 hover:border-brand-red/50 transition-all shadow-sm">
                <div className="flex items-center justify-between text-brand-secondary">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Total Sales Revenue</span>
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <FiTrendingUp size={16} />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-brand-peach">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <span className="inline-block text-[10px] bg-green-500/10 text-green-500 font-semibold px-2 py-0.5 rounded">
                  ▲ Live Checkout Database
                </span>
              </div>

              {/* Pending Orders */}
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 hover:border-amber-500/50 transition-all shadow-sm">
                <div className="flex items-center justify-between text-brand-secondary">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <FiClock size={16} />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-brand-primary">{pendingOrdersCount}</p>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${pendingOrdersCount > 0 ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-brand-card-hover text-brand-secondary'}`}>
                  {pendingOrdersCount > 0 ? `⚠️ Action Required (${pendingOrdersCount})` : '✓ Warehouse All Clear'}
                </span>
              </div>

              {/* Total Orders */}
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 hover:border-blue-500/50 transition-all shadow-sm">
                <div className="flex items-center justify-between text-brand-secondary">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Completed Transactions</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <FiPackage size={16} />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-brand-primary">{orders.length}</p>
                <span className="inline-block text-[10px] bg-blue-500/10 text-blue-500 font-semibold px-2 py-0.5 rounded">
                  All Client Orders
                </span>
              </div>

              {/* Active Catalog */}
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 hover:border-purple-500/50 transition-all shadow-sm">
                <div className="flex items-center justify-between text-brand-secondary">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Active Catalog</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <FiBox size={16} />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-black text-brand-primary">{products.length} Items</p>
                <span className="inline-block text-[10px] bg-purple-500/10 text-purple-500 font-semibold px-2 py-0.5 rounded">
                  JP · KR · TH · CN Sourcing
                </span>
              </div>
            </div>

            {/* Admin Quick Command Banner */}
            <div className="bg-brand-bg rounded-2xl border border-brand-border p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-secondary">
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-semibold text-brand-primary">Razorpay Live Gateway Online & Signed In as System Overseer</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/admin"
                  className="flex-1 sm:flex-none text-center text-xs font-bold bg-brand-card hover:bg-brand-card-hover text-brand-primary px-4 py-2.5 rounded-lg border border-brand-border transition-all"
                >
                  Manage Orders & Statuses
                </Link>
                <Link
                  to="/admin"
                  className="flex-1 sm:flex-none text-center text-xs font-bold bg-brand-card hover:bg-brand-card-hover text-brand-primary px-4 py-2.5 rounded-lg border border-brand-border transition-all"
                >
                  Add / Edit Inventory
                </Link>
              </div>
            </div>

            {/* Storefront preview note */}
            <div className="mt-8 pt-4 border-t border-brand-border/50 text-center flex items-center justify-center gap-2 text-xs font-bold text-brand-secondary">
              <span>👁️ Live Storefront Consumer Preview Below (What your customers see in real-time)</span>
            </div>

          </div>
        </section>
      )}

      {/* ==========================================
          MODULE 2: LOGGED-IN CUSTOMER / MEMBER LANDING MODULE
          ========================================== */}
      {isMember && (
        <>
          <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-brand-card p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
              
              {/* VIP Header Banner */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-border pb-6 mb-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-500 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
                    👑 VIP AsiaMart Member
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                    Welcome back, {user?.name || 'Valued Member'}! 🍱
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-secondary font-light">
                    Your personalized Asian gourmet snacks & luxury glass-skin boutique is stocked and ready.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/orders"
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-brand-glow transition-all"
                  >
                    <FiPackage size={15} />
                    My Orders ({orders.length})
                  </Link>
                  <Link
                    to="/profile"
                    className="bg-brand-bg hover:bg-brand-card-hover text-brand-primary text-xs font-bold px-5 py-3 rounded-xl border border-brand-border transition-all"
                  >
                    Profile Settings
                  </Link>
                </div>
              </div>

              {/* Member Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Wallet Coins */}
                <div className="bg-brand-bg rounded-2xl border border-amber-500/20 p-5 space-y-2 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-amber-500 font-bold text-xs mb-1">
                      <span>🪙 Coins Cashback Balance</span>
                      <span className="bg-amber-500/15 text-amber-500 text-[10px] px-2 py-0.5 rounded font-mono font-bold">10% Reward Active</span>
                    </div>
                    <p className="text-2xl font-black text-amber-500">{coins} Coins Available</p>
                  </div>
                  <p className="text-[11px] text-brand-secondary border-t border-brand-border/50 pt-2">
                    Worth <strong className="text-brand-primary">₹{coins} instant discount</strong> on any product checkout today!
                  </p>
                </div>

                {/* Order Status Tracker */}
                <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-brand-secondary font-bold text-xs mb-1">
                      <span>🚀 Active Package Tracker</span>
                      {latestOrder && (
                        <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded font-bold">
                          {latestOrder.status}
                        </span>
                      )}
                    </div>
                    {latestOrder ? (
                      <p className="text-sm font-bold text-brand-primary mt-1">
                        Order #AM-{latestOrder.id} · <span className="text-brand-peach">₹{latestOrder.totalAmount}</span>
                      </p>
                    ) : (
                      <p className="text-sm font-bold text-brand-primary mt-1">No pending shipments</p>
                    )}
                  </div>
                  {latestOrder ? (
                    <Link to="/orders" className="text-[11px] font-bold text-brand-peach hover:text-brand-primary flex items-center gap-1 border-t border-brand-border/50 pt-2 transition-colors">
                      Track Live Delivery Status <FiArrowRight />
                    </Link>
                  ) : (
                    <p className="text-[11px] text-brand-secondary border-t border-brand-border/50 pt-2">
                      Place your next order to unlock real-time warehouse GPS tracking.
                    </p>
                  )}
                </div>

                {/* Wishlist Curations */}
                <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 space-y-2 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-brand-secondary font-bold text-xs mb-1">
                      <span>❤️ Saved Curated Favorites</span>
                      <FiHeart className="text-brand-red" size={14} />
                    </div>
                    <p className="text-2xl font-black text-brand-primary">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved</p>
                  </div>
                  <Link to="/category/all" className="text-[11px] font-bold text-brand-secondary hover:text-brand-primary flex items-center gap-1 border-t border-brand-border/50 pt-2 transition-colors">
                    Explore Trending Japanese & Korean Picks <FiArrowRight />
                  </Link>
                </div>

              </div>

            </div>
          </section>
          <Hero />
        </>
      )}

      {/* ==========================================
          MODULE 3: WITHOUT LOGIN (GUEST LANDING MODULE)
          ========================================== */}
      {isGuest && (
        <>
          {/* Main Hero Banner for New Guests */}
          <Hero />

          {/* Guest Exclusive Onboarding & Perks Callout */}
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-brand-border bg-brand-card p-6 sm:p-10 shadow-xl space-y-8">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="rounded-full bg-brand-red/10 border border-brand-red/20 px-3.5 py-1 text-xs font-bold text-brand-red uppercase tracking-wider inline-block">
                  ✨ Welcome to AsiaMart India
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                  Why Shop & Join The AsiaMart Club?
                </h2>
                <p className="text-xs sm:text-sm text-brand-secondary font-light">
                  Join thousands of fans experiencing authentic Asian culinary delights, ramen treats, and viral glass-skin skincare without customs hassles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border space-y-3 relative overflow-hidden hover:border-amber-500/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
                    🪙
                  </div>
                  <h4 className="text-base font-bold text-brand-primary">Instant Coins Cashback</h4>
                  <p className="text-xs text-brand-secondary leading-relaxed font-light">
                    Every order earns you <strong className="text-brand-primary">10% in AsiaMart Coins</strong>. Create a free account today to accumulate rewards instantly and redeem them for direct checkout discounts!
                  </p>
                </div>

                <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border space-y-3 relative overflow-hidden hover:border-red-500/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-brand-red font-bold text-xl">
                    <FiShield />
                  </div>
                  <h4 className="text-base font-bold text-brand-primary">100% Authentic Imports</h4>
                  <p className="text-xs text-brand-secondary leading-relaxed font-light">
                    We source directly from official manufacturers in <strong className="text-brand-primary">Tokyo, Seoul, Bangkok & Beijing</strong>. Zero fakes, zero import taxes, and verified freshness dates.
                  </p>
                </div>

                <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border space-y-3 relative overflow-hidden hover:border-green-500/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 font-bold text-xl">
                    <FiZap />
                  </div>
                  <h4 className="text-base font-bold text-brand-primary">Express India-Wide Shipping</h4>
                  <p className="text-xs text-brand-secondary leading-relaxed font-light">
                    Dispatched from our localized warehouses for rapid delivery in <strong className="text-brand-primary">2 to 4 business days</strong> with live SMS updates and secure Razorpay payments.
                  </p>
                </div>

              </div>

              {/* Guest Action Callout Row */}
              <div className="bg-brand-bg rounded-2xl border border-brand-border p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-brand-primary">Ready to start tasting Asia?</h4>
                  <p className="text-xs text-brand-secondary mt-0.5">Sign up in seconds to unlock member coins & easy checkout.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl text-xs sm:text-sm shadow-brand-glow transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FiUserCheck size={16} />
                    Create Account & Claim Benefits
                  </button>
                </div>
              </div>

            </div>
          </section>
        </>
      )}

      {/* Explore Regions Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-brand-primary mb-6">Explore Regions</h2>
        
        {/* Asymmetrical Grid layout matching mockup exactly */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[180px]">
          
          {/* Japan: Spans 2 columns and 2 rows on desktop */}
          <Link
            to="/category/japan"
            className="group relative md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl border border-brand-border bg-black block"
          >
            <img
              src="https://images.unsplash.com/photo-1542044896530-05d85be9b11a?w=1000&auto=format&fit=crop&q=80"
              alt="Japan Region"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Japan</h3>
                <p className="text-xs text-zinc-400 mt-1 font-light">Snacks, Beauty & Lifestyle</p>
              </div>
              <div className="rounded-full bg-white/10 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <FiArrowUpRight size={20} />
              </div>
            </div>
          </Link>

          {/* South Korea: Spans 2 columns and 1 row */}
          <Link
            to="/category/south korea"
            className="group relative md:col-span-2 md:row-span-1 overflow-hidden rounded-2xl border border-brand-border bg-black block"
          >
            <img
              src="https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&auto=format&fit=crop&q=80"
              alt="South Korea Region"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">South Korea</h3>
                <p className="text-xs text-zinc-400 mt-0.5 font-light">Glass Skin Essentials & K-Foods</p>
              </div>
              <div className="rounded-full bg-white/10 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <FiArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* Thailand: Spans 1 column and 1 row */}
          <Link
            to="/category/thailand"
            className="group relative md:col-span-1 md:row-span-1 overflow-hidden rounded-2xl border border-brand-border bg-black block"
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
              alt="Thailand Region"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Thailand</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5 font-light">Spices & Teas</p>
              </div>
              <div className="rounded-full bg-white/10 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <FiArrowUpRight size={16} />
              </div>
            </div>
          </Link>

          {/* China: Spans 1 column and 1 row */}
          <Link
            to="/category/china"
            className="group relative md:col-span-1 md:row-span-1 overflow-hidden rounded-2xl border border-brand-border bg-black block"
          >
            <img
              src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80"
              alt="China Region"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">China</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5 font-light">Porcelain & Tech</p>
              </div>
              <div className="rounded-full bg-white/10 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <FiArrowUpRight size={16} />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Trending Now Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold tracking-tight text-brand-primary">Trending Now</h2>
          <Link to="/category/all" className="text-xs font-semibold text-brand-peach hover:text-brand-primary transition-colors">
            View All
          </Link>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {trendingProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New Arrivals Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold tracking-tight text-brand-primary">New Arrivals</h2>
          <Link to="/category/all" className="text-xs font-semibold text-brand-peach hover:text-brand-primary transition-colors">
            View All
          </Link>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {newArrivals.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Flash Deals Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold tracking-tight text-brand-primary">Flash Deals</h2>
          <Link to="/category/all" className="text-xs font-semibold text-brand-peach hover:text-brand-primary transition-colors">
            View All
          </Link>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {flashDeals.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Standalone Newsletter section - Hidden for Admin Overseers */}
      {!isAdmin && <Newsletter />}

    </div>
  );
}

