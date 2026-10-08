import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/products';
import {
  X,
  ShoppingBag,
  Heart,
  Rotate3d,
  Compass,
  HelpCircle,
  Info,
  Sparkles,
  BookOpen,
  MessageCircle,
  Backpack,
  Truck
} from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const {
    setActivePage,
    setCategoryFilter,
    wishlist,
    cartTotalCount,
    setIsCartDrawerOpen
  } = useShop();

  if (!isOpen) return null;

  const navigateTo = (page: any, category: string | null = null) => {
    setCategoryFilter(category);
    setActivePage(page);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppSupport = () => {
    const url = getGeneralInquiryWhatsAppUrl('Mobile Menu Assistance');
    openWhatsApp(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="relative w-[85%] max-w-xs bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-250">
        {/* Header */}
        <div className="p-4 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black text-stone-900 tracking-tight">StudyPop</span>
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded ml-1">
              PK
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Direct Chat Banner in Drawer */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-stone-900">WhatsApp Helpdesk</p>
              <p className="text-[10px] text-emerald-800">Direct order support</p>
            </div>
          </div>
          <button
            onClick={handleWhatsAppSupport}
            className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-[10px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            Chat Now
          </button>
        </div>

        {/* Quick Links */}
        <div className="p-3 space-y-1 border-b border-stone-200/80">
          <button
            onClick={() => navigateTo('home')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-purple-50 transition-colors text-left"
          >
            <Compass className="w-4.5 h-4.5 text-purple-600" />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-purple-50 transition-colors text-left"
          >
            <BookOpen className="w-4.5 h-4.5 text-purple-600" />
            <span>Shop All Stationery</span>
          </button>
          <button
            onClick={() => navigateTo('shop', 'School Bags and Backpacks')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-purple-50 transition-colors text-left"
          >
            <Backpack className="w-4.5 h-4.5 text-purple-600" />
            <span>Bags, Bento & Bottles</span>
          </button>
          <button
            onClick={() => navigateTo('3d-studio')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-purple-900 bg-purple-50 hover:bg-purple-100 transition-colors text-left"
          >
            <Rotate3d className="w-4.5 h-4.5 text-purple-600" />
            <span>3D Stationery Studio</span>
          </button>
          <button
            onClick={() => navigateTo('wishlist')}
            className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-pink-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4.5 h-4.5 text-pink-500" />
              <span>Wishlist</span>
            </div>
            {wishlist.length > 0 && (
              <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              onClose();
              setIsCartDrawerOpen(true);
            }}
            className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-purple-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4.5 h-4.5 text-purple-600" />
              <span>Shopping Pouch</span>
            </div>
            <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-bold">
              {cartTotalCount}
            </span>
          </button>
          <button
            onClick={() => navigateTo('orders')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 active:bg-purple-50 transition-colors text-left"
          >
            <Truck className="w-4.5 h-4.5 text-stone-600" />
            <span>Track Order (TCS/Trax)</span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="p-3.5 flex-1">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Shop by Category
          </p>
          <div className="space-y-0.5">
            {CATEGORIES_LIST.slice(0, 10).map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateTo('shop', cat.id)}
                className="w-full min-h-[38px] flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-white text-left transition-colors cursor-pointer"
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-stone-400 tabular-nums ml-1 shrink-0">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <div className="p-4 border-t border-stone-200/80 bg-stone-50 space-y-2 text-xs">
          <button
            onClick={() => navigateTo('about')}
            className="w-full min-h-[36px] flex items-center gap-2 text-stone-600 hover:text-stone-900 py-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About StudyPop Pakistan</span>
          </button>
          <button
            onClick={() => navigateTo('faqs')}
            className="w-full min-h-[36px] flex items-center gap-2 text-stone-600 hover:text-stone-900 py-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Shipping & FAQs</span>
          </button>
          <p className="pt-2 text-[11px] text-stone-400 leading-relaxed">
            🚚 TCS Courier delivery all over Pakistan · Cash on Delivery & JazzCash
          </p>
        </div>
      </div>
    </div>
  );
};
