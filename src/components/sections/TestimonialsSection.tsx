import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  isDarkMode: boolean;
}

export default function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & Luna",
      location: "Berlin, Germany",
      text: "Luna looks absolutely stunning in her Forest Explorer set! The quality is exceptional and the fit is perfect. We get compliments everywhere we go! 🐕✨",
      rating: 5,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Marco & Bella",
      location: "Milan, Italy",
      text: "The handmade sweater is incredibly soft and warm. Bella loves wearing it during our morning walks. INFINIPETS truly understands pet fashion! 🧶❤️",
      rating: 5,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma & Max",
      location: "Amsterdam, Netherlands",
      text: "Max's superhero cape makes him the star of the dog park! The attention to detail and comfort is amazing. Highly recommend! 🦸‍♂️🐾",
      rating: 5,
      image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-coiny text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
            Words from Our Pack
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            See what pet parents across Europe are saying about their INFINIPETS experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={`rounded-2xl p-8 shadow-lg hover-lift ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} size={16} className="text-teal-400 fill-current" />
                ))}
              </div>
              <p className={`mb-6 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.text}"</p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}