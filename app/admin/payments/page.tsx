
// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Building2,
//   CreditCard,
//   IndianRupee,
//   Search,
//   Filter,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   Users,
//   User,
//   Calendar,
//   TrendingUp,
//   TrendingDown,
//   Wallet,
//   PieChart,
//   ArrowUpRight,
//   ArrowDownRight,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface Seller {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// interface Customer {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   currentDue: number;
// }

// interface Transaction {
//   id: string;
//   sellerId: string;
//   customerId: string;
//   customerName: string;
//   sellerName: string;
//   amount: number;
//   type: "collection" | "due";
//   date: string;
//   remarks?: string;
// }

// interface SellerSummary {
//   sellerId: string;
//   sellerName: string;
//   totalCollection: number;
//   totalDueCollected: number;
//   netCollection: number;
// }

// interface CustomerSummary {
//   customerId: string;
//   customerName: string;
//   totalPaid: number;
//   currentDue: number;
//   lastPayment: string;
// }

// // ============================================================
// // MOCK DATA – Replace with API calls
// // ============================================================
// const MOCK_SELLERS: Seller[] = [
//   { id: "s1", name: "Rajesh Kumar", email: "rajesh.kumar@srbs.com", phone: "+91 98765 43210" },
//   { id: "s2", name: "Priya Sharma", email: "priya.sharma@srbs.com", phone: "+91 87654 32109" },
//   { id: "s3", name: "Amit Singh", email: "amit.singh@srbs.com", phone: "+91 76543 21098" },
//   { id: "s4", name: "Sneha Reddy", email: "sneha.reddy@srbs.com", phone: "+91 65432 10987" },
// ];

// const MOCK_CUSTOMERS: Customer[] = [
//   { id: "c1", name: "Green Valley Constructions", phone: "+91 98765 43210", email: "info@gvc.com", currentDue: 0 },
//   { id: "c2", name: "Apex Builders", phone: "+91 87654 32109", email: "accounts@apex.in", currentDue: 1250.50 },
//   { id: "c3", name: "SRBS Retail Store – Mumbai", phone: "+91 76543 21098", email: "mumbai@srbs.com", currentDue: 450.00 },
//   { id: "c4", name: "Kolkata Infrastructure Ltd", phone: "+91 65432 10987", email: "procurement@kil.net", currentDue: 3200.75 },
//   { id: "c5", name: "Delhi Constructors", phone: "+91 54321 09876", email: "info@delhicon.com", currentDue: 780.25 },
// ];

// const MOCK_TRANSACTIONS: Transaction[] = [
//   {
//     id: "t1",
//     sellerId: "s1",
//     customerId: "c2",
//     customerName: "Apex Builders",
//     sellerName: "Rajesh Kumar",
//     amount: 5000,
//     type: "collection",
//     date: "2025-01-20",
//     remarks: "Partial payment",
//   },
//   {
//     id: "t2",
//     sellerId: "s2",
//     customerId: "c3",
//     customerName: "SRBS Retail Store – Mumbai",
//     sellerName: "Priya Sharma",
//     amount: 2000,
//     type: "collection",
//     date: "2025-01-20",
//     remarks: "Payment received",
//   },
//   {
//     id: "t3",
//     sellerId: "s1",
//     customerId: "c4",
//     customerName: "Kolkata Infrastructure Ltd",
//     sellerName: "Rajesh Kumar",
//     amount: 3500,
//     type: "collection",
//     date: "2025-01-19",
//     remarks: "Advance payment",
//   },
//   {
//     id: "t4",
//     sellerId: "s3",
//     customerId: "c1",
//     customerName: "Green Valley Constructions",
//     sellerName: "Amit Singh",
//     amount: 1200,
//     type: "collection",
//     date: "2025-01-19",
//     remarks: "Full settlement",
//   },
//   {
//     id: "t5",
//     sellerId: "s4",
//     customerId: "c5",
//     customerName: "Delhi Constructors",
//     sellerName: "Sneha Reddy",
//     amount: 2500,
//     type: "collection",
//     date: "2025-01-18",
//     remarks: "Partial payment",
//   },
//   {
//     id: "t6",
//     sellerId: "s2",
//     customerId: "c4",
//     customerName: "Kolkata Infrastructure Ltd",
//     sellerName: "Priya Sharma",
//     amount: 1200,
//     type: "due",
//     date: "2025-01-17",
//     remarks: "Due reminder",
//   },
//   {
//     id: "t7",
//     sellerId: "s1",
//     customerId: "c2",
//     customerName: "Apex Builders",
//     sellerName: "Rajesh Kumar",
//     amount: 800,
//     type: "due",
//     date: "2025-01-16",
//     remarks: "Outstanding due",
//   },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function PaymentsReportPage() {
//   // ---------- State ----------
//   const [sellers] = useState<Seller[]>(MOCK_SELLERS);
//   const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
//   const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSeller, setSelectedSeller] = useState<string>("all");
//   const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
//   const [dateFrom, setDateFrom] = useState<string>("");
//   const [dateTo, setDateTo] = useState<string>("");

