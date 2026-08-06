
// // app/admin/stock/page.tsx
// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Building2,
//   Package,
//   Search,
//   Plus,
//   Minus,
//   AlertCircle,
//   IndianRupee,
//   TrendingUp,
//   Layers,
//   X,
//   CheckCircle,
//   Loader2,
//   Filter,
//   Warehouse,
//   Store,
//   Edit,
//   Users,
//   MapPin,
//   ShoppingCart,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface ProductStock {
//   id: string;
//   name: string;
//   sku: string;
//   category: string;
//   price: number;
//   warehouseStock: number;
//   dealerStock: number;
//   minStock: number;
//   unit: string;
// }

// interface Dealer {
//   id: string;
//   name: string;
//   location: string;
//   contact: string;
//   products: {
//     productId: string;
//     stock: number;
//   }[];
// }

// // ============================================================
// // MOCK DATA – Replace with API calls
// // ============================================================
// const MOCK_PRODUCTS: ProductStock[] = [
//   {
//     id: "p1",
//     name: "SRBS SuperPlast PC-300",
//     sku: "ADM-1001",
//     category: "Admixture",
//     price: 1250,
//     warehouseStock: 45,
//     dealerStock: 12,
//     minStock: 20,
//     unit: "Ltr",
//   },
//   {
//     id: "p2",
//     name: "SRBS Waterproof Coating – WPC",
//     sku: "PNT-2002",
//     category: "Paint",
//     price: 850,
//     warehouseStock: 28,
//     dealerStock: 8,
//     minStock: 15,
//     unit: "Kg",
//   },
//   {
//     id: "p3",
//     name: "SRBS Epoxy Floor Paint (Grey)",
//     sku: "PNT-3003",
//     category: "Paint",
//     price: 2200,
//     warehouseStock: 12,
//     dealerStock: 5,
//     minStock: 10,
//     unit: "Ltr",
//   },
//   {
//     id: "p4",
//     name: "SRBS Concrete Admixture – A40",
//     sku: "ADM-4004",
//     category: "Admixture",
//     price: 980,
//     warehouseStock: 33,
//     dealerStock: 15,
//     minStock: 25,
//     unit: "Ltr",
//   },
//   {
//     id: "p5",
//     name: "SRBS Acrylic Emulsion (White)",
//     sku: "PNT-5005",
//     category: "Paint",
//     price: 640,
//     warehouseStock: 19,
//     dealerStock: 6,
//     minStock: 20,
//     unit: "Ltr",
//   },
//   {
//     id: "p6",
//     name: "SRBS Anti‑Corrosive Primer",
//     sku: "PNT-6006",
//     category: "Primer",
//     price: 1120,
//     warehouseStock: 8,
//     dealerStock: 2,
//     minStock: 12,
//     unit: "Ltr",
//   },
//   {
//     id: "p7",
//     name: "SRBS SuperPlast PC-500",
//     sku: "ADM-1007",
//     category: "Admixture",
//     price: 1450,
//     warehouseStock: 0,
//     dealerStock: 0,
//     minStock: 10,
//     unit: "Ltr",
//   },
// ];

// const MOCK_DEALERS: Dealer[] = [
//   {
//     id: "d1",
//     name: "Mumbai Construction Supplies",
//     location: "Mumbai, Maharashtra",
//     contact: "+91 98765 43210",
//     products: [
//       { productId: "p1", stock: 5 },
//       { productId: "p2", stock: 3 },
//       { productId: "p4", stock: 8 },
//     ],
//   },
//   {
//     id: "d2",
//     name: "Delhi Building Materials",
//     location: "Delhi, NCR",
//     contact: "+91 87654 32109",
//     products: [
//       { productId: "p1", stock: 7 },
//       { productId: "p3", stock: 2 },
//       { productId: "p5", stock: 4 },
//     ],
//   },
//   {
//     id: "d3",
//     name: "Chennai Hardware Store",
//     location: "Chennai, Tamil Nadu",
//     contact: "+91 76543 21098",
//     products: [
//       { productId: "p2", stock: 5 },
//       { productId: "p4", stock: 7 },
//       { productId: "p6", stock: 2 },
//     ],
//   },
//   {
//     id: "d4",
//     name: "Kolkata Paint House",
//     location: "Kolkata, West Bengal",
//     contact: "+91 65432 10987",
//     products: [
//       { productId: "p3", stock: 3 },
//       { productId: "p5", stock: 2 },
//       { productId: "p6", stock: 0 },
//     ],
//   },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function AdminStockPage() {
//   // ---------- State ----------
//   const [products, setProducts] = useState<ProductStock[]>(MOCK_PRODUCTS);
//   const [dealers, setDealers] = useState<Dealer[]>(MOCK_DEALERS);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState<string>("all");
//   const [locationFilter, setLocationFilter] = useState<
//     "all" | "warehouse" | "dealer"
//   >("all");
//   const [dealerSearchTerm, setDealerSearchTerm] = useState("");

