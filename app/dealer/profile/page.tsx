"use client"

import React, { useState } from "react"
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Camera,
  Upload,
  Lock,
  Shield,
  Award,
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  Clock,
  ChevronRight,
  FileText,
  CreditCard,
  Smartphone,
  Banknote,
  Landmark,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  Settings,
  HelpCircle,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ============================================================
// TYPES
// ============================================================
interface DealerProfile {
  id: string
  code: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  area: string
  pin: string
  logo?: string
  joinDate: string
  businessType: string
  tradeLicense: string
  taxId: string
  website?: string
  socialMedia?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
  bankDetails?: {
    bankName: string
    accountNumber: string
    accountHolder: string
    branch: string
  }
  stats: {
    totalOrders: number
    totalRevenue: number
    totalProducts: number
    averageOrderValue: number
    pendingOrders: number
    deliveredOrders: number
    rating: number
    totalDealers: number
  }
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    smsAlerts: boolean
    language: string
    currency: string
  }
}

interface Activity {
  id: string
  type: "order" | "payment" | "profile" | "stock"
  title: string
  description: string
  date: string
  status?: string
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_PROFILE: DealerProfile = {
  id: "d1",
  code: "D001",
  name: "Mumbai Hardware Stores",
  contactPerson: "Rajesh Sharma",
  phone: "+91 98765 43210",
  email: "rajesh@hardware.com",
  address: "123, Linking Road, Bandra, Mumbai - 400051",
  area: "Mumbai Central",
  pin: "1234",
  joinDate: "2023-01-15",
  businessType: "Hardware & Construction Materials",
  tradeLicense: "TL-2023-001",
  taxId: "GSTIN-27AABC1234D1Z1",
  website: "www.mumbaihardware.com",
  socialMedia: {
    facebook: "facebook.com/mumbaihardware",
    instagram: "instagram.com/mumbaihardware",
  },
  bankDetails: {
    bankName: "SBI Bank",
    accountNumber: "1234567890",
    accountHolder: "Mumbai Hardware Stores",
    branch: "Bandra Branch",
  },
  stats: {
    totalOrders: 156,
    totalRevenue: 4850000,
    totalProducts: 45,
    averageOrderValue: 31089,
    pendingOrders: 3,
    deliveredOrders: 148,
    rating: 4.5,
    totalDealers: 12,
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    smsAlerts: false,
    language: "English",
    currency: "BDT (৳)",
  },
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act-001",
    type: "order",
    title: "New Order Placed",
    description: "Order #ORD-2026-007 has been placed successfully",
    date: "2026-04-04T14:20:00",
    status: "pending",
  },
  {
    id: "act-002",
    type: "payment",
    title: "Payment Received",
    description: "Payment of ৳18,450 received for order #ORD-2026-006",
    date: "2026-04-03T10:30:00",
    status: "completed",
  },
  {
    id: "act-003",
    type: "stock",
    title: "Stock Updated",
    description: "Stock updated for 5 products",
    date: "2026-04-02T16:45:00",
  },
  {
    id: "act-004",
    type: "order",
    title: "Order Delivered",
    description: "Order #ORD-2026-005 has been delivered successfully",
    date: "2026-04-01T09:15:00",
    status: "delivered",
  },
  {
    id: "act-005",
    type: "profile",
    title: "Profile Updated",
    description: "Contact information has been updated",
    date: "2026-03-30T11:00:00",
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${colorMap[color]} p-3 text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ACTIVITY ICON COMPONENT
// ============================================================
const ActivityIcon: React.FC<{ type: Activity["type"] }> = ({ type }) => {
  const config = {
    order: { icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    payment: { icon: CreditCard, color: "bg-green-100 text-green-600" },
    profile: { icon: User, color: "bg-purple-100 text-purple-600" },
    stock: { icon: Package, color: "bg-orange-100 text-orange-600" },
  }

  const { icon: Icon, color } = config[type]
  return (
    <div className={`rounded-full ${color} p-2`}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DealerProfilePage() {
  // ---------- State ----------
  const [profile, setProfile] = useState<DealerProfile>(MOCK_PROFILE)
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: profile.name,
    contactPerson: profile.contactPerson,
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    area: profile.area,
    website: profile.website || "",
    businessType: profile.businessType,
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // ---------- Handlers ----------
  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form
      setEditForm({
        name: profile.name,
        contactPerson: profile.contactPerson,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        area: profile.area,
        website: profile.website || "",
        businessType: profile.businessType,
      })
    }
    setIsEditing(!isEditing)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      contactPerson: editForm.contactPerson,
      phone: editForm.phone,
      email: editForm.email,
      address: editForm.address,
      area: editForm.area,
      website: editForm.website,
      businessType: editForm.businessType,
    }))
    setIsEditing(false)
    setLoading(false)
    alert("Profile updated successfully!")
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)

    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required")
      return
    }
    if (!passwordForm.newPassword) {
      setPasswordError("New password is required")
      return
    }
    if (passwordForm.newPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPasswordSuccess(true)
    setLoading(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setTimeout(() => {
      setPasswordSuccess(false)
      setShowPasswordModal(false)
    }, 2000)
  }

  const handleLogout = () => {
    setShowConfirmDialog(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("dealerAuth")
    window.location.href = "/dealer/login"
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-4 md:p-6 lg:p-8">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 text-white shadow-lg">
                  <User className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  My Profile
                </h1>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleEditToggle}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition hover:scale-105 ${
                  isEditing
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-3xl font-bold text-white shadow-lg">
                    {profile.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 p-1.5 text-white shadow-lg transition hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.code}</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </span>
              </div>

              {/* Quick Info */}
              <div className="mt-6 space-y-3 border-t border-gray-200/50 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Store className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Business Type</p>
                    <p className="font-medium text-gray-700">{profile.businessType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trade License</p>
                    <p className="font-medium text-gray-700">{profile.tradeLicense}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tax ID</p>
                    <p className="font-medium text-gray-700">{profile.taxId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-700">
                      {new Date(profile.joinDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Dealer Rating</p>
                    <p className="text-lg font-bold text-gray-800">{profile.stats.rating} / 5.0</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(profile.stats.rating)
                            ? "text-yellow-400"
                            : star - 0.5 <= profile.stats.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Lock className="h-4 w-4" />
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="h-5 w-5 text-blue-600" />
                  Contact Information
                </h3>
                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {isEditing ? (
                  // Edit Mode
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Business Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Contact Person</label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={editForm.contactPerson}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleEditChange}
                        className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Area</label>
                        <input
                          type="text"
                          name="area"
                          value={editForm.area}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Website</label>
                        <input
                          type="text"
                          name="website"
                          value={editForm.website}
                          onChange={handleEditChange}
                          className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Business Type</label>
                      <input
                        type="text"
                        name="businessType"
                        value={editForm.businessType}
                        onChange={handleEditChange}
                        className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                  </>
                ) : (
                  // View Mode
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Store className="mt-0.5 h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Business Name</p>
                          <p className="font-medium text-gray-800">{profile.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Contact Person</p>
                          <p className="font-medium text-gray-800">{profile.contactPerson}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">{profile.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">{profile.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium text-gray-800">{profile.address}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Building2 className="mt-0.5 h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Area</p>
                          <p className="font-medium text-gray-800">{profile.area}</p>
                        </div>
                      </div>
                      {profile.website && (
                        <div className="flex items-start gap-3">
                          <Globe className="mt-0.5 h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Website</p>
                            <p className="font-medium text-gray-800">{profile.website}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bank Details */}
            {profile.bankDetails && (
              <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Bank Details
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Landmark className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="font-medium text-gray-800">{profile.bankDetails.bankName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="font-medium text-gray-800">{profile.bankDetails.accountNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Account Holder</p>
                      <p className="font-medium text-gray-800">{profile.bankDetails.accountHolder}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Branch</p>
                      <p className="font-medium text-gray-800">{profile.bankDetails.branch}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </h3>
                <Link href="/dealer/activity" className="text-sm text-blue-600 hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {activities.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-xl border border-gray-200/50 p-3 transition hover:bg-white/30"
                  >
                    <ActivityIcon type={activity.type} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(activity.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {activity.status && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : activity.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : activity.status === "delivered"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {activity.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <Lock className="h-5 w-5 text-blue-600" />
                Change Password
              </h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordError(null)
                  setPasswordSuccess(false)
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passwordError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}
              {passwordSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Password changed successfully!</span>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative mt-1">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false)
                    setPasswordError(null)
                    setPasswordSuccess(false)
                    setPasswordForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    })
                  }}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
            </div>
            <p className="text-gray-600">Are you sure you want to logout? You will be redirected to the login page.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="rounded-xl bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// GLOBE ICON (if not imported)
// ============================================================
const Globe = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const Activity = (props: any) => {
  const ActivityIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
  return <ActivityIcon {...props} />
}