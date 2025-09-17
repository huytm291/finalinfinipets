import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

interface CategoriesSectionProps {
  isDarkMode: boolean;
}

export default function CategoriesSection({ isDarkMode }: CategoriesSectionProps) {
  return (
    <section className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
            Explore Our Collections
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            From everyday essentials to show-stopping costumes, find the perfect style for every personality
          </p>
        </div>

        <div className="masonry-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="masonry-item group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`rounded-2xl overflow-hidden shadow-lg hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-coiny text-xl mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {category.productCount} items
                      </span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}