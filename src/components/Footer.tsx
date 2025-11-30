import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-400 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
              Đăng ký nhận ưu đãi
            </h3>
            <p className="text-white/90 mb-6">
              Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-rose-400 rounded-full font-medium hover:bg-gray-100 transition-colors uppercase text-sm tracking-wider"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h4 className="text-2xl font-serif text-white mb-4">
              <span className="text-rose-400">EMILY</span>FLOWER
            </h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Chuyên cung cấp hoa sáp thơm và gấu bông hoa handmade cao cấp.
              Mang đến món quà tình yêu bền vững.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Dịch vụ khách hàng
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Giao hàng & Thanh toán
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Liên kết
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Đường Hoa, Quận 1, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <a
                  href="tel:0123456789"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <a
                  href="mailto:hello@emilyflower.com"
                  className="text-gray-400 hover:text-rose-400 transition-colors"
                >
                  hello@emilyflower.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 Emily Flower. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-rose-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
