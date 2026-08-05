// // app/admin/products/page.tsx
// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Building2,
//   Package,
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   X,
//   Loader2,
//   Save,
//   Layers,
//   ToggleLeft,
//   ToggleRight,
//   IndianRupee,
//   Filter,
//   Tag,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   bottleSize: string;
//   buyingPrice: number;
//   sellingPrice: number;
//   status: "active" | "inactive";
// }

// // ============================================================
// // MOCK DATA – Replace with API calls
// // ============================================================
// const MOCK_PRODUCTS: Product[] = [
//   {
//     id: "p1",
//     name: "SuperPlast PC-300",
//     category: "Admixture",
//     bottleSize: "5 Ltr",
//     buyingPrice: 850,
//     sellingPrice: 1250,
//     status: "active",
//   },
//   {
//     id: "p2",
//     name: "Waterproof Coating WPC",
//     category: "Paint",
//     bottleSize: "4 Kg",
//     buyingPrice: 580,
//     sellingPrice: 850,
//     status: "active",
//   },
//   {
//     id: "p3",
//     name: "Epoxy Floor Paint Grey",
//     category: "Paint",
//     bottleSize: "1 Ltr",
//     buyingPrice: 1500,
//     sellingPrice: 2200,
//     status: "active",
//   },
//   {
//     id: "p4",
//     name: "Concrete Admixture A40",
//     category: "Admixture",
//     bottleSize: "20 Ltr",
//     buyingPrice: 680,
//     sellingPrice: 980,
//     status: "inactive",
//   },
//   {
//     id: "p5",
//     name: "Acrylic Emulsion White",
//     category: "Paint",
//     bottleSize: "1 Ltr",
//     buyingPrice: 420,
//     sellingPrice: 640,
//     status: "active",
//   },
//   {
//     id: "p6",
//     name: "Anti-Corrosive Primer",
//     category: "Primer",
//     bottleSize: "1 Ltr",
//     buyingPrice: 780,
//     sellingPrice: 1120,
//     status: "active",
//   },
//   {
//     id: "p7",
//     name: "SuperPlast PC-500",
//     category: "Admixture",
//     bottleSize: "1 Ltr",
//     buyingPrice: 980,
//     sellingPrice: 1450,
//     status: "inactive",
//   },
//   {
//     id: "p8",
//     name: "Wall Putty",
//     category: "Coating",
//     bottleSize: "10 Kg",
//     buyingPrice: 320,
//     sellingPrice: 490,
//     status: "active",
//   },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function ProductsPage() {
//   // ---------- State ----------
//   const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Search and filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [formData, setFormData] = useState<Omit<Product, "id">>({
//     name: "",
//     category: "",
//     bottleSize: "",
//     buyingPrice: 0,
//     sellingPrice: 0,
//     status: "active",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [modalError, setModalError] = useState<string | null>(null);
//   const [modalSuccess, setModalSuccess] = useState(false);

//   // Delete confirmation
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

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
//           p.category.toLowerCase().includes(q) ||
//           p.bottleSize.toLowerCase().includes(q)
//       );
//     }
//     if (categoryFilter !== "all") {
//       result = result.filter((p) => p.category === categoryFilter);
//     }
//     if (statusFilter !== "all") {
//       result = result.filter((p) => p.status === statusFilter);
//     }
//     return result;
//   }, [products, searchTerm, categoryFilter, statusFilter]);

//   const totalProducts = products.length;
//   const activeProducts = products.filter((p) => p.status === "active").length;
//   const inactiveProducts = products.filter((p) => p.status === "inactive").length;
//   const totalStockValue = products.reduce((sum, p) => sum + p.sellingPrice * 1, 0); // simplified

//   // ---------- Handlers ----------
//   const handleAddNew = () => {
//     setEditingProduct(null);
//     setFormData({
//       name: "",
//       category: "",
//       bottleSize: "",
//       buyingPrice: 0,
//       sellingPrice: 0,
//       status: "active",
//     });
//     setModalError(null);
//     setModalSuccess(false);
//     setShowModal(true);
//   };

//   const handleEdit = (product: Product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       bottleSize: product.bottleSize,
//       buyingPrice: product.buyingPrice,
//       sellingPrice: product.sellingPrice,
//       status: product.status,
//     });
//     setModalError(null);
//     setModalSuccess(false);
//     setShowModal(true);
//   };

