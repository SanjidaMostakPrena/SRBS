// // app/dashboard/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Building2,
//   ShoppingBag,
//   TrendingUp,
//   Wallet,
//   AlertCircle,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   CreditCard,
//   IndianRupee,
//   Package,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface Order {
//   id: string;
//   customerName: string;
//   amount: number;
//   status: "completed" | "pending" | "approved";
//   date: string;
// }

// interface Collection {
//   id: string;
//   customerName: string;
//   amount: number;
//   date: string;
// }

// // ============================================================
// // MOCK DATA – Replace with API calls
// // ============================================================
// const MOCK_ORDERS: Order[] = [
//   {
//     id: "o1",
//     customerName: "Green Valley Constructions",
//     amount: 12500,
//     status: "completed",
//     date: "2025-01-20",
//   },
//   {
//     id: "o2",
//     customerName: "Apex Builders",
//     amount: 8700,
//     status: "pending",
//     date: "2025-01-20",
//   },
//   {
//     id: "o3",
//     customerName: "Kolkata Infrastructure Ltd",
//     amount: 21500,
//     status: "approved",
//     date: "2025-01-20",
//   },
//   {
//     id: "o4",
//     customerName: "SRBS Retail Store – Mumbai",
//     amount: 3200,
//     status: "pending",
//     date: "2025-01-19",
//   },
//   {
//     id: "o5",
//     customerName: "Delhi Constructors",
//     amount: 9400,
//     status: "completed",
//     date: "2025-01-19",
//   },
// ];

// const MOCK_COLLECTIONS: Collection[] = [
//   { id: "c1", customerName: "Apex Builders", amount: 5000, date: "2025-01-20" },
//   { id: "c2", customerName: "Kolkata Infrastructure Ltd", amount: 2500, date: "2025-01-20" },
//   { id: "c3", customerName: "Green Valley Constructions", amount: 1200, date: "2025-01-19" },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function DashboardPage() {
//   // ---------- State ----------
//   const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
//   const [collections, setCollections] = useState<Collection[]>(MOCK_COLLECTIONS);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // ---------- Derived metrics ----------
//   const today = new Date().toISOString().split("T")[0]; // "2025-01-20"
//   const todayOrders = orders.filter((o) => o.date === today);
//   const todaySales = todayOrders.reduce((sum, o) => sum + o.amount, 0);
//   const todayCollection = collections
//     .filter((c) => c.date === today)
//     .reduce((sum, c) => sum + c.amount, 0);

//   // Today's Due = sum of pending orders' amounts (simplified assumption)
//   const todayDue = todayOrders
//     .filter((o) => o.status === "pending")
//     .reduce((sum, o) => sum + o.amount, 0);

//   const pendingApproval = orders.filter((o) => o.status === "pending").length;

//   // Recent Orders (last 5)
//   const recentOrders = orders.slice(0, 5);
//   // Recent Collections (last 5)
//   const recentCollections = collections.slice(0, 5);

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading dashboard...</p>
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
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
//           <div className="flex items-center gap-4">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
//               <Building2 className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
//                 SRBS Dashboard
//               </h1>
//               <p className="text-gray-600">
//                 Welcome back, Seller! Here's your overview.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50 shadow-sm flex items-center gap-2 text-sm text-gray-700">
//               <Clock className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* Metric Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <MetricCard
//             title="Today's Orders"
//             value={todayOrders.length}
//             icon={<ShoppingBag className="h-6 w-6" />}
//             color="blue"
//           />
//           <MetricCard
//             title="Today's Sales"
//             value={`₹${todaySales.toFixed(2)}`}
//             icon={<TrendingUp className="h-6 w-6" />}
//             color="green"
//           />
//           <MetricCard
//             title="Today's Collection"
//             value={`₹${todayCollection.toFixed(2)}`}
//             icon={<Wallet className="h-6 w-6" />}
//             color="purple"
//           />
//           <MetricCard
//             title="Today's Due"
//             value={`₹${todayDue.toFixed(2)}`}
//             icon={<CreditCard className="h-6 w-6" />}
//             color="amber"
//           />
//         </div>

