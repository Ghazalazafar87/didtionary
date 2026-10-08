import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Rotate3d, ShieldCheck, Truck, CreditCard, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActivePage, openProductDetail } = useShop();

  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20">
      {/* Subtle pastel ambient background blobs */}
      <div className="absolute top-10 left-1/4 -z-10 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-10 -z-10 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-10 -z-10 w-72 h-72 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Created for Students across Pakistan</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] text-balance">
              Pakistan’s Cutest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600">
                Aesthetic Study
              </span>{' '}
              Essentials.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform mundane study sessions into your aesthetic happy place. Bleed-proof 160 GSM journals, 0.5mm quick-dry exam pens, and pastel desk organizers delivered right to your doorstep.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-stone-900 hover:bg-purple-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Shop All Stationery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('3d-studio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-purple-50 text-stone-800 hover:text-purple-900 border border-stone-300 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Rotate3d className="w-4 h-4 text-purple-600" />
                <span>3D Stationery Studio</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency Trust Badges */}
            <div className="pt-4 border-t border-stone-200/70 grid grid-cols-3 gap-3 text-stone-600 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Nationwide</span>
                </div>
                <p className="text-[11px] text-stone-500">2-4 days via TCS / Trax</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                  <span>Easy COD</span>
                </div>
                <p className="text-[11px] text-stone-500">Cash / JazzCash / Easypaisa</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5 Rating</span>
                </div>
                <p className="text-[11px] text-stone-500">3,500+ happy students</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Showcase with Floating Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xl bg-white group">
              <img
                src="/src/assets/images/hero_stationery_flatlay_1791392070227.jpg"
                alt="Aesthetic pastel stationery setup for Pakistani students"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Scrim overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent p-5 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-purple-300">
                      Signature Collection
                    </span>
                    <h3 className="text-base sm:text-lg font-bold">The Semester Reset Kit</h3>
                    <p className="text-xs text-stone-300">
                      Bleed-proof journals, fine pens & sticky memos
                    </p>
                  </div>
                  <button
                    onClick={() => openProductDetail('sp-journal-01')}
                    className="px-3.5 py-1.5 bg-white text-stone-900 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Set
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Micro Card 1: 160 GSM Journal */}
            <div
              onClick={() => openProductDetail('sp-journal-01')}
              className="absolute -bottom-2 left-1 sm:-bottom-5 sm:-left-4 bg-white/95 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition-all max-w-[155px] sm:max-w-[210px] animate-float-slow z-10"
            >
              <img
                src="/src/assets/images/product_pastel_bullet_journal_1791392080472.jpg"
                alt="Dot grid journal"
                className="w-8 h-8 sm:w-11 sm:h-11 object-cover rounded-xl shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] text-purple-700 font-bold uppercase">160 GSM</span>
                <p className="text-[11px] sm:text-xs font-bold text-stone-900 truncate">Velvet Journal</p>
                <p className="text-[11px] sm:text-xs font-bold text-purple-900 tabular-nums">Rs. 1,850</p>
              </div>
            </div>

            {/* Floating Micro Card 2: Gel Pens */}
            <div
              onClick={() => openProductDetail('sp-pens-02')}
              className="absolute -top-2 right-1 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-stone-200 shadow-xl flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition-all max-w-[155px] sm:max-w-[210px] animate-float-reverse z-10"
            >
              <img
                src="/src/assets/images/product_kawaii_gel_pens_1791392092715.jpg"
                alt="Gel pens"
                className="w-8 h-8 sm:w-11 sm:h-11 object-cover rounded-xl shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] text-pink-700 font-bold uppercase">Quick Dry</span>
                <p className="text-[11px] sm:text-xs font-bold text-stone-900 truncate">CloudGrip Pens</p>
                <p className="text-[11px] sm:text-xs font-bold text-pink-900 tabular-nums">Rs. 890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
