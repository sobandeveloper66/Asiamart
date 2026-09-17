import React, { useState } from 'react';
import { FiTrendingUp, FiLayers, FiList, FiTrash2, FiEdit, FiPlus, FiCheckCircle, FiSearch, FiFilter, FiAlertCircle, FiTag, FiZap, FiStar, FiGlobe, FiBookmark, FiRefreshCw } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { COUNTRIES, CATEGORIES } from '../data/products';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Regional category mappings derived directly from the User Storefront Model (Home / Consumer catalog)
export const REGION_CATEGORY_MODEL = [
  {
    country: 'Japan',
    flag: '🇯🇵',
    userHeadline: 'Snacks, Beauty & Lifestyle',
    categories: ['Food', 'Beauty', 'Lifestyle', 'Home'],
    accent: 'border-red-500/30 text-red-500 bg-red-500/10'
  },
  {
    country: 'South Korea',
    flag: '🇰🇷',
    userHeadline: 'Glass Skin Essentials & K-Foods',
    categories: ['Beauty', 'Food'],
    accent: 'border-blue-500/30 text-blue-500 bg-blue-500/10'
  },
  {
    country: 'Thailand',
    flag: '🇹🇭',
    userHeadline: 'Spices, Teas & Wellness',
    categories: ['Food', 'Massage & Spa', 'Lifestyle'],
    accent: 'border-amber-500/30 text-amber-500 bg-amber-500/10'
  },
  {
    country: 'China',
    flag: '🇨🇳',
    userHeadline: 'Porcelain, Tech & Tea',
    categories: ['Home', 'Electronics', 'Mobile Accessories', 'Food'],
    accent: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
  }
];

