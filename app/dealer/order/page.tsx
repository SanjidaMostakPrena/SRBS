"use client"

import React, { useState, useMemo } from "react"
import {
  ShoppingBag,
  Search,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Package,
  Truck,
  Clock,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  FileText,
  CreditCard,
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
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Smartphone,
  Banknote,
  Landmark,
  Wallet,
} from "lucide-react"
import Image from "next/image"

// ============================================================
// TYPES
// ============================================================
interface Product {
  id: string
  code: string
  name: string
  category: "paint" | "admixture" | "accessories"
  subCategory: string
  unit: string
  price: number
  stock: number
  image?: string
  description: string
  brand: string
  packSize: string
}

interface OrderItem {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  price: number
  total: number
  unit: string
  image?: string
  stock: number
}

interface Order {
  id: string
  orderNumber: string
  orderDate: string
  items: OrderItem[]
  subtotal: number
  total: number
  paymentMethod: string
  paymentStatus: "paid" | "unpaid"
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  transactionId?: string
  paymentScreenshot?: string
  paymentDetails?: PaymentDetails
}

interface PaymentDetails {
  method: string
  transactionId?: string
  amount: number
  status: "pending" | "completed" | "failed"
  date: string
  senderNumber?: string
  paymentProof?: string
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  accountNumber?: string
  accountHolder?: string
  bankName?: string
  active: boolean
  isDefault?: boolean
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    code: "PA-001",
    name: "Premium Emulsion Paint - 20L",
    category: "paint",
    subCategory: "Emulsion",
    unit: "20L",
    price: 8500,
    stock: 50,
    description: "High-quality emulsion paint for interior walls",
    brand: "SRBS Premium",
    packSize: "20L Bucket",
  },
  {
    id: "p2",
    code: "PA-002",
    name: "Enamel Paint - 5L",
    category: "paint",
    subCategory: "Enamel",
    unit: "5L",
    price: 3200,
    stock: 30,
    description: "Durable enamel paint for metal and wood surfaces",
    brand: "SRBS Enamel",
    packSize: "5L Tin",
  },
  {
    id: "p3",
    code: "PA-003",
    name: "Primer Coating - 10L",
    category: "paint",
    subCategory: "Primer",
    unit: "10L",
    price: 4500,
    stock: 40,
    description: "Premium primer for better paint adhesion",
    brand: "SRBS Primer",
    packSize: "10L Bucket",
  },
  {
    id: "p4",
    code: "PA-004",
    name: "Texture Paint - 25kg",
    category: "paint",
    subCategory: "Texture",
    unit: "25kg",
    price: 12000,
    stock: 25,
    description: "Decorative texture paint for exterior walls",
    brand: "SRBS Texture",
    packSize: "25kg Bag",
  },
  {
    id: "p5",
    code: "AD-001",
    name: "Waterproofing Compound - 20L",
    category: "admixture",
    subCategory: "Waterproofing",
    unit: "20L",
    price: 6800,
    stock: 35,
    description: "Advanced waterproofing solution for concrete",
    brand: "SRBS Waterproof",
    packSize: "20L Bucket",
  },
  {
    id: "p6",
    code: "AD-002",
    name: "Concrete Admixture - 25kg",
    category: "admixture",
    subCategory: "Concrete",
    unit: "25kg",
    price: 9500,
    stock: 20,
    description: "High-performance concrete admixture",
    brand: "SRBS Concrete",
    packSize: "25kg Bag",
  },
  {
    id: "p7",
    code: "AD-003",
    name: "Plaster Admixture - 20kg",
    category: "admixture",
    subCategory: "Plaster",
    unit: "20kg",
    price: 4200,
    stock: 45,
    description: "Specialized admixture for plaster work",
    brand: "SRBS Plaster",
    packSize: "20kg Bag",
  },
  {
    id: "p8",
    code: "AD-004",
    name: "Tile Adhesive - 25kg",
    category: "admixture",
    subCategory: "Tile Adhesive",
    unit: "25kg",
    price: 5500,
    stock: 30,
    description: "Premium tile adhesive for all tile types",
    brand: "SRBS Tile",
    packSize: "25kg Bag",
  },
  {
    id: "p9",
    code: "AC-001",
    name: "Paint Roller Set - Professional",
    category: "accessories",
    subCategory: "Tools",
    unit: "Set",
    price: 1200,
    stock: 60,
    description: "Professional paint roller set with tray",
    brand: "SRBS Tools",
    packSize: "1 Set",
  },
]

