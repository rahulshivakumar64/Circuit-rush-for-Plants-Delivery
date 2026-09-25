import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, PlantCareInfo, SunlightLevel, MaintenanceLevel, PlantLocation, DifficultyLevel } from '../types';
import { X, Save, Plus, Edit2, RotateCcw, Check, ShoppingBag, Eye, Trash2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    updateProduct,
    addProduct,
    resetCatalog,
    orders,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'new_product'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for the selected product
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);
  const [editInStock, setEditInStock] = useState(true);
  const [editSize, setEditSize] = useState('');
  const [editPotIncluded, setEditPotIncluded] = useState(true);
  const [editPotInfo, setEditPotInfo] = useState('');
  const [editSunlight, setEditSunlight] = useState<SunlightLevel>('Low');
  const [editWater, setEditWater] = useState('');
  const [editSoil, setEditSoil] = useState('');
  const [editDifficulty, setEditDifficulty] = useState<DifficultyLevel>('Easy');
  const [editPetSafety, setEditPetSafety] = useState('');
  const [editMaintenance, setEditMaintenance] = useState<MaintenanceLevel>('Low');

  // Plant Care editable fields (Requirement 5)
  const [careSunlight, setCareSunlight] = useState('');
  const [careWater, setCareWater] = useState('');
  const [careSoil, setCareSoil] = useState('');
  const [careTemp, setCareTemp] = useState('');
  const [carePruning, setCarePruning] = useState('');

  // When selectedProduct changes, load fields into form state
  const loadProductIntoEditor = (p: Product) => {
    setSelectedProduct(p);
    setEditName(p.name);
    setEditPrice(p.price);
    setEditOriginalPrice(p.originalPrice || p.price);
    setEditStock(p.stockQuantity);
    setEditInStock(p.inStock);
    setEditSize(p.size || '');
    setEditPotIncluded(p.potIncluded ?? true);
    setEditPotInfo(p.potInformation || '');
    setEditSunlight(p.sunlightRequirement || 'Medium');
    setEditWater(p.waterRequirement || '');
    setEditSoil(p.soilType || '');
    setEditDifficulty(p.difficulty || 'Easy');
    setEditPetSafety(p.petSafety || '');
    setEditMaintenance(p.maintenanceLevel || 'Low');

    setCareSunlight(p.careInstructions?.sunlight || '');
    setCareWater(p.careInstructions?.water || '');
    setCareSoil(p.careInstructions?.soil || '');
    setCareTemp(p.careInstructions?.temperature || '');
    setCarePruning(p.careInstructions?.pruning || '');
  };

  // Sync initial selection
  React.useEffect(() => {
    if (selectedProduct) {
      loadProductIntoEditor(selectedProduct);
    } else if (products.length > 0) {
      loadProductIntoEditor(products[0]);
    }
  }, [selectedProduct?.id]);

  if (!isAdminOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const updated: Product = {
      ...selectedProduct,
      name: editName,
      price: Number(editPrice),
      originalPrice: Number(editOriginalPrice),
      stockQuantity: Number(editStock),
      inStock: editInStock,
      size: editSize,
      potIncluded: editPotIncluded,
      potInformation: editPotInfo,
      sunlightRequirement: editSunlight,
      waterRequirement: editWater,
      soilType: editSoil,
      difficulty: editDifficulty,
      petSafety: editPetSafety,
      maintenanceLevel: editMaintenance,
      careInstructions: {
        sunlight: careSunlight,
        water: careWater,
        soil: careSoil,
        temperature: careTemp,
        pruning: carePruning,
      },
    };

    updateProduct(updated);
    setSelectedProduct(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const filteredProducts = products.filter((p) => {
    if (filterCategory === 'plants') return p.mainCategory === 'plants_gardening';
    if (filterCategory === 'smart') return p.subcategory === 'smart_gardening';
    if (filterCategory === 'electronics') return p.mainCategory === 'electronics' || p.mainCategory === 'project_kits';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="text-base font-bold">CircuitRush Admin & Botanical Catalog Manager</h2>
              <p className="text-xs text-stone-400">
                Manage inventory, edit real-time plant care instructions, and track customer orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all catalog data back to default values?')) {
                  resetCatalog();
                }
              }}
              className="text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded bg-stone-800 transition-colors"
              title="Reset products to default"
            >
              Reset Data
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center gap-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'products'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Product Catalog & Plant Care Editor
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Live Customer Orders</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
              {orders.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Products & Care Info Editor */}
        {activeTab === 'products' && (
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Left Products List */}
            <div className="md:col-span-4 p-4 flex flex-col overflow-hidden max-h-[70vh]">
              <div className="mb-3 space-y-2">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Select Product ({filteredProducts.length})
                </span>
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-2 py-0.5 rounded ${filterCategory === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterCategory('plants')}
                    className={`px-2 py-0.5 rounded ${filterCategory === 'plants' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    🌱 Plants
                  </button>
                  <button
                    onClick={() => setFilterCategory('smart')}
                    className={`px-2 py-0.5 rounded ${filterCategory === 'smart' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    🤖 Smart
                  </button>
                  <button
                    onClick={() => setFilterCategory('electronics')}
                    className={`px-2 py-0.5 rounded ${filterCategory === 'electronics' ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-700'}`}
                  >
                    ⚡ Tech
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => loadProductIntoEditor(p)}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                      selectedProduct?.id === p.id
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-md object-cover bg-stone-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                        <span className="font-bold text-emerald-800">₹{p.price}</span>
                        <span>·</span>
                        <span className="truncate">{p.subcategory.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Editor Form */}
            <div className="md:col-span-8 p-6 overflow-y-auto max-h-[70vh]">
              {selectedProduct ? (
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Top Product Identity */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <span className="text-xs text-stone-500 uppercase font-semibold">Editing Product ID: #{selectedProduct.id}</span>
                      <h3 className="text-lg font-bold text-stone-900">{editName}</h3>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-98"
                    >
                      {saveSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Saved Successfully!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Core Attributes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      General Information & Pricing
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-stone-600 block mb-1">Product Title</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Original MRP (₹)</label>
                        <input
                          type="number"
                          value={editOriginalPrice}
                          onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Plant Size / Spec</label>
                        <input
                          type="text"
                          value={editSize}
                          onChange={(e) => setEditSize(e.target.value)}
                          placeholder="e.g. 4–6 inch plant"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botanical Specs */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Pot, Light & Maintenance Attributes (For Quiz & Details)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Pot Information</label>
                        <input
                          type="text"
                          value={editPotInfo}
                          onChange={(e) => setEditPotInfo(e.target.value)}
                          placeholder="e.g. Includes 4.5-inch Self-Watering Pot"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Sunlight Requirement</label>
                        <select
                          value={editSunlight}
                          onChange={(e) => setEditSunlight(e.target.value as SunlightLevel)}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600 bg-white"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="Bright">Bright</option>
                          <option value="Direct Sunlight">Direct Sunlight</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Maintenance Level</label>
                        <select
                          value={editMaintenance}
                          onChange={(e) => setEditMaintenance(e.target.value as MaintenanceLevel)}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600 bg-white"
                        >
                          <option value="Very Low">Very Low</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-600 block mb-1">Pet Safety</label>
                        <input
                          type="text"
                          value={editPetSafety}
                          onChange={(e) => setEditPetSafety(e.target.value)}
                          placeholder="e.g. Pet-friendly (Non-toxic)"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-stone-600 block mb-1">Soil Type</label>
                        <input
                          type="text"
                          value={editSoil}
                          onChange={(e) => setEditSoil(e.target.value)}
                          placeholder="e.g. Well-draining cactus and succulent mix"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-hidden focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editable Plant Care Guidelines (Explicit Requirement 5) */}
                  <div className="space-y-3 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                        <span>🌱 Plant Care Component Guidelines (Editable)</span>
                      </h4>
                      <span className="text-[10px] text-emerald-800 bg-white px-2 py-0.5 rounded font-medium border border-emerald-200">
                        Admin Editable
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                          <span>☀️ Sunlight Guidance</span>
                        </label>
                        <input
                          type="text"
                          value={careSunlight}
                          onChange={(e) => setCareSunlight(e.target.value)}
                          placeholder="e.g. Low/indirect light"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                          <span>💧 Water Guidance</span>
                        </label>
                        <input
                          type="text"
                          value={careWater}
                          onChange={(e) => setCareWater(e.target.value)}
                          placeholder="e.g. Allow soil to dry between watering"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                          <span>🌱 Soil Guidance</span>
                        </label>
                        <input
                          type="text"
                          value={careSoil}
                          onChange={(e) => setCareSoil(e.target.value)}
                          placeholder="e.g. Well-draining soil with perlite"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                          <span>🌡️ Temperature Guidance</span>
                        </label>
                        <input
                          type="text"
                          value={careTemp}
                          onChange={(e) => setCareTemp(e.target.value)}
                          placeholder="e.g. 18°C – 32°C; avoid cold drafts"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-stone-800 flex items-center gap-1 mb-1">
                          <span>✂️ Pruning Guidance</span>
                        </label>
                        <input
                          type="text"
                          value={carePruning}
                          onChange={(e) => setCarePruning(e.target.value)}
                          placeholder="e.g. Trim outer damaged tips at base"
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save & Apply Updates</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-16 text-center text-stone-400">
                  Select a product from the list to inspect and edit care instructions.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              Live Order Stream ({orders.length} orders placed)
            </h3>

            {orders.length === 0 ? (
              <div className="py-16 text-center text-stone-500">
                <span className="text-3xl">📦</span>
                <p className="mt-2 text-xs">No orders placed yet in this session. Add plants or kits to cart to test!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-800">Order #{ord.id}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-stone-700">
                      <p className="font-semibold">{ord.customerName} · {ord.customerPhone}</p>
                      <p className="text-stone-500">{ord.customerAddress}</p>
                      <p className="text-emerald-700">Slot: {ord.deliveryTimeSlot} · Payment: {ord.paymentMethod.toUpperCase()}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="text-stone-500">{ord.items.length} items in package</span>
                      <span className="font-extrabold text-stone-900 tabular-nums">Total: ₹{ord.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
