
"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
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
  Users,
  Target,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

// ============================================================
// TYPES
// ============================================================
interface Seller {
  id: string
  sellerId: string
  name: string
  manager: string
  tsm: string
  phone: string
  pin: string
  address: string
  area: string
  password?: string
  createdAt: string
  stats?: {
    totalOrders: number
    totalRevenue: number
    totalDealers: number
    activeDealers: number
    conversionRate: number
    avgOrderValue: number
    growthRate: number
  }
  recentOrders?: Order[]
  assignedDealers?: Dealer[]
  performance?: {
    monthly: MonthlyPerformance[]
    yearly: YearlyPerformance
  }
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: number
}

interface Dealer {
  id: string
  name: string
  code: string
  area: string
  phone: string
}

interface MonthlyPerformance {
  month: string
  revenue: number
  orders: number
  target: number
}

interface YearlyPerformance {
  revenue: number
  orders: number
  growth: number
}

// ============================================================
// ALL SELLERS DATA
// ============================================================
const ALL_SELLERS: Seller[] = [
  {
    id: "s1",
    sellerId: "S-1001",
    name: "Rajesh Kumar",
    manager: "Mr. Sharma",
    tsm: "Mrs. Patel",
    phone: "+91 98765 43210",
    pin: "1234",
    address: "123, BKC Complex, Bandra East, Mumbai - 400051",
    area: "Mumbai Central",
    createdAt: "2023-01-15",
    stats: {
      totalOrders: 234,
      totalRevenue: 4850000,
      totalDealers: 45,
      activeDealers: 38,
      conversionRate: 78,
      avgOrderValue: 20726,
      growthRate: 12.5,
    },
    recentOrders: [
      {
        id: "ord-001",
        orderNumber: "ORD-2026-001",
        customerName: "Mumbai Hardware Stores",
        amount: 20300,
        status: "delivered",
        date: "2026-01-15",
        items: 2,
      },
      {
        id: "ord-002",
        orderNumber: "ORD-2026-004",
        customerName: "Chennai Paint House",
        amount: 3940,
        status: "processing",
        date: "2026-03-12",
        items: 1,
      },
      {
        id: "ord-003",
        orderNumber: "ORD-2026-006",
        customerName: "Hyderabad Paint Traders",
        amount: 18450,
        status: "delivered",
        date: "2026-04-02",
        items: 1,
      },
    ],
    assignedDealers: [
      { id: "d1", name: "Mumbai Hardware Stores", code: "D001", area: "Mumbai Central", phone: "+91 98765 43210" },
      { id: "d2", name: "Kolkata Building Materials", code: "D002", area: "Kolkata South", phone: "+91 87654 32109" },
      { id: "d3", name: "Delhi Construction Supplies", code: "D003", area: "Delhi NCR", phone: "+91 76543 21098" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 350000, orders: 18, target: 400000 },
        { month: "Feb", revenue: 420000, orders: 22, target: 400000 },
        { month: "Mar", revenue: 380000, orders: 20, target: 450000 },
        { month: "Apr", revenue: 450000, orders: 24, target: 450000 },
        { month: "May", revenue: 410000, orders: 21, target: 450000 },
        { month: "Jun", revenue: 490000, orders: 26, target: 500000 },
      ],
      yearly: {
        revenue: 4850000,
        orders: 234,
        growth: 12.5,
      },
    },
  },
  {
    id: "s2",
    sellerId: "S-1002",
    name: "Priya Sharma",
    manager: "Mr. Verma",
    tsm: "Mr. Singh",
    phone: "+91 87654 32109",
    pin: "5678",
    address: "456, Park Street, Kolkata - 700016",
    area: "Kolkata South",
    createdAt: "2023-03-22",
    stats: {
      totalOrders: 189,
      totalRevenue: 4200000,
      totalDealers: 38,
      activeDealers: 32,
      conversionRate: 72,
      avgOrderValue: 22222,
      growthRate: 8.3,
    },
    recentOrders: [
      {
        id: "ord-004",
        orderNumber: "ORD-2026-002",
        customerName: "Kolkata Building Materials",
        amount: 13750,
        status: "shipped",
        date: "2026-02-10",
        items: 1,
      },
    ],
    assignedDealers: [
      { id: "d4", name: "Chennai Paint House", code: "D004", area: "Chennai East", phone: "+91 65432 10987" },
      { id: "d5", name: "Bangalore Admixture Co", code: "D005", area: "Bangalore West", phone: "+91 54321 09876" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 320000, orders: 16, target: 350000 },
        { month: "Feb", revenue: 380000, orders: 19, target: 380000 },
        { month: "Mar", revenue: 350000, orders: 18, target: 380000 },
        { month: "Apr", revenue: 390000, orders: 20, target: 400000 },
        { month: "May", revenue: 370000, orders: 19, target: 400000 },
        { month: "Jun", revenue: 420000, orders: 22, target: 420000 },
      ],
      yearly: {
        revenue: 4200000,
        orders: 189,
        growth: 8.3,
      },
    },
  },
  {
    id: "s3",
    sellerId: "S-1003",
    name: "Amit Singh",
    manager: "Mrs. Reddy",
    tsm: "Mr. Kumar",
    phone: "+91 76543 21098",
    pin: "9012",
    address: "789, Connaught Place, Delhi - 110001",
    area: "Delhi NCR",
    createdAt: "2023-06-10",
    stats: {
      totalOrders: 156,
      totalRevenue: 3800000,
      totalDealers: 52,
      activeDealers: 28,
      conversionRate: 65,
      avgOrderValue: 24358,
      growthRate: -2.5,
    },
    recentOrders: [],
    assignedDealers: [
      { id: "d6", name: "Hyderabad Paint Traders", code: "D006", area: "Hyderabad North", phone: "+91 43210 98765" },
      { id: "d7", name: "Pune Construction Materials", code: "D007", area: "Pune City", phone: "+91 32109 87654" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 280000, orders: 14, target: 350000 },
        { month: "Feb", revenue: 300000, orders: 15, target: 350000 },
        { month: "Mar", revenue: 320000, orders: 16, target: 380000 },
        { month: "Apr", revenue: 290000, orders: 14, target: 380000 },
        { month: "May", revenue: 310000, orders: 15, target: 400000 },
        { month: "Jun", revenue: 330000, orders: 17, target: 400000 },
      ],
      yearly: {
        revenue: 3800000,
        orders: 156,
        growth: -2.5,
      },
    },
  },
  {
    id: "s4",
    sellerId: "S-1004",
    name: "Sneha Reddy",
    manager: "Mr. Gupta",
    tsm: "Mrs. Sharma",
    phone: "+91 65432 10987",
    pin: "3456",
    address: "101, Anna Nagar, Chennai - 600040",
    area: "Chennai East",
    createdAt: "2023-09-05",
    stats: {
      totalOrders: 267,
      totalRevenue: 5600000,
      totalDealers: 48,
      activeDealers: 42,
      conversionRate: 82,
      avgOrderValue: 20973,
      growthRate: 15.2,
    },
    recentOrders: [
      {
        id: "ord-005",
        orderNumber: "ORD-2026-005",
        customerName: "Chennai Steel Suppliers",
        amount: 18300,
        status: "delivered",
        date: "2026-03-20",
        items: 3,
      },
    ],
    assignedDealers: [
      { id: "d8", name: "Chennai Steel Suppliers", code: "D008", area: "Chennai East", phone: "+91 54321 09876" },
      { id: "d9", name: "Bangalore Cement Traders", code: "D009", area: "Bangalore West", phone: "+91 43210 98765" },
      { id: "d10", name: "Hyderabad Building Solutions", code: "D010", area: "Hyderabad North", phone: "+91 32109 87654" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 380000, orders: 19, target: 400000 },
        { month: "Feb", revenue: 420000, orders: 21, target: 420000 },
        { month: "Mar", revenue: 450000, orders: 23, target: 440000 },
        { month: "Apr", revenue: 480000, orders: 24, target: 460000 },
        { month: "May", revenue: 460000, orders: 23, target: 480000 },
        { month: "Jun", revenue: 510000, orders: 26, target: 500000 },
      ],
      yearly: {
        revenue: 5600000,
        orders: 267,
        growth: 15.2,
      },
    },
  },
  {
    id: "s5",
    sellerId: "S-1005",
    name: "Vikram Patel",
    manager: "Mrs. Joshi",
    tsm: "Mr. Mehta",
    phone: "+91 54321 09876",
    pin: "7890",
    address: "202, MG Road, Bangalore - 560001",
    area: "Bangalore West",
    createdAt: "2024-01-20",
    stats: {
      totalOrders: 98,
      totalRevenue: 2500000,
      totalDealers: 35,
      activeDealers: 18,
      conversionRate: 60,
      avgOrderValue: 25510,
      growthRate: -5.3,
    },
    recentOrders: [],
    assignedDealers: [
      { id: "d11", name: "Mumbai Paint Distributors", code: "D011", area: "Mumbai Central", phone: "+91 98765 43210" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 200000, orders: 10, target: 350000 },
        { month: "Feb", revenue: 220000, orders: 11, target: 350000 },
        { month: "Mar", revenue: 240000, orders: 12, target: 380000 },
        { month: "Apr", revenue: 210000, orders: 10, target: 380000 },
        { month: "May", revenue: 230000, orders: 11, target: 400000 },
        { month: "Jun", revenue: 250000, orders: 12, target: 400000 },
      ],
      yearly: {
        revenue: 2500000,
        orders: 98,
        growth: -5.3,
      },
    },
  },
  {
    id: "s6",
    sellerId: "S-1006",
    name: "Ananya Gupta",
    manager: "Mr. Shah",
    tsm: "Mrs. Desai",
    phone: "+91 43210 98765",
    pin: "2345",
    address: "303, Jubilee Hills, Hyderabad - 500033",
    area: "Hyderabad North",
    createdAt: "2024-03-15",
    stats: {
      totalOrders: 210,
      totalRevenue: 5100000,
      totalDealers: 42,
      activeDealers: 36,
      conversionRate: 79,
      avgOrderValue: 24285,
      growthRate: 10.8,
    },
    recentOrders: [
      {
        id: "ord-006",
        orderNumber: "ORD-2026-003",
        customerName: "Delhi Hardware Mart",
        amount: 22700,
        status: "pending",
        date: "2026-03-05",
        items: 2,
      },
    ],
    assignedDealers: [
      { id: "d12", name: "Delhi Hardware Mart", code: "D012", area: "Delhi NCR", phone: "+91 76543 21098" },
      { id: "d13", name: "Kolkata Steel House", code: "D013", area: "Kolkata South", phone: "+91 87654 32109" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 350000, orders: 17, target: 380000 },
        { month: "Feb", revenue: 390000, orders: 20, target: 400000 },
        { month: "Mar", revenue: 420000, orders: 21, target: 420000 },
        { month: "Apr", revenue: 440000, orders: 22, target: 440000 },
        { month: "May", revenue: 430000, orders: 21, target: 460000 },
        { month: "Jun", revenue: 470000, orders: 24, target: 480000 },
      ],
      yearly: {
        revenue: 5100000,
        orders: 210,
        growth: 10.8,
      },
    },
  },
  {
    id: "s7",
    sellerId: "S-1007",
    name: "Manoj Joshi",
    manager: "Mrs. Patel",
    tsm: "Mr. Singh",
    phone: "+91 32109 87654",
    pin: "6789",
    address: "404, FC Road, Pune - 411005",
    area: "Pune City",
    createdAt: "2024-06-01",
    stats: {
      totalOrders: 178,
      totalRevenue: 4950000,
      totalDealers: 40,
      activeDealers: 34,
      conversionRate: 75,
      avgOrderValue: 27808,
      growthRate: 9.2,
    },
    recentOrders: [],
    assignedDealers: [
      { id: "d14", name: "Pune Admixture Suppliers", code: "D014", area: "Pune City", phone: "+91 32109 87654" },
      { id: "d15", name: "Mumbai Construction Co", code: "D015", area: "Mumbai Central", phone: "+91 98765 43210" },
    ],
    performance: {
      monthly: [
        { month: "Jan", revenue: 320000, orders: 16, target: 350000 },
        { month: "Feb", revenue: 360000, orders: 18, target: 380000 },
        { month: "Mar", revenue: 380000, orders: 19, target: 400000 },
        { month: "Apr", revenue: 410000, orders: 21, target: 420000 },
        { month: "May", revenue: 400000, orders: 20, target: 440000 },
        { month: "Jun", revenue: 430000, orders: 22, target: 460000 },
      ],
      yearly: {
        revenue: 4950000,
        orders: 178,
        growth: 9.2,
      },
    },
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
  trend?: number
  color?: string
}> = ({ label, value, icon, trend, color = "blue" }) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    teal: "from-teal-500 to-cyan-600",
  }

  return (
    <div className="group rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur-xl transition hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          {trend !== undefined && (
            <div className="mt-1 flex items-center gap-1">
              {trend >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={"text-xs font-medium " + (trend >= 0 ? "text-green-600" : "text-red-600")}>
                {trend >= 0 ? "+" : ""}{trend}%
              </span>
            </div>
          )}
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
export default function SellerDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const sellerId = params.id as string

  const [seller, setSeller] = useState<Seller | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "dealers" | "performance">("overview")

  // ---------- Fetch Data ----------
  useEffect(() => {
    const fetchSeller = async () => {
      setLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        // Find the seller by ID
        const foundSeller = ALL_SELLERS.find((s) => s.id === sellerId)
        
        if (foundSeller) {
          setSeller(foundSeller)
        } else {
          setError("Seller not found")
        }
      } catch (err) {
        setError("Failed to load seller data")
      } finally {
        setLoading(false)
      }
    }

    if (sellerId) {
      fetchSeller()
    }
  }, [sellerId])

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading seller details...</p>
        </div>
      </div>
    )
  }

  // ---------- Error State ----------
  if (error || !seller) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
          <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h2 className="text-xl font-bold text-red-700">Error</h2>
          <p className="mt-2 text-red-600">{error || "Seller not found"}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white transition hover:shadow-lg"
          >
            Go Back
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
          Back to Sellers
        </button>

        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-lg">
                  {seller.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <BadgeCheck className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{seller.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="font-mono">{seller.sellerId}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {seller.area}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {new Date(seller.createdAt).toLocaleDateString("en-IN", {
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
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{seller.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">PIN: {seller.pin}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Manager: {seller.manager}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">TSM: {seller.tsm}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{seller.address}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {seller.stats && (
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <StatCard
              label="Total Orders"
              value={seller.stats.totalOrders}
              icon={<ShoppingBag className="h-5 w-5" />}
              trend={seller.stats.growthRate}
              color="blue"
            />
            <StatCard
              label="Revenue"
              value={"৳" + (seller.stats.totalRevenue / 100000).toFixed(1) + "L"}
              icon={<DollarSign className="h-5 w-5" />}
              color="green"
            />
            <StatCard
              label="Dealers"
              value={seller.stats.totalDealers}
              icon={<Building2 className="h-5 w-5" />}
              color="purple"
            />
            <StatCard
              label="Active Dealers"
              value={seller.stats.activeDealers}
              icon={<Users className="h-5 w-5" />}
              color="teal"
            />
            <StatCard
              label="Conversion Rate"
              value={seller.stats.conversionRate + "%"}
              icon={<Target className="h-5 w-5" />}
              color="orange"
            />
            <StatCard
              label="Avg Order Value"
              value={"৳" + (seller.stats.avgOrderValue / 1000).toFixed(1) + "k"}
              icon={<DollarSign className="h-5 w-5" />}
              color="purple"
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
            onClick={() => setActiveTab("dealers")}
            className={"px-4 py-2 text-sm font-medium transition " + (activeTab === "dealers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700")}
          >
            Assigned Dealers
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={"px-4 py-2 text-sm font-medium transition " + (activeTab === "performance"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700")}
          >
            Performance
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Information */}
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="h-5 w-5 text-blue-600" />
                  Seller Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Seller Name</p>
                      <p className="text-sm font-medium text-gray-800">{seller.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Manager</p>
                      <p className="text-sm font-medium text-gray-800">{seller.manager || "Not assigned"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">TSM (Territory Sales Manager)</p>
                      <p className="text-sm font-medium text-gray-800">{seller.tsm || "Not assigned"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{seller.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">PIN</p>
                      <p className="text-sm font-medium text-gray-800">{seller.pin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-800">{seller.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(seller.createdAt).toLocaleDateString("en-IN", {
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
                {seller.stats && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Target Achievement</span>
                        <span className="font-medium text-gray-800">
                          {Math.min(seller.stats.conversionRate, 100)}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{ width: Math.min(seller.stats.conversionRate, 100) + "%" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-blue-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Total Dealers</p>
                        <p className="text-lg font-bold text-gray-800">{seller.stats.totalDealers}</p>
                      </div>
                      <div className="rounded-xl bg-green-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Active Dealers</p>
                        <p className="text-lg font-bold text-green-700">{seller.stats.activeDealers}</p>
                      </div>
                      <div className="rounded-xl bg-purple-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-lg font-bold text-purple-700">{seller.stats.totalOrders}</p>
                      </div>
                      <div className="rounded-xl bg-orange-50/50 p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-lg font-bold text-orange-700">৳{(seller.stats.totalRevenue / 100000).toFixed(1)}L</p>
                      </div>
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

              {seller.recentOrders && seller.recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200/50 bg-gray-50/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Order #</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Items</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seller.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100/60 transition hover:bg-white/30">
                          <td className="px-4 py-3 font-mono text-sm text-gray-700">{order.orderNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-800">{order.customerName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
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

          {/* Dealers Tab */}
          {activeTab === "dealers" && (
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Building2 className="h-5 w-5 text-blue-600" />
                Assigned Dealers ({seller.assignedDealers?.length || 0})
              </h3>

              {seller.assignedDealers && seller.assignedDealers.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {seller.assignedDealers.map((dealer) => (
                    <div
                      key={dealer.id}
                      className="rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm transition hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{dealer.name}</h4>
                          <p className="text-xs font-mono text-gray-500">{dealer.code}</p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {dealer.area}
                        </p>
                        <p className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          {dealer.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Building2 className="mx-auto mb-3 h-12 w-12 opacity-30" />
                  <p>No dealers assigned</p>
                </div>
              )}
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performance" && seller.performance && (
            <div className="space-y-6">
              {/* Yearly Performance */}
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Yearly Performance
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Growth Rate</span>
                    <span className={"font-semibold " + (seller.performance.yearly.growth >= 0 ? "text-green-600" : "text-red-600")}>
                      {seller.performance.yearly.growth >= 0 ? "+" : ""}{seller.performance.yearly.growth}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-blue-50/50 p-3 backdrop-blur-sm">
                    <p className="text-xs text-gray-500">Total Revenue</p>
                    <p className="text-xl font-bold text-blue-700">
                      ৳{(seller.performance.yearly.revenue / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <div className="rounded-xl bg-purple-50/50 p-3 backdrop-blur-sm">
                    <p className="text-xs text-gray-500">Total Orders</p>
                    <p className="text-xl font-bold text-purple-700">{seller.performance.yearly.orders}</p>
                  </div>
                  <div className="rounded-xl bg-green-50/50 p-3 backdrop-blur-sm">
                    <p className="text-xs text-gray-500">Avg Monthly Revenue</p>
                    <p className="text-xl font-bold text-green-700">
                      ৳{(seller.performance.yearly.revenue / 12 / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Performance */}
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Monthly Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200/50 bg-gray-50/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Month</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Revenue</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Orders</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Target</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Achievement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seller.performance.monthly.map((month) => {
                        const achievement = (month.revenue / month.target) * 100
                        return (
                          <tr key={month.month} className="border-b border-gray-100/60 transition hover:bg-white/30">
                            <td className="px-4 py-3 font-medium text-gray-800">{month.month}</td>
                            <td className="px-4 py-3 text-right text-gray-700">৳{(month.revenue / 1000).toFixed(0)}k</td>
                            <td className="px-4 py-3 text-right text-gray-700">{month.orders}</td>
                            <td className="px-4 py-3 text-right text-gray-700">৳{(month.target / 1000).toFixed(0)}k</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className={"text-sm font-medium " + (achievement >= 80 ? "text-green-600" : achievement >= 60 ? "text-yellow-600" : "text-red-600")}>
                                  {achievement.toFixed(0)}%
                                </span>
                                <div className="w-16 h-1.5 overflow-hidden rounded-full bg-gray-200">
                                  <div
                                    className={"h-full rounded-full " + (achievement >= 80 ? "bg-green-500" : achievement >= 60 ? "bg-yellow-500" : "bg-red-500")}
                                    style={{ width: Math.min(achievement, 100) + "%" }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>
  )
}