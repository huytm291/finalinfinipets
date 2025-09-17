import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';

interface FeaturedProductsSectionProps {
  isDarkMode: boolean;
  favorites: string[];
  onFavorite: (productId: string) => void;
}

export default function FeaturedProductsSection({ isDarkMode, favorites, onFavorite }: FeaturedProductsSectionProps) {
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
            Featured Favorites
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Handpicked by our style experts and loved by pets across Europe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={onFavorite}
              isFavorited={favorites.includes(product.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center mx-auto">
            View All Products
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}