//   // Modal states
//   const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(
//     null
//   );
//   const [showStockModal, setShowStockModal] = useState(false);
//   const [modalLocation, setModalLocation] = useState<"warehouse" | "dealer">(
//     "warehouse"
//   );
//   const [quantity, setQuantity] = useState<number>(1);
//   const [actionType, setActionType] = useState<"add" | "reduce">("add");
//   const [modalError, setModalError] = useState<string | null>(null);
//   const [modalSuccess, setModalSuccess] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Add Stock Modal states
//   const [showAddStockModal, setShowAddStockModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedProductId, setSelectedProductId] = useState<string>("");
//   const [addQuantity, setAddQuantity] = useState<number>(1);
//   const [addLocation, setAddLocation] = useState<"warehouse" | "dealer">("warehouse");
//   const [selectedDealerId, setSelectedDealerId] = useState<string>("");
//   const [addModalError, setAddModalError] = useState<string | null>(null);
//   const [addModalSuccess, setAddModalSuccess] = useState(false);
//   const [isAddSubmitting, setIsAddSubmitting] = useState(false);

//   // ---------- Derived ----------
//   const categories = useMemo(() => {
//     const cats = products.map((p) => p.category);
//     return ["all", ...Array.from(new Set(cats))];
//   }, [products]);

//   const filteredProducts = useMemo(() => {
//     let result = products;
//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.sku.toLowerCase().includes(q) ||
//           p.category.toLowerCase().includes(q)
//       );
//     }
//     if (categoryFilter !== "all") {
//       result = result.filter((p) => p.category === categoryFilter);
//     }
//     if (locationFilter !== "all") {
//       result = result.filter((p) => {
//         const stock =
//           locationFilter === "warehouse" ? p.warehouseStock : p.dealerStock;
//         return stock > 0;
//       });
//     }
//     return result;
//   }, [products, searchTerm, categoryFilter, locationFilter]);

//   const filteredDealers = useMemo(() => {
//     if (!dealerSearchTerm.trim()) return dealers;
//     const q = dealerSearchTerm.toLowerCase();
//     return dealers.filter(
//       (d) =>
//         d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q)
//     );
//   }, [dealers, dealerSearchTerm]);

//   // Stats
//   const totalProducts = products.length;
//   const totalWarehouseStock = products.reduce(
//     (sum, p) => sum + p.warehouseStock,
//     0
//   );
//   const totalDealerStock = products.reduce((sum, p) => sum + p.dealerStock, 0);
//   const totalStockValue = products.reduce(
//     (sum, p) => sum + (p.warehouseStock + p.dealerStock) * p.price,
//     0
//   );
//   const lowStockItems = products.filter(
//     (p) => p.warehouseStock + p.dealerStock <= p.minStock
//   ).length;

//   // Get unique categories for Add Stock modal
//   const addCategories = useMemo(() => {
//     const cats = products.map((p) => p.category);
//     return Array.from(new Set(cats));
//   }, [products]);

//   // Get products filtered by selected category
//   const productsByCategory = useMemo(() => {
//     if (!selectedCategory) return [];
//     return products.filter((p) => p.category === selectedCategory);
//   }, [products, selectedCategory]);

//   // Get selected product details
//   const selectedProductDetails = useMemo(() => {
//     if (!selectedProductId) return null;
//     return products.find((p) => p.id === selectedProductId) || null;
//   }, [products, selectedProductId]);

