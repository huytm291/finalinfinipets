import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, CheckCircle, Shield, Heart } from 'lucide-react';

interface NewsletterSectionProps {
  isDarkMode: boolean;
}

const sampleSuggestions = [
  'Dog collars',
  'Cat sweaters',
  'Pet toys',
  'Leashes',
  'Pet beds',
  'Winter coats',
  'Eco-friendly pet products',
  'Limited edition collars',
  'Personalized tags',
  'Pet grooming kits',
];

export default function NewsletterSection({ isDarkMode }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lá thư bay lên state
  const [letters, setLetters] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  // Gợi ý tìm kiếm dựa trên searchTerm
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = sampleSuggestions.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchTerm]);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLocked) return;

    setIsSubscribing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail('');
    setSearchTerm('');
    setSuggestions([]);

    // Tạo hiệu ứng lá thư bay lên
    const newLetters = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -150 - 50,
      delay: i * 150,
    }));
    setLetters(newLetters);

    // Hiện thông báo welcome
    setShowWelcome(true);

    // Khóa form 30 giây để tránh spam
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 30000);

    // Ẩn welcome sau 4 giây
    setTimeout(() => setShowWelcome(false), 4000);

    // Xóa lá thư sau 3 giây
    setTimeout(() => setLetters([]), 3000);

    // Reset trạng thái đăng ký sau 3 giây
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Chọn gợi ý tìm kiếm
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <section
      className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-green-50/30 dark:from-teal-900/10 dark:to-green-900/10"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-teal-200/20 dark:bg-teal-600/20 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-green-200/20 dark:bg-green-600/20 rounded-lg rotate-45 animate-bounce"></div>
      <div className="absolute bottom-10 left-20 w-24 h-24 bg-teal-200/20 dark:bg-teal-600/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-18 h-18 bg-green-200/20 dark:bg-green-600/20 rounded-lg rotate-12 animate-bounce"></div>

      {/* Welcome Notification */}
      {showWelcome && (
        <div className="fixed top-4 left-4 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-left">
          Welcome to the INFINIPETS family!
        </div>
      )}

      {/* Letters flying animation */}
      {letters.map(({ id, x, y, delay }) => (
        <div
          key={id}
          className="absolute w-6 h-6 text-teal-400 animate-fly-letter"
          style={{
            left: '50%',
            bottom: '80px',
            transform: `translateX(${x}px) translateY(${y}px)`,
            animationDelay: `${delay}ms`,
          }}
        >
          📧
        </div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10" ref={containerRef}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div
              className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4 bg-gradient-to-r ${
                isDarkMode
                  ? 'from-teal-700 to-green-700'
                  : 'from-teal-100 to-green-100'
              }`}
            >
              <Sparkles
                className={`${
                  isDarkMode ? 'text-teal-400' : 'text-teal-600'
                }`}
                size={16}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-teal-200' : 'text-teal-800'
                }`}
              >
                Join 50,000+ Pet Parents
              </span>
            </div>
          </div>

          <h2
            className={`font-coiny text-4xl md:text-5xl mb-4 ${
              isDarkMode
                ? 'text-teal-300 drop-shadow-[0_0_4px_rgba(0,128,128,0.7)]'
                : 'text-teal-700'
            }`}
          >
            Join Our Pack
          </h2>

          <p
            className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Get exclusive access to new collections, styling tips, and special offers for your furry friends. Plus, enjoy 15% off your first order! 🐾
          </p>

          {isSubscribed ? (
            <div
              className={`flex flex-col items-center justify-center space-y-4 max-w-md mx-auto ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-lg font-semibold">Successfully subscribed!</span>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Welcome to the INFINIPETS family! Check your email for your 15% discount code 🎉
              </p>
            </div>
          ) : (
            <div className="max-w-lg mx-auto relative">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 items-stretch"
                autoComplete="off"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSearchTerm(e.target.value);
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all placeholder-gray-500 ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border border-gray-600'
                        : 'bg-white text-gray-900 border border-gray-300'
                    }`}
                    required
                    disabled={isLocked}
                  />
                  {/* Gợi ý tìm kiếm */}
                  {suggestions.length > 0 && (
                    <ul
                      className={`absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto rounded-md border border-gray-300 bg-white dark:bg-gray-800 shadow-lg ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {suggestions.map((sugg) => (
                        <li
                          key={sugg}
                          className="cursor-pointer px-4 py-2 hover:bg-teal-500 hover:text-white transition"
                          onClick={() => handleSuggestionClick(sugg)}
                        >
                          {sugg}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubscribing || isLocked}
                  className="group relative bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 overflow-hidden min-w-[160px]"
                >
                  {/* Animated Background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                  {/* Shimmer Effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>

                  <span className="relative z-10 flex items-center space-x-2">
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Get 15% Off</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              <div
                className={`flex items-center justify-center space-x-6 mt-6 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart size={16} className="text-teal-500" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          )}

          <p className={`text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Join thousands of pet parents who trust INFINIPETS for premium pet fashion 🐾✨
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fly-letter {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) translateX(50px) rotate(720deg);
          }
        }
        .animate-fly-letter {
          animation: fly-letter 2s forwards;
          position: absolute;
          font-size: 1.5rem;
          pointer-events: none;
          user-select: none;
          will-change: transform, opacity;
        }
        @keyframes slide-in-left {
          0% {
            transform: translateX(-150%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease forwards;
        }
      `}</style>
    </section>
  );
}