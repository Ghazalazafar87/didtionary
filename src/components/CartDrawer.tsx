import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  Check,
  MessageCircle
} from 'lucide-react';
import { getCartOrderWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    shippingFee,
    cartFinalTotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    setActivePage,
    savedCustomerInfo,
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppCheckout = () => {
    const url = getCartOrderWhatsAppUrl(
      cart,
      {
        subtotal: cartSubtotal,
        discount: promoDiscount,
        shippingFee,
        total: cartFinalTotal,
      },
      savedCustomerInfo
    );
    openWhatsApp(url);
  };

  const handleShopMore = () => {
    setIsCartDrawerOpen(false);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const percentToFreeDelivery = Math.min(
    100,
    Math.round((cartSubtotal / freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Your Study Pouch</h3>
              <p className="text-xs text-stone-500">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-3 bg-purple-50/70 border-b border-purple-100/80">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-purple-900">
              <Truck className="w-3.5 h-3.5 text-purple-600" />
              {amountNeededForFreeDelivery > 0 ? (
                <>Add <strong className="text-purple-700 font-bold tabular-nums">Rs. {amountNeededForFreeDelivery.toLocaleString()}</strong> for Free Delivery</>
              ) : (
                <span className="text-emerald-700 font-bold">✨ Free Delivery Unlocked across Pakistan!</span>
              )}
            </span>
            <span className="text-purple-700 tabular-nums font-semibold">{percentToFreeDelivery}%</span>
          </div>
          <div className="w-full bg-purple-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${percentToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">Your pouch is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Discover aesthetic journals, pastel gel pens, and highlighters designed for Pakistani students.
              </p>
              <button
                onClick={handleShopMore}
                className="px-5 py-2.5 bg-stone-900 hover:bg-purple-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor || 'def'}-${idx}`}
                className="bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-xs flex gap-3.5"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-100"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Color: <span className="font-medium text-stone-700">{item.selectedColor}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-stone-400 hover:text-rose-500 p-1 -mr-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      Rs. {(item.product.pricePKR * item.quantity).toLocaleString()}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 border border-stone-200 rounded-lg bg-stone-50 px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                        className="p-1 text-stone-500 hover:text-stone-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold tabular-nums px-1 text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                        className="p-1 text-stone-500 hover:text-stone-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Totals Checkout Module */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200/80 shadow-lg space-y-3.5">
            {/* Promo Code Input */}
            <div className="space-y-1.5">
              {promoCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold">{promoCode} applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-emerald-900 text-xs font-medium underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. STUDENT10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-stone-200 focus:border-purple-500 outline-none uppercase font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (inputCode.trim()) {
                        applyPromoCode(inputCode);
                        setInputCode('');
                      }
                    }}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Quick voucher chips */}
              {!promoCode && (
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span>Student codes:</span>
                  <button
                    onClick={() => applyPromoCode('STUDENT10')}
                    className="font-mono text-purple-700 underline hover:text-purple-900"
                  >
                    STUDENT10 (-10%)
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => applyPromoCode('EXAMREADY')}
                    className="font-mono text-purple-700 underline hover:text-purple-900"
                  >
                    EXAMREADY (-Rs.300)
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Student Discount</span>
                  <span className="font-semibold tabular-nums">
                    - Rs. {promoDiscount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Delivery Fee (TCS/Trax)
                  {shippingFee === 0 && (
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  )}
                </span>
                <span className="font-medium tabular-nums">
                  {shippingFee === 0 ? 'Rs. 0' : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-stone-200/70">
                <span>Total (PKR)</span>
                <span className="text-purple-900 tabular-nums">
                  Rs. {cartFinalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 bg-stone-900 hover:bg-purple-900 active:scale-98 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp Full Cart Order */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1db053] active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Order Entire Pouch via WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Pay via Cash on Delivery, JazzCash, Easypaisa, or SadaPay
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
