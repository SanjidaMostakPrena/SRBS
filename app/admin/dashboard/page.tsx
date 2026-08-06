
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Package,
  Users,
  User,
  Store,
  Tag,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ============================================================
// TYPE DEFINITIONS
// ============================================================

type OrderStatus = "pending" | "approved" | "completed" | "rejected";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

interface LowStockProduct {
  name: string;
  stock: number;
  minStock: number;
  unit: string;
}

interface WeeklySale {
  day: string;
  revenue: number;
  orders: number;
}

interface MonthlyCollection {
  month: string;
  collected: number;
  due: number;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================

// Recent Orders
const RECENT_ORDERS: Order[] = [
  { id: "ORD-1001", customer: "Green Valley Constructions", amount: 12500, status: "pending", date: "2025-01-20" },
  { id: "ORD-1002", customer: "Apex Builders", amount: 8700, status: "approved", date: "2025-01-20" },
  { id: "ORD-1003", customer: "Kolkata Infrastructure Ltd", amount: 21500, status: "completed", date: "2025-01-19" },
  { id: "ORD-1004", customer: "SRBS Retail Store – Mumbai", amount: 3200, status: "pending", date: "2025-01-19" },
  { id: "ORD-1005", customer: "Delhi Constructors", amount: 9400, status: "rejected", date: "2025-01-18" },
];

// Low Stock Products
const LOW_STOCK_PRODUCTS: LowStockProduct[] = [
  { name: "Anti-Corrosive Primer", stock: 8, minStock: 12, unit: "Ltr" },
  { name: "SuperPlast PC-500", stock: 0, minStock: 10, unit: "Ltr" },
  { name: "Epoxy Floor Paint", stock: 12, minStock: 10, unit: "Ltr" },
];

// Weekly Sales Data (last 7 days)
const WEEKLY_SALES: WeeklySale[] = [
  { day: "Mon", revenue: 125000, orders: 12 },
  { day: "Tue", revenue: 158000, orders: 15 },
  { day: "Wed", revenue: 92000, orders: 8 },
  { day: "Thu", revenue: 215000, orders: 20 },
  { day: "Fri", revenue: 148000, orders: 14 },
  { day: "Sat", revenue: 189000, orders: 18 },
  { day: "Sun", revenue: 105000, orders: 10 },
];

// Monthly Collection Data
const MONTHLY_COLLECTION: MonthlyCollection[] = [
  { month: "Jan", collected: 450000, due: 120000 },
  { month: "Feb", collected: 520000, due: 80000 },
  { month: "Mar", collected: 380000, due: 150000 },
  { month: "Apr", collected: 610000, due: 50000 },
  { month: "May", collected: 480000, due: 100000 },
  { month: "Jun", collected: 550000, due: 70000 },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- Stats ----------
  const stats = {
    totalOrders: 156,
    totalSales: 2450000,
    totalCustomers: 48,
    totalProducts: 28,
    totalDealers: 12,
    totalSellers: 8,
    pendingOrders: 23,
    lowStockItems: 3,
    totalCollection: 1875000,
    totalDue: 575000,
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
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
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                Admin Overview
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Your business at a glance</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="bg-white/40 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl border border-white/50 shadow-sm flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="hidden xs:inline">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid - First Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="blue"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Total Sales"
            value={`৳${(stats.totalSales / 100000).toFixed(1)}L`}
            icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="green"
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="purple"
            trend="up"
            trendValue="5%"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Package className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="indigo"
            trend="up"
            trendValue="3%"
          />
        </div>

        {/* Stats Grid - Second Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
          <StatCard
            title="Total Dealers"
            value={stats.totalDealers}
            icon={<Store className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="cyan"
            trend="up"
            trendValue="2%"
          />
          <StatCard
            title="Total Sellers"
            value={stats.totalSellers}
            icon={<User className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="pink"
            trend="up"
            trendValue="0%"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="amber"
            trend="down"
            trendValue="4%"
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStockItems}
            icon={<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
            color="red"
            trend="up"
            trendValue="2%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5">
          {/* Weekly Sales Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl border border-white/50">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-700 mb-2 sm:mb-3 md:mb-4">Weekly Sales</h3>
            <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_SALES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} width={40} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} width={30} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar yAxisId="right" dataKey="orders" fill="#10b981" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Collection Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl border border-white/50">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-700 mb-2 sm:mb-3 md:mb-4">Monthly Collection</h3>
            <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_COLLECTION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={40} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2} name="Collected" />
                  <Line type="monotone" dataKey="due" stroke="#f59e0b" strokeWidth={2} name="Due" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Third Row: Recent Orders + Low Stock + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Recent Orders */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-600" />
                Recent Orders
              </h3>
              <button className="text-[10px] sm:text-xs md:text-sm text-blue-600 hover:text-blue-800 transition">View All</button>
            </div>
            <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-2.5 md:space-y-3">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-100/60 hover:border-blue-300 transition-all hover:shadow-md"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{order.customer}</p>
                    <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] md:text-xs text-gray-500 flex-wrap">
                      <span>{order.id}</span>
                      <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-300 rounded-full flex-shrink-0"></span>
                      <span>৳{order.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-red-50 to-amber-50 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-red-500" />
                Low Stock Alerts
              </h3>
              <button className="text-[10px] sm:text-xs md:text-sm text-red-600 hover:text-red-800 transition">View All</button>
            </div>
            <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-2.5 md:space-y-3">
              {LOW_STOCK_PRODUCTS.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl border border-red-100/60 hover:border-red-300 transition-all hover:shadow-md"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{product.name}</p>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">
                      {product.stock} / {product.minStock} {product.unit}
                    </p>
                  </div>
                  <span className={`text-[8px] sm:text-[10px] md:text-xs font-medium px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
                    product.stock === 0
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    <span className="hidden xs:inline">{product.stock === 0 ? "Out of Stock" : "Low Stock"}</span>
                    <span className="xs:hidden">{product.stock === 0 ? "Out" : "Low"}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-purple-600" />
                Quick Actions
              </h3>
            </div>
            <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <QuickAction
                icon={<Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
                label="New Order"
                description="Create a new sales order"
                color="blue"
                href="/orders/new"
              />
              <QuickAction
                icon={<Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
                label="Add Customer"
                description="Register a new customer"
                color="green"
                href="/customers/add"
              />
              <QuickAction
                icon={<Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
                label="Add Product"
                description="Add a new product to inventory"
                color="purple"
                href="/products/add"
              />
              <QuickAction
                icon={<Store className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
                label="Add Dealer"
                description="Register a new dealer"
                color="amber"
                href="/admin/dealers"
              />
              <QuickAction
                icon={<CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
                label="Record Payment"
                description="Record a customer payment"
                color="green"
                href="/payments"
              />
            </div>
          </div>
        </div>

        {/* Bottom: System Status */}
        <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6">
              <span className="text-gray-500">System Status</span>
              <span className="flex items-center gap-1 sm:gap-2 text-green-600">
                <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                All systems operational
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6 text-gray-500 text-[8px] sm:text-[10px] md:text-xs">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <span className="hidden xs:inline">|</span>
              <span>v2.4.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "indigo" | "cyan" | "pink" | "amber" | "red";
  trend?: "up" | "down";
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend, trendValue }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    cyan: "bg-cyan-100 text-cyan-600",
    pink: "bg-pink-100 text-pink-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
      <div className="flex items-start sm:items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[8px] sm:text-[10px] md:text-sm text-gray-500 truncate">{title}</p>
          <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800 truncate">{value}</p>
          {trend && (
            <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
              {trend === "up" ? (
                <ArrowUpRight className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3 text-red-500" />
              )}
              <span className={`text-[6px] sm:text-[8px] md:text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trendValue}
              </span>
              <span className="text-[6px] sm:text-[8px] md:text-xs text-gray-400 hidden xs:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl ${colorMap[color]} group-hover:scale-110 transition flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusMap = {
    pending: { label: "Pending", icon: <Clock className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3" />, className: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved", icon: <CheckCircle className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3" />, className: "bg-blue-100 text-blue-700" },
    completed: { label: "Completed", icon: <CheckCircle className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3" />, className: "bg-green-100 text-green-700" },
    rejected: { label: "Rejected", icon: <AlertCircle className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3" />, className: "bg-red-100 text-red-700" },
  };
  const { label, icon, className } = statusMap[status];
  return (
    <span className={`text-[6px] sm:text-[8px] md:text-xs font-medium px-1 sm:px-1.5 md:px-3 py-0.5 sm:py-1 rounded-full inline-flex items-center gap-0.5 sm:gap-1 ${className} flex-shrink-0`}>
      {icon}
      <span className="hidden xs:inline">{label}</span>
      <span className="xs:hidden">{label.charAt(0)}</span>
    </span>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: "blue" | "green" | "purple" | "amber";
  href: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, description, color, href }) => {
  const colorMap = {
    blue: "hover:bg-blue-50 border-blue-100/60",
    green: "hover:bg-green-50 border-green-100/60",
    purple: "hover:bg-purple-50 border-purple-100/60",
    amber: "hover:bg-amber-50 border-amber-100/60",
  };

  return (
    <a
      href={href}
      className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl border ${colorMap[color]} hover:border-${color}-400 transition-all hover:shadow-md group`}
    >
      <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl bg-${color}-100 text-${color}-600 group-hover:scale-110 transition flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-800 text-[10px] sm:text-xs md:text-sm truncate">{label}</p>
        <p className="text-[6px] sm:text-[8px] md:text-xs text-gray-500 truncate">{description}</p>
      </div>
      <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-gray-400 ml-auto group-hover:text-gray-600 group-hover:translate-x-0.5 transition flex-shrink-0" />
    </a>
  );
};