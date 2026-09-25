import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Clock, RefreshCw, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveCategory, setActiveSubcategory, setIsQuizOpen, setIsAdminOpen } = useApp();

  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-900 text-stone-300">
      {/* Trust Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Ultra-Fast 15–45 Min</h4>
            <p className="text-stone-400 mt-0.5">Quick-commerce dark store dispatch</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Guaranteed Fresh Nursery Stock</h4>
            <p className="text-stone-400 mt-0.5">Packed in ventilated shockproof pods</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">7-Day Botanical Guarantee</h4>
            <p className="text-stone-400 mt-0.5">Free replacement if damaged in transit</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Open 7 AM – Midnight</h4>
            <p className="text-stone-400 mt-0.5">All 7 days across service hubs</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <div className="flex items-center gap-1.5 text-lg font-black text-white">
            <span>CircuitRush</span>
            <span className="text-amber-400">⚡</span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            The hyper-local delivery platform for hardware makers, electronics hobbyists, and plant lovers. From microcontrollers to lush air-purifying foliage.
          </p>
          <div className="pt-1">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-white underline font-medium"
            >
              Access Admin & Care Editor
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Plants & Gardening
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('indoor_plants');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Indoor Plants
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('succulents');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Succulents & Cacti
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('herbs');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Kitchen Herbs
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('air_purifying_plants');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Air-Purifying Plants
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                🌿 Find Your Plant Quiz
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Smart IoT & Tech
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('smart_gardening');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Automatic Watering Kits
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('electronics');
                  setActiveSubcategory('microcontrollers');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                ESP32 & Arduino Boards
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('electronics');
                  setActiveSubcategory('sensors_iot');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Soil & Moisture Sensors
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveCategory('project_kits')}
                className="hover:text-emerald-400 transition-colors"
              >
                DIY STEM & Robotics Kits
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Pots & Supplies
          </h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('pots_planters');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Ceramic & Self-Watering Pots
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('soil_fertilizers');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Organic Potting Mix & Perlite
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('plants_gardening');
                  setActiveSubcategory('gardening_tools');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Heavy Duty Garden Tools
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
        <p>© 2026 CircuitRush Inc. Rapid delivery for smart builders and indoor gardeners.</p>
      </div>
    </footer>
  );
};
