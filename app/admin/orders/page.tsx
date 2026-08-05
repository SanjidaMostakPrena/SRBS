// app/admin/orders/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  ShoppingBag,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Clock,
  Filter,
  Loader2,
  Package,
  IndianRupee,
  User,
  MapPin,
  Calendar,
  ToggleLeft,
  ToggleRight,
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

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface Order {
  id: string;
  customerName: string;
  customerId: string;
  date: string;
  total: number;
  status: "pending" | "approved" | "rejected";
  items: OrderItem[];
  deliverySource: "dealer" | "warehouse";
  notes?: string;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "SRBS SuperPlast PC-300", stock: 45 },
  { id: "p2", name: "SRBS Waterproof Coating", stock: 28 },
  { id: "p3", name: "SRBS Epoxy Floor Paint", stock: 12 },
  { id: "p4", name: "SRBS Concrete Admixture A40", stock: 33 },
  { id: "p5", name: "SRBS Acrylic Emulsion", stock: 19 },
  { id: "p6", name: "SRBS Anti-Corrosive Primer", stock: 8 },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Green Valley Constructions",
    customerId: "c1",
    date: "2025-01-20",
    total: 12500,
    status: "pending",
    items: [
      { productId: "p1", productName: "SRBS SuperPlast PC-300", quantity: 5, price: 2500 },
      { productId: "p3", productName: "SRBS Epoxy Floor Paint", quantity: 2, price: 1250 },
    ],
    deliverySource: "warehouse",
    notes: "Deliver by Friday",
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
    deliverySource: "dealer",
  },
  {
    id: "ORD-1005",
    customerName: "Delhi Constructors",
    customerId: "c5",
    date: "2025-01-18",
    total: 9400,
    status: "rejected",
    items: [
      { productId: "p6", productName: "SRBS Anti-Corrosive Primer", quantity: 8, price: 1175 },
    ],
    deliverySource: "warehouse",
    notes: "Out of stock",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AdminOrdersPage() {
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Confirmation modal for approve/reject
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    order: Order | null;
    action: "approve" | "reject";
  }>({ open: false, order: null, action: "approve" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  // ---------- Derived ----------
  const filteredOrders = useMemo(() => {
    let result = orders;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    return result;
  }, [orders, searchTerm, statusFilter]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const approvedOrders = orders.filter((o) => o.status === "approved").length;
  const rejectedOrders = orders.filter((o) => o.status === "rejected").length;

  // ---------- Handlers ----------
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleAction = (order: Order, action: "approve" | "reject") => {
    setActionModal({ open: true, order, action });
    setModalError(null);
    setModalSuccess(false);
  };

  const confirmAction = async () => {
    const { order, action } = actionModal;
    if (!order) return;

    // Validate stock for approval
    if (action === "approve") {
      // Check if enough stock for each item
      for (const item of order.items) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          setModalError(`Product ${item.productName} not found`);
          return;
        }
        if (product.stock < item.quantity) {
          setModalError(
            `Insufficient stock for ${item.productName}. Available: ${product.stock}, Required: ${item.quantity}`
          );
          return;
        }
      }
    }

    setIsSubmitting(true);
    setModalError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (action === "approve") {
      // Deduct stock for each item
      const updatedProducts = products.map((p) => {
        const orderItem = order.items.find((item) => item.productId === p.id);
        if (orderItem) {
          return { ...p, stock: p.stock - orderItem.quantity };
        }
        return p;
      });
      setProducts(updatedProducts);

      // Update order status
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "approved" } : o
        )
      );
    } else {
      // Reject order
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "rejected" } : o
        )
      );
    }

    setIsSubmitting(false);
    setModalSuccess(true);
    setTimeout(() => {
      setActionModal({ open: false, order: null, action: "approve" });
      setModalSuccess(false);
    }, 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Order Approval
              </h1>
              <p className="text-gray-600">Manage and approve pending orders</p>
            </div>
          </div>
        </div>

       

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                className="px-4 py-2 bg-gray-200/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/70 transition flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Date</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-400">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>No orders found</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100/60 hover:bg-white/30 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                      <td className="px-6 py-4 text-gray-700">{order.customerName}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-800">
                        ৳{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <OrderStatus status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100/50 transition"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAction(order, "approve")}
                                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100/50 transition"
                                title="Approve"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleAction(order, "reject")}
                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100/50 transition"
                                title="Reject"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-200/50 text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
            Showing {filteredOrders.length} of {totalOrders} orders
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          products={products}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Approve/Reject Confirmation Modal */}
      {actionModal.open && actionModal.order && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fadeIn border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-full ${actionModal.action === "approve" ? "bg-green-100" : "bg-red-100"}`}>
                {actionModal.action === "approve" ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {actionModal.action === "approve" ? "Approve Order" : "Reject Order"}
              </h2>
            </div>
            <p className="text-gray-600">
              {actionModal.action === "approve"
                ? `Are you sure you want to approve order ${actionModal.order.id}? This will deduct stock for all items.`
                : `Are you sure you want to reject order ${actionModal.order.id}?`}
            </p>

            {actionModal.action === "approve" && (
              <div className="mt-3 p-3 bg-blue-50 rounded-xl text-sm text-gray-600">
                <p className="font-medium text-gray-700">Items to deduct:</p>
                <ul className="mt-1 space-y-1">
                  {actionModal.order.items.map((item) => (
                    <li key={item.productId} className="flex justify-between">
                      <span>{item.productName}</span>
                      <span className="font-medium">-{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {modalError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-200 mt-4">
                <AlertCircle className="h-4 w-4" />
                {modalError}
              </div>
            )}
            {modalSuccess && (
              <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-green-200 mt-4">
                <CheckCircle className="h-4 w-4" />
                Order {actionModal.action === "approve" ? "approved" : "rejected"} successfully!
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setActionModal({ open: false, order: null, action: "approve" });
                  setModalError(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                disabled={isSubmitting || modalSuccess}
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={isSubmitting || modalSuccess}
                className={`flex-1 px-4 py-2 rounded-xl text-white font-semibold transition ${
                  actionModal.action === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>{actionModal.action === "approve" ? "Approve" : "Reject"}</>
                )}
              </button>
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
      `}</style>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

const OrderStatus: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    pending: { label: "Pending", icon: <Clock className="h-3 w-3" />, className: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved", icon: <CheckCircle className="h-3 w-3" />, className: "bg-green-100 text-green-700" },
    rejected: { label: "Rejected", icon: <XCircle className="h-3 w-3" />, className: "bg-red-100 text-red-700" },
  };
  const { label, icon, className } = statusMap[status];
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </span>
  );
};

interface OrderDetailsModalProps {
  order: Order;
  products: Product[];
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, products, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Order Details
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-bold text-gray-800">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <OrderStatus status={order.status} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium text-gray-800">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Source</p>
              <p className="font-medium text-gray-800 capitalize">{order.deliverySource}</p>
            </div>
            {order.notes && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium text-gray-800">{order.notes}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50/50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{item.productName}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">৳{(item.price * item.quantity).toFixed(2)}</p>
                      {product && (
                        <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-700">Total</span>
              <span className="font-bold text-xl text-blue-700">৳{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};