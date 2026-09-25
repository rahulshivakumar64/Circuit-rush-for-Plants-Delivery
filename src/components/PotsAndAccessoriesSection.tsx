import React from 'react';
import { useApp } from '../context/AppContext';
import { PlantProductCard } from './PlantProductCard';
import { Sparkles } from 'lucide-react';

export const PotsAndAccessoriesSection: React.FC = () => {
  const { products } = useApp();

  const accessories = products.filter(
    (p) =>
      p.subcategory === 'pots_planters' ||
      p.subcategory === 'soil_fertilizers' ||
      p.subcategory === 'gardening_tools'
  );

  return (
    <section id="pots-accessories" className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🏺</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Pots & Plant Care Essentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Pots, Planters & Organic Soil
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Handcrafted ceramics, sub-irrigating self-watering planters, carbon-steel tools, and enriched potting mediums.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {accessories.map((product) => (
          <PlantProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
