"use client"

import React, { useState, useMemo } from "react"
import {
  Building2,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  X,
  Loader2,
  Save,
  Phone,
  MapPin,
  User,
  Store,
  CheckCircle,
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================
interface Dealer {
  id: string
  dealerCode: string // NEW: human-readable display code
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  area: string
  gstNumber?: string
  createdAt: string
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_DEALERS: Dealer[] = [
  {
    id: "d1",
    dealerCode: "D001",
    name: "Mumbai Hardware Stores",
    contactPerson: "Rajesh Sharma",
    phone: "+91 98765 43210",
    email: "info@mumbaihardware.com",
    address: "123, Linking Road, Bandra",
    area: "Mumbai Central",
    gstNumber: "GSTIN-27AABC1234D1Z1",
    createdAt: "2023-01-15",
  },
  {
    id: "d2",
    dealerCode: "D002",
    name: "Kolkata Building Materials",
    contactPerson: "Sneha Das",
    phone: "+91 87654 32109",
    email: "sales@kolkatabm.com",
    address: "456, Park Street, Kolkata",
    area: "Kolkata South",
    gstNumber: "GSTIN-19AABC5678E1Z1",
    createdAt: "2023-03-22",
  },
  {
    id: "d3",
    dealerCode: "D003",
    name: "Delhi Construction Supplies",
    contactPerson: "Vikram Singh",
    phone: "+91 76543 21098",
    email: "info@delhiconstruct.com",
    address: "789, Connaught Place, Delhi",
    area: "Delhi NCR",
    gstNumber: "GSTIN-07AABC9012F1Z1",
    createdAt: "2023-06-10",
  },
  {
    id: "d4",
    dealerCode: "D004",
    name: "Chennai Paint House",
    contactPerson: "Priya Rajan",
    phone: "+91 65432 10987",
    email: "contact@chennaipaint.com",
    address: "101, Anna Nagar, Chennai",
    area: "Chennai East",
    gstNumber: "GSTIN-33AABC3456G1Z1",
    createdAt: "2023-09-05",
  },
  {
    id: "d5",
    dealerCode: "D005",
    name: "Bangalore Admixture Co",
    contactPerson: "Anand Kumar",
    phone: "+91 54321 09876",
    email: "info@bangaloreadmixture.com",
    address: "202, MG Road, Bangalore",
    area: "Bangalore West",
    gstNumber: "GSTIN-29AABC7890H1Z1",
    createdAt: "2024-01-20",
  },
  {
    id: "d6",
    dealerCode: "D006",
    name: "Hyderabad Paint Traders",
    contactPerson: "Suresh Reddy",
    phone: "+91 43210 98765",
    email: "sales@hydpaint.com",
    address: "303, Jubilee Hills, Hyderabad",
    area: "Hyderabad North",
    gstNumber: "GSTIN-36AABC2345I1Z1",
    createdAt: "2024-03-15",
  },
  {
    id: "d7",
    dealerCode: "D007",
    name: "Pune Construction Materials",
    contactPerson: "Meera Joshi",
    phone: "+91 32109 87654",
    email: "info@punematerials.com",
    address: "404, FC Road, Pune",
    area: "Pune City",
    gstNumber: "GSTIN-27AABC6789J1Z1",
    createdAt: "2024-06-01",
  },
]

// Available areas (for filter dropdown)
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
export default function DealersPage() {
  // ---------- State ----------
  const [dealers, setDealers] = useState<Dealer[]>(MOCK_DEALERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState<string>("all")

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null)
  const [formData, setFormData] = useState<Omit<Dealer, "id" | "createdAt">>({
    dealerCode: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    gstNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalSuccess, setModalSuccess] = useState(false)

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Dealer | null>(null)

  // ---------- Derived ----------
  const filteredDealers = useMemo(() => {
    let result = dealers
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.contactPerson.toLowerCase().includes(q) ||
          d.phone.includes(q) ||
          d.area.toLowerCase().includes(q) ||
          d.dealerCode.toLowerCase().includes(q)
      )
    }
    if (areaFilter !== "all") {
      result = result.filter((d) => d.area === areaFilter)
    }
    return result
  }, [dealers, searchTerm, areaFilter])

  const totalDealers = dealers.length

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingDealer(null)
    setFormData({
      dealerCode: "",
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      area: "",
      gstNumber: "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleEdit = (dealer: Dealer) => {
    setEditingDealer(dealer)
    setFormData({
      dealerCode: dealer.dealerCode,
      name: dealer.name,
      contactPerson: dealer.contactPerson,
      phone: dealer.phone,
      email: dealer.email,
      address: dealer.address,
      area: dealer.area,
      gstNumber: dealer.gstNumber || "",
    })
    setModalError(null)
    setModalSuccess(false)
    setShowModal(true)
  }

  const handleDelete = (dealer: Dealer) => {
    setDeleteTarget(dealer)
    setShowDeleteConfirm(true)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setModalError("Dealer name is required")
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

    // Generate dealerCode if not provided
    const dealerCode =
      formData.dealerCode.trim() ||
      `D${String(dealers.length + 1).padStart(3, "0")}`

    setIsSubmitting(true)
    setModalError(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (editingDealer) {
      // Update existing
      setDealers((prev) =>
        prev.map((d) =>
          d.id === editingDealer.id
            ? {
                ...d,
                dealerCode,
                name: formData.name,
                contactPerson: formData.contactPerson,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                area: formData.area,
                gstNumber: formData.gstNumber,
              }
            : d
        )
      )
    } else {
      // Add new
      const newDealer: Dealer = {
        id: `d${Date.now()}`,
        dealerCode,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDealers((prev) => [newDealer, ...prev])
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
    setDealers((prev) => prev.filter((d) => d.id !== deleteTarget.id))
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDealer(null)
    setModalError(null)
    setModalSuccess(false)
  }

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading dealers...</p>
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
              <Store className="h-8 w-8" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-3xl font-bold text-transparent">
                Dealer Management
              </h1>
              <p className="text-gray-600">
                Manage all dealers and distributors
              </p>
            </div>
          </div>
          
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by dealer name, contact person, phone, code or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pr-4 pl-10 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            
          </div>
        </div>

        {/* Dealers Table */}
        <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Code
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Dealer Info
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Contact
                  </th>
                
                </tr>
              </thead>
              <tbody>
                {filteredDealers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400">
                      <Store className="mx-auto mb-2 h-12 w-12 opacity-30" />
                      <p>No dealers found</p>
                    </td>
                  </tr>
                ) : (
                  filteredDealers.map((dealer, index) => (
                    <tr
                      key={dealer.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30"
                    >
                      <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {dealer.dealerCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {dealer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {dealer.address}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-700">
                            {dealer.contactPerson}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="h-3 w-3" />
                            {dealer.phone}
                          </p>
                        </div>
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200/50 bg-white/30 px-6 py-3 text-sm text-gray-500 backdrop-blur-sm">
            Showing {filteredDealers.length} of {totalDealers} dealers
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-fadeIn max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Store className="h-5 w-5 text-blue-600" />
                {editingDealer ? "Edit Dealer" : "Add New Dealer"}
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
                    Dealer Code{" "}
                  </label>
                  <input
                    type="text"
                    value={formData.dealerCode}
                    onChange={(e) =>
                      setFormData({ ...formData, dealerCode: e.target.value })
                    }
                    placeholder="e.g., D001 (auto‑generated if blank)"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Dealer Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Mumbai Hardware Stores"
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
                    placeholder="info@company.com"
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
                  placeholder="e.g., 123, Linking Road, Bandra"
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
                  {editingDealer
                    ? "Dealer updated successfully!"
                    : "Dealer added successfully!"}
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
                      {editingDealer ? "Update" : "Add"} Dealer
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
                Delete Dealer
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