// ============================================================
// PAYMENT METHODS
// ============================================================
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bkash",
    name: "bKash",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    accountNumber: "017XXXXXXXX",
    accountHolder: "SRBS Admixture & Paint",
    active: true,
    isDefault: true,
  },
  {
    id: "nagad",
    name: "Nagad",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    accountNumber: "017XXXXXXXX",
    accountHolder: "SRBS Admixture & Paint",
    active: true,
  },
  {
    id: "rocket",
    name: "Rocket",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    accountNumber: "017XXXXXXXX",
    accountHolder: "SRBS Admixture & Paint",
    active: true,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: <Landmark className="h-5 w-5" />,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    accountNumber: "1234567890",
    accountHolder: "SRBS Admixture & Paint",
    bankName: "Sonali Bank Ltd.",
    active: true,
  },
  {
    id: "handcash",
    name: "Hand Cash",
    icon: <Banknote className="h-5 w-5" />,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    active: true,
  },
]

// ============================================================
// MOCK ORDERS
// ============================================================
const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2026-001",
    orderDate: "2026-01-15T10:30:00",
    items: [
      {
        id: "oi-1",
        productId: "p1",
        productName: "Premium Emulsion Paint - 20L",
        productCode: "PA-001",
        quantity: 2,
        price: 8500,
        total: 17000,
        unit: "20L",
        stock: 50,
      },
      {
        id: "oi-2",
        productId: "p6",
        productName: "Concrete Admixture - 25kg",
        productCode: "AD-002",
        quantity: 1,
        price: 9500,
        total: 9500,
        unit: "25kg",
        stock: 20,
      },
    ],
    subtotal: 26500,
    total: 27000,
    paymentMethod: "bkash",
    paymentStatus: "paid",
    orderStatus: "delivered",
    transactionId: "BKASH-2026-001",
    paymentDetails: {
      method: "bkash",
      transactionId: "BKASH-2026-001",
      amount: 27000,
      status: "completed",
      date: "2026-01-15T10:35:00",
      senderNumber: "019XXXXXXXX",
    },
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2026-002",
    orderDate: "2026-02-10T09:15:00",
    items: [
      {
        id: "oi-3",
        productId: "p2",
        productName: "Enamel Paint - 5L",
        productCode: "PA-002",
        quantity: 3,
        price: 3200,
        total: 9600,
        unit: "5L",
        stock: 30,
      },
    ],
    subtotal: 9600,
    total: 9900,
    paymentMethod: "nagad",
    paymentStatus: "paid",
    orderStatus: "shipped",
    transactionId: "NAGAD-2026-002",
    paymentDetails: {
      method: "nagad",
      transactionId: "NAGAD-2026-002",
      amount: 9900,
      status: "completed",
      date: "2026-02-10T09:20:00",
      senderNumber: "018XXXXXXXX",
    },
  },
  {
    id: "ord-003",
    orderNumber: "ORD-2026-003",
    orderDate: "2026-03-05T11:20:00",
    items: [
      {
        id: "oi-4",
        productId: "p5",
        productName: "Waterproofing Compound - 20L",
        productCode: "AD-001",
        quantity: 2,
        price: 6800,
        total: 13600,
        unit: "20L",
        stock: 35,
      },
      {
        id: "oi-5",
        productId: "p8",
        productName: "Tile Adhesive - 25kg",
        productCode: "AD-004",
        quantity: 2,
        price: 5500,
        total: 11000,
        unit: "25kg",
        stock: 30,
      },
    ],
    subtotal: 24600,
    total: 25100,
    paymentMethod: "handcash",
    paymentStatus: "unpaid",
    orderStatus: "pending",
  },
]