//   // ---------- Handlers ----------
//   const handleOpenModal = (
//     product: ProductStock,
//     location: "warehouse" | "dealer",
//     action: "add" | "reduce"
//   ) => {
//     setSelectedProduct(product);
//     setModalLocation(location);
//     setActionType(action);
//     setQuantity(1);
//     setModalError(null);
//     setModalSuccess(false);
//     setShowStockModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowStockModal(false);
//     setSelectedProduct(null);
//     setModalError(null);
//     setModalSuccess(false);
//   };

//   const handleUpdateStock = async () => {
//     if (!selectedProduct) return;
//     if (quantity <= 0) {
//       setModalError("Quantity must be greater than 0");
//       return;
//     }

//     const currentStock =
//       modalLocation === "warehouse"
//         ? selectedProduct.warehouseStock
//         : selectedProduct.dealerStock;

//     if (actionType === "reduce" && quantity > currentStock) {
//       setModalError(`Cannot reduce more than current stock (${currentStock})`);
//       return;
//     }

//     setIsSubmitting(true);
//     setModalError(null);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     const newStock =
//       actionType === "add" ? currentStock + quantity : currentStock - quantity;

//     setProducts((prev) =>
//       prev.map((p) =>
//         p.id === selectedProduct.id
//           ? {
//               ...p,
//               ...(modalLocation === "warehouse"
//                 ? { warehouseStock: newStock }
//                 : { dealerStock: newStock }),
//             }
//           : p
//       )
//     );

//     setModalSuccess(true);
//     setTimeout(() => {
//       setShowStockModal(false);
//       setSelectedProduct(null);
//     }, 1500);
//     setIsSubmitting(false);
//   };

//   // Add Stock Modal Handlers
//   const handleOpenAddStockModal = () => {
//     setShowAddStockModal(true);
//     setSelectedCategory("");
//     setSelectedProductId("");
//     setAddQuantity(1);
//     setAddLocation("warehouse");
//     setSelectedDealerId("");
//     setAddModalError(null);
//     setAddModalSuccess(false);
//   };

//   const handleCloseAddStockModal = () => {
//     setShowAddStockModal(false);
//     setSelectedCategory("");
//     setSelectedProductId("");
//     setAddQuantity(1);
//     setAddLocation("warehouse");
//     setSelectedDealerId("");
//     setAddModalError(null);
//     setAddModalSuccess(false);
//   };

//   const handleAddStockSubmit = async () => {
//     if (!selectedProductId) {
//       setAddModalError("Please select a product");
//       return;
//     }
//     if (addQuantity <= 0) {
//       setAddModalError("Quantity must be greater than 0");
//       return;
//     }
//     if (addLocation === "dealer" && !selectedDealerId) {
//       setAddModalError("Please select a dealer");
//       return;
//     }

//     setIsAddSubmitting(true);
//     setAddModalError(null);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     if (addLocation === "warehouse") {
//       // Add to warehouse
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === selectedProductId
//             ? { ...p, warehouseStock: p.warehouseStock + addQuantity }
//             : p
//         )
//       );
//     } else {
//       // Add to dealer
//       setDealers((prev) =>
//         prev.map((d) =>
//           d.id === selectedDealerId
//             ? {
//                 ...d,
//                 products: d.products.map((item) =>
//                   item.productId === selectedProductId
//                     ? { ...item, stock: item.stock + addQuantity }
//                     : item
//                 ),
//               }
//             : d
//         )
//       );
      
//       // Also update the dealerStock in products
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === selectedProductId
//             ? { ...p, dealerStock: p.dealerStock + addQuantity }
//             : p
//         )
//       );
//     }

//     setAddModalSuccess(true);
//     setTimeout(() => {
//       setShowAddStockModal(false);
//       setSelectedCategory("");
//       setSelectedProductId("");
//       setAddQuantity(1);
//       setAddLocation("warehouse");
//       setSelectedDealerId("");
//       setAddModalSuccess(false);
//     }, 1500);
//     setIsAddSubmitting(false);
//   };

//   const getProductName = (productId: string) => {
//     const product = products.find((p) => p.id === productId);
//     return product ? product.name : "Unknown Product";
//   };

