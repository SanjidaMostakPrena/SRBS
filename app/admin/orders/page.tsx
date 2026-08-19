
// "use client"

// import React, { useState, useMemo } from "react"
// import {
//   ShoppingBag,
//   Search,
//   Filter,
//   Calendar,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Eye,
//   Printer,
//   Download,
//   X,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Package,
//   Truck,
//   Home,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   DollarSign,
//   Tag,
//   FileText,
//   CreditCard,
//   ArrowUpRight,
//   ArrowDownRight,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react"

// // ============================================================
// // TYPES
// // ============================================================
// interface OrderItem {
//   id: string
//   productName: string
//   quantity: number
//   price: number
//   total: number
//   image?: string
// }

// interface Order {
//   id: string
//   orderNumber: string
//   customerName: string
//   customerEmail: string
//   customerPhone: string
//   customerAddress: string
//   items: OrderItem[]
//   subtotal: number
//   tax: number
//   shipping: number
//   discount: number
//   total: number
//   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
//   paymentStatus: "paid" | "unpaid" | "refunded"
//   paymentMethod: "credit_card" | "debit_card" | "cash" | "bank_transfer"
//   orderDate: string
//   shippedDate?: string
//   deliveredDate?: string
//   notes?: string
// }

// // ============================================================
// // MOCK DATA
// // ============================================================
// const MOCK_ORDERS: Order[] = [
//   {
//     id: "ord-001",
//     orderNumber: "ORD-2026-001",
//     customerName: "Rajesh Kumar",
//     customerEmail: "rajesh@email.com",
//     customerPhone: "+91 98765 43210",
//     customerAddress: "123, BKC Complex, Bandra, Mumbai - 400051",
//     items: [
//       {
//         id: "item-1",
//         productName: "Cement Bag - 50kg (Birla)",
//         quantity: 10,
//         price: 350,
//         total: 3500,
//       },
//       {
//         id: "item-2",
//         productName: "TMT Steel Rod - 12mm (SAIL)",
//         quantity: 25,
//         price: 620,
//         total: 15500,
//       },
//     ],
//     subtotal: 19000,
//     tax: 1800,
//     shipping: 500,
//     discount: 1000,
//     total: 20300,
//     status: "delivered",
//     paymentStatus: "paid",
//     paymentMethod: "credit_card",
//     orderDate: "2026-01-15T10:30:00",
//     shippedDate: "2026-01-16T14:20:00",
//     deliveredDate: "2026-01-18T11:45:00",
//     notes: "Handle with care - fragile items",
//   },
//   {
//     id: "ord-002",
//     orderNumber: "ORD-2026-002",
//     customerName: "Priya Sharma",
//     customerEmail: "priya@email.com",
//     customerPhone: "+91 87654 32109",
//     customerAddress: "456, Park Street, Kolkata - 700016",
//     items: [
//       {
//         id: "item-3",
//         productName: "Paint - Premium Emulsion (Asian Paints)",
//         quantity: 15,
//         price: 850,
//         total: 12750,
//       },
//     ],
//     subtotal: 12750,
//     tax: 1200,
//     shipping: 300,
//     discount: 500,
//     total: 13750,
//     status: "shipped",
//     paymentStatus: "paid",
//     paymentMethod: "debit_card",
//     orderDate: "2026-02-10T09:15:00",
//     shippedDate: "2026-02-12T16:40:00",
//   },
//   {
//     id: "ord-003",
//     orderNumber: "ORD-2026-003",
//     customerName: "Amit Singh",
//     customerEmail: "amit@email.com",
//     customerPhone: "+91 76543 21098",
//     customerAddress: "789, Connaught Place, Delhi - 110001",
//     items: [
//       {
//         id: "item-4",
//         productName: "Bricks - Red Clay (Pack of 100)",
//         quantity: 50,
//         price: 280,
//         total: 14000,
//       },
//       {
//         id: "item-5",
//         productName: "Sand - River Sand (Per Ton)",
//         quantity: 5,
//         price: 1200,
//         total: 6000,
//       },
//     ],
//     subtotal: 20000,
//     tax: 1900,
//     shipping: 800,
//     discount: 0,
//     total: 22700,
//     status: "pending",
//     paymentStatus: "unpaid",
//     paymentMethod: "cash",
//     orderDate: "2026-03-05T11:20:00",
//   },
//   {
//     id: "ord-004",
//     orderNumber: "ORD-2026-004",
//     customerName: "Sneha Reddy",
//     customerEmail: "sneha@email.com",
//     customerPhone: "+91 65432 10987",
//     customerAddress: "101, Anna Nagar, Chennai - 600040",
//     items: [
//       {
//         id: "item-6",
//         productName: "Waterproofing Chemical - Liquid (Dr. Fixit)",
//         quantity: 8,
//         price: 450,
//         total: 3600,
//       },
//     ],
//     subtotal: 3600,
//     tax: 340,
//     shipping: 200,
//     discount: 200,
//     total: 3940,
//     status: "processing",
//     paymentStatus: "paid",
//     paymentMethod: "bank_transfer",
//     orderDate: "2026-03-12T08:45:00",
//   },
//   {
//     id: "ord-005",
//     orderNumber: "ORD-2026-005",
//     customerName: "Vikram Patel",
//     customerEmail: "vikram@email.com",
//     customerPhone: "+91 54321 09876",
//     customerAddress: "202, MG Road, Bangalore - 560001",
//     items: [
//       {
//         id: "item-7",
//         productName: "Wood Polish - Teak Finish (Melamine)",
//         quantity: 12,
//         price: 320,
//         total: 3840,
//       },
//       {
//         id: "item-8",
//         productName: "Laminates - Premium Grade (Greenlam)",
//         quantity: 20,
//         price: 450,
//         total: 9000,
//       },
//     ],
//     subtotal: 12840,
//     tax: 1200,
//     shipping: 400,
//     discount: 800,
//     total: 13640,
//     status: "cancelled",
//     paymentStatus: "refunded",
//     paymentMethod: "credit_card",
//     orderDate: "2026-03-20T14:10:00",
//     notes: "Customer cancelled due to delivery delay",
//   },
//   {
//     id: "ord-006",
//     orderNumber: "ORD-2026-006",
//     customerName: "Ananya Gupta",
//     customerEmail: "ananya@email.com",
//     customerPhone: "+91 43210 98765",
//     customerAddress: "303, Jubilee Hills, Hyderabad - 500033",
//     items: [
//       {
//         id: "item-9",
//         productName: "Ceramic Tiles - Vitrified (Kajaria)",
//         quantity: 30,
//         price: 580,
//         total: 17400,
//       },
//     ],
//     subtotal: 17400,
//     tax: 1650,
//     shipping: 600,
//     discount: 1200,
//     total: 18450,
//     status: "delivered",
//     paymentStatus: "paid",
//     paymentMethod: "debit_card",
//     orderDate: "2026-04-02T13:25:00",
//     shippedDate: "2026-04-03T10:15:00",
//     deliveredDate: "2026-04-05T09:30:00",
//   },
// ]

