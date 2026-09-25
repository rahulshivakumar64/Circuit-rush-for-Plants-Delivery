import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Plus, Minus, ShoppingBag, Check, Info } from 'lucide-react';

interface PlantProductCardProps {
  product: Product;
}

export const PlantProductCard: React.FC<PlantProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, setSelectedProductForDetail } = useApp();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cart.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div
      onClick={() => setSelectedProductForDetail(product)}
      className="group relative flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-emerald-600/60 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Image container with 4:3 aspect ratio */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-emerald-900/5 text-emerald-800 text-center">
            <span className="text-3xl mb-1">🪴</span>
            <span className="text-xs font-medium text-stone-600 line-clamp-1">
              {product.name}
            </span>
          </div>
        )}

        {/* Delivery badge overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
            <span className="text-amber-500">⚡</span>
            <span>{product.estimatedDelivery || '30–45 min'}</span>
          </span>
          {product.isBundle && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
              SAVE ₹{product.bundleSavings}
            </span>
          )}
        </div>

        {/* Quick view icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductForDetail(product);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-stone-900 flex items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
          title="View detailed plant care & specifications"
          aria-label="View specifications"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Unboxed Metadata (Section 1A Anti-Slop Zero-Pill) */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium mb-1">
            {product.size ? (
              <>
                <span className="text-stone-700 font-semibold">{product.size}</span>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <span>
              {product.potIncluded ? 'Pot included' : 'Bare-root / Nursery bag'}
            </span>
          </div>

          {/* Plant Name */}
          <h3 className="text-sm font-semibold text-stone-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          {/* Availability Status */}
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-600">
            {product.availableNearby ? (
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available nearby
              </span>
            ) : (
              <span className="text-amber-700 font-medium">In stock in central hub</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-950 tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.potInformation && (
              <span className="text-[10px] text-stone-500 truncate max-w-[130px]">
                {product.potInformation}
              </span>
            )}
          </div>

          {/* Add to Cart / Quantity Stepper */}
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-97'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-stone-100 border border-stone-300 rounded-lg overflow-hidden shrink-0 shadow-xs"
            >
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:bg-stone-300 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:bg-stone-300 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
