import React from 'react';

export default function FooterSection() {
  // Màu nền vuông cho từng icon social (theo màu chủ đạo web)
  const socialColors = {
    instagram: 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400',
    tiktok: 'bg-gradient-to-tr from-black to-gray-700',
    whatsapp: 'bg-gradient-to-tr from-green-600 to-green-400',
    pinterest: 'bg-gradient-to-tr from-red-600 to-red-400',
    facebook: 'bg-gradient-to-tr from-blue-700 to-blue-500',
  };

  // Màu nền vuông cho icon thanh toán
  const paymentColors = {
    visa: 'bg-gradient-to-tr from-blue-600 to-blue-400',
    mastercard: 'bg-gradient-to-tr from-red-600 to-yellow-400',
    paypal: 'bg-gradient-to-tr from-blue-700 to-cyan-400',
    bitcoin: 'bg-gradient-to-tr from-yellow-500 to-orange-400',
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <h3 className="font-coiny text-3xl mb-4 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
            INFINIPETS
          </h3>
          <p className="text-gray-400 mb-6 max-w-sm">
            Premium pet fashion crafted with love in Europe. Infinite styles for infinite personalities.
          </p>
        </div>

        {/* Cột 2: Shop */}
        <div>
          <h4 className="font-semibold text-xl mb-6">Shop</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-teal-400 transition">All Products</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">New Arrivals</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">Sale</a></li>
          </ul>
        </div>

        {/* Cột 3: Support */}
        <div>
          <h4 className="font-semibold text-xl mb-6">Support</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-teal-400 transition">Size Guide</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">Returns</a></li>
            <li><a href="#" className="hover:text-teal-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Cột 4: Contact Us + Social + Payment */}
        <div>
          <h4 className="font-semibold text-xl mb-6">Contact Us</h4>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className={`${socialColors.instagram} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-transform`}
            >
              <i className="fa-brands fa-square-instagram text-white text-2xl"></i>
            </a>

            {/* TikTok */}
            <a
              href="#"
              aria-label="TikTok"
              className={`${socialColors.tiktok} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-transform`}
            >
              <i className="fa-brands fa-tiktok text-white text-2xl"></i>
            </a>

            {/* WhatsApp */}
            <a
              href="#"
              aria-label="WhatsApp"
              className={`${socialColors.whatsapp} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-transform`}
            >
              <i className="fa-brands fa-square-whatsapp text-white text-2xl"></i>
            </a>

            {/* Pinterest */}
            <a
              href="#"
              aria-label="Pinterest"
              className={`${socialColors.pinterest} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-transform`}
            >
              <i className="fa-brands fa-square-pinterest text-white text-2xl"></i>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className={`${socialColors.facebook} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-transform`}
            >
              <i className="fa-brands fa-square-facebook text-white text-2xl"></i>
            </a>
          </div>

          {/* Payment Icons */}
          <h4 className="font-semibold text-xl mb-4">Payment Methods</h4>
          <div className="flex flex-wrap gap-4">
            {/* Visa */}
            <div
              className={`${paymentColors.visa} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg`}
              title="Visa"
            >
              <i className="fa-brands fa-cc-visa text-white text-2xl"></i>
            </div>

            {/* MasterCard */}
            <div
              className={`${paymentColors.mastercard} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg`}
              title="MasterCard"
            >
              <i className="fa-brands fa-cc-mastercard text-white text-2xl"></i>
            </div>

            {/* PayPal */}
            <div
              className={`${paymentColors.paypal} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg`}
              title="PayPal"
            >
              <i className="fa-brands fa-cc-paypal text-white text-2xl"></i>
            </div>

            {/* Bitcoin */}
            <div
              className={`${paymentColors.bitcoin} w-12 h-12 flex items-center justify-center rounded-lg shadow-lg`}
              title="Bitcoin"
            >
              <i className="fa-brands fa-bitcoin text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        © 2024 INFINIPETS. All rights reserved.
      </div>
    </footer>
  );
}