//         {/* Additional Card: Pending Approval */}
//         <div className="mb-8">
//           <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="bg-orange-100 p-3 rounded-xl">
//                 <AlertCircle className="h-6 w-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Pending Approval</p>
//                 <p className="text-2xl font-bold text-orange-600">{pendingApproval}</p>
//               </div>
//             </div>
//             <div className="text-sm text-gray-500">
//               Orders waiting for your approval
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders & Collections */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Orders */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
//             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
//               <Package className="h-5 w-5 text-blue-600" />
//               Recent Orders
//             </h3>
//             {recentOrders.length === 0 ? (
//               <div className="text-center py-8 text-gray-400">
//                 <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-30" />
//                 <p>No recent orders</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/60 hover:border-blue-300 transition-all hover:shadow-md"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">{order.customerName}</p>
//                       <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                         <span>{new Date(order.date).toLocaleDateString()}</span>
//                         <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                         <span className="font-medium">₹{order.amount.toFixed(2)}</span>
//                       </div>
//                     </div>
//                     <StatusBadge status={order.status} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Recent Collections */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
//             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
//               <Wallet className="h-5 w-5 text-green-600" />
//               Recent Collections
//             </h3>
//             {recentCollections.length === 0 ? (
//               <div className="text-center py-8 text-gray-400">
//                 <CreditCard className="h-10 w-10 mx-auto mb-2 opacity-30" />
//                 <p>No recent collections</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentCollections.map((collection) => (
//                   <div
//                     key={collection.id}
//                     className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/60 hover:border-green-300 transition-all hover:shadow-md"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">{collection.customerName}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {new Date(collection.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-bold text-green-600">+₹{collection.amount.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // COMPONENTS
// // ============================================================

// interface MetricCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   color: "blue" | "green" | "purple" | "amber";
// }

// const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
//   const colorMap = {
//     blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
//     green: "from-green-500 to-green-600 bg-green-100 text-green-600",
//     purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
//     amber: "from-amber-500 to-amber-600 bg-amber-100 text-amber-600",
//   };

//   return (
//     <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <p className="text-2xl font-bold text-gray-800">{value}</p>
//         </div>
//         <div className={`p-3 rounded-xl ${colorMap[color].split(" ").slice(2).join(" ")} group-hover:scale-110 transition`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface StatusBadgeProps {
//   status: "completed" | "pending" | "approved";
// }

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
//   const statusMap = {
//     completed: { label: "Completed", icon: <CheckCircle className="h-4 w-4" />, className: "bg-green-100 text-green-700" },
//     pending: { label: "Pending", icon: <Clock className="h-4 w-4" />, className: "bg-amber-100 text-amber-700" },
//     approved: { label: "Approved", icon: <CheckCircle className="h-4 w-4" />, className: "bg-blue-100 text-blue-700" },
//   };

//   const { label, icon, className } = statusMap[status];
//   return (
//     <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${className}`}>
//       {icon}
//       {label}
//     </span>
//   );
// };
// app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  ShoppingBag,
  TrendingUp,
  Wallet,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  CreditCard,
  IndianRupee,
  Package,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Order {
  id: string;
  customerName: string;
  amount: number;
  status: "completed" | "pending" | "approved";
  date: string;
}

interface Collection {
  id: string;
  customerName: string;
  amount: number;
  date: string;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    customerName: "Green Valley Constructions",
    amount: 12500,
    status: "completed",
    date: "2025-01-20",
  },
  {
    id: "o2",
    customerName: "Apex Builders",
    amount: 8700,
    status: "pending",
    date: "2025-01-20",
  },
  {
    id: "o3",
    customerName: "Kolkata Infrastructure Ltd",
    amount: 21500,
    status: "approved",
    date: "2025-01-20",
  },
  {
    id: "o4",
    customerName: "SRBS Retail Store – Mumbai",
    amount: 3200,
    status: "pending",
    date: "2025-01-19",
  },
  {
    id: "o5",
    customerName: "Delhi Constructors",
    amount: 9400,
    status: "completed",
    date: "2025-01-19",
  },
];