export default function Admin() {
  const { products, orders, addAdminProduct, editAdminProduct, deleteAdminProduct, updateOrderStatus, user, isAuthenticated, login, logout } = useCart();
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'inventory' | 'orders'
  
  // Add / Edit Product Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Inventory filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Filtered product computation
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.id && p.id.toString().toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegionFilter === 'All' || p.country.toLowerCase() === selectedRegionFilter.toLowerCase();
    const matchesCategory = selectedCategoryFilter === 'All' || p.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    return matchesSearch && matchesRegion && matchesCategory;
  });
  
  // Form State
  const [formState, setFormState] = useState({
    name: '',
    category: 'Food',
    country: 'Japan',
    price: '',
    originalPrice: '',
    stock: '',
    image: '',
    description: '',
    origin: '',
    weight: '',
    shelfLife: '',
    allergens: ''
  });

  // Calculate analytical statistics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      category: 'Food',
      country: 'Japan',
      price: '',
      originalPrice: '',
      stock: '',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
      description: '',
      origin: '',
      weight: '',
      shelfLife: '',
      allergens: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      category: product.category,
      country: product.country,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock,
      image: product.images[0],
      description: product.description,
      origin: product.specifications?.Origin || '',
      weight: product.specifications?.Weight || '',
      shelfLife: product.specifications?.['Shelf Life'] || '',
      allergens: product.specifications?.Allergens || ''
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, category, country, price, originalPrice, stock, image, description, origin, weight, shelfLife, allergens } = formState;

    if (!name || !price || !stock || !description) {
      toast.error('Please fill in all core fields.');
      return;
    }

    const priceNum = parseFloat(price);
    const originalPriceNum = parseFloat(originalPrice) || priceNum;
    const discountPercent = priceNum < originalPriceNum ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100) : 0;

    const productPayload = {
      id: editingProduct ? editingProduct.id : `custom-${Date.now()}`,
      name,
      category,
      country,
      description,
      images: [image],
      price: priceNum,
      originalPrice: originalPriceNum,
      discount: discountPercent,
      rating: editingProduct ? editingProduct.rating : 5,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 0,
      stock: parseInt(stock, 10),
      tags: editingProduct ? editingProduct.tags : [country + ' Section'],
      specifications: {
        Origin: origin || `${country}`,
        Weight: weight || 'N/A',
        'Shelf Life': shelfLife || 'N/A',
        Allergens: allergens || 'None'
      },
      boxContents: editingProduct ? editingProduct.boxContents : ['Standard packaging box'],
      trending: editingProduct ? editingProduct.trending : false,
      newArrival: editingProduct ? editingProduct.newArrival : true,
      flashDeal: editingProduct ? editingProduct.flashDeal : false
    };

    if (editingProduct) {
      editAdminProduct(productPayload);
    } else {
      addAdminProduct(productPayload);
    }
    
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteAdminProduct(productId);
    }
  };

  // Handle Admin Access Authentication Guard
  if (!isAuthenticated) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16 min-h-[70vh] flex items-center justify-center">
        <div className="w-full rounded-2xl border border-[#1f1f1f] bg-[#161616] p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-200">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-peach mb-2">
              <FiCheckCircle className="text-brand-red" size={24} />
            </div>
            <h1 className="text-xl font-black text-white uppercase tracking-wider">Admin Portal</h1>
            <p className="text-[10px] text-zinc-500 font-light leading-normal">
              Please enter your system administrator credentials to unlock administrative controls.
            </p>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!adminEmail || !adminPassword) return;
            setAuthLoading(true);
            const res = await login(adminEmail, adminPassword);
            setAuthLoading(false);
            if (res.success) {
              if (res.user && res.user.isAdmin) {
                toast.success('Welcome back, System Administrator!');
              } else {
                toast.error('Access Denied: You do not have administrator permissions.');
              }
            } else {
              toast.error(res.message || 'Invalid credentials.');
            }
          }} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-500 font-bold block">Admin Email</label>
              <input
                type="email"
                required
                placeholder="cssobanseliya@gmail.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#202020] text-white px-3.5 py-2.5 rounded-lg border border-[#2d2d2d] focus:outline-none focus:border-brand-red placeholder-zinc-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-500 font-bold block">Secret Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red placeholder-brand-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer mt-2"
            >
              {authLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                'Unlock Console'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isAuthenticated && (!user || !user.isAdmin)) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16 min-h-[70vh] flex items-center justify-center">
        <div className="w-full rounded-2xl border border-red-900/30 bg-brand-card p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-200">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-950/30 border border-red-900/40 flex items-center justify-center text-brand-red mb-2">
            <FiTrash2 className="text-brand-red" size={28} />
          </div>
          <h1 className="text-xl font-black text-red-500 uppercase tracking-wider">Access Denied</h1>
          <p className="text-xs text-brand-secondary font-light leading-relaxed">
            You do not have administrative privileges required to view this console. 
            Logged in as <span className="font-bold text-brand-primary">{user?.email}</span>.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => logout()}
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer"
            >
              Log Out and Switch Account
            </button>
            <Link
              to="/"
              className="w-full bg-brand-card-hover hover:bg-brand-red text-brand-secondary hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all text-center block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-primary">Admin Console</h1>
          <p className="text-xs text-brand-secondary font-light mt-0.5">Control store products inventory, check order status updates, and review sales charts.</p>
        </div>
        
        {/* Tab triggers */}
        <div className="flex bg-brand-card p-1 rounded-xl border border-brand-border">
          {[
            { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
            { id: 'inventory', label: 'Inventory', icon: FiLayers },
            { id: 'orders', label: 'Orders', icon: FiList }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  isActive ? 'bg-brand-red text-white' : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Analytics Dashboard Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Summary metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1">Total Revenue</span>
              <span className="text-2xl font-black text-brand-peach">₹{totalRevenue.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-brand-secondary opacity-70 block mt-1">Accumulated from user checkouts</span>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1">Placed Orders</span>
              <span className="text-2xl font-black text-brand-primary">{totalOrdersCount}</span>
              <span className="text-[10px] text-brand-secondary opacity-70 block mt-1">Total customer transactions</span>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1">Active Catalog</span>
              <span className="text-2xl font-black text-brand-primary">{totalProductsCount}</span>
              <span className="text-[10px] text-brand-secondary opacity-70 block mt-1">Products listed in the shop</span>
            </div>
          </div>

          {/* Regional Sales Chart (Pure CSS/Tailwind bar chart visualization) */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider">Region Sales Index</h3>
              <p className="text-[10px] text-brand-secondary mt-0.5">Demographic analytics of sales by country sections.</p>
            </div>

            <div className="h-64 flex gap-4 items-end border-b border-brand-border pb-2 pl-4 pr-4">
              {[
                { name: 'Japan', percent: 65, color: 'bg-brand-red' },
                { name: 'South Korea', percent: 45, color: 'bg-brand-peach' },
                { name: 'China', percent: 25, color: 'bg-zinc-300' },
                { name: 'Thailand', percent: 15, color: 'bg-zinc-600' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  {/* Tooltip value */}
                  <span className="text-[10px] text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold mb-1">
                    {bar.percent}%
                  </span>
                  {/* Bar graphic */}
                  <div className="w-full max-w-[60px] rounded-t-lg overflow-hidden bg-brand-bg flex items-end h-48">
                    <div 
                      className={`${bar.color} w-full rounded-t-lg transition-all duration-700 ease-out`}
                      style={{ height: `${bar.percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-brand-secondary mt-1">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Inventory Management Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Inventory Action Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-card p-5 rounded-2xl border border-brand-border shadow-sm">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-brand-primary flex items-center gap-2">
                <FiTag className="text-brand-red" />
                Catalog & Stock Intelligence Suite
              </h2>
              <p className="text-[11px] text-brand-secondary mt-0.5">
                Displaying <strong className="text-brand-primary">{filteredProducts.length}</strong> of {products.length} listed products. Manage pricing, regional categorization, and monitor stock inventory warnings.
              </p>
            </div>
            
            <button
              onClick={handleOpenAddModal}
              className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl flex items-center gap-2 shadow-brand-glow transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <FiPlus size={16} />
              Add New Product
            </button>
          </div>

          {/* Storefront Regional Category Matrix (Referenced directly from User Consumer Model) */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-brand-border/60 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-brand-primary flex items-center gap-2">
                  <FiGlobe className="text-brand-red" />
                  Storefront Regional Category Matrix (User Consumer Model)
                </h3>
                <p className="text-xs text-brand-secondary mt-0.5">
                  Click any country card or category tag below to instantly filter inventory according to how customers shop by region on the storefront.
                </p>
              </div>
              {(selectedRegionFilter !== 'All' || selectedCategoryFilter !== 'All') && (
                <button
                  onClick={() => { setSelectedRegionFilter('All'); setSelectedCategoryFilter('All'); }}
                  className="bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border border-brand-red/20"
                >
                  <FiRefreshCw size={12} />
                  Reset Matrix Filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REGION_CATEGORY_MODEL.map((item) => {
                const isRegionSelected = selectedRegionFilter.toLowerCase() === item.country.toLowerCase();
                const totalCountryProducts = products.filter(p => p.country.toLowerCase() === item.country.toLowerCase()).length;
                return (
                  <div
                    key={item.country}
                    className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                      isRegionSelected 
                        ? 'bg-brand-red/5 border-brand-red shadow-[0_0_20px_rgba(229,9,20,0.12)]' 
                        : 'bg-brand-bg border-brand-border hover:border-brand-red/50 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Country Header Button */}
                      <div 
                        onClick={() => {
                          if (isRegionSelected && selectedCategoryFilter === 'All') {
                            setSelectedRegionFilter('All');
                          } else {
                            setSelectedRegionFilter(item.country);
                            setSelectedCategoryFilter('All');
                          }
                        }}
                        className="cursor-pointer group flex items-start justify-between gap-2 border-b border-brand-border/60 pb-2.5 mb-3"
                        title={`Filter entire catalog by ${item.country}`}
                      >
                        <div>
                          <span className="text-base font-black text-brand-primary flex items-center gap-1.5 group-hover:text-brand-red transition-colors">
                            <span>{item.flag}</span>
                            <span>{item.country}</span>
                          </span>
                          <span className="text-[10px] text-brand-secondary italic mt-0.5 block">
                            "{item.userHeadline}"
                          </span>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${item.accent}`}>
                          {totalCountryProducts} Items
                        </span>
                      </div>

                      {/* Storefront user categories chips */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary block mb-2">
                        Consumer Specialty Categories:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.categories.map((catName) => {
                          const catCount = products.filter(p => p.country.toLowerCase() === item.country.toLowerCase() && p.category.toLowerCase() === catName.toLowerCase()).length;
                          const isCatSelected = isRegionSelected && selectedCategoryFilter.toLowerCase() === catName.toLowerCase();
                          return (
                            <button
                              key={catName}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCatSelected) {
                                  setSelectedCategoryFilter('All');
                                } else {
                                  setSelectedRegionFilter(item.country);
                                  setSelectedCategoryFilter(catName);
                                }
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                isCatSelected 
                                  ? 'bg-brand-red text-white border-brand-red shadow-sm' 
                                  : 'bg-brand-card hover:bg-brand-card-hover text-brand-primary border-brand-border hover:border-brand-red/40'
                              }`}
                              title={`Filter to ${item.country} → ${catName}`}
                            >
                              <span>{catName}</span>
                              <span className={`text-[10px] font-mono px-1 rounded ${isCatSelected ? 'bg-white/20 text-white' : 'text-brand-secondary bg-brand-bg'}`}>
                                ({catCount})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-brand-border/40 flex items-center justify-between text-[10px] text-brand-secondary font-semibold">
                      <span>Storefront Linked</span>
                      <span className="text-green-500 flex items-center gap-1">● Active in Home Catalog</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Search & Dynamic Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-card p-4 rounded-2xl border border-brand-border shadow-sm">
            
            {/* Live Text Search */}
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary" size={15} />
              <input
                type="text"
                placeholder="Search name, ID, country, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-bg text-brand-primary pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-xs focus:outline-none focus:border-brand-red placeholder-brand-secondary"
              />
            </div>

            {/* Region Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-secondary shrink-0 flex items-center gap-1">
                <FiFilter size={13} /> Region:
              </span>
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border text-brand-primary text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-brand-red cursor-pointer font-medium"
              >
                <option value="All">🌐 All Countries ({products.length})</option>
                {['Japan', 'South Korea', 'Thailand', 'China'].map((country) => (
                  <option key={country} value={country}>
                    {country} ({products.filter(p => p.country.toLowerCase() === country.toLowerCase()).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-secondary shrink-0">Category:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border text-brand-primary text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-brand-red cursor-pointer font-medium"
              >
                <option value="All">📂 All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Products Table grid list */}
          <div className="rounded-2xl border border-brand-border bg-brand-card overflow-x-auto shadow-sm">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-brand-secondary text-sm space-y-2">
                <FiAlertCircle size={36} className="mx-auto text-amber-500/70 animate-pulse" />
                <p className="font-semibold text-brand-primary">No matching products found.</p>
                <p className="text-xs">Try clearing your search query or selecting a different region/category filter.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedRegionFilter('All'); setSelectedCategoryFilter('All'); }}
                  className="mt-2 text-xs text-brand-red font-bold underline hover:text-brand-peach cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider bg-brand-bg">
                    <th className="py-4 px-5">Product Detail & ID</th>
                    <th className="py-4 px-5">Region / Category</th>
                    <th className="py-4 px-5">Pricing & Discount</th>
                    <th className="py-4 px-5">Storefront Tags</th>
                    <th className="py-4 px-5">Inventory Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60 text-brand-primary font-medium">
                  {filteredProducts.map((prod) => {
                    const isLowStock = prod.stock <= 10 && prod.stock > 0;
                    const isOutOfStock = prod.stock <= 0;
                    return (
                      <tr key={prod.id} className="hover:bg-brand-card-hover transition-colors">
                        
                        {/* Img + Title + ID */}
                        <td className="py-3.5 px-5 min-w-[240px]">
                          <div className="flex items-center gap-3.5">
                            <div className="relative group shrink-0">
                              <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 object-cover rounded-xl bg-brand-bg border border-brand-border shadow-sm transition-transform duration-200 group-hover:scale-110" />
                              {prod.discount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                  -{prod.discount}%
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-brand-primary font-extrabold text-sm truncate max-w-[220px]" title={prod.name}>{prod.name}</p>
                              <p className="text-[10px] text-brand-secondary font-mono mt-0.5">ID: {prod.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Region & Category Tags */}
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-bg text-brand-primary border border-brand-border">
                              📍 {prod.country}
                            </span>
                            <span className="text-brand-secondary text-[11px]">📂 {prod.category}</span>
                          </div>
                        </td>

                        {/* Pricing Details */}
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <span className="text-sm font-black text-brand-peach">₹{prod.price.toLocaleString('en-IN')}</span>
                            {prod.originalPrice && prod.originalPrice > prod.price && (
                              <span className="block text-[11px] text-brand-secondary line-through font-light">
                                Was ₹{prod.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Promotional Storefront Tags */}
                        <td className="py-3.5 px-5">
                          <div className="flex flex-wrap gap-1 max-w-[160px]">
                            {prod.flashDeal && (
                              <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-black uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                                ⚡ Flash Deal
                              </span>
                            )}
                            {prod.trending && (
                              <span className="bg-brand-red/15 text-brand-red border border-brand-red/30 text-[10px] px-2 py-0.5 rounded font-black uppercase flex items-center gap-1">
                                🔥 Trending
                              </span>
                            )}
                            {prod.newArrival && (
                              <span className="bg-green-500/15 text-green-400 border border-green-500/30 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                                ✨ New
                              </span>
                            )}
                            {!prod.flashDeal && !prod.trending && !prod.newArrival && (
                              <span className="text-brand-secondary font-light text-[10px] italic">Standard Catalog</span>
                            )}
                          </div>
                        </td>

                        {/* Stock status indicator */}
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center justify-center h-2.5 w-2.5 rounded-full ${
                              isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-400 animate-pulse' : 'bg-green-500'
                            }`} />
                            <div>
                              <span className={`font-mono font-extrabold text-xs ${
                                isOutOfStock ? 'text-red-500' : isLowStock ? 'text-amber-500' : 'text-green-500'
                              }`}>
                                {prod.stock} Units
                              </span>
                              <span className="block text-[10px] text-brand-secondary">
                                {isOutOfStock ? '❌ Out of Stock' : isLowStock ? '⚠️ Low Inventory' : '✅ Healthy Stock'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right shrink-0 whitespace-nowrap">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-2.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover border border-transparent rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1 text-xs font-bold"
                              title="Edit product details & pricing"
                            >
                              <FiEdit size={14} className="text-brand-peach" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-2.5 text-brand-secondary hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 rounded-xl transition-all cursor-pointer shadow-sm"
                              title="Delete product from catalog"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}

      {/* 3. Orders Management Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <h2 className="text-xs font-bold text-brand-secondary uppercase tracking-wider">Placed Transactions ({orders.length})</h2>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-brand-card rounded-2xl border border-brand-border text-brand-secondary">
              No orders have been submitted by clients yet.
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-border bg-brand-card overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-brand-border text-brand-secondary font-bold uppercase tracking-wider">
                    <th className="py-4 px-5">Order ID</th>
                    <th className="py-4 px-5">Date</th>
                    <th className="py-4 px-5">Customer</th>
                    <th className="py-4 px-5">Address</th>
                    <th className="py-4 px-5">Items</th>
                    <th className="py-4 px-5">Total Paid</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5">Tracking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-brand-primary font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-brand-card-hover">
                      <td className="py-3 px-5 font-bold text-brand-primary">#AM-{ord.id}</td>
                      <td className="py-3 px-5 text-brand-secondary">{ord.date}</td>
                      <td className="py-3 px-5">
                        <div className="font-bold">{ord.shippingAddress.fullName}</div>
                        <div className="text-[10px] text-brand-secondary">{ord.shippingAddress.mobileNumber}</div>
                      </td>
                      <td className="py-3 px-5 text-[10px] max-w-[150px] whitespace-normal">
                        <div>{ord.shippingAddress.addressLine1}</div>
                        {ord.shippingAddress.addressLine2 && <div>{ord.shippingAddress.addressLine2}</div>}
                        <div>{ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}</div>
                      </td>
                      <td className="py-3 px-5 font-mono">{ord.items.reduce((sum, i) => sum + i.quantity, 0)} items</td>
                      <td className="py-3 px-5 font-bold text-brand-primary">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-5">
                        <div className={`text-xs font-bold ${ord.paymentStatus === 'Paid' ? 'text-green-500' : 'text-amber-500'}`}>
                          {ord.paymentStatus || 'Pending'}
                        </div>
                        <div className="text-[10px] text-brand-secondary mt-0.5">{ord.paymentMethod || 'N/A'}</div>
                      </td>
                      
                      {/* Tracking dropdown toggler */}
                      <td className="py-3 px-5">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="bg-brand-bg border border-brand-border text-brand-primary text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-brand-red cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

      {/* Product Form Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-lg rounded-2xl border border-brand-border bg-brand-card p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-brand-primary border-b border-brand-border pb-2">
              {editingProduct ? `Edit Product Details` : 'Add New Product to Catalog'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Name */}
                <div className="col-span-2">
                  <label className="text-brand-secondary font-bold block mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="E.g., Ceremonial Genmaicha Tea"
                    value={formState.name}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Region (Country) */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Region (Storefront Country)</label>
                  <select
                    name="country"
                    value={formState.country}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red cursor-pointer font-medium"
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Category (Storefront Section)</label>
                  <select
                    name="category"
                    value={formState.category}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red cursor-pointer font-medium"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Smart User Model Category Quick-Selectors */}
                <div className="col-span-2 bg-brand-bg p-3 rounded-xl border border-brand-border space-y-2 shadow-inner">
                  {(() => {
                    const model = REGION_CATEGORY_MODEL.find(r => r.country.toLowerCase() === (formState.country || 'Japan').toLowerCase());
                    if (!model) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-brand-primary flex items-center gap-1.5">
                            <span>{model.flag}</span>
                            <span>Storefront Consumer Categories for {formState.country}:</span>
                          </span>
                          <span className="text-[10px] text-brand-secondary italic">"{model.userHeadline}"</span>
                        </div>
                        <p className="text-[10px] text-brand-secondary">
                          Click a recommended category below to match how shoppers browse this region on the homepage:
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {model.categories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFormState({ ...formState, category: cat })}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-extrabold flex items-center gap-1 ${
                                formState.category === cat 
                                  ? 'bg-brand-red text-white border-brand-red shadow-sm' 
                                  : 'bg-brand-card hover:bg-brand-card-hover text-brand-primary border-brand-border hover:border-brand-red/50'
                              }`}
                            >
                              <span>{cat}</span>
                              {formState.category === cat && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Price */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="E.g., 450"
                    value={formState.price}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Stock Count</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    placeholder="E.g., 20"
                    value={formState.stock}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Image URL */}
                <div className="col-span-2">
                  <label className="text-brand-secondary font-bold block mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Enter image link"
                    value={formState.image}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-brand-secondary font-bold block mb-1">Product Description</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    placeholder="Enter detailed description..."
                    value={formState.description}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Specifications: Origin & Weight */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Origin (City, Country)</label>
                  <input
                    type="text"
                    name="origin"
                    placeholder="E.g., Kyoto, Japan"
                    value={formState.origin}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Weight / Volume</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="E.g., 200g / 150ml"
                    value={formState.weight}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Specifications: Shelf Life & Allergens */}
                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Shelf Life</label>
                  <input
                    type="text"
                    name="shelfLife"
                    placeholder="E.g., 12 Months"
                    value={formState.shelfLife}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="text-brand-secondary font-bold block mb-1">Allergens</label>
                  <input
                    type="text"
                    name="allergens"
                    placeholder="E.g., Soy, Wheat, None"
                    value={formState.allergens}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg text-brand-primary px-3.5 py-2.5 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>

              </div>

              {/* Submit triggers */}
              <div className="flex gap-2 justify-end pt-3 border-t border-brand-border mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-brand-card-hover hover:bg-brand-red text-brand-secondary hover:text-white font-semibold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-red hover:bg-brand-red-hover text-white font-bold py-2 px-6 rounded-xl cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
