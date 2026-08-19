// "use client"

// import React, { useState, useMemo, useEffect } from "react"
// import {
//   ShoppingBag,
//   Search,
//   X,
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   Calendar,
//   DollarSign,
//   Package,
//   Truck,
//   Clock,
//   Eye,
//   Printer,
//   Download,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   CreditCard,
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Building2,
//   Store,
//   Filter,
//   TrendingUp,
//   ArrowUpRight,
//   ArrowDownRight,
//   Smartphone,
//   Banknote,
//   Landmark,
//   Wallet,
//   Barcode,
//   RefreshCw,
//   Star,
//   Award,
//   BarChart3,
//   PieChart,
//   Activity,
//   Zap,
//   Shield,
//   Users,
//   ChevronDown,
//   ChevronUp,
//   MoreVertical,
//   Check,
//   ThumbsUp,
//   ThumbsDown,
//   TrendingDown,
// } from "lucide-react"
// import Image from "next/image"

// // ============================================================
// // TYPES
// // ============================================================
// interface OrderItem {
//   id: string
//   productId: string
//   productName: string
//   productCode: string
//   quantity: number
//   price: number
//   total: number
//   unit: string
//   image?: string
// }

// interface PaymentDetails {
//   method: string
//   accountNumber?: string
//   transactionId?: string
//   reference?: string
//   amount: number
//   status: "pending" | "completed" | "failed"
//   date: string
// }

// interface Order {
//   id: string
//   orderNumber: string
//   orderDate: string
//   deliveryDate?: string
//   items: OrderItem[]
//   subtotal: number
//   discount: number
//   deliveryCharge: number
//   vat: number
//   total: number
//   paymentMethod: string
//   paymentStatus: "paid" | "unpaid" | "partial" | "refunded"
//   orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
//   deliveryAddress: string
//   contactPerson: string
//   contactPhone: string
//   notes?: string
//   transactionId?: string
//   paymentScreenshot?: string
//   paymentDetails?: PaymentDetails
//   createdAt: string
//   updatedAt: string
// }

// interface OrderStats {
//   totalOrders: number
//   totalRevenue: number
//   averageOrderValue: number
//   pendingOrders: number
//   processingOrders: number
//   shippedOrders: number
//   deliveredOrders: number
//   cancelledOrders: number
//   totalItems: number
//   monthlyGrowth: number
// }

// interface PaymentMethod {
//   id: string
//   name: string
//   icon: React.ReactNode
//   color: string
//   bgColor: string
//   active: boolean
// }

// // ============================================================
// // MOCK DATA
// // ============================================================
// const PAYMENT_METHODS: PaymentMethod[] = [
//   {
//     id: "bkash",
//     name: "bKash",
//     icon: <Smartphone className="h-4 w-4" />,
//     color: "from-pink-500 to-rose-600",
//     bgColor: "bg-pink-50",
//     active: true,
//   },
//   {
//     id: "nagad",
//     name: "Nagad",
//     icon: <Smartphone className="h-4 w-4" />,
//     color: "from-purple-500 to-indigo-600",
//     bgColor: "bg-purple-50",
//     active: true,
//   },
//   {
//     id: "rocket",
//     name: "Rocket",
//     icon: <Smartphone className="h-4 w-4" />,
//     color: "from-blue-500 to-cyan-600",
//     bgColor: "bg-blue-50",
//     active: true,
//   },
//   {
//     id: "bank",
//     name: "Bank Transfer",
//     icon: <Landmark className="h-4 w-4" />,
//     color: "from-green-500 to-emerald-600",
//     bgColor: "bg-green-50",
//     active: true,
//   },
//   {
//     id: "handcash",
//     name: "Hand Cash",
//     icon: <Banknote className="h-4 w-4" />,
//     color: "from-orange-500 to-amber-600",
//     bgColor: "bg-orange-50",
//     active: true,
//   },
// ]

