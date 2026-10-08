import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      showToast('🎉 Welcome to the StudyPop Student Club! Check your inbox for your 15% off voucher.', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-[#F3E8FF]/60 border-t border-purple-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Study Club Newsletter</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
          Get 15% Off Your Next Exam Haul
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-6">
          Subscribe for secret student flash drops, printable GPA trackers, syllabus roadmaps, and free delivery voucher codes.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-100 text-emerald-900 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>You're in! Check your email for voucher code <strong>STUDYCLUB15</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your student email..."
                required
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-300 focus:border-purple-600 outline-none text-stone-800 placeholder:text-stone-400 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              Get My 15% Off
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-3">
          Zero spam. Only sweet stationery announcements and exam study tips. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
