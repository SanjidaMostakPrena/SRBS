"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Building2,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Phone,
  MapPin,
  ShoppingBag,
  Clock,
  IndianRupee,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  currentDue: number;
  lastOrder: string; // date string
  totalPurchase: number;
  createdAt: string;
}

type CustomerFormData = Omit<Customer, "id" | "createdAt">;

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Green Valley Constructions",
    phone: "+91 98765 43210",
    email: "info@gvc.com",
    address: "123, MG Road, Mumbai",
    area: "Mumbai",
    currentDue: 0,
    lastOrder: "2024-12-15",
    totalPurchase: 125000,
    createdAt: "2023-01-10",
  },
  {
    id: "c2",
    name: "Apex Builders",
    phone: "+91 87654 32109",
    email: "accounts@apex.in",
    address: "456, Park Street, Kolkata",
    area: "Kolkata",
    currentDue: 1250.50,
    lastOrder: "2025-01-05",
    totalPurchase: 87500,
    createdAt: "2023-03-22",
  },
  {
    id: "c3",
    name: "SRBS Retail Store – Mumbai",
    phone: "+91 76543 21098",
    email: "mumbai@srbs.com",
    address: "789, Linking Road, Mumbai",
    area: "Mumbai",
    currentDue: 450.00,
    lastOrder: "2025-01-10",
    totalPurchase: 32400,
    createdAt: "2024-06-01",
  },
  {
    id: "c4",
    name: "Kolkata Infrastructure Ltd",
    phone: "+91 65432 10987",
    email: "procurement@kil.net",
    address: "101, Ballygunge, Kolkata",
    area: "Kolkata",
    currentDue: 3200.75,
    lastOrder: "2024-12-28",
    totalPurchase: 215000,
    createdAt: "2022-11-15",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    currentDue: 0,
    lastOrder: "",
    totalPurchase: 0,
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ---------- Derived: filtered customers ----------
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    const q = searchTerm.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q)
    );
  }, [customers, searchTerm]);

  // ---------- Handlers ----------
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      area: "",
      currentDue: 0,
      lastOrder: "",
      totalPurchase: 0,
    });
    setFormErrors({});
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (customer: Customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      area: customer.area,
      currentDue: customer.currentDue,
      lastOrder: customer.lastOrder,
      totalPurchase: customer.totalPurchase,
    });
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const openProfileModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowProfileModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
    // Clear field error
    if (formErrors[name as keyof CustomerFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CustomerFormData, string>> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.area.trim()) errors.area = "Area is required";
    if (formData.currentDue < 0) errors.currentDue = "Due cannot be negative";
    if (formData.totalPurchase < 0) errors.totalPurchase = "Total purchase cannot be negative";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (showEditModal && selectedCustomer) {
      // Edit existing
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      // Add new
      const newCustomer: Customer = {
        id: `c${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2000);

    // Close modals after short delay
    setTimeout(() => {
      setShowAddModal(false);
      setShowEditModal(false);
      resetForm();
      setSelectedCustomer(null);
    }, 500);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // ---------- Render helpers ----------
  const renderModal = (title: string, isEdit: boolean) => {
    const isOpen = isEdit ? showEditModal : showAddModal;
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={() => {
                isEdit ? setShowEditModal(false) : setShowAddModal(false);
                resetForm();
                setSelectedCustomer(null);
              }}
              className="text-gray-400 hover:text-gray-600 transition p-1"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name 
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone 
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email 
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address 
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  formErrors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleFormChange}
                className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  formErrors.area ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Area</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              {formErrors.area && (
                <p className="text-red-500 text-sm mt-1">{formErrors.area}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Due (৳)
              </label>
              <input
                type="number"
                name="currentDue"
                min="0"
                step="0.01"
                value={formData.currentDue}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {submitSuccess && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Customer saved successfully!</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  isEdit ? setShowEditModal(false) : setShowAddModal(false);
                  resetForm();
                  setSelectedCustomer(null);
                }}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {isSubmitting ? "Saving..." : isEdit ? "Update" : "Add Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderProfileModal = () => {
    if (!showProfileModal || !selectedCustomer) return null;
    const c = selectedCustomer;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Profile</h2>
            <button
              onClick={() => setShowProfileModal(false)}
              className="text-gray-400 hover:text-gray-600 transition p-1"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-gray-200">
              <div className="bg-blue-100 p-3 rounded-full self-start sm:self-auto">
                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{c.name}</h3>
                <p className="text-sm text-gray-500 break-all">{c.email}</p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700 break-all">{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700 break-all">{c.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">Area: {c.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">
                  Current Due: <span className="font-semibold text-amber-600">৳{c.currentDue.toFixed(2)}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">
                  Last Order: {new Date(c.lastOrder).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">
                  Total Purchase: <span className="font-semibold text-blue-700">৳{c.totalPurchase.toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Additional info */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
              <p>Customer since: {new Date(c.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  openEditModal(c);
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-700 text-white p-2 sm:p-3 rounded-xl shadow-md flex-shrink-0">
              <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800">SRBS Admixture & Paint</h1>
              <p className="text-xs sm:text-sm text-gray-500">Customer Management</p>
            </div>
          </div>
          
        </div>

        {/* Search & filter */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-3 sm:p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, phone, email, area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden sm:table-cell">Phone</th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden md:table-cell">Address</th>
                  <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden lg:table-cell">Area</th>
                  <th className="text-right px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600">Due (৳)</th>
                  <th className="text-right px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600 hidden md:table-cell">Last Order</th>
                  <th className="text-center px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 sm:py-8 text-gray-400 text-sm">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 hover:bg-blue-50/50 transition cursor-pointer"
                      onClick={() => openProfileModal(customer)}
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 text-xs sm:text-sm break-words max-w-[100px] sm:max-w-[150px]">
                        {customer.name}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 hidden sm:table-cell text-xs sm:text-sm">
                        {customer.phone}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 hidden md:table-cell text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[150px]">
                        {customer.address}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 hidden lg:table-cell text-xs sm:text-sm">
                        {customer.area}
                      </td>
                      <td className={`px-2 sm:px-4 py-2 sm:py-3 text-right font-medium text-xs sm:text-sm ${customer.currentDue > 0 ? "text-amber-600" : "text-green-600"}`}>
                        ৳{customer.currentDue.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-gray-600 hidden md:table-cell text-xs sm:text-sm">
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                        <div className="flex items-center justify-center gap-1 sm:gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => openEditModal(customer)}
                            className="p-1 sm:p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={() => openProfileModal(customer)}
                            className="p-1 sm:p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                            title="View Profile"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="p-1 sm:p-1.5 rounded-lg text-red-500 hover:bg-red-100 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {renderModal("Add Customer", false)}
        {renderModal("Edit Customer", true)}
        {renderProfileModal()}

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
    </div>
  );
}