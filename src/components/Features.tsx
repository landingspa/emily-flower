import { Heart, Gift, Sparkles } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Heart,
      title: "Làm bằng tình yêu",
      description: "Mỗi bông hoa được làm thủ công với tình yêu và sự tỉ mỉ",
    },
    {
      icon: Gift,
      title: "Quà tặng độc đáo",
      description: "Thiết kế riêng biệt, không trùng lặp cho người thân yêu",
    },
    {
      icon: Sparkles,
      title: "Chọn lựa kỹ càng",
      description: "Nguyên liệu cao cấp, hương thơm tự nhiên lâu phai",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-rose-50 rounded-full mb-6 group-hover:bg-rose-100 transition-colors">
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-rose-400" />
              </div>

              {/* Decorative flower icon */}
              <div className="flex justify-center mb-4">
                <svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  className="text-rose-300"
                >
                  <path
                    fill="currentColor"
                    d="M20,10 Q15,5 10,10 Q15,15 20,10 Z M20,10 Q25,5 30,10 Q25,15 20,10 Z"
                  />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
