import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function QuantitySelector({ quantity, onChange, maxStock = 99 }) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-lg border border-[#222] bg-[#161616] p-1.5">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="rounded p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-12 text-center text-sm font-semibold text-white select-none">
          {quantity}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxStock}
          className="rounded p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
        >
          <FiPlus size={14} />
        </button>
      </div>
      <span className="text-xs text-zinc-500 font-medium">
        {maxStock <= 5 ? `Only ${maxStock} left in stock` : 'In stock'}
      </span>
    </div>
  );
}
