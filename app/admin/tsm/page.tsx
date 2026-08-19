
"use client"

import React, { useState, useMemo } from "react"
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  Save,
  Phone,
  Mail,
  MapPin,
  User,
  Building2,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Briefcase,
  DollarSign,
  Users2,
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================
interface TSM {
  id: string
  tsmId: string
  name: string
  email: string
  phone: string
  joinDate: string
  area: string
  manager: string
  performance: {
    target: number
    achieved: number
    conversionRate: number
    totalDealers: number
    activeDealers: number
    orders: number
    revenue: number
  }
  dealers: string[] // Dealer IDs assigned
  rating: number // 1-5
  password?: string
  createdAt: string
}

interface Dealer {
  id: string
  name: string
  code: string
  area: string
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_TSMS: TSM[] = [
  {
    id: "tsm1",
    tsmId: "TSM-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@srbs.com",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    area: "Mumbai Central",
    manager: "Mr. Sharma",
    performance: {
      target: 500000,
      achieved: 485000,
      conversionRate: 78,
      totalDealers: 45,
      activeDealers: 38,
      orders: 234,
      revenue: 485000,
    },
    dealers: ["d1", "d2", "d3"],
    rating: 4.5,
    createdAt: "2023-01-15",
  },
  {
    id: "tsm2",
    tsmId: "TSM-002",
    name: "Priya Sharma",
    email: "priya.sharma@srbs.com",
    phone: "+91 87654 32109",
    joinDate: "2023-03-22",
    area: "Kolkata South",
    manager: "Mr. Verma",
    performance: {
      target: 450000,
      achieved: 420000,
      conversionRate: 72,
      totalDealers: 38,
      activeDealers: 32,
      orders: 189,
      revenue: 420000,
    },
    dealers: ["d4", "d5"],
    rating: 4.2,
    createdAt: "2023-03-22",
  },
  {
    id: "tsm3",
    tsmId: "TSM-003",
    name: "Amit Singh",
    email: "amit.singh@srbs.com",
    phone: "+91 76543 21098",
    joinDate: "2023-06-10",
    area: "Delhi NCR",
    manager: "Mrs. Reddy",
    performance: {
      target: 600000,
      achieved: 380000,
      conversionRate: 65,
      totalDealers: 52,
      activeDealers: 28,
      orders: 156,
      revenue: 380000,
    },
    dealers: ["d6", "d7"],
    rating: 3.8,
    createdAt: "2023-06-10",
  },
  {
    id: "tsm4",
    tsmId: "TSM-004",
    name: "Sneha Reddy",
    email: "sneha.reddy@srbs.com",
    phone: "+91 65432 10987",
    joinDate: "2023-09-05",
    area: "Chennai East",
    manager: "Mr. Gupta",
    performance: {
      target: 550000,
      achieved: 560000,
      conversionRate: 82,
      totalDealers: 48,
      activeDealers: 42,
      orders: 267,
      revenue: 560000,
    },
    dealers: ["d8", "d9", "d10"],
    rating: 4.8,
    createdAt: "2023-09-05",
  },
  {
    id: "tsm5",
    tsmId: "TSM-005",
    name: "Vikram Patel",
    email: "vikram.patel@srbs.com",
    phone: "+91 54321 09876",
    joinDate: "2024-01-20",
    area: "Bangalore West",
    manager: "Mrs. Joshi",
    performance: {
      target: 400000,
      achieved: 250000,
      conversionRate: 60,
      totalDealers: 35,
      activeDealers: 18,
      orders: 98,
      revenue: 250000,
    },
    dealers: ["d11"],
    rating: 3.5,
    createdAt: "2024-01-20",
  },
  {
    id: "tsm6",
    tsmId: "TSM-006",
    name: "Ananya Gupta",
    email: "ananya.gupta@srbs.com",
    phone: "+91 43210 98765",
    joinDate: "2024-03-15",
    area: "Hyderabad North",
    manager: "Mr. Shah",
    performance: {
      target: 480000,
      achieved: 510000,
      conversionRate: 79,
      totalDealers: 42,
      activeDealers: 36,
      orders: 210,
      revenue: 510000,
    },
    dealers: ["d12", "d13"],
    rating: 4.3,
    createdAt: "2024-03-15",
  },
  {
    id: "tsm7",
    tsmId: "TSM-007",
    name: "Manoj Joshi",
    email: "manoj.joshi@srbs.com",
    phone: "+91 32109 87654",
    joinDate: "2024-06-01",
    area: "Pune City",
    manager: "Mrs. Patel",
    performance: {
      target: 520000,
      achieved: 495000,
      conversionRate: 75,
      totalDealers: 40,
      activeDealers: 34,
      orders: 178,
      revenue: 495000,
    },
    dealers: ["d14", "d15"],
    rating: 4.0,
    createdAt: "2024-06-01",
  },
]

const MOCK_DEALERS: Dealer[] = [
  { id: "d1", name: "Mumbai Hardware Stores", code: "D001", area: "Mumbai Central" },
  { id: "d2", name: "Kolkata Building Materials", code: "D002", area: "Kolkata South" },
  { id: "d3", name: "Delhi Construction Supplies", code: "D003", area: "Delhi NCR" },
  { id: "d4", name: "Chennai Paint House", code: "D004", area: "Chennai East" },
  { id: "d5", name: "Bangalore Admixture Co", code: "D005", area: "Bangalore West" },
  { id: "d6", name: "Hyderabad Paint Traders", code: "D006", area: "Hyderabad North" },
  { id: "d7", name: "Pune Construction Materials", code: "D007", area: "Pune City" },
  { id: "d8", name: "Chennai Steel Suppliers", code: "D008", area: "Chennai East" },
  { id: "d9", name: "Bangalore Cement Traders", code: "D009", area: "Bangalore West" },
  { id: "d10", name: "Hyderabad Building Solutions", code: "D010", area: "Hyderabad North" },
  { id: "d11", name: "Mumbai Paint Distributors", code: "D011", area: "Mumbai Central" },
  { id: "d12", name: "Delhi Hardware Mart", code: "D012", area: "Delhi NCR" },
  { id: "d13", name: "Kolkata Steel House", code: "D013", area: "Kolkata South" },
  { id: "d14", name: "Pune Admixture Suppliers", code: "D014", area: "Pune City" },
  { id: "d15", name: "Mumbai Construction Co", code: "D015", area: "Mumbai Central" },
]

// Available areas
const AVAILABLE_AREAS = [
  "Mumbai Central",
  "Kolkata South",
  "Delhi NCR",
  "Chennai East",
  "Bangalore West",
  "Hyderabad North",
  "Pune City",
]

// Available managers
const AVAILABLE_MANAGERS = [
  "Mr. Sharma",
  "Mr. Verma",
  "Mrs. Reddy",
  "Mr. Gupta",
  "Mrs. Joshi",
  "Mr. Shah",
  "Mrs. Patel",
]

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TSMPage() {
  // ---------- State ----------
  const [tsms, setTsms] = useState<TSM[]>(MOCK_TSMS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState<string>("all")
  const [managerFilter, setManagerFilter] = useState<string>("all")

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingTSM, setEditingTSM] = useState<TSM | null>(null)
  const [formData, setFormData] = useState<Omit<TSM, "id" | "createdAt" | "performance">>({
    tsmId: "",
    name: "",
    email: "",
    phone: "",
    joinDate: "",
    area: "",
    manager: "",
    dealers: [],
    rating: 0,
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalSuccess, setModalSuccess] = useState(false)

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TSM | null>(null)

  // ---------- Derived ----------
  const filteredTSMs = useMemo(() => {
    let result = tsms

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tsmId.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.phone.includes(q) ||
          t.area.toLowerCase().includes(q) ||
          t.manager.toLowerCase().includes(q)
      )
    }

    if (areaFilter !== "all") {
      result = result.filter((t) => t.area === areaFilter)
    }

    if (managerFilter !== "all") {
      result = result.filter((t) => t.manager === managerFilter)
    }

    return result
  }, [tsms, searchTerm, areaFilter, managerFilter])

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingTSM(null)
    setFormData({
      tsmId: `TSM-${String(tsms.length + 1).padStart(3, "0")}`,
      name: "",
      email: "",
      phone: "",
      joinDate: new Date().toISOString().split("T")[0],
      area: "",
      manager: "",
      dealers: [],
      rating: 0,
      password: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleEdit = (tsm: TSM) => {
    setEditingTSM(tsm)
    setFormData({
      tsmId: tsm.tsmId,
      name: tsm.name,
      email: tsm.email,
      phone: tsm.phone,
      joinDate: tsm.joinDate,
      area: tsm.area,
      manager: tsm.manager,
      dealers: tsm.dealers,
      rating: tsm.rating,
      password: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleDelete = (tsm: TSM) => {
    setDeleteTarget(tsm)
    setShowDeleteConfirm(true)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setModalError("Name is required")
      return
    }
    if (!formData.email.trim()) {
      setModalError("Email is required")
      return
    }
    if (!formData.phone.trim()) {
      setModalError("Phone is required")
      return
    }
    if (!formData.area.trim()) {
      setModalError("Area is required")
      return
    }
    if (!formData.manager.trim()) {
      setModalError("Manager is required")
      return
    }
    if (!editingTSM && !formData.password?.trim()) {
      setModalError("Password is required for new TSM")
      return
    }
    if (!editingTSM && formData.password && formData.password.length < 4) {
      setModalError("Password must be at least 4 characters")
      return
    }

    setIsSubmitting(true)
    setModalError(null)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (editingTSM) {
      const updatedData: Partial<TSM> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        joinDate: formData.joinDate,
        area: formData.area,
        manager: formData.manager,
        dealers: formData.dealers,
        rating: formData.rating,
      }
      if (formData.password && formData.password.trim()) {
        updatedData.password = formData.password
      }

      setTsms((prev) =>
        prev.map((t) =>
          t.id === editingTSM.id
            ? {
                ...t,
                ...updatedData,
              }
            : t
        )
      )
    } else {
      const newTSM: TSM = {
        id: `tsm${Date.now()}`,
        tsmId: formData.tsmId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        joinDate: formData.joinDate,
        area: formData.area,
        manager: formData.manager,
        performance: {
          target: 0,
          achieved: 0,
          conversionRate: 0,
          totalDealers: 0,
          activeDealers: 0,
          orders: 0,
          revenue: 0,
        },
        dealers: formData.dealers || [],
        rating: formData.rating || 0,
        password: formData.password,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTsms((prev) => [newTSM, ...prev])
    }

    setIsSubmitting(false)
    setModalSuccess(true)
    setTimeout(() => {
      setShowModal(false)
      setModalSuccess(false)
    }, 1500)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((resolve) => setTimeout(resolve, 500))
    setTsms((prev) => prev.filter((t) => t.id !== deleteTarget.id))
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTSM(null)
    setModalError(null)
    setModalSuccess(false)
  }

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading TSM data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
          <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h2 className="text-xl font-bold text-red-700">Error</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 text-white transition hover:shadow-lg"
          >
            Retry
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
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl md:rounded-3xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg">
                <Users className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  TSM Management
                </h1>
                <p className="text-sm text-gray-600">Manage Territory Sales Managers</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className=" cursor-pointer flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              Add TSM
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-4 shadow-2xl backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, email, phone, area or manager..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pl-10 pr-4 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Areas</option>
                {AVAILABLE_AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <select
                value={managerFilter}
                onChange={(e) => setManagerFilter(e.target.value)}
                className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Managers</option>
                {AVAILABLE_MANAGERS.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setAreaFilter("all")
                  setManagerFilter("all")
                }}
                className="flex items-center gap-1 rounded-xl bg-gray-200/70 px-4 py-2 text-sm backdrop-blur-sm transition hover:bg-gray-300/70"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* TSM Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTSMs.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/50 bg-white/70 p-12 text-center shadow-2xl backdrop-blur-xl">
              <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">No TSM found</p>
            </div>
          ) : (
            filteredTSMs.map((tsm) => {
              const progress = (tsm.performance.achieved / tsm.performance.target) * 100

              return (
                <div
                  key={tsm.id}
                  className="group rounded-2xl border border-white/50 bg-white/70 p-5 shadow-xl backdrop-blur-xl transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                        {tsm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{tsm.name}</h3>
                        <p className="text-xs font-mono text-gray-500">{tsm.tsmId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(tsm)}
                        className="rounded-lg p-1.5 text-indigo-600 transition hover:bg-indigo-100 cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tsm)}
                        className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-100 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      <span className="truncate">{tsm.email}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      <span>{tsm.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{tsm.area}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                      <span>Manager: {tsm.manager}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      <span>Joined: {new Date(tsm.joinDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</span>
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-200/50 pt-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-bold text-gray-800">
                        ৳{(tsm.performance.revenue / 1000).toFixed(1)}k
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="text-sm font-bold text-gray-800">{tsm.performance.orders}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Dealers</p>
                      <p className="text-sm font-bold text-gray-800">{tsm.performance.activeDealers}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Target Achievement</span>
                      <span>{Math.min(progress, 100).toFixed(0)}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                        style={{ width: Math.min(progress, 100) + "%" }}
                      />
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Users className="h-5 w-5 text-blue-600" />
                {editingTSM ? "Edit TSM" : "Add New TSM"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    TSM ID
                  </label>
                  <input
                    type="text"
                    value={formData.tsmId}
                    onChange={(e) => setFormData({ ...formData, tsmId: e.target.value })}
                    placeholder="e.g., TSM-001"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Rajesh Kumar"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tsm@srbs.com"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 pl-10 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
                   <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  PIN 
                  {editingTSM && <span className="text-xs text-gray-400"> (Leave blank to keep current)</span>}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingTSM ? "New password (optional)" : "Enter password"}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required={!editingTSM}
                    minLength={4}
                  />
                </div>
                {!editingTSM && (
                  <p className="mt-1 text-xs text-gray-500">Minimum 4 characters</p>
                )}
              </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  >
                    <option value="">Select Area</option>
                    {AVAILABLE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Manager
                  </label>
                  <select
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  >
                    <option value="">Select Manager</option>
                    {AVAILABLE_MANAGERS.map((manager) => (
                      <option key={manager} value={manager}>
                        {manager}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

             
           

              {modalError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{editingTSM ? "TSM updated successfully!" : "TSM added successfully!"}</span>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {editingTSM ? "Update" : "Add"} TSM
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">{deleteTarget.name}</span>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-xl bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete TSM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}