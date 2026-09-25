import React from 'react';
import { useApp } from '../context/AppContext';
import { PlantProductCard } from './PlantProductCard';
import { ArrowRight, Leaf, Sparkles, Cpu, Clock } from 'lucide-react';

export const BringNatureHomeSection: React.FC = () => {
  const { products, setActiveCategory, setActiveSubcategory, setIsQuizOpen } = useApp();

  // Find popular plants: Snake Plant, Money Plant, Aloe Vera, Tulsi, Peace Lily, Spider Plant
  const popularPlantIds = [
    'plant-snake-01',
    'plant-money-02',
    'plant-aloe-03',
    'plant-tulsi-04',
    'plant-peacelily-05',
    'plant-spider-06'
  ];

  const popularPlants = products.filter((p) => popularPlantIds.includes(p.id));

  const handleShopPlants = () => {
    setActiveCategory('plants_gardening');
    setActiveSubcategory(null);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSmartGardening = () => {
    const smartEl = document.getElementById('smart-gardening');
    if (smartEl) {
      smartEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveCategory('plants_gardening');
      setActiveSubcategory('smart_gardening');
    }
  };

  return (
    <section id="bring-nature-home" className="space-y-6">
      {/* Editorial Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white min-h-[360px] flex items-center shadow-lg border border-stone-800">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/bring_nature_home_hero_1790128880913.jpg"
            alt="Lush green botanical interior with smart plant care"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <span className="text-emerald-400">🌱</span>
            <span>NEW IN CIRCUITRUSH</span>
            <span className="text-stone-400">·</span>
            <span className="flex items-center gap-1 text-white">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>30–45 min delivery</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            🌱 Bring Nature Home
          </h2>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
            "Plants, planters and smart gardening essentials delivered to your doorstep."
          </p>

          {/* Action Buttons (Requirement 2) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleShopPlants}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-98 flex items-center gap-2"
            >
              <Leaf className="w-4 h-4" />
              <span>SHOP PLANTS</span>
            </button>

            <button
              onClick={handleSmartGardening}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-stone-600 transition-all active:scale-98 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>SMART GARDENING</span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 text-emerald-200 text-xs sm:text-sm font-semibold rounded-xl border border-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Find Your Plant Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popular Plants Showcase (Requirement 2: Snake Plant ₹299, Money Plant ₹199, Aloe Vera ₹149, Tulsi ₹99, Peace Lily ₹349, Spider Plant ₹249) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>Popular Plants</span>
              <span className="text-xs font-normal text-stone-500">
                (Fresh nursery stocks delivered in 30–45 mins)
              </span>
            </h3>
          </div>
          <button
            onClick={handleShopPlants}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
          >
            <span>Explore all varieties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {popularPlants.map((plant) => (
            <PlantProductCard key={plant.id} product={plant} />
          ))}
        </div>
      </div>
    </section>
  );
};