// // ============================================================
// // STATUS BADGE COMPONENT
// // ============================================================
// const StatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
//   const config = {
//     pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
//     processing: { color: "bg-blue-100 text-blue-800", icon: Package },
//     shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
//     delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
//     cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
//   }

//   const { color, icon: Icon } = config[status]
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
//       <Icon className="h-3 w-3" />
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   )
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function OrderHistoryPage() {
//   // ---------- State ----------
//   const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Search and filters
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all")
//   const [paymentFilter, setPaymentFilter] = useState<Order["paymentStatus"] | "all">("all")
//   const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "year" | "all">("all")

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 5

//   // Selected order for detail view
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
//   const [showDetailModal, setShowDetailModal] = useState(false)

//   // ---------- Derived ----------
//   const filteredOrders = useMemo(() => {
//     let result = orders

//     // Search
//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase()
//       result = result.filter(
//         (o) =>
//           o.orderNumber.toLowerCase().includes(q) ||
//           o.customerName.toLowerCase().includes(q) ||
//           o.customerEmail.toLowerCase().includes(q) ||
//           o.customerPhone.includes(q)
//       )
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       result = result.filter((o) => o.status === statusFilter)
//     }

//     // Payment filter
//     if (paymentFilter !== "all") {
//       result = result.filter((o) => o.paymentStatus === paymentFilter)
//     }

//     // Date range filter
//     if (dateRange !== "all") {
//       const now = new Date()
//       let cutoffDate = new Date()

//       switch (dateRange) {
//         case "today":
//           cutoffDate.setHours(0, 0, 0, 0)
//           break
//         case "week":
//           cutoffDate.setDate(now.getDate() - 7)
//           break
//         case "month":
//           cutoffDate.setMonth(now.getMonth() - 1)
//           break
//         case "year":
//           cutoffDate.setFullYear(now.getFullYear() - 1)
//           break
//       }

//       result = result.filter((o) => new Date(o.orderDate) >= cutoffDate)
//     }

//     // Sort by date (newest first)
//     return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
//   }, [orders, searchTerm, statusFilter, paymentFilter, dateRange])

//   // Pagination
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   )