//   const getProductStock = (dealer: Dealer, productId: string) => {
//     const item = dealer.products.find((p) => p.productId === productId);
//     return item ? item.stock : 0;
//   };

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
//           <p className="text-gray-600">Loading stock data...</p>
//         </div>
//       </div>
//     );
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
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
//       {/* Background decorations */}
//       <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 blur-3xl" />
//       <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/40 bg-white/30 p-6 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg">
//               <Package className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-3xl font-bold text-transparent">
//                 Stock Management
//               </h1>
//               <p className="text-gray-600">Warehouse & Dealer inventory</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
           
//             <div className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/40 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-sm">
//               <Package className="h-4 w-4" />
//               <span>{totalProducts} products</span>
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
//           <div className="group rounded-2xl border border-white/50 bg-white/60 p-5 shadow-lg backdrop-blur-md transition hover:shadow-xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Products</p>
//                 <p className="text-2xl font-bold text-blue-700">
//                   {totalProducts}
//                 </p>
//               </div>
//               <div className="rounded-xl bg-blue-100 p-3 transition group-hover:scale-110">
//                 <Layers className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//           <div className="group rounded-2xl border border-white/50 bg-white/60 p-5 shadow-lg backdrop-blur-md transition hover:shadow-xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Warehouse Stock</p>
//                 <p className="text-2xl font-bold text-green-700">
//                   {totalWarehouseStock}
//                 </p>
//               </div>
//               <div className="rounded-xl bg-green-100 p-3 transition group-hover:scale-110">
//                 <Warehouse className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </div>
//           <div className="group rounded-2xl border border-white/50 bg-white/60 p-5 shadow-lg backdrop-blur-md transition hover:shadow-xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Dealer Stock</p>
//                 <p className="text-2xl font-bold text-purple-700">
//                   {totalDealerStock}
//                 </p>
//               </div>
//               <div className="rounded-xl bg-purple-100 p-3 transition group-hover:scale-110">
//                 <Store className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//           <div className="group rounded-2xl border border-white/50 bg-white/60 p-5 shadow-lg backdrop-blur-md transition hover:shadow-xl">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Low Stock Items</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {lowStockItems}
//                 </p>
//               </div>
//               <div className="rounded-xl bg-red-100 p-3 transition group-hover:scale-110">
//                 <AlertCircle className="h-6 w-6 text-red-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mb-6 rounded-2xl border border-white/50 bg-white/60 p-4 shadow-lg backdrop-blur-md">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="min-w-[200px] flex-1">
//               <div className="relative">
//                 <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full rounded-xl border border-gray-200 bg-white/60 py-2 pr-4 pl-10 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Filter className="h-4 w-4 text-gray-500" />
//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="rounded-xl border border-gray-200 bg-white/60 px-3 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat === "all" ? "All Categories" : cat}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//           </div>
//         </div>

//         {/* Main Stock Table */}
//         <div className="mb-8 overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
//           <div className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
//             <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//               <Package className="h-5 w-5 text-blue-600" />
//               Product Inventory
//             </h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                     Product
//                   </th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                     Category
//                   </th>
//                   <th className="px-6 py-4 text-center font-semibold text-gray-700">
//                     Warehouse
//                   </th>
//                   <th className="px-6 py-4 text-center font-semibold text-gray-700">
//                     Dealer
//                   </th>
//                   <th className="px-6 py-4 text-center font-semibold text-gray-700">
//                     Total
//                   </th>
//                   <th className="px-6 py-4 text-center font-semibold text-gray-700">
//                     Status
//                   </th>
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="py-10 text-center text-gray-400">
//                       <Package className="mx-auto mb-2 h-12 w-12 opacity-30" />
//                       <p>No products found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts.map((product) => {
//                     const total = product.warehouseStock + product.dealerStock;
//                     const isLow = total <= product.minStock;
//                     return (
//                       <tr
//                         key={product.id}
//                         className={`border-b border-gray-100/60 transition hover:bg-white/30 ${
//                           isLow ? "bg-red-50/30" : ""
//                         }`}
//                       >
//                         <td className="px-6 py-4">
//                           <div>
//                             <p className="font-medium text-gray-800">
//                               {product.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {product.sku}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600">
//                           {product.category}
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <span className="font-bold text-green-700">
//                             {product.warehouseStock}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <span className="font-bold text-purple-700">
//                             {product.dealerStock}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center font-bold text-gray-800">
//                           {total}
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <StockStatus
//                             stock={total}
//                             minStock={product.minStock}
//                           />
//                         </td>
                   
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="border-t border-gray-200/50 bg-white/30 px-6 py-3 text-sm text-gray-500 backdrop-blur-sm">
//             Showing {filteredProducts.length} of {totalProducts} products
//           </div>
//         </div>

