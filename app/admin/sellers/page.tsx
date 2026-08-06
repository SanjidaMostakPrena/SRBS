
"use client"

import React, { useState, useMemo } from "react"
import {
  User,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Save,
  Phone,
  MapPin,
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================
interface Seller {
  id: string
  sellerId: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  area: string
  createdAt: string
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_SELLERS: Seller[] = [
  {
    id: "s1",
    sellerId: "S-1001",
    name: "Rajesh Kumar",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@srbs.com",
    address: "123, BKC Complex, Mumbai",
    area: "Mumbai Central",
    createdAt: "2023-01-15",
  },
  {
    id: "s2",
    sellerId: "S-1002",
    name: "Priya Sharma",
    contactPerson: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@srbs.com",
    address: "456, Park Street, Kolkata",
    area: "Kolkata South",
    createdAt: "2023-03-22",
  },
  {
    id: "s3",
    sellerId: "S-1003",
    name: "Amit Singh",
    contactPerson: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit.singh@srbs.com",
    address: "789, Connaught Place, Delhi",
    area: "Delhi NCR",
    createdAt: "2023-06-10",
  },
  {
    id: "s4",
    sellerId: "S-1004",
    name: "Sneha Reddy",
    contactPerson: "Sneha Reddy",
    phone: "+91 65432 10987",
    email: "sneha.reddy@srbs.com",
    address: "101, Anna Nagar, Chennai",
    area: "Chennai East",
    createdAt: "2023-09-05",
  },
  {
    id: "s5",
    sellerId: "S-1005",
    name: "Vikram Patel",
    contactPerson: "Vikram Patel",
    phone: "+91 54321 09876",
    email: "vikram.patel@srbs.com",
    address: "202, MG Road, Bangalore",
    area: "Bangalore West",
    createdAt: "2024-01-20",
  },
  {
    id: "s6",
    sellerId: "S-1006",
    name: "Ananya Gupta",
    contactPerson: "Ananya Gupta",
    phone: "+91 43210 98765",
    email: "ananya.gupta@srbs.com",
    address: "303, Jubilee Hills, Hyderabad",
    area: "Hyderabad North",
    createdAt: "2024-03-15",
  },
  {
    id: "s7",
    sellerId: "S-1007",
    name: "Manoj Joshi",
    contactPerson: "Manoj Joshi",
    phone: "+91 32109 87654",
    email: "manoj.joshi@srbs.com",
    address: "404, FC Road, Pune",
    area: "Pune City",
    createdAt: "2024-06-01",
  },
]

// Available areas (for filter and dropdown)
const AVAILABLE_AREAS = [
  "Mumbai Central",
  "Kolkata South",
  "Delhi NCR",
  "Chennai East",
  "Bangalore West",
  "Hyderabad North",
  "Pune City",
]

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SellersPage() {
  // ---------- State ----------
  const [sellers, setSellers] = useState<Seller[]>(MOCK_SELLERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState<string>("all")

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null)
  const [formData, setFormData] = useState<Omit<Seller, "id" | "createdAt">>({
    sellerId: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    area: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalSuccess, setModalSuccess] = useState(false)

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Seller | null>(null)

  // ---------- Derived ----------
  const filteredSellers = useMemo(() => {
    let result = sellers
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (s) =>
          s.sellerId.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.contactPerson.toLowerCase().includes(q) ||
          s.phone.includes(q) ||
          s.area.toLowerCase().includes(q)
      )
    }
    if (areaFilter !== "all") {
      result = result.filter((s) => s.area === areaFilter)
    }
    return result
  }, [sellers, searchTerm, areaFilter])

  const totalSellers = sellers.length

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingSeller(null)
    setFormData({
      sellerId: "",
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      area: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleEdit = (seller: Seller) => {
    setEditingSeller(seller)
    setFormData({
      sellerId: seller.sellerId,
      name: seller.name,
      contactPerson: seller.contactPerson,
      phone: seller.phone,
      email: seller.email,
      address: seller.address,
      area: seller.area,
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleDelete = (seller: Seller) => {
    setDeleteTarget(seller)
    setShowDeleteConfirm(true)
  }

  // ---------- Form Submission ----------
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.sellerId.trim()) {
      setModalError("Seller ID is required")
      return
    }
    if (!formData.name.trim()) {
      setModalError("Seller name is required")
      return
    }
    if (!formData.contactPerson.trim()) {
      setModalError("Contact person is required")
      return
    }
    if (!formData.phone.trim()) {
      setModalError("Phone number is required")
      return
    }
    if (!formData.area.trim()) {
      setModalError("Area is required")
      return
    }

    // Check for duplicate sellerId (only when adding new)
    if (!editingSeller) {
      const existing = sellers.find((s) => s.sellerId === formData.sellerId)
      if (existing) {
        setModalError("Seller ID already exists. Please use a unique ID.")
        return
      }
    } else {
      if (formData.sellerId !== editingSeller.sellerId) {
        const existing = sellers.find((s) => s.sellerId === formData.sellerId)
        if (existing) {
          setModalError("Seller ID already exists. Please use a unique ID.")
          return
        }
      }
    }

    setIsSubmitting(true)
    setModalError(null)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (editingSeller) {
      setSellers((prev) =>
        prev.map((s) =>
          s.id === editingSeller.id
            ? {
                ...s,
                sellerId: formData.sellerId,
                name: formData.name,
                contactPerson: formData.contactPerson,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                area: formData.area,
              }
            : s
        )
      )
    } else {
      const newSeller: Seller = {
        id: `s${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSellers((prev) => [newSeller, ...prev])
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
    setSellers((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSeller(null)
    setModalError(null)
    setModalSuccess(false)
  }

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading sellers...</p>
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-96 lg:w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/40 bg-white/30 p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2 sm:p-2.5 md:p-3 text-white shadow-lg flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                Seller Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block truncate">Manage all sales representatives</p>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl flex-shrink-0"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            <span className="hidden xs:inline">Add Seller</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>

        
        {/* Filters */}
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 rounded-2xl sm:rounded-3xl border border-white/50 bg-white/70 p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 py-1.5 sm:py-2 pr-2 sm:pr-3 md:pr-4 pl-8 sm:pl-9 md:pl-10 text-xs sm:text-sm md:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="flex-1 sm:flex-none rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 min-w-[80px] sm:min-w-[100px] md:min-w-[120px]"
              >
                <option value="all">All Areas</option>
                {AVAILABLE_AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setAreaFilter("all")
                }}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gray-200/70 backdrop-blur-sm transition hover:bg-gray-300/70 flex items-center gap-0.5 sm:gap-1 md:gap-2 text-xs sm:text-sm md:text-base"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <span className="hidden xs:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sellers Table */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-gray-700">#</th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-gray-700">Seller ID</th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-gray-700">Seller Info</th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left font-semibold text-gray-700">Area</th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 sm:py-10 text-center text-gray-400">
                      <User className="mx-auto mb-1 sm:mb-2 h-8 w-8 sm:h-12 sm:w-12 opacity-30" />
                      <p className="text-xs sm:text-sm">No sellers found</p>
                    </td>
                  </tr>
                ) : (
                  filteredSellers.map((seller, index) => (
                    <tr
                      key={seller.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-gray-500 text-xs sm:text-sm">{index + 1}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="font-mono text-xs sm:text-sm font-medium text-gray-700">
                          {seller.sellerId}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div>
                          <p className="font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[100px]">{seller.name}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[120px]">{seller.address}</p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700 truncate max-w-[80px]">{seller.contactPerson}</p>
                          <p className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-gray-500">
                            <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span className="truncate max-w-[80px]">{seller.phone}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-gray-700">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400" />
                          <span className="truncate max-w-[80px]">{seller.area}</span>
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(seller)}
                            className="rounded-full p-1 text-blue-600 transition hover:bg-blue-100/50 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(seller)}
                            className="rounded-full p-1 text-red-500 transition hover:bg-red-100/50 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100/60">
            {filteredSellers.length === 0 ? (
              <div className="py-6 sm:py-10 text-center text-gray-400">
                <User className="mx-auto mb-1 sm:mb-2 h-8 w-8 sm:h-12 sm:w-12 opacity-30" />
                <p className="text-sm sm:text-base">No sellers found</p>
              </div>
            ) : (
              filteredSellers.map((seller, index) => (
                <div key={seller.id} className="p-3 sm:p-4 hover:bg-white/30 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] sm:text-xs text-gray-400">#{index + 1}</span>
                        <span className="font-mono text-xs sm:text-sm font-medium text-gray-700">{seller.sellerId}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{seller.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{seller.address}</p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <span className="text-xs sm:text-sm text-gray-700 flex items-center gap-0.5 sm:gap-1">
                          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400" />
                          {seller.phone}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 flex items-center gap-0.5 sm:gap-1">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400" />
                          {seller.area}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Contact: {seller.contactPerson}</p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(seller)}
                        className="rounded-full p-1.5 sm:p-2 text-blue-600 transition hover:bg-blue-100/50 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(seller)}
                        className="rounded-full p-1.5 sm:p-2 text-red-500 transition hover:bg-red-100/50 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 border-t border-gray-200/50 bg-white/30 px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-[10px] sm:text-sm text-gray-500 backdrop-blur-sm">
            <span>
              Showing {filteredSellers.length} of {totalSellers} sellers
            </span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/50 bg-white/95 p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 sm:mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-bold text-gray-800">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                {editingSeller ? "Edit Seller" : "Add New Seller"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 transition hover:text-gray-600"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                    Seller ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sellerId}
                    onChange={(e) =>
                      setFormData({ ...formData, sellerId: e.target.value })
                    }
                    placeholder="e.g., S-1001"
                    className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                    Seller Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Rajesh Kumar"
                    className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seller@srbs.com"
                    className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g., 123, BKC Complex, Mumbai"
                  className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-700">
                  Area <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/50 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                  required
                >
                  <option value="">Select an area</option>
                  {AVAILABLE_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {modalError && (
                <div className="flex items-center gap-2 rounded-lg sm:rounded-xl border border-red-200 bg-red-50 p-2.5 sm:p-3 text-xs sm:text-sm text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2 rounded-lg sm:rounded-xl border border-green-200 bg-green-50 p-2.5 sm:p-3 text-xs sm:text-sm text-green-700">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{editingSeller
                    ? "Seller updated successfully!"
                    : "Seller added successfully!"}</span>
                </div>
              )}

              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 border-t border-gray-200 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-lg sm:rounded-xl bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 sm:h-5 sm:w-5" />
                      {editingSeller ? "Update" : "Add"} Seller
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="animate-fadeIn w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/50 bg-white/95 p-4 sm:p-5 md:p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="rounded-full bg-red-100 p-1.5 sm:p-2 flex-shrink-0">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                Confirm Delete
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row gap-2 sm:gap-3 border-t border-gray-200 pt-3 sm:pt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg sm:rounded-xl bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-lg sm:rounded-xl bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white transition hover:bg-red-700"
              >
                Delete Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
          .xs\\:flex-row { flex-direction: row; }
        }
        @media (max-width: 479px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
          .xs\\:flex-row { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}