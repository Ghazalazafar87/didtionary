import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Rotate3d,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  onOpenSearchModal,
}) => {
  const {
    activePage,
    setActivePage,
    cartTotalCount,
    wishlist,
    setIsCartDrawerOpen,
    setCategoryFilter,
  } = useShop();

  const handleNavClick = (page: any, category: string | null = null) => {
    setCategoryFilter(category);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = getGeneralInquiryWhatsAppUrl('Support');
    openWhatsApp(url);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 group text-left cursor-pointer min-h-[44px]"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-purple-700 transition-colors">
              StudyPop
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-600 group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Zone 2: Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('shop')}
            className={`cursor-pointer transition-colors hover:text-purple-700 ${
              activePage === 'shop' ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => handleNavClick('shop', 'Aesthetic Notebooks and Journals')}
            className="cursor-pointer transition-colors hover:text-purple-700"
          >
            Notebooks
          </button>
          <button
            onClick={() => handleNavClick('shop', 'School Bags and Backpacks')}
            className="cursor-pointer transition-colors hover:text-purple-700"
          >
            Bags & Bottles
          </button>
          <button
            onClick={() => handleNavClick('3d-studio')}
            className={`cursor-pointer flex items-center gap-1.5 transition-colors hover:text-purple-700 ${
              activePage === '3d-studio' ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5 text-purple-600" />
            3D Studio
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`cursor-pointer transition-colors hover:text-purple-700 ${
              activePage === 'about' ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('faqs')}
            className={`cursor-pointer transition-colors hover:text-purple-700 ${
              activePage === 'faqs' ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            FAQs
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearchModal}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-stone-600 hover:text-purple-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Search stationery products"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WhatsApp Support Link (Desktop & Tablet) */}
          <button
            onClick={handleWhatsApp}
            className="hidden md:flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            title="Chat on WhatsApp (+92 321 8492019)"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
            <span className="hidden xl:inline">WhatsApp Help</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-stone-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors relative cursor-pointer"
            aria-label="View wishlist"
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Bag Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 bg-stone-900 text-white hover:bg-purple-900 min-h-[40px] px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-purple-300" />
            <span className="hidden sm:inline">Pouch</span>
            <span className="bg-purple-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums min-w-[18px] text-center">
              {cartTotalCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
