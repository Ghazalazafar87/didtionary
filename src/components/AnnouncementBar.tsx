import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, X, Truck, Tag } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { amountNeededForFreeDelivery, cartSubtotal, freeDeliveryThreshold } = useShop();

  if (!isVisible) return null;

  return (
    <div className="bg-[#5B21B6] text-white text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 transition-all relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-center flex-wrap leading-tight">
          <span className="inline-flex items-center gap-1 font-medium bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px]">
            <Truck className="w-3 h-3 text-purple-300" />
            Nationwide Delivery
          </span>

          {cartSubtotal > 0 && amountNeededForFreeDelivery > 0 ? (
            <span className="font-medium text-purple-100">
              Add <strong className="text-yellow-300 font-bold tabular-nums">Rs. {amountNeededForFreeDelivery.toLocaleString()}</strong> more for <span className="underline decoration-yellow-300 font-semibold">FREE Delivery</span>!
            </span>
          ) : cartSubtotal >= freeDeliveryThreshold ? (
            <span className="font-semibold text-emerald-200">
              🎉 Unlocked FREE Delivery across Pakistan!
            </span>
          ) : (
            <span className="text-purple-100">
              ✨ Free delivery over <strong className="text-white">Rs. 2,500</strong> · Code <span className="bg-white/20 text-yellow-200 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">STUDENT10</span> for 10% off
            </span>
          )}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-purple-200 hover:text-white p-1 rounded transition-colors shrink-0"
          aria-label="Dismiss announcement banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
