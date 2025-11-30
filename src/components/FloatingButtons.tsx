"use client";

import { useState } from "react";
import Image from "next/image";

export default function FloatingButtons() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Buttons */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
          isExpanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Zalo Button */}
        <a
          href="https://zalo.me/YOUR_ZALO_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-16 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat qua Zalo
          </span>
          <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
            <Image
              src="/zalo.png"
              alt="Zalo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </a>

        {/* Facebook Messenger Button */}
        <a
          href="https://m.me/YOUR_FACEBOOK_PAGE_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-16 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat qua Messenger
          </span>
          <div className="w-14 h-14 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
            </svg>
          </div>
        </a>

        {/* Phone Button */}
        <a
          href="tel:0123456789"
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-16 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Gọi điện ngay
          </span>
          <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
        </a>
      </div>
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(251, 113, 133, 0.7);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(251, 113, 133, 0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}