//   const handleDelete = (product: Product) => {
//     setDeleteTarget(product);
//     setShowDeleteConfirm(true);
//   };

//   const handleToggleStatus = (product: Product) => {
//     const newStatus = product.status === "active" ? "inactive" : "active";
//     updateProduct({ ...product, status: newStatus });
//   };

//   const updateProduct = (updated: Product) => {
//     setProducts((prev) =>
//       prev.map((p) => (p.id === updated.id ? updated : p))
//     );
//   };

//   const handleModalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name.trim()) {
//       setModalError("Product name is required");
//       return;
//     }
//     if (!formData.category.trim()) {
//       setModalError("Category is required");
//       return;
//     }
//     if (!formData.bottleSize.trim()) {
//       setModalError("Bottle size is required");
//       return;
//     }
//     if (formData.buyingPrice < 0) {
//       setModalError("Buying price cannot be negative");
//       return;
//     }
//     if (formData.sellingPrice < 0) {
//       setModalError("Selling price cannot be negative");
//       return;
//     }

//     setIsSubmitting(true);
//     setModalError(null);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     if (editingProduct) {
//       // Update existing
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === editingProduct.id
//             ? {
//                 ...p,
//                 name: formData.name,
//                 category: formData.category,
//                 bottleSize: formData.bottleSize,
//                 buyingPrice: formData.buyingPrice,
//                 sellingPrice: formData.sellingPrice,
//                 status: formData.status,
//               }
//             : p
//         )
//       );
//     } else {
//       // Add new
//       const newProduct: Product = {
//         id: `p${Date.now()}`,
//         ...formData,
//       };
//       setProducts((prev) => [newProduct, ...prev]);
//     }

//     setIsSubmitting(false);
//     setModalSuccess(true);
//     setTimeout(() => {
//       setShowModal(false);
//       setModalSuccess(false);
//     }, 1500);
//   };

//   const handleConfirmDelete = async () => {
//     if (!deleteTarget) return;
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
//     setShowDeleteConfirm(false);
//     setDeleteTarget(null);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingProduct(null);
//     setModalError(null);
//     setModalSuccess(false);
//   };

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading products...</p>
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
//       {/* Background decorations */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
//           <div className="flex items-center gap-4">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
//               <Package className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
//                 Product Management
//               </h1>
//               <p className="text-gray-600">Manage all products and inventory</p>
//             </div>
//           </div>
//           <button
//             onClick={handleAddNew}
//             className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition"
//           >
//             <Plus className="h-5 w-5" />
//             Add Product
//           </button>
//         </div>


