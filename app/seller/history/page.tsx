
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Search,
  Calendar,
  Filter,
  Eye,
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  CalendarDays,
  Loader2,
  X,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerId: string;
  date: string;
  total: number;
  status: "pending" | "approved" | "completed";
  items: OrderItem[];
  paymentMethod?: string;
  deliverySource?: "dealer" | "warehouse";
  notes?: string;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Green Valley Constructions",
    customerId: "c1",
    date: "2025-01-20",
    total: 12500,
    status: "completed",
    items: [
      { productId: "p1", productName: "SRBS SuperPlast PC-300", quantity: 5, price: 2500 },
      { productId: "p3", productName: "SRBS Epoxy Floor Paint", quantity: 2, price: 1250 },
    ],
    paymentMethod: "UPI",
    deliverySource: "warehouse",
    notes: "Delivered on time",
  },
  {
    id: "ORD-1002",
    customerName: "Apex Builders",
    customerId: "c2",
    date: "2025-01-20",
    total: 8700,
    status: "pending",
    items: [
      { productId: "p2", productName: "SRBS Waterproof Coating", quantity: 4, price: 2175 },
    ],
    paymentMethod: "Cash",
    deliverySource: "dealer",
    notes: "Awaiting approval",
  },
  {
    id: "ORD-1003",
    customerName: "Kolkata Infrastructure Ltd",
    customerId: "c4",
    date: "2025-01-19",
    total: 21500,
    status: "approved",
    items: [
      { productId: "p4", productName: "SRBS Concrete Admixture A40", quantity: 10, price: 2150 },
    ],
    paymentMethod: "Bank Transfer",
    deliverySource: "warehouse",
  },
  {
    id: "ORD-1004",
    customerName: "SRBS Retail Store – Mumbai",
    customerId: "c3",
    date: "2025-01-19",
    total: 3200,
    status: "pending",
    items: [
      { productId: "p5", productName: "SRBS Acrylic Emulsion", quantity: 5, price: 640 },
    ],
    paymentMethod: "Cash",
    deliverySource: "dealer",
  },
  {
    id: "ORD-1005",
    customerName: "Delhi Constructors",
    customerId: "c5",
    date: "2025-01-18",
    total: 9400,
    status: "completed",
    items: [
      { productId: "p6", productName: "SRBS Anti-Corrosive Primer", quantity: 8, price: 1175 },
    ],
    paymentMethod: "UPI",
    deliverySource: "warehouse",
  },
  {
    id: "ORD-1006",
    customerName: "Apex Builders",
    customerId: "c2",
    date: "2025-01-17",
    total: 5600,
    status: "approved",
    items: [
      { productId: "p1", productName: "SRBS SuperPlast PC-300", quantity: 2, price: 2800 },
    ],
    paymentMethod: "Cash",
    deliverySource: "dealer",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function OrderHistoryPage() {
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "completed">("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  // Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ---------- Derived: filtered orders ----------
  const filteredOrders = useMemo(() => {
    let result = orders;

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Date range
    if (dateRange.from) {
      result = result.filter((o) => o.date >= dateRange.from);
    }
    if (dateRange.to) {
      result = result.filter((o) => o.date <= dateRange.to);
    }

    // Sort by date descending (most recent first)
    return result.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [orders, searchTerm, statusFilter, dateRange]);

  // ---------- Stats ----------
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  // ---------- Handlers ----------
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: "", to: "" });
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700">Error</h2>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-80 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-white/30 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                Order History
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">View and manage all orders</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="bg-white/40 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl border border-white/50 shadow-sm flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
              <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="hidden xs:inline">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Orders</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-700 truncate">{totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Sales</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-green-700 truncate">৳{totalSales.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Pending</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-amber-700 truncate">{pendingOrders}</p>
              </div>
              <div className="bg-amber-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Completed</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-700 truncate">{completedOrders}</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl border border-white/50 mb-3 sm:mb-4 md:mb-5">
          <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-9 md:pl-10 pr-2 sm:pr-3 md:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm min-w-[80px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm min-w-[100px]"
                placeholder="From"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm min-w-[100px]"
                placeholder="To"
              />
              <button
                onClick={handleClearFilters}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-200/70 backdrop-blur-sm rounded-lg sm:rounded-xl hover:bg-gray-300/70 transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <span className="hidden xs:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                <tr>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700 hidden sm:table-cell">Date</th>
                  <th className="text-right px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 sm:py-10 text-gray-400">
                      <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-1 sm:mb-2 opacity-30" />
                      <p className="text-xs sm:text-sm">No orders found</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100/60 hover:bg-white/30 transition"
                    >
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 font-medium text-gray-800 text-xs sm:text-sm">{order.id}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-gray-700 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">{order.customerName}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-right font-bold text-gray-800 text-xs sm:text-sm">
                        ৳{order.total.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-center">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-center">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 rounded-full hover:bg-blue-100/50 transition"
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200/50 text-[10px] sm:text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
            Showing {filteredOrders.length} of {totalOrders} orders
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6 animate-fadeIn border border-white/50">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Order Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Order header */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Status</p>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Customer</p>
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 sm:mb-2">Items</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 sm:p-2.5 bg-gray-50/50 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{item.productName}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm flex-shrink-0 ml-2">৳{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-700 text-xs sm:text-sm">Total</span>
                  <span className="font-bold text-base sm:text-lg md:text-xl text-blue-700">৳{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Additional info */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50/50 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                {selectedOrder.paymentMethod && (
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Payment Method</p>
                    <p className="font-medium text-sm sm:text-base">{selectedOrder.paymentMethod}</p>
                  </div>
                )}
                {selectedOrder.deliverySource && (
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Delivery Source</p>
                    <p className="font-medium text-sm sm:text-base capitalize">{selectedOrder.deliverySource}</p>
                  </div>
                )}
                {selectedOrder.notes && (
                  <div className="col-span-2">
                    <p className="text-[10px] sm:text-xs text-gray-500">Notes</p>
                    <p className="font-medium text-sm sm:text-base">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition text-xs sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
        @media (max-width: 479px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================

interface StatusBadgeProps {
  status: "pending" | "approved" | "completed";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    completed: { label: "Completed", icon: <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />, className: "bg-green-100 text-green-700" },
    pending: { label: "Pending", icon: <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />, className: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved", icon: <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />, className: "bg-blue-100 text-blue-700" },
  };
  const { label, icon, className } = statusMap[status];
  return (
    <span className={`text-[8px] sm:text-[10px] md:text-xs font-medium px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full inline-flex items-center gap-0.5 sm:gap-1 ${className}`}>
      {icon}
      <span className="hidden xs:inline">{label}</span>
      <span className="xs:hidden">{label.charAt(0)}</span>
    </span>
  );
};