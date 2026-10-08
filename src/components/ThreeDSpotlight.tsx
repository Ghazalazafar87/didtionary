import React from 'react';
import { ThreeDStationeryViewer } from './ThreeDStationeryViewer';
import { useShop } from '../context/ShopContext';
import { Rotate3d, CheckCircle2, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ThreeDSpotlight: React.FC = () => {
  const { openProductDetail, addToCart } = useShop();
  const signatureJournal = PRODUCTS.find((p) => p.id === 'sp-journal-01') || PRODUCTS[0];

  return (
    <section className="py-14 sm:py-20 bg-stone-100/60 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive 3D Canvas */}
          <div className="lg:col-span-7">
            <ThreeDStationeryViewer
              modelType="notebook"
              initialColor="#D8B4E2"
              allowColorSwitch={true}
            />
          </div>

          {/* Right Column: 3D Studio Story & Action */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
              <Rotate3d className="w-3.5 h-3.5 text-purple-600" />
              <span>Interactive 3D Preview Lab</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Inspect Every Angle Before It Ships to Your Campus
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              We know stationery quality matters. Use our real-time 3D Studio to examine the thickness of our 160 GSM bamboo paper, the gilded gold ribbon bookmark, and the buttery soft vegan leather cover in your favorite pastel shade.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>160 GSM pure white bamboo fiber (Zero ghosting guarantee)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>180° Lay-flat thread binding for effortless note-taking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available in Lilac, Sage Green, Peach, and Sky Blue</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => openProductDetail(signatureJournal.id)}
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-purple-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>View Full Product Specs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToCart(signatureJournal, 1, 'Lilac Cloud')}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-purple-50 text-stone-800 hover:text-purple-900 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-purple-600" />
                <span>Quick Add (Rs. 1,850)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
