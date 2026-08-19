"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  FileText,
  Printer,
  Share2,
  BadgeCheck,
  Lock,
  Store,
  Mail,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

// ============================================================
// TYPES
// ============================================================
interface Dealer {
  id: string
  dealerCode: string
  name: string
  contactPerson: string
  phone: string
  pin: string
  address: string
  area: string
  gstNumber?: string
  createdAt: string
  stats?: {
    totalOrders: number
    totalRevenue: number
    totalProducts: number
    activeStatus: string
    lastOrderDate: string
    avgOrderValue: number
  }
  recentOrders?: Order[]
  products?: Product[]
}

interface Order {
  id: string
  orderNumber: string
  productName: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  quantity: number
}

interface Product {
  id: string
  name: string
  code: string
  category: string
  price: number
  stock: number
}

// ============================================================
// ALL DEALERS DATA
// ============================================================
const ALL_DEALERS: Dealer[] = [
  {
    id: "d1",
    dealerCode: "D001",
    name: "Mumbai Hardware Stores",
    contactPerson: "Rajesh Sharma",
    phone: "+91 98765 43210",
    pin: "1234",
    address: "123, Linking Road, Bandra, Mumbai - 400051",
    area: "Mumbai Central",
    gstNumber: "GSTIN-27AABC1234D1Z1",
    createdAt: "2023-01-15",
    stats: {
      totalOrders: 156,
      totalRevenue: 4850000,
      totalProducts: 45,
      activeStatus: "Active",
      lastOrderDate: "2026-01-15",
      avgOrderValue: 31089,
    },
    recentOrders: [
      {
        id: "ord-001",
        orderNumber: "ORD-2026-001",
        productName: "Premium Paint - 20L",
        amount: 20300,
        status: "delivered",
        date: "2026-01-15",
        quantity: 2,
      },
      {
        id: "ord-002",
        orderNumber: "ORD-2026-004",
        productName: "Construction Adhesive",
        amount: 3940,
        status: "processing",
        date: "2026-03-12",
        quantity: 1,
      },
      {
        id: "ord-003",
        orderNumber: "ORD-2026-006",
        productName: "Waterproof Coating",
        amount: 18450,
        status: "delivered",
        date: "2026-04-02",
        quantity: 1,
      },
    ],
    products: [
      { id: "p1", name: "Premium Paint - 20L", code: "PP-001", category: "Paint", price: 10150, stock: 50 },
      { id: "p2", name: "Construction Adhesive", code: "CA-002", category: "Adhesive", price: 3940, stock: 100 },
      { id: "p3", name: "Waterproof Coating", code: "WC-003", category: "Coating", price: 18450, stock: 30 },
    ],
  },
  {
    id: "d2",
    dealerCode: "D002",
    name: "Kolkata Building Materials",
    contactPerson: "Sneha Das",
    phone: "+91 87654 32109",
    pin: "5678",
    address: "456, Park Street, Kolkata - 700016",
    area: "Kolkata South",
    gstNumber: "GSTIN-19AABC5678E1Z1",
    createdAt: "2023-03-22",
    stats: {
      totalOrders: 89,
      totalRevenue: 3200000,
      totalProducts: 32,
      activeStatus: "Active",
      lastOrderDate: "2026-02-10",
      avgOrderValue: 35955,
    },
    recentOrders: [
      {
        id: "ord-004",
        orderNumber: "ORD-2026-002",
        productName: "Steel Reinforcement Bars",
        amount: 13750,
        status: "shipped",
        date: "2026-02-10",
        quantity: 1,
      },
    ],
    products: [
      { id: "p4", name: "Steel Reinforcement Bars", code: "SR-004", category: "Steel", price: 13750, stock: 200 },
      { id: "p5", name: "Cement Bags - 50kg", code: "CB-005", category: "Cement", price: 4500, stock: 500 },
    ],
  },
  {
    id: "d3",
    dealerCode: "D003",
    name: "Delhi Construction Supplies",
    contactPerson: "Vikram Singh",
    phone: "+91 76543 21098",
    pin: "9012",
    address: "789, Connaught Place, Delhi - 110001",
    area: "Delhi NCR",
    gstNumber: "GSTIN-07AABC9012F1Z1",
    createdAt: "2023-06-10",
    stats: {
      totalOrders: 67,
      totalRevenue: 2800000,
      totalProducts: 28,
      activeStatus: "Inactive",
      lastOrderDate: "2025-12-15",
      avgOrderValue: 41791,
    },
    recentOrders: [],
    products: [
      { id: "p6", name: "Construction Aggregate", code: "CA-006", category: "Aggregate", price: 8500, stock: 150 },
    ],
  },
  {
    id: "d4",
    dealerCode: "D004",
    name: "Chennai Paint House",
    contactPerson: "Priya Rajan",
    phone: "+91 65432 10987",
    pin: "3456",
    address: "101, Anna Nagar, Chennai - 600040",
    area: "Chennai East",
    gstNumber: "GSTIN-33AABC3456G1Z1",
    createdAt: "2023-09-05",
    stats: {
      totalOrders: 124,
      totalRevenue: 4200000,
      totalProducts: 38,
      activeStatus: "Active",
      lastOrderDate: "2026-03-20",
      avgOrderValue: 33870,
    },
    recentOrders: [
      {
        id: "ord-005",
        orderNumber: "ORD-2026-005",
        productName: "Industrial Paint - 50L",
        amount: 18300,
        status: "delivered",
        date: "2026-03-20",
        quantity: 3,
      },
    ],
    products: [
      { id: "p7", name: "Industrial Paint - 50L", code: "IP-007", category: "Paint", price: 6100, stock: 80 },
      { id: "p8", name: "Primer Coating", code: "PC-008", category: "Coating", price: 8200, stock: 60 },
    ],
  },
  {
    id: "d5",
    dealerCode: "D005",
    name: "Bangalore Admixture Co",
    contactPerson: "Anand Kumar",
    phone: "+91 54321 09876",
    pin: "7890",
    address: "202, MG Road, Bangalore - 560001",
    area: "Bangalore West",
    gstNumber: "GSTIN-29AABC7890H1Z1",
    createdAt: "2024-01-20",
    stats: {
      totalOrders: 45,
      totalRevenue: 1850000,
      totalProducts: 20,
      activeStatus: "Active",
      lastOrderDate: "2026-04-10",
      avgOrderValue: 41111,
    },
    recentOrders: [],
    products: [
      { id: "p9", name: "Concrete Admixture", code: "CA-009", category: "Admixture", price: 9200, stock: 40 },
    ],
  },
  {
    id: "d6",
    dealerCode: "D006",
    name: "Hyderabad Paint Traders",
    contactPerson: "Suresh Reddy",
    phone: "+91 43210 98765",
    pin: "2345",
    address: "303, Jubilee Hills, Hyderabad - 500033",
    area: "Hyderabad North",
    gstNumber: "GSTIN-36AABC2345I1Z1",
    createdAt: "2024-03-15",
    stats: {
      totalOrders: 78,
      totalRevenue: 2950000,
      totalProducts: 30,
      activeStatus: "Active",
      lastOrderDate: "2026-03-05",
      avgOrderValue: 37820,
    },
    recentOrders: [
      {
        id: "ord-006",
        orderNumber: "ORD-2026-003",
        productName: "Wall Paint - 10L",
        amount: 22700,
        status: "pending",
        date: "2026-03-05",
        quantity: 2,
      },
    ],
    products: [
      { id: "p10", name: "Wall Paint - 10L", code: "WP-010", category: "Paint", price: 11350, stock: 45 },
      { id: "p11", name: "Ceiling Paint - 5L", code: "CP-011", category: "Paint", price: 8200, stock: 35 },
    ],
  },
  {
    id: "d7",
    dealerCode: "D007",
    name: "Pune Construction Materials",
    contactPerson: "Meera Joshi",
    phone: "+91 32109 87654",
    pin: "6789",
    address: "404, FC Road, Pune - 411005",
    area: "Pune City",
    gstNumber: "GSTIN-27AABC6789J1Z1",
    createdAt: "2024-06-01",
    stats: {
      totalOrders: 92,
      totalRevenue: 3500000,
      totalProducts: 35,
      activeStatus: "Active",
      lastOrderDate: "2026-04-01",
      avgOrderValue: 38043,
    },
    recentOrders: [],
    products: [
      { id: "p12", name: "Construction Sand", code: "CS-012", category: "Aggregate", price: 6500, stock: 200 },
      { id: "p13", name: "Bricks - 1000 units", code: "BR-013", category: "Bricks", price: 12000, stock: 80 },
    ],
  },
]

