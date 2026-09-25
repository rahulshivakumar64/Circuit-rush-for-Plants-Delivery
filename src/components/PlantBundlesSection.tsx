import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';

export const PlantBundlesSection: React.FC = () => {
  const { products, addToCart, setSelectedProductForDetail } = useApp();

  const bundles = products.filter((p) => p.isBundle);

  return (
    <section id="plant-bundles" className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎁</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Curated Value Packs
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Curated Plant Bundles & Starter Packs
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Carefully paired botanical varieties with matching pots and nutrients. High savings, instant setup.
          </p>
        </div>
      </div>

      {/* 3-Column Bundle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          const savings = bundle.bundleSavings || ((bundle.originalPrice || 0) - bundle.price);

          return (
            <div
              key={bundle.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-emerald-600 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-amber-950 bg-amber-300 px-2.5 py-1 rounded shadow-xs">
                    SAVE ₹{savings}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-950 bg-white/95 px-2 py-0.5 rounded shadow-xs">
                    ⚡ 30–45 min delivery
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 hover:text-emerald-800 transition-colors">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {bundle.shortDescription}
                  </p>

                  {/* Included Items Formula */}
                  {bundle.bundleItems && (
                    <div className="mt-3.5 p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                        Included in this Pack:
                      </span>
                      <ul className="text-xs text-stone-600 space-y-1">
                        {bundle.bundleItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold text-xs">+</span>
                            <span className="text-stone-800">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price, Savings & Buy Button */}
                <div className="pt-3 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Bundle Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-stone-950 tabular-nums">
                          ₹{bundle.price}
                        </span>
                        {bundle.originalPrice && (
                          <span className="text-sm text-stone-400 line-through tabular-nums">
                            ₹{bundle.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        Save ₹{savings}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedProductForDetail(bundle)}
                      className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl text-center transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(bundle, 1)}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>BUY BUNDLE</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