//         {/* Dealer Wise Product View */}
//         <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">
//           <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4">
//             <div className="flex items-center gap-2">
//               <Store className="h-5 w-5 text-purple-600" />
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Dealer Wise Product Distribution
//               </h2>
//             </div>
//             <div className="flex items-center gap-2">
//               <Search className="h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search dealers..."
//                 value={dealerSearchTerm}
//                 onChange={(e) => setDealerSearchTerm(e.target.value)}
//                 className="rounded-xl border border-gray-200 bg-white/60 px-3 py-1.5 text-sm transition-all outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-200"
//               />
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
//                 <tr>
//                   <th className="min-w-[200px] px-6 py-4 text-left font-semibold text-gray-700">
//                     Dealer Name
//                   </th>
//                   {products.map((product) => (
//                     <th
//                       key={product.id}
//                       className="min-w-[80px] px-3 py-4 text-center font-semibold text-gray-700"
//                     >
//                       <div className="text-xs">{product.name}</div>
//                     </th>
//                   ))}
//                   <th className="px-6 py-4 text-center font-semibold text-gray-700">
//                     Total
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredDealers.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={products.length + 2}
//                       className="py-10 text-center text-gray-400"
//                     >
//                       <Store className="mx-auto mb-2 h-12 w-12 opacity-30" />
//                       <p>No dealers found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   <>
//                     {filteredDealers.map((dealer) => {
//                       const totalStock = dealer.products.reduce(
//                         (sum, item) => sum + item.stock,
//                         0
//                       );
//                       return (
//                         <tr
//                           key={dealer.id}
//                           className="border-b border-gray-100/60 transition hover:bg-white/30"
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <Building2 className="h-4 w-4 text-gray-400" />
//                               <span className="font-medium text-gray-800">
//                                 {dealer.name}
//                               </span>
//                             </div>
//                           </td>
//                           {products.map((product) => {
//                             const stock = getProductStock(dealer, product.id);
//                             return (
//                               <td
//                                 key={product.id}
//                                 className="px-3 py-4 text-center"
//                               >
//                                 <span
//                                   className={`font-medium ${
//                                     stock === 0
//                                       ? "text-red-400"
//                                       : stock <= 5
//                                         ? "text-amber-600"
//                                         : "text-green-600"
//                                   }`}
//                                 >
//                                   {stock}
//                                 </span>
//                               </td>
//                             );
//                           })}
//                           <td className="px-6 py-4 text-center font-bold text-purple-700">
//                             {totalStock}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                     {/* Column-wise Total Row */}
//                     <tr className="border-t-2 border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100">
//                       <td className="px-6 py-4 font-bold text-gray-800">
//                         <div className="flex items-center gap-2">
//                           <Package className="h-4 w-4 text-purple-600" />
//                           <span>Total</span>
//                         </div>
//                       </td>
//                       {products.map((product) => {
//                         const totalStock = filteredDealers.reduce(
//                           (sum, dealer) => {
//                             const item = dealer.products.find(
//                               (p) => p.productId === product.id
//                             );
//                             return sum + (item ? item.stock : 0);
//                           },
//                           0
//                         );
//                         return (
//                           <td
//                             key={product.id}
//                             className="px-3 py-4 text-center"
//                           >
//                             <span className="font-bold text-purple-700">
//                               {totalStock}
//                             </span>
//                           </td>
//                         );
//                       })}
//                       <td className="px-6 py-4 text-center text-lg font-bold text-purple-800">
//                         {filteredDealers.reduce(
//                           (sum, dealer) =>
//                             sum +
//                             dealer.products.reduce(
//                               (s, item) => s + item.stock,
//                               0
//                             ),
//                           0
//                         )}
//                       </td>
//                     </tr>
//                   </>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Stock Adjustment Modal */}
//       {showStockModal && selectedProduct && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="animate-fadeIn w-full max-w-md rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
//                 {modalLocation === "warehouse" ? (
//                   <Warehouse className="h-5 w-5 text-green-600" />
//                 ) : (
//                   <Store className="h-5 w-5 text-purple-600" />
//                 )}
//                 {actionType === "add" ? "Add" : "Reduce"} Stock
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="text-gray-400 transition hover:text-gray-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">Product</p>
//                 <p className="font-medium text-gray-800">
//                   {selectedProduct.name}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">
//                   {modalLocation === "warehouse" ? "Warehouse" : "Dealer"}{" "}
//                   Current Stock
//                 </p>
//                 <p className="font-bold text-gray-800">
//                   {modalLocation === "warehouse"
//                     ? selectedProduct.warehouseStock
//                     : selectedProduct.dealerStock}{" "}
//                   {selectedProduct.unit}
//                 </p>
//               </div>
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Quantity to {actionType === "add" ? "Add" : "Reduce"}
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                   }
//                   className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 backdrop-blur-sm"
//                 />
//               </div>