const MOCK_COLLECTIONS: Collection[] = [
  { id: "c1", customerName: "Apex Builders", amount: 5000, date: "2025-01-20" },
  { id: "c2", customerName: "Kolkata Infrastructure Ltd", amount: 2500, date: "2025-01-20" },
  { id: "c3", customerName: "Green Valley Constructions", amount: 1200, date: "2025-01-19" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DashboardPage() {
  // ---------- State ----------
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [collections, setCollections] = useState<Collection[]>(MOCK_COLLECTIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- Derived metrics ----------
  const today = new Date().toISOString().split("T")[0]; // "2025-01-20"
  const todayOrders = orders.filter((o) => o.date === today);
  const todaySales = todayOrders.reduce((sum, o) => sum + o.amount, 0);
  const todayCollection = collections
    .filter((c) => c.date === today)
    .reduce((sum, c) => sum + c.amount, 0);

  // Today's Due = sum of pending orders' amounts (simplified assumption)
  const todayDue = todayOrders
    .filter((o) => o.status === "pending")
    .reduce((sum, o) => sum + o.amount, 0);

  const pendingApproval = orders.filter((o) => o.status === "pending").length;

  // Recent Orders (last 5)
  const recentOrders = orders.slice(0, 5);
  // Recent Collections (last 5)
  const recentCollections = collections.slice(0, 5);

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                SRBS Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, Seller! Here's your overview.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50 shadow-sm flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Today's Orders"
            value={todayOrders.length}
            icon={<ShoppingBag className="h-6 w-6" />}
            color="blue"
          />
          <MetricCard
            title="Today's Sales"
            value={`৳${todaySales.toFixed(2)}`}          // ← Taka symbol
            icon={<TrendingUp className="h-6 w-6" />}
            color="green"
          />
          <MetricCard
            title="Today's Collection"
            value={`৳${todayCollection.toFixed(2)}`}     // ← Taka symbol
            icon={<Wallet className="h-6 w-6" />}
            color="purple"
          />
          <MetricCard
            title="Today's Due"
            value={`৳${todayDue.toFixed(2)}`}            // ← Taka symbol
            icon={<CreditCard className="h-6 w-6" />}
            color="amber"
          />
        </div>

        {/* Additional Card: Pending Approval */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600">{pendingApproval}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Orders waiting for your approval
            </div>
          </div>
        </div>

        {/* Recent Orders & Collections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-blue-600" />
              Recent Orders
            </h3>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No recent orders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/60 hover:border-blue-300 transition-all hover:shadow-md"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{order.customerName}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="font-medium">৳{order.amount.toFixed(2)}</span>  {/* ← Taka symbol */}
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Collections */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Wallet className="h-5 w-5 text-green-600" />
              Recent Collections
            </h3>
            {recentCollections.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CreditCard className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No recent collections</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-100/60 hover:border-green-300 transition-all hover:shadow-md"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{collection.customerName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(collection.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-600">+৳{collection.amount.toFixed(2)}</span>  {/* ← Taka symbol */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
    green: "from-green-500 to-green-600 bg-green-100 text-green-600",
    purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
    amber: "from-amber-500 to-amber-600 bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color].split(" ").slice(2).join(" ")} group-hover:scale-110 transition`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: "completed" | "pending" | "approved";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    completed: { label: "Completed", icon: <CheckCircle className="h-4 w-4" />, className: "bg-green-100 text-green-700" },
    pending: { label: "Pending", icon: <Clock className="h-4 w-4" />, className: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved", icon: <CheckCircle className="h-4 w-4" />, className: "bg-blue-100 text-blue-700" },
  };

  const { label, icon, className } = statusMap[status];
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </span>
  );
};