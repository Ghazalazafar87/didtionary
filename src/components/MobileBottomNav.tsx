import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Compass, Rotate3d, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const MobileBottomNav: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setCategoryFilter,
    wishlist,
    cartTotalCount,
    setIsCartDrawerOpen,
  } = useShop();

  const handleNav = (page: any, cat: string | null = null) => {
    setCategoryFilter(cat);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = getGeneralInquiryWhatsAppUrl('Support & Student Orders');
    openWhatsApp(url);
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 ${
            activePage === 'home'
              ? 'text-purple-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activePage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-700" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => handleNav('shop')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 ${
            activePage === 'shop'
              ? 'text-purple-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Compass className="w-5 h-5" />
            {activePage === 'shop' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-700" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Shop</span>
        </button>

        {/* 3D Studio */}
        <button
          onClick={() => handleNav('3d-studio')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 ${
            activePage === '3d-studio'
              ? 'text-purple-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Rotate3d className="w-5 h-5" />
            {activePage === '3d-studio' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-700" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">3D Lab</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNav('wishlist')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer touch-manipulation active:scale-95 relative ${
            activePage === 'wishlist'
              ? 'text-pink-600 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Heart
              className={`w-5 h-5 ${
                wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''
              }`}
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {wishlist.length}
              </span>
            )}
            {activePage === 'wishlist' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-600" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Saved</span>
        </button>

        {/* Shopping Pouch Cart Drawer */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl text-stone-700 hover:text-purple-900 transition-all cursor-pointer touch-manipulation active:scale-95 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-purple-600 text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Pouch</span>
        </button>
      </div>
    </nav>
  );
};
