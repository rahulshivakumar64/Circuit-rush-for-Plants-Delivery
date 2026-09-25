import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PLANT_SUBCATEGORIES } from '../data/initialProducts';
import { ShoppingBag, Search, Sparkles, Settings, Zap, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    isAdminOpen,
    setIsAdminOpen,
    setIsQuizOpen,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (cat: string, sub: string | null = null) => {
    setActiveCategory(cat);
    setActiveSubcategory(sub);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Notice Bar */}
      <div className="bg-emerald-950 text-emerald-200 text-[11px] font-medium py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="text-amber-400">⚡</span>
          <span>Ultra-Fast Delivery (15–45 Mins) for Electronics & Living Plants</span>
          <span className="hidden sm:inline text-emerald-500">·</span>
          <span className="hidden sm:inline text-emerald-300">Free delivery on orders over ₹499</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-emerald-300">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hover:text-white flex items-center gap-1 font-semibold transition-colors"
          >
            <span>🌿 Find Your Plant Quiz</span>
          </button>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <Settings className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar (Conforms to Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('all', null);
          }}
          className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5 shrink-0"
        >
          <span>CircuitRush</span>
          <span className="text-amber-500 text-lg">⚡</span>
        </a>

        {/* Search Bar Center */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Snake plant, ESP32, sensors, ceramic pots..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 hover:bg-stone-150 focus:bg-white border border-transparent focus:border-emerald-600 rounded-xl outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Zone 2: 4-5 Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-stone-700">
          <button
            onClick={() => handleNavClick('all')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'all' && !activeSubcategory ? 'text-emerald-700 font-bold' : 'hover:text-stone-950'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => handleNavClick('plants_gardening', null)}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
              activeCategory === 'plants_gardening' && !activeSubcategory ? 'text-emerald-700 font-bold' : 'hover:text-stone-950'
            }`}
          >
            <span>🌱 Plants & Gardening</span>
          </button>
          <button
            onClick={() => handleNavClick('plants_gardening', 'smart_gardening')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
              activeSubcategory === 'smart_gardening' ? 'text-emerald-700 font-bold' : 'hover:text-stone-950'
            }`}
          >
            <span>🤖 Smart Gardening</span>
          </button>
          <button
            onClick={() => handleNavClick('electronics')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'electronics' ? 'text-emerald-700 font-bold' : 'hover:text-stone-950'
            }`}
          >
            Electronics
          </button>
          <button
            onClick={() => handleNavClick('project_kits')}
            className={`transition-colors whitespace-nowrap ${
              activeCategory === 'project_kits' ? 'text-emerald-700 font-bold' : 'hover:text-stone-950'
            }`}
          >
            Project Kits
          </button>
        </nav>

        {/* Zone 3: Actions (Find Plant Quiz, Admin & Cart) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100/80 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="whitespace-nowrap">Find Plant</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="sm:hidden w-9 h-9 rounded-lg border border-stone-200 text-stone-700 flex items-center justify-center hover:bg-stone-100"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-97"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-black text-[11px] flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg border border-stone-200 text-stone-700 flex items-center justify-center hover:bg-stone-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Subcategory Strip for Plants & Gardening */}
      <div className="bg-stone-50 border-t border-stone-200 overflow-x-auto no-scrollbar py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider whitespace-nowrap shrink-0 pr-1">
            🌱 Categories:
          </span>

          <button
            onClick={() => handleNavClick('plants_gardening', null)}
            className={`px-3 py-1 rounded-full whitespace-nowrap shrink-0 font-medium transition-colors ${
              activeCategory === 'plants_gardening' && !activeSubcategory
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-300'
            }`}
          >
            All Plants
          </button>

          {PLANT_SUBCATEGORIES.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleNavClick('plants_gardening', sub.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap shrink-0 font-medium transition-colors flex items-center gap-1 ${
                activeSubcategory === sub.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-300'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white p-4 space-y-3 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 rounded-lg border border-stone-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-stone-800">
            <button
              onClick={() => handleNavClick('all')}
              className="p-2.5 rounded-lg bg-stone-50 text-left hover:bg-stone-100"
            >
              All Products
            </button>
            <button
              onClick={() => handleNavClick('plants_gardening')}
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-left hover:bg-emerald-100"
            >
              🌱 Plants & Gardening
            </button>
            <button
              onClick={() => handleNavClick('plants_gardening', 'smart_gardening')}
              className="p-2.5 rounded-lg bg-stone-50 text-left hover:bg-stone-100"
            >
              🤖 Smart Gardening
            </button>
            <button
              onClick={() => handleNavClick('electronics')}
              className="p-2.5 rounded-lg bg-stone-50 text-left hover:bg-stone-100"
            >
              Electronics & MCUs
            </button>
            <button
              onClick={() => handleNavClick('project_kits')}
              className="p-2.5 rounded-lg bg-stone-50 text-left hover:bg-stone-100"
            >
              Project & DIY Kits
            </button>
            <button
              onClick={() => {
                setIsQuizOpen(true);
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-amber-50 text-amber-900 text-left font-bold"
            >
              🌿 Find Your Plant Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
