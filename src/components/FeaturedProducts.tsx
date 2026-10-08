import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Flame, Trophy, Award, Sparkles } from 'lucide-react';

type TabType = 'trending' | 'bestsellers' | 'exam' | 'new';

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const { setActivePage } = useShop();

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
      case 'exam':
        return PRODUCTS.filter(
          (p) =>
            p.category === 'Exam Preparation Essentials' ||
            p.category === 'Aesthetic Notebooks and Journals' ||
            p.studentTag?.includes('MDCAT')
        ).slice(0, 8);
      case 'new':
        return PRODUCTS.filter((p) => p.isNew || p.id.includes('planner') || p.id.includes('bag')).slice(0, 8);
      case 'trending':
      default:
        return PRODUCTS.filter((p) => p.isTrending || p.isBestSeller).slice(0, 8);
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header & Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              Top Student Picks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Trending for the Current Semester
            </h2>
          </div>

          {/* Functional Segmented Control Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80 self-start md:self-auto overflow-x-auto max-w-full scrollbar-none pb-1.5 md:pb-1">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'trending'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending Now</span>
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>Best Sellers</span>
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'exam'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exam Essentials</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>New Drops</span>
            </button>
          </div>
        </div>

        {/* 2-column mobile, 3-column tablet, 4-column desktop grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-purple-900 text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Browse Complete Student Catalog ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
