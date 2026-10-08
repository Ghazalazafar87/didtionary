import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ThreeDStationeryViewer } from '../components/ThreeDStationeryViewer';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Share2,
  Rotate3d,
  Sparkles,
  ArrowLeft,
  Eye,
  Info,
  MessageCircle
} from 'lucide-react';
import { getProductOrderWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage,
    setIsCartDrawerOpen,
    showToast,
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'photos' | '3d'>('photos');
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPricePKR
    ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100)
    : 0;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || undefined);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const url = getProductOrderWhatsAppUrl(product, quantity, selectedColor || undefined);
    openWhatsApp(url);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! 📋', 'success');
    }
  };

  const matchingColorHex = product.colors?.find((c) => c.name === selectedColor)?.hex || '#D8B4E2';

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1.5 font-semibold text-stone-700 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stationery Shop</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Main Product Layout (Sticky Left Gallery, Contiguous Right Purchase Module) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Media Gallery / 3D Viewer */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            {/* View Mode Toggle if 3D is available */}
            {product.has3DModel && (
              <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Product Photos
                </button>
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === '3d'
                      ? 'bg-white text-purple-900 shadow-2xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5 text-purple-600" />
                  Interactive 3D Preview
                </button>
              </div>
            )}

            {activeTab === 'photos' ? (
              <div className="space-y-3">
                {/* Main Large Image */}
                <div
                  className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-xs cursor-zoom-in group"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className={`w-full aspect-[4/3] object-cover object-center transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-600 border border-stone-200/60 pointer-events-none">
                    {isZoomed ? 'Click to zoom out' : 'Click to zoom'}
                  </div>
                </div>

                {/* Thumbnail selector */}
                {product.gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {product.gallery.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImage === imgUrl
                            ? 'border-purple-600 scale-105 shadow-xs'
                            : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${product.name} angle ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <ThreeDStationeryViewer
                  modelType={product.modelType || 'notebook'}
                  initialColor={matchingColorHex}
                  allowColorSwitch={true}
                />
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="text-purple-700 font-semibold">{product.category}</span>
                {product.studentTag && (
                  <>
                    <span>·</span>
                    <span className="text-stone-600 font-medium">{product.studentTag}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {product.tagline}
              </p>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-900 tabular-nums">{product.rating}</span>
                </div>
                <span className="text-stone-400">·</span>
                <span className="text-stone-600 tabular-nums font-medium">
                  {product.reviewCount} Student Reviews
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stockCount} left)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-stone-900 tabular-nums">
                    Rs. {product.pricePKR.toLocaleString()}
                  </span>
                  {product.originalPricePKR && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      Rs. {product.originalPricePKR.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Tax included · Free delivery on orders over Rs. 2,500
                </p>
              </div>

              {discountPercent > 0 && (
                <span className="bg-purple-100 text-purple-900 font-bold text-xs px-2.5 py-1 rounded-lg">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Color / Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-stone-800">
                    Select Color Finish: <span className="font-normal text-purple-700">{selectedColor}</span>
                  </label>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-purple-600 bg-purple-50 text-purple-900 ring-1 ring-purple-600'
                          : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-800">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-stone-600 hover:text-stone-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs sm:text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="p-1.5 text-stone-600 hover:text-stone-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-stone-900 hover:bg-purple-950 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-purple-300" />
                  <span>Add to Pouch</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Instant WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1bb053] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Order via WhatsApp (Instant Booking)</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-pink-300 bg-pink-50 text-pink-700'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
                <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Delivery & Trust Markers */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Courier Delivery: </span>
                  <span>2–4 business days via TCS / Trax across Pakistan. Free on orders above Rs. 2,500.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Student Guarantee: </span>
                  <span>100% replacement within 7 days if defective or damaged in transit.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Specifications */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Detailed Features */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 space-y-6">
            <h2 className="text-xl font-bold text-stone-900">Product Overview</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-stone-900">Key Features:</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 space-y-4">
            <h2 className="text-xl font-bold text-stone-900">Technical Specifications</h2>
            <div className="divide-y divide-stone-100 text-xs sm:text-sm">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex justify-between gap-4">
                  <span className="text-stone-500 font-medium">{spec.label}</span>
                  <span className="text-stone-900 font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Product Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Pairs Well with Your Study Setup
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Commonly bought together by university and board exam students
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="fixed bottom-14 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/90 p-2.5 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 block">Total Price:</span>
          <span className="text-sm font-extrabold text-stone-900 tabular-nums">
            Rs. {(product.pricePKR * quantity).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-[140px] py-2 px-3 bg-stone-900 active:bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-purple-300" />
            <span>Add to Pouch</span>
          </button>

          <button
            onClick={handleWhatsAppOrder}
            title="Order on WhatsApp"
            className="py-2 px-3 bg-[#25D366] active:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span className="hidden xs:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
