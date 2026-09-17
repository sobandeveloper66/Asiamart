import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiTrash2, FiCamera, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { COUNTRIES, CATEGORIES, MOCK_PRODUCTS } from '../data/products';
import ImageSearchModal from './ImageSearchModal';

export default function Navbar() {
  const { cart, cartCount, cartTotal, removeFromCart, clearCart, isAuthenticated, logout, wishlist, user, setIsAuthModalOpen } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isBumping, setIsBumping] = useState(false);

  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (cartCount === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCountryClick = (country) => {
    setIsMobileMenuOpen(false);
    navigate(`/category/${country.toLowerCase()}`);
  };

  const handleCategoryClick = (category) => {
    setIsMobileMenuOpen(false);
    navigate(`/category/all?category=${category}`);
  };

  const searchSuggestions = searchQuery.trim().length > 1 
    ? MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-brand-border px-4 lg:px-8 py-3 transition-colors duration-200 ${
      isMobileMenuOpen ? 'bg-brand-bg' : 'bg-brand-bg/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-brand-secondary hover:text-brand-primary p-1"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none shrink-0">
          <div className="h-8 sm:h-10 flex items-center">
            {/* Embedded custom SVG for exact match */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" className="h-full w-auto">
              <defs>
                <linearGradient id="brandGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ff7b7b" />
                  <stop offset="100%" stop-color="#ff2a2a" />
                </linearGradient>
              </defs>
              <g transform="translate(10, 10)">
                <circle cx="50" cy="50" r="45" fill="url(#brandGradNav)" />
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
                <text font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="42" font-weight="800" fill="url(#brandGradNav)" x="88" letter-spacing="0.5">Mart</text>
                <text font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="700" fill="currentColor" x="2" y="24" letter-spacing="3.8" className="text-brand-secondary">BEST OF ASIA AT INDIAN PRICES</text>
              </g>
            </svg>
          </div>
        </Link>

        {/* Top Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {[
            { label: 'All Products', path: '/category/all', query: '' },
            { label: 'Best Sellers', path: '/category/all', query: '?search=best' },
            { label: 'New Arrivals', path: '/category/all', query: '?search=new' },
            { label: 'Trending', path: '/category/all', query: '?search=trending' }
          ].map((item) => {
            // For All Products, it's active if path is /category/all and there's no category/search
            const isActive = location.pathname === item.path && 
              (item.query === '' ? !location.search : location.search.includes(item.query));
            return (
              <button
                key={item.label}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(item.path + item.query);
                }}
                className={`text-[15px] font-medium transition-colors hover:text-brand-peach cursor-pointer relative py-1 ${
                  isActive ? 'text-brand-peach font-semibold' : 'text-zinc-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search, Cart, Account actions */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Search bar */}
          <div className="relative hidden md:block w-48 lg:w-64" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-card text-sm text-brand-primary placeholder-brand-secondary pl-4 pr-16 py-1.5 rounded-full border border-brand-border focus:outline-none focus:border-brand-red transition-all"
              />
              <button
                type="button"
                onClick={() => setIsImageSearchOpen(true)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-brand-peach cursor-pointer"
                title="Search by image (AI)"
              >
                <FiCamera size={14} />
              </button>
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer">
                <FiSearch size={14} />
              </button>
            </form>
            
            {/* Search Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {searchSuggestions.map(product => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-brand-card-hover transition-colors border-b border-brand-border last:border-0"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-8 h-8 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-primary text-xs font-medium truncate">{product.name}</p>
                      <p className="text-brand-secondary text-[10px]">{product.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <Link 
            to="/category/all?wishlist=true" 
            className="relative text-brand-secondary hover:text-brand-peach p-1.5 transition-colors"
            title="Wishlist"
          >
            <FiHeart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Dropdown */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={`relative text-brand-secondary hover:text-brand-peach p-1.5 transition-colors cursor-pointer inline-block ${isBumping ? 'animate-bump text-brand-peach' : ''}`}
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown Preview */}
            {isCartOpen && (
              <>
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-xl border border-brand-border bg-brand-card p-4 shadow-xl shadow-black/20 dark:shadow-black/80 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <h3 className="text-base font-semibold text-brand-primary mb-3 flex items-center justify-between border-b border-brand-border pb-2">
                    <span>Order Summary ({cartCount} items)</span>
                    <div className="flex gap-3">
                      {cart.length > 0 && (
                        <button onClick={clearCart} className="text-brand-red hover:text-brand-red-hover text-xs font-semibold">Clear All</button>
                      )}
                      <button onClick={() => setIsCartOpen(false)} className="text-brand-secondary hover:text-brand-primary text-xs">Close</button>
                    </div>
                  </h3>
                  
                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-brand-secondary text-sm">Your cart is empty.</div>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-1">
                        {cart.map(({ product, quantity }) => (
                          <div key={product.id} className="flex gap-3 items-center justify-between text-sm py-1">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-[#222]" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-brand-primary font-medium truncate">{product.name}</h4>
                              <p className="text-brand-secondary text-xs">{product.country} Section</p>
                              <p className="text-brand-secondary text-xs mt-0.5">Qty {quantity} × ₹{product.price}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-brand-primary font-semibold block">₹{product.price * quantity}</span>
                              <button 
                                onClick={() => removeFromCart(product.id)}
                                className="text-brand-secondary hover:text-brand-red p-1 mt-1 transition-colors"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-brand-border pt-3 mb-4">
                        <div className="flex justify-between text-sm text-brand-secondary">
                          <span>Subtotal:</span>
                          <span className="text-brand-primary font-semibold">₹{cartTotal}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => { 
                            setIsCartOpen(false); 
                            if (isAuthenticated) {
                              navigate('/checkout');
                            } else {
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                        >
                          Checkout
                        </button>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              if (theme === 'light') setTheme('dark');
              else if (theme === 'dark') setTheme('system');
              else setTheme('light');
            }}
            className="text-brand-secondary hover:text-brand-peach p-1.5 transition-colors cursor-pointer"
            title={`Current Theme: ${theme}`}
          >
            {theme === 'light' ? <FiSun size={20} /> : theme === 'dark' ? <FiMoon size={20} /> : <FiMonitor size={20} />}
          </button>

          {/* Account Profile Icon (Mock authentication toggle dropdown) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center justify-center p-1.5 rounded-full border transition-all cursor-pointer ${
                isAuthenticated 
                  ? 'border-brand-red text-brand-peach bg-brand-red/10' 
                  : 'border-brand-border text-brand-secondary hover:text-brand-primary bg-brand-card'
              }`}
              title={isAuthenticated ? `Logged in as ${user.name}` : 'Login'}
            >
              <FiUser size={20} />
            </button>
            {/* Profile Dropdown panel */}
            {isProfileOpen && (
              <>
                <div className="absolute right-[-8px] sm:right-0 mt-3 w-60 sm:w-64 rounded-xl border border-brand-border bg-brand-card p-4 shadow-xl shadow-black/20 dark:shadow-black/80 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {isAuthenticated && user ? (
                    <div className="space-y-3">
                      <div className="border-b border-brand-border pb-2">
                        <p className="text-sm font-semibold text-brand-primary truncate">{user.name}</p>
                        <p className="text-[10px] text-brand-secondary truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="flex flex-col gap-1 text-xs">
                        <Link 
                          to="/profile" 
                          onClick={() => setIsProfileOpen(false)}
                          className="text-brand-secondary hover:text-brand-peach hover:bg-brand-card-hover p-2.5 rounded-lg transition-all text-left block"
                        >
                          My Profile & Loyalty
                        </Link>
                        <Link 
                          to="/orders" 
                          onClick={() => setIsProfileOpen(false)}
                          className="text-brand-secondary hover:text-brand-peach hover:bg-brand-card-hover p-2.5 rounded-lg transition-all text-left block"
                        >
                          My Orders
                        </Link>
                      </div>
                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full bg-brand-card-hover hover:bg-brand-red hover:text-white text-brand-secondary text-xs font-semibold py-2.5 px-4 rounded-lg transition-all text-center mt-2 cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-brand-secondary leading-normal">Log in to track orders, earn loyalty rewards, and check analytics.</p>
                      <button 
                        onClick={() => { setIsAuthModalOpen(true); setIsProfileOpen(false); }}
                        className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all text-center cursor-pointer"
                      >
                        Log In
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>



      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-brand-bg flex flex-col p-6 animate-in slide-in-from-left duration-200 lg:hidden">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card text-brand-primary placeholder-brand-secondary pl-4 pr-16 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red transition-all"
            />
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); setIsImageSearchOpen(true); }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-peach cursor-pointer"
            >
              <FiCamera size={18} />
            </button>
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-primary cursor-pointer">
              <FiSearch size={18} />
            </button>
          </form>

          {/* Top Links */}
          <h3 className="text-brand-secondary text-xs font-bold uppercase tracking-wider mb-3">Shop</h3>
          <div className="flex flex-col gap-4 mb-6 pl-2">
            {[
              { label: 'All Products', path: '/category/all', query: '' },
              { label: 'Best Sellers', path: '/category/all', query: '?search=best' },
              { label: 'New Arrivals', path: '/category/all', query: '?search=new' },
              { label: 'Trending', path: '/category/all', query: '?search=trending' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(item.path + item.query);
                }}
                className="text-left text-lg font-medium text-zinc-200 hover:text-brand-peach"
              >
                {item.label}
              </button>
            ))}
          </div>


        </div>
      )}

      {/* Image Search Modal Trigger Overlay */}
      <ImageSearchModal isOpen={isImageSearchOpen} onClose={() => setIsImageSearchOpen(false)} />
    </header>
  );
}
