"use client";

import { Sparkles, Heart, Gift } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gradient-to-br from-rose-100 via-pink-50 to-purple-50">
          {/* Animated floating elements */}
          <div className="absolute top-20 right-10 w-32 h-32 md:w-72 md:h-72 opacity-30 animate-float">
            <svg viewBox="0 0 200 200" className="text-rose-400">
              <path
                fill="currentColor"
                d="M100,20 Q140,40 150,80 Q160,120 140,150 Q120,170 100,180 Q80,170 60,150 Q40,120 50,80 Q60,40 100,20 Z"
              />
            </svg>
          </div>
          <div className="absolute top-40 left-16 w-20 h-20 md:w-40 md:h-40 opacity-20 animate-float-delayed">
            <svg viewBox="0 0 200 200" className="text-pink-400">
              <circle cx="100" cy="100" r="80" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-32 right-32 w-24 h-24 md:w-56 md:h-56 opacity-25 animate-float-slow">
            <svg viewBox="0 0 200 200" className="text-purple-300">
              <path
                fill="currentColor"
                d="M100,30 L120,90 L180,100 L120,110 L100,170 L80,110 L20,100 L80,90 Z"
              />
            </svg>
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg mb-6 md:mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Handmade với tình yêu thương ❤️
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-gray-800 mb-6 md:mb-8 leading-tight animate-slide-up">
              Chia sẻ một{" "}
              <span className="relative inline-block">
                <span className="text-rose-400">bông hoa</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-rose-400"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              là chia sẻ{" "}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 animate-gradient">
                hạnh phúc
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
              Hoa sáp thơm & Gấu bông hoa handmade
              <br className="hidden sm:block" />
              <span className="text-rose-400 font-medium">
                Món quà tình yêu bền vững
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12 animate-fade-in-delayed-2">
              <a
                href="/products"
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all transform hover:scale-105 uppercase text-sm tracking-wider font-medium shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" />
                  Xem sản phẩm
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="/about"
                className="group w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-rose-400 text-rose-400 rounded-full hover:bg-rose-400 hover:text-white transition-all transform hover:scale-105 uppercase text-sm tracking-wider font-medium shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Tìm hiểu thêm
                </span>
              </a>
            </div>

            {/* Features/Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-10 animate-fade-in-delayed-3">
              <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-rose-400 mb-1">
                  10K+
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Khách hàng
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-rose-400 mb-1">
                  100%
                </div>
                <div className="text-xs md:text-sm text-gray-600">Handmade</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-rose-400 mb-1">
                  4.9★
                </div>
                <div className="text-xs md:text-sm text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in 0.6s ease-out 0.4s both;
        }

        .animate-fade-in-delayed-3 {
          animation: fade-in 0.6s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
