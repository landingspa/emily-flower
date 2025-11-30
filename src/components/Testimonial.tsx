export default function Testimonial() {
  const testimonials = [
    {
      name: "Minh Anh",
      text: "Hoa sáp thơm của Emily Flower thật tuyệt vời! Mùi hương nhẹ nhàng và hoa đẹp như thật. Người yêu mình rất thích!",
      rating: 5,
    },
    {
      name: "Tuấn Kiệt",
      text: "Gấu bông hoa làm quà tặng sinh nhật cho bạn gái rất ý nghĩa. Chất lượng tốt, đóng gói cẩn thận. Sẽ ủng hộ tiếp!",
      rating: 5,
    },
    {
      name: "Phương Linh",
      text: "Mình đã mua nhiều lần ở đây. Sản phẩm luôn đẹp và thơm. Giá cả hợp lý, giao hàng nhanh chóng!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-4">
            <svg
              width="60"
              height="30"
              viewBox="0 0 60 30"
              className="text-rose-300"
            >
              <path
                fill="currentColor"
                d="M30,15 Q20,5 10,15 Q20,25 30,15 Z M30,15 Q40,5 50,15 Q40,25 30,15 Z M25,15 Q20,10 15,15 M35,15 Q40,10 45,15"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
        </div>

        {/* Quote */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <svg
            className="w-12 h-12 text-rose-200 mx-auto mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl md:text-2xl italic text-gray-700 font-serif leading-relaxed">
            "Mỗi sản phẩm đều mang theo tình cảm và sự chân thành. Chúng tôi tự
            hào khi mang đến niềm vui cho khách hàng."
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Name */}
              <p className="text-gray-800 font-semibold">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