//   // ---------- Derived: Filtered Transactions ----------
//   const filteredTransactions = useMemo(() => {
//     let result = transactions;
//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase();
//       result = result.filter(
//         (t) =>
//           t.customerName.toLowerCase().includes(q) ||
//           t.sellerName.toLowerCase().includes(q) ||
//           t.id.toLowerCase().includes(q)
//       );
//     }
//     if (selectedSeller !== "all") {
//       result = result.filter((t) => t.sellerId === selectedSeller);
//     }
//     if (selectedCustomer !== "all") {
//       result = result.filter((t) => t.customerId === selectedCustomer);
//     }
//     if (dateFrom) {
//       result = result.filter((t) => t.date >= dateFrom);
//     }
//     if (dateTo) {
//       result = result.filter((t) => t.date <= dateTo);
//     }
//     return result;
//   }, [transactions, searchTerm, selectedSeller, selectedCustomer, dateFrom, dateTo]);

//   // ---------- Derived: Summary Stats ----------
//   const totalCollections = filteredTransactions
//     .filter((t) => t.type === "collection")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const totalDue = filteredTransactions
//     .filter((t) => t.type === "due")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const netAmount = totalCollections - totalDue;

//   // ---------- Derived: Seller-wise Summary ----------
//   const sellerSummary = useMemo(() => {
//     const map = new Map<string, SellerSummary>();
//     sellers.forEach((s) => {
//       map.set(s.id, {
//         sellerId: s.id,
//         sellerName: s.name,
//         totalCollection: 0,
//         totalDueCollected: 0,
//         netCollection: 0,
//       });
//     });

//     filteredTransactions.forEach((t) => {
//       const seller = map.get(t.sellerId);
//       if (seller) {
//         if (t.type === "collection") {
//           seller.totalCollection += t.amount;
//         } else {
//           seller.totalDueCollected += t.amount;
//         }
//         seller.netCollection = seller.totalCollection - seller.totalDueCollected;
//       }
//     });

//     return Array.from(map.values());
//   }, [filteredTransactions, sellers]);

//   // ---------- Derived: Customer-wise Summary ----------
//   const customerSummary = useMemo(() => {
//     const map = new Map<string, CustomerSummary>();
//     customers.forEach((c) => {
//       map.set(c.id, {
//         customerId: c.id,
//         customerName: c.name,
//         totalPaid: 0,
//         currentDue: c.currentDue,
//         lastPayment: "",
//       });
//     });

//     // Calculate total paid from collections
//     filteredTransactions
//       .filter((t) => t.type === "collection")
//       .forEach((t) => {
//         const customer = map.get(t.customerId);
//         if (customer) {
//           customer.totalPaid += t.amount;
//           if (!customer.lastPayment || t.date > customer.lastPayment) {
//             customer.lastPayment = t.date;
//           }
//         }
//       });

//     return Array.from(map.values());
//   }, [filteredTransactions, customers]);

