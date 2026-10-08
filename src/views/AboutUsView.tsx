import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Heart, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Born Out of Late-Night Library Sessions in Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            StudyPop started with a simple frustration: why was every cute stationery set in Pakistan either an overpriced import with Rs. 3,000 shipping, or cheap paper that bled through on every page?
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            In late 2024, our founder was preparing for university midterms in Lahore. Every textbook summary was ruined by ink feathering through thin 65 GSM sheets. Local bookshops only stocked generic brown registers, while international stationery boutiques charged prohibitive customs duties.
          </p>
          <p>
            We set out to create <strong>StudyPop Pakistan</strong>: an aesthetic, playful, and meticulously engineered stationery brand tailored specifically to students in Pakistan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            <div className="bg-purple-50 p-4 rounded-2xl">
              <span className="font-bold text-sm text-purple-900 block mb-1">160 GSM Paper</span>
              <p className="text-xs text-stone-600">
                Custom milled bamboo fiber paper that stands up to fountain pens, gel ink, and watercolors with zero bleed-through.
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-2xl">
              <span className="font-bold text-sm text-pink-900 block mb-1">Affordable PKR</span>
              <p className="text-xs text-stone-600">
                Transparent student-first pricing in Pakistani Rupees. No foreign currency exchange markups or hidden customs fees.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl">
              <span className="font-bold text-sm text-emerald-900 block mb-1">Nationwide COD</span>
              <p className="text-xs text-stone-600">
                Reliable TCS & Trax courier delivery to every campus, hostel, and doorstep from Karachi to Gilgit-Baltistan.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Note & CTA */}
        <div className="bg-purple-900 text-white p-8 rounded-3xl shadow-md text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Study Hard. Make It Aesthetic.
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-md mx-auto">
            Whether you're prepping for MDCAT, ECAT, CA, CSS, or university finals, we hope our tools bring joy to your daily grind.
          </p>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white text-purple-900 hover:bg-yellow-200 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Our Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
