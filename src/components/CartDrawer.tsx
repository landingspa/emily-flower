"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isOpen,
    closeCart,
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    setShowCheckout(true);
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-rose-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-400 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Giỏ hàng
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {items.length} sản phẩm
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Giỏ hàng trống
              </h3>
              <p className="text-gray-600 mb-6">
                Thêm sản phẩm để bắt đầu mua sắm
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="px-6 py-3 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors font-medium"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="block"
                    >
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base line-clamp-2 hover:text-rose-400 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2">
                      {item.category}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-rose-400">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1.5 bg-white rounded-lg hover:bg-rose-50 transition-colors border border-gray-200"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1.5 bg-white rounded-lg hover:bg-rose-50 transition-colors border border-gray-200"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 sm:p-6 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4 text-sm sm:text-base">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-semibold text-gray-800">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm sm:text-base">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>
            <div className="h-px bg-gray-200 mb-4"></div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-gray-800 text-base sm:text-lg">
                Tổng cộng:
              </span>
              <span className="font-bold text-rose-400 text-xl sm:text-2xl">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 sm:py-4 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl mb-3"
            >
              Thanh toán ngay
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 sm:py-4 bg-white text-rose-400 border-2 border-rose-400 rounded-full hover:bg-rose-50 transition-colors font-semibold text-sm sm:text-base"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  );
}
