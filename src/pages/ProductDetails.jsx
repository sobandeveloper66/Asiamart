import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiTruck, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';
import QuantitySelector from '../components/QuantitySelector';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, products } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'reviews' | 'shipping'
  const [isLoading, setIsLoading] = useState(true);

  // Review Form States
  const [reviewsList, setReviewsList] = useState([
    { user: 'Meera K.', date: 'July 2, 2026', rating: 5, comment: 'Hands down the best imported ramen kit. The tonkotsu broth is incredibly rich and authentic.' },
    { user: 'Rohan S.', date: 'June 28, 2026', rating: 5, comment: 'Super easy to make! Tastes just like the ramen bowls I had in Tokyo.' },
    { user: 'Aditi P.', date: 'June 15, 2026', rating: 4, comment: 'Excellent quality and taste. Portion size is decent. Docked one star because delivery took 4 days.' }
  ]);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Fetch product data
  useEffect(() => {
    setIsLoading(true);
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
      setSelectedQty(1);
    }
    // Simulate short network loading for premium feel
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id, products]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Loader type="text" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-primary mb-4">Product Not Found</h2>
        <p className="text-brand-secondary mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-6 py-3 rounded-xl">
          Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const recommendations = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.country === product.country))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    
    setReviewsList([{ 
      user: user?.name || 'Guest User', 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
      rating: reviewRating, 
      comment: reviewComment 
    }, ...reviewsList]);
    
    setReviewComment('');
    setReviewRating(5);
    setIsWritingReview(false);
    
    toast.success('Review submitted successfully!', {
      style: { background: 'var(--color-brand-card)', color: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-border)' }
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumbs */}
      <nav className="mb-6 flex text-xs font-medium text-brand-secondary gap-1.5 items-center">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        <FiChevronRight size={10} />
        <Link to={`/category/all?category=${product.category}`} className="hover:text-brand-primary">{product.category}</Link>
        <FiChevronRight size={10} />
        <span className="text-brand-secondary font-semibold">{product.name}</span>
      </nav>

      {/* Main product view grid (Image vs details) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
        
        {/* Left Column: Image switcher gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Large Display Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
            
            {/* Tag Badges */}
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
              {product.tags && product.tags.map((t) => (
                <span key={t} className={`rounded px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md ${
                  t === 'AUTHENTIC PRODUCT' ? 'bg-[#f02424]' : 'bg-zinc-800'
                }`}>
                  {t}
                </span>
              ))}
            </div>

            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnail list */}
          <div className="flex gap-3">
            {product.images.map((img, index) => {
              const isSelected = activeImage === img;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-brand-card border-2 cursor-pointer transition-all ${
                    isSelected ? 'border-brand-red scale-95 shadow-md shadow-brand-red/20' : 'border-brand-border hover:border-brand-red/50'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  
                  {/* Add a "+ More" cover overlay on the last thumbnail if applicable */}
                  {index === 2 && product.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-white">
                      +{product.images.length - 3} More
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Specifications and Action fields */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-brand-primary leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Rating rating={product.rating} />
              <button onClick={() => setActiveTab('reviews')} className="text-xs text-brand-red hover:underline cursor-pointer">
                ({product.reviewsCount + (reviewsList.length - 3)} Reviews)
              </button>
            </div>
          </div>

          {/* Price Container */}
          <div className="rounded-2xl border border-brand-border bg-gradient-to-br from-brand-card to-brand-bg p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-brand-red">₹{product.price.toLocaleString('en-IN')}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-sm text-brand-secondary line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="rounded bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 text-xs font-bold text-brand-red">
                    -{product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Delivery service badge details */}
            <div className="mt-5 border-t border-brand-border pt-4 flex gap-3 items-start">
              <FiTruck size={18} className="text-brand-red mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-brand-primary">Doorstep Delivery in India</h4>
                <p className="text-[11px] text-brand-secondary mt-0.5 leading-relaxed">
                  Ships within 24 hours from local warehouse. Deliveries typically arrive in 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-secondary block uppercase tracking-wider">Quantity</span>
            <QuantitySelector quantity={selectedQty} onChange={setSelectedQty} maxStock={product.stock} />
          </div>

          {/* Add to cart / wishlist buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-brand-glow hover:scale-[1.01] cursor-pointer"
            >
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`py-3.5 px-6 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isFavorite 
                  ? 'border-brand-red text-brand-peach bg-brand-red/15' 
                  : 'border-brand-border bg-brand-card text-brand-secondary hover:text-brand-primary hover:bg-brand-card-hover'
              }`}
            >
              <FiHeart size={16} className={isFavorite ? 'fill-brand-red stroke-brand-red' : ''} />
              {isFavorite ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

        </div>

      </div>

      {/* Tabs Layout Section */}
      <div className="border-t border-brand-border pt-8">
        
        {/* Tab Headers */}
        <div className="flex gap-8 border-b border-brand-border mb-6 overflow-x-auto scrollbar-none">
          {['description', 'reviews', 'shipping'].map((tab) => {
            const label = 
              tab === 'description' ? 'Description' :
              tab === 'reviews' ? `Reviews (${product.reviewsCount + (reviewsList.length - 3)})` : 'Shipping Info';
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
                  isActive ? 'text-brand-peach' : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Grid (2 column structure matching design) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Left Area: Tab details (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'description' && (
              <div className="space-y-6 text-sm text-brand-secondary leading-relaxed font-light">
                <p>{product.description}</p>
                
                {product.boxContents && (
                  <div>
                    <h3 className="text-brand-primary font-bold text-base mb-3">What's in the Box?</h3>
                    <ul className="space-y-2 list-disc list-inside pl-1">
                      {product.boxContents.map((bullet, idx) => (
                        <li key={idx} className="marker:text-brand-red">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <h3 className="text-brand-primary font-bold text-base">Customer Reviews</h3>
                  <button 
                    onClick={() => setIsWritingReview(!isWritingReview)}
                    className="bg-brand-red/10 border border-brand-red/20 text-brand-peach hover:bg-brand-red hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isWritingReview ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>

                {/* Write Review Form */}
                {isWritingReview && (
                  <form onSubmit={handleReviewSubmit} className="bg-brand-card p-5 rounded-xl border border-brand-border space-y-4 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-sm font-bold text-brand-primary mb-2">Write your review</h4>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-secondary font-medium">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="text-xl focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                          >
                            <span className={star <= reviewRating ? "text-brand-peach" : "text-zinc-600"}>★</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-secondary font-medium">Your Review</label>
                      <textarea
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did you like or dislike about this product?"
                        className="w-full bg-brand-bg text-sm text-brand-primary border border-brand-border rounded-lg p-3 min-h-[100px] focus:outline-none focus:border-brand-red transition-colors resize-none"
                      />
                    </div>
                    <button type="submit" className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Review List */}
                <div className="space-y-4">
                  {reviewsList.map((rev, index) => (
                    <div key={index} className="border-b border-brand-border pb-4 space-y-1 text-sm last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-primary font-semibold">{rev.user}</span>
                        <span className="text-xs text-brand-secondary">{rev.date}</span>
                      </div>
                      <Rating rating={rev.rating} />
                      <p className="text-brand-secondary font-light mt-1.5 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-sm text-brand-secondary font-light leading-relaxed">
                <h3 className="text-brand-primary font-bold text-base mb-2">India Shipping & Delivery Info</h3>
                <p>We deliver premium Asian products to major cities across India (including Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, and Chennai).</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Standard Delivery:</strong> Free on orders above ₹1,000. Under ₹1,000, flat delivery fee of ₹50.</li>
                  <li><strong>Express Shipping:</strong> Deliveries arrive within 24-48 hours in Metro locations.</li>
                  <li><strong>Careful Packaging:</strong> Food items and ceramic glassware are packed in secure thermal bubble wrap and boxes to prevent damage.</li>
                </ul>
              </div>
            )}

          </div>

          {/* Right Area: Specifications card (1/3 width) */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
            <h3 className="text-brand-primary font-bold text-base mb-4">Specifications</h3>
            
            <div className="divide-y divide-brand-border">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 text-xs">
                  <span className="text-brand-secondary font-medium">{key}</span>
                  <span className="text-brand-primary font-semibold text-right max-w-[160px]">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Recommendations Shelf */}
      {recommendations.length > 0 && (
        <div className="border-t border-brand-border pt-12 mt-12">
          <h3 className="text-brand-primary font-bold text-lg mb-6">Recommended for You</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {recommendations.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
