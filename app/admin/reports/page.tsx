// app/admin/reports/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Package,
  IndianRupee,
  Calendar,
  Download,
  Filter,
  X,
  BarChart3,
  LineChart,
  PieChart,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingBag,
  CheckCircle,
  Clock,
  Search,   // <-- add this
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
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

// ============================================================
// TYPES
// ============================================================
interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  profit: number;
}

interface CollectionData {
  date: string;
  collected: number;
  due: number;
}

interface DueData {
  customer: string;
  amount: number;
  daysOverdue: number;
  status: "current" | "overdue" | "critical";
}

interface StockData {
  product: string;
  warehouse: number;
  dealer: number;
  total: number;
  minStock: number;
  status: "in-stock" | "low" | "out-of-stock";
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_SALES_DATA: SalesData[] = [
  { date: "2025-01-01", orders: 12, revenue: 125000, profit: 25000 },
  { date: "2025-01-02", orders: 15, revenue: 158000, profit: 32000 },
  { date: "2025-01-03", orders: 8, revenue: 92000, profit: 18000 },
  { date: "2025-01-04", orders: 20, revenue: 215000, profit: 45000 },
  { date: "2025-01-05", orders: 14, revenue: 148000, profit: 28000 },
  { date: "2025-01-06", orders: 18, revenue: 189000, profit: 38000 },
  { date: "2025-01-07", orders: 10, revenue: 105000, profit: 21000 },
  { date: "2025-01-08", orders: 22, revenue: 235000, profit: 48000 },
  { date: "2025-01-09", orders: 16, revenue: 172000, profit: 34000 },
  { date: "2025-01-10", orders: 13, revenue: 135000, profit: 27000 },
  { date: "2025-01-11", orders: 19, revenue: 198000, profit: 40000 },
  { date: "2025-01-12", orders: 11, revenue: 115000, profit: 23000 },
];

const MOCK_COLLECTION_DATA: CollectionData[] = [
  { date: "2025-01-01", collected: 45000, due: 12000 },
  { date: "2025-01-02", collected: 52000, due: 8000 },
  { date: "2025-01-03", collected: 38000, due: 15000 },
  { date: "2025-01-04", collected: 61000, due: 5000 },
  { date: "2025-01-05", collected: 48000, due: 10000 },
  { date: "2025-01-06", collected: 55000, due: 7000 },
  { date: "2025-01-07", collected: 42000, due: 13000 },
  { date: "2025-01-08", collected: 58000, due: 6000 },
  { date: "2025-01-09", collected: 49000, due: 9000 },
  { date: "2025-01-10", collected: 53000, due: 11000 },
  { date: "2025-01-11", collected: 47000, due: 14000 },
  { date: "2025-01-12", collected: 56000, due: 4000 },
];

const MOCK_DUE_DATA: DueData[] = [
  { customer: "Kolkata Infrastructure Ltd", amount: 3200.75, daysOverdue: 15, status: "overdue" },
  { customer: "Apex Builders", amount: 1250.50, daysOverdue: 5, status: "current" },
  { customer: "Delhi Constructors", amount: 780.25, daysOverdue: 25, status: "critical" },
  { customer: "SRBS Retail Store – Mumbai", amount: 450.00, daysOverdue: 0, status: "current" },
  { customer: "Green Valley Constructions", amount: 200.00, daysOverdue: 30, status: "critical" },
  { customer: "Mumbai Hardware Stores", amount: 1500.00, daysOverdue: 10, status: "overdue" },
  { customer: "Chennai Paint House", amount: 320.00, daysOverdue: 0, status: "current" },
];

const MOCK_STOCK_DATA: StockData[] = [
  { product: "SRBS SuperPlast PC-300", warehouse: 45, dealer: 12, total: 57, minStock: 20, status: "in-stock" },
  { product: "SRBS Waterproof Coating", warehouse: 28, dealer: 8, total: 36, minStock: 15, status: "in-stock" },
  { product: "SRBS Epoxy Floor Paint", warehouse: 12, dealer: 5, total: 17, minStock: 10, status: "in-stock" },
  { product: "SRBS Concrete Admixture A40", warehouse: 33, dealer: 15, total: 48, minStock: 25, status: "in-stock" },
  { product: "SRBS Acrylic Emulsion", warehouse: 19, dealer: 6, total: 25, minStock: 20, status: "in-stock" },
  { product: "SRBS Anti-Corrosive Primer", warehouse: 8, dealer: 2, total: 10, minStock: 12, status: "low" },
  { product: "SRBS SuperPlast PC-500", warehouse: 0, dealer: 0, total: 0, minStock: 10, status: "out-of-stock" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ReportsPage() {
  // ---------- State ----------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sales" | "collection" | "due" | "stock">("sales");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "2025-01-01",
    to: "2025-01-12",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // ---------- Mock data (replace with API) ----------
  const salesData = MOCK_SALES_DATA;
  const collectionData = MOCK_COLLECTION_DATA;
  const dueData = MOCK_DUE_DATA;
  const stockData = MOCK_STOCK_DATA;

  // ---------- Derived: Filtered Data ----------
  const filteredSales = useMemo(() => {
    let data = salesData;
    if (dateRange.from) {
      data = data.filter((d) => d.date >= dateRange.from);
    }
    if (dateRange.to) {
      data = data.filter((d) => d.date <= dateRange.to);
    }
    return data;
  }, [salesData, dateRange]);

  const filteredCollection = useMemo(() => {
    let data = collectionData;
    if (dateRange.from) {
      data = data.filter((d) => d.date >= dateRange.from);
    }
    if (dateRange.to) {
      data = data.filter((d) => d.date <= dateRange.to);
    }
    return data;
  }, [collectionData, dateRange]);

  const filteredDue = useMemo(() => {
    if (!searchTerm.trim()) return dueData;
    const q = searchTerm.toLowerCase();
    return dueData.filter((d) => d.customer.toLowerCase().includes(q));
  }, [dueData, searchTerm]);

  const filteredStock = useMemo(() => {
    if (!searchTerm.trim()) return stockData;
    const q = searchTerm.toLowerCase();
    return stockData.filter((d) => d.product.toLowerCase().includes(q));
  }, [stockData, searchTerm]);

  // ---------- Summary Stats ----------
  const totalSales = filteredSales.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = filteredSales.reduce((sum, d) => sum + d.orders, 0);
  const totalProfit = filteredSales.reduce((sum, d) => sum + d.profit, 0);

  const totalCollected = filteredCollection.reduce((sum, d) => sum + d.collected, 0);
  const totalDue = filteredCollection.reduce((sum, d) => sum + d.due, 0);

  const totalDueAmount = filteredDue.reduce((sum, d) => sum + d.amount, 0);
  const criticalDue = filteredDue.filter((d) => d.status === "critical").length;

  const totalStock = filteredStock.reduce((sum, d) => sum + d.total, 0);
  const lowStockItems = filteredStock.filter((d) => d.status !== "in-stock").length;

  // ---------- Chart Colors ----------
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  // ---------- Handlers ----------
  const handleExport = () => {
    alert(`Exporting ${activeTab.toUpperCase()} report as CSV...`);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
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
              <BarChart3 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Reports Dashboard
              </h1>
              <p className="text-gray-600">Sales, Collection, Due & Stock analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-blue-700">৳{totalSales.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Collection</p>
                <p className="text-2xl font-bold text-green-700">৳{totalCollected.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Due</p>
                <p className="text-2xl font-bold text-amber-700">৳{totalDueAmount.toFixed(2)}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl group-hover:scale-110 transition">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Stock Items</p>
                <p className="text-2xl font-bold text-purple-700">{totalStock}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl group-hover:scale-110 transition">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Date Range */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("sales")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeTab === "sales"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 hover:bg-white/70"
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-1" />
                Sales
              </button>
              <button
                onClick={() => setActiveTab("collection")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeTab === "collection"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 hover:bg-white/70"
                }`}
              >
                <Wallet className="h-4 w-4 inline mr-1" />
                Collection
              </button>
              <button
                onClick={() => setActiveTab("due")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeTab === "due"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 hover:bg-white/70"
                }`}
              >
                <CreditCard className="h-4 w-4 inline mr-1" />
                Due
              </button>
              <button
                onClick={() => setActiveTab("stock")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeTab === "stock"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 hover:bg-white/70"
                }`}
              >
                <Package className="h-4 w-4 inline mr-1" />
                Stock
              </button>
            </div>
            <div className="flex-1 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleDateChange}
                  className="px-3 py-1.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm text-sm"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleDateChange}
                  className="px-3 py-1.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm text-sm"
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={activeTab === "due" ? "Search customers..." : "Search products..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {activeTab === "sales" && (
          <SalesReport data={filteredSales} totalSales={totalSales} totalOrders={totalOrders} totalProfit={totalProfit} />
        )}
        {activeTab === "collection" && (
          <CollectionReport data={filteredCollection} totalCollected={totalCollected} totalDue={totalDue} />
        )}
        {activeTab === "due" && (
          <DueReport data={filteredDue} totalDueAmount={totalDueAmount} criticalDue={criticalDue} />
        )}
        {activeTab === "stock" && (
          <StockReport data={filteredStock} totalStock={totalStock} lowStockItems={lowStockItems} />
        )}
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
      `}</style>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

// ---------- SALES REPORT ----------
interface SalesReportProps {
  data: SalesData[];
  totalSales: number;
  totalOrders: number;
  totalProfit: number;
}

const SalesReport: React.FC<SalesReportProps> = ({ data, totalSales, totalOrders, totalProfit }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-blue-700">৳{totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-green-700">{totalOrders}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Profit</p>
          <p className="text-xl font-bold text-amber-700">৳{totalProfit.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Revenue & Orders Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue (৳)" />
            <Bar yAxisId="right" dataKey="orders" fill="#10b981" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Profit Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <ReLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} name="Profit (৳)" />
          </ReLineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-sm font-semibold text-gray-700">Daily Sales Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/30">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Date</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Orders</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Revenue (৳)</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Profit (৳)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                  <td className="px-6 py-3 text-gray-700">{new Date(d.date).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-800">{d.orders}</td>
                  <td className="px-6 py-3 text-right font-medium text-blue-700">৳{d.revenue.toFixed(2)}</td>
                  <td className="px-6 py-3 text-right font-medium text-amber-700">৳{d.profit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ---------- COLLECTION REPORT ----------
interface CollectionReportProps {
  data: CollectionData[];
  totalCollected: number;
  totalDue: number;
}

const CollectionReport: React.FC<CollectionReportProps> = ({ data, totalCollected, totalDue }) => {
  const collectionRate = totalCollected + totalDue > 0 ? (totalCollected / (totalCollected + totalDue)) * 100 : 0;

  const pieData = [
    { name: "Collected", value: totalCollected },
    { name: "Due", value: totalDue },
  ];
  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Collected</p>
          <p className="text-xl font-bold text-green-700">৳{totalCollected.toFixed(2)}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Due</p>
          <p className="text-xl font-bold text-amber-700">৳{totalDue.toFixed(2)}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Collection Rate</p>
          <p className="text-xl font-bold text-blue-700">{collectionRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Collection & Due Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="collected" fill="#10b981" name="Collected (৳)" />
              <Bar dataKey="due" fill="#f59e0b" name="Due (৳)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Collection Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RePieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-green-50 to-emerald-50">
          <h3 className="text-sm font-semibold text-gray-700">Daily Collection Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/30">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Date</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Collected (৳)</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Due (৳)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                  <td className="px-6 py-3 text-gray-700">{new Date(d.date).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right font-medium text-green-700">৳{d.collected.toFixed(2)}</td>
                  <td className="px-6 py-3 text-right font-medium text-amber-700">৳{d.due.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ---------- DUE REPORT ----------
interface DueReportProps {
  data: DueData[];
  totalDueAmount: number;
  criticalDue: number;
}

const DueReport: React.FC<DueReportProps> = ({ data, totalDueAmount, criticalDue }) => {
  const statusColors = {
    current: "bg-green-100 text-green-700",
    overdue: "bg-amber-100 text-amber-700",
    critical: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    current: <CheckCircle className="h-3 w-3" />,
    overdue: <Clock className="h-3 w-3" />,
    critical: <AlertCircle className="h-3 w-3" />,
  };

  const statusLabels = {
    current: "Current",
    overdue: "Overdue",
    critical: "Critical",
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Due</p>
          <p className="text-xl font-bold text-amber-700">৳{totalDueAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Critical Due</p>
          <p className="text-xl font-bold text-red-700">{criticalDue}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Overdue Customers</p>
          <p className="text-xl font-bold text-amber-700">{data.filter(d => d.status === "overdue" || d.status === "critical").length}</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-amber-50 to-orange-50">
          <h3 className="text-sm font-semibold text-gray-700">Outstanding Due</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/30">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Customer</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Amount (৳)</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Days Overdue</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                  <td className="px-6 py-3 font-medium text-gray-800">{d.customer}</td>
                  <td className="px-6 py-3 text-right font-bold text-amber-700">৳{d.amount.toFixed(2)}</td>
                  <td className="px-6 py-3 text-right text-gray-600">{d.daysOverdue}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1 ${statusColors[d.status]}`}>
                      {statusIcons[d.status]}
                      {statusLabels[d.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ---------- STOCK REPORT ----------
interface StockReportProps {
  data: StockData[];
  totalStock: number;
  lowStockItems: number;
}

const StockReport: React.FC<StockReportProps> = ({ data, totalStock, lowStockItems }) => {
  const statusColors = {
    "in-stock": "bg-green-100 text-green-700",
    "low": "bg-amber-100 text-amber-700",
    "out-of-stock": "bg-red-100 text-red-700",
  };

  const statusLabels = {
    "in-stock": "In Stock",
    "low": "Low Stock",
    "out-of-stock": "Out of Stock",
  };

  // Stock distribution for pie chart
  const pieData = [
    { name: "Warehouse", value: data.reduce((sum, d) => sum + d.warehouse, 0) },
    { name: "Dealer", value: data.reduce((sum, d) => sum + d.dealer, 0) },
  ];
  const COLORS = ["#3b82f6", "#8b5cf6"];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Total Stock</p>
          <p className="text-xl font-bold text-purple-700">{totalStock}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <p className="text-xl font-bold text-amber-700">{lowStockItems}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-xl font-bold text-red-700">{data.filter(d => d.status === "out-of-stock").length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="product" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="warehouse" fill="#3b82f6" name="Warehouse" />
              <Bar dataKey="dealer" fill="#8b5cf6" name="Dealer" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Stock by Location</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RePieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="text-sm font-semibold text-gray-700">Product Stock Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/30">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Product</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Warehouse</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Dealer</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Total</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                  <td className="px-6 py-3 font-medium text-gray-800">{d.product}</td>
                  <td className="px-6 py-3 text-right font-medium text-blue-700">{d.warehouse}</td>
                  <td className="px-6 py-3 text-right font-medium text-purple-700">{d.dealer}</td>
                  <td className="px-6 py-3 text-right font-bold text-gray-800">{d.total}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1 ${statusColors[d.status]}`}>
                      {d.status === "in-stock" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {statusLabels[d.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};