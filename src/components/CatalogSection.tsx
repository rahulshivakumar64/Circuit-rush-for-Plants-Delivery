import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PlantProductCard } from './PlantProductCard';
import { PLANT_SUBCATEGORIES } from '../data/initialProducts';
import { Filter, Sparkles, Search, RotateCcw } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    searchQuery,
    setSearchQuery,
    setIsQuizOpen,
  } = useApp();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSubcat = product.subcategory.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesSubcat && !matchesTags) {
          return false;
        }
      }

      // Main category check
      if (activeCategory !== 'all') {
        if (product.mainCategory !== activeCategory) {
          // If searching in smart gardening, include smart gardening items even if cross-listed
          if (activeSubcategory === 'smart_gardening' && product.subcategory === 'smart_gardening') {
            // allow
          } else {
            return false;
          }
        }
      }

      // Subcategory check
      if (activeSubcategory) {
        if (product.subcategory !== activeSubcategory) {
          return false;
        }
      }

      return true;
    });
  }, [products, activeCategory, activeSubcategory, searchQuery]);

  return (
    <section id="catalog-section" className="space-y-6 pt-4">
      {/* Category Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              {activeCategory === 'plants_gardening'
                ? '🌱 Plants & Smart Gardening'
                : activeCategory === 'electronics'
                ? '⚡ Electronics & Components'
                : activeCategory === 'project_kits'
                ? '🛠️ DIY & STEM Kits'
                : '📦 All Rush Catalog'}
            </span>
            {activeSubcategory && (
              <>
                <span className="text-stone-300">/</span>
                <span className="text-xs font-semibold text-stone-600">
                  {activeSubcategory.replace(/_/g, ' ')}
                </span>
              </>
            )}
          </div>

          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : activeSubcategory
              ? activeSubcategory.replace(/_/g, ' ').toUpperCase()
              : activeCategory === 'plants_gardening'
              ? 'Living Plants, Planters & Care'
              : 'Complete Catalog'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Showing {filteredProducts.length} items available for immediate delivery
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Clear Filter button if filters active */}
          {(activeCategory !== 'all' || activeSubcategory || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveSubcategory(null);
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Find Plant Match</span>
          </button>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
          <span className="text-4xl">🪴</span>
          <h3 className="text-base font-bold text-stone-800">No items match your criteria</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search terms, removing subcategory filters, or browsing our popular beginner indoor plants.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveSubcategory(null);
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <PlantProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
