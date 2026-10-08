import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PAKISTANI_CITIES } from '../data/products';
import { CustomerInfo, PaymentMethod } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Info,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { getCartOrderWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

interface CheckoutViewProps {
  onOrderComplete: (order: any) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderComplete }) => {
  const {
    cart,
    cartSubtotal,
    promoDiscount,
    shippingFee,
    cartFinalTotal,
    savedCustomerInfo,
    placeOrder,
    setActivePage,
    showToast,
  } = useShop();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: savedCustomerInfo?.fullName || '',
    phone: savedCustomerInfo?.phone || '',
    email: savedCustomerInfo?.email || '',
    address: savedCustomerInfo?.address || '',
    city: savedCustomerInfo?.city || 'Lahore',
    province: savedCustomerInfo?.province || 'Punjab',
    postalCode: savedCustomerInfo?.postalCode || '',
    notes: savedCustomerInfo?.notes || '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Your study pouch is empty</h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('Please fill in your Full Name, Phone, and Delivery Address', 'error');
      return;
    }

    if (!formData.phone.startsWith('03') && !formData.phone.startsWith('+92')) {
      showToast('Please enter a valid Pakistani phone number (e.g. 0321-1234567)', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
      onOrderComplete(order);
    }, 800);
  };

  const handleWhatsAppCheckoutOrder = () => {
    const url = getCartOrderWhatsAppUrl(
      cart,
      {
        subtotal: cartSubtotal,
        discount: promoDiscount,
        shippingFee,
        total: cartFinalTotal,
      },
      formData,
      paymentMethod
    );
    openWhatsApp(url);
  };

  return (
    <div className="py-10 sm:py-14 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Stationery Shop</span>
          </button>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Checkout & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Fast courier delivery across Pakistan via TCS & Trax Logistics
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Customer Details & Payment Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact & Shipping Information */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <span>1. Shipping Details (Pakistan)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ayesha Tariq"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Phone Number (For Courier SMS) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0321-1234567"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-stone-700">Student Email (For Tracking Confirmation)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ayesha.student@gmail.com"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-stone-700">Complete Address (Hostel or Home) *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House / Hostel Room #, Street, Sector / Area"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">City *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 bg-white"
                  >
                    {PAKISTANI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-stone-700">Province / Region</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 bg-white"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital Territory">Islamabad (ICT)</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-stone-700">Delivery Instructions / University Hostel Gate</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Please deliver to Girls Hostel Gate 2 or call before arrival"
                    rows={2}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>2. Payment Method in Pakistan</span>
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Pay with cash when the TCS/Trax courier rider arrives at your doorstep or campus.
                    </p>
                  </div>
                </label>

                {/* JazzCash */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="jazzcash"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 accent-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">
                        JazzCash Mobile Account
                      </span>
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Direct payment from your JazzCash wallet with zero transaction fee.
                    </p>
                  </div>
                </label>

                {/* Easypaisa */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'easypaisa'
                      ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="easypaisa"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    className="mt-1 accent-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">
                        Easypaisa Wallet
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Send to official StudyPop business wallet with automated verification.
                    </p>
                  </div>
                </label>

                {/* Bank / SadaPay / NayaPay */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 accent-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-stone-900">
                        SadaPay / NayaPay / Bank IBFT
                      </span>
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        Fast IBFT
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Direct Raast / IBFT transfer to our Meezan Bank or SadaPay business account.
                    </p>
                  </div>
                </label>
              </div>

              {/* Demo Sandbox notice */}
              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Simulation:</strong> Clicking "Place Order" will generate your simulated tracking code and dispatch verification without real credit card charges.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-sm space-y-5 lg:sticky lg:top-24">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-stone-500 tabular-nums">
                ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </h2>

            {/* Itemized Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-stone-100 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-stone-100 border border-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900 tabular-nums">
                    Rs. {(item.product.pricePKR * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Student Coupon Discount</span>
                  <span className="tabular-nums">- Rs. {promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>TCS Courier Delivery</span>
                <span className="font-medium tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      FREE (Over Rs. 2,500)
                    </span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base sm:text-lg font-black text-stone-900 pt-3 border-t border-stone-200">
                <span>Final Total (PKR)</span>
                <span className="text-purple-900 tabular-nums">
                  Rs. {cartFinalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-stone-900 hover:bg-purple-900 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isSubmitting ? (
                 <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (Rs. {cartFinalTotal.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Complete via WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppCheckoutOrder}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1db053] active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Checkout via WhatsApp</span>
            </button>

            <div className="text-[11px] text-stone-400 text-center space-y-1">
              <p>🔒 100% Secure Checkout with 7-day student return policy</p>
              <p>Delivery time: 2–4 business days via TCS / Trax</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