// const MOCK_ORDERS: Order[] = [
//   {
//     id: "ord-001",
//     orderNumber: "ORD-2026-001",
//     orderDate: "2026-01-15T10:30:00",
//     deliveryDate: "2026-01-18T11:45:00",
//     items: [
//       {
//         id: "oi-1",
//         productId: "p1",
//         productName: "Premium Emulsion Paint - 20L",
//         productCode: "PA-001",
//         quantity: 2,
//         price: 8500,
//         total: 17000,
//         unit: "20L",
//       },
//       {
//         id: "oi-2",
//         productId: "p6",
//         productName: "Concrete Admixture - 25kg",
//         productCode: "AD-002",
//         quantity: 1,
//         price: 9500,
//         total: 9500,
//         unit: "25kg",
//       },
//     ],
//     subtotal: 26500,
//     discount: 1000,
//     deliveryCharge: 500,
//     vat: 1275,
//     total: 27275,
//     paymentMethod: "bkash",
//     paymentStatus: "paid",
//     orderStatus: "delivered",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     transactionId: "BKASH-2026-001",
//     notes: "Handle with care - fragile items",
//     paymentDetails: {
//       method: "bkash",
//       accountNumber: "017XXXXXXXX",
//       transactionId: "BKASH-2026-001",
//       amount: 27275,
//       status: "completed",
//       date: "2026-01-15T10:35:00",
//     },
//     createdAt: "2026-01-15T10:30:00",
//     updatedAt: "2026-01-18T11:45:00",
//   },
//   {
//     id: "ord-002",
//     orderNumber: "ORD-2026-002",
//     orderDate: "2026-02-10T09:15:00",
//     deliveryDate: "2026-02-12T16:40:00",
//     items: [
//       {
//         id: "oi-3",
//         productId: "p2",
//         productName: "Enamel Paint - 5L",
//         productCode: "PA-002",
//         quantity: 3,
//         price: 3200,
//         total: 9600,
//         unit: "5L",
//       },
//     ],
//     subtotal: 9600,
//     discount: 0,
//     deliveryCharge: 300,
//     vat: 480,
//     total: 10380,
//     paymentMethod: "nagad",
//     paymentStatus: "paid",
//     orderStatus: "shipped",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     transactionId: "NAGAD-2026-002",
//     paymentDetails: {
//       method: "nagad",
//       accountNumber: "017XXXXXXXX",
//       transactionId: "NAGAD-2026-002",
//       amount: 10380,
//       status: "completed",
//       date: "2026-02-10T09:20:00",
//     },
//     createdAt: "2026-02-10T09:15:00",
//     updatedAt: "2026-02-12T16:40:00",
//   },
//   {
//     id: "ord-003",
//     orderNumber: "ORD-2026-003",
//     orderDate: "2026-03-05T11:20:00",
//     items: [
//       {
//         id: "oi-4",
//         productId: "p5",
//         productName: "Waterproofing Compound - 20L",
//         productCode: "AD-001",
//         quantity: 2,
//         price: 6800,
//         total: 13600,
//         unit: "20L",
//       },
//       {
//         id: "oi-5",
//         productId: "p8",
//         productName: "Tile Adhesive - 25kg",
//         productCode: "AD-004",
//         quantity: 2,
//         price: 5500,
//         total: 11000,
//         unit: "25kg",
//       },
//     ],
//     subtotal: 24600,
//     discount: 500,
//     deliveryCharge: 600,
//     vat: 1205,
//     total: 25905,
//     paymentMethod: "handcash",
//     paymentStatus: "unpaid",
//     orderStatus: "pending",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     notes: "Cash on delivery",
//     createdAt: "2026-03-05T11:20:00",
//     updatedAt: "2026-03-05T11:20:00",
//   },
//   {
//     id: "ord-004",
//     orderNumber: "ORD-2026-004",
//     orderDate: "2026-03-12T08:45:00",
//     items: [
//       {
//         id: "oi-6",
//         productId: "p3",
//         productName: "Primer Coating - 10L",
//         productCode: "PA-003",
//         quantity: 1,
//         price: 4500,
//         total: 4500,
//         unit: "10L",
//       },
//     ],
//     subtotal: 4500,
//     discount: 200,
//     deliveryCharge: 200,
//     vat: 215,
//     total: 4715,
//     paymentMethod: "rocket",
//     paymentStatus: "paid",
//     orderStatus: "processing",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     transactionId: "ROCKET-2026-004",
//     paymentDetails: {
//       method: "rocket",
//       accountNumber: "017XXXXXXXX",
//       transactionId: "ROCKET-2026-004",
//       amount: 4715,
//       status: "completed",
//       date: "2026-03-12T08:50:00",
//     },
//     createdAt: "2026-03-12T08:45:00",
//     updatedAt: "2026-03-12T08:50:00",
//   },
//   {
//     id: "ord-005",
//     orderNumber: "ORD-2026-005",
//     orderDate: "2026-03-20T14:10:00",
//     items: [
//       {
//         id: "oi-7",
//         productId: "p4",
//         productName: "Texture Paint - 25kg",
//         productCode: "PA-004",
//         quantity: 1,
//         price: 12000,
//         total: 12000,
//         unit: "25kg",
//       },
//     ],
//     subtotal: 12000,
//     discount: 0,
//     deliveryCharge: 400,
//     vat: 600,
//     total: 13000,
//     paymentMethod: "bank",
//     paymentStatus: "refunded",
//     orderStatus: "cancelled",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     transactionId: "BANK-2026-005",
//     notes: "Cancelled due to payment failure",
//     paymentDetails: {
//       method: "bank",
//       accountNumber: "1234567890",
//       transactionId: "BANK-2026-005",
//       amount: 13000,
//       status: "failed",
//       date: "2026-03-20T14:15:00",
//     },
//     createdAt: "2026-03-20T14:10:00",
//     updatedAt: "2026-03-20T14:15:00",
//   },
//   {
//     id: "ord-006",
//     orderNumber: "ORD-2026-006",
//     orderDate: "2026-04-02T13:25:00",
//     deliveryDate: "2026-04-05T09:30:00",
//     items: [
//       {
//         id: "oi-8",
//         productId: "p7",
//         productName: "Plaster Admixture - 20kg",
//         productCode: "AD-003",
//         quantity: 3,
//         price: 4200,
//         total: 12600,
//         unit: "20kg",
//       },
//       {
//         id: "oi-9",
//         productId: "p9",
//         productName: "Paint Roller Set - Professional",
//         productCode: "AC-001",
//         quantity: 2,
//         price: 1200,
//         total: 2400,
//         unit: "Set",
//       },
//     ],
//     subtotal: 15000,
//     discount: 1000,
//     deliveryCharge: 500,
//     vat: 700,
//     total: 15200,
//     paymentMethod: "bkash",
//     paymentStatus: "paid",
//     orderStatus: "delivered",
//     deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
//     contactPerson: "Rajesh Sharma",
//     contactPhone: "+91 98765 43210",
//     transactionId: "BKASH-2026-006",
//     paymentDetails: {
//       method: "bkash",
//       accountNumber: "017XXXXXXXX",
//       transactionId: "BKASH-2026-006",
//       amount: 15200,
//       status: "completed",
//       date: "2026-04-02T13:30:00",
//     },
//     createdAt: "2026-04-02T13:25:00",
//     updatedAt: "2026-04-05T09:30:00",
//   },
// ]

// // ============================================================
// // STATUS BADGE COMPONENTS
// // ============================================================
// const StatusBadge: React.FC<{ status: Order["orderStatus"] }> = ({ status }) => {
//   const config = {
//     pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
//     confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
//     processing: { color: "bg-purple-100 text-purple-800", icon: Package },
//     shipped: { color: "bg-indigo-100 text-indigo-800", icon: Truck },
//     delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
//     cancelled: { color: "bg-red-100 text-red-800", icon: X },
//   }

//   const { color, icon: Icon } = config[status]
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
//       <Icon className="h-3 w-3" />
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   )
// }

// const PaymentStatusBadge: React.FC<{ status: Order["paymentStatus"] }> = ({ status }) => {
//   const config = {
//     paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
//     unpaid: { color: "bg-red-100 text-red-700", icon: X },
//     refunded: { color: "bg-orange-100 text-orange-700", icon: ArrowDownRight },
//     partial: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
//   }

//   const { color, icon: Icon } = config[status] || config.unpaid
//   return (
//     <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
//       <Icon className="h-3 w-3" />
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   )
// }

