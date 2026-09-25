"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Users,
  Settings,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Bell,
  Save,
  ChevronRight,
  Filter,
  Sparkles,
  Lock,
  Bot,
  Image as ImageIcon
} from "lucide-react";
import productsDataRaw from "@/data/products.json";
import suppliersDataRaw from "@/data/suppliers.json";
import { Product, Category, Supplier } from "@/lib/types";

import { useStoreSettings } from "@/lib/store-settings-context";
import { useCategories } from "@/lib/categories-context";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: { productName: string; quantity: number; price: number; supplierName?: string }[];
  totalAmount: number;
  paymentMethod: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-8941",
    customerName: "Nusrat Jahan",
    customerPhone: "+880 1712-345678",
    customerAddress: "House 14, Road 5, Dhanmondi, Dhaka",
    items: [{ productName: "Rose Gold Elegance Watch", quantity: 1, price: 4500, supplierName: "Royal Rose Fine Jewelry BD" }],
    totalAmount: 4560,
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    date: "2026-08-19 14:32",
  },
  {
    id: "ORD-8940",
    customerName: "Sabrina Islam",
    customerPhone: "+880 1823-987654",
    customerAddress: "Flat 4A, Banani, Dhaka",
    items: [{ productName: "Luxe Leather Tote Bag", quantity: 1, price: 5800, supplierName: "Luxe Leather Crafts" }],
    totalAmount: 5860,
    paymentMethod: "bKash (Prepaid)",
    status: "Processing",
    date: "2026-08-19 11:15",
  },
  {
    id: "ORD-8939",
    customerName: "Farhana Ahmed",
    customerPhone: "+880 1934-567890",
    customerAddress: "GEC Circle, Chattogram",
    items: [
      { productName: "Velvet Matte Lipstick Set", quantity: 1, price: 1800, supplierName: "Velvet Beauty Cosmetics Importers" },
      { productName: "Pearl Drop Earrings", quantity: 1, price: 2200, supplierName: "Royal Rose Fine Jewelry BD" },
    ],
    totalAmount: 4120,
    paymentMethod: "Cash on Delivery",
    status: "Shipped",
    date: "2026-08-18 16:45",
  }
];

