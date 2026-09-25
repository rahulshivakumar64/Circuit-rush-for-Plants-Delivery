import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, MapPin, Package, Bike, X, Sparkles } from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const { lastOrder, setLastOrder } = useApp();

  if (!lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">Order Confirmed! #{lastOrder.id}</h2>
          </div>
          <button
            onClick={() => setLastOrder(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live Tracker Stage */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                ⚡ Live Delivery Status
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded shadow-2xs">
                Estimated arrival: 25–35 min
              </span>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-emerald-900 block leading-tight">Order Placed</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-900 block leading-tight">Packing Plants</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-stone-500 block leading-tight">Out for Delivery</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs">
                  🏡
                </div>
                <span className="text-[10px] font-medium text-stone-500 block leading-tight">Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Details */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-stone-700 uppercase tracking-wider">Delivery To:</h4>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 space-y-1">
              <p className="font-bold text-stone-900">{lastOrder.customerName} ({lastOrder.customerPhone})</p>
              <p>{lastOrder.customerAddress}</p>
              <p className="text-emerald-700 font-medium">Slot: {lastOrder.deliveryTimeSlot}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-stone-700 uppercase tracking-wider">Order Items:</h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
              {lastOrder.items.map((item) => (
                <div key={item.product.id} className="p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-md object-cover bg-stone-100"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block truncate max-w-[200px]">
                        {item.product.name}
                      </span>
                      <span className="text-stone-500 text-[11px]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="p-3 bg-stone-100 rounded-xl flex items-center justify-between text-xs">
            <span className="font-bold text-stone-800">Total Paid ({lastOrder.paymentMethod.toUpperCase()}):</span>
            <span className="text-base font-extrabold text-stone-950 tabular-nums">
              ₹{lastOrder.total}
            </span>
          </div>

          <button
            onClick={() => setLastOrder(null)}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Continue Browsing Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
