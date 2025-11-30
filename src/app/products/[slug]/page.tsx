"use client";

import { useState, useEffect, use } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  tag?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.slug]);

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();
      const found = products.find(
        (p: Product) => p.slug === resolvedParams.slug
      );

      if (!found) {
        notFound();
      }

      setProduct(found);
      setSelectedImage(found.image);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const allImages = product
    ? [product.image, ...product.images.filter((img) => img !== product.image)]
    : [];

  const discountPercent =
    product?.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20 sm:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-rose-400 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-rose-400 transition-colors"
            >
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">
              {product.name}
            </span>
          </div>

          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại danh sách</span>
          </Link>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span
                    className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                      product.tag === "Mới"
                        ? "bg-green-500 text-white"
                        : product.tag === "Bán chạy"
                        ? "bg-rose-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? "border-rose-400 shadow-md scale-105"
                          : "border-gray-200 hover:border-rose-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                {/* Category */}
                <p className="text-sm text-rose-400 font-medium mb-2">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({product.reviews} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-rose-400">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Tiết kiệm {discountPercent}% cho sản phẩm này
                    </p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Mô tả sản phẩm:
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Số lượng:
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.inStock ? (
                        <span className="text-green-600 font-medium">
                          Còn hàng
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Hết hàng
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                      addedToCart
                        ? "bg-green-500"
                        : product.inStock
                        ? "bg-rose-400 hover:bg-rose-500 shadow-lg hover:shadow-xl"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Đã thêm vào giỏ
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Thêm vào giỏ hàng
                      </>
                    )}
                  </button>
                  <button
                    className="p-4 border-2 border-rose-400 text-rose-400 rounded-xl hover:bg-rose-50 transition-colors"
                    aria-label="Thêm vào yêu thích"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3 bg-rose-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        Miễn phí vận chuyển
                      </p>
                      <p className="text-xs text-gray-600">
                        Giao hàng toàn quốc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        Đổi trả trong 7 ngày
                      </p>
                      <p className="text-xs text-gray-600">Nếu sản phẩm lỗi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        Handmade 100%
                      </p>
                      <p className="text-xs text-gray-600">
                        Được làm thủ công tỉ mỉ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
