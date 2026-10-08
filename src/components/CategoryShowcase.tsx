import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/products';
import {
  Book,
  PenTool,
  Highlighter,
  Package,
  FileText,
  Calendar,
  Palette,
  LayoutGrid,
  Bookmark,
  Sparkles,
  Award,
  Type,
  Smile,
  Gift,
  Cpu,
  ArrowRight,
  Backpack,
  UtensilsCrossed,
  Droplets
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Aesthetic Notebooks and Journals': <Book className="w-5 h-5" />,
  'Cute Pens and Gel Pens': <PenTool className="w-5 h-5" />,
  'Highlighters and Colorful Markers': <Highlighter className="w-5 h-5" />,
  'Premium Pencil Cases': <Package className="w-5 h-5" />,
  'Sticky Notes and Memo Pads': <FileText className="w-5 h-5" />,
  'Planners and Study Organizers': <Calendar className="w-5 h-5" />,
  'Art and Craft Supplies': <Palette className="w-5 h-5" />,
  'Desk Accessories': <LayoutGrid className="w-5 h-5" />,
  'Bookmarks and Page Flags': <Bookmark className="w-5 h-5" />,
  'Creative School Supplies': <Sparkles className="w-5 h-5" />,
  'Exam Preparation Essentials': <Award className="w-5 h-5" />,
  'Personalized Stationery': <Type className="w-5 h-5" />,
  'Kawaii and Cute Stationery': <Smile className="w-5 h-5" />,
  'Gift Sets for Students': <Gift className="w-5 h-5" />,
  'Unique and Innovative Stationery Gadgets': <Cpu className="w-5 h-5" />,
  'School Bags and Backpacks': <Backpack className="w-5 h-5" />,
  'Lunch Boxes and Bento Sets': <UtensilsCrossed className="w-5 h-5" />,
  'Water Bottles and Tumblers': <Droplets className="w-5 h-5" />,
};

export const CategoryShowcase: React.FC = () => {
  const { setCategoryFilter, setActivePage } = useShop();

  const handleCategorySelect = (categoryId: string) => {
    setCategoryFilter(categoryId);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F7F4EF]/70 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Explore by School & Study Need
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter(null);
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-purple-700 transition-colors group cursor-pointer"
          >
            <span>View All {CATEGORIES_LIST.length} Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (Clean cards, subtle hover lift, zero generic pill badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES_LIST.slice(0, 15).map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group bg-white p-4 rounded-2xl border border-stone-200/80 hover:border-purple-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${cat.accentBg}`}
                >
                  {CATEGORY_ICONS[cat.id] || <Sparkles className="w-5 h-5" />}
                </div>

                <h3 className="font-bold text-sm text-stone-900 group-hover:text-purple-900 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                  {cat.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="tabular-nums font-medium text-stone-600">{cat.count} items</span>
                <span className="text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Browse →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
