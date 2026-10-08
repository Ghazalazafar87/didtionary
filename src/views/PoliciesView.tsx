import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export const PoliciesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy'>('shipping');

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Store Policies & Terms
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Transparent terms for safe, joyful stationery shopping across Pakistan
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 p-1 bg-stone-100 rounded-2xl max-w-md mx-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'shipping' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'returns' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            7-Day Returns
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'privacy' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs text-xs sm:text-sm text-stone-700 leading-relaxed space-y-5">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-stone-900">
                <Truck className="w-5 h-5 text-purple-600" />
                <h2>Shipping & Courier Delivery across Pakistan</h2>
              </div>
              <p>
                All orders are dispatched from our central distribution hub in Gulberg III, Lahore, within 24 business hours of order confirmation.
              </p>
              <h3 className="font-bold text-stone-900">Delivery Timelines:</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Lahore & Environs:</strong> 1 to 2 business days via TCS Courier.</li>
                <li><strong>Karachi, Islamabad, Rawalpindi, Faisalabad:</strong> 2 to 3 business days via TCS / Trax.</li>
                <li><strong>Peshawar, Quetta, Multan, Sialkot, Hyderabad:</strong> 3 to 4 business days.</li>
                <li><strong>Remote or Rural Areas:</strong> 4 to 5 business days via Pakistan Post Express / Leopard.</li>
              </ul>
              <h3 className="font-bold text-stone-900">Shipping Rates:</h3>
              <p>
                Flat standard shipping is <strong>Rs. 220</strong> anywhere in Pakistan. Orders totaling <strong>Rs. 2,500 or more qualify for FREE Nationwide Delivery</strong>.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-stone-900">
                <RotateCcw className="w-5 h-5 text-emerald-600" />
                <h2>7-Day Hassle-Free Replacement Policy</h2>
              </div>
              <p>
                We inspect every pen, notebook, and desk accessory before it leaves our Lahore facility. However, if your order arrives damaged or defective, we will make it right immediately.
              </p>
              <h3 className="font-bold text-stone-900">How to request a replacement:</h3>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Take a quick photograph or short video of the damaged item.</li>
                <li>WhatsApp our student support team at <strong>+92 321 8492019</strong> or email <strong>help@studypop.pk</strong> within 7 days of receiving the parcel.</li>
                <li>We will dispatch a brand new replacement free of charge. No return shipping hassle required for defective pens.</li>
              </ol>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-stone-900">
                <Lock className="w-5 h-5 text-purple-600" />
                <h2>Student Privacy & Data Protection</h2>
              </div>
              <p>
                StudyPop values student privacy. We only collect the information necessary to fulfill your delivery (Full Name, Phone Number, Campus/Hostel Address, and Email).
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We never sell or disclose customer details to third-party advertising brokers.</li>
                <li>Your phone number is strictly used for delivery coordination with the courier rider.</li>
                <li>Cart items and wishlist preferences are stored locally in your browser's Local Storage for your convenience.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
