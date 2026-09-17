import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, viewType = 'grid' }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isFavorite = isInWishlist(product.id);

  // Determine which badge to show
  let badgeText = '';
  if (product.discount > 0) {
    badgeText = product.tags.find(t => t.includes('Deal') || t.includes('%')) || `-${product.discount}% OFF`;
  } else if (product.tags && product.tags.length > 0) {
    // Show the first tag that is "BEST SELLER" or "NEW"
    badgeText = product.tags.find(t => t === 'BEST SELLER' || t === 'NEW' || t === 'K-BEAUTY' || t === 'SPICY' || t === 'HANDMADE') || '';
  }

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-3 transition-all duration-300 hover:border-brand-red/30 hover:shadow-card-glow hover:bg-brand-card-hover">
      
      {/* Top Badges & Wishlist Trigger */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {badgeText && (
          <span className="rounded bg-brand-red px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md">
            {badgeText}
          </span>
        )}
      </div>

      <button
        onClick={handleWishlist}
        className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-zinc-300 backdrop-blur-md transition-colors hover:text-brand-red cursor-pointer"
        title="Add to Wishlist"
      >
        <FiHeart size={14} className={isFavorite ? 'fill-brand-red text-brand-red' : ''} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl bg-brand-bg aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {product.tags && product.tags.filter(t => t !== 'BEST SELLER' && t !== 'NEW' && !t.includes('%') && !t.includes('Deal')).map((tag) => (
              <span key={tag} className="rounded bg-brand-bg px-2 py-0.5 text-[9px] font-medium text-brand-secondary uppercase">
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs font-semibold text-brand-primary hover:text-brand-peach line-clamp-2 leading-relaxed transition-colors min-h-[36px]">
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price area */}
          <div className="mt-2 mb-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-brand-red">₹{product.price.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <span className="text-[10px] text-brand-secondary line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-1 sm:gap-1.5 rounded-lg bg-brand-red hover:bg-brand-red-hover py-2 text-[10px] sm:text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <FiShoppingCart size={12} />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
