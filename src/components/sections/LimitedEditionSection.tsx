import { Star } from 'lucide-react';
import { limitedProducts } from '@/data/products';

interface LimitedEditionSectionProps {
  isDarkMode: boolean;
}

export default function LimitedEditionSection({ isDarkMode }: LimitedEditionSectionProps) {
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
            Limited Edition Collections
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Exclusive designs available for a limited time only
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {limitedProducts.map((product) => (
            <div key={product.id} className={`rounded-2xl overflow-hidden shadow-xl hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      LIMITED EDITION
                    </span>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={14} className="text-teal-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <h3 className={`font-coiny text-2xl mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      €{product.price}
                    </span>
                    <span className="text-sm text-red-500 font-medium">Only 12 left!</span>
                  </div>
                  <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold px-6 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 w-full">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}