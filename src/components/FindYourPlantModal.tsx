import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PlantLocation, SunlightLevel, MaintenanceLevel, Product } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Sun, Home, Compass } from 'lucide-react';

interface FindYourPlantModalProps {
  onClose: () => void;
}

export const FindYourPlantModal: React.FC<FindYourPlantModalProps> = ({ onClose }) => {
  const { products, addToCart, setSelectedProductForDetail } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLocation, setSelectedLocation] = useState<PlantLocation | null>(null);
  const [selectedSunlight, setSelectedSunlight] = useState<SunlightLevel | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceLevel | null>(null);

  const locations: { id: PlantLocation; label: string; desc: string; icon: string }[] = [
    { id: 'Bedroom', label: 'Bedroom', desc: 'Serene, air-purifying, oxygen-releasing night plants', icon: '🛏️' },
    { id: 'Living Room', label: 'Living Room', desc: 'Statement foliage, vibrant ambient greenery', icon: '🛋️' },
    { id: 'Balcony', label: 'Balcony', desc: 'Sunny planters, fresh culinary herbs, flowering pots', icon: '🪴' },
    { id: 'Office', label: 'Office / Desk', desc: 'Compact, low-maintenance, resilient desk greens', icon: '💻' },
    { id: 'Outdoor Garden', label: 'Outdoor Garden', desc: 'Sun-worshipping shrubs, fruits & sacred herbs', icon: '🏡' },
  ];

  const sunlights: { id: SunlightLevel; label: string; desc: string; icon: string }[] = [
    { id: 'Low', label: 'Low', desc: 'Windowless rooms, deep interior corners, artificial light only', icon: '🌑' },
    { id: 'Medium', label: 'Medium', desc: 'Gentle indirect daylight, east-facing room, filtered glow', icon: '🌤️' },
    { id: 'Bright', label: 'Bright', desc: 'Generous indirect light near big windows without scorching heat', icon: '☀️' },
    { id: 'Direct Sunlight', label: 'Direct Sunlight', desc: '4–8 hours of intense direct beam on balcony or terrace', icon: '🔥' },
  ];

  const maintenances: { id: MaintenanceLevel; label: string; desc: string; icon: string }[] = [
    { id: 'Very Low', label: 'Very Low', desc: 'Water once every 2–3 weeks; survives frequent travel', icon: '🌵' },
    { id: 'Low', label: 'Low', desc: 'Water once a week; very forgiving of missed routines', icon: '🌿' },
    { id: 'Medium', label: 'Medium', desc: 'Water 2–3 times a week; occasional misting & feeding', icon: '🌱' },
    { id: 'High', label: 'High', desc: 'Daily attention, active pruning, fertilizer & love', icon: '🌺' },
  ];

  // Dynamic filter from products in the database
  const matchingPlants = useMemo(() => {
    if (!selectedLocation && !selectedSunlight && !selectedMaintenance) {
      return [];
    }

    const plantCandidates = products.filter(
      (p) => p.mainCategory === 'plants_gardening' && !p.isBundle && (p.locations || p.sunlightRequirement)
    );

    return plantCandidates
      .map((plant) => {
        let score = 0;
        const reasons: string[] = [];

        // Location match
        if (selectedLocation && plant.locations?.includes(selectedLocation)) {
          score += 40;
          reasons.push(`Perfect fit for your ${selectedLocation}`);
        }

        // Sunlight match
        if (selectedSunlight && plant.sunlightRequirement === selectedSunlight) {
          score += 40;
          reasons.push(`Thrives in ${selectedSunlight} light`);
        } else if (
          selectedSunlight === 'Bright' &&
          (plant.sunlightRequirement === 'Medium' || plant.sunlightRequirement === 'Direct Sunlight')
        ) {
          score += 20;
          reasons.push(`Adapts well to bright conditions`);
        } else if (
          selectedSunlight === 'Low' &&
          plant.sunlightRequirement === 'Low'
        ) {
          score += 40;
          reasons.push(`Tolerates low-light corners`);
        }

        // Maintenance match
        if (selectedMaintenance && plant.maintenanceLevel === selectedMaintenance) {
          score += 20;
          reasons.push(`${plant.maintenanceLevel} maintenance matches your routine`);
        } else if (
          selectedMaintenance === 'High' ||
          (selectedMaintenance === 'Medium' && plant.maintenanceLevel === 'Low') ||
          (selectedMaintenance === 'Low' && plant.maintenanceLevel === 'Very Low')
        ) {
          score += 15;
          reasons.push(`Very easy to maintain`);
        }

        return {
          plant,
          score,
          reasons,
        };
      })
      .filter((item) => item.score >= 40)
      .sort((a, b) => b.score - a.score);
  }, [products, selectedLocation, selectedSunlight, selectedMaintenance]);

  const handleReset = () => {
    setSelectedLocation(null);
    setSelectedSunlight(null);
    setSelectedMaintenance(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌿</span>
            <div>
              <h2 className="text-lg font-bold">Find Your Plant</h2>
              <p className="text-xs text-emerald-200">
                Answer 3 quick questions to discover your botanical match
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close wizard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === s
                    ? 'bg-emerald-700 text-white'
                    : step > s || step === 4
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                {step > s || step === 4 ? '✓' : s}
              </span>
            ))}
            <span className="font-semibold text-stone-700 ml-1">
              {step === 1 && 'Step 1: Location'}
              {step === 2 && 'Step 2: Sunlight'}
              {step === 3 && 'Step 3: Maintenance'}
              {step === 4 && 'Your Botanical Matches'}
            </span>
          </div>

          {(selectedLocation || selectedSunlight || selectedMaintenance) && (
            <button
              onClick={handleReset}
              className="text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Location */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Question 1 of 3</span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  Where will you keep the plant?
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select your primary space to match indoor air circulation and space requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                      selectedLocation === loc.id
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-2 bg-white rounded-lg border border-stone-200 shadow-xs">
                      {loc.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{loc.label}</h4>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{loc.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Sunlight */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Question 2 of 3</span>
                  <h3 className="text-xl font-bold text-stone-900 mt-1">
                    How much sunlight does the location receive?
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Lighting determines your plant’s growth rate and watering frequency.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {sunlights.map((sun) => (
                  <button
                    key={sun.id}
                    onClick={() => {
                      setSelectedSunlight(sun.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                      selectedSunlight === sun.id
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-2 bg-white rounded-lg border border-stone-200 shadow-xs">
                      {sun.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{sun.label}</h4>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{sun.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Maintenance */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Question 3 of 3</span>
                  <h3 className="text-xl font-bold text-stone-900 mt-1">
                    How much maintenance do you want?
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Be honest! We have hardy survivors that thrive even if you forget them for weeks.
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {maintenances.map((maint) => (
                  <button
                    key={maint.id}
                    onClick={() => {
                      setSelectedMaintenance(maint.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                      selectedMaintenance === maint.id
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-2 bg-white rounded-lg border border-stone-200 shadow-xs">
                      {maint.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{maint.label}</h4>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{maint.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Results */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Filter Profile</span>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-emerald-950 font-medium">
                    <span>📍 {selectedLocation}</span>
                    <span>·</span>
                    <span>☀️ {selectedSunlight} Sunlight</span>
                    <span>·</span>
                    <span>⏳ {selectedMaintenance} Maintenance</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-300 hover:bg-emerald-100 transition-colors shrink-0"
                >
                  Adjust Answers
                </button>
              </div>

              <h4 className="text-sm font-bold text-stone-900">
                Recommended Plants for You ({matchingPlants.length} matches found):
              </h4>

              {matchingPlants.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-stone-300 rounded-xl">
                  <span className="text-3xl">🌱</span>
                  <h4 className="text-base font-semibold text-stone-800 mt-2">
                    No exact match for this combination
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Try selecting Medium sunlight or Low maintenance to discover more hardy indoor plants.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800"
                  >
                    Start Over
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingPlants.map(({ plant, score, reasons }) => (
                    <div
                      key={plant.id}
                      className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-500 bg-white shadow-xs flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {score}% Match
                            </span>
                            <span className="text-xs font-bold text-stone-900 tabular-nums">
                              ₹{plant.price}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 mt-1 truncate">
                            {plant.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {plant.size || 'Compact size'} · {plant.potIncluded ? 'Pot included' : 'Bare-root'}
                          </p>

                          {reasons.length > 0 && (
                            <ul className="mt-2 space-y-0.5">
                              {reasons.slice(0, 2).map((r, i) => (
                                <li key={i} className="text-[10px] text-emerald-800 flex items-center gap-1 font-medium">
                                  <span>✓</span>
                                  <span className="truncate">{r}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProductForDetail(plant);
                            onClose();
                          }}
                          className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold text-center transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(plant, 1)}
                          className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
