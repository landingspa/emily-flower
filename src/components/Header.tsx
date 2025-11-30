"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Menu, X, Search, ShoppingCart } from "lucide-react";

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000000 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <h1 className="text-2xl md:text-3xl font-serif">
                <span className="text-rose-400">EMILY</span>
                <span className="text-gray-800">FLOWER</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-rose-400 transition-colors uppercase text-sm tracking-wider"
              >
                Trang chủ
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-rose-400 transition-colors uppercase text-sm tracking-wider"
              >
                Sản phẩm
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-rose-400 transition-colors uppercase text-sm tracking-wider"
              >
                Về chúng tôi
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-rose-400 transition-colors uppercase text-sm tracking-wider"
              >
                Liên hệ
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                className="hidden md:block p-2 hover:text-rose-400 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={openCart}
                className="p-2 hover:text-rose-400 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 hover:text-rose-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Full Screen */}
      <div
        className={`fixed inset-0 z-1000 md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={`absolute top-16 left-0 right-0 bottom-0 bg-linear-to-b from-white via-rose-50/30 to-pink-50/30 backdrop-blur-xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
              {/* Main Navigation */}
              <div className="space-y-2 mb-8">
                <a
                  href="/"
                  className="block py-4 px-6 text-gray-700 hover:text-rose-400 hover:bg-white/60 rounded-xl transition-all uppercase text-base tracking-wider font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trang chủ
                </a>
                <a
                  href="/products"
                  className="block py-4 px-6 text-gray-700 hover:text-rose-400 hover:bg-white/60 rounded-xl transition-all uppercase text-base tracking-wider font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sản phẩm
                </a>
                <a
                  href="/about"
                  className="block py-4 px-6 text-gray-700 hover:text-rose-400 hover:bg-white/60 rounded-xl transition-all uppercase text-base tracking-wider font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Về chúng tôi
                </a>
                <a
                  href="/contact"
                  className="block py-4 px-6 text-gray-700 hover:text-rose-400 hover:bg-white/60 rounded-xl transition-all uppercase text-base tracking-wider font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liên hệ
                </a>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-3">
                <h3 className="text-lg font-serif text-gray-800 mb-4">
                  Liên hệ
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                    <span>📞 0389789000</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                    <span>✉️ tovanthecauthisaodinh@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                    <span>
                      📍 B12 ngách 2 ngõ 54 đường ngọc hồi, Hoàng Liệt, Hoàng
                      Mai, Hà Nội
                    </span>
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Kết nối với chúng tôi
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
