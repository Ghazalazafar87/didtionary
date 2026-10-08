import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, openWhatsApp } from '../utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDirectChat = () => {
    const url = getGeneralInquiryWhatsAppUrl();
    openWhatsApp(url);
    setIsOpen(false);
  };

  const handleTopicChat = (topic: string) => {
    const url = getGeneralInquiryWhatsAppUrl(topic);
    openWhatsApp(url);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-8 sm:right-8 z-40 select-none">
      {/* Popover Bubble on Click */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-24px)] max-w-[320px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  SP
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#128C7E] rounded-full" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">StudyPop Student Support</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span>Usually replies within 5 mins</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-3 bg-[#FAF8F5] text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none border border-stone-200/60 shadow-2xs text-stone-700 leading-relaxed">
              Assalam-o-Alaikum! 🌸 Need help with your semester order, campus delivery, or product recommendations?
            </div>

            {/* Quick action buttons */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleTopicChat('Track my current order')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-700 text-[11px] font-medium transition-colors flex items-center justify-between"
              >
                <span>📦 Track my order / Delivery status</span>
                <Send className="w-3 h-3 text-emerald-600 shrink-0" />
              </button>

              <button
                onClick={() => handleTopicChat('MDCAT / Exam Essentials recommendation')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-700 text-[11px] font-medium transition-colors flex items-center justify-between"
              >
                <span>✨ Product recommendation for exams</span>
                <Send className="w-3 h-3 text-emerald-600 shrink-0" />
              </button>

              <button
                onClick={handleDirectChat}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2.5">
        {!isOpen && (
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md text-stone-800 text-xs font-semibold rounded-full border border-stone-200/90 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat on WhatsApp</span>
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact StudyPop on WhatsApp"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer touch-manipulation group"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-[#25D366] rounded-full" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
