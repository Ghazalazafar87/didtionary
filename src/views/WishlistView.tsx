import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, setActivePage, addToCart } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-10 sm:py-14 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-1">
              Saved For Later
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Your Dream Study Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
              }}
              className="px-5 py-2.5 bg-stone-900 hover:bg-purple-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-purple-300" />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">Your wishlist is empty</h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Save your favorite journals, highlighters, and pens while browsing so you don't lose them!
            </p>
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Stationery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