export default function AdminDashboard() {
  const { settings, updateSettings } = useStoreSettings();
  const { categories: categoriesList, addCategory, deleteCategory } = useCategories();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("an_admin_authenticated") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "categories" | "suppliers" | "ai" | "settings">("dashboard");
  const [productsList, setProductsList] = useState<Product[]>(productsDataRaw as unknown as Product[]);
  const [suppliersList, setSuppliersList] = useState<Supplier[]>(() => {
    if (typeof window === "undefined") return suppliersDataRaw as unknown as Supplier[];
    try {
      const savedSuppliers = localStorage.getItem("an_suppliers_data");
      return savedSuppliers ? JSON.parse(savedSuppliers) : (suppliersDataRaw as unknown as Supplier[]);
    } catch (e) {
      return suppliersDataRaw as unknown as Supplier[];
    }
  });
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const saveSuppliersToStorage = (newList: Supplier[]) => {
    setSuppliersList(newList);
    try {
      localStorage.setItem("an_suppliers_data", JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    const trimmed = passwordInput.trim();
    if (trimmed === "2OOO742OOO77" || trimmed === "200074200077" || trimmed.toUpperCase() === "2OOO742OOO77") {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("an_admin_authenticated", "true");
      } catch (e) {}
      showToast("Welcome to Admin Portal!");
    } else {
      setPasswordError("Incorrect security password. Access denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("an_admin_authenticated");
    } catch (e) {}
    setPasswordInput("");
    showToast("Signed out of Admin Dashboard.");
  };

  // Store settings form state
  const [shopNameInput, setShopNameInput] = useState(settings.shopName);
  const [shopTaglineInput, setShopTaglineInput] = useState(settings.shopTagline);
  const [hotlineInput, setHotlineInput] = useState(settings.hotline);
  const [announcementInput, setAnnouncementInput] = useState(settings.announcement);
  const [supportEmailInput, setSupportEmailInput] = useState(settings.supportEmail);
  const [currencySymbolInput, setCurrencySymbolInput] = useState(settings.currencySymbol);

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics & Gadgets",
    categorySlug: "electronics",
    price: 0,
    originalPrice: 0,
    imageUrl: "",
    shortDescription: "",
    stockCount: 10,
    sku: "",
    supplierId: suppliersList[0]?.id || "sup-101",
  });

  // New Category Form State
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  // New Supplier Form State
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    commissionRate: 5,
  });

  const showToast = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopNameInput.trim()) {
      alert("Shop name cannot be empty.");
      return;
    }

    updateSettings({
      shopName: shopNameInput.trim(),
      shopTagline: shopTaglineInput.trim(),
      hotline: hotlineInput.trim(),
      announcement: announcementInput.trim(),
      supportEmail: supportEmailInput.trim(),
      currencySymbol: currencySymbolInput.trim(),
    });

    showToast(`Store settings updated! Shop name changed to "${shopNameInput.trim()}"`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }

    const selectedSup = suppliersList.find((s) => s.id === newProduct.supplierId);
    const prodId = `prod-${Date.now()}`;
    const generatedSku = newProduct.sku || `ANC-NEW-${Math.floor(Math.random() * 1000)}`;

    const created: Product = {
      id: prodId,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newProduct.shortDescription || "Premium quality product.",
      shortDescription: newProduct.shortDescription || newProduct.name,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      discount: newProduct.originalPrice > newProduct.price ? Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100) : 0,
      currency: settings.currencySymbol,
      images: [newProduct.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"],
      category: newProduct.category,
      categorySlug: newProduct.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand: settings.shopName,
      rating: 5.0,
      reviewCount: 1,
      inStock: newProduct.stockCount > 0,
      stockCount: Number(newProduct.stockCount),
      colors: [{ name: "Standard", hex: "#1C1C1C" }],
      sizes: ["Standard"],
      tags: ["new", "trendy"],
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      isFlashSale: false,
      sku: generatedSku,
      specifications: { Quality: "Verified Authentic" },
      supplierId: selectedSup?.id,
      supplierName: selectedSup?.name,
      seller: selectedSup ? {
        name: selectedSup.name,
        rating: selectedSup.rating,
        productsCount: selectedSup.activeProductsCount + 1,
        verified: selectedSup.isVerified,
        responseRate: "99%",
        phone: selectedSup.phone,
      } : undefined,
    };

    setProductsList([created, ...productsList]);
    setShowAddProductModal(false);
    showToast(`New product "${created.name}" assigned to ${selectedSup?.name || "Merchant"} & published!`);
    setNewProduct({ name: "", category: "Electronics & Gadgets", categorySlug: "electronics", price: 0, originalPrice: 0, imageUrl: "", shortDescription: "", stockCount: 10, sku: "", supplierId: suppliersList[0]?.id || "sup-101" });
  };

  const handleAddSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.phone) {
      alert("Please enter supplier business name and phone number.");
      return;
    }
    const supId = `sup-${Date.now()}`;
    const createdSup: Supplier = {
      id: supId,
      name: newSupplier.name,
      contactPerson: newSupplier.contactPerson || "Merchant Manager",
      phone: newSupplier.phone,
      email: newSupplier.email || "contact@supplier.com",
      address: newSupplier.address || "Dhaka, Bangladesh",
      rating: 5.0,
      commissionRate: Number(newSupplier.commissionRate) || 5,
      isVerified: true,
      status: "Active",
      activeProductsCount: 0,
    };

    const updatedList = [createdSup, ...suppliersList];
    saveSuppliersToStorage(updatedList);
    setShowAddSupplierModal(false);
    showToast(`New Supplier "${createdSup.name}" registered!`);
    setNewSupplier({ name: "", contactPerson: "", phone: "", email: "", address: "", commissionRate: 5 });
  };

  const handleDeleteSupplier = (supplierId: string) => {
    if (confirm("Are you sure you want to remove this supplier?")) {
      const updated = suppliersList.filter((s) => s.id !== supplierId);
      saveSuppliersToStorage(updated);
      showToast("Supplier removed.");
    }
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProductsList((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setShowEditProductModal(false);
    showToast(`Product "${editingProduct.name}" updated successfully!`);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    const createdCat = addCategory({
      name: newCategory.name.trim(),
      slug: newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newCategory.description || "Boutique & Marketplace collection",
      image: newCategory.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      icon: "Grid",
    });

    setShowAddCategoryModal(false);
    showToast(`New Category "${createdCat.name}" created and saved!`);
    setNewCategory({ name: "", description: "", image: "" });
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
      showToast("Product deleted.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 text-stone-100">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-extrabold text-white">
              {settings.shopName} <span className="text-amber-500 italic text-sm">ADMIN</span>
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Restricted Portal. Enter security passcode to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              {passwordError && (
                <div className="text-xs text-rose-400 font-semibold mt-1.5 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg hover:scale-[1.02]"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="pt-4 border-t border-stone-800 text-xs">
            <Link href="/" className="text-stone-400 hover:text-amber-400 font-semibold flex items-center justify-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-stone-100 text-stone-900">
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm font-bold animate-bounce border border-amber-500/30">
          <CheckCircle className="w-5 h-5 text-amber-400" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-stone-950 text-stone-300 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <span className="font-serif text-xl font-extrabold text-white">
              {settings.shopName} <span className="text-amber-500 italic text-xs">ADMIN</span>
            </span>
          </Link>

          <nav className="space-y-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "dashboard" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "products" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products & Prices</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "orders" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders Fulfillment</span>
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "categories" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "suppliers" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Suppliers & Merchants</span>
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "ai" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant Control</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === "settings" ? "bg-amber-500 text-stone-950" : "hover:bg-stone-900 text-stone-400"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-stone-900 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            <span>Sign Out of Admin</span>
          </button>
          <Link href="/" className="flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-amber-400">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Products Management Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900">Manage Catalog Products & Prices</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 font-bold uppercase border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-6">Image</th>
                    <th className="py-3.5 px-6">Product Title</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Current Price</th>
                    <th className="py-3.5 px-6">Stock</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {productsList.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50">
                      <td className="py-3 px-6">
                        <img src={prod.images?.[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-stone-200" />
                      </td>
                      <td className="py-3 px-6 font-bold text-stone-900">{prod.name}</td>
                      <td className="py-3 px-6 font-medium text-stone-600">{prod.category}</td>
                      <td className="py-3 px-6 font-extrabold text-amber-700">{settings.currencySymbol}{prod.price}</td>
                      <td className="py-3 px-6 font-bold">{prod.stockCount} in stock</td>
                      <td className="py-3 px-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setShowEditProductModal(true);
                          }}
                          className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg font-bold text-xs"
                        >
                          Edit Price / Image
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Fulfillment Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Orders Fulfillment Center</h2>
                <p className="text-xs text-stone-500 mt-1">Review and process customer orders across Bangladesh.</p>
              </div>
              <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                {ordersList.length} Total Orders
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 font-bold uppercase border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-6">Order ID</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Delivery Address</th>
                    <th className="py-3.5 px-6">Payment</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {ordersList.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50">
                      <td className="py-4 px-6 font-bold text-amber-700">{order.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-stone-900">{order.customerName}</div>
                        <div className="text-[11px] text-stone-500">{order.customerPhone}</div>
                      </td>
                      <td className="py-4 px-6 max-w-xs text-stone-600">{order.customerAddress}</td>
                      <td className="py-4 px-6 font-semibold text-stone-700">{order.paymentMethod}</td>
                      <td className="py-4 px-6 font-extrabold text-stone-900">{settings.currencySymbol}{order.totalAmount}</td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order["status"])}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs border cursor-pointer outline-none ${
                            order.status === "Pending" ? "bg-amber-50 text-amber-800 border-amber-300" :
                            order.status === "Processing" ? "bg-blue-50 text-blue-800 border-blue-300" :
                            order.status === "Shipped" ? "bg-indigo-50 text-indigo-800 border-indigo-300" :
                            order.status === "Delivered" ? "bg-emerald-50 text-emerald-800 border-emerald-300" :
                            "bg-rose-50 text-rose-800 border-rose-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900">Marketplace Categories</h2>
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3 relative group">
                  <img src={cat.image} alt="" className="w-full h-32 object-cover rounded-xl" />
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-stone-900">{cat.name}</h3>
                    <button
                      onClick={() => {
                        if (confirm(`Remove category "${cat.name}"?`)) {
                          deleteCategory(cat.id);
                          showToast(`Category "${cat.name}" removed.`);
                        }
                      }}
                      className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suppliers Tab */}
        {activeTab === "suppliers" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Verified Suppliers & Merchants Center</h2>
                <p className="text-xs text-stone-500 mt-1">Manage wholesale vendors, importers, and official brand suppliers.</p>
              </div>
              <button
                onClick={() => setShowAddSupplierModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Supplier</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 font-bold uppercase border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-6">Supplier / Business</th>
                    <th className="py-3.5 px-6">Contact Person</th>
                    <th className="py-3.5 px-6">Phone / WhatsApp</th>
                    <th className="py-3.5 px-6">Address</th>
                    <th className="py-3.5 px-6">Rating</th>
                    <th className="py-3.5 px-6">Commission</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {suppliersList.map((sup) => (
                    <tr key={sup.id} className="hover:bg-stone-50">
                      <td className="py-4 px-6">
                        <div className="font-bold text-stone-900 flex items-center space-x-1.5">
                          <span>{sup.name}</span>
                          {sup.isVerified && (
                            <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500">{sup.email}</div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-stone-700">{sup.contactPerson}</td>
                      <td className="py-4 px-6 font-bold text-amber-700">{sup.phone}</td>
                      <td className="py-4 px-6 text-stone-600 max-w-xs">{sup.address}</td>
                      <td className="py-4 px-6 font-bold text-emerald-600">⭐ {sup.rating}</td>
                      <td className="py-4 px-6 font-bold text-stone-800">{sup.commissionRate}%</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteSupplier(sup.id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg"
                          title="Remove Supplier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Store Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <h2 className="text-xl font-bold text-stone-900 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-amber-600" />
                <span>Storefront & Brand Settings</span>
              </h2>
              <p className="text-xs text-stone-500">
                Change your shop name, tagline, hotline, announcement bar, support email, and currency.
              </p>
            </div>

            <form onSubmit={handleSaveStoreSettings} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopNameInput}
                    onChange={(e) => setShopNameInput(e.target.value)}
                    placeholder="e.g. AN TRENDY CLOSET"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Updates logo, titles, and headers across the entire website live.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Shop Tagline
                  </label>
                  <input
                    type="text"
                    value={shopTaglineInput}
                    onChange={(e) => setShopTaglineInput(e.target.value)}
                    placeholder="e.g. Premium Fashion & Tech Hub"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Displayed directly below the logo in the site header and mobile menu.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Hotline Phone Number
                  </label>
                  <input
                    type="text"
                    value={hotlineInput}
                    onChange={(e) => setHotlineInput(e.target.value)}
                    placeholder="e.g. +880 1700-000000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmailInput}
                    onChange={(e) => setSupportEmailInput(e.target.value)}
                    placeholder="e.g. support@antrendycloset.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Top Announcement Bar Text
                  </label>
                  <input
                    type="text"
                    value={announcementInput}
                    onChange={(e) => setAnnouncementInput(e.target.value)}
                    placeholder="e.g. AN Marketplace Hub — Verified Sellers BD"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={currencySymbolInput}
                    onChange={(e) => setCurrencySymbolInput(e.target.value)}
                    placeholder="e.g. ৳ or $"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-extrabold text-amber-700 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-8 py-3.5 rounded-xl text-sm flex items-center space-x-2 shadow-lg transition-transform hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dashboard Overview Default */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-extrabold text-stone-900">Admin Control Center</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase">Total Products</div>
                <div className="text-3xl font-extrabold text-stone-900 mt-2">{productsList.length}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase">Categories</div>
                <div className="text-3xl font-extrabold text-amber-600 mt-2">{categoriesList.length}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-bold uppercase">Orders Pending</div>
                <div className="text-3xl font-extrabold text-emerald-600 mt-2">{ordersList.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant Control Tab */}
        {activeTab === "ai" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-extrabold text-stone-900 flex items-center space-x-2">
                  <Bot className="w-7 h-7 text-amber-600" />
                  <span>24/7 AI Shopping Assistant Administration</span>
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Manage grounding, store knowledge, AI model selection, safety allowlists, and usage analytics.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>AI Status: Active & Grounded</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">Model & Provider Settings</h3>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Active AI Provider</label>
                  <select className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-bold text-stone-800">
                    <option value="gemini">Google Gemini (Recommended)</option>
                    <option value="openai">OpenAI GPT-4o-mini</option>
                    <option value="anthropic">Anthropic Claude 3 Haiku</option>
                    <option value="rule_engine">Factual Rule Engine (Offline Fallback)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Max Daily Budget Cap (USD)</label>
                  <input type="number" defaultValue={10} className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-bold" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">Grounding & Tools Allowlist</h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li className="flex items-center justify-between">
                    <span>searchProducts</span>
                    <span className="text-xs font-bold text-emerald-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>getShippingEstimate</span>
                    <span className="text-xs font-bold text-emerald-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>getStorePolicy</span>
                    <span className="text-xs font-bold text-emerald-600">Enabled</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>getOrderStatus (Authenticated)</span>
                    <span className="text-xs font-bold text-emerald-600">Enabled</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">AI Usage Analytics</h3>
                <div>
                  <div className="text-xs text-stone-500 font-semibold">Total Conversations</div>
                  <div className="text-2xl font-extrabold text-stone-900">142</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-semibold">Product Recommendations Clicked</div>
                  <div className="text-2xl font-extrabold text-amber-600">89%</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Add New Marketplace Product</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Wireless Gaming Mouse"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Mockup Product Image URL *</label>
                <input
                  type="url"
                  required
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                  >
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Sale Price ({settings.currencySymbol}) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Assigned Supplier / Merchant *</label>
                <select
                  value={newProduct.supplierId}
                  onChange={(e) => setNewProduct({ ...newProduct, supplierId: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold text-xs"
                >
                  {suppliersList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.phone}) • {s.commissionRate}% comm.
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGISTER NEW SUPPLIER MODAL */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Register New Supplier / Merchant</h3>
              <button onClick={() => setShowAddSupplierModal(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddSupplierSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  placeholder="e.g. Dhaka Electronics Wholesale Direct"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newSupplier.contactPerson}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    placeholder="e.g. Mr. Rahman"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold text-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    placeholder="supplier@merchant.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Commission Rate %</label>
                  <input
                    type="number"
                    value={newSupplier.commissionRate}
                    onChange={(e) => setNewSupplier({ ...newSupplier, commissionRate: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Business Address</label>
                <input
                  type="text"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddSupplierModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 shadow-md"
                >
                  Register Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT PRICE & IMAGE MODAL */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Edit Price & Images: {editingProduct.name}</h3>
              <button onClick={() => setShowEditProductModal(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Main Product Image URL</label>
                <input
                  type="text"
                  value={editingProduct.images?.[0] || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value, ...(editingProduct.images.slice(1))] })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Sale Price (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">Add New Category</h3>
              <button onClick={() => setShowAddCategoryModal(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g. Smart Home"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Category Banner Image URL</label>
                <input
                  type="url"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