//   // ---------- Handlers ----------
//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setSelectedSeller("all");
//     setSelectedCustomer("all");
//     setDateFrom("");
//     setDateTo("");
//   };

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading payment data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//         <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-xl">
//           <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-red-700">Error</h2>
//           <p className="text-red-600 mt-2">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-8 relative overflow-hidden">
//       {/* Background decorations - hidden on mobile */}
//       <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header - responsive */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4 bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/40">
//           <div className="flex items-center gap-3 sm:gap-4">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
//               <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />
//             </div>
//             <div>
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
//                 Payments Report
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Collections, Due & Seller/Customer breakdown</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="bg-white/40 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/50 shadow-sm flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
//               <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
//               <span className="hidden xs:inline">{new Date().toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards - fully responsive grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
//           <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
//             <div className="flex items-center justify-between">
//               <div className="min-w-0">
//                 <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Collections</p>
//                 <p className="text-base sm:text-lg md:text-2xl font-bold text-green-700 truncate">৳{totalCollections.toFixed(2)}</p>
//               </div>
//               <div className="bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
//                 <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
//             <div className="flex items-center justify-between">
//               <div className="min-w-0">
//                 <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Due</p>
//                 <p className="text-base sm:text-lg md:text-2xl font-bold text-amber-700 truncate">৳{totalDue.toFixed(2)}</p>
//               </div>
//               <div className="bg-amber-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
//                 <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
//             <div className="flex items-center justify-between">
//               <div className="min-w-0">
//                 <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Net Amount</p>
//                 <p className={`text-base sm:text-lg md:text-2xl font-bold truncate ${netAmount >= 0 ? "text-blue-700" : "text-red-700"}`}>
//                   ৳{netAmount.toFixed(2)}
//                 </p>
//               </div>
//               <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0 ${netAmount >= 0 ? "bg-blue-100" : "bg-red-100"}`}>
//                 <Wallet className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${netAmount >= 0 ? "text-blue-600" : "text-red-600"}`} />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
//             <div className="flex items-center justify-between">
//               <div className="min-w-0">
//                 <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Transactions</p>
//                 <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-700 truncate">{filteredTransactions.length}</p>
//               </div>
//               <div className="bg-purple-100 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
//                 <PieChart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters - fully responsive */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/50 mb-4 sm:mb-6">
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
//             <div className="relative col-span-1 xs:col-span-2 lg:col-span-1">
//               <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//               />
//             </div>
//             <select
//               value={selectedSeller}
//               onChange={(e) => setSelectedSeller(e.target.value)}
//               className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm truncate"
//             >
//               <option value="all">All Sellers</option>
//               {sellers.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={selectedCustomer}
//               onChange={(e) => setSelectedCustomer(e.target.value)}
//               className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm truncate"
//             >
//               <option value="all">All Customers</option>
//               {customers.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//               placeholder="From"
//             />
//             <div className="flex gap-1 sm:gap-2 col-span-1 xs:col-span-2 lg:col-span-1">
//               <input
//                 type="date"
//                 value={dateTo}
//                 onChange={(e) => setDateTo(e.target.value)}
//                 className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                 placeholder="To"
//               />
//               <button
//                 onClick={handleClearFilters}
//                 className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-200/70 backdrop-blur-sm rounded-lg sm:rounded-xl hover:bg-gray-300/70 transition flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm flex-shrink-0"
//               >
//                 <X className="h-3 w-3 sm:h-4 sm:w-4" />
//                 <span className="hidden xs:inline">Clear</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Seller-wise & Customer-wise Summary - responsive grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
//           {/* Seller-wise */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//             <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
//               <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
//                 <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
//                 Seller-wise Summary
//               </h3>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs sm:text-sm">
//                 <thead className="bg-white/30">
//                   <tr>
//                     <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Seller</th>
//                     <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Collection</th>
//                     <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Due</th>
//                     <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Net</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sellerSummary.length === 0 ? (
//                     <tr>
//                       <td colSpan={4} className="text-center py-4 sm:py-6 text-gray-400">No data</td>
//                     </tr>
//                   ) : (
//                     sellerSummary.map((seller) => (
//                       <tr key={seller.sellerId} className="border-b border-gray-100/60 hover:bg-white/30 transition">
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">{seller.sellerName}</td>
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-green-600 font-medium text-xs sm:text-sm">৳{seller.totalCollection.toFixed(2)}</td>
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-amber-600 font-medium text-xs sm:text-sm">৳{seller.totalDueCollected.toFixed(2)}</td>
//                         <td className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right font-bold text-xs sm:text-sm ${seller.netCollection >= 0 ? "text-blue-700" : "text-red-600"}`}>
//                           ৳{seller.netCollection.toFixed(2)}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Customer-wise */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//             <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
//               <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
//                 <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
//                 Customer-wise Summary
//               </h3>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs sm:text-sm">
//                 <thead className="bg-white/30">
//                   <tr>
//                     <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Customer</th>
//                     <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Total Paid</th>
//                     <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Due</th>
//                     <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden sm:table-cell">Last Payment</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {customerSummary.length === 0 ? (
//                     <tr>
//                       <td colSpan={4} className="text-center py-4 sm:py-6 text-gray-400">No data</td>
//                     </tr>
//                   ) : (
//                     customerSummary.map((customer) => (
//                       <tr key={customer.customerId} className="border-b border-gray-100/60 hover:bg-white/30 transition">
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none">{customer.customerName}</td>
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-green-600 font-medium text-xs sm:text-sm">৳{customer.totalPaid.toFixed(2)}</td>
//                         <td className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right font-bold text-xs sm:text-sm ${customer.currentDue > 0 ? "text-amber-600" : "text-green-600"}`}>
//                           ৳{customer.currentDue.toFixed(2)}
//                         </td>
//                         <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-500 text-xs sm:text-sm hidden sm:table-cell">
//                           {customer.lastPayment ? new Date(customer.lastPayment).toLocaleDateString() : "—"}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History - fully responsive table */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//           <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
//             <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
//               <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
//               Transaction History
//             </h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-xs sm:text-sm">
//               <thead className="bg-white/30">
//                 <tr>
//                   <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">ID</th>
//                   <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Customer</th>
//                   <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden sm:table-cell">Seller</th>
//                   <th className="text-right px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Amount</th>
//                   <th className="text-center px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Type</th>
//                   <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
//                   <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden lg:table-cell">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="text-center py-6 sm:py-10 text-gray-400">
//                       <CreditCard className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-1 sm:mb-2 opacity-30" />
//                       <p className="text-xs sm:text-sm">No transactions found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredTransactions.map((t) => (
//                     <tr key={t.id} className="border-b border-gray-100/60 hover:bg-white/30 transition">
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-mono text-[10px] sm:text-xs text-gray-500">{t.id}</td>
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none">{t.customerName}</td>
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-600 hidden sm:table-cell text-xs sm:text-sm truncate max-w-[80px]">{t.sellerName}</td>
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-right font-bold text-gray-800 text-xs sm:text-sm">৳{t.amount.toFixed(2)}</td>
//                       <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 text-center">
//                         <TransactionTypeBadge type={t.type} />
//                       </td>
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-500 hidden md:table-cell text-xs sm:text-sm">{new Date(t.date).toLocaleDateString()}</td>
//                       <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-500 text-xs sm:text-sm hidden lg:table-cell truncate max-w-[100px]">{t.remarks || "—"}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200/50 text-[10px] sm:text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
//             Showing {filteredTransactions.length} transactions
//           </div>
//         </div>
//       </div>

