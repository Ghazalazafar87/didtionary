import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

// Homepage sections
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { ThreeDSpotlight } from './components/ThreeDSpotlight';
import { WhyChooseUs } from './components/WhyChooseUs';
import { StudentReviews } from './components/StudentReviews';
import { NewsletterSection } from './components/NewsletterSection';

// Page Views
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { WishlistView } from './views/WishlistView';
import { ThreeDStudioView } from './views/ThreeDStudioView';
import { AboutUsView } from './views/AboutUsView';
import { ContactUsView } from './views/ContactUsView';
import { FAQsView } from './views/FAQsView';
import { PoliciesView } from './views/PoliciesView';
import { OrderHistoryView } from './views/OrderHistoryView';
import { Order } from './types';

const MainContent: React.FC = () => {
  const { activePage, setActivePage } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const handleOrderComplete = (order: Order) => {
    setLatestOrder(order);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-purple-200 selection:text-purple-900">
      {/* Global Notice Bar */}
      <AnnouncementBar />

      {/* Top Bar Contract Compliant Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Slide-out Shopping Pouch Cart Drawer */}
      <CartDrawer />

      {/* Real-time Toast Notifications */}
      <ToastContainer />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <CategoryShowcase />
            <FeaturedProducts />
            <SpecialOfferBanner />
            <ThreeDSpotlight />
            <WhyChooseUs />
            <StudentReviews />
            <NewsletterSection />
          </>
        )}

        {activePage === 'shop' && <ShopView />}

        {activePage === 'product' && <ProductDetailView />}

        {activePage === '3d-studio' && <ThreeDStudioView />}

        {activePage === 'wishlist' && <WishlistView />}

        {activePage === 'checkout' && (
          <CheckoutView onOrderComplete={handleOrderComplete} />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmationView order={latestOrder} />
        )}

        {activePage === 'about' && <AboutUsView />}

        {activePage === 'contact' && <ContactUsView />}

        {activePage === 'faqs' && <FAQsView />}

        {activePage === 'policies' && <PoliciesView />}

        {activePage === 'orders' && <OrderHistoryView />}
      </main>

      {/* Structured Boutique Footer */}
      <Footer />

      {/* Floating Interactive WhatsApp Quick Support */}
      <FloatingWhatsAppButton />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
