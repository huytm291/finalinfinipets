// src/pages/Index.tsx
import { useEffect, useState } from 'react';
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

  // favorites lưu id sản phẩm yêu thích
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // cartItems lưu id sản phẩm trong giỏ hàng (có thể mở rộng thành {productId, quantity})
  const [cartItems, setCartItems] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored).map((item: any) => item.productId) : [];
    }
    return [];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Đồng bộ favorites vào localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Đồng bộ cartItems vào localStorage (lưu dạng [{productId, quantity:1}])
  useEffect(() => {
    // Lấy số lượng mặc định 1 cho mỗi sản phẩm trong cartItems
    const cartWithQuantity = cartItems.map((id) => ({ productId: id, quantity: 1 }));
    localStorage.setItem('cart', JSON.stringify(cartWithQuantity));
  }, [cartItems]);

  // Đồng bộ theme vào localStorage và cập nhật class trên body
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header
        favoriteCount={favorites.length}
        cartCount={cartItems.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Nếu bạn muốn thêm thanh tìm kiếm, hãy tạo component mới hoặc thêm trực tiếp ở đây */}

      <HeroSection isDarkMode={isDarkMode} />
      <CategoriesSection isDarkMode={isDarkMode} />
      <FeaturedProductsSection
        isDarkMode={isDarkMode}
        favorites={favorites}
        onFavorite={handleFavorite}
        onAddToCart={handleAddToCart}
      />

      <DynamicProducts
        favorites={favorites}
        onFavorite={handleFavorite}
        onAddToCart={handleAddToCart}
        isDarkMode={isDarkMode}
      />

      <LimitedEditionSection isDarkMode={isDarkMode} />
      <OurCraftSection isDarkMode={isDarkMode} />
      <TestimonialsSection isDarkMode={isDarkMode} />

      <NewsletterSection isDarkMode={isDarkMode} />

      <FooterSection isDarkMode={isDarkMode} />

      <ChatBot />
    </div>
  );
}