// // ============================================================
// // STAT CARD COMPONENT
// // ============================================================
// const StatCard: React.FC<{
//   label: string
//   value: string | number
//   icon: React.ReactNode
//   trend?: number
//   color?: string
//   subtitle?: string
// }> = ({ label, value, icon, trend, color = "blue", subtitle }) => {
//   const colorMap: Record<string, string> = {
//     blue: "from-blue-500 to-indigo-600",
//     green: "from-green-500 to-emerald-600",
//     purple: "from-purple-500 to-pink-600",
//     orange: "from-orange-500 to-red-600",
//     teal: "from-teal-500 to-cyan-600",
//     rose: "from-rose-500 to-pink-600",
//     yellow: "from-yellow-500 to-amber-600",
//     indigo: "from-indigo-500 to-purple-600",
//   }

//   return (
//     <div className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
//       <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//       <div className="relative flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
//           <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
//           {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
//           {trend !== undefined && (
//             <div className="mt-2 flex items-center gap-1">
//               {trend >= 0 ? (
//                 <TrendingUp className="h-3.5 w-3.5 text-green-500" />
//               ) : (
//                 <TrendingDown className="h-3.5 w-3.5 text-red-500" />
//               )}
//               <span className={`text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
//                 {trend >= 0 ? "+" : ""}{trend}%
//               </span>
//             </div>
//           )}
//         </div>
//         <div className={`rounded-xl bg-gradient-to-br ${colorMap[color]} p-3 text-white shadow-lg`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function OrderHistoryPage() {
//   // ---------- State ----------
//   const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
//   const [loading, setLoading] = useState(false)

//   // Search and filters
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<Order["orderStatus"] | "all">("all")

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   // Modal states
//   const [showOrderModal, setShowOrderModal] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
//   const [actionLoading, setActionLoading] = useState(false)

//   // ---------- Derived ----------
//   const filteredOrders = useMemo(() => {
//     let result = orders

//     // Search
//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase()
//       result = result.filter(
//         (o) =>
//           o.orderNumber.toLowerCase().includes(q) ||
//           o.items.some(item => item.productName.toLowerCase().includes(q)) ||
//           o.contactPerson.toLowerCase().includes(q)
//       )
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       result = result.filter((o) => o.orderStatus === statusFilter)
//     }

//     // Sort by date (newest first)
//     return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
//   }, [orders, searchTerm, statusFilter])

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   )

//   // Stats
//   const stats = useMemo(() => {
//     const totalOrders = orders.length
//     const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
//     const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
//     const pendingOrders = orders.filter((o) => o.orderStatus === "pending").length
//     const processingOrders = orders.filter((o) => o.orderStatus === "processing").length
//     const shippedOrders = orders.filter((o) => o.orderStatus === "shipped").length
//     const deliveredOrders = orders.filter((o) => o.orderStatus === "delivered").length
//     const cancelledOrders = orders.filter((o) => o.orderStatus === "cancelled").length
//     const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0)

//     return {
//       totalOrders,
//       totalRevenue,
//       averageOrderValue,
//       pendingOrders,
//       processingOrders,
//       shippedOrders,
//       deliveredOrders,
//       cancelledOrders,
//       totalItems,
//     }
//   }, [orders])

//   // ---------- Handlers ----------
//   const handleViewOrder = (order: Order) => {
//     setSelectedOrder(order)
//     setShowOrderModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowOrderModal(false)
//     setSelectedOrder(null)
//     setActionLoading(false)
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   // ---------- Accept/Reject Handlers ----------
//   const handleAcceptOrder = async () => {
//     if (!selectedOrder) return
    
//     setActionLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))
    
//     // Update order status to confirmed
//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === selectedOrder.id
//           ? { ...o, orderStatus: "confirmed" as Order["orderStatus"] }
//           : o
//       )
//     )
    
//     // Update selected order
//     setSelectedOrder((prev) =>
//       prev ? { ...prev, orderStatus: "confirmed" as Order["orderStatus"] } : null
//     )
    
//     setActionLoading(false)
//     alert(`Order ${selectedOrder.orderNumber} has been accepted and confirmed.`)
//   }

//   const handleRejectOrder = async () => {
//     if (!selectedOrder) return
    
//     setActionLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))
    
//     // Update order status to cancelled
//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === selectedOrder.id
//           ? { ...o, orderStatus: "cancelled" as Order["orderStatus"] }
//           : o
//       )
//     )
    
//     // Update selected order
//     setSelectedOrder((prev) =>
//       prev ? { ...prev, orderStatus: "cancelled" as Order["orderStatus"] } : null
//     )
    
//     setActionLoading(false)
//     alert(`Order ${selectedOrder.orderNumber} has been rejected.`)
//   }

//   const getPaymentMethodIcon = (methodId: string) => {
//     const method = PAYMENT_METHODS.find(m => m.id === methodId)
//     return method?.icon || <Banknote className="h-4 w-4" />
//   }

//   const getPaymentMethodName = (methodId: string) => {
//     const method = PAYMENT_METHODS.find(m => m.id === methodId)
//     return method?.name || methodId
//   }

//   // ---------- Loading State ----------
//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
//           <p className="text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-4 md:p-6 lg:p-8">
//       {/* Background Decorations */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8 overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-6 shadow-xl backdrop-blur-xl md:p-8">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 text-white shadow-lg">
//                   <ShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
//               </div>
//               <div>
//                 <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
//                   Order History
//                 </h1>
//                 <p className="text-sm text-gray-600">Track and manage all your orders</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
           
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//             <StatCard
//               label="Total Orders"
//               value={stats.totalOrders}
//               icon={<ShoppingBag className="h-5 w-5" />}
//               color="blue"
//             />
//             <StatCard
//               label="Total Revenue"
//               value={"৳" + (stats.totalRevenue / 100000).toFixed(1) + "L"}
//               icon={<DollarSign className="h-5 w-5" />}
//               color="green"
//             />
//             <StatCard
//               label="Avg Order Value"
//               value={"৳" + (stats.averageOrderValue / 1000).toFixed(1) + "k"}
//               icon={<BarChart3 className="h-5 w-5" />}
//               color="purple"
//             />
//             <StatCard
//               label="Pending"
//               value={stats.pendingOrders}
//               icon={<Clock className="h-5 w-5" />}
//               color="yellow"
//             />
//             <StatCard
//               label="Delivered"
//               value={stats.deliveredOrders}
//               icon={<CheckCircle className="h-5 w-5" />}
//               color="green"
//             />
//             <StatCard
//               label="Total Items"
//               value={stats.totalItems}
//               icon={<Package className="h-5 w-5" />}
//               color="teal"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-4 shadow-2xl backdrop-blur-xl md:p-6">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by order number, product or customer..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full rounded-xl border-2 border-gray-200 bg-white/50 py-2 pl-10 pr-4 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
//               />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value as any)}
//                 className="rounded-xl border-2 border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="processing">Processing</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//               <button
//                 onClick={() => {
//                   setSearchTerm("")
//                   setStatusFilter("all")
//                   setCurrentPage(1)
//                 }}
//                 className="flex items-center gap-1 rounded-xl bg-gray-200/70 px-4 py-2 text-sm backdrop-blur-sm transition hover:bg-gray-300/70"
//               >
//                 <X className="h-4 w-4" />
//                 <span className="hidden sm:inline">Clear</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Date</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Payment</th>
//                   <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
//                   <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedOrders.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="py-12 text-center text-gray-400">
//                       <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" />
//                       <p className="text-base">No orders found</p>
//                       <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="border-b border-gray-100/60 transition hover:bg-white/30 group"
//                     >
//                       <td className="px-4 py-3">
//                         <div>
//                           <p className="font-mono text-xs font-medium text-gray-700">
//                             {order.orderNumber}
//                           </p>
//                           <p className="text-xs text-gray-500 md:hidden">
//                             {new Date(order.orderDate).toLocaleDateString("en-IN")}
//                           </p>
//                           <p className="text-xs text-gray-400 md:hidden">
//                             {order.items.length} items
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 hidden md:table-cell">
//                         <div>
//                           <p className="text-sm text-gray-700">
//                             {new Date(order.orderDate).toLocaleDateString("en-IN", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             })}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             {new Date(order.orderDate).toLocaleTimeString("en-IN", {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <StatusBadge status={order.orderStatus} />
//                       </td>
//                       <td className="px-4 py-3 hidden sm:table-cell">
//                         <div className="flex flex-col gap-1">
//                           <PaymentStatusBadge status={order.paymentStatus} />
//                           <span className="text-[10px] text-gray-400 flex items-center gap-1">
//                             {getPaymentMethodIcon(order.paymentMethod)}
//                             {getPaymentMethodName(order.paymentMethod)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <p className="font-bold text-gray-800">৳{order.total.toLocaleString()}</p>
//                         <p className="text-xs text-gray-400">{order.items.length} items</p>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <button
//                           onClick={() => handleViewOrder(order)}
//                           className="rounded-lg bg-blue-100/70 px-3 py-1.5 text-blue-700 transition hover:bg-blue-200/70 hover:text-blue-900"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {filteredOrders.length > 0 && (
//             <div className="flex flex-col items-center gap-3 border-t border-gray-200/50 bg-white/30 px-4 py-3 backdrop-blur-sm sm:flex-row sm:justify-between">
//               <p className="text-sm text-gray-500">
//                 Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                 {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`min-w-[32px] rounded-lg px-3 py-1 text-sm transition ${
//                       currentPage === page
//                         ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Detail Modal with Accept/Reject Buttons */}
//       {showOrderModal && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
//             {/* Modal Header */}
//             <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
//               <div>
//                 <div className="flex items-center gap-3 flex-wrap">
//                   <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
//                     Order Details
//                   </h2>
//                   <StatusBadge status={selectedOrder.orderStatus} />
//                   <PaymentStatusBadge status={selectedOrder.paymentStatus} />
//                 </div>
//                 <p className="mt-1 font-mono text-sm text-gray-500">
//                   {selectedOrder.orderNumber}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Order Info Grid */}
//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Customer Info */}
//               <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 backdrop-blur-sm">
//                 <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <User className="h-4 w-4 text-blue-600" />
//                   Delivery Information
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="flex items-start gap-2 text-sm">
//                     <User className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span className="font-medium">{selectedOrder.contactPerson}</span>
//                   </p>
//                   <p className="flex items-start gap-2 text-sm">
//                     <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>{selectedOrder.contactPhone}</span>
//                   </p>
//                   <p className="flex items-start gap-2 text-sm">
//                     <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span className="text-sm">{selectedOrder.deliveryAddress}</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Order Info */}
//               <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-4 backdrop-blur-sm">
//                 <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <Calendar className="h-4 w-4 text-blue-600" />
//                   Order Information
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="flex items-start gap-2 text-sm">
//                     <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>
//                       Ordered: {new Date(selectedOrder.orderDate).toLocaleString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </p>
//                   {selectedOrder.deliveryDate && (
//                     <p className="flex items-start gap-2 text-sm">
//                       <Truck className="mt-0.5 h-4 w-4 text-gray-400" />
//                       <span>
//                         Delivered: {new Date(selectedOrder.deliveryDate).toLocaleString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </p>
//                   )}
//                   <p className="flex items-start gap-2 text-sm">
//                     <CreditCard className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>
//                       Payment: {getPaymentMethodName(selectedOrder.paymentMethod)}
//                     </span>
//                   </p>
//                   {selectedOrder.transactionId && (
//                     <p className="flex items-start gap-2 text-sm">
//                       <Barcode className="mt-0.5 h-4 w-4 text-gray-400" />
//                       <span className="font-mono text-xs">Txn: {selectedOrder.transactionId}</span>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="mt-6 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <Package className="h-4 w-4 text-blue-600" />
//                   Order Items ({selectedOrder.items.length})
//                 </h3>
//                 <button className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600 hover:bg-blue-100">
//                   <Printer className="h-3 w-3" />
//                   Print
//                 </button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="border-b border-gray-200">
//                     <tr>
//                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">#</th>
//                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Product</th>
//                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Code</th>
//                       <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
//                       <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Price</th>
//                       <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedOrder.items.map((item, index) => (
//                       <tr key={item.id} className="border-b border-gray-100 last:border-0">
//                         <td className="px-3 py-2 text-xs text-gray-500">{index + 1}</td>
//                         <td className="px-3 py-2 text-sm text-gray-800">{item.productName}</td>
//                         <td className="px-3 py-2 text-xs font-mono text-gray-500">{item.productCode}</td>
//                         <td className="px-3 py-2 text-right text-sm text-gray-700">{item.quantity}</td>
//                         <td className="px-3 py-2 text-right text-sm text-gray-700">৳{item.price.toLocaleString()}</td>
//                         <td className="px-3 py-2 text-right text-sm font-medium text-gray-800">৳{item.total.toLocaleString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot className="border-t-2 border-gray-200">
//                     <tr>
//                       <td colSpan={5} className="px-3 py-2 text-right text-sm font-medium text-gray-600">Subtotal</td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">৳{selectedOrder.subtotal.toLocaleString()}</td>
//                     </tr>
//                     <tr>
//                       <td colSpan={5} className="px-3 py-2 text-right text-sm font-medium text-gray-600">VAT (5%)</td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">৳{selectedOrder.vat.toLocaleString()}</td>
//                     </tr>
//                     <tr>
//                       <td colSpan={5} className="px-3 py-2 text-right text-sm font-medium text-gray-600">Delivery</td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">৳{selectedOrder.deliveryCharge.toLocaleString()}</td>
//                     </tr>
//                     {selectedOrder.discount > 0 && (
//                       <tr>
//                         <td colSpan={5} className="px-3 py-2 text-right text-sm text-green-600">Discount</td>
//                         <td className="px-3 py-2 text-right text-sm text-green-600">-৳{selectedOrder.discount.toLocaleString()}</td>
//                       </tr>
//                     )}
//                     <tr className="border-t-2 border-gray-300">
//                       <td colSpan={5} className="px-3 py-3 text-right text-base font-bold text-gray-800">Total</td>
//                       <td className="px-3 py-3 text-right text-base font-bold text-blue-600">৳{selectedOrder.total.toLocaleString()}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             {/* Notes */}
//             {selectedOrder.notes && (
//               <div className="mt-4 rounded-xl border border-gray-200 bg-yellow-50/50 p-4 backdrop-blur-sm">
//                 <p className="flex items-start gap-2 text-sm">
//                   <FileText className="mt-0.5 h-4 w-4 text-yellow-600" />
//                   <span className="text-gray-700">{selectedOrder.notes}</span>
//                 </p>
//               </div>
//             )}