//         {/* Filters */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Search by product name, category or bottle size..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//               />
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat === "all" ? "All Categories" : cat}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
//                 className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setCategoryFilter("all");
//                   setStatusFilter("all");
//                 }}
//                 className="px-4 py-2 bg-gray-200/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/70 transition flex items-center gap-2"
//               >
//                 <X className="h-4 w-4" />
//                 Clear
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
//                 <tr>
//                   <th className="text-left px-6 py-4 font-semibold text-gray-700">#</th>
//                   <th className="text-left px-6 py-4 font-semibold text-gray-700">Product Name</th>
//                   <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>
//                   <th className="text-center px-6 py-4 font-semibold text-gray-700">Bottle Size</th>
//                   <th className="text-right px-6 py-4 font-semibold text-gray-700">Buying (₹)</th>
//                   <th className="text-right px-6 py-4 font-semibold text-gray-700">Selling (₹)</th>
//                   <th className="text-center px-6 py-4 font-semibold text-gray-700">Status</th>
//                   <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length === 0 ? (
//                   <tr>
//                     <td colSpan={8} className="text-center py-10 text-gray-400">
//                       <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
//                       <p>No products found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts.map((product, index) => (
//                     <tr
//                       key={product.id}
//                       className="border-b border-gray-100/60 hover:bg-white/30 transition"
//                     >
//                       <td className="px-6 py-4 text-gray-500">{index + 1}</td>
//                       <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
//                       <td className="px-6 py-4 text-gray-600">{product.category}</td>
//                       <td className="px-6 py-4 text-center font-medium text-gray-700">
//                         {product.bottleSize}
//                       </td>
//                       <td className="px-6 py-4 text-right font-medium text-gray-700">
//                         ₹{product.buyingPrice.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-right font-bold text-blue-700">
//                         ₹{product.sellingPrice.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <StatusBadge status={product.status} />
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => handleEdit(product)}
//                             className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100/50 transition"
//                             title="Edit"
//                           >
//                             <Edit className="h-5 w-5" />
//                           </button>
//                           <button
//                             onClick={() => handleToggleStatus(product)}
//                             className={`${
//                               product.status === "active"
//                                 ? "text-amber-600 hover:text-amber-800"
//                                 : "text-green-600 hover:text-green-800"
//                             } p-1 rounded-full hover:bg-gray-100/50 transition`}
//                             title={product.status === "active" ? "Deactivate" : "Activate"}
//                           >
//                             {product.status === "active" ? (
//                               <ToggleLeft className="h-5 w-5" />
//                             ) : (
//                               <ToggleRight className="h-5 w-5" />
//                             )}
//                           </button>
//                           <button
//                             onClick={() => handleDelete(product)}
//                             className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100/50 transition"
//                             title="Delete"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="px-6 py-3 border-t border-gray-200/50 text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
//             Showing {filteredProducts.length} of {totalProducts} products
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn border border-white/50">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Package className="h-5 w-5 text-blue-600" />
//                 {editingProduct ? "Edit Product" : "Add New Product"}
//               </h2>
//               <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <form onSubmit={handleModalSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="e.g., SuperPlast PC-300"
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     placeholder="e.g., Admixture"
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Bottle Size <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.bottleSize}
//                   onChange={(e) => setFormData({ ...formData, bottleSize: e.target.value })}
//                   placeholder="e.g., 5 Ltr, 4 Kg, 1 Ltr"
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Buying Price (₹) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={formData.buyingPrice}
//                     onChange={(e) =>
//                       setFormData({ ...formData, buyingPrice: parseFloat(e.target.value) || 0 })
//                     }
//                     placeholder="0.00"
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Selling Price (₹) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={formData.sellingPrice}
//                     onChange={(e) =>
//                       setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })
//                     }
//                     placeholder="0.00"
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="active"
//                       checked={formData.status === "active"}
//                       onChange={() => setFormData({ ...formData, status: "active" })}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm font-medium text-gray-700">Active</span>
//                   </label>
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="inactive"
//                       checked={formData.status === "inactive"}
//                       onChange={() => setFormData({ ...formData, status: "inactive" })}
//                       className="h-4 w-4 text-red-600 focus:ring-red-500"
//                     />
//                     <span className="text-sm font-medium text-gray-700">Inactive</span>
//                   </label>
//                 </div>
//               </div>

//               {modalError && (
//                 <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-200">
//                   <AlertCircle className="h-4 w-4" />
//                   {modalError}
//                 </div>
//               )}
//               {modalSuccess && (
//                 <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-green-200">
//                   <CheckCircle className="h-4 w-4" />
//                   {editingProduct ? "Product updated successfully!" : "Product added successfully!"}
//                 </div>
//               )}

//               <div className="flex gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || modalSuccess}
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5" />
//                       {editingProduct ? "Update" : "Add"} Product
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && deleteTarget && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fadeIn border border-white/50">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-red-100 p-2 rounded-full">
//                 <AlertCircle className="h-6 w-6 text-red-600" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
//             </div>
//             <p className="text-gray-600">
//               Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteTarget.name}</span>?
//               This action cannot be undone.
//             </p>
//             <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmDelete}
//                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Animation keyframes */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
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