// ============================================================
// STATUS BADGE COMPONENT
// ============================================================
const StatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
  const config = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    processing: { color: "bg-blue-100 text-blue-800", icon: Package },
    shipped: { color: "bg-purple-100 text-purple-800", icon: TrendingUp },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
  }

  const { color, icon: Icon } = config[status]
  return (
    <span className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium " + color}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ============================================================
// STAT CARD COMPONENT
// ============================================================
const StatCard: React.FC<{
  label: string
  value: string | number
  icon: React.ReactNode
  color?: string
}> = ({ label, value, icon, color = "blue" }) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    teal: "from-teal-500 to-cyan-600",
    rose: "from-rose-500 to-pink-600",
  }

  return (
    <div className="group rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur-xl transition hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={"rounded-xl bg-gradient-to-br " + colorMap[color] + " p-2.5 text-white shadow-lg"}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DealerDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const dealerId = params.id as string

  const [dealer, setDealer] = useState<Dealer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products">("overview")

  // ---------- Fetch Data ----------
  useEffect(() => {
    const fetchDealer = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        const foundDealer = ALL_DEALERS.find((d) => d.id === dealerId)
        
        if (foundDealer) {
          setDealer(foundDealer)
          setError(null)
        } else {
          setError(`Dealer with ID "${dealerId}" not found.`)
        }
      } catch (err) {
        setError("Failed to load dealer data")
      } finally {
        setLoading(false)
      }
    }

    if (dealerId) {
      fetchDealer()
    } else {
      setError("No dealer ID provided")
      setLoading(false)
    }
  }, [dealerId])

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading dealer details...</p>
        </div>
      </div>
    )
  }

  // ---------- Error State ----------
  if (error || !dealer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
          <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h2 className="text-xl font-bold text-red-700">Dealer Not Found</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => router.push("/admin/dealers")}
            className="mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white transition hover:shadow-lg"
          >
            Back to Dealers
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition hover:bg-white/90 hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dealers
        </button>

        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-lg">
                  {dealer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {dealer.stats?.activeStatus === "Active" ? (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{dealer.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="font-mono">{dealer.dealerCode}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <Store className="h-3.5 w-3.5" />
                    {dealer.area}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {new Date(dealer.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          
          </div>

          {/* Quick Contact */}
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-white/50 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{dealer.contactPerson}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{dealer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">PIN: {dealer.pin}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{dealer.address}</span>
            </div>
            {dealer.gstNumber && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{dealer.gstNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        {dealer.stats && (
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <StatCard
              label="Total Orders"
              value={dealer.stats.totalOrders}
              icon={<ShoppingBag className="h-5 w-5" />}
              color="blue"
            />
            <StatCard
              label="Revenue"
              value={"৳" + (dealer.stats.totalRevenue / 100000).toFixed(1) + "L"}
              icon={<DollarSign className="h-5 w-5" />}
              color="green"
            />
            <StatCard
              label="Products"
              value={dealer.stats.totalProducts}
              icon={<Package className="h-5 w-5" />}
              color="purple"
            />
            <StatCard
              label="Avg Order Value"
              value={"৳" + (dealer.stats.avgOrderValue / 1000).toFixed(1) + "k"}
              icon={<TrendingUp className="h-5 w-5" />}
              color="orange"
            />
          
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200/50">
          <button
            onClick={() => setActiveTab("overview")}
            className={"px-4 py-2 text-sm font-medium transition " + (activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700")}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={"px-4 py-2 text-sm font-medium transition " + (activeTab === "orders"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700")}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={"px-4 py-2 text-sm font-medium transition " + (activeTab === "products"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700")}
          >
            Products
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Dealer Information */}
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Store className="h-5 w-5 text-blue-600" />
                  Dealer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Dealer Code</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.dealerCode}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Store className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Dealer Name</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Contact Person</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">PIN</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.pin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.area}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-800">{dealer.address}</p>
                    </div>
                  </div>
                  {dealer.gstNumber && (
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">GST Number</p>
                        <p className="text-sm font-medium text-gray-800">{dealer.gstNumber}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(dealer.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Performance Snapshot
                </h3>
                {dealer.stats && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-blue-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-lg font-bold text-blue-700">{dealer.stats.totalOrders}</p>
                      </div>
                      <div className="rounded-xl bg-green-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Total Revenue</p>
                        <p className="text-lg font-bold text-green-700">৳{(dealer.stats.totalRevenue / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="rounded-xl bg-purple-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Products</p>
                        <p className="text-lg font-bold text-purple-700">{dealer.stats.totalProducts}</p>
                      </div>
                      <div className="rounded-xl bg-orange-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Avg Order Value</p>
                        <p className="text-lg font-bold text-orange-700">৳{(dealer.stats.avgOrderValue / 1000).toFixed(1)}k</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50/50 p-3 backdrop-blur-sm">
                      <p className="text-xs text-gray-500">Last Order Date</p>
                      <p className="text-sm font-medium text-gray-800">
                        {dealer.stats.lastOrderDate ? new Date(dealer.stats.lastOrderDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }) : "No orders yet"}
                      </p>
                    </div>
                   
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  Recent Orders
                </h3>
                <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-100">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
              </div>

              {dealer.recentOrders && dealer.recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200/50 bg-gray-50/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Qty</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dealer.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100/60 transition hover:bg-white/30">
                          <td className="px-4 py-3 font-mono text-sm text-gray-700">{order.orderNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{order.productName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{order.quantity}</td>
                          <td className="px-4 py-3 font-medium text-gray-800">৳{order.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Package className="mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p>No orders found</p>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Package className="h-5 w-5 text-blue-600" />
                Products ({dealer.products?.length || 0})
              </h3>

              {dealer.products && dealer.products.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dealer.products.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm transition hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{product.name}</h4>
                          <p className="text-xs font-mono text-gray-500">{product.code}</p>
                        </div>
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                          {product.category}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="font-semibold text-gray-800">৳{product.price.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Stock</p>
                          <p className={"font-semibold " + (product.stock > 50 ? "text-green-600" : product.stock > 20 ? "text-yellow-600" : "text-red-600")}>
                            {product.stock} units
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Package className="mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p>No products found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}