//             {/* Modal Actions with Accept/Reject Buttons */}
//             <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end sm:items-center">
//               <button
//                 onClick={handleCloseModal}
//                 className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
//               >
//                 Close
//               </button>
              
//               {/* Accept Button - Show only for pending orders */}
//               {selectedOrder.orderStatus === "pending" && (
//                 <button
//                   onClick={handleAcceptOrder}
//                   disabled={actionLoading}
//                   className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
//                 >
//                   {actionLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Check className="h-4 w-4" />
//                   )}
//                   Accept Order
//                 </button>
//               )}
              
//               {/* Reject Button - Show only for pending orders */}
//               {selectedOrder.orderStatus === "pending" && (
//                 <button
//                   onClick={handleRejectOrder}
//                   disabled={actionLoading}
//                   className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
//                 >
//                   {actionLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <X className="h-4 w-4" />
//                   )}
//                   Reject Order
//                 </button>
//               )}
              
//               <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
//                 <Printer className="h-4 w-4" />
//                 Print Invoice
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
  ShoppingBag,
  Search,
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
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Store,
  Filter,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Banknote,
  Landmark,
  Wallet,
  Barcode,
  RefreshCw,
  Star,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Users,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Check,
  ThumbsUp,
  ThumbsDown,
  TrendingDown,
} from "lucide-react"
import Image from "next/image"

// ============================================================
// TYPES
// ============================================================
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
}

interface PaymentDetails {
  method: string
  accountNumber?: string
  transactionId?: string
  reference?: string
  amount: number
  status: "pending" | "completed" | "failed"
  date: string
}

interface Order {
  id: string
  orderNumber: string
  orderDate: string
  deliveryDate?: string
  items: OrderItem[]
  subtotal: number
  discount: number
  deliveryCharge: number
  vat: number
  total: number
  paymentMethod: string
  paymentStatus: "paid" | "unpaid" | "partial" | "refunded"
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  deliveryAddress: string
  contactPerson: string
  contactPhone: string
  notes?: string
  transactionId?: string
  paymentScreenshot?: string
  paymentDetails?: PaymentDetails
  createdAt: string
  updatedAt: string
}

interface OrderStats {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalItems: number
  monthlyGrowth: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  active: boolean
}

// ============================================================
// MOCK DATA
// ============================================================
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bkash",
    name: "bKash",
    icon: <Smartphone className="h-4 w-4" />,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    active: true,
  },
  {
    id: "nagad",
    name: "Nagad",
    icon: <Smartphone className="h-4 w-4" />,
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    active: true,
  },
  {
    id: "rocket",
    name: "Rocket",
    icon: <Smartphone className="h-4 w-4" />,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    active: true,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: <Landmark className="h-4 w-4" />,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    active: true,
  },
  {
    id: "handcash",
    name: "Hand Cash",
    icon: <Banknote className="h-4 w-4" />,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    active: true,
  },
]

