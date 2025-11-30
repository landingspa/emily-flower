"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import MultipleImageUpload from "@/components/MultipleImageUpload";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  LogOut,
  Package,
  BarChart,
  Users,
  Settings,
  X,
  Save,
  Flower2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  tag?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "Hoa sáp",
    image: "",
    images: [] as string[],
    tag: "",
    rating: 5,
    reviews: 0,
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-") // Replace multiple - with single -
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.image) {
      alert("Vui lòng upload ảnh sản phẩm");
      return;
    }

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      // Prepare data
      const dataToSend = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        price: Number(formData.price),
        originalPrice:
          formData.originalPrice > 0 ? Number(formData.originalPrice) : null,
        category: formData.category,
        image: formData.image,
        images: formData.images.length > 0 ? formData.images : undefined,
        tag: formData.tag || null,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        inStock: formData.inStock,
        featured: formData.featured,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        fetchProducts();
        setShowModal(false);
        resetForm();
        alert(
          editingProduct
            ? "Cập nhật sản phẩm thành công!"
            : "Thêm sản phẩm thành công!"
        );
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        alert(error.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      } else {
        const error = await response.json();
        alert(error.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      image: product.image,
      images: product.images || [],
      tag: product.tag || "",
      rating: product.rating,
      reviews: product.reviews,
      inStock: product.inStock,
      featured: product.featured,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: 0,
      originalPrice: 0,
      category: "Hoa sáp",
      image: "",
      images: [],
      tag: "",
      rating: 5,
      reviews: 0,
      inStock: true,
      featured: false,
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Flower2 className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
              <div>
                <h1 className="text-lg sm:text-2xl font-serif text-gray-800">
                  Admin Panel
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Emily Flower CMS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-800">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600">
                  Tổng sản phẩm
                </p>
                <p className="text-xl sm:text-3xl font-bold text-gray-800">
                  {products.length}
                </p>
              </div>
              <Package className="w-8 h-8 sm:w-12 sm:h-12 text-rose-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600">Nổi bật</p>
                <p className="text-xl sm:text-3xl font-bold text-gray-800">
                  {products.filter((p) => p.featured).length}
                </p>
              </div>
              <BarChart className="w-8 h-8 sm:w-12 sm:h-12 text-amber-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600">Còn hàng</p>
                <p className="text-xl sm:text-3xl font-bold text-gray-800">
                  {products.filter((p) => p.inStock).length}
                </p>
              </div>
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600">Hết hàng</p>
                <p className="text-xl sm:text-3xl font-bold text-gray-800">
                  {products.filter((p) => !p.inStock).length}
                </p>
              </div>
              <Settings className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-3 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Quản lý sản phẩm
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors text-sm w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Thêm sản phẩm
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{product.slug}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-800">
                        {product.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "Còn hàng" : "Hết hàng"}
                      </span>
                      {product.featured && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800">
                          Nổi bật
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.price.toLocaleString()}đ
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}đ
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.price.toLocaleString()}đ
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()}đ
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "Còn hàng" : "Hết hàng"}
                        </span>
                        {product.featured && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                            Nổi bật
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({
                        ...formData,
                        name,
                        slug: generateSlug(name),
                      });
                    }}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-gray-50"
                    placeholder="Tu dong tao tu ten san pham"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá *
                  </label>
                  <input
                    type="number"
                    required
                    step="1000"
                    placeholder="VD: 450000"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Đơn vị: VNĐ</p>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá gốc
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="VD: 550000"
                    value={formData.originalPrice || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white"
                  >
                    <option value="Hoa sáp">Hoa sáp</option>
                    <option value="Gấu bông hoa">Gấu bông hoa</option>
                    <option value="Hộp quà">Hộp quà</option>
                    <option value="Combo">Combo</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Không có</option>
                    <option value="Mới">Mới</option>
                    <option value="Bán chạy">Bán chạy</option>
                    <option value="Giảm giá">Giảm giá</option>
                    <option value="Hot">Hot</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Hình ảnh chính"
                    required
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <MultipleImageUpload
                    values={formData.images}
                    onChange={(urls) =>
                      setFormData({ ...formData, images: urls })
                    }
                    label="Thư viện ảnh phụ"
                    maxImages={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượt đánh giá
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1 flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) =>
                        setFormData({ ...formData, inStock: e.target.checked })
                      }
                      className="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-400"
                    />
                    <span className="text-sm text-gray-700">Còn hàng</span>
                  </label>
                </div>
                <div className="col-span-1 sm:col-span-1 flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-400"
                    />
                    <span className="text-sm text-gray-700">Nổi bật</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-colors text-sm sm:text-base font-medium"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  {editingProduct ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
