import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

export default function Category() {
  const { country } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, products, isLoadingProducts } = useCart();

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const wishlistOnly = searchParams.get('wishlist') === 'true';

  // Filters State
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  
  // Connect loader to context loading status or local filter transition
  const isLoading = (isLoadingProducts && products.length === 0) || isFilterLoading;

  // Sync route country parameter to selectedCountries state robustly
  useEffect(() => {
    if (country && country.toLowerCase() !== 'all') {
      const cleanUrlCountry = decodeURIComponent(country).toLowerCase().replace(/[-_]/g, ' ').trim();
      const matchedCountry = ['China', 'Japan', 'Thailand', 'South Korea', 'Taiwan', 'Vietnam'].find(
        (c) => {
          const cleanTarget = c.toLowerCase();
          return cleanTarget === cleanUrlCountry || 
                 (cleanUrlCountry === 'korea' && cleanTarget === 'south korea') ||
                 (cleanUrlCountry === 'south korea' && cleanTarget === 'south korea');
        }
      );
      if (matchedCountry) {
        setSelectedCountries([matchedCountry]);
      }
    } else {
      setSelectedCountries([]);
    }
  }, [country]);

  // Handle Country Checkbox Toggles
  const handleCountryToggle = (c) => {
    setSelectedCountries((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  // Unique Categories
  const uniqueCategories = useMemo(() => {
    let relevantProducts = products || [];
    if (selectedCountries.length > 0) {
      const targetCountries = selectedCountries.map(c => c.trim().toLowerCase());
      relevantProducts = products.filter(p => p.country && targetCountries.includes(p.country.trim().toLowerCase()));
    }
    const cats = new Set(relevantProducts.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products, selectedCountries]);

  // Auto-clear category if the newly selected country doesn't have it
  useEffect(() => {
    if (categoryQuery && uniqueCategories.length > 0) {
      const isCategoryValid = uniqueCategories.some(c => c.toLowerCase() === categoryQuery.toLowerCase());
      if (!isCategoryValid) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
      }
    }
  }, [uniqueCategories, categoryQuery, searchParams, setSearchParams]);

  // Handle Category Toggle (Single Selection)
  const handleCategoryToggle = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryQuery && categoryQuery.toLowerCase() === cat.toLowerCase()) {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = products || [];

    // 1. Wishlist filter
    if (wishlistOnly) {
      return wishlist;
    }

    // 2. Route or Sidebar Country filter (Case-insensitive & whitespace resilient)
    if (selectedCountries.length > 0) {
      const targetCountries = selectedCountries.map(c => c.trim().toLowerCase());
      result = result.filter((p) => p.country && targetCountries.includes(p.country.trim().toLowerCase()));
    }

    // 3. Category Query filter
    if (categoryQuery) {
      result = result.filter((p) => p.category && p.category.trim().toLowerCase() === categoryQuery.trim().toLowerCase());
    }

    // 4. Search Query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.country && p.country.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
          (q === 'trending' && p.trending) ||
          (q === 'new' && p.newArrival) ||
          (q === 'best' && p.rating >= 4.7) // Fallback for Best Sellers
      );
    }

    // 5. Price filter
    if (minPrice) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    return result;
  }, [products, selectedCountries, categoryQuery, searchQuery, minPrice, maxPrice, wishlistOnly, wishlist]);

  // Simulate loading state on filters update for rich user experience
  useEffect(() => {
    setIsFilterLoading(true);
    const timer = setTimeout(() => setIsFilterLoading(false), 250);
    return () => clearTimeout(timer);
  }, [selectedCountries, categoryQuery, searchQuery, minPrice, maxPrice, wishlistOnly]);

  // Header Title Text
  const headerTitle = useMemo(() => {
    if (wishlistOnly) return 'My Wishlist';
    
    let titleStr = '';
    if (selectedCountries.length === 1) {
      titleStr += selectedCountries[0];
    } else if (selectedCountries.length > 1) {
      titleStr += 'Multi-Region';
    } else {
      titleStr += 'Asian';
    }

    if (categoryQuery) {
      titleStr += ` ${categoryQuery}`;
    } else {
      titleStr += ' Products';
    }

    if (searchQuery) {
      titleStr = `Search results for "${searchQuery}"`;
    }

    return titleStr;
  }, [selectedCountries, categoryQuery, searchQuery, wishlistOnly]);

  // Active breadcrumbs list
  const breadcrumbs = useMemo(() => {
    const list = [{ label: 'Home', link: '/' }];
    if (wishlistOnly) {
      list.push({ label: 'Wishlist', link: '#' });
      return list;
    }
    if (selectedCountries.length === 1) {
      list.push({ label: selectedCountries[0], link: `/category/${selectedCountries[0].toLowerCase()}` });
    } else if (selectedCountries.length > 1) {
      list.push({ label: 'Multiple Regions', link: '#' });
    } else {
      list.push({ label: 'All Regions', link: '/category/all' });
    }

    if (categoryQuery) {
      list.push({ label: categoryQuery, link: '#' });
    }
    return list;
  }, [selectedCountries, categoryQuery, wishlistOnly]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumbs */}
      <nav className="mb-5 flex text-xs font-medium text-brand-secondary gap-1.5 items-center">
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span>&gt;</span>}
            {b.link !== '#' ? (
              <Link to={b.link} className="hover:text-brand-primary transition-colors">
                {b.label}
              </Link>
            ) : (
              <span className="text-brand-secondary font-semibold">{b.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
          
          {/* Country Filter Card */}
          {!wishlistOnly && (
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <h3 className="text-sm font-bold text-brand-primary mb-4">Country</h3>
              <div className="space-y-3">
                {['China', 'Japan', 'Thailand', 'South Korea'].map((c) => {
                  const isChecked = selectedCountries.includes(c);
                  return (
                    <label key={c} className="flex items-center gap-3 text-sm text-brand-secondary hover:text-brand-primary cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCountryToggle(c)}
                        className="h-4 w-4 rounded border-brand-border bg-brand-bg text-brand-red focus:ring-0 accent-brand-red cursor-pointer"
                      />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Filter Card */}
          {!wishlistOnly && uniqueCategories.length > 0 && (
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <h3 className="text-sm font-bold text-brand-primary mb-4">Category</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {uniqueCategories.map((cat) => {
                  const isChecked = Boolean(categoryQuery && cat.toLowerCase() === categoryQuery.toLowerCase());
                  return (
                    <label key={cat} className="flex items-center gap-3 text-sm text-brand-secondary hover:text-brand-primary cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat)}
                        className="h-4 w-4 rounded border-brand-border bg-brand-bg text-brand-red focus:ring-0 accent-brand-red cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Filter Card */}
          {!wishlistOnly && (
            <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
              <h3 className="text-sm font-bold text-brand-primary mb-4">Price</h3>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="text-[10px] text-brand-secondary block mb-1">Min</label>
                  <input
                    type="number"
                    placeholder="₹0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-brand-bg text-xs text-brand-primary placeholder-brand-secondary px-3 py-2 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-brand-secondary block mb-1">Max</label>
                  <input
                    type="number"
                    placeholder="₹5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-brand-bg text-xs text-brand-primary placeholder-brand-secondary px-3 py-2 rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>
              {(minPrice || maxPrice) && (
                <button
                  onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                  className="mt-4 text-xs font-semibold text-brand-peach hover:text-brand-primary transition-colors cursor-pointer"
                >
                  Clear Price Limit
                </button>
              )}
            </div>
          )}

        </aside>

        {/* Main Product Grid Area */}
        <main className="flex-1 w-full">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6 gap-4">
            <h1 className="text-xl font-bold text-brand-primary">{headerTitle}</h1>
            <span className="text-xs text-brand-secondary font-medium shrink-0">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </span>
          </div>

          {/* Product Cards Container */}
          {isLoading ? (
            <Loader type="card" count={6} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-card rounded-3xl border border-brand-border p-8">
              <p className="text-brand-secondary text-base mb-2">No products found matching your filter criteria.</p>
              <p className="text-brand-secondary text-sm opacity-70">Try removing filters or search keywords.</p>
              {wishlistOnly && (
                <Link to="/category/all" className="mt-4 inline-block bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-4 py-2 rounded-lg">
                  Shop Products
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewType="category" />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