// interface StatusBadgeProps {
//   status: "active" | "inactive";
// }

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
//   if (status === "active") {
//     return (
//       <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 inline-flex items-center gap-1">
//         <CheckCircle className="h-3 w-3" />
//         Active
//       </span>
//     );
//   }
//   return (
//     <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700 inline-flex items-center gap-1">
//       <XCircle className="h-3 w-3" />
//       Inactive
//     </span>
//   );
// };
// app/admin/products/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Save,
  Filter,
  Tag,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Product {
  id: string;
  name: string;
  category: string;
  bottleSize: string;
  buyingPrice: number;
  sellingPrice: number;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "SuperPlast PC-300",
    category: "Admixture",
    bottleSize: "5 Ltr",
    buyingPrice: 850,
    sellingPrice: 1250,
  },
  {
    id: "p2",
    name: "Waterproof Coating WPC",
    category: "Paint",
    bottleSize: "4 Kg",
    buyingPrice: 580,
    sellingPrice: 850,
  },
  {
    id: "p3",
    name: "Epoxy Floor Paint Grey",
    category: "Paint",
    bottleSize: "1 Ltr",
    buyingPrice: 1500,
    sellingPrice: 2200,
  },
  {
    id: "p4",
    name: "Concrete Admixture A40",
    category: "Admixture",
    bottleSize: "20 Ltr",
    buyingPrice: 680,
    sellingPrice: 980,
  },
  {
    id: "p5",
    name: "Acrylic Emulsion White",
    category: "Paint",
    bottleSize: "1 Ltr",
    buyingPrice: 420,
    sellingPrice: 640,
  },
  {
    id: "p6",
    name: "Anti-Corrosive Primer",
    category: "Primer",
    bottleSize: "1 Ltr",
    buyingPrice: 780,
    sellingPrice: 1120,
  },
  {
    id: "p7",
    name: "SuperPlast PC-500",
    category: "Admixture",
    bottleSize: "1 Ltr",
    buyingPrice: 980,
    sellingPrice: 1450,
  },
  {
    id: "p8",
    name: "Wall Putty",
    category: "Coating",
    bottleSize: "10 Kg",
    buyingPrice: 320,
    sellingPrice: 490,
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProductsPage() {
  // ---------- State ----------
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    bottleSize: "",
    buyingPrice: 0,
    sellingPrice: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // ---------- Derived ----------
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.bottleSize.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    return result;
  }, [products, searchTerm, categoryFilter]);

  const totalProducts = products.length;

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      bottleSize: "",
      buyingPrice: 0,
      sellingPrice: 0,
    });
    setModalError(null);
    setModalSuccess(false);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      bottleSize: product.bottleSize,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
    });
    setModalError(null);
    setModalSuccess(false);
    setShowModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteTarget(product);
    setShowDeleteConfirm(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError("Product name is required");
      return;
    }
    if (!formData.category.trim()) {
      setModalError("Category is required");
      return;
    }
    if (!formData.bottleSize.trim()) {
      setModalError("Bottle size is required");
      return;
    }
    if (formData.buyingPrice < 0) {
      setModalError("Buying price cannot be negative");
      return;
    }
    if (formData.sellingPrice < 0) {
      setModalError("Selling price cannot be negative");
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (editingProduct) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                bottleSize: formData.bottleSize,
                buyingPrice: formData.buyingPrice,
                sellingPrice: formData.sellingPrice,
              }
            : p
        )
      );
    } else {
      // Add new
      const newProduct: Product = {
        id: `p${Date.now()}`,
        ...formData,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsSubmitting(false);
    setModalSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setModalSuccess(false);
    }, 1500);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setModalError(null);
    setModalSuccess(false);
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
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
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-gray-600">Manage all products and inventory</p>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by product name, category or bottle size..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                className="px-4 py-2 bg-gray-200/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/70 transition flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">#</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Product Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Bottle Size</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Buying (৳)</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Selling (৳)</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
                      <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>No products found</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100/60 hover:bg-white/30 transition"
                    >
                      <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">
                        {product.bottleSize}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-700">
                        ৳{product.buyingPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-blue-700">
                        ৳{product.sellingPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100/50 transition"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100/50 transition"
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
          <div className="px-6 py-3 border-t border-gray-200/50 text-sm text-gray-500 bg-white/30 backdrop-blur-sm">
            Showing {filteredProducts.length} of {totalProducts} products
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., SuperPlast PC-300"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Admixture"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bottle Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bottleSize}
                  onChange={(e) => setFormData({ ...formData, bottleSize: e.target.value })}
                  placeholder="e.g., 5 Ltr, 4 Kg, 1 Ltr"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buying Price (৳) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.buyingPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, buyingPrice: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price (৳) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              {modalError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  {modalError}
                </div>
              )}
              {modalSuccess && (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  {editingProduct ? "Product updated successfully!" : "Product added successfully!"}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      {editingProduct ? "Update" : "Add"} Product
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fadeIn border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteTarget.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}