import { Heart, Shield, Recycle } from 'lucide-react';

interface OurCraftSectionProps {
  isDarkMode: boolean;
}

export default function OurCraftSection({ isDarkMode }: OurCraftSectionProps) {
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
            Behind the Seams
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Every piece is handcrafted with love, attention to detail, and premium materials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop"
                alt="Handcrafting process"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                <Heart className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <div>
                <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Handcrafted with Love</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Each piece is carefully crafted by skilled artisans who understand the unique needs of pets and their owners.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Shield className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Premium Materials</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>We source only the finest, pet-safe materials that are comfortable, durable, and beautiful.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                <Recycle className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <div>
                <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustainable Practices</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Our commitment to the environment means using eco-friendly materials and sustainable production methods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}