//               {modalError && (
//                 <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
//                   <AlertCircle className="h-4 w-4" />
//                   {modalError}
//                 </div>
//               )}
//               {modalSuccess && (
//                 <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
//                   <CheckCircle className="h-4 w-4" />
//                   Stock updated successfully!
//                 </div>
//               )}

//               <div className="flex gap-3 pt-2">
//                 <button
//                   onClick={handleCloseModal}
//                   className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateStock}
//                   disabled={isSubmitting || modalSuccess}
//                   className={`flex-1 rounded-xl px-4 py-2 font-semibold text-white transition ${
//                     actionType === "add"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-amber-600 hover:bg-amber-700"
//                   } flex items-center justify-center gap-2 disabled:opacity-50`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Updating...
//                     </>
//                   ) : (
//                     <>{actionType === "add" ? "Add" : "Reduce"}</>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Stock Modal */}
//       {showAddStockModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="animate-fadeIn w-full max-w-md rounded-3xl border border-white/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
//                 <ShoppingCart className="h-5 w-5 text-blue-600" />
//                 Add Stock
//               </h2>
//               <button
//                 onClick={handleCloseAddStockModal}
//                 className="text-gray-400 transition hover:text-gray-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {/* Category Selection */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setSelectedProductId("");
//                   }}
//                   className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 backdrop-blur-sm"
//                 >
//                   <option value="">Select Category</option>
//                   {addCategories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Product Selection */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Product
//                 </label>
//                 <select
//                   value={selectedProductId}
//                   onChange={(e) => setSelectedProductId(e.target.value)}
//                   disabled={!selectedCategory}
//                   className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 backdrop-blur-sm"
//                 >
//                   <option value="">Select Product</option>
//                   {productsByCategory.map((product) => (
//                     <option key={product.id} value={product.id}>
//                       {product.name} ({product.sku})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Current Stock Display */}
//               {selectedProductDetails && (
//                 <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
//                   <p className="text-sm font-medium text-gray-700">
//                     Current Stock:
//                   </p>
//                   <div className="mt-2 flex gap-4">
//                     <div>
//                       <span className="text-sm text-gray-500">Warehouse:</span>
//                       <span className="ml-2 font-bold text-green-700">
//                         {selectedProductDetails.warehouseStock}{" "}
//                         {selectedProductDetails.unit}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-500">Dealer:</span>
//                       <span className="ml-2 font-bold text-purple-700">
//                         {selectedProductDetails.dealerStock}{" "}
//                         {selectedProductDetails.unit}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Location Selection */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Add To
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="warehouse"
//                       checked={addLocation === "warehouse"}
//                       onChange={(e) => {
//                         setAddLocation(e.target.value as "warehouse" | "dealer");
//                         setSelectedDealerId("");
//                       }}
//                       className="h-4 w-4 text-blue-600"
//                     />
//                     <Warehouse className="h-4 w-4 text-green-600" />
//                     Warehouse
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="dealer"
//                       checked={addLocation === "dealer"}
//                       onChange={(e) => {
//                         setAddLocation(e.target.value as "warehouse" | "dealer");
//                       }}
//                       className="h-4 w-4 text-purple-600"
//                     />
//                     <Store className="h-4 w-4 text-purple-600" />
//                     Dealer
//                   </label>
//                 </div>
//               </div>

