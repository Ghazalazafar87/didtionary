import React from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Heart, Shield, RotateCcw, Truck, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setCategoryFilter } = useShop();

  const handleNav = (page: any, cat: string | null = null) => {
    setCategoryFilter(cat);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-white tracking-tight">StudyPop</span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Pakistan's favorite aesthetic student stationery boutique. Designing bleed-proof journals, fine quick-dry pens, and desk organization accessories to make study marathons delightful.
            </p>

            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Gulberg III, Lahore, Pakistan · Fast Nationwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Student Support: +92 321 8492019</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>help@studypop.pk (Mon–Sat: 10 AM – 8 PM PKT)</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stationery Shop</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('shop', 'Aesthetic Notebooks and Journals')}
                  className="hover:text-purple-300 transition-colors"
                >
                  160 GSM Journals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Cute Pens and Gel Pens')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Quick-Dry Gel Pens
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Highlighters and Colorful Markers')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Pastel Highlighters
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Premium Pencil Cases')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Expandable Pencil Pouches
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Exam Preparation Essentials')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Exam & MDCAT Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'School Bags and Backpacks')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Student Backpacks & Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Water Bottles and Tumblers')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Insulated Bottles & Bento Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('3d-studio')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  3D Interactive Studio ⚡
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Student Support</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-purple-300 transition-colors font-semibold text-emerald-400">
                  Contact Support & WhatsApp
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faqs')} className="hover:text-purple-300 transition-colors">
                  Delivery Times & Courier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policies')} className="hover:text-purple-300 transition-colors">
                  7-Day Replacement Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-purple-300 transition-colors">
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('policies')} className="hover:text-purple-300 transition-colors">
                  Cash on Delivery Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('orders')} className="hover:text-purple-300 transition-colors">
                  Track Demo Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Pakistan Payment Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Student Payments</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>Supported nationwide:</p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded border border-stone-700">Cash on Delivery</span>
                <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded border border-stone-700">JazzCash</span>
                <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded border border-stone-700">Easypaisa</span>
                <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded border border-stone-700">SadaPay / NayaPay</span>
                <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded border border-stone-700">Bank Transfer</span>
              </div>
              <p className="pt-2 text-[11px] text-stone-500">
                Couriers: TCS, Trax, CallCourier, Leopard across all 150+ districts of Pakistan.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} StudyPop Pakistan. Crafted with 💜 for Pakistani students.</p>
          <div className="flex items-center gap-5">
            <button onClick={() => handleNav('policies')} className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('policies')} className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleNav('policies')} className="hover:text-stone-300 transition-colors">
              Shipping Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
