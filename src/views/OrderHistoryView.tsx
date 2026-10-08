import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Clock, Truck, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const OrderHistoryView: React.FC = () => {
  const { orders, setActivePage } = useShop();

  const handleInquireOrder = (orderNumber: string, trackingNumber: string) => {
    const msg = `Assalam-o-Alaikum StudyPop! I would like to inquire about the delivery status of my Order #${orderNumber} (TCS Tracking: ${trackingNumber}).`;
    openWhatsApp(createWhatsAppUrl(msg));
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Your Order History
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track past and current stationery orders stored in your local session
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4 max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-stone-900">No past orders yet</h2>
            <p className="text-xs sm:text-sm text-stone-500">
              When you place an order, your tracking details and receipt will appear here.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-purple-900 transition-colors cursor-pointer"
            >
              Start Stationery Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div>
                    <span className="text-xs font-bold text-purple-700 block">
                      Order #{ord.orderNumber}
                    </span>
                    <span className="text-xs text-stone-400">Placed on {ord.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      Confirmed & Packing
                    </span>
                    <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {ord.trackingNumber}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg bg-stone-100 border border-stone-100"
                        />
                        <div>
                          <p className="font-bold text-stone-900">{item.product.name}</p>
                          <p className="text-stone-500">
                            Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold tabular-nums">
                        Rs. {(item.product.pricePKR * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-stone-600 font-medium">
                    Paid via {ord.paymentMethod.toUpperCase()} · Destination: {ord.customerInfo.city}
                  </span>
                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <button
                      onClick={() => handleInquireOrder(ord.orderNumber, ord.trackingNumber)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                      <span>WhatsApp Update</span>
                    </button>
                    <span className="text-base font-extrabold text-purple-900 tabular-nums">
                      Rs. {ord.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