//               {/* Dealer Selection (if dealer is selected) */}
//               {addLocation === "dealer" && (
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700">
//                     Select Dealer
//                   </label>
//                   <select
//                     value={selectedDealerId}
//                     onChange={(e) => setSelectedDealerId(e.target.value)}
//                     className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 backdrop-blur-sm"
//                   >
//                     <option value="">Select Dealer</option>
//                     {dealers.map((dealer) => (
//                       <option key={dealer.id} value={dealer.id}>
//                         {dealer.name} ({dealer.location})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {/* Quantity */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={addQuantity}
//                   onChange={(e) =>
//                     setAddQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                   }
//                   className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-2 transition-all outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 backdrop-blur-sm"
//                 />
//               </div>

//               {addModalError && (
//                 <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
//                   <AlertCircle className="h-4 w-4" />
//                   {addModalError}
//                 </div>
//               )}
//               {addModalSuccess && (
//                 <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
//                   <CheckCircle className="h-4 w-4" />
//                   Stock added successfully!
//                 </div>
//               )}

//               <div className="flex gap-3 pt-2">
//                 <button
//                   onClick={handleCloseAddStockModal}
//                   className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddStockSubmit}
//                   disabled={isAddSubmitting || addModalSuccess}
//                   className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-semibold text-white transition hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isAddSubmitting ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Adding...
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="h-4 w-4" />
//                       Add Stock
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Animation keyframes */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// // ============================================================
// // COMPONENTS
// // ============================================================

// interface StockStatusProps {
//   stock: number;
//   minStock: number;
// }

// const StockStatus: React.FC<StockStatusProps> = ({ stock, minStock }) => {
//   if (stock === 0) {
//     return (
//       <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
//         <AlertCircle className="h-3 w-3" />
//         Out of Stock
//       </span>
//     );
//   }
//   if (stock <= minStock) {
//     return (
//       <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
//         <AlertCircle className="h-3 w-3" />
//         Low Stock
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
//       <CheckCircle className="h-3 w-3" />
//       In Stock
//     </span>
//   );
// };
"use client";

