"use client"

import React, { useState, useMemo } from "react"
import {
  Package,
  Search,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Truck,
  Clock,
  Eye,
  Printer,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  Phone,
  MapPin,
  Building2,
  Store,
  Trash2,
  Edit,
  Save,
  Upload,
  Barcode,
  Tag,
  Box,
  Layers,
  Palette,
  Droplet,
  Paintbrush,
  Shield,
  TrendingUp,
  TrendingDown,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  RefreshCw,
  AlertTriangle,
  Circle,
  Grid,
  List,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  Users,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Banknote,
  Landmark,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Image from "next/image"

// ============================================================
// TYPES
// ============================================================
interface StockItem {
  id: string
  code: string
  name: string
  category: "paint" | "admixture" | "accessories"
  subCategory: string
  unit: string
  sellingPrice: number
  buyingPrice: number
  quantity: number
  minStock: number
  maxStock: number
  image?: string
  description: string
  brand: string
  packSize: string
  location: string
  lastUpdated: string
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_STOCK_ITEMS: StockItem[] = [
  {
    id: "s1",
    code: "PA-001",
    name: "Premium Emulsion Paint - 20L",
    category: "paint",
    subCategory: "Emulsion",
    unit: "20L",
    sellingPrice: 8500,
    buyingPrice: 6500,
    quantity: 50,
    minStock: 20,
    maxStock: 100,
    description: "High-quality emulsion paint for interior walls",
    brand: "SRBS Premium",
    packSize: "20L Bucket",
    location: "Warehouse A - Shelf 3",
    lastUpdated: "2026-01-15T10:30:00",
  },
  {
    id: "s2",
    code: "PA-002",
    name: "Enamel Paint - 5L",
    category: "paint",
    subCategory: "Enamel",
    unit: "5L",
    sellingPrice: 3200,
    buyingPrice: 2400,
    quantity: 8,
    minStock: 15,
    maxStock: 60,
    description: "Durable enamel paint for metal and wood surfaces",
    brand: "SRBS Enamel",
    packSize: "5L Tin",
    location: "Warehouse A - Shelf 5",
    lastUpdated: "2026-01-14T14:20:00",
  },
  {
    id: "s3",
    code: "PA-003",
    name: "Primer Coating - 10L",
    category: "paint",
    subCategory: "Primer",
    unit: "10L",
    sellingPrice: 4500,
    buyingPrice: 3500,
    quantity: 0,
    minStock: 10,
    maxStock: 50,
    description: "Premium primer for better paint adhesion",
    brand: "SRBS Primer",
    packSize: "10L Bucket",
    location: "Warehouse A - Shelf 2",
    lastUpdated: "2026-01-13T09:15:00",
  },
  {
    id: "s4",
    code: "PA-004",
    name: "Texture Paint - 25kg",
    category: "paint",
    subCategory: "Texture",
    unit: "25kg",
    sellingPrice: 12000,
    buyingPrice: 9000,
    quantity: 25,
    minStock: 10,
    maxStock: 40,
    description: "Decorative texture paint for exterior walls",
    brand: "SRBS Texture",
    packSize: "25kg Bag",
    location: "Warehouse B - Shelf 1",
    lastUpdated: "2026-01-12T16:45:00",
  },
  {
    id: "s5",
    code: "AD-001",
    name: "Waterproofing Compound - 20L",
    category: "admixture",
    subCategory: "Waterproofing",
    unit: "20L",
    sellingPrice: 6800,
    buyingPrice: 5200,
    quantity: 35,
    minStock: 15,
    maxStock: 80,
    description: "Advanced waterproofing solution for concrete",
    brand: "SRBS Waterproof",
    packSize: "20L Bucket",
    location: "Warehouse B - Shelf 4",
    lastUpdated: "2026-01-11T11:30:00",
  },
  {
    id: "s6",
    code: "AD-002",
    name: "Concrete Admixture - 25kg",
    category: "admixture",
    subCategory: "Concrete",
    unit: "25kg",
    sellingPrice: 9500,
    buyingPrice: 7200,
    quantity: 3,
    minStock: 10,
    maxStock: 50,
    description: "High-performance concrete admixture",
    brand: "SRBS Concrete",
    packSize: "25kg Bag",
    location: "Warehouse B - Shelf 6",
    lastUpdated: "2026-01-10T08:50:00",
  },
  {
    id: "s7",
    code: "AD-003",
    name: "Plaster Admixture - 20kg",
    category: "admixture",
    subCategory: "Plaster",
    unit: "20kg",
    sellingPrice: 4200,
    buyingPrice: 3200,
    quantity: 45,
    minStock: 15,
    maxStock: 70,
    description: "Specialized admixture for plaster work",
    brand: "SRBS Plaster",
    packSize: "20kg Bag",
    location: "Warehouse C - Shelf 2",
    lastUpdated: "2026-01-09T13:40:00",
  },
  {
    id: "s8",
    code: "AD-004",
    name: "Tile Adhesive - 25kg",
    category: "admixture",
    subCategory: "Tile Adhesive",
    unit: "25kg",
    sellingPrice: 5500,
    buyingPrice: 4200,
    quantity: 30,
    minStock: 12,
    maxStock: 60,
    description: "Premium tile adhesive for all tile types",
    brand: "SRBS Tile",
    packSize: "25kg Bag",
    location: "Warehouse C - Shelf 5",
    lastUpdated: "2026-01-08T15:20:00",
  },
  {
    id: "s9",
    code: "AC-001",
    name: "Paint Roller Set - Professional",
    category: "accessories",
    subCategory: "Tools",
    unit: "Set",
    sellingPrice: 1200,
    buyingPrice: 800,
    quantity: 60,
    minStock: 20,
    maxStock: 100,
    description: "Professional paint roller set with tray",
    brand: "SRBS Tools",
    packSize: "1 Set",
    location: "Warehouse C - Shelf 8",
    lastUpdated: "2026-01-07T10:10:00",
  },
  {
    id: "s10",
    code: "PA-005",
    name: "Anti-Rust Paint - 10L",
    category: "paint",
    subCategory: "Anti-Rust",
    unit: "10L",
    sellingPrice: 7800,
    buyingPrice: 6000,
    quantity: 120,
    minStock: 30,
    maxStock: 80,
    description: "Anti-rust paint for metal surfaces",
    brand: "SRBS Anti-Rust",
    packSize: "10L Bucket",
    location: "Warehouse A - Shelf 4",
    lastUpdated: "2026-01-06T09:30:00",
  },
]

// ============================================================
// STAT CARD COMPONENT
// ============================================================
const StatCard: React.FC<{
  label: string
  value: string | number
  icon: React.ReactNode
  color?: string
  subtitle?: string
}> = ({ label, value, icon, color = "blue", subtitle }) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    teal: "from-teal-500 to-cyan-600",
    rose: "from-rose-500 to-pink-600",
    yellow: "from-yellow-500 to-amber-600",
    indigo: "from-indigo-500 to-purple-600",
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div
          className={`rounded-xl bg-gradient-to-br ${colorMap[color]} p-3 text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DealerStockPage() {
  // ---------- State ----------
  const [stockItems, setStockItems] = useState<StockItem[]>(MOCK_STOCK_ITEMS)
  const [loading, setLoading] = useState(false)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "paint" | "admixture" | "accessories"
  >("all")

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null)
  const [showStockModal, setShowStockModal] = useState(false)

  // ---------- Derived ----------
  const filteredItems = useMemo(() => {
    let result = stockItems

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter)
    }

    return result
  }, [stockItems, searchTerm, categoryFilter])

  // Stats
  const stats = useMemo(() => {
    const totalProducts = stockItems.length
    const totalQuantity = stockItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const totalValue = stockItems.reduce(
      (sum, item) => sum + item.quantity * item.sellingPrice,
      0
    )
    const paint = stockItems.filter((item) => item.category === "paint").length
    const admixture = stockItems.filter(
      (item) => item.category === "admixture"
    ).length
    const accessories = stockItems.filter(
      (item) => item.category === "accessories"
    ).length

    return {
      totalProducts,
      totalQuantity,
      totalValue,
      categories: { paint, admixture, accessories },
    }
  }, [stockItems])

  // ---------- Handlers ----------
  const handleViewProduct = (item: StockItem) => {
    setSelectedProduct(item)
    setShowStockModal(true)
  }

  const handleCloseModal = () => {
    setShowStockModal(false)
    setSelectedProduct(null)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "paint":
        return <Paintbrush className="h-4 w-4" />
      case "admixture":
        return <Droplet className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "paint":
        return "from-blue-500 to-indigo-600"
      case "admixture":
        return "from-purple-500 to-pink-600"
      default:
        return "from-green-500 to-emerald-600"
    }
  }

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading stock data...</p>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-4 md:p-6 lg:p-8">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 text-white shadow-lg">
                  <Box className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  My Stock
                </h1>
                <p className="text-sm text-gray-600">
                  Track and manage your inventory
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Products"
              value={stats.totalProducts}
              icon={<Package className="h-5 w-5" />}
              color="blue"
            />
            <StatCard
              label="Total Quantity"
              value={stats.totalQuantity}
              icon={<Layers className="h-5 w-5" />}
              color="teal"
              subtitle={`${stats.totalQuantity} units`}
            />
            <StatCard
              label="Total Value"
              value={"৳" + (stats.totalValue / 100000).toFixed(1) + "L"}
              icon={<DollarSign className="h-5 w-5" />}
              color="green"
            />
            <StatCard
              label="Categories"
              value={
                stats.categories.paint +
                stats.categories.admixture +
                stats.categories.accessories
              }
              icon={<Package className="h-5 w-5" />}
              color="purple"
              subtitle={`Paint: ${stats.categories.paint}, Mix: ${stats.categories.admixture}, Acc: ${stats.categories.accessories}`}
            />
          </div>
        </div>


        {/* Stock Items */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-white/50 bg-white/70 p-12 text-center shadow-2xl backdrop-blur-xl">
            <Box className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">No stock items found</p>
            <p className="mt-1 text-sm text-gray-400">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          // List View
          <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-gray-700 md:table-cell">
                      Code
                    </th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-gray-700 lg:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                      Buying Price
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                      Selling Price
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="font-mono text-xs text-gray-500">
                          {item.code}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <span className="text-gray-600 capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-medium text-gray-800">
                          ৳{item.buyingPrice.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-medium text-gray-800">
                          ৳{item.sellingPrice.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-medium text-gray-800">
                          {item.quantity}
                        </p>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Stock Detail Modal */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                    Stock Details
                  </h2>
                </div>
                <p className="mt-1 font-mono text-sm text-gray-500">
                  {selectedProduct.code}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="h-4 w-4 text-blue-600" />
                  Product Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <Tag className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedProduct.name}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Building2 className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedProduct.brand}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Box className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedProduct.packSize}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedProduct.location}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Stock Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <Package className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Quantity: <strong>{selectedProduct.quantity}</strong>{" "}
                      {selectedProduct.unit}
                    </span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <DollarSign className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Selling Price: ৳
                      {selectedProduct.sellingPrice.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <DollarSign className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Buying Price: ৳
                      {selectedProduct.buyingPrice.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Min Stock: {selectedProduct.minStock}{" "}
                      {selectedProduct.unit}
                    </span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <TrendingUp className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Max Stock: {selectedProduct.maxStock}{" "}
                      {selectedProduct.unit}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedProduct.description && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-yellow-50/50 p-4 backdrop-blur-sm">
                <p className="flex items-start gap-2 text-sm">
                  <FileText className="mt-0.5 h-4 w-4 text-yellow-600" />
                  <span className="text-gray-700">
                    {selectedProduct.description}
                  </span>
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
              <button
                onClick={handleCloseModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Close
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
                <Edit className="h-4 w-4" />
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
