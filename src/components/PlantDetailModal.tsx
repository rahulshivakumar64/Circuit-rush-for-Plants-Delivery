import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { PlantCare } from './PlantCare';
import { X, Check, ShoppingBag, Plus, Minus, ShieldAlert, Sparkles, Truck, Sun, Droplets, MapPin, Gauge } from 'lucide-react';

interface PlantDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ product, onClose }) => {
  const { cart, addToCart, updateQuantity } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const currentImage = images[selectedImageIndex] || product.image;

  const cartItem = cart.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              {product.subcategory.replace(/_/g, ' ')}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Item #{product.id}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Left */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 w-full bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-white/95 px-2.5 py-1 rounded shadow-xs">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>⚡ Delivery in {product.estimatedDelivery || '30–45 min'}</span>
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Kit Breakdown if Smart Gardening Kit */}
              {product.includesKitComponents && product.includesKitComponents.length > 0 && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    Components Included in Kit:
                  </h4>
                  <ul className="text-xs text-emerald-900 space-y-1.5">
                    {product.includesKitComponents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bundle Components if Bundle */}
              {product.bundleItems && product.bundleItems.length > 0 && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Bundle Items:
                  </h4>
                  <ul className="text-xs text-amber-900 space-y-1.5">
                    {product.bundleItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Product Purchase Module Right */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>Rating {product.rating} ★</span>
                  <span>·</span>
                  <span>{product.ratingCount} verified plant parents</span>
                </div>
                <h1 className="text-2xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing & Savings */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-stone-950 tabular-nums">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.bundleSavings ? (
                    <span className="text-xs font-bold text-emerald-700">
                      You save ₹{product.bundleSavings} with this pack!
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500">
                      Taxes included · Free express delivery over ₹499
                    </span>
                  )}
                </div>

                <div className="text-right">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      In Stock ({product.stockQuantity} ready)
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded">
                      Temporarily Sold Out
                    </span>
                  )}
                </div>
              </div>

              {/* Core Specifications Table (Requirement 4) */}
              <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden text-xs">
                {product.size && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-white">
                    <span className="font-semibold text-stone-600">Size:</span>
                    <span className="font-medium text-stone-900">{product.size}</span>
                  </div>
                )}
                {product.potInformation && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-stone-50/50">
                    <span className="font-semibold text-stone-600">Pot Information:</span>
                    <span className="font-medium text-stone-900 text-right max-w-[220px]">
                      {product.potInformation}
                    </span>
                  </div>
                )}
                {product.sunlightRequirement && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-white">
                    <span className="font-semibold text-stone-600 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-600" /> Light:
                    </span>
                    <span className="font-medium text-stone-900">{product.sunlightRequirement} to bright indirect</span>
                  </div>
                )}
                {product.waterRequirement && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-stone-50/50">
                    <span className="font-semibold text-stone-600 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-cyan-600" /> Water:
                    </span>
                    <span className="font-medium text-stone-900 text-right max-w-[240px]">
                      {product.waterRequirement}
                    </span>
                  </div>
                )}
                {product.difficulty && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-white">
                    <span className="font-semibold text-stone-600 flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-emerald-600" /> Difficulty:
                    </span>
                    <span className="font-medium text-stone-900">{product.difficulty}</span>
                  </div>
                )}
                {product.indoorOutdoor && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-stone-50/50">
                    <span className="font-semibold text-stone-600">Suitable for:</span>
                    <span className="font-medium text-stone-900">{product.indoorOutdoor}</span>
                  </div>
                )}
                {product.locations && product.locations.length > 0 && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-white">
                    <span className="font-semibold text-stone-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> Recommended Locations:
                    </span>
                    <span className="font-medium text-stone-900">
                      {product.locations.join(', ')}
                    </span>
                  </div>
                )}
                {product.soilType && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-stone-50/50">
                    <span className="font-semibold text-stone-600">Soil Type:</span>
                    <span className="font-medium text-stone-900 text-right max-w-[240px]">
                      {product.soilType}
                    </span>
                  </div>
                )}
                {product.petSafety && (
                  <div className="px-3.5 py-2.5 flex justify-between bg-white">
                    <span className="font-semibold text-stone-600 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Pet Safety:
                    </span>
                    <span className="font-medium text-stone-900 text-right max-w-[240px]">
                      {product.petSafety}
                    </span>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="pt-2 flex items-center gap-3">
                {quantity === 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                      justAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO YOUR CART!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between p-2 rounded-xl bg-stone-100 border border-stone-300">
                    <span className="text-xs font-semibold text-stone-700 ml-2">In your cart:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold text-stone-900 w-8 text-center tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plant Care Section (Requirement 5) */}
          {product.careInstructions && (
            <div className="pt-6 border-t border-stone-200">
              <PlantCare care={product.careInstructions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
