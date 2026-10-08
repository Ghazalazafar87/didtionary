import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { openProductDetail } = useShop();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = searchTerm.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          (p.studentTag && p.studentTag.toLowerCase().includes(query))
        );
      })
    : PRODUCTS.slice(0, 4);

  const popularSearches = ['Backpack', 'Water Bottle', 'Bento Box', '160 GSM Journal', 'Gel Pens', 'Highlighters', 'MDCAT'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notebooks, pens, highlighters, exam kits..."
            autoFocus
            className="w-full text-base sm:text-lg bg-transparent border-none outline-none text-stone-800 placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 min-h-[40px] text-stone-600 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="px-4 py-2.5 bg-stone-50/70 border-b border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap">Try:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-purple-300 hover:text-purple-700 whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">
            {searchTerm ? `Results (${results.length})` : 'Popular Among Students'}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-10 text-stone-500">
              <p className="text-base font-semibold text-stone-800">No stationery found</p>
              <p className="text-sm text-stone-500 mt-1">Try searching for "journal", "pastel", or "pen"</p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  openProductDetail(product.id);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50/70 transition-all cursor-pointer border border-transparent hover:border-purple-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-13 h-13 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200/60"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-purple-700 font-medium truncate">
                      {product.category}
                    </p>
                    <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-purple-900">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="font-bold text-stone-900 tabular-nums">
                        Rs. {product.pricePKR.toLocaleString()}
                      </span>
                      {product.originalPricePKR && (
                        <span className="line-through text-stone-400 tabular-nums">
                          Rs. {product.originalPricePKR.toLocaleString()}
                        </span>
                      )}
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>Free delivery in Pakistan over Rs. 2,500</span>
          <span>Cash on Delivery & JazzCash</span>
        </div>
      </div>
    </div>
  );
};
