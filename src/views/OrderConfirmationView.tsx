import React, { useEffect } from 'react';
import { Order } from '../types';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  Printer,
  Sparkles,
  Phone,
  MessageCircle
} from 'lucide-react';
import { createWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

interface OrderConfirmationViewProps {
  order: Order | null;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({ order }) => {
  const { setActivePage, orders } = useShop();

  const currentOrder = order || (orders.length > 0 ? orders[0] : null);

  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  if (!currentOrder) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <p className="text-stone-600">No active order found.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const printReceipt = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const itemsSummary = currentOrder.items
      .map(
        (i) =>
          `• ${i.product.name}${i.selectedColor ? ` (${i.selectedColor})` : ''} × ${i.quantity} — Rs. ${(i.product.pricePKR * i.quantity).toLocaleString()}`
      )
      .join('\n');

    const msg = [
      `Assalam-o-Alaikum StudyPop Pakistan!`,
      `I have just confirmed my order on your website.`,
      ``,
      `• Order Number: #${currentOrder.orderNumber}`,
      `• TCS Tracking: ${currentOrder.trackingNumber}`,
      `• Student Name: ${currentOrder.customerInfo.fullName}`,
      `• Phone: ${currentOrder.customerInfo.phone}`,
      `• City: ${currentOrder.customerInfo.city} (${currentOrder.customerInfo.province})`,
      `• Delivery Address: ${currentOrder.customerInfo.address}`,
      `• Total Amount: Rs. ${currentOrder.total.toLocaleString()}`,
      `• Payment Mode: ${currentOrder.paymentMethod.toUpperCase()}`,
      ``,
      `Ordered Items:`,
      itemsSummary,
      ``,
      `Please confirm tracking and dispatch timeline. Thank you!`,
    ].join('\n');

    openWhatsApp(createWhatsAppUrl(msg));
  };

  return (
    <div className="py-10 sm:py-14 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order #{currentOrder.orderNumber} Confirmed</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Thank You, {currentOrder.customerInfo.fullName}!
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Your aesthetic stationery order is officially booked. Our packaging team at the Lahore warehouse is carefully bubble-wrapping your items!
          </p>

          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl max-w-md mx-auto text-xs text-purple-900 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] text-purple-600 font-medium block">TCS Tracking Code</span>
              <span className="font-mono font-bold text-sm">{currentOrder.trackingNumber}</span>
            </div>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-[11px] font-semibold text-purple-700">
              Dispatched in 24 Hrs
            </span>
          </div>
        </div>

        {/* Live Delivery Timeline Simulator */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs mb-8 space-y-5">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-purple-600" />
            <span>Delivery Tracking Progress</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            {/* Step 1 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div>
                <p className="font-bold text-stone-900">Order Confirmed</p>
                <p className="text-[11px] text-stone-500">System verified</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                2
              </div>
              <div>
                <p className="font-bold text-stone-900">Packing in Lahore</p>
                <p className="text-[11px] text-purple-700 font-medium">In Progress</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <p className="font-bold text-stone-900">Handed to TCS</p>
                <p className="text-[11px] text-stone-500">Expected Tomorrow</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs shrink-0">
                4
              </div>
              <div>
                <p className="font-bold text-stone-900">Out for Delivery</p>
                <p className="text-[11px] text-stone-500">{currentOrder.customerInfo.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-stone-900">Order Receipt Summary</h2>
              <p className="text-xs text-stone-500">Booked on {currentOrder.date}</p>
            </div>
            <button
              onClick={printReceipt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Delivery & Payment Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-2xl">
            <div>
              <span className="font-bold text-stone-700 block mb-1">Destination Address:</span>
              <p className="text-stone-600 leading-relaxed">
                {currentOrder.customerInfo.address}, {currentOrder.customerInfo.city},{' '}
                {currentOrder.customerInfo.province}
              </p>
              <p className="text-stone-600 mt-1">Phone: {currentOrder.customerInfo.phone}</p>
            </div>

            <div>
              <span className="font-bold text-stone-700 block mb-1">Payment Method:</span>
              <p className="text-purple-900 font-semibold uppercase">
                {currentOrder.paymentMethod === 'cod'
                  ? 'Cash on Delivery (Pay at Doorstep)'
                  : currentOrder.paymentMethod === 'jazzcash'
                  ? 'JazzCash Mobile Account'
                  : currentOrder.paymentMethod === 'easypaisa'
                  ? 'Easypaisa Mobile Wallet'
                  : 'SadaPay / Bank IBFT'}
              </p>
              <p className="text-stone-500 mt-1">
                Courier: TCS Courier Express (2–4 Business Days)
              </p>
            </div>
          </div>

          {/* Itemized Products */}
          <div className="space-y-3 divide-y divide-stone-100">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-stone-100 border border-stone-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900">{item.product.name}</h4>
                    <p className="text-stone-500">
                      Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-stone-900 tabular-nums">
                  Rs. {(item.product.pricePKR * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-stone-200 text-xs space-y-1.5 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900 tabular-nums">
                Rs. {currentOrder.subtotal.toLocaleString()}
              </span>
            </div>

            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="tabular-nums">- Rs. {currentOrder.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="tabular-nums">
                {currentOrder.shippingFee === 0 ? 'FREE' : `Rs. ${currentOrder.shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Total Amount Payable</span>
              <span className="text-purple-900 tabular-nums">
                Rs. {currentOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1db053] active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Send Order #{currentOrder.orderNumber} to WhatsApp</span>
          </button>

          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-purple-900 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Continue Shopping More Stationery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
