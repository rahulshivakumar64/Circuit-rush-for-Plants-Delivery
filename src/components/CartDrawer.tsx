import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen,
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const distanceToFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold ? 0 : 39;
  const discount = cartSubtotal >= 999 ? 100 : 0;
  const finalTotal = cartSubtotal + deliveryFee - discount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-stone-900">
                Your Delivery Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Promise Meter */}
          <div className="px-4 py-2.5 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-medium text-emerald-900">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>
                {distanceToFree === 0 ? (
                  <span className="font-bold text-emerald-800">You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>Add ₹{distanceToFree} more for Free Delivery</span>
                )}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">15–30 min</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="text-4xl">🪴</span>
                <h3 className="text-base font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Add lush plants, planters, ESP32 boards, or DIY smart watering kits to start!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-5 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 block">
                      {item.product.size || item.product.subcategory.replace(/_/g, ' ')}
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-white border border-stone-300 rounded-lg overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Rush Green Discount (Orders &gt; ₹999)</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                  <span>To Pay</span>
                  <span className="tabular-nums text-base">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Plants safely packed in breathable transit sleeves</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
