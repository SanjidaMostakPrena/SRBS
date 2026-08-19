
"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  MapPin,
  Edit,
  Trash2,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  User,
  FileText,
  Printer,
  Share2,
  BadgeCheck,
  BarChart3,
  Target,
  Clock,
  Package,
  PieChart,
  Briefcase,
  UserCog,
  Store,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

// ============================================================
// TYPES
// ============================================================
interface Area {
  id: string
  name: string
  code: string
  stats?: {
    areaManager: number
    tsm: number
    sellers: number
    dealers: number
    totalOrders: number
    totalRevenue: number
    growthRate: number
    avgOrderValue: number
    targetAchievement: number
  }
  dealers?: Dealer[]
  areaManagers?: AreaManager[]
  tsms?: TSM[]
  sellersList?: Seller[]
  performance?: {
    monthly: MonthlyPerformance[]
    yearly: YearlyPerformance
  }
  recentOrders?: Order[]
}

interface Dealer {
  id: string
  name: string
  code: string
  contactPerson: string
  phone: string
  status: "active" | "inactive"
  joinedDate: string
  area?: string
}

interface AreaManager {
  id: string
  name: string
  email: string
  phone: string
  dealers: number
  status: "active" | "inactive"
}

interface TSM {
  id: string
  name: string
  email: string
  phone: string
  region: string
  status: "active" | "inactive"
}

interface Seller {
  id: string
  name: string
  email: string
  phone: string
  dealerCode: string
  status: "active" | "inactive"
}

