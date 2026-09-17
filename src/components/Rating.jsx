import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function Rating({ rating, maxStars = 5 }) {
  // Generate stars based on rating
  return (
    <div className="flex items-center gap-0.5 text-brand-red">
      {[...Array(maxStars)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        return (
          <FiStar
            key={i}
            size={14}
            className={isFilled ? 'fill-brand-red stroke-brand-red' : 'stroke-zinc-700'}
          />
        );
      })}
    </div>
  );
}