//   // Stats
//   const stats = useMemo(() => {
//     const total = orders.length
//     const pending = orders.filter((o) => o.status === "pending").length
//     const shipped = orders.filter((o) => o.status === "shipped").length
//     const delivered = orders.filter((o) => o.status === "delivered").length
//     const cancelled = orders.filter((o) => o.status === "cancelled").length
//     const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

//     return { total, pending, shipped, delivered, cancelled, totalRevenue }
//   }, [orders])

//   // ---------- Handlers ----------
//   const handleViewOrder = (order: Order) => {
//     setSelectedOrder(order)
//     setShowDetailModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowDetailModal(false)
//     setSelectedOrder(null)
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
//           <p className="text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//         <div className="max-w-md rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md">
//           <AlertCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
//           <h2 className="text-xl font-bold text-red-700">Error</h2>
//           <p className="mt-2 text-red-600">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-6 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-2 text-white transition hover:shadow-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
//       {/* Background decorations */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 blur-3xl" />
//         <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-6 rounded-2xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl md:rounded-3xl md:p-8">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-4">
//               <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg">
//                 <ShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
//               </div>
//               <div>
//                 <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
//                   Order History
//                 </h1>
//                 <p className="text-sm text-gray-600">Track and manage all customer orders</p>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-3">
//               <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
//                 <Download className="h-4 w-4" />
//                 Export
//               </button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//             <div className="rounded-xl bg-white/60 p-3 backdrop-blur-sm">
//               <p className="text-xs text-gray-500">Total Orders</p>
//               <p className="text-lg font-bold text-gray-800">{stats.total}</p>
//             </div>
//             <div className="rounded-xl bg-yellow-50/60 p-3 backdrop-blur-sm">
//               <p className="text-xs text-yellow-600">Pending</p>
//               <p className="text-lg font-bold text-yellow-700">{stats.pending}</p>
//             </div>
           