import React, { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Clock,
  Loader2,
  Camera,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  avatar: string;
  joinDate: string;
  stats: {
    totalOrders: number;
    totalSales: number;
    totalCollection: number;
    totalDue: number;
  };
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_PROFILE: UserProfile = {
  id: "usr_001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@srbs.com",
  phone: "+91 98765 43210",
  role: "Senior Seller",
  address: "123, BKC Complex",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400051",
  avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=120&background=1a56db&color=fff&bold=true",
  joinDate: "2023-01-15",
  stats: {
    totalOrders: 156,
    totalSales: 245000,
    totalCollection: 187500,
    totalDue: 57500,
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProfilePage() {
  // ---------- State ----------
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ---------- Handlers ----------
  const handleEditClick = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      pincode: profile.pincode,
    });
    setShowEditModal(true);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update profile
    setProfile((prev) => ({
      ...prev,
      ...editForm,
    }));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowEditModal(false);
      setSubmitSuccess(false);
    }, 1500);
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
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
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(to bottom right, #eff6ff, #eef2ff, #faf5ff)',
      padding: '12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(191,219,254,0.2), transparent)',
        borderRadius: '9999px',
        filter: 'blur(64px)',
        transform: 'translate(50%, -50%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(233,213,255,0.2), transparent)',
        borderRadius: '9999px',
        filter: 'blur(64px)',
        transform: 'translate(-50%, 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1024px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          border: '1px solid rgba(255,255,255,0.4)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #2563eb, #4338ca)',
              color: 'white',
              padding: '10px',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              flexShrink: 0
            }}>
              <User size={24} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1d4ed8, #3730a3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                My Profile
              </h1>
              <p style={{
                fontSize: '12px',
                color: '#4b5563',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>View and manage your personal information</p>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            style={{
              background: 'linear-gradient(to right, #2563eb, #4338ca)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              alignSelf: 'flex-start'
            }}
          >
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>

        {/* Profile Card */}
        <div style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          border: '1px solid rgba(255,255,255,0.5)',
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <div style={{ padding: '16px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '9999px',
                    border: '4px solid white',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    objectFit: 'cover'
                  }}
                />
                <button style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: '#2563eb',
                  color: 'white',
                  padding: '4px',
                  borderRadius: '9999px',
                  border: '2px solid white',
                  cursor: 'pointer'
                }}>
                  <Camera size={14} />
                </button>
              </div>

              {/* Basic Info */}
              <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{profile.name}</h2>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#4b5563'
                  }}>
                    <Briefcase size={14} />
                    {profile.role}
                  </span>
                  <span style={{ color: '#d1d5db' }}>|</span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#4b5563'
                  }}>
                    <Clock size={14} />
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  fontSize: '12px'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#4b5563',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '120px'
                  }}>
                    <Mail size={14} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email}</span>
                  </span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#4b5563'
                  }}>
                    <Phone size={14} />
                    {profile.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(229,231,235,0.5)'
            }}>
              <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: '#6b7280' }}>Total Orders</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1d4ed8' }}>{profile.stats.totalOrders}</p>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: '#6b7280' }}>Total Sales</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>৳{profile.stats.totalSales.toFixed(2)}</p>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: '#6b7280' }}>Total Collection</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#9333ea' }}>৳{profile.stats.totalCollection.toFixed(2)}</p>
              </div>
              <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', color: '#6b7280' }}>Total Due</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#d97706' }}>৳{profile.stats.totalDue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.5)'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '12px'
          }}>Address Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '12px',
            fontSize: '12px'
          }}>
            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
              <p style={{ fontSize: '10px', color: '#6b7280' }}>Address</p>
              <p style={{ fontWeight: '500', color: '#374151', wordBreak: 'break-word' }}>{profile.address}</p>
            </div>
            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
              <p style={{ fontSize: '10px', color: '#6b7280' }}>City</p>
              <p style={{ fontWeight: '500', color: '#374151' }}>{profile.city}</p>
            </div>
            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
              <p style={{ fontSize: '10px', color: '#6b7280' }}>State</p>
              <p style={{ fontWeight: '500', color: '#374151' }}>{profile.state}</p>
            </div>
            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
              <p style={{ fontSize: '10px', color: '#6b7280' }}>Pincode</p>
              <p style={{ fontWeight: '500', color: '#374151' }}>{profile.pincode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '12px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            maxWidth: '672px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Edit size={20} style={{ color: '#2563eb' }} />
                Edit Profile
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  color: '#9ca3af',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Phone <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editForm.city || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={editForm.state || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={editForm.pincode || ""}
                    onChange={handleEditChange}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {submitError && (
                <div style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #fecaca'
                }}>
                  <AlertCircle size={16} />
                  <span>{submitError}</span>
                </div>
              )}
              {submitSuccess && (
                <div style={{
                  background: '#f0fdf4',
                  color: '#16a34a',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #bbf7d0'
                }}>
                  <CheckCircle size={16} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    background: '#f3f4f6',
                    color: '#374151',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background 0.2s'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    background: '#2563eb',
                    color: 'white',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    opacity: isSubmitting || submitSuccess ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background 0.2s'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Responsive grid for stats */
        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        /* Responsive grid for address */
        @media (min-width: 640px) {
          .address-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Responsive grid for form */
        @media (min-width: 640px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Responsive button layout */
        @media (min-width: 480px) {
          .modal-buttons {
            flex-direction: row !important;
          }
        }
        /* Responsive header */
        @media (min-width: 640px) {
          .header-layout {
            flex-direction: row !important;
            align-items: center !important;
          }
          .header-button {
            align-self: center !important;
          }
        }
        /* Responsive profile layout */
        @media (min-width: 640px) {
          .profile-layout {
            flex-direction: row !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .profile-info {
            text-align: left !important;
          }
          .profile-badges {
            justify-content: flex-start !important;
          }
          .profile-contacts {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}