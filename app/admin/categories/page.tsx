
"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Tag,
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  X,
  Loader2,
  Save,
  Layers,
  CheckCircle,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Category {
  id: string;
  name: string;
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_CATEGORIES: Category[] = [
  { id: "c1", name: "Admixture" },
  { id: "c2", name: "Paint" },
  { id: "c3", name: "Primer" },
  { id: "c4", name: "Coating" },
  { id: "c5", name: "Sealant" },
  { id: "c6", name: "Thinner" },
  { id: "c7", name: "Hardener" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CategoriesPage() {
  // ---------- State ----------
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Omit<Category, "id">>({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // ---------- Derived ----------
  const filteredCategories = useMemo(() => {
    let result = categories;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    return result;
  }, [categories, searchTerm]);

  const totalCategories = categories.length;

  // ---------- Handlers ----------
  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ name: "" });
    setModalError(null);
    setModalSuccess(false);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setModalError(null);
    setModalSuccess(false);
    setShowModal(true);
  };

  const handleDelete = (category: Category) => {
    setDeleteTarget(category);
    setShowDeleteConfirm(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError("Category name is required");
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formData.name }
            : c
        )
      );
    } else {
      // Add new
      const newCategory: Category = {
        id: `c${Date.now()}`,
        name: formData.name,
      };
      setCategories((prev) => [newCategory, ...prev]);
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
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setModalError(null);
    setModalSuccess(false);
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-80 h-64 sm:h-80 md:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4 bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <Tag className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                Category Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage product categories</p>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/50 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Search by category name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-3 sm:px-4 py-2 bg-gray-200/70 backdrop-blur-sm rounded-xl hover:bg-gray-300/70 transition flex items-center gap-2 text-sm sm:text-base"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50">
                <tr>
                  <th className="text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-700">#</th>
                  <th className="text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-700">Category Name</th>
                  <th className="text-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 sm:py-10 text-gray-400">
                      <Tag className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm sm:text-base">No categories found</p>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100/60 hover:bg-white/30 transition"
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-500">{index + 1}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-gray-800 text-xs sm:text-sm">{category.name}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100/50 transition"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100/50 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200/50 text-[10px] sm:text-xs text-gray-500 bg-white/30 backdrop-blur-sm">
            Showing {filteredCategories.length} of {totalCategories} categories
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-4 sm:p-5 md:p-6 animate-fadeIn border border-white/50 mx-3 sm:mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition">
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Admixture"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              {modalError && (
                <div className="bg-red-50 text-red-700 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-red-200">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}
              {modalSuccess && (
                <div className="bg-green-50 text-green-700 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-green-200">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{editingCategory ? "Category updated successfully!" : "Category added successfully!"}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 sm:h-5 sm:w-5" />
                      {editingCategory ? "Update" : "Add"} Category
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-4 sm:p-5 md:p-6 animate-fadeIn border border-white/50 mx-3 sm:mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Confirm Delete</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteTarget.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm sm:text-base"
              >
                Delete Category
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