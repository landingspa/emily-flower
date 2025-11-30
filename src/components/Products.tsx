"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  tag?: string;
  featured: boolean;
}

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      // Filter featured products and take first 6
      const featuredProducts = data
        .filter((p: Product) => p.featured)
        .slice(0, 6);
      setProducts(featuredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTagColor = (tag?: string) => {
    switch (tag) {
      case "Mới":
        return "bg-rose-400";
      case "Hot":
        return "bg-orange-500";
      case "Bán chạy":
        return "bg-green-500";
      case "Giảm giá":
        return "bg-red-500";
      default:
        return "bg-rose-400";
    }
  };

  if (loading) {
    return (
      <section
        id="products"
        className="py-16 md:py-24 bg-linear-to-b from-white to-rose-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-linear-to-b from-white to-rose-50"
    >
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
            Sản phẩm của chúng tôi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hoa sáp thơm và gấu bông hoa handmade - Món quà ý nghĩa cho mọi dịp
          </p>
        </div>

        {/* Quote */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xl md:text-2xl italic text-gray-600 font-serif max-w-3xl mx-auto">
            "Mỗi sản phẩm đều được chế tác tỉ mỉ, mang đến vẻ đẹp vĩnh cửu và
            hương thơm dịu nhẹ."
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer">
                  {product.tag && (
                    <span
                      className={`absolute top-4 left-4 ${getTagColor(
                        product.tag
                      )} text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10`}
                    >
                      {product.tag}
                    </span>
                  )}
                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23fce7f3'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ec4899' font-family='Arial' font-size='20'%3EEmily Flower%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xl font-serif text-gray-800 mb-2 uppercase tracking-wide hover:text-rose-400 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-400">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        image: product.image,
                        category: "Sản phẩm nổi bật",
                      })
                    }
                    className="flex items-center gap-2 bg-rose-400 text-white px-4 py-2 rounded-full hover:bg-rose-500 transition-colors transform hover:scale-105"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">Thêm</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block px-8 py-4 border-2 border-rose-400 text-rose-400 rounded-full hover:bg-rose-400 hover:text-white transition-all transform hover:scale-105 uppercase text-sm tracking-wider font-medium"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
