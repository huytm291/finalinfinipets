import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface SearchInputProps {
  isDarkMode: boolean;
  onSubscribeSuccess?: () => void; 
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

export default function SearchInput({ isDarkMode, onSubscribeSuccess }: SearchInputProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    setIsSubscribing(false);
    setEmail('');
    setSearchTerm('');
    setSuggestions([]);

    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 30000);

    if (onSubscribeSuccess) onSubscribeSuccess();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubscribe} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSearchTerm(e.target.value);
          }}
          placeholder="Enter your email address"
          className={`flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition placeholder-gray-500 ${
            isDarkMode
              ? 'bg-gray-800 text-white border border-gray-600'
              : 'bg-white text-gray-900 border border-gray-300'
          }`}
          disabled={isLocked}
          required
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isSubscribing || isLocked}
          className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center space-x-1"
        >
          <Send size={16} />
          <span>Subscribe</span>
        </button>
      </form>

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
              onClick={() => {
                setSearchTerm(sugg);
                setEmail(sugg);
                setSuggestions([]);
              }}
            >
              {sugg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}