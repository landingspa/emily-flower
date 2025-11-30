"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { X, Truck, CreditCard, CheckCircle } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tạo nội dung đơn hàng
      const orderDetails = items
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} - SL: ${
              item.quantity
            } - Giá: ${item.price.toLocaleString("vi-VN")}đ`
        )
        .join("\n");

      const message = `
Thông tin đặt hàng:

Khách hàng: ${formData.name}
Số điện thoại: ${formData.phone}
Email: ${formData.email}
Địa chỉ giao hàng: ${formData.address}
${formData.note ? `Ghi chú: ${formData.note}` : ""}

Phương thức thanh toán: ${
        formData.paymentMethod === "cod"
          ? "COD - Thanh toán khi nhận hàng"
          : "Chuyển khoản ngân hàng"
      }

Chi tiết đơn hàng:
${orderDetails}

Tổng tiền: ${totalPrice.toLocaleString("vi-VN")}đ
Phí vận chuyển: Miễn phí
Thành tiền: ${totalPrice.toLocaleString("vi-VN")}đ
      `.trim();

      // Gửi email
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: message,
          subject: `🌸 Đơn hàng mới từ ${formData.name}`,
          companyName: "Emily Flower",
          serviceName: "đặt hàng hoa sáp thơm",
        }),
      });

      if (response.ok) {
        setStep(3);
        // Xóa giỏ hàng sau 2 giây
        setTimeout(() => {
          clearCart();
        }, 2000);
      } else {
        alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 3) {
      setStep(1);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: "",
        paymentMethod: "cod",
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white z-50 rounded-2xl shadow-2xl mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {step === 1
                ? "Thông tin giao hàng"
                : step === 2
                ? "Phương thức thanh toán"
                : "Đặt hàng thành công"}
            </h2>
            {step !== 3 && (
              <p className="text-sm text-gray-600 mt-1">
                Bước {step}/2 - Vui lòng điền đầy đủ thông tin
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Đóng"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                      placeholder="0389789000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none resize-none"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú đơn hàng (tùy chọn)
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none resize-none"
                    placeholder="Ghi chú về đơn hàng, ví dụ: giao giờ hành chính..."
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-rose-50 rounded-xl p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Tóm tắt đơn hàng
                  </h3>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-rose-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600 font-medium">
                        Miễn phí
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
                      <span>Tổng cộng:</span>
                      <span className="text-rose-400">
                        {totalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Truck className="w-5 h-5" />
                Tiếp tục
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Chọn phương thức thanh toán
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-rose-400 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-rose-400" />
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-rose-400 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-rose-400" />
                          Chuyển khoản ngân hàng
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Chuyển khoản trước, giao hàng sau
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "bank" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Thông tin chuyển khoản:
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Ngân hàng:</strong> Vietcombank
                      </p>
                      <p>
                        <strong>Số tài khoản:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Chủ tài khoản:</strong> EMILY FLOWER
                      </p>
                      <p>
                        <strong>Nội dung:</strong> {formData.name}{" "}
                        {formData.phone}
                      </p>
                    </div>
                  </div>
                )}

                {/* Review Order */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Xác nhận đơn hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Người nhận:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số điện thoại:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <p className="text-gray-600 mb-1">Địa chỉ:</p>
                      <p className="font-medium">{formData.address}</p>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Tổng thanh toán:</span>
                        <span className="text-rose-400">
                          {totalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-rose-400 hover:bg-rose-500 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Đặt hàng
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Đặt hàng thành công!
              </h3>
              <p className="text-gray-600 mb-2">
                Cảm ơn bạn đã đặt hàng tại Emily Flower
              </p>
              <p className="text-gray-600 mb-6">
                Chúng tôi đã gửi email xác nhận đến{" "}
                <strong>{formData.email}</strong>
              </p>
              <div className="bg-rose-50 rounded-xl p-6 mb-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Thông tin đơn hàng:
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Người nhận:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {formData.address}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    <span className="text-rose-400 font-bold">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </p>
                  <p>
                    <strong>Thanh toán:</strong>{" "}
                    {formData.paymentMethod === "cod"
                      ? "COD - Thanh toán khi nhận hàng"
                      : "Chuyển khoản ngân hàng"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-4 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors font-semibold"
              >
                Hoàn tất
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