interface Order {
  id: string
  orderNumber: string
  dealerName: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: number
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
// ALL AREAS DATA
// ============================================================
const ALL_AREAS: Record<string, Area> = {
  "a1": {
    id: "a1",
    name: "Mumbai Central",
    code: "MUM-001",
    stats: {
      areaManager: 3,
      tsm: 6,
      sellers: 42,
      dealers: 45,
      totalOrders: 234,
      totalRevenue: 4850000,
      growthRate: 12.5,
      avgOrderValue: 20726,
      targetAchievement: 78,
    },
    areaManagers: [
      { id: "am1", name: "Rahul Sharma", email: "rahul.s@company.com", phone: "+91 98765 43210", dealers: 15, status: "active" },
      { id: "am2", name: "Priya Patel", email: "priya.p@company.com", phone: "+91 98765 43211", dealers: 18, status: "active" },
      { id: "am3", name: "Amit Kumar", email: "amit.k@company.com", phone: "+91 98765 43212", dealers: 12, status: "inactive" },
    ],
    tsms: [
      { id: "t1", name: "Sneha Reddy", email: "sneha.r@company.com", phone: "+91 87654 32109", region: "South Mumbai", status: "active" },
      { id: "t2", name: "Vikram Singh", email: "vikram.s@company.com", phone: "+91 87654 32110", region: "North Mumbai", status: "active" },
      { id: "t3", name: "Ananya Desai", email: "ananya.d@company.com", phone: "+91 87654 32111", region: "East Mumbai", status: "active" },
      { id: "t4", name: "Ravi Kumar", email: "ravi.k@company.com", phone: "+91 87654 32112", region: "West Mumbai", status: "inactive" },
      { id: "t5", name: "Meera Nair", email: "meera.n@company.com", phone: "+91 87654 32113", region: "Central Mumbai", status: "active" },
      { id: "t6", name: "Deepak Gupta", email: "deepak.g@company.com", phone: "+91 87654 32114", region: "South Mumbai", status: "active" },
    ],
    sellersList: [
      { id: "s1", name: "Rohit Jain", email: "rohit.j@company.com", phone: "+91 76543 21098", dealerCode: "D001", status: "active" },
      { id: "s2", name: "Neha Singh", email: "neha.s@company.com", phone: "+91 76543 21099", dealerCode: "D001", status: "active" },
      { id: "s3", name: "Arun Sharma", email: "arun.s@company.com", phone: "+91 76543 21100", dealerCode: "D002", status: "active" },
      { id: "s4", name: "Pooja Patel", email: "pooja.p@company.com", phone: "+91 76543 21101", dealerCode: "D003", status: "inactive" },
      { id: "s5", name: "Sanjay Gupta", email: "sanjay.g@company.com", phone: "+91 76543 21102", dealerCode: "D004", status: "active" },
    ],
    dealers: [
      { id: "d1", name: "Mumbai Hardware Stores", code: "D001", contactPerson: "Rajesh Sharma", phone: "+91 98765 43210", status: "active", joinedDate: "2023-01-15" },
      { id: "d2", name: "Mumbai Paint Distributors", code: "D011", contactPerson: "Amit Kumar", phone: "+91 98765 43211", status: "active", joinedDate: "2023-06-20" },
      { id: "d3", name: "Mumbai Steel Suppliers", code: "D021", contactPerson: "Vikram Singh", phone: "+91 98765 43212", status: "inactive", joinedDate: "2023-08-10" },
    ],
    recentOrders: [
      { id: "ord-001", orderNumber: "ORD-2026-001", dealerName: "Mumbai Hardware Stores", amount: 20300, status: "delivered", date: "2026-01-15", items: 2 },
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
  "a2": {
    id: "a2",
    name: "Kolkata South",
    code: "KOL-002",
    stats: {
      areaManager: 2,
      tsm: 4,
      sellers: 28,
      dealers: 38,
      totalOrders: 189,
      totalRevenue: 4200000,
      growthRate: 8.3,
      avgOrderValue: 22222,
      targetAchievement: 72,
    },
    areaManagers: [
      { id: "am4", name: "Sudipta Das", email: "sudipta.d@company.com", phone: "+91 98765 43213", dealers: 20, status: "active" },
      { id: "am5", name: "Anjali Roy", email: "anjali.r@company.com", phone: "+91 98765 43214", dealers: 18, status: "active" },
    ],
    tsms: [
      { id: "t7", name: "Subhankar Sen", email: "subhankar.s@company.com", phone: "+91 87654 32115", region: "South Kolkata", status: "active" },
      { id: "t8", name: "Rina Das", email: "rina.d@company.com", phone: "+91 87654 32116", region: "North Kolkata", status: "active" },
    ],
    sellersList: [
      { id: "s6", name: "Sourav Ghosh", email: "sourav.g@company.com", phone: "+91 76543 21103", dealerCode: "D002", status: "active" },
      { id: "s7", name: "Mousumi Sen", email: "mousumi.s@company.com", phone: "+91 76543 21104", dealerCode: "D003", status: "active" },
    ],
    dealers: [
      { id: "d4", name: "Kolkata Building Materials", code: "D002", contactPerson: "Sneha Das", phone: "+91 87654 32109", status: "active", joinedDate: "2023-03-22" },
    ],
    recentOrders: [
      { id: "ord-004", orderNumber: "ORD-2026-002", dealerName: "Kolkata Building Materials", amount: 13750, status: "shipped", date: "2026-02-10", items: 1 },
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
  "a3": {
    id: "a3",
    name: "Delhi NCR",
    code: "DEL-003",
    stats: {
      areaManager: 4,
      tsm: 5,
      sellers: 35,
      dealers: 52,
      totalOrders: 156,
      totalRevenue: 3800000,
      growthRate: -2.5,
      avgOrderValue: 24358,
      targetAchievement: 65,
    },
    areaManagers: [],
    tsms: [],
    sellersList: [],
    dealers: [],
    recentOrders: [],
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
  "a4": {
    id: "a4",
    name: "Chennai East",
    code: "CHE-004",
    stats: {
      areaManager: 3,
      tsm: 7,
      sellers: 38,
      dealers: 48,
      totalOrders: 267,
      totalRevenue: 5600000,
      growthRate: 15.2,
      avgOrderValue: 20973,
      targetAchievement: 82,
    },
    areaManagers: [],
    tsms: [],
    sellersList: [],
    dealers: [],
    recentOrders: [],
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
  "a5": {
    id: "a5",
    name: "Bangalore West",
    code: "BAN-005",
    stats: {
      areaManager: 2,
      tsm: 3,
      sellers: 20,
      dealers: 35,
      totalOrders: 98,
      totalRevenue: 2500000,
      growthRate: -5.3,
      avgOrderValue: 25510,
      targetAchievement: 60,
    },
    areaManagers: [],
    tsms: [],
    sellersList: [],
    dealers: [],
    recentOrders: [],
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
  "a6": {
    id: "a6",
    name: "Hyderabad North",
    code: "HYD-006",
    stats: {
      areaManager: 3,
      tsm: 6,
      sellers: 32,
      dealers: 42,
      totalOrders: 210,
      totalRevenue: 5100000,
      growthRate: 10.8,
      avgOrderValue: 24285,
      targetAchievement: 79,
    },
    areaManagers: [],
    tsms: [],
    sellersList: [],
    dealers: [],
    recentOrders: [],
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
  "a7": {
    id: "a7",
    name: "Pune City",
    code: "PUN-007",
    stats: {
      areaManager: 2,
      tsm: 5,
      sellers: 30,
      dealers: 40,
      totalOrders: 178,
      totalRevenue: 4950000,
      growthRate: 9.2,
      avgOrderValue: 27808,
      targetAchievement: 75,
    },
    areaManagers: [],
    tsms: [],
    sellersList: [],
    dealers: [],
    recentOrders: [],
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
}

// ============================================================
// STATUS BADGE
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
// STAT CARD (Clickable)
// ============================================================
const StatCard: React.FC<{
  label: string
  value: string | number
  icon: React.ReactNode
  color?: string
  onClick?: () => void
  isActive?: boolean
}> = ({ label, value, icon, color = "blue", onClick, isActive = false }) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
    teal: "from-teal-500 to-cyan-600",
    rose: "from-rose-500 to-pink-600",
  }

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl hover:scale-[1.02] ${
        isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            Click to view details
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
        <div className={"rounded-xl bg-gradient-to-br " + colorMap[color] + " p-2.5 text-white shadow-lg"}>
          {icon}
        </div>
      </div>
    </button>
  )
}

// ============================================================
// LIST VIEW COMPONENTS
// ============================================================
const AreaManagerList: React.FC<{ managers: AreaManager[]; onClose: () => void }> = ({ managers, onClose }) => {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <UserCog className="h-5 w-5 text-blue-600" />
          Area Managers ({managers.length})
        </h3>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 transition">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      {managers.length > 0 ? (
        <div className="grid gap-3">
          {managers.map((manager) => (
            <div key={manager.id} className="flex items-center justify-between rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm">
              <div>
                <p className="font-semibold text-gray-800">{manager.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{manager.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{manager.phone}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-700">{manager.dealers} Dealers</span>
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          <UserCog className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>No area managers found</p>
        </div>
      )}
    </div>
  )
}

const TSMList: React.FC<{ tsms: TSM[]; onClose: () => void }> = ({ tsms, onClose }) => {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Briefcase className="h-5 w-5 text-purple-600" />
          TSM List ({tsms.length})
        </h3>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 transition">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      {tsms.length > 0 ? (
        <div className="grid gap-3">
          {tsms.map((tsm) => (
            <div key={tsm.id} className="flex items-center justify-between rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm">
              <div>
                <p className="font-semibold text-gray-800">{tsm.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{tsm.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{tsm.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tsm.region}</span>
                </div>
              </div>
            
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          <Briefcase className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>No TSM found</p>
        </div>
      )}
    </div>
  )
}

const SellerList: React.FC<{ sellers: Seller[]; onClose: () => void }> = ({ sellers, onClose }) => {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <User className="h-5 w-5 text-green-600" />
          Sellers ({sellers.length})
        </h3>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 transition">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      {sellers.length > 0 ? (
        <div className="grid gap-3">
          {sellers.map((seller) => (
            <div key={seller.id} className="flex items-center justify-between rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm">
              <div>
                <p className="font-semibold text-gray-800">{seller.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{seller.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{seller.phone}</span>
                  <span className="flex items-center gap-1"><Store className="h-3.5 w-3.5" />Dealer: {seller.dealerCode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          <User className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>No sellers found</p>
        </div>
      )}
    </div>
  )
}

const DealerList: React.FC<{ dealers: Dealer[]; onClose: () => void }> = ({ dealers, onClose }) => {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Store className="h-5 w-5 text-orange-600" />
          Dealers ({dealers.length})
        </h3>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 transition">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      {dealers.length > 0 ? (
        <div className="grid gap-3">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="flex items-center justify-between rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm">
              <div>
                <p className="font-semibold text-gray-800">{dealer.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{dealer.contactPerson}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{dealer.phone}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(dealer.joinedDate).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          <Store className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>No dealers found</p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AreaDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const areaId = params.id as string

  const [area, setArea] = useState<Area | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeList, setActiveList] = useState<"areaManager" | "tsm" | "sellers" | "dealers" | null>(null)

  useEffect(() => {
    const fetchArea = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundArea = ALL_AREAS[areaId]
        if (foundArea) {
          setArea(foundArea)
        } else {
          setError("Area not found")
        }
      } catch (err) {
        setError("Failed to load area data")
      } finally {
        setLoading(false)
      }
    }

    if (areaId) {
      fetchArea()
    }
  }, [areaId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading area details...</p>
        </div>
      </div>
    )
  }

  if (error || !area) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
          <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h2 className="text-xl font-bold text-red-700">Error</h2>
          <p className="mt-2 text-red-600">{error || "Area not found"}</p>
          <button onClick={() => router.back()} className="mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white transition hover:shadow-lg">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const renderList = () => {
    switch (activeList) {
      case "areaManager":
        return <AreaManagerList managers={area.areaManagers || []} onClose={() => setActiveList(null)} />
      case "tsm":
        return <TSMList tsms={area.tsms || []} onClose={() => setActiveList(null)} />
      case "sellers":
        return <SellerList sellers={area.sellersList || []} onClose={() => setActiveList(null)} />
      case "dealers":
        return <DealerList dealers={area.dealers || []} onClose={() => setActiveList(null)} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition hover:bg-white/90 hover:shadow-xl">
          <ArrowLeft className="h-4 w-4" />
          Back to Areas
        </button>

        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-lg">
                  {area.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{area.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="font-mono">{area.code}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1">
                    <Store className="h-3.5 w-3.5" />
                    {area.stats?.dealers || 0} Dealers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Clickable Cards */}
        {area.stats && (
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard
              label="Area Manager"
              value={area.stats.areaManager}
              icon={<UserCog className="h-5 w-5" />}
              color="blue"
              onClick={() => setActiveList(activeList === "areaManager" ? null : "areaManager")}
              isActive={activeList === "areaManager"}
            />
            <StatCard
              label="TSM"
              value={area.stats.tsm}
              icon={<Briefcase className="h-5 w-5" />}
              color="purple"
              onClick={() => setActiveList(activeList === "tsm" ? null : "tsm")}
              isActive={activeList === "tsm"}
            />
            <StatCard
              label="Sellers"
              value={area.stats.sellers}
              icon={<User className="h-5 w-5" />}
              color="green"
              onClick={() => setActiveList(activeList === "sellers" ? null : "sellers")}
              isActive={activeList === "sellers"}
            />
            <StatCard
              label="Dealers"
              value={area.stats.dealers}
              icon={<Store className="h-5 w-5" />}
              color="orange"
              onClick={() => setActiveList(activeList === "dealers" ? null : "dealers")}
              isActive={activeList === "dealers"}
            />
          </div>
        )}

        {/* Dynamic List View */}
        {activeList && (
          <div className="mb-6 animate-in slide-in-from-top-4 duration-300">
            {renderList()}
          </div>
        )}

      
      </div>
    </div>
  )
}

// ============================================================
// MAIL ICON (since we're using it in lists)
// ============================================================
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)