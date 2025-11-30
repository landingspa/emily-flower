"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, UserPlus, Flower2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Email hoặc mật khẩu không đúng");
        } else {
          router.push("/admin");
          router.refresh();
        }
      } else {
        // Register
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Đăng ký thất bại");
        } else {
          // Auto login after register
          const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (result?.error) {
            setError("Đăng ký thành công nhưng đăng nhập thất bại");
          } else {
            router.push("/admin");
            router.refresh();
          }
        }
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Flower2 className="w-10 h-10 text-rose-400" />
            <span className="text-3xl font-serif text-gray-800">
              Emily Flower
            </span>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Chào mừng bạn trở lại" : "Tạo tài khoản mới để bắt đầu"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (only for register) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition"
                placeholder="email@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Mật khẩu phải có ít nhất 6 ký tự
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-400 text-white py-3 rounded-lg font-medium hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Đăng nhập
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Đăng ký
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Toggle between login/register */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({ name: "", email: "", password: "" });
              }}
              className="text-rose-400 hover:text-rose-500 font-medium"
            >
              {isLogin
                ? "Chưa có tài khoản? Đăng ký ngay"
                : "Đã có tài khoản? Đăng nhập"}
            </button>
          </div>

          {/* Back to home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
