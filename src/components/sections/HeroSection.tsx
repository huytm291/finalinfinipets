import { useState, useEffect } from 'react';
import { ChevronRight, Play, Sparkles, Award, Shield, Truck } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000); // Auto-slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-green-600 to-blue-600 opacity-90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg rotate-45 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg rotate-12 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="text-teal-400" size={16} />
              <span className="text-sm font-medium">Premium Pet Fashion Since 2024</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-coiny text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              <span className="block text-white mb-2">Welcome to</span>
              <span
                className="block bg-gradient-to-r from-teal-400 via-green-400 to-teal-400 bg-clip-text text-transparent font-black"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}
              >
                INFINIPETS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
              Infinite Styles for Infinite Personalities
            </p>

            {/* Description */}
            <p className="text-lg mb-8 text-white/80 max-w-lg leading-relaxed">
              Discover premium pet fashion crafted with love in Europe. From everyday comfort to extraordinary occasions, we create styles that celebrate your pet's unique personality.
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">10K+</div>
                <div className="text-sm text-white/70">Happy Pets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">500+</div>
                <div className="text-sm text-white/70">Unique Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">15+</div>
                <div className="text-sm text-white/70">EU Countries</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center">
                <span>Shop Collections</span>
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              <button className="group flex items-center space-x-2 text-white border-2 border-white/30 backdrop-blur-sm px-6 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
                <Play className="group-hover:scale-110 transition-transform" size={16} />
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 mt-8 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-green-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-teal-400" />
                <span>Free EU Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award size={16} className="text-green-400" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Product Showcase */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=400&fit=crop"
                  alt="Featured Pet Fashion"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />

                {/* Floating Product Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"></div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">Superhero Cape</div>
                      <div className="text-xs text-gray-500">€49.99</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">Cozy Sweater</div>
                      <div className="text-xs text-gray-500">€34.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 text-6xl animate-spin" style={{ animationDuration: '20s' }}>✨</div>
            <div className="absolute bottom-0 left-0 text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🐾</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-white/60 text-xs mt-2 text-center">Scroll to explore</p>
      </div>
    </section>
  );
}