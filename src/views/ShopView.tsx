import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import {
  SlidersHorizontal,
  Search,
  X,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    selectedCategoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [priceMax, setPriceMax] = useState<number>(4000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const studentTags = [
    { id: 'all', label: 'All Items' },
    { id: 'campus', label: 'Backpacks & Bottles', match: 'Campus' },
    { id: 'mdcat', label: 'MDCAT & Medical', match: 'MDCAT' },
    { id: 'exam', label: 'Board Exams & CA', match: 'Exam' },
    { id: 'university', label: 'University Essentials', match: 'University' },
    { id: 'creative', label: 'Journaling & Art', match: 'Journaling' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategoryFilter && product.category !== selectedCategoryFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.studentTag?.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (product.pricePKR > priceMax) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Student Tag filter
      if (selectedTag !== 'all') {
        const targetTag = studentTags.find((t) => t.id === selectedTag);
        if (targetTag?.match && (!product.studentTag || !product.studentTag.includes(targetTag.match))) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategoryFilter, searchQuery, priceMax, inStockOnly, selectedTag, sortBy]);

  const handleResetFilters = () => {
    setCategoryFilter(null);
    setSearchQuery('');
    setPriceMax(4000);
    setInStockOnly(false);
    setSelectedTag('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(selectedCategoryFilter) ||
    Boolean(searchQuery) ||
    priceMax < 4000 ||
    inStockOnly ||
    selectedTag !== 'all';

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-purple-700 font-semibold">Stationery Catalog</span>
            {selectedCategoryFilter && (
              <>
                <span>/</span>
                <span className="text-stone-800 font-bold">{selectedCategoryFilter}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                {selectedCategoryFilter || 'Complete Stationery Collection'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredProducts.length} items designed specifically for students in Pakistan
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>Filters & Sort</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Student Tag Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs">
          {studentTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-purple-300'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Main 2-Column Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                <Filter className="w-4 h-4 text-purple-600" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-900"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. 160 GSM, highlighters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-7 py-2 rounded-xl border border-stone-200 focus:border-purple-600 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories List */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Category
              </label>
              <div className="max-h-60 overflow-y-auto space-y-1 pr-1 text-xs">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedCategoryFilter === null
                      ? 'bg-purple-100 text-purple-900 font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  All Categories ({PRODUCTS.length})
                </button>
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-purple-100 text-purple-900 font-bold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] text-stone-400 tabular-nums">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-stone-700 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-bold text-purple-900 tabular-nums">
                  Rs. {priceMax.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="4000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 tabular-nums">
                <span>Rs. 400</span>
                <span>Rs. 4,000</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">In Stock Only</span>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  inStockOnly ? 'bg-purple-600' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    inStockOnly ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </aside>

          {/* Product Grid & Sorting Toolbar */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting bar */}
            <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 font-medium">
                Showing <strong className="text-stone-800 tabular-nums">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center space-y-3">
            <p className="text-base sm:text-lg font-bold text-stone-900">No stationery products found</p>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              Try broadening your price filter or clearing your search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-purple-900 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-[85%] max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col z-10 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-stone-900 text-base">Filter & Sort</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5 flex-1">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase mb-1.5 block">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase mb-1.5 block">
                  Max Price: Rs. {priceMax.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="400"
                  max="4000"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase mb-1.5 block">
                  Category
                </label>
                <div className="max-h-48 overflow-y-auto space-y-1 text-xs pr-1">
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className={`w-full min-h-[36px] text-left p-2 rounded-lg font-medium transition-colors ${
                      selectedCategoryFilter === null ? 'bg-purple-100 font-bold text-purple-900' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES_LIST.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategoryFilter(c.id)}
                      className={`w-full min-h-[36px] text-left p-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategoryFilter === c.id ? 'bg-purple-100 font-bold text-purple-900' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-stone-400 tabular-nums ml-1">({c.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 min-h-[44px] bg-stone-100 active:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 min-h-[44px] bg-stone-900 active:bg-purple-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