//       {/* Animation keyframes */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         @media (max-width: 400px) {
//           .xs\\:inline { display: inline; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ============================================================
// // COMPONENTS
// // ============================================================

// interface TransactionTypeBadgeProps {
//   type: "collection" | "due";
// }

// const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type }) => {
//   if (type === "collection") {
//     return (
//       <span className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 inline-flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
//         <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
//         <span className="hidden xs:inline">Collection</span>
//         <span className="xs:hidden">Coll</span>
//       </span>
//     );
//   }
//   return (
//     <span className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-100 text-amber-700 inline-flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
//       <ArrowDownRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
//       <span className="hidden xs:inline">Due</span>
//       <span className="xs:hidden">Due</span>
//     </span>
//   );
// };
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  CreditCard,
  IndianRupee,
  Search,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Users,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  currentDue: number;
}

interface Transaction {
  id: string;
  sellerId: string;
  customerId: string;
  customerName: string;
  sellerName: string;
  amount: number;
  type: "collection" | "due";
  date: string;
  remarks?: string;
}

interface SellerSummary {
  sellerId: string;
  sellerName: string;
  totalCollection: number;
  totalDueCollected: number;
  netCollection: number;
}

interface CustomerSummary {
  customerId: string;
  customerName: string;
  totalPaid: number;
  currentDue: number;
  lastPayment: string;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_SELLERS: Seller[] = [
  { id: "s1", name: "Rajesh Kumar", email: "rajesh.kumar@srbs.com", phone: "+91 98765 43210" },
  { id: "s2", name: "Priya Sharma", email: "priya.sharma@srbs.com", phone: "+91 87654 32109" },
  { id: "s3", name: "Amit Singh", email: "amit.singh@srbs.com", phone: "+91 76543 21098" },
  { id: "s4", name: "Sneha Reddy", email: "sneha.reddy@srbs.com", phone: "+91 65432 10987" },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Green Valley Constructions", phone: "+91 98765 43210", email: "info@gvc.com", currentDue: 0 },
  { id: "c2", name: "Apex Builders", phone: "+91 87654 32109", email: "accounts@apex.in", currentDue: 1250.50 },
  { id: "c3", name: "SRBS Retail Store – Mumbai", phone: "+91 76543 21098", email: "mumbai@srbs.com", currentDue: 450.00 },
  { id: "c4", name: "Kolkata Infrastructure Ltd", phone: "+91 65432 10987", email: "procurement@kil.net", currentDue: 3200.75 },
  { id: "c5", name: "Delhi Constructors", phone: "+91 54321 09876", email: "info@delhicon.com", currentDue: 780.25 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    sellerId: "s1",
    customerId: "c2",
    customerName: "Apex Builders",
    sellerName: "Rajesh Kumar",
    amount: 5000,
    type: "collection",
    date: "2025-01-20",
    remarks: "Partial payment",
  },
  {
    id: "t2",
    sellerId: "s2",
    customerId: "c3",
    customerName: "SRBS Retail Store – Mumbai",
    sellerName: "Priya Sharma",
    amount: 2000,
    type: "collection",
    date: "2025-01-20",
    remarks: "Payment received",
  },
  {
    id: "t3",
    sellerId: "s1",
    customerId: "c4",
    customerName: "Kolkata Infrastructure Ltd",
    sellerName: "Rajesh Kumar",
    amount: 3500,
    type: "collection",
    date: "2025-01-19",
    remarks: "Advance payment",
  },
  {
    id: "t4",
    sellerId: "s3",
    customerId: "c1",
    customerName: "Green Valley Constructions",
    sellerName: "Amit Singh",
    amount: 1200,
    type: "collection",
    date: "2025-01-19",
    remarks: "Full settlement",
  },
  {
    id: "t5",
    sellerId: "s4",
    customerId: "c5",
    customerName: "Delhi Constructors",
    sellerName: "Sneha Reddy",
    amount: 2500,
    type: "collection",
    date: "2025-01-18",
    remarks: "Partial payment",
  },
  {
    id: "t6",
    sellerId: "s2",
    customerId: "c4",
    customerName: "Kolkata Infrastructure Ltd",
    sellerName: "Priya Sharma",
    amount: 1200,
    type: "due",
    date: "2025-01-17",
    remarks: "Due reminder",
  },
  {
    id: "t7",
    sellerId: "s1",
    customerId: "c2",
    customerName: "Apex Builders",
    sellerName: "Rajesh Kumar",
    amount: 800,
    type: "due",
    date: "2025-01-16",
    remarks: "Outstanding due",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PaymentsReportPage() {
  // ---------- State ----------
  const [sellers] = useState<Seller[]>(MOCK_SELLERS);
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // ---------- Derived: Filtered Transactions ----------
  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.customerName.toLowerCase().includes(q) ||
          t.sellerName.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }
    if (selectedSeller !== "all") {
      result = result.filter((t) => t.sellerId === selectedSeller);
    }
    if (selectedCustomer !== "all") {
      result = result.filter((t) => t.customerId === selectedCustomer);
    }
    if (dateFrom) {
      result = result.filter((t) => t.date >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((t) => t.date <= dateTo);
    }
    return result;
  }, [transactions, searchTerm, selectedSeller, selectedCustomer, dateFrom, dateTo]);

  // ---------- Derived: Summary Stats ----------
  const totalCollections = filteredTransactions
    .filter((t) => t.type === "collection")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDue = filteredTransactions
    .filter((t) => t.type === "due")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalCollections - totalDue;

  // ---------- Derived: Seller-wise Summary ----------
  const sellerSummary = useMemo(() => {
    const map = new Map<string, SellerSummary>();
    sellers.forEach((s) => {
      map.set(s.id, {
        sellerId: s.id,
        sellerName: s.name,
        totalCollection: 0,
        totalDueCollected: 0,
        netCollection: 0,
      });
    });

    filteredTransactions.forEach((t) => {
      const seller = map.get(t.sellerId);
      if (seller) {
        if (t.type === "collection") {
          seller.totalCollection += t.amount;
        } else {
          seller.totalDueCollected += t.amount;
        }
        seller.netCollection = seller.totalCollection - seller.totalDueCollected;
      }
    });

    return Array.from(map.values());
  }, [filteredTransactions, sellers]);

  // ---------- Derived: Customer-wise Summary ----------
  const customerSummary = useMemo(() => {
    const map = new Map<string, CustomerSummary>();
    customers.forEach((c) => {
      map.set(c.id, {
        customerId: c.id,
        customerName: c.name,
        totalPaid: 0,
        currentDue: c.currentDue,
        lastPayment: "",
      });
    });

    // Calculate total paid from collections
    filteredTransactions
      .filter((t) => t.type === "collection")
      .forEach((t) => {
        const customer = map.get(t.customerId);
        if (customer) {
          customer.totalPaid += t.amount;
          if (!customer.lastPayment || t.date > customer.lastPayment) {
            customer.lastPayment = t.date;
          }
        }
      });

    return Array.from(map.values());
  }, [filteredTransactions, customers]);

  // ---------- Handlers ----------
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSeller("all");
    setSelectedCustomer("all");
    setDateFrom("");
    setDateTo("");
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700">Error</h2>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 lg:w-96 h-32 sm:h-48 md:h-64 lg:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-white/30 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                Payments Report
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block truncate">Collections, Due & Seller/Customer breakdown</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="bg-white/40 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl border border-white/50 shadow-sm flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="hidden xs:inline">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Collections</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-green-700 truncate">৳{totalCollections.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Due</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-amber-700 truncate">৳{totalDue.toFixed(2)}</p>
              </div>
              <div className="bg-amber-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Net Amount</p>
                <p className={`text-base sm:text-lg md:text-2xl font-bold truncate ${netAmount >= 0 ? "text-blue-700" : "text-red-700"}`}>
                  ৳{netAmount.toFixed(2)}
                </p>
              </div>
              <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0 ${netAmount >= 0 ? "bg-blue-100" : "bg-red-100"}`}>
                <Wallet className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${netAmount >= 0 ? "text-blue-600" : "text-red-600"}`} />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Transactions</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-700 truncate">{filteredTransactions.length}</p>
              </div>
              <div className="bg-purple-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <PieChart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl border border-white/50 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 sm:pl-8 md:pl-9 pr-2 sm:pr-3 md:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            <select
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm truncate"
            >
              <option value="all">All Sellers</option>
              {sellers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm truncate"
            >
              <option value="all">All Customers</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              placeholder="From"
            />
            <div className="flex gap-1 sm:gap-2 col-span-1 sm:col-span-2 lg:col-span-1">
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                placeholder="To"
              />
              <button
                onClick={handleClearFilters}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-200/70 backdrop-blur-sm rounded-lg sm:rounded-xl hover:bg-gray-300/70 transition flex items-center gap-0.5 sm:gap-1 md:gap-2 text-xs sm:text-sm md:text-base flex-shrink-0"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <span className="hidden xs:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Seller-wise & Customer-wise Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          {/* Seller-wise */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-600" />
                Seller-wise Summary
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-white/30">
                  <tr>
                    <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Seller</th>
                    <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Collection</th>
                    <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Due</th>
                    <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerSummary.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 sm:py-6 text-gray-400 text-xs sm:text-sm">No data</td>
                    </tr>
                  ) : (
                    sellerSummary.map((seller) => (
                      <tr key={seller.sellerId} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none">{seller.sellerName}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-green-600 font-medium text-xs sm:text-sm">৳{seller.totalCollection.toFixed(2)}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-amber-600 font-medium text-xs sm:text-sm">৳{seller.totalDueCollected.toFixed(2)}</td>
                        <td className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right font-bold text-xs sm:text-sm ${seller.netCollection >= 0 ? "text-blue-700" : "text-red-600"}`}>
                          ৳{seller.netCollection.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer-wise */}
          <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
                <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-purple-600" />
                Customer-wise Summary
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-white/30">
                  <tr>
                    <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Customer</th>
                    <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Total Paid</th>
                    <th className="text-right px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600">Due</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden sm:table-cell">Last Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {customerSummary.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 sm:py-6 text-gray-400 text-xs sm:text-sm">No data</td>
                    </tr>
                  ) : (
                    customerSummary.map((customer) => (
                      <tr key={customer.customerId} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[50px] xs:max-w-[70px] sm:max-w-none">{customer.customerName}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-green-600 font-medium text-xs sm:text-sm">৳{customer.totalPaid.toFixed(2)}</td>
                        <td className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right font-bold text-xs sm:text-sm ${customer.currentDue > 0 ? "text-amber-600" : "text-green-600"}`}>
                          ৳{customer.currentDue.toFixed(2)}
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-500 text-xs sm:text-sm hidden sm:table-cell">
                          {customer.lastPayment ? new Date(customer.lastPayment).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1 sm:gap-2">
              <CreditCard className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-600" />
              Transaction History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-white/30">
                <tr>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">ID</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Customer</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden sm:table-cell">Seller</th>
                  <th className="text-right px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Amount</th>
                  <th className="text-center px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                  <th className="text-left px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-semibold text-gray-600 hidden lg:table-cell">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 sm:py-10 text-gray-400">
                      <CreditCard className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-1 sm:mb-2 opacity-30" />
                      <p className="text-xs sm:text-sm">No transactions found</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((t) => (
                    <tr key={t.id} className="border-b border-gray-100/60 hover:bg-white/30 transition">
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-mono text-[10px] sm:text-xs text-gray-500">{t.id}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[50px] xs:max-w-[70px] sm:max-w-none">{t.customerName}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-600 hidden sm:table-cell text-xs sm:text-sm truncate max-w-[80px]">{t.sellerName}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-right font-bold text-gray-800 text-xs sm:text-sm">৳{t.amount.toFixed(2)}</td>
                      <td className="px-1 sm:px-2 md:px-6 py-2 sm:py-3 text-center">
                        <TransactionTypeBadge type={t.type} />
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-500 hidden md:table-cell text-xs sm:text-sm">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-gray-500 text-xs sm:text-sm hidden lg:table-cell truncate max-w-[100px]">{t.remarks || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200/50 text-[10px] sm:text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
            Showing {filteredTransactions.length} transactions
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
        @media (max-width: 479px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================

interface TransactionTypeBadgeProps {
  type: "collection" | "due";
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type }) => {
  if (type === "collection") {
    return (
      <span className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 inline-flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
        <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        <span className="hidden xs:inline">Collection</span>
        <span className="xs:hidden">Coll</span>
      </span>
    );
  }
  return (
    <span className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-100 text-amber-700 inline-flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
      <ArrowDownRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
      <span className="hidden xs:inline">Due</span>
      <span className="xs:hidden">Due</span>
    </span>
  );
};