import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  isDarkMode: boolean;
}

export default function NewsletterSection({ isDarkMode }: NewsletterSectionProps) {
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

      <div className="container mx-auto px-4 text-center relative z-10">
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
        </div>
      </div>
    </section>
  );
}