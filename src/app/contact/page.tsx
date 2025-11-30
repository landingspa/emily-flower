import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "123 Đường Hoa, Quận 1, TP. Hồ Chí Minh",
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "0123 456 789",
      link: "tel:0123456789",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@emilyflower.com",
      link: "mailto:hello@emilyflower.com",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Chủ Nhật: 8:00 - 22:00",
    },
  ];

  const stores = [
    {
      name: "Chi nhánh 1 - Quận 1",
      address: "123 Đường Hoa, Phường Bến Nghé, Quận 1, TP.HCM",
      phone: "0123 456 789",
      hours: "8:00 - 22:00 (Hàng ngày)",
    },
    {
      name: "Chi nhánh 2 - Quận 3",
      address: "456 Đường Lê Văn Sỹ, Phường 14, Quận 3, TP.HCM",
      phone: "0123 456 790",
      hours: "8:00 - 22:00 (Hàng ngày)",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-gray-600 text-lg">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-rose-400 transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>
              <p className="text-gray-600 mb-8">
                Điền thông tin vào form bên dưới và chúng tôi sẽ phản hồi trong
                thời gian sớm nhất.
              </p>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="0123 456 789"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Tôi muốn đặt hoa..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nội dung *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-400 text-white py-4 rounded-lg hover:bg-rose-500 transition-colors font-medium uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <h2 className="text-3xl font-serif text-gray-800 mb-6">
                  Vị Trí Của Chúng Tôi
                </h2>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325271840259!2d106.69525431533322!3d10.777461692319545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb51296ff6b0bb0ae!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Stores */}
              <div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Hệ Thống Cửa Hàng
                </h3>
                <div className="space-y-4">
                  {stores.map((store, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {store.name}
                      </h4>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{store.address}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <span>{store.phone}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <span>{store.hours}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Kết Nối Với Chúng Tôi
                </h3>
                <p className="text-gray-600 mb-4">
                  Theo dõi chúng tôi trên mạng xã hội để cập nhật sản phẩm mới
                  và ưu đãi đặc biệt
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-400 hover:text-white transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-400 hover:text-white transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-gray-600">
              Một số câu hỏi phổ biến từ khách hàng
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Hoa sáp có giữ được mùi thơm trong bao lâu?",
                a: "Hoa sáp thơm của chúng tôi có thể giữ mùi thơm từ 6-12 tháng tùy điều kiện bảo quản.",
              },
              {
                q: "Tôi có thể đặt hàng tùy chỉnh theo ý muốn không?",
                a: "Có, chúng tôi nhận đặt hàng custom theo yêu cầu. Vui lòng liên hệ trực tiếp để được tư vấn chi tiết.",
              },
              {
                q: "Thời gian giao hàng mất bao lâu?",
                a: "Thời gian giao hàng trong nội thành TP.HCM là 2-4 giờ. Các tỉnh thành khác 1-3 ngày.",
              },
              {
                q: "Có chính sách đổi trả không?",
                a: "Chúng tôi chấp nhận đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi do nhà sản xuất.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm group"
              >
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-rose-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