//             <div className="rounded-xl bg-green-50/60 p-3 backdrop-blur-sm">
//               <p className="text-xs text-green-600">Delivered</p>
//               <p className="text-lg font-bold text-green-700">{stats.delivered}</p>
//             </div>
//             <div className="rounded-xl bg-red-50/60 p-3 backdrop-blur-sm">
//               <p className="text-xs text-red-600">Cancelled</p>
//               <p className="text-lg font-bold text-red-700">{stats.cancelled}</p>
//             </div>
//             <div className="rounded-xl bg-blue-50/60 p-3 backdrop-blur-sm">
//               <p className="text-xs text-blue-600">Revenue</p>
//               <p className="text-lg font-bold text-blue-700">₹{stats.totalRevenue.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-4 shadow-2xl backdrop-blur-xl md:p-6">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by order number, customer name, email or phone..."
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
//                 <option value="processing">Processing</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
             
             
//               <button
//                 onClick={() => {
//                   setSearchTerm("")
//                   setStatusFilter("all")
//                   setPaymentFilter("all")
//                   setDateRange("all")
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
//               <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Customer</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden lg:table-cell">Date</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
//                   <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Payment</th>
//                   <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
//                   <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedOrders.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="py-12 text-center text-gray-400">
//                       <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" />
//                       <p className="text-base">No orders found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="border-b border-gray-100/60 transition hover:bg-white/30"
//                     >
//                       <td className="px-4 py-3">
//                         <div>
//                           <p className="font-mono text-xs font-medium text-gray-700">
//                             {order.orderNumber}
//                           </p>
//                           <p className="text-xs text-gray-500 md:hidden">{order.customerName}</p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 hidden md:table-cell">
//                         <div>
//                           <p className="font-medium text-gray-800">{order.customerName}</p>
//                           <p className="text-xs text-gray-500">{order.customerEmail}</p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 hidden lg:table-cell">
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
//                         <StatusBadge status={order.status} />
//                       </td>
//                       <td className="px-4 py-3 hidden sm:table-cell">
//                         <span
//                           className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
//                             order.paymentStatus === "paid"
//                               ? "bg-green-100 text-green-700"
//                               : order.paymentStatus === "refunded"
//                               ? "bg-orange-100 text-orange-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {order.paymentStatus === "paid" && <CheckCircle className="h-3 w-3" />}
//                           {order.paymentStatus === "refunded" && <ArrowDownRight className="h-3 w-3" />}
//                           {order.paymentStatus === "unpaid" && <XCircle className="h-3 w-3" />}
//                           {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <p className="font-bold text-gray-800">₹{order.total.toLocaleString()}</p>
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

//       {/* Order Detail Modal */}
//       {showDetailModal && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
//             {/* Modal Header */}
//             <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
//                     Order Details
//                   </h2>
//                   <StatusBadge status={selectedOrder.status} />
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
//               <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
//                 <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <User className="h-4 w-4 text-blue-600" />
//                   Customer Information
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="flex items-start gap-2 text-sm">
//                     <User className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span className="font-medium">{selectedOrder.customerName}</span>
//                   </p>
//                   <p className="flex items-start gap-2 text-sm">
//                     <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>{selectedOrder.customerEmail}</span>
//                   </p>
//                   <p className="flex items-start gap-2 text-sm">
//                     <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>{selectedOrder.customerPhone}</span>
//                   </p>
//                   <p className="flex items-start gap-2 text-sm">
//                     <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>{selectedOrder.customerAddress}</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Order Info */}
//               <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
//                 <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <Calendar className="h-4 w-4 text-blue-600" />
//                   Order Information
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="flex items-start gap-2 text-sm">
//                     <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
//                     <span>
//                       Ordered:{" "}
//                       {new Date(selectedOrder.orderDate).toLocaleString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </p>
//                   {selectedOrder.shippedDate && (
//                     <p className="flex items-start gap-2 text-sm">
//                       <Truck className="mt-0.5 h-4 w-4 text-gray-400" />
//                       <span>
//                         Shipped:{" "}
//                         {new Date(selectedOrder.shippedDate).toLocaleString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </p>
//                   )}
//                   {selectedOrder.deliveredDate && (
//                     <p className="flex items-start gap-2 text-sm">
//                       <CheckCircle className="mt-0.5 h-4 w-4 text-gray-400" />
//                       <span>
//                         Delivered:{" "}
//                         {new Date(selectedOrder.deliveredDate).toLocaleString("en-IN", {
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
//                       Payment:{" "}
//                       <span
//                         className={`font-medium ${
//                           selectedOrder.paymentStatus === "paid"
//                             ? "text-green-600"
//                             : selectedOrder.paymentStatus === "refunded"
//                             ? "text-orange-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {selectedOrder.paymentStatus.charAt(0).toUpperCase() +
//                           selectedOrder.paymentStatus.slice(1)}
//                       </span>{" "}
//                       via {selectedOrder.paymentMethod.replace("_", " ")}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="mt-6 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
//               <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                 <Package className="h-4 w-4 text-blue-600" />
//                 Order Items ({selectedOrder.items.length})
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="border-b border-gray-200">
//                     <tr>
//                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">#</th>
//                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Product</th>
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
//                         <td className="px-3 py-2 text-right text-sm text-gray-700">{item.quantity}</td>
//                         <td className="px-3 py-2 text-right text-sm text-gray-700">
//                           ₹{item.price.toLocaleString()}
//                         </td>
//                         <td className="px-3 py-2 text-right text-sm font-medium text-gray-800">
//                           ₹{item.total.toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot className="border-t-2 border-gray-200">
//                     <tr>
//                       <td colSpan={4} className="px-3 py-2 text-right text-sm font-medium text-gray-600">
//                         Subtotal
//                       </td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">
//                         ₹{selectedOrder.subtotal.toLocaleString()}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={4} className="px-3 py-2 text-right text-sm text-gray-600">
//                         Tax
//                       </td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">
//                         ₹{selectedOrder.tax.toLocaleString()}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={4} className="px-3 py-2 text-right text-sm text-gray-600">
//                         Shipping
//                       </td>
//                       <td className="px-3 py-2 text-right text-sm text-gray-800">
//                         ₹{selectedOrder.shipping.toLocaleString()}
//                       </td>
//                     </tr>
//                     {selectedOrder.discount > 0 && (
//                       <tr>
//                         <td colSpan={4} className="px-3 py-2 text-right text-sm text-green-600">
//                           Discount
//                         </td>
//                         <td className="px-3 py-2 text-right text-sm text-green-600">
//                           -₹{selectedOrder.discount.toLocaleString()}
//                         </td>
//                       </tr>
//                     )}
//                     <tr className="border-t-2 border-gray-300">
//                       <td colSpan={4} className="px-3 py-3 text-right text-base font-bold text-gray-800">
//                         Total
//                       </td>
//                       <td className="px-3 py-3 text-right text-base font-bold text-blue-600">
//                         ₹{selectedOrder.total.toLocaleString()}
//                       </td>
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

//             {/* Modal Actions */}
//             <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
//               <button
//                 onClick={handleCloseModal}
//                 className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
//               >
//                 Close
//               </button>
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

import React, { useState, useMemo } from "react"
import {
  ShoppingBag,
  Search,
  Filter,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  Download,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Tag,
  FileText,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useRouter } from "next/navigation"

// ============================================================
// TYPES
// ============================================================
interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
  total: number
  image?: string
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "unpaid" | "refunded"
  paymentMethod: "credit_card" | "debit_card" | "cash" | "bank_transfer"
  orderDate: string
  shippedDate?: string
  deliveredDate?: string
  notes?: string
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2026-001",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@email.com",
    customerPhone: "+91 98765 43210",
    customerAddress: "123, BKC Complex, Bandra, Mumbai - 400051",
    items: [
      {
        id: "item-1",
        productName: "Cement Bag - 50kg (Birla)",
        quantity: 10,
        price: 350,
        total: 3500,
      },
      {
        id: "item-2",
        productName: "TMT Steel Rod - 12mm (SAIL)",
        quantity: 25,
        price: 620,
        total: 15500,
      },
    ],
    subtotal: 19000,
    tax: 1800,
    shipping: 500,
    discount: 1000,
    total: 20300,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    orderDate: "2026-01-15T10:30:00",
    shippedDate: "2026-01-16T14:20:00",
    deliveredDate: "2026-01-18T11:45:00",
    notes: "Handle with care - fragile items",
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2026-002",
    customerName: "Priya Sharma",
    customerEmail: "priya@email.com",
    customerPhone: "+91 87654 32109",
    customerAddress: "456, Park Street, Kolkata - 700016",
    items: [
      {
        id: "item-3",
        productName: "Paint - Premium Emulsion (Asian Paints)",
        quantity: 15,
        price: 850,
        total: 12750,
      },
    ],
    subtotal: 12750,
    tax: 1200,
    shipping: 300,
    discount: 500,
    total: 13750,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "debit_card",
    orderDate: "2026-02-10T09:15:00",
    shippedDate: "2026-02-12T16:40:00",
  },
  {
    id: "ord-003",
    orderNumber: "ORD-2026-003",
    customerName: "Amit Singh",
    customerEmail: "amit@email.com",
    customerPhone: "+91 76543 21098",
    customerAddress: "789, Connaught Place, Delhi - 110001",
    items: [
      {
        id: "item-4",
        productName: "Bricks - Red Clay (Pack of 100)",
        quantity: 50,
        price: 280,
        total: 14000,
      },
      {
        id: "item-5",
        productName: "Sand - River Sand (Per Ton)",
        quantity: 5,
        price: 1200,
        total: 6000,
      },
    ],
    subtotal: 20000,
    tax: 1900,
    shipping: 800,
    discount: 0,
    total: 22700,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "cash",
    orderDate: "2026-03-05T11:20:00",
  },
  {
    id: "ord-004",
    orderNumber: "ORD-2026-004",
    customerName: "Sneha Reddy",
    customerEmail: "sneha@email.com",
    customerPhone: "+91 65432 10987",
    customerAddress: "101, Anna Nagar, Chennai - 600040",
    items: [
      {
        id: "item-6",
        productName: "Waterproofing Chemical - Liquid (Dr. Fixit)",
        quantity: 8,
        price: 450,
        total: 3600,
      },
    ],
    subtotal: 3600,
    tax: 340,
    shipping: 200,
    discount: 200,
    total: 3940,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    orderDate: "2026-03-12T08:45:00",
  },
  {
    id: "ord-005",
    orderNumber: "ORD-2026-005",
    customerName: "Vikram Patel",
    customerEmail: "vikram@email.com",
    customerPhone: "+91 54321 09876",
    customerAddress: "202, MG Road, Bangalore - 560001",
    items: [
      {
        id: "item-7",
        productName: "Wood Polish - Teak Finish (Melamine)",
        quantity: 12,
        price: 320,
        total: 3840,
      },
      {
        id: "item-8",
        productName: "Laminates - Premium Grade (Greenlam)",
        quantity: 20,
        price: 450,
        total: 9000,
      },
    ],
    subtotal: 12840,
    tax: 1200,
    shipping: 400,
    discount: 800,
    total: 13640,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "credit_card",
    orderDate: "2026-03-20T14:10:00",
    notes: "Customer cancelled due to delivery delay",
  },
  {
    id: "ord-006",
    orderNumber: "ORD-2026-006",
    customerName: "Ananya Gupta",
    customerEmail: "ananya@email.com",
    customerPhone: "+91 43210 98765",
    customerAddress: "303, Jubilee Hills, Hyderabad - 500033",
    items: [
      {
        id: "item-9",
        productName: "Ceramic Tiles - Vitrified (Kajaria)",
        quantity: 30,
        price: 580,
        total: 17400,
      },
    ],
    subtotal: 17400,
    tax: 1650,
    shipping: 600,
    discount: 1200,
    total: 18450,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "debit_card",
    orderDate: "2026-04-02T13:25:00",
    shippedDate: "2026-04-03T10:15:00",
    deliveredDate: "2026-04-05T09:30:00",
  },
]

// ============================================================
// STATUS BADGE COMPONENT
// ============================================================
const StatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
  const config = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    processing: { color: "bg-blue-100 text-blue-800", icon: Package },
    shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
    delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
  }

  const { color, icon: Icon } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function OrderHistoryPage() {
  const router = useRouter()
  
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all")
  const [paymentFilter, setPaymentFilter] = useState<Order["paymentStatus"] | "all">("all")
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "year" | "all">("all")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Selected order for detail view
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
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
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter)
    }

    // Payment filter
    if (paymentFilter !== "all") {
      result = result.filter((o) => o.paymentStatus === paymentFilter)
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = new Date()
      let cutoffDate = new Date()

      switch (dateRange) {
        case "today":
          cutoffDate.setHours(0, 0, 0, 0)
          break
        case "week":
          cutoffDate.setDate(now.getDate() - 7)
          break
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      result = result.filter((o) => new Date(o.orderDate) >= cutoffDate)
    }

    // Sort by date (newest first)
    return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  }, [orders, searchTerm, statusFilter, paymentFilter, dateRange])

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter((o) => o.status === "pending").length
    const shipped = orders.filter((o) => o.status === "shipped").length
    const delivered = orders.filter((o) => o.status === "delivered").length
    const cancelled = orders.filter((o) => o.status === "cancelled").length
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    return { total, pending, shipped, delivered, cancelled, totalRevenue }
  }, [orders])

  // ---------- Handlers ----------
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
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
    
    // Update order status to processing
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, status: "processing" as Order["status"] }
          : o
      )
    )
    
    // Update selected order
    setSelectedOrder((prev) =>
      prev ? { ...prev, status: "processing" as Order["status"] } : null
    )
    
    setActionLoading(false)
    
    // Show success notification (you can replace with toast)
    alert(`Order ${selectedOrder.orderNumber} has been accepted and is now processing.`)
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
          ? { ...o, status: "cancelled" as Order["status"] }
          : o
      )
    )
    
    // Update selected order
    setSelectedOrder((prev) =>
      prev ? { ...prev, status: "cancelled" as Order["status"] } : null
    )
    
    setActionLoading(false)
    
    // Show success notification (you can replace with toast)
    alert(`Order ${selectedOrder.orderNumber} has been rejected.`)
  }

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading orders...</p>
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
                <ShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  Seller Order Management
                </h1>
                <p className="text-sm text-gray-600">Track and manage all customer orders</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
            
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl bg-white/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="rounded-xl bg-yellow-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-yellow-600">Pending</p>
              <p className="text-lg font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <div className="rounded-xl bg-green-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-green-600">Delivered</p>
              <p className="text-lg font-bold text-green-700">{stats.delivered}</p>
            </div>
            <div className="rounded-xl bg-red-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-red-600">Cancelled</p>
              <p className="text-lg font-bold text-red-700">{stats.cancelled}</p>
            </div>
            <div className="rounded-xl bg-blue-50/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-blue-600">Revenue</p>
              <p className="text-lg font-bold text-blue-700">৳{stats.totalRevenue.toLocaleString()}</p>
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
                placeholder="Search by order number, customer name, email or phone..."
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
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPaymentFilter("all")
                  setDateRange("all")
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
              <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Order</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Payment</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" />
                      <p className="text-base">No orders found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100/60 transition hover:bg-white/30"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-mono text-xs font-medium text-gray-700">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden">{order.customerName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div>
                          <p className="font-medium text-gray-800">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
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
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : order.paymentStatus === "refunded"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.paymentStatus === "paid" && <CheckCircle className="h-3 w-3" />}
                          {order.paymentStatus === "refunded" && <ArrowDownRight className="h-3 w-3" />}
                          {order.paymentStatus === "unpaid" && <XCircle className="h-3 w-3" />}
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span>
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

          {/* Pagination */}
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
                  className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
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
                  className="rounded-lg px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                    Order Details
                  </h2>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <p className="mt-1 font-mono text-sm text-gray-500">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order Info Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Customer Info */}
              <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-blue-600" />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <User className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span className="font-medium">{selectedOrder.customerName}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedOrder.customerEmail}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedOrder.customerPhone}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>{selectedOrder.customerAddress}</span>
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Order Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-start gap-2 text-sm">
                    <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Ordered:{" "}
                      {new Date(selectedOrder.orderDate).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  {selectedOrder.shippedDate && (
                    <p className="flex items-start gap-2 text-sm">
                      <Truck className="mt-0.5 h-4 w-4 text-gray-400" />
                      <span>
                        Shipped:{" "}
                        {new Date(selectedOrder.shippedDate).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>
                  )}
                  {selectedOrder.deliveredDate && (
                    <p className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-gray-400" />
                      <span>
                        Delivered:{" "}
                        {new Date(selectedOrder.deliveredDate).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>
                  )}
                  <p className="flex items-start gap-2 text-sm">
                    <CreditCard className="mt-0.5 h-4 w-4 text-gray-400" />
                    <span>
                      Payment:{" "}
                      <span
                        className={`font-medium ${
                          selectedOrder.paymentStatus === "paid"
                            ? "text-green-600"
                            : selectedOrder.paymentStatus === "refunded"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedOrder.paymentStatus.charAt(0).toUpperCase() +
                          selectedOrder.paymentStatus.slice(1)}
                      </span>{" "}
                      via {selectedOrder.paymentMethod.replace("_", " ")}
                    </span>
                  </p>
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
                        <td className="px-3 py-2 text-right text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700">
                          ৳{item.price.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-right text-sm font-medium text-gray-800">
                          ৳{item.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-gray-200">
                    <tr>
                      <td colSpan={4} className="px-3 py-2 text-right text-sm font-medium text-gray-600">
                        Subtotal
                      </td>
                      <td className="px-3 py-2 text-right text-sm text-gray-800">
                        ৳{selectedOrder.subtotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-3 py-2 text-right text-sm text-gray-600">
                        Tax
                      </td>
                      <td className="px-3 py-2 text-right text-sm text-gray-800">
                        ৳{selectedOrder.tax.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-3 py-2 text-right text-sm text-gray-600">
                        Shipping
                      </td>
                      <td className="px-3 py-2 text-right text-sm text-gray-800">
                        ৳{selectedOrder.shipping.toLocaleString()}
                      </td>
                    </tr>
                    {selectedOrder.discount > 0 && (
                      <tr>
                        <td colSpan={4} className="px-3 py-2 text-right text-sm text-green-600">
                          Discount
                        </td>
                        <td className="px-3 py-2 text-right text-sm text-green-600">
                          -৳{selectedOrder.discount.toLocaleString()}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={4} className="px-3 py-3 text-right text-base font-bold text-gray-800">
                        Total
                      </td>
                      <td className="px-3 py-3 text-right text-base font-bold text-blue-600">
                        ৳{selectedOrder.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-yellow-50/50 p-4 backdrop-blur-sm">
                <p className="flex items-start gap-2 text-sm">
                  <FileText className="mt-0.5 h-4 w-4 text-yellow-600" />
                  <span className="text-gray-700">{selectedOrder.notes}</span>
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end sm:items-center">
              <button
                onClick={handleCloseModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Close
              </button>
              
              {/* Accept Button - Show only for pending orders */}
              {selectedOrder.status === "pending" && (
                <button
                  onClick={handleAcceptOrder}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Accept Order
                </button>
              )}
              
              {/* Reject Button - Show only for pending orders */}
              {selectedOrder.status === "pending" && (
                <button
                  onClick={handleRejectOrder}
                  disabled={actionLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  Reject Order
                </button>
              )}
              
              <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
                <Printer className="h-4 w-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}