import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, ShieldCheck, Zap, Truck, CreditCard, Banknote } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, placeOrder } = useApp();

  const [name, setName] = useState('Rahul Shivakumar');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [address, setAddress] = useState('Flat 402, Green Orchid Apartments, 12th Main, Indiranagar, Bengaluru');
  const [slot, setSlot] = useState('Instant Rush (⚡ 15–30 min)');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartSubtotal >= 499 ? 0 : 39;
  const discount = cartSubtotal >= 999 ? 100 : 0;
  const total = cartSubtotal + deliveryFee - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        deliveryTimeSlot: slot,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold">Express Checkout</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Order Summary Pill */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-stone-900 block">{cart.length} items in package</span>
              <span className="text-stone-500">Living plants & tech accessories</span>
            </div>
            <span className="text-base font-extrabold text-emerald-800 tabular-nums">
              ₹{total}
            </span>
          </div>

          {/* Delivery Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              1. Delivery Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Delivery Address</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Delivery Speed / Slot */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              2. Delivery Speed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  slot.includes('Instant')
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  checked={slot.includes('Instant')}
                  onChange={() => setSlot('Instant Rush (⚡ 15–30 min)')}
                  className="accent-emerald-700"
                />
                <div>
                  <span>⚡ Instant Rush</span>
                  <span className="block text-[10px] text-stone-500 font-normal">Arrives in 15–30 min</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  slot.includes('Evening')
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  checked={slot.includes('Evening')}
                  onChange={() => setSlot('Evening Slot (6:00 PM – 8:00 PM)')}
                  className="accent-emerald-700"
                />
                <div>
                  <span>🌅 Evening Handover</span>
                  <span className="block text-[10px] text-stone-500 font-normal">Between 6–8 PM today</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              3. Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Zap className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span>UPI (Fast)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                <span>Card / NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-700" />
                <span>Cash on Delivery</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Confirming order...</span>
            ) : (
              <>
                <span>CONFIRM ORDER (₹{total})</span>
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
