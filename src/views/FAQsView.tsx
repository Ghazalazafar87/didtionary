import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Truck, CreditCard, RotateCcw, Package } from 'lucide-react';

export const FAQsView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does delivery take to my city in Pakistan?',
      a: 'We ship orders via TCS Courier and Trax Logistics within 24 hours from our central warehouse in Lahore. Delivery to Lahore takes 1–2 business days. Delivery to Karachi, Islamabad, Rawalpindi, Faisalabad, and Multan takes 2–3 business days. Delivery to Peshawar, Quetta, Abbottabad, and other regional cities takes 3–4 business days.',
    },
    {
      q: 'What is the Cash on Delivery (COD) verification process?',
      a: 'When you place a Cash on Delivery order, you will receive an instant confirmation SMS or WhatsApp message with your tracking code. You pay the exact amount in cash directly to the courier rider upon delivery. No advance deposit needed!',
    },
    {
      q: 'Do your 160 GSM journals really prevent marker bleed-through?',
      a: 'Yes, 100%! We specifically engineered our 160 GSM bamboo paper for heavy ink users. You can use Tombow dual brush pens, Sakura Micron fineliners, Zebra Sarasa gel pens, and light watercolor washes without any bleeding or ghosting on the back side of the sheet.',
    },
    {
      q: 'How do I pay with JazzCash, Easypaisa, or SadaPay?',
      a: 'At checkout, select JazzCash or Easypaisa or Bank Transfer. You will receive our verified merchant account details on the confirmation screen. Once transferred, your order is automatically verified and dispatched priority-lane.',
    },
    {
      q: 'Can you deliver to university hostels?',
      a: 'Yes! We deliver to student hostels across NUST, LUMS, IBA, GIKI, FAST, KEMU, Dow, and others daily. Simply mention your hostel name and room/gate number in the delivery instructions at checkout, and the courier rider will call you upon arrival.',
    },
    {
      q: 'What is your return and replacement policy?',
      a: 'We offer a 7-day hassle-free replacement guarantee. If any item arrives damaged in transit, or if a pen is dry, simply message our WhatsApp support (+92 321 8492019) with a quick photo, and we will dispatch a brand new replacement free of charge.',
    },
    {
      q: 'Do you offer bulk discounts for student societies and study batches?',
      a: 'Yes! We provide 15% to 25% custom discounts for university study groups, student societies, and school graduation gift sets. WhatsApp our team for personalized gift packaging and quotes.',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Everything you need to know about courier shipping, COD, and our stationery specs
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs divide-y divide-stone-100 overflow-hidden">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 sm:p-6">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-stone-900 hover:text-purple-700 transition-colors cursor-pointer gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${
                    openIdx === idx ? 'rotate-180 text-purple-600' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed pr-6">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-base text-emerald-900">Need Immediate Help with Your Order?</h4>
            <p className="text-emerald-700 mt-0.5">
              Our student support team is active on WhatsApp from 10 AM to 8 PM PKT.
            </p>
          </div>
          <a
            href="https://wa.me/923218492019"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold whitespace-nowrap transition-colors shadow-xs"
          >
            Chat on WhatsApp (+92 321 8492019)
          </a>
        </div>
      </div>
    </div>
  );
};
