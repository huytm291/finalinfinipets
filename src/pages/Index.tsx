import { useState } from 'react';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import LoadingScreen from '@/components/LoadingScreen';

import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import LimitedEditionSection from '@/components/sections/LimitedEditionSection';
import OurCraftSection from '@/components/sections/OurCraftSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import FooterSection from '@/components/sections/FooterSection';

import DynamicProducts from '@/components/DynamicProducts';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        favoriteCount={favorites.length}
        cartCount={cartItems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Thanh tìm kiếm đặt ngay dưới Header */}
      <div className="container mx-auto px-4 py-4">
        <SearchInput isDarkMode={isDarkMode} />
      </div>

      <HeroSection isDarkMode={isDarkMode} />
      <CategoriesSection isDarkMode={isDarkMode} />
      <FeaturedProductsSection
        isDarkMode={isDarkMode}
        favorites={favorites}
        onFavorite={handleFavorite}
      />

      <DynamicProducts />

      <LimitedEditionSection isDarkMode={isDarkMode} />
      <OurCraftSection isDarkMode={isDarkMode} />
      <TestimonialsSection isDarkMode={isDarkMode} />

      <NewsletterSection isDarkMode={isDarkMode} />

      <FooterSection isDarkMode={isDarkMode} />

      <ChatBot />
    </div>
  );
}