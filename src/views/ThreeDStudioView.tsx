import React, { useState } from 'react';
import { ThreeDStationeryViewer } from '../components/ThreeDStationeryViewer';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Rotate3d, ShoppingBag, Sparkles, Check, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

export const ThreeDStudioView: React.FC = () => {
  const { addToCart, openProductDetail } = useShop();

  const [selectedProductType, setSelectedProductType] = useState<'notebook' | 'pen' | 'desk_organizer' | 'bottle'>('notebook');
  const [selectedColorHex, setSelectedColorHex] = useState<string>('#D8B4E2');

  const getCorrespondingProduct = () => {
    switch (selectedProductType) {
      case 'pen':
        return PRODUCTS.find((p) => p.id === 'sp-pens-02') || PRODUCTS[0];
      case 'desk_organizer':
        return PRODUCTS.find((p) => p.id === 'sp-desk-10') || PRODUCTS[0];
      case 'bottle':
        return PRODUCTS.find((p) => p.id === 'sp-bottle-03') || PRODUCTS[0];
      case 'notebook':
      default:
        return PRODUCTS.find((p) => p.id === 'sp-journal-01') || PRODUCTS[0];
    }
  };

  const product = getCorrespondingProduct();

  const pastelOptions = [
    { name: 'Lilac Dream', hex: '#D8B4E2', desc: 'Calming lavender tone for focus' },
    { name: 'Matcha Breeze', hex: '#A7D7C5', desc: 'Fresh aesthetic green for science notes' },
    { name: 'Peach Sorbet', hex: '#FBC4AB', desc: 'Warm comforting blush' },
    { name: 'Sky Cadet', hex: '#A2C4C9', desc: 'Classic powder blue' },
    { name: 'Butter Cream', hex: '#FEF08A', desc: 'Energetic cheerful yellow' },
  ];

  return (
    <div className="py-10 sm:py-14 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold mb-2">
            <Rotate3d className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive 3D Stationery Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Customize & Inspect in 3D
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Rotate 360°, inspect the texture, change pastel finishes, and preview your study stationery before it ships to your doorstep in Pakistan.
          </p>
        </div>

        {/* 3D Showcase Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Canvas */}
          <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
            <ThreeDStationeryViewer
              modelType={selectedProductType}
              initialColor={selectedColorHex}
              allowColorSwitch={true}
            />

            <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 px-2 pt-2 border-t border-stone-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Physical dimensions & color accuracy match real delivered products.
              </span>
              <span>Rendered with WebGL & Three.js</span>
            </div>
          </div>

          {/* Right Column: Customizer & Purchase Panel */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Step 1: Choose Model
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => setSelectedProductType('notebook')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    selectedProductType === 'notebook'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-2xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  160 GSM Journal
                </button>
                <button
                  onClick={() => setSelectedProductType('pen')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    selectedProductType === 'pen'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-2xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  CloudGrip Pen
                </button>
                <button
                  onClick={() => setSelectedProductType('desk_organizer')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    selectedProductType === 'desk_organizer'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-2xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Desk Carousel
                </button>
                <button
                  onClick={() => setSelectedProductType('bottle')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    selectedProductType === 'bottle'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-2xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Thermal Flask
                </button>
              </div>
            </div>

            {/* Step 2: Choose Pastel Finish */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Step 2: Choose Pastel Tone
              </span>
              <div className="space-y-2">
                {pastelOptions.map((tone) => (
                  <button
                    key={tone.hex}
                    onClick={() => setSelectedColorHex(tone.hex)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedColorHex === tone.hex
                        ? 'border-purple-600 bg-purple-50/50 shadow-2xs'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: tone.hex }}
                      />
                      <div className="text-left">
                        <span className="font-bold text-stone-900 block">{tone.name}</span>
                        <span className="text-[11px] text-stone-500">{tone.desc}</span>
                      </div>
                    </div>
                    {selectedColorHex === tone.hex && (
                      <Check className="w-4 h-4 text-purple-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Summary & Buy */}
            <div className="pt-4 border-t border-stone-100 space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">{product.name}</h3>
                    <p className="text-[11px] text-stone-500">{product.tagline}</p>
                  </div>
                  <span className="font-bold text-stone-900 text-sm tabular-nums whitespace-nowrap">
                    Rs. {product.pricePKR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-3.5 bg-stone-900 hover:bg-purple-950 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-purple-300" />
                  <span>Add Custom 3D Item to Pouch</span>
                </button>

                <button
                  onClick={() => openProductDetail(product.id)}
                  className="w-full py-2.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Product Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
