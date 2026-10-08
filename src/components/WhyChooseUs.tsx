import React from 'react';
import { Truck, ShieldCheck, Banknote, Sparkles, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Banknote className="w-6 h-6 text-emerald-600" />,
      title: 'Affordable Student Pricing',
      description: 'Transparent prices in Pakistani Rupees (PKR) without ridiculous import markups or foreign shipping fees.',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      title: 'Bleed-Proof 160 GSM Paper',
      description: 'Tested with fountain pens, heavy highlighters, and brush markers. Zero ghosting or paper tearing guaranteed.',
      bg: 'bg-purple-50 border-purple-100',
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-600" />,
      title: 'Nationwide Courier Delivery',
      description: '2 to 4 business days directly to your university hostel or home in Lahore, Karachi, Islamabad, and all cities via TCS & Trax.',
      bg: 'bg-sky-50 border-sky-100',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-pink-600" />,
      title: 'Cash on Delivery & Wallets',
      description: 'Pay comfortably when your parcel arrives, or pay in advance via JazzCash, Easypaisa, or SadaPay/NayaPay.',
      bg: 'bg-pink-50 border-pink-100',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1.5">
            Why Pakistani Students Love Us
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Designed for Real Student Life
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            No cheap flimsy paper, no dried-out pens. Crafted to withstand rigorous Pakistani academic schedules and exam marathons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${p.bg} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-2">{p.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
