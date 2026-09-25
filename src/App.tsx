import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BringNatureHomeSection } from './components/BringNatureHomeSection';
import { SmartGardeningSection } from './components/SmartGardeningSection';
import { PlantBundlesSection } from './components/PlantBundlesSection';
import { PotsAndAccessoriesSection } from './components/PotsAndAccessoriesSection';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { PlantDetailModal } from './components/PlantDetailModal';
import { FindYourPlantModal } from './components/FindYourPlantModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminDashboard } from './components/AdminDashboard';

const MainLayout: React.FC = () => {
  const {
    activeCategory,
    activeSubcategory,
    searchQuery,
    selectedProductForDetail,
    setSelectedProductForDetail,
    isQuizOpen,
    setIsQuizOpen,
  } = useApp();

  const isHomeView = activeCategory === 'all' && !activeSubcategory && !searchQuery;

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 flex-1 w-full">
        {/* If user is on default homepage view without search, show full curated experience */}
        {isHomeView ? (
          <>
            {/* 1. New Homepage Section: 🌱 Bring Nature Home */}
            <BringNatureHomeSection />

            {/* 2. Special Category: 🤖 Smart Gardening */}
            <SmartGardeningSection />

            {/* 3. Plant Bundles: Beginner, Balcony, Air-Purifying Packs */}
            <PlantBundlesSection />

            {/* 4. Pots & Accessories */}
            <PotsAndAccessoriesSection />

            {/* 5. Complete Searchable Catalog & Electronics Prototyping Gear */}
            <CatalogSection />
          </>
        ) : (
          /* Filtered or Searched view leads directly with the filtered catalog */
          <div className="space-y-8">
            <CatalogSection />
          </div>
        )}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      {selectedProductForDetail && (
        <PlantDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
        />
      )}

      {isQuizOpen && (
        <FindYourPlantModal onClose={() => setIsQuizOpen(false)} />
      )}

      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <AdminDashboard />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
