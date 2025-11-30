"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, ShoppingCart, Heart, Star } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("default");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Tất cả", "Hoa sáp", "Gấu bông hoa", "Hộp quà", "Combo"];

  const sortOptions = [
    { value: "default", label: "Mặc định" },
    { value: "price-asc", label: "Giá thấp đến cao" },
    { value: "price-desc", label: "Giá cao đến thấp" },
    { value: "name", label: "Tên A-Z" },
  ];

  const products = [
    {
      id: 1,
      name: "Hoa hồng sáp hộp tim",
      category: "Hoa sáp",
      price: "450.000đ",
      originalPrice: "550.000đ",
      image:
        "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=500",
      tag: "Bán chạy",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Gấu bông hoa hồng đỏ",
      category: "Gấu bông hoa",
      price: "650.000đ",
      image:
        "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500",
      tag: "Mới",
      rating: 5.0,
      reviews: 89,
    },
    {
      id: 3,
      name: "Hộp hoa sáp sang trọng",
      category: "Hộp quà",
      price: "850.000đ",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 4,
      name: "Combo hoa sáp + Gấu",
      category: "Combo",
      price: "990.000đ",
      originalPrice: "1.200.000đ",
      image:
        "https://images.unsplash.com/photo-1522057306606-0db9e3883cfc?w=500",
      tag: "Giảm giá",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 5,
      name: "Hoa tulip sáp thơm",
      category: "Hoa sáp",
      price: "380.000đ",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      rating: 4.6,
      reviews: 92,
    },
    {
      id: 6,
      name: "Gấu bông hoa baby",
      category: "Gấu bông hoa",
      price: "550.000đ",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
      rating: 4.8,
      reviews: 78,
    },
    {
      id: 7,
      name: "Hoa sáp để bàn mini",
      category: "Hoa sáp",
      price: "280.000đ",
      image:
        "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500",
      rating: 4.5,
      reviews: 103,
    },
    {
      id: 8,
      name: "Hộp hoa sáp trái tim",
      category: "Hộp quà",
      price: "720.000đ",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
      rating: 4.9,
      reviews: 142,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
        );
      case "price-desc":
        return (
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, ""))
        );
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Sản Phẩm Của Chúng Tôi
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Khám phá bộ sưu tập hoa sáp thơm và gấu bông hoa handmade độc đáo
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{filteredProducts.length} sản phẩm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-6 md:py-8 bg-white sticky top-16 md:top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search & Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:border-rose-400 transition-colors bg-white w-full sm:w-auto justify-center"
                >
                  <Filter className="w-5 h-5" />
                  <span className="whitespace-nowrap">
                    {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                      "Sắp xếp"}
                  </span>
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-rose-50 transition-colors ${
                          sortBy === option.value
                            ? "text-rose-400 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full transition-all text-sm md:text-base ${
                    category === selectedCategory
                      ? "bg-rose-400 text-white shadow-md scale-105"
                      : "bg-white text-gray-700 hover:bg-rose-50 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Hiển thị{" "}
                  <span className="font-semibold text-gray-800">
                    {sortedProducts.length}
                  </span>{" "}
                  sản phẩm
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.tag && (
                        <span
                          className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs md:text-sm font-medium shadow-lg ${
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
                      <button
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-5 h-5 text-rose-400" />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                        <button className="bg-white text-rose-400 px-6 py-2.5 rounded-full font-medium hover:bg-rose-400 hover:text-white transition-colors text-sm md:text-base">
                          Xem chi tiết
                        </button>
                        <button className="bg-rose-400 text-white px-6 py-2.5 rounded-full font-medium hover:bg-rose-500 transition-colors flex items-center gap-2 text-sm md:text-base">
                          <ShoppingCart className="w-4 h-4" />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <p className="text-xs md:text-sm text-gray-500 mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          ({product.reviews} đánh giá)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg md:text-xl font-bold text-rose-400">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="p-2 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors group/cart">
                          <ShoppingCart className="w-5 h-5 text-rose-400 group-hover/cart:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors font-medium uppercase tracking-wider shadow-lg hover:shadow-xl">
                  Xem thêm sản phẩm
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
