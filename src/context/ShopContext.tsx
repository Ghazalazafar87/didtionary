import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CustomerInfo, PaymentMethod, Order, ActivePage } from '../types';
import { PRODUCTS, VALID_PROMO_CODES } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  orders: Order[];
  savedCustomerInfo: CustomerInfo | null;
  activePage: ActivePage;
  selectedProductId: string | null;
  selectedCategoryFilter: string | null;
  searchQuery: string;
  isCartDrawerOpen: boolean;
  promoCode: string | null;
  promoDiscount: number;
  promoMessage: string | null;
  toasts: Toast[];

  // Actions
  setActivePage: (page: ActivePage) => void;
  openProductDetail: (productId: string) => void;
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCartDrawerOpen: (open: boolean) => void;

  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  updateQuantity: (productId: string, selectedColor: string | undefined, delta: number) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  recordRecentlyViewed: (productId: string) => void;
  placeOrder: (customerInfo: CustomerInfo, paymentMethod: PaymentMethod) => Order;

  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Computed
  cartTotalCount: number;
  cartSubtotal: number;
  freeDeliveryThreshold: number;
  shippingFee: number;
  cartFinalTotal: number;
  amountNeededForFreeDelivery: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 2500;
const STANDARD_DELIVERY_FEE = 220;

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Local storage backed states with safe initializers
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('studypop_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('studypop_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('studypop_recent_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('studypop_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedCustomerInfo, setSavedCustomerInfo] = useState<CustomerInfo | null>(() => {
    try {
      const saved = localStorage.getItem('studypop_customer_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('studypop_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('studypop_wishlist_v1', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('studypop_recent_v1', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('studypop_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (savedCustomerInfo) {
        localStorage.setItem('studypop_customer_v1', JSON.stringify(savedCustomerInfo));
      }
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [savedCustomerInfo]);

  // Toast dispatch
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Nav actions
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    recordRecentlyViewed(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategoryFilter = (category: string | null) => {
    setSelectedCategoryFilter(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const colorChoice = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorChoice
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: colorChoice }];
      }
    });

    showToast(`Added "${product.name}" to your stationery pouch!`, 'success');
  };

  const updateQuantity = (productId: string, selectedColor: string | undefined, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === selectedColor) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const isCurrentlyIn = wishlist.includes(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    const title = product ? product.name : 'Item';

    if (isCurrentlyIn) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed "${title}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved "${title}" to your wishlist! 💖`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Promo code
  const applyPromoCode = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const promo = VALID_PROMO_CODES[normalized];
    if (promo) {
      setPromoCode(normalized);
      setPromoMessage(promo.desc);
      showToast(promo.desc, 'success');
      return true;
    } else {
      showToast('Invalid voucher code. Try "STUDENT10" or "EXAMREADY"', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoMessage(null);
    showToast('Voucher code removed', 'info');
  };

  // Recently viewed
  const recordRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity,
    0
  );

  let promoDiscount = 0;
  if (promoCode && VALID_PROMO_CODES[promoCode]) {
    const promo = VALID_PROMO_CODES[promoCode];
    if (promo.discountPercent) {
      promoDiscount = Math.round((cartSubtotal * promo.discountPercent) / 100);
    } else if (promo.discountFixedPKR) {
      promoDiscount = Math.min(promo.discountFixedPKR, cartSubtotal);
    }
  }

  const isFreeDelivery = cartSubtotal >= FREE_DELIVERY_THRESHOLD || (promoCode === 'POPFREESHIP');
  const shippingFee = cartSubtotal > 0 ? (isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE) : 0;
  const cartFinalTotal = Math.max(0, cartSubtotal - promoDiscount + shippingFee);
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartSubtotal);

  // Place Order
  const placeOrder = (customerInfo: CustomerInfo, paymentMethod: PaymentMethod): Order => {
    const randomTrackNum = `TRX-PK-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomOrderNum = `SP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: randomOrderNum,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: promoDiscount,
      shippingFee,
      total: cartFinalTotal,
      customerInfo,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'paid_on_delivery' : 'verified',
      trackingNumber: randomTrackNum,
      courier: 'TCS Courier',
      status: 'confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSavedCustomerInfo(customerInfo);
    clearCart();
    setPromoCode(null);
    setPromoMessage(null);

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        orders,
        savedCustomerInfo,
        activePage,
        selectedProductId,
        selectedCategoryFilter,
        searchQuery,
        isCartDrawerOpen,
        promoCode,
        promoDiscount,
        promoMessage,
        toasts,
        setActivePage,
        openProductDetail,
        setCategoryFilter,
        setSearchQuery,
        setIsCartDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromoCode,
        removePromoCode,
        recordRecentlyViewed,
        placeOrder,
        showToast,
        removeToast,
        cartTotalCount,
        cartSubtotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        shippingFee,
        cartFinalTotal,
        amountNeededForFreeDelivery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
