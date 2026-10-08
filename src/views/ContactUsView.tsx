import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Clock, Send, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { getWhatsAppNumber, getGeneralInquiryWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';
import { useShop } from '../context/ShopContext';

export const ContactUsView: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    subject: 'Order Tracking',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneDisplay = getWhatsAppNumber();

  const handleWhatsAppClick = () => {
    const url = getGeneralInquiryWhatsAppUrl();
    openWhatsApp(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      showToast('Please fill in your name and message', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Message sent! Our student support team will reply shortly.', 'success');
  };

  return (
    <div className="py-8 sm:py-14 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>We're Here For You</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Contact Student Support
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Have a question about your order, delivery to your campus, or looking for bulk student society orders? We respond quickly!
          </p>
        </div>

        {/* WhatsApp Fast Channel Card (Highlighted for Pakistani Students) */}
        <div className="bg-gradient-to-r from-emerald-600 to-[#128C7E] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-emerald-100">
              ⚡ Fastest Response (5–10 mins)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Chat Directly on WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
              Order assistance, tracking updates, and custom product advice directly from our Lahore team.
            </p>
            <p className="text-xs font-mono font-semibold text-emerald-200">
              +{phoneDisplay.slice(0, 2)} {phoneDisplay.slice(2, 5)} {phoneDisplay.slice(5)}
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>Open WhatsApp Chat</span>
          </button>
        </div>

        {/* 2-Column: Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Contact Form */}
          <div className="md:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Send Us a Message
            </h3>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-sm">Thank You, {formData.name}!</h4>
                <p className="text-xs text-emerald-800">
                  Your message has been received. We will get back to you within 2 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Fatima Zahra"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Phone or Email *</label>
                  <input
                    type="text"
                    required
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    placeholder="0321-xxxxxxx or email@domain.com"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 bg-white text-sm"
                  >
                    <option value="Order Tracking">Order Tracking & Delivery Status</option>
                    <option value="Product Details">Stationery Product Specifications</option>
                    <option value="Bulk Order">Student Society / Batch Discount</option>
                    <option value="Replacement">Replacement or Damaged Parcel</option>
                    <option value="Other">General Feedback</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you with your study supplies?"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:border-purple-600 outline-none text-stone-800 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Operating Hours */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-900">Direct Contact Information</h3>

              <div className="space-y-3 text-stone-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">WhatsApp Helpline</span>
                    <button
                      onClick={handleWhatsAppClick}
                      className="text-emerald-700 hover:underline font-mono text-xs font-semibold cursor-pointer"
                    >
                      +{phoneDisplay.slice(0, 2)} {phoneDisplay.slice(2, 5)} {phoneDisplay.slice(5)}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">Email Support</span>
                    <a href="mailto:help@studypop.pk" className="text-purple-700 hover:underline">
                      help@studypop.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">Lahore Distribution Center</span>
                    <span>Block B, Gulberg III, Lahore, Punjab, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">Operating Hours (PKT)</span>
                    <span>Monday – Saturday: 10:00 AM – 8:00 PM</span>
                    <p className="text-[11px] text-stone-400 mt-0.5">Sunday: WhatsApp emergency inquiries only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50/70 border border-purple-100 p-4 rounded-2xl text-xs text-purple-900 space-y-1">
              <span className="font-bold block">Campus Representative Program</span>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Are you an active student at NUST, LUMS, FAST, IBA, or medical universities? Message us on WhatsApp to become a campus ambassador for special study hampers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
