import React from 'react';
import { useApp } from '../context/AppContext';
import { PlantProductCard } from './PlantProductCard';
import { Cpu, Zap, Wifi, Droplets, Check, ShoppingBag, ArrowRight } from 'lucide-react';

export const SmartGardeningSection: React.FC = () => {
  const { products, addToCart, setSelectedProductForDetail, setActiveCategory, setActiveSubcategory } = useApp();

  // Find the featured Automatic Plant Watering Kit
  const autoWaterKit = products.find((p) => p.id === 'smart-kit-auto-water-01');

  // Smart gardening items
  const smartProducts = products.filter(
    (p) => p.subcategory === 'smart_gardening' && p.id !== 'smart-kit-auto-water-01'
  );

  return (
    <section id="smart-gardening" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🤖</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              IoT & Botanical Tech
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Smart Gardening & Automation
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Where electronics meet botany. Automate drip irrigation, monitor microclimate with DHT & ESP32, and keep plants hydrated even when you travel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveCategory('plants_gardening');
              setActiveSubcategory('smart_gardening');
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>View All IoT Components</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Automatic Plant Watering Kit Hero Card (Requirement 6) */}
      {autoWaterKit && (
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-stone-900 to-emerald-950 text-white overflow-hidden p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded">
                  ⚡ 15–25 Min Delivery
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-emerald-200">No Soldering Required</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Automatic Plant Watering Kit
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed">
                Connects capacitive soil moisture detection directly to an ESP32 microcontroller and miniature water pump. Automatically waters your plants based on live soil telemetry.
              </p>

              {/* Kit Breakdown formula */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Complete Kit Includes:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>ESP32 WiFi Board</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>Soil Moisture Sensor</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>Mini Water Pump</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>Relay Module</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>Silicone Water Tube</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>Jumper Wires</span>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white tabular-nums">
                    ₹{autoWaterKit.price}
                  </span>
                  {autoWaterKit.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ₹{autoWaterKit.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-400">
                    Save ₹{(autoWaterKit.originalPrice || 0) - autoWaterKit.price}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => addToCart(autoWaterKit, 1)}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>BUY KIT</span>
                  </button>
                  <button
                    onClick={() => setSelectedProductForDetail(autoWaterKit)}
                    className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-xs rounded-xl transition-colors"
                  >
                    View Specifications
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={autoWaterKit.image}
                  alt="Automatic Plant Watering Kit"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Gardening Components Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-stone-900">
            Microcontrollers, Sensors & Actuators for Smart Plants
          </h3>
          <span className="text-xs text-stone-500">
            {smartProducts.length + 1} IoT hardware items ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {smartProducts.map((product) => (
            <PlantProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
