import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Award, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Tình yêu thủ công",
      description:
        "Mỗi sản phẩm được làm thủ công với tình yêu và sự tỉ mỉ trong từng chi tiết.",
    },
    {
      icon: Award,
      title: "Chất lượng cao cấp",
      description:
        "Sử dụng nguyên liệu nhập khẩu, đảm bảo sản phẩm bền đẹp lâu dài.",
    },
    {
      icon: Users,
      title: "Phục vụ tận tâm",
      description:
        "Đội ngũ tư vấn nhiệt tình, hỗ trợ 24/7 để mang đến trải nghiệm tốt nhất.",
    },
    {
      icon: Sparkles,
      title: "Thiết kế độc đáo",
      description:
        "Không ngừng sáng tạo và cập nhật xu hướng mới nhất trong nghệ thuật làm hoa.",
    },
  ];

  const team = [
    {
      name: "Emily Nguyễn",
      role: "Founder & Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Sarah Trần",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      name: "Linda Phạm",
      role: "Lead Florist",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
  ];

  const milestones = [
    { year: "2020", event: "Thành lập Emily Flower" },
    { year: "2021", event: "Mở rộng đội ngũ và xưởng sản xuất" },
    { year: "2022", event: "Ra mắt bộ sưu tập gấu bông hoa" },
    { year: "2023", event: "Đạt 10,000+ khách hàng hài lòng" },
    { year: "2024", event: "Mở chi nhánh thứ 2" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Về Chúng Tôi
            </h1>
            <p className="text-gray-600 text-lg">
              Câu chuyện về tình yêu với hoa và niềm đam mê sáng tạo
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800"
                  alt="Emily Flower Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-rose-100 rounded-3xl -z-10"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Emily Flower được thành lập vào năm 2020 với mong muốn mang
                  đến những món quà tình yêu bền vững và độc đáo. Khác với hoa
                  tươi chỉ đẹp trong vài ngày, hoa sáp thơm của chúng tôi giữ
                  được vẻ đẹp lâu dài, như tình yêu thương ta muốn gửi gắm.
                </p>
                <p>
                  Mỗi sản phẩm tại Emily Flower đều được chế tác thủ công bởi
                  những nghệ nhân tài hoa với nhiều năm kinh nghiệm. Chúng tôi
                  sử dụng sáp cao cấp nhập khẩu từ Hàn Quốc và tinh dầu thơm tự
                  nhiên để tạo nên những bông hoa vừa đẹp mắt vừa thơm nhẹ
                  nhàng.
                </p>
                <p>
                  Không chỉ là những bông hoa, chúng tôi tạo nên những kỷ niệm
                  đáng nhớ cho từng dịp đặc biệt trong cuộc sống của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-gray-600">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-gray-600">
              Từng bước một xây dựng và phát triển
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-rose-200"></div>

              {/* Timeline items */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className="w-16 flex-shrink-0">
                      <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="flex-1 pt-4">
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <p className="text-lg text-gray-800">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-gray-600">
              Những người đam mê và tài năng đằng sau mỗi sản phẩm
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-rose-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-rose-400 to-pink-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Hãy Để Chúng Tôi Tạo Nên <br />
            Khoảnh Khắc Đặc Biệt Cho Bạn
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn và đặt hàng
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-rose-400 rounded-full hover:bg-gray-100 transition-colors font-medium uppercase tracking-wider"
          >
            Liên hệ ngay
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