const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2026-001",
    orderDate: "2026-01-15T10:30:00",
    deliveryDate: "2026-01-18T11:45:00",
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
      },
    ],
    subtotal: 26500,
    discount: 1000,
    deliveryCharge: 500,
    vat: 1275,
    total: 27275,
    paymentMethod: "bkash",
    paymentStatus: "paid",
    orderStatus: "delivered",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    transactionId: "BKASH-2026-001",
    notes: "Handle with care - fragile items",
    paymentDetails: {
      method: "bkash",
      accountNumber: "017XXXXXXXX",
      transactionId: "BKASH-2026-001",
      amount: 27275,
      status: "completed",
      date: "2026-01-15T10:35:00",
    },
    createdAt: "2026-01-15T10:30:00",
    updatedAt: "2026-01-18T11:45:00",
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2026-002",
    orderDate: "2026-02-10T09:15:00",
    deliveryDate: "2026-02-12T16:40:00",
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
      },
    ],
    subtotal: 9600,
    discount: 0,
    deliveryCharge: 300,
    vat: 480,
    total: 10380,
    paymentMethod: "nagad",
    paymentStatus: "paid",
    orderStatus: "shipped",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    transactionId: "NAGAD-2026-002",
    paymentDetails: {
      method: "nagad",
      accountNumber: "017XXXXXXXX",
      transactionId: "NAGAD-2026-002",
      amount: 10380,
      status: "completed",
      date: "2026-02-10T09:20:00",
    },
    createdAt: "2026-02-10T09:15:00",
    updatedAt: "2026-02-12T16:40:00",
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
      },
    ],
    subtotal: 24600,
    discount: 500,
    deliveryCharge: 600,
    vat: 1205,
    total: 25905,
    paymentMethod: "handcash",
    paymentStatus: "unpaid",
    orderStatus: "pending",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    notes: "Cash on delivery",
    createdAt: "2026-03-05T11:20:00",
    updatedAt: "2026-03-05T11:20:00",
  },
  {
    id: "ord-004",
    orderNumber: "ORD-2026-004",
    orderDate: "2026-03-12T08:45:00",
    items: [
      {
        id: "oi-6",
        productId: "p3",
        productName: "Primer Coating - 10L",
        productCode: "PA-003",
        quantity: 1,
        price: 4500,
        total: 4500,
        unit: "10L",
      },
    ],
    subtotal: 4500,
    discount: 200,
    deliveryCharge: 200,
    vat: 215,
    total: 4715,
    paymentMethod: "rocket",
    paymentStatus: "paid",
    orderStatus: "processing",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    transactionId: "ROCKET-2026-004",
    paymentDetails: {
      method: "rocket",
      accountNumber: "017XXXXXXXX",
      transactionId: "ROCKET-2026-004",
      amount: 4715,
      status: "completed",
      date: "2026-03-12T08:50:00",
    },
    createdAt: "2026-03-12T08:45:00",
    updatedAt: "2026-03-12T08:50:00",
  },
  {
    id: "ord-005",
    orderNumber: "ORD-2026-005",
    orderDate: "2026-03-20T14:10:00",
    items: [
      {
        id: "oi-7",
        productId: "p4",
        productName: "Texture Paint - 25kg",
        productCode: "PA-004",
        quantity: 1,
        price: 12000,
        total: 12000,
        unit: "25kg",
      },
    ],
    subtotal: 12000,
    discount: 0,
    deliveryCharge: 400,
    vat: 600,
    total: 13000,
    paymentMethod: "bank",
    paymentStatus: "refunded",
    orderStatus: "cancelled",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    transactionId: "BANK-2026-005",
    notes: "Cancelled due to payment failure",
    paymentDetails: {
      method: "bank",
      accountNumber: "1234567890",
      transactionId: "BANK-2026-005",
      amount: 13000,
      status: "failed",
      date: "2026-03-20T14:15:00",
    },
    createdAt: "2026-03-20T14:10:00",
    updatedAt: "2026-03-20T14:15:00",
  },
  {
    id: "ord-006",
    orderNumber: "ORD-2026-006",
    orderDate: "2026-04-02T13:25:00",
    deliveryDate: "2026-04-05T09:30:00",
    items: [
      {
        id: "oi-8",
        productId: "p7",
        productName: "Plaster Admixture - 20kg",
        productCode: "AD-003",
        quantity: 3,
        price: 4200,
        total: 12600,
        unit: "20kg",
      },
      {
        id: "oi-9",
        productId: "p9",
        productName: "Paint Roller Set - Professional",
        productCode: "AC-001",
        quantity: 2,
        price: 1200,
        total: 2400,
        unit: "Set",
      },
    ],
    subtotal: 15000,
    discount: 1000,
    deliveryCharge: 500,
    vat: 700,
    total: 15200,
    paymentMethod: "bkash",
    paymentStatus: "paid",
    orderStatus: "delivered",
    deliveryAddress: "123, Linking Road, Bandra, Mumbai - 400051",
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    transactionId: "BKASH-2026-006",
    paymentDetails: {
      method: "bkash",
      accountNumber: "017XXXXXXXX",
      transactionId: "BKASH-2026-006",
      amount: 15200,
      status: "completed",
      date: "2026-04-02T13:30:00",
    },
    createdAt: "2026-04-02T13:25:00",
    updatedAt: "2026-04-05T09:30:00",
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
    refunded: { color: "bg-orange-100 text-orange-700", icon: ArrowDownRight },
    partial: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  }

  const { color, icon: Icon } = config[status] || config.unpaid
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
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
  subtitle?: string
}> = ({ label, value, icon, trend, color = "blue", subtitle }) => {
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider truncate">{label}</p>
          <p className="mt-1 text-lg md:text-2xl font-bold text-gray-800 truncate">{value}</p>
          {subtitle && <p className="mt-0.5 text-[10px] text-gray-400 truncate">{subtitle}</p>}
          {trend !== undefined && (
            <div className="mt-1 flex items-center gap-1">
              {trend >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-[10px] font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                {trend >= 0 ? "+" : ""}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 rounded-xl bg-gradient-to-br ${colorMap[color]} p-2.5 text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function OrderHistoryPage() {
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [loading, setLoading] = useState(false)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["orderStatus"] | "all">("all")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Modal states
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // ---------- Derived ----------
  const filteredOrders = useMemo(() => {
    let result = orders

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.items.some(item => item.productName.toLowerCase().includes(q)) ||
          o.contactPerson.toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.orderStatus === statusFilter)
    }

    // Sort by date (newest first)
    return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  }, [orders, searchTerm, statusFilter])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const pendingOrders = orders.filter((o) => o.orderStatus === "pending").length
    const processingOrders = orders.filter((o) => o.orderStatus === "processing").length
    const shippedOrders = orders.filter((o) => o.orderStatus === "shipped").length
    const deliveredOrders = orders.filter((o) => o.orderStatus === "delivered").length
    const cancelledOrders = orders.filter((o) => o.orderStatus === "cancelled").length
    const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0)

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalItems,
    }
  }, [orders])

  // ---------- Handlers ----------
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  const handleCloseModal = () => {
    setShowOrderModal(false)
    setSelectedOrder(null)
    setActionLoading(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ---------- Accept/Reject Handlers ----------
  const handleAcceptOrder = async () => {
    if (!selectedOrder) return
    
    setActionLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Update order status to confirmed
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, orderStatus: "confirmed" as Order["orderStatus"] }
          : o
      )
    )
    
    // Update selected order
    setSelectedOrder((prev) =>
      prev ? { ...prev, orderStatus: "confirmed" as Order["orderStatus"] } : null
    )
    
    setActionLoading(false)
    alert(`Order ${selectedOrder.orderNumber} has been accepted and confirmed.`)
  }

  const handleRejectOrder = async () => {
    if (!selectedOrder) return
    
    setActionLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Update order status to cancelled
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, orderStatus: "cancelled" as Order["orderStatus"] }
          : o
      )
    )
    
    // Update selected order
    setSelectedOrder((prev) =>
      prev ? { ...prev, orderStatus: "cancelled" as Order["orderStatus"] } : null
    )
    
    setActionLoading(false)
    alert(`Order ${selectedOrder.orderNumber} has been rejected.`)
  }

  const getPaymentMethodIcon = (methodId: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId)
    return method?.icon || <Banknote className="h-4 w-4" />
  }

  const getPaymentMethodName = (methodId: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId)
    return method?.name || methodId
  }

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-3 md:p-6 lg:p-8">
      {/* Background Decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/30 to-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8 overflow-hidden rounded-2xl md:rounded-3xl border border-white/40 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-4 md:p-6 lg:p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative flex-shrink-0">
                <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 md:p-3.5 text-white shadow-lg">
                  <ShoppingBag className="h-5 w-5 md:h-7 md:w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-green-400 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-xl md:text-2xl lg:text-3xl font-bold text-transparent truncate">
                  Order History
                </h1>
                <p className="text-xs md:text-sm text-gray-600 truncate">Track and manage all your orders</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              {/* Additional header actions can go here */}
            </div>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            <StatCard
              label="Total Orders"
              value={stats.totalOrders}
              icon={<ShoppingBag className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="blue"
            />
            <StatCard
              label="Total Revenue"
              value={"৳" + (stats.totalRevenue / 100000).toFixed(1) + "L"}
              icon={<DollarSign className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="green"
            />
            <StatCard
              label="Avg Order Value"
              value={"৳" + (stats.averageOrderValue / 1000).toFixed(1) + "k"}
              icon={<BarChart3 className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="purple"
            />
            <StatCard
              label="Pending"
              value={stats.pendingOrders}
              icon={<Clock className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="yellow"
            />
            <StatCard
              label="Delivered"
              value={stats.deliveredOrders}
              icon={<CheckCircle className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="green"
            />
            <StatCard
              label="Total Items"
              value={stats.totalItems}
              icon={<Package className="h-3.5 w-3.5 md:h-5 md:w-5" />}
              color="teal"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 md:mb-6 rounded-xl md:rounded-2xl border border-white/50 bg-white/70 p-3 md:p-4 lg:p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3 lg:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 md:left-3 top-1/2 h-3.5 w-3.5 md:h-4 md:w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order number, product or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg md:rounded-xl border-2 border-gray-200 bg-white/50 py-1.5 md:py-2 pl-8 md:pl-10 pr-3 md:pr-4 text-xs md:text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-lg md:rounded-xl border-2 border-gray-200 bg-white/50 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm backdrop-blur-sm transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setCurrentPage(1)
                }}
                className="flex items-center gap-1 rounded-lg md:rounded-xl bg-gray-200/70 px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm backdrop-blur-sm transition hover:bg-gray-300/70"
              >
                <X className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-xl md:rounded-2xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700">Order</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Date</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Payment</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-right font-semibold text-gray-700">Amount</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 md:py-12 text-center text-gray-400">
                      <ShoppingBag className="mx-auto mb-2 md:mb-3 h-10 w-10 md:h-12 md:w-12 opacity-30" />
                      <p className="text-sm md:text-base">No orders found</p>
                      <p className="text-xs md:text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30 group"
                    >
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div>
                          <p className="font-mono text-[10px] md:text-xs font-medium text-gray-700 truncate max-w-[80px] md:max-w-none">
                            {order.orderNumber}
                          </p>
                          <p className="text-[10px] md:hidden text-gray-500">
                            {new Date(order.orderDate).toLocaleDateString("en-IN")}
                          </p>
                          <p className="text-[10px] md:hidden text-gray-400">
                            {order.items.length} items
                          </p>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">
                        <div>
                          <p className="text-xs md:text-sm text-gray-700">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {new Date(order.orderDate).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <PaymentStatusBadge status={order.paymentStatus} />
                          <span className="text-[8px] md:text-[10px] text-gray-400 flex items-center gap-0.5 md:gap-1">
                            {getPaymentMethodIcon(order.paymentMethod)}
                            {getPaymentMethodName(order.paymentMethod)}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-right">
                        <p className="text-xs md:text-sm font-bold text-gray-800">৳{order.total.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400">{order.items.length} items</p>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="rounded-lg bg-blue-100/70 px-2 md:px-3 py-1 md:py-1.5 text-blue-700 transition hover:bg-blue-200/70 hover:text-blue-900"
                        >
                          <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex flex-col items-center gap-2 md:gap-3 border-t border-gray-200/50 bg-white/30 px-3 md:px-4 py-2 md:py-3 backdrop-blur-sm sm:flex-row sm:justify-between">
              <p className="text-[10px] md:text-sm text-gray-500 text-center sm:text-left">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </p>
              <div className="flex items-center gap-0.5 md:gap-1 flex-wrap justify-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[24px] md:min-w-[32px] rounded-lg px-1.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm transition ${
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
                  className="rounded-lg px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal with Accept/Reject Buttons - Fully Responsive */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 md:p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] md:max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl md:rounded-2xl border border-white/50 bg-white/95 p-3 md:p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
            {/* Modal Header */}
            <div className="mb-4 md:mb-6 flex items-start justify-between border-b border-gray-200 pb-3 md:pb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-800">
                    Order Details
                  </h2>
                  <StatusBadge status={selectedOrder.orderStatus} />
                  <PaymentStatusBadge status={selectedOrder.paymentStatus} />
                </div>
                <p className="mt-0.5 md:mt-1 font-mono text-[10px] md:text-sm text-gray-500 truncate">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="flex-shrink-0 rounded-full bg-gray-100 p-1.5 md:p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            {/* Order Info Grid */}
            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
              {/* Customer Info */}
              <div className="rounded-lg md:rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-3 md:p-4 backdrop-blur-sm">
                <h3 className="mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-gray-700">
                  <User className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600" />
                  Delivery Information
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                    <User className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium break-words">{selectedOrder.contactPerson}</span>
                  </p>
                  <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                    <Phone className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-words">{selectedOrder.contactPhone}</span>
                  </p>
                  <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                    <MapPin className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-words text-xs md:text-sm">{selectedOrder.deliveryAddress}</span>
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <div className="rounded-lg md:rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-3 md:p-4 backdrop-blur-sm">
                <h3 className="mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-gray-700">
                  <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600" />
                  Order Information
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                    <Calendar className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-words">
                      Ordered: {new Date(selectedOrder.orderDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  {selectedOrder.deliveryDate && (
                    <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                      <Truck className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                      <span className="break-words">
                        Delivered: {new Date(selectedOrder.deliveryDate).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>
                  )}
                  <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                    <CreditCard className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-words">
                      Payment: {getPaymentMethodName(selectedOrder.paymentMethod)}
                    </span>
                  </p>
                  {selectedOrder.transactionId && (
                    <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                      <Barcode className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                      <span className="font-mono text-[10px] md:text-xs break-all">Txn: {selectedOrder.transactionId}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4 md:mt-6 rounded-lg md:rounded-xl border border-gray-200 bg-white/50 p-3 md:p-4 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 md:mb-3">
                <h3 className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-gray-700">
                  <Package className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600" />
                  Order Items ({selectedOrder.items.length})
                </h3>
                <button className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 md:px-3 py-1 text-[10px] md:text-xs text-blue-600 hover:bg-blue-100">
                  <Printer className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  Print
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] md:text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-left text-[8px] md:text-xs font-medium text-gray-500">#</th>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-left text-[8px] md:text-xs font-medium text-gray-500">Product</th>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-left text-[8px] md:text-xs font-medium text-gray-500 hidden sm:table-cell">Code</th>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[8px] md:text-xs font-medium text-gray-500">Qty</th>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[8px] md:text-xs font-medium text-gray-500 hidden sm:table-cell">Price</th>
                      <th className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[8px] md:text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0">
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-[8px] md:text-xs text-gray-500">{index + 1}</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-[10px] md:text-sm text-gray-800 break-words max-w-[80px] md:max-w-none">{item.productName}</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-[8px] md:text-xs font-mono text-gray-500 hidden sm:table-cell">{item.productCode}</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-gray-700 hidden sm:table-cell">৳{item.price.toLocaleString()}</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-800">৳{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-gray-200">
                    <tr>
                      <td colSpan={4} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 sm:hidden">Subtotal</td>
                      <td colSpan={5} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 hidden sm:table-cell">Subtotal</td>
                      <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-gray-800">৳{selectedOrder.subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 sm:hidden">VAT (5%)</td>
                      <td colSpan={5} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 hidden sm:table-cell">VAT (5%)</td>
                      <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-gray-800">৳{selectedOrder.vat.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 sm:hidden">Delivery</td>
                      <td colSpan={5} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm font-medium text-gray-600 hidden sm:table-cell">Delivery</td>
                      <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-gray-800">৳{selectedOrder.deliveryCharge.toLocaleString()}</td>
                    </tr>
                    {selectedOrder.discount > 0 && (
                      <tr>
                        <td colSpan={4} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-green-600 sm:hidden">Discount</td>
                        <td colSpan={5} className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-green-600 hidden sm:table-cell">Discount</td>
                        <td className="px-1.5 md:px-3 py-1.5 md:py-2 text-right text-[10px] md:text-sm text-green-600">-৳{selectedOrder.discount.toLocaleString()}</td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={4} className="px-1.5 md:px-3 py-2 md:py-3 text-right text-xs md:text-base font-bold text-gray-800 sm:hidden">Total</td>
                      <td colSpan={5} className="px-1.5 md:px-3 py-2 md:py-3 text-right text-xs md:text-base font-bold text-gray-800 hidden sm:table-cell">Total</td>
                      <td className="px-1.5 md:px-3 py-2 md:py-3 text-right text-xs md:text-base font-bold text-blue-600">৳{selectedOrder.total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-3 md:mt-4 rounded-lg md:rounded-xl border border-gray-200 bg-yellow-50/50 p-3 md:p-4 backdrop-blur-sm">
                <p className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm">
                  <FileText className="mt-0.5 h-3 w-3 md:h-4 md:w-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-gray-700 break-words">{selectedOrder.notes}</span>
                </p>
              </div>
            )}

            {/* Modal Actions with Accept/Reject Buttons - Fully Responsive */}
            <div className="mt-4 md:mt-6 flex flex-col gap-2 md:gap-3 border-t border-gray-200 pt-3 md:pt-4 sm:flex-row sm:justify-end sm:items-center">
              <button
                onClick={handleCloseModal}
                className="flex items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-gray-700 transition hover:bg-gray-200 order-2 sm:order-1"
              >
                Close
              </button>
              
              {/* Accept Button - Show only for pending orders */}
              {selectedOrder.orderStatus === "pending" && (
                <button
                  onClick={handleAcceptOrder}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50 order-3"
                >
                  {actionLoading ? (
                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                  ) : (
                    <Check className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                  Accept Order
                </button>
              )}
              
              {/* Reject Button - Show only for pending orders */}
              {selectedOrder.orderStatus === "pending" && (
                <button
                  onClick={handleRejectOrder}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50 order-4"
                >
                  {actionLoading ? (
                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                  ) : (
                    <X className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                  Reject Order
                </button>
              )}
              
              <button className="flex items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl order-5">
                <Printer className="h-3 w-3 md:h-4 md:w-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}