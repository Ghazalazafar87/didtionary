import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Copy, Check, Tag, ArrowRight } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  const { applyPromoCode, setActivePage, showToast } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyPromoCode(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied & applied to your cart! ✨`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#C026D3] text-white p-7 sm:p-10 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-pink-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-yellow-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Limited Midterm Promotion for Pakistani Students</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get 10% Off Your Entire Study Haul
            </h3>
            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
              Equip yourself for Board Exams, MDCAT, ECAT, or University Midterms. Fast courier delivery anywhere in Pakistan within 2 to 4 business days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Promo Code Box */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-yellow-300" />
                <span className="font-mono font-bold tracking-wider text-base text-yellow-200">
                  STUDENT10
                </span>
              </div>
              <button
                onClick={() => copyCode('STUDENT10')}
                className="ml-2 p-1.5 min-h-[36px] min-w-[36px] flex items-center justify-center text-white hover:text-yellow-200 active:scale-95 transition-all cursor-pointer"
                title="Copy and apply voucher"
              >
                {copiedCode === 'STUDENT10' ? (
                  <Check className="w-4.5 h-4.5 text-emerald-300" />
                ) : (
                  <Copy className="w-4.5 h-4.5" />
                )}
              </button>
            </div>

            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-purple-900 hover:bg-yellow-100 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Redeem in Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
