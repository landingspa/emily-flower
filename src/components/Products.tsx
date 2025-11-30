import { ShoppingCart } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Hoa Hồng Sáp Thơm",
      price: "299.000₫",
      image: "/images/rose-wax.jpg",
      badge: "Mới",
      badgeColor: "bg-rose-400",
    },
    {
      id: 2,
      name: "Gấu Bông Hoa Hồng",
      price: "450.000₫",
      image: "/images/rose-bear.jpg",
      badge: null,
      badgeColor: "",
    },
    {
      id: 3,
      name: "Hoa Tulip Sáp",
      price: "249.000₫",
      image: "/images/tulip-wax.jpg",
      badge: "Sale",
      badgeColor: "bg-red-500",
    },
    {
      id: 4,
      name: "Hoa Cẩm Chướng Sáp",
      price: "199.000₫",
      image: "/images/carnation-wax.jpg",
      badge: null,
      badgeColor: "",
    },
    {
      id: 5,
      name: "Gấu Bông Hoa Mix",
      price: "550.000₫",
      image: "/images/mixed-bear.jpg",
      badge: "Hot",
      badgeColor: "bg-orange-500",
    },
    {
      id: 6,
      name: "Bó Hoa Sáp Vintage",
      price: "399.000₫",
      image: "/images/vintage-bouquet.jpg",
      badge: null,
      badgeColor: "",
    },
  ];

  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50"
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
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10`}
                  >
                    {product.badge}
                  </span>
                )}
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-24 h-24 mx-auto text-rose-300 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    <p className="text-gray-400 text-sm mt-2">{product.name}</p>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif text-gray-800 mb-2 uppercase tracking-wide">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-400">
                    {product.price}
                  </span>
                  <button
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
          <a
            href="#shop"
            className="inline-block px-8 py-4 border-2 border-rose-400 text-rose-400 rounded-full hover:bg-rose-400 hover:text-white transition-all transform hover:scale-105 uppercase text-sm tracking-wider font-medium"
          >
            Xem tất cả sản phẩm
          </a>
        </div>
      </div>
    </section>
  );
}
