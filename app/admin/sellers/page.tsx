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
  ToggleLeft,
  ToggleRight,
  Phone,
  MapPin,
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================
interface Seller {
  id: string
  sellerId: string // User‑provided unique ID
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  area: string
  status: "active" | "inactive"
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "inactive",
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
    status: "active",
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
    status: "inactive",
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
    status: "active",
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
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all")

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
    status: "active",
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
    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter)
    }
    return result
  }, [sellers, searchTerm, areaFilter, statusFilter])

  const totalSellers = sellers.length
  const activeSellers = sellers.filter((s) => s.status === "active").length
  const inactiveSellers = sellers.filter((s) => s.status === "inactive").length

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
      status: "active",
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
      status: seller.status,
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleDelete = (seller: Seller) => {
    setDeleteTarget(seller)
    setShowDeleteConfirm(true)
  }

  const handleToggleStatus = (seller: Seller) => {
    const newStatus = seller.status === "active" ? "inactive" : "active"
    updateSeller({ ...seller, status: newStatus })
  }

  const updateSeller = (updated: Seller) => {
    setSellers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
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
      // If editing, check if ID changed and duplicate
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (editingSeller) {
      // Update existing
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
                status: formData.status,
              }
            : s
        )
      )
    } else {
      // Add new – generate a unique internal id (not shown to user)
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-3xl font-bold text-transparent">
                Seller Management
              </h1>
              <p className="text-gray-600">Manage all sales representatives</p>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-2 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Add Seller
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by seller ID, name, contact person, phone or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pr-4 pl-10 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
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
                  setStatusFilter("all")
                }}
                className="flex items-center gap-2 rounded-xl bg-gray-200/70 px-4 py-2 backdrop-blur-sm transition hover:bg-gray-300/70"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Sellers Table */}
        <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Seller ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Seller Info
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Contact Person
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Area
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400">
                      <User className="mx-auto mb-2 h-12 w-12 opacity-30" />
                      <p>No sellers found</p>
                    </td>
                  </tr>
                ) : (
                  filteredSellers.map((seller, index) => (
                    <tr
                      key={seller.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30"
                    >
                      <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {seller.sellerId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {seller.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {seller.address}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-700">
                            {seller.contactPerson}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="h-3 w-3" />
                            {seller.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-sm text-gray-700">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {seller.area}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(seller)}
                            className="rounded-full p-1 text-blue-600 transition hover:bg-blue-100/50 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>

                          <button
                            onClick={() => handleDelete(seller)}
                            className="rounded-full p-1 text-red-500 transition hover:bg-red-100/50 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between border-t border-gray-200/50 bg-white/30 px-6 py-3 text-sm text-gray-500 backdrop-blur-sm">
            <span>
              Showing {filteredSellers.length} of {totalSellers} sellers
            </span>
            <span className="flex gap-4">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                Active: {activeSellers}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
                Inactive: {inactiveSellers}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <User className="h-5 w-5 text-blue-600" />
                {editingSeller ? "Edit Seller" : "Add New Seller"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 transition hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Seller ID
                  </label>
                  <input
                    type="text"
                    value={formData.sellerId}
                    onChange={(e) =>
                      setFormData({ ...formData, sellerId: e.target.value })
                    }
                    placeholder="e.g., S-1001"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Rajesh Kumar"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seller@srbs.com"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g., 123, BKC Complex, Mumbai"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
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
                
              </div>

              {modalError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  {modalError}
                </div>
              )}
              {modalSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  {editingSeller
                    ? "Seller updated successfully!"
                    : "Seller added successfully!"}
                </div>
              )}

              <div className="flex gap-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-fadeIn w-full max-w-md rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Delete
              </h2>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
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
      `}</style>
    </div>
  )
}
