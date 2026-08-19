
"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Loader2,
  Save,
  Phone,
  Mail,
  MapPin,
  User,
  Building2,
  Award,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  BadgeCheck,
  Briefcase,
  FileText,
  DollarSign,
  PieChart,
  Activity,
  Users2,
  Settings,
  Truck,
  Package,
  ClipboardCheck,
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================
interface AreaManager {
  id: string
  managerId: string
  name: string
  email: string
  phone: string
  address: string
  tsm: string
  manager: string
  assignedAreas: string[]
  joinDate: string
  performance: {
    target: number
    achieved: number
    conversionRate: number
    totalDealers: number
    activeDealers: number
    orders: number
    revenue: number
    paintSales: number
    admixtureSales: number
  }
  products: {
    paint: {
      total: number
      categories: {
        emulsion: number
        enamel: number
        primer: number
        texture: number
      }
    }
    admixture: {
      total: number
      types: {
        waterproofing: number
        concrete: number
        plaster: number
        tileAdhesive: number
      }
    }
  }
  rating: number
  dealers: string[]
  password?: string
  createdAt: string
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_MANAGERS: AreaManager[] = [
  {
    id: "am1",
    managerId: "AM-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@srbs.com",
    phone: "+91 98765 43210",
    address: "123, BKC Complex, Mumbai",
    tsm: "Mr. Sharma",
    manager: "Mrs. Patel",
    assignedAreas: ["Mumbai Central", "Pune City"],
    joinDate: "2023-01-15",
    performance: {
      target: 500000,
      achieved: 485000,
      conversionRate: 78,
      totalDealers: 45,
      activeDealers: 38,
      orders: 234,
      revenue: 485000,
      paintSales: 285000,
      admixtureSales: 200000,
    },
    products: {
      paint: {
        total: 285000,
        categories: {
          emulsion: 120000,
          enamel: 65000,
          primer: 55000,
          texture: 45000,
        },
      },
      admixture: {
        total: 200000,
        types: {
          waterproofing: 80000,
          concrete: 50000,
          plaster: 40000,
          tileAdhesive: 30000,
        },
      },
    },
    dealers: ["d1", "d2", "d3"],
    rating: 4.5,
    createdAt: "2023-01-15",
  },
  {
    id: "am2",
    managerId: "AM-002",
    name: "Priya Sharma",
    email: "priya.sharma@srbs.com",
    phone: "+91 87654 32109",
    address: "456, Park Street, Kolkata",
    tsm: "Mr. Verma",
    manager: "Mr. Singh",
    assignedAreas: ["Kolkata South"],
    joinDate: "2023-03-22",
    performance: {
      target: 450000,
      achieved: 420000,
      conversionRate: 72,
      totalDealers: 38,
      activeDealers: 32,
      orders: 189,
      revenue: 420000,
      paintSales: 250000,
      admixtureSales: 170000,
    },
    products: {
      paint: {
        total: 250000,
        categories: {
          emulsion: 100000,
          enamel: 60000,
          primer: 50000,
          texture: 40000,
        },
      },
      admixture: {
        total: 170000,
        types: {
          waterproofing: 70000,
          concrete: 45000,
          plaster: 35000,
          tileAdhesive: 20000,
        },
      },
    },
    dealers: ["d4", "d5"],
    rating: 4.2,
    createdAt: "2023-03-22",
  },
  {
    id: "am3",
    managerId: "AM-003",
    name: "Amit Singh",
    email: "amit.singh@srbs.com",
    phone: "+91 76543 21098",
    address: "789, Connaught Place, Delhi",
    tsm: "Mrs. Reddy",
    manager: "Mr. Kumar",
    assignedAreas: ["Delhi NCR"],
    joinDate: "2023-06-10",
    performance: {
      target: 600000,
      achieved: 380000,
      conversionRate: 65,
      totalDealers: 52,
      activeDealers: 28,
      orders: 156,
      revenue: 380000,
      paintSales: 220000,
      admixtureSales: 160000,
    },
    products: {
      paint: {
        total: 220000,
        categories: {
          emulsion: 90000,
          enamel: 55000,
          primer: 45000,
          texture: 30000,
        },
      },
      admixture: {
        total: 160000,
        types: {
          waterproofing: 65000,
          concrete: 40000,
          plaster: 35000,
          tileAdhesive: 20000,
        },
      },
    },
    dealers: ["d6", "d7"],
    rating: 3.8,
    createdAt: "2023-06-10",
  },
  {
    id: "am4",
    managerId: "AM-004",
    name: "Sneha Reddy",
    email: "sneha.reddy@srbs.com",
    phone: "+91 65432 10987",
    address: "101, Anna Nagar, Chennai",
    tsm: "Mr. Gupta",
    manager: "Mrs. Sharma",
    assignedAreas: ["Chennai East", "Bangalore West"],
    joinDate: "2023-09-05",
    performance: {
      target: 550000,
      achieved: 560000,
      conversionRate: 82,
      totalDealers: 48,
      activeDealers: 42,
      orders: 267,
      revenue: 560000,
      paintSales: 330000,
      admixtureSales: 230000,
    },
    products: {
      paint: {
        total: 330000,
        categories: {
          emulsion: 140000,
          enamel: 75000,
          primer: 60000,
          texture: 55000,
        },
      },
      admixture: {
        total: 230000,
        types: {
          waterproofing: 95000,
          concrete: 60000,
          plaster: 45000,
          tileAdhesive: 30000,
        },
      },
    },
    dealers: ["d8", "d9", "d10"],
    rating: 4.8,
    createdAt: "2023-09-05",
  },
  {
    id: "am5",
    managerId: "AM-005",
    name: "Vikram Patel",
    email: "vikram.patel@srbs.com",
    phone: "+91 54321 09876",
    address: "202, MG Road, Bangalore",
    tsm: "Mrs. Joshi",
    manager: "Mr. Mehta",
    assignedAreas: ["Bangalore West"],
    joinDate: "2024-01-20",
    performance: {
      target: 400000,
      achieved: 250000,
      conversionRate: 60,
      totalDealers: 35,
      activeDealers: 18,
      orders: 98,
      revenue: 250000,
      paintSales: 150000,
      admixtureSales: 100000,
    },
    products: {
      paint: {
        total: 150000,
        categories: {
          emulsion: 60000,
          enamel: 40000,
          primer: 30000,
          texture: 20000,
        },
      },
      admixture: {
        total: 100000,
        types: {
          waterproofing: 40000,
          concrete: 25000,
          plaster: 20000,
          tileAdhesive: 15000,
        },
      },
    },
    dealers: ["d11"],
    rating: 3.5,
    createdAt: "2024-01-20",
  },
  {
    id: "am6",
    managerId: "AM-006",
    name: "Ananya Gupta",
    email: "ananya.gupta@srbs.com",
    phone: "+91 43210 98765",
    address: "303, Jubilee Hills, Hyderabad",
    tsm: "Mr. Shah",
    manager: "Mrs. Desai",
    assignedAreas: ["Hyderabad North"],
    joinDate: "2024-03-15",
    performance: {
      target: 480000,
      achieved: 510000,
      conversionRate: 79,
      totalDealers: 42,
      activeDealers: 36,
      orders: 210,
      revenue: 510000,
      paintSales: 300000,
      admixtureSales: 210000,
    },
    products: {
      paint: {
        total: 300000,
        categories: {
          emulsion: 130000,
          enamel: 70000,
          primer: 55000,
          texture: 45000,
        },
      },
      admixture: {
        total: 210000,
        types: {
          waterproofing: 85000,
          concrete: 55000,
          plaster: 40000,
          tileAdhesive: 30000,
        },
      },
    },
    dealers: ["d12", "d13"],
    rating: 4.3,
    createdAt: "2024-03-15",
  },
  {
    id: "am7",
    managerId: "AM-007",
    name: "Manoj Joshi",
    email: "manoj.joshi@srbs.com",
    phone: "+91 32109 87654",
    address: "404, FC Road, Pune",
    tsm: "Mrs. Patel",
    manager: "Mr. Singh",
    assignedAreas: ["Pune City"],
    joinDate: "2024-06-01",
    performance: {
      target: 520000,
      achieved: 495000,
      conversionRate: 75,
      totalDealers: 40,
      activeDealers: 34,
      orders: 178,
      revenue: 495000,
      paintSales: 295000,
      admixtureSales: 200000,
    },
    products: {
      paint: {
        total: 295000,
        categories: {
          emulsion: 125000,
          enamel: 68000,
          primer: 52000,
          texture: 50000,
        },
      },
      admixture: {
        total: 200000,
        types: {
          waterproofing: 82000,
          concrete: 48000,
          plaster: 42000,
          tileAdhesive: 28000,
        },
      },
    },
    dealers: ["d14", "d15"],
    rating: 4.0,
    createdAt: "2024-06-01",
  },
]

// Available areas
const AREAS = [
  "Mumbai Central",
  "Kolkata South",
  "Delhi NCR",
  "Chennai East",
  "Bangalore West",
  "Hyderabad North",
  "Pune City",
]

// Available TSM options
const AVAILABLE_TSM = [
  "Mr. Sharma",
  "Mr. Verma",
  "Mrs. Reddy",
  "Mr. Gupta",
  "Mrs. Joshi",
  "Mr. Shah",
  "Mrs. Patel",
]

// Available Manager options
const AVAILABLE_MANAGER = [
  "Mrs. Patel",
  "Mr. Singh",
  "Mr. Kumar",
  "Mrs. Sharma",
  "Mr. Mehta",
  "Mrs. Desai",
]

// Get unique TSM from managers
const TSM_OPTIONS = Array.from(new Set(MOCK_MANAGERS.map(m => m.tsm)))
const MANAGER_OPTIONS = Array.from(new Set(MOCK_MANAGERS.map(m => m.manager)))

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AreaManagersPage() {
  // ---------- State ----------
  const [managers, setManagers] = useState<AreaManager[]>(MOCK_MANAGERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState<string>("all")
  const [tsmFilter, setTsmFilter] = useState<string>("all")
  const [managerFilter, setManagerFilter] = useState<string>("all")

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingManager, setEditingManager] = useState<AreaManager | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalSuccess, setModalSuccess] = useState(false)

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AreaManager | null>(null)

  // View modal
  const [selectedManager, setSelectedManager] = useState<AreaManager | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)

  // Get unique areas from assignedAreas
  const uniqueAreas = useMemo(() => {
    const allAreas = managers.flatMap(m => m.assignedAreas)
    return Array.from(new Set(allAreas))
  }, [managers])

  // ---------- Derived ----------
  const filteredManagers = useMemo(() => {
    let result = managers

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.managerId.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.phone.includes(q) ||
          m.tsm.toLowerCase().includes(q) ||
          m.manager.toLowerCase().includes(q)
      )
    }

    if (areaFilter !== "all") {
      result = result.filter((m) => m.assignedAreas.includes(areaFilter))
    }

    if (tsmFilter !== "all") {
      result = result.filter((m) => m.tsm === tsmFilter)
    }

    if (managerFilter !== "all") {
      result = result.filter((m) => m.manager === managerFilter)
    }

    return result
  }, [managers, searchTerm, areaFilter, tsmFilter, managerFilter])

  // Stats
  const stats = useMemo(() => {
    const total = managers.length
    const avgRating = managers.reduce((sum, m) => sum + m.rating, 0) / total
    const totalRevenue = managers.reduce((sum, m) => sum + m.performance.revenue, 0)
    const totalOrders = managers.reduce((sum, m) => sum + m.performance.orders, 0)
    const totalPaintSales = managers.reduce((sum, m) => sum + m.performance.paintSales, 0)
    const totalAdmixtureSales = managers.reduce((sum, m) => sum + m.performance.admixtureSales, 0)

    return { total, avgRating, totalRevenue, totalOrders, totalPaintSales, totalAdmixtureSales }
  }, [managers])

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingManager(null)
    setFormData({
      managerId: `AM-${String(managers.length + 1).padStart(3, "0")}`,
      name: "",
      email: "",
      phone: "",
      address: "",
      tsm: "",
      manager: "",
      assignedAreas: [],
      joinDate: new Date().toISOString().split("T")[0],
      rating: 0,
      password: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleEdit = (manager: AreaManager) => {
    setEditingManager(manager)
    setFormData({
      managerId: manager.managerId,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      address: manager.address,
      tsm: manager.tsm,
      manager: manager.manager,
      assignedAreas: manager.assignedAreas,
      joinDate: manager.joinDate,
      rating: manager.rating,
      password: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleView = (manager: AreaManager) => {
    setSelectedManager(manager)
    setShowViewModal(true)
  }

  const handleDelete = (manager: AreaManager) => {
    setDeleteTarget(manager)
    setShowDeleteConfirm(true)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validation
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
    if (!formData.tsm.trim()) {
      setModalError("TSM is required")
      return
    }
    if (!formData.manager.trim()) {
      setModalError("Manager is required")
      return
    }
    if (formData.assignedAreas.length === 0) {
      setModalError("At least one area must be assigned")
      return
    }
    if (!editingManager && !formData.password?.trim()) {
      setModalError("Password is required for new manager")
      return
    }

    setIsSubmitting(true)
    setModalError(null)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (editingManager) {
      const updatedData: Partial<AreaManager> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        tsm: formData.tsm,
        manager: formData.manager,
        assignedAreas: formData.assignedAreas,
        joinDate: formData.joinDate,
        rating: formData.rating,
      }
      if (formData.password && formData.password.trim()) {
        updatedData.password = formData.password
      }

      setManagers((prev) =>
        prev.map((m) =>
          m.id === editingManager.id
            ? {
                ...m,
                ...updatedData,
              }
            : m
        )
      )
    } else {
      const newManager: AreaManager = {
        id: `am${Date.now()}`,
        managerId: formData.managerId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        tsm: formData.tsm,
        manager: formData.manager,
        assignedAreas: formData.assignedAreas,
        joinDate: formData.joinDate,
        performance: {
          target: 0,
          achieved: 0,
          conversionRate: 0,
          totalDealers: 0,
          activeDealers: 0,
          orders: 0,
          revenue: 0,
          paintSales: 0,
          admixtureSales: 0,
        },
        products: {
          paint: {
            total: 0,
            categories: { emulsion: 0, enamel: 0, primer: 0, texture: 0 },
          },
          admixture: {
            total: 0,
            types: { waterproofing: 0, concrete: 0, plaster: 0, tileAdhesive: 0 },
          },
        },
        dealers: [],
        rating: formData.rating || 0,
        password: formData.password,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setManagers((prev) => [newManager, ...prev])
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
    setManagers((prev) => prev.filter((m) => m.id !== deleteTarget.id))
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingManager(null)
    setModalError(null)
    setModalSuccess(false)
  }

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading area managers...</p>
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
                  Area Manager Management
                </h1>
                <p className="text-sm text-gray-600">Manage area managers for SRBS Admixture & Paint Company</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className=" cursor-pointer flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              Add Manager
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
                placeholder="Search by name, ID, email, phone, TSM or Manager..."
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
                {uniqueAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
          
              <button
                onClick={() => {
                  setSearchTerm("")
                  setAreaFilter("all")
                  setTsmFilter("all")
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

        {/* Managers Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredManagers.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/50 bg-white/70 p-12 text-center shadow-2xl backdrop-blur-xl">
              <Users className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">No area managers found</p>
            </div>
          ) : (
            filteredManagers.map((manager) => {
              const progress = (manager.performance.achieved / manager.performance.target) * 100

              return (
                <div
                  key={manager.id}
                  className="group rounded-2xl border border-white/50 bg-white/70 p-5 shadow-xl backdrop-blur-xl transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                          {manager.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{manager.name}</h3>
                        <p className="text-xs font-mono text-gray-500">{manager.managerId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                     
                      <button
                        onClick={() => handleEdit(manager)}
                        className="rounded-lg p-1.5 text-indigo-600 transition hover:bg-indigo-100 cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(manager)}
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
                      <Users2 className="h-3.5 w-3.5 text-gray-400" />
                      <span>TSM: {manager.tsm}</span>
                    </p>
                   
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{manager.assignedAreas.join(", ")}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      <span>{manager.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                      <span className="truncate">{manager.email}</span>
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-200/50 pt-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-bold text-gray-800">
                        ৳{(manager.performance.revenue / 1000).toFixed(1)}k
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">TSM</p>
                      <p className="text-sm font-bold text-gray-800">{manager.performance.orders}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Seller</p>
                      <p className="text-sm font-bold text-gray-800">{manager.performance.activeDealers}</p>
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
                {editingManager ? "Edit Area Manager" : "Add New Area Manager"}
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
                  <label className="mb-1 block text-sm font-medium text-gray-700">Manager ID</label>
                  <input
                    type="text"
                    value={formData.managerId}
                    onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                    placeholder="e.g., AM-001"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
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
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="manager@srbs.com"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
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
                  {editingManager && <span className="text-xs text-gray-400"> (Leave blank to keep current)</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingManager ? "New password (optional)" : "Enter password"}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                  required={!editingManager}
                  minLength={4}
                />
                {!editingManager && (
                  <p className="mt-1 text-xs text-gray-500">Minimum 4 characters</p>
                )}
              </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g., 123, BKC Complex, Mumbai"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
  <div>
    <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
      Area
    </label>
    <select
      value={formData.area}
      onChange={(e) =>
        setFormData({ ...formData, area: e.target.value })
      }
      className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
      required
    >
      <option value="">Select an area</option>
      {AREAS.map((area) => (  // ← Change AVAILABLE_AREAS to AREAS
        <option key={area} value={area}>
          {area}
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
                  <span>{editingManager ? "Manager updated successfully!" : "Manager added successfully!"}</span>
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
                      {editingManager ? "Update" : "Add"} Manager
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
                    {selectedManager.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedManager.name}</h2>
                    <p className="font-mono text-sm text-gray-500">{selectedManager.managerId}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Info */}
              <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedManager.email}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedManager.phone}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedManager.address}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Users2 className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>TSM: {selectedManager.tsm}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <User className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Manager: {selectedManager.manager}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Joined: {new Date(selectedManager.joinDate).toLocaleDateString("en-IN")}</span>
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Performance Metrics
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-blue-50/50 p-2">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="font-bold text-gray-800">৳{(selectedManager.performance.revenue / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="rounded-lg bg-purple-50/50 p-2">
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="font-bold text-gray-800">{selectedManager.performance.orders}</p>
                    </div>
                    <div className="rounded-lg bg-green-50/50 p-2">
                      <p className="text-xs text-gray-500">Paint Sales</p>
                      <p className="font-bold text-gray-800">৳{(selectedManager.performance.paintSales / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="rounded-lg bg-orange-50/50 p-2">
                      <p className="text-xs text-gray-500">Admixture Sales</p>
                      <p className="font-bold text-gray-800">৳{(selectedManager.performance.admixtureSales / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Breakdown */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package className="h-4 w-4 text-blue-600" />
                Product Breakdown
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium text-gray-700">Paint Products</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emulsion</span>
                      <span>৳{(selectedManager.products.paint.categories.emulsion / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enamel</span>
                      <span>৳{(selectedManager.products.paint.categories.enamel / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primer</span>
                      <span>৳{(selectedManager.products.paint.categories.primer / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Texture</span>
                      <span>৳{(selectedManager.products.paint.categories.texture / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1 font-medium">
                      <span>Total Paint</span>
                      <span>৳{(selectedManager.products.paint.total / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Admixture Products</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waterproofing</span>
                      <span>৳{(selectedManager.products.admixture.types.waterproofing / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Concrete</span>
                      <span>৳{(selectedManager.products.admixture.types.concrete / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plaster</span>
                      <span>৳{(selectedManager.products.admixture.types.plaster / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tile Adhesive</span>
                      <span>৳{(selectedManager.products.admixture.types.tileAdhesive / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1 font-medium">
                      <span>Total Admixture</span>
                      <span>৳{(selectedManager.products.admixture.total / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Close
              </button>
            </div>
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
                Delete Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}