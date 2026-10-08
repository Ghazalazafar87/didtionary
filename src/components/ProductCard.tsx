import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Plus, Rotate3d, MessageCircle } from 'lucide-react';
import { getProductOrderWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPricePKR
    ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100)
    : 0;

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getProductOrderWhatsAppUrl(product, 1);
    openWhatsApp(url);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation">
      {/* Image Container with solid neutral backdrop */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F4EF] cursor-pointer"
        onClick={() => openProductDetail(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Top Metadata (Zero-pill discipline: single quiet text indicator) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 pointer-events-none">
          {product.isBestSeller ? (
            <span className="text-[10px] sm:text-[11px] font-semibold text-purple-950 bg-purple-100/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs">
              Best Seller
            </span>
          ) : product.isNew ? (
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-950 bg-emerald-100/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs">
              New Drop
            </span>
          ) : product.has3DModel ? (
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-stone-900 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md shadow-2xs">
              <Rotate3d className="w-3 h-3 text-purple-600" />
              3D
            </span>
          ) : null}
        </div>

        {/* Wishlist Button (Enlarged tap target for mobile touch) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs text-stone-600 hover:text-pink-600 transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-90"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-pink-500 text-pink-500' : ''
            }`}
          />
        </button>

        {/* Quick Add overlay button on desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="flex-1 py-2.5 bg-stone-900 hover:bg-purple-900 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Quick Add
            </button>
            <button
              onClick={handleWhatsAppQuickOrder}
              title="Order on WhatsApp"
              className="p-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div
        className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => openProductDetail(product.id)}
      >
        <div>
          {/* Category & student tag (clean unboxed metadata with separators) */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-stone-500 mb-1 flex-wrap">
            <span className="text-purple-700 font-medium truncate">{product.category.split(' ')[0]}</span>
            {product.studentTag && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500 truncate max-w-[110px] sm:max-w-[150px]">{product.studentTag}</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-stone-900 group-hover:text-purple-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-bold text-stone-900 tabular-nums">
              Rs. {product.pricePKR.toLocaleString()}
            </span>
            {product.originalPricePKR && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through tabular-nums">
                Rs. {product.originalPricePKR.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs text-stone-600 shrink-0">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold tabular-nums">{product.rating}</span>
            <span className="text-stone-400 tabular-nums hidden xs:inline">({product.reviewCount})</span>
          </div>
        </div>

        {/* Mobile Touch-Friendly Action Buttons */}
        <div className="mt-2.5 pt-1 md:hidden flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 min-h-[40px] py-2 px-2.5 bg-stone-900 active:bg-purple-900 text-white text-[11px] sm:text-xs font-semibold rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleWhatsAppQuickOrder}
            title="Order via WhatsApp"
            className="min-h-[40px] min-w-[40px] p-2 bg-emerald-50 active:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