// ============================================================
// STATUS BADGE COMPONENTS
// ============================================================
const StatusBadge: React.FC<{ status: Order["orderStatus"] }> = ({ status }) => {
  const config = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
    processing: { color: "bg-purple-100 text-purple-800", icon: Package },
    shipped: { color: "bg-indigo-100 text-indigo-800", icon: Truck },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: X },
  }

  const { color, icon: Icon } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const PaymentStatusBadge: React.FC<{ status: Order["paymentStatus"] }> = ({ status }) => {
  const config = {
    paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    unpaid: { color: "bg-red-100 text-red-700", icon: X },
  }

  const { color, icon: Icon } = config[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DealerOrderPage() {
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [loading, setLoading] = useState(false)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["orderStatus"] | "all">("all")
  const [paymentFilter, setPaymentFilter] = useState<Order["paymentStatus"] | "all">("all")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Modal states
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // New Order Modal
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchProduct, setSearchProduct] = useState("")

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    method: "bkash",
    senderNumber: "",
    transactionId: "",
    amount: "",
    paymentProof: null as string | null,
  })

  // ---------- Derived ----------
  const filteredOrders = useMemo(() => {
    let result = orders

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.items.some(item => item.productName.toLowerCase().includes(q))
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((o) => o.orderStatus === statusFilter)
    }

    if (paymentFilter !== "all") {
      result = result.filter((o) => o.paymentStatus === paymentFilter)
    }

    return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  }, [orders, searchTerm, statusFilter, paymentFilter])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Search products
  const searchedProducts = useMemo(() => {
    if (!searchProduct.trim()) return []
    const q = searchProduct.toLowerCase()
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }, [searchProduct])

  // Order totals
  const orderTotals = useMemo(() => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
    const deliveryCharge = orderItems.length > 0 ? 500 : 0
    const total = subtotal + deliveryCharge
    return { subtotal, deliveryCharge, total }
  }, [orderItems])

  // Stats
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter((o) => o.orderStatus === "pending").length
    const deliveredOrders = orders.filter((o) => o.orderStatus === "delivered").length
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    return { totalOrders, pendingOrders, deliveredOrders, totalRevenue }
  }, [orders])

  // ---------- Handlers ----------
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  const handleCloseModal = () => {
    setShowOrderModal(false)
    setSelectedOrder(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Auto add product to order when clicked
  const handleProductSelect = (product: Product) => {
    // Check if product already exists in order
    const existingItem = orderItems.find(item => item.productId === product.id)

    if (existingItem) {
      // If exists, increase quantity by 1
      if (existingItem.quantity + 1 > product.stock) {
        alert(`Only ${product.stock} units available in stock.`)
        return
      }
      setOrderItems(orderItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ))
    } else {
      // If new, add with quantity 1
      setOrderItems([
        ...orderItems,
        {
          id: `oi-${Date.now()}`,
          productId: product.id,
          productName: product.name,
          productCode: product.code,
          quantity: 1,
          price: product.price,
          total: product.price,
          unit: product.unit,
          image: product.image,
          stock: product.stock,
        },
      ])
    }

    // Clear search after adding
    setSearchProduct("")
  }

  const handleRemoveFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const item = orderItems.find(i => i.id === itemId)
    if (item && newQuantity > item.stock) {
      alert(`Only ${item.stock} units available in stock.`)
      return
    }
    setOrderItems(orderItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ))
  }

  const handlePaymentFormChange = (field: string, value: any) => {
    setPaymentForm({ ...paymentForm, [field]: value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentForm({ ...paymentForm, paymentProof: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) {
      alert("Please add at least one product to your order.")
      return
    }

    const { subtotal, deliveryCharge, total } = orderTotals

    // Validate payment for non-handcash methods
    if (paymentForm.method !== "handcash") {
      if (!paymentForm.senderNumber.trim()) {
        alert("Please enter your sender number.")
        return
      }
      if (!paymentForm.transactionId.trim()) {
        alert("Please enter the transaction ID.")
        return
      }
      if (!paymentForm.amount.trim() || parseFloat(paymentForm.amount) !== total) {
        alert(`Please enter the correct amount: ৳${total.toLocaleString()}`)
        return
      }
      if (!paymentForm.paymentProof) {
        alert("Please upload payment proof (screenshot/photo).")
        return
      }
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-2026-${String(orders.length + 1).padStart(3, "0")}`,
      orderDate: new Date().toISOString(),
      items: orderItems,
      subtotal: subtotal,
      total: total,
      paymentMethod: paymentForm.method,
      paymentStatus: paymentForm.method === "handcash" ? "unpaid" : "paid",
      orderStatus: "confirmed",
      transactionId: paymentForm.method !== "handcash" ? paymentForm.transactionId : undefined,
      paymentScreenshot: paymentForm.paymentProof || undefined,
      paymentDetails: paymentForm.method !== "handcash" ? {
        method: paymentForm.method,
        transactionId: paymentForm.transactionId,
        amount: total,
        status: "completed",
        date: new Date().toISOString(),
        senderNumber: paymentForm.senderNumber,
        paymentProof: paymentForm.paymentProof || undefined,
      } : undefined,
    }

    setOrders([newOrder, ...orders])

    // Reset form
    setOrderItems([])
    setSearchProduct("")
    setPaymentForm({
      method: "bkash",
      senderNumber: "",
      transactionId: "",
      amount: "",
      paymentProof: null,
    })
    setShowNewOrderModal(false)

    alert(`Order ${newOrder.orderNumber} created successfully!`)
  }

  const getPaymentMethodIcon = (methodId: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId)
    return method?.icon || <Banknote className="h-4 w-4" />
  }

  const getPaymentMethodName = (methodId: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId)
    return method?.name || methodId
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-4 md:p-6 lg:p-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 text-white shadow-lg">
                  <ShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  My Orders
                </h1>
                <p className="text-sm text-gray-600">Manage your orders and make payments</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewOrderModal(true)}
              className=" cursor-pointer flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              Place New Order
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
            <div className="rounded-xl bg-yellow-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-yellow-600">Pending</p>
              <p className="text-lg font-bold text-yellow-700">{stats.pendingOrders}</p>
            </div>
            <div className="rounded-xl bg-green-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-green-600">Delivered</p>
              <p className="text-lg font-bold text-green-700">{stats.deliveredOrders}</p>
            </div>
            <div className="rounded-xl bg-blue-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-blue-600">Revenue</p>
              <p className="text-lg font-bold text-blue-700">৳{(stats.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-4 shadow-2xl backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order number or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pl-10 pr-4 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Payment</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPaymentFilter("all")
                  setCurrentPage(1)
                }}
                className="flex items-center gap-1 rounded-xl bg-gray-200/70 px-4 py-2 text-sm backdrop-blur-sm transition hover:bg-gray-300/70"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Payment</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" />
                      <p className="text-base">No orders found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100/60 transition hover:bg-white/30">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-mono text-xs font-medium text-gray-700">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden">
                            {new Date(order.orderDate).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div>
                          <p className="text-sm text-gray-700">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.orderDate).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex flex-col gap-1">
                          <PaymentStatusBadge status={order.paymentStatus} />
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            {getPaymentMethodIcon(order.paymentMethod)}
                            {getPaymentMethodName(order.paymentMethod)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-gray-800">৳{order.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{order.items.length} items</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className=" cursor-pointer rounded-lg bg-blue-100/70 px-3 py-1.5 text-blue-700 transition hover:bg-blue-200/70 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredOrders.length > 0 && (
            <div className="flex flex-col items-center gap-3 border-t border-gray-200/50 bg-white/30 px-4 py-3 backdrop-blur-sm sm:flex-row sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[32px] rounded-lg px-3 py-1 text-sm transition ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                    Order Details
                  </h2>
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
                <p className="mt-1 font-mono text-sm text-gray-500">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <Package className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedOrder.items.length} items</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <DollarSign className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Subtotal: ৳{selectedOrder.subtotal.toLocaleString()}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Truck className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Delivery: ৳500</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm font-bold">
                    <DollarSign className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span className="text-blue-600">Total: ৳{selectedOrder.total.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <CreditCard className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Method: {getPaymentMethodName(selectedOrder.paymentMethod)}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>Status: <PaymentStatusBadge status={selectedOrder.paymentStatus} /></span>
                  </p>
                  {selectedOrder.transactionId && (
                    <p className="flex items-start gap-2 text-sm">
                      <Barcode className="mt-0.5 h-4 w-4 text-gray-400" />
                      <span className="font-mono text-xs">Txn: {selectedOrder.transactionId}</span>
                    </p>
                  )}
                  {selectedOrder.paymentDetails?.senderNumber && (
                    <p className="flex items-start gap-2 text-sm">
                      <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                      <span className="text-xs">Sender: {selectedOrder.paymentDetails.senderNumber}</span>
                    </p>
                  )}
                  {selectedOrder.paymentDetails?.paymentProof && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Payment Proof:</p>
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={selectedOrder.paymentDetails.paymentProof}
                          alt="Payment Proof"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package className="h-4 w-4 text-blue-600" />
                Order Items ({selectedOrder.items.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">#</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Code</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2 text-xs text-gray-500">{index + 1}</td>
                        <td className="px-3 py-2 text-sm text-gray-800">{item.productName}</td>
                        <td className="px-3 py-2 text-xs font-mono text-gray-500">{item.productCode}</td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700">৳{item.price.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-sm font-medium text-gray-800">৳{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-gray-200">
                    <tr>
                      <td colSpan={5} className="px-3 py-2 text-right text-sm font-medium text-gray-600">Subtotal</td>
                      <td className="px-3 py-2 text-right text-sm text-gray-800">৳{selectedOrder.subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="px-3 py-2 text-right text-sm font-medium text-gray-600">Delivery</td>
                      <td className="px-3 py-2 text-right text-sm text-gray-800">৳500</td>
                    </tr>
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={5} className="px-3 py-3 text-right text-base font-bold text-gray-800">Total</td>
                      <td className="px-3 py-3 text-right text-base font-bold text-blue-600">৳{selectedOrder.total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
              <button
                onClick={handleCloseModal}
                className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
              <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg hover:scale-105 hover:shadow-xl">
                <Printer className="inline h-4 w-4 mr-2" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 md:text-2xl">
                  <Plus className="h-6 w-6 text-blue-600" />
                  Place New Order
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Search products and they will be added automatically
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNewOrderModal(false)
                  setOrderItems([])
                  setSearchProduct("")
                  setPaymentForm({
                    method: "bkash",
                    senderNumber: "",
                    transactionId: "",
                    amount: "",
                    paymentProof: null,
                  })
                }}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column - Product Search & Order Items */}
              <div className="space-y-4">
                {/* Product Search */}
                <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Search className="h-4 w-4 text-blue-600" />
                    Search & Add Products
                  </h3>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, code or brand..."
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
                    />
                  </div>

                  {/* Search Results - Click to add automatically */}
                  {searchProduct.trim() && searchedProducts.length > 0 && (
                    <div className="mt-3 max-h-60 overflow-y-auto space-y-2">
                      {searchedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="flex items-center gap-3 rounded-xl border-2 border-gray-200 p-3 cursor-pointer transition hover:border-blue-400 hover:bg-blue-50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.code} • {product.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">৳{product.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchProduct.trim() && searchedProducts.length === 0 && (
                    <p className="mt-3 text-center text-sm text-gray-400">No products found</p>
                  )}

                  {!searchProduct.trim() && (
                    <p className="mt-3 text-center text-sm text-gray-400">
                      Type to search and click on a product to add
                    </p>
                  )}
                </div>

                {/* Order Items List */}
                <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                    Order Items ({orderItems.length})
                  </h3>

                  {orderItems.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-400">No items added yet</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 rounded-lg border border-gray-200 p-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
                            <p className="text-xs text-gray-500">৳{item.price.toLocaleString()} × {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="rounded bg-gray-100 px-2 py-0.5 text-xs hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="rounded bg-gray-100 px-2 py-0.5 text-xs hover:bg-gray-200"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemoveFromOrder(item.id)}
                              className="ml-1 rounded p-1 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Payment */}
              <div className="space-y-4">
                {/* Order Summary */}
                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">৳{orderTotals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-medium">৳{orderTotals.deliveryCharge.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">৳{orderTotals.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    Payment Details
                  </h3>

                  <div className="space-y-3">
                    {/* Payment Method Selection */}
                    <div>
                      <label className="text-xs font-medium text-gray-600">Payment Method </label>
                      <div className="mt-1 grid grid-cols-3 gap-2">
                        {PAYMENT_METHODS.filter(m => m.active).map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentForm({ ...paymentForm, method: method.id })}
                            className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs transition ${
                              paymentForm.method === method.id
                                ? "border-blue-400 bg-blue-50"
                                : "border-gray-200 hover:border-blue-200"
                            }`}
                          >
                            <div className={`rounded-full bg-gradient-to-br ${method.color} p-1.5 text-white`}>
                              {method.icon}
                            </div>
                            <span className="font-medium">{method.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {paymentForm.method !== "handcash" && (
                      <>
                        <div>
                          <label className="text-xs font-medium text-gray-600">Your Sender Number</label>
                          <input
                            type="text"
                            value={paymentForm.senderNumber}
                            onChange={(e) => handlePaymentFormChange("senderNumber", e.target.value)}
                            placeholder="01XXXXXXXXX"
                            className="mt-1 w-full rounded-lg border-2 border-gray-200 bg-white/50 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">Transaction ID</label>
                          <input
                            type="text"
                            value={paymentForm.transactionId}
                            onChange={(e) => handlePaymentFormChange("transactionId", e.target.value)}
                            placeholder="Enter transaction ID"
                            className="mt-1 w-full rounded-lg border-2 border-gray-200 bg-white/50 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">Amount Sent</label>
                          <input
                            type="number"
                            value={paymentForm.amount}
                            onChange={(e) => handlePaymentFormChange("amount", e.target.value)}
                            placeholder={`Enter amount (Total: ৳${orderTotals.total.toLocaleString()})`}
                            className="mt-1 w-full rounded-lg border-2 border-gray-200 bg-white/50 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Total amount due: ৳{orderTotals.total.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600">Payment Proof (Screenshot)</label>
                          <div className="mt-1 flex items-center gap-3">
                            <label className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:border-blue-400 hover:bg-blue-50">
                              <Upload className="inline h-4 w-4 mr-1" />
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                            {paymentForm.paymentProof && (
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
                                <Image
                                  src={paymentForm.paymentProof}
                                  alt="Payment Proof"
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  onClick={() => setPaymentForm({ ...paymentForm, paymentProof: null })}
                                  className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {paymentForm.method === "handcash" && (
                      <div className="rounded-lg bg-orange-50 p-3 text-sm text-orange-700">
                        <AlertCircle className="inline h-4 w-4 mr-1" />
                        You will pay cash on delivery. Please keep the exact amount ready.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={orderItems.length === 0}
                  className="cursor-pointer w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  Submit Order (৳{orderTotals.total.toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}