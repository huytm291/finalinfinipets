import React, { useState } from 'react';
import SearchInput from './SearchInput';

interface NavbarProps {
  isDarkMode: boolean;
}

export default function Navbar({ isDarkMode }: NavbarProps) {
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubscribeSuccess = () => {
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 4000);
  };

  return (
    <nav className={`w-full p-4 flex items-center justify-between bg-white dark:bg-gray-900`}>
      {/* Logo hoặc menu ở đây */}
      <div className="text-xl font-bold text-teal-600">INFINIPETS</div>

      {/* Thanh tìm kiếm */}
      <div className="flex-1 max-w-md mx-4">
        <SearchInput isDarkMode={isDarkMode} onSubscribeSuccess={handleSubscribeSuccess} />
      </div>

      {/* Thông báo welcome góc trên trái */}
      {showWelcome && (
        <div className="fixed top-4 left-4 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-left">
          Welcome to the INFINIPETS family!
        </div>
      )}
    </nav>
  );
}