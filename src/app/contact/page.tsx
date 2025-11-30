"use client";

import { useState } from "react";
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
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          companyName: "Emily Flower",
          serviceName: "hoa sáp thơm và gấu bông hoa handmade",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content:
        "B12 ngách 2 ngõ 54 đường ngọc hồi, Hoàng Liệt, Hoàng Mai, Hà Nội",
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "0389789000",
      link: "tel:0389789000",
    },
    {
      icon: Mail,
      title: "Email",
      content: "tovanthecauthisaodinh@gmail.com",
      link: "mailto:tovanthecauthisaodinh@gmail.com",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Chủ Nhật: 8:00 - 22:00",
    },
  ];

  const stores = [
    {
      name: "Emily Flower - Cơ sở chính",
      address:
        "B12 ngách 2 ngõ 54 đường ngọc hồi, Hoàng Liệt, Hoàng Mai, Hà Nội",
      phone: "0389789000",
      hours: "8:00 - 22:00 (Hàng ngày)",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-linear-to-b from-rose-50 to-white">
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

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">
                      Đã gửi thành công!
                    </p>
                    <p className="text-green-600 text-sm">
                      Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="0389789000"
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
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.subject}
                    onChange={handleChange}
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
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-lg font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-rose-400 hover:bg-rose-500 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi tin nhắn
                    </>
                  )}
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0558447284087!2d105.8566863!3d20.9832436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad84c4e6b839%3A0x12c800d7020e446e!2zTmfDtSA1NCBOZ-G7jWMgSOG7k2ksIEhvw6BuZyBMaeG7h3QsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732975200000!5m2!1svi!2s"
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
                          <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{store.address}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                          <span>{store.phone}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-rose-400 shrink-0" />
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
