
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  CreditCard,
  Building2,
  Search,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  User,
  Clock,
  Receipt,
  Loader2,
  TrendingUp,
  Wallet,
  Users,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  currentDue: number;
}

interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  previousDue: number;
  newDue: number;
  remarks: string;
  date: string;
}

// ============================================================
// MOCK DATA – Replace with API calls when ready
// ============================================================
const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Green Valley Constructions", phone: "+91 98765 43210", email: "info@gvc.com", currentDue: 0 },
  { id: "c2", name: "Apex Builders", phone: "+91 87654 32109", email: "accounts@apex.in", currentDue: 1250.50 },
  { id: "c3", name: "SRBS Retail Store – Mumbai", phone: "+91 76543 21098", email: "mumbai@srbs.com", currentDue: 450.00 },
  { id: "c4", name: "Kolkata Infrastructure Ltd", phone: "+91 65432 10987", email: "procurement@kil.net", currentDue: 3200.75 },
  { id: "c5", name: "Delhi Constructors", phone: "+91 54321 09876", email: "info@delhicon.com", currentDue: 780.25 },
];

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "p1",
    customerId: "c2",
    customerName: "Apex Builders",
    amount: 500,
    previousDue: 1750.50,
    newDue: 1250.50,
    remarks: "Partial payment",
    date: "2025-01-10",
  },
  {
    id: "p2",
    customerId: "c3",
    customerName: "SRBS Retail Store – Mumbai",
    amount: 200,
    previousDue: 650.00,
    newDue: 450.00,
    remarks: "Payment received",
    date: "2025-01-05",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PaymentsPage() {
  // ---------- State ----------
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const [receiveAmount, setReceiveAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ---------- Derived ----------
  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) return customers;
    const q = customerSearch.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [customers, customerSearch]);

  const currentDue = selectedCustomer?.currentDue || 0;
  const amountNum = parseFloat(receiveAmount) || 0;
  const newDue = Math.max(0, currentDue - amountNum);

  // Summary statistics
  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPendingDue = customers.reduce((sum, c) => sum + c.currentDue, 0);
  const customersWithDue = customers.filter((c) => c.currentDue > 0).length;

  // Reset form when customer changes
  useEffect(() => {
    setReceiveAmount("");
    setRemarks("");
    setPaymentError(null);
  }, [selectedCustomer]);

  // ---------- Handlers ----------
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
    setReceiveAmount("");
    setPaymentError(null);
  };

  const handleAmountChange = (value: string) => {
    const num = parseFloat(value) || 0;
    setReceiveAmount(value);
    if (num > currentDue) {
      setPaymentError(`Cannot exceed current due of ৳${currentDue.toFixed(2)}`);
    } else if (num <= 0) {
      setPaymentError("Amount must be greater than 0");
    } else {
      setPaymentError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer) {
      setSubmitError("Please select a customer");
      return;
    }
    if (!amountNum || amountNum <= 0) {
      setSubmitError("Please enter a valid payment amount");
      return;
    }
    if (amountNum > currentDue) {
      setSubmitError("Amount exceeds current due");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPayment: Payment = {
      id: `p${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      amount: amountNum,
      previousDue: currentDue,
      newDue: currentDue - amountNum,
      remarks: remarks.trim() || "Payment received",
      date: new Date().toISOString().split("T")[0],
    };

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id
          ? { ...c, currentDue: c.currentDue - amountNum }
          : c
      )
    );
    setPayments((prev) => [newPayment, ...prev]);
    setSelectedCustomer((prev) =>
      prev ? { ...prev, currentDue: prev.currentDue - amountNum } : null
    );

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setReceiveAmount("");
    setRemarks("");
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  // ---------- Dropdown render ----------
  const renderCustomerDropdown = () => {
    if (!showCustomerDropdown) return null;
    if (filteredCustomers.length === 0) {
      return (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-20 p-4 text-center text-gray-500 text-xs sm:text-sm">
          <AlertCircle className="inline mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
          No customers found
        </div>
      );
    }
    return (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
        {filteredCustomers.map((customer) => (
          <button
            key={customer.id}
            className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 last:border-0 gap-1 sm:gap-2"
            onClick={() => handleSelectCustomer(customer)}
          >
            <div className="min-w-0">
              <div className="font-medium text-gray-800 text-sm sm:text-base truncate">{customer.name}</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">{customer.phone} · {customer.email}</div>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 bg-white/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0 self-start sm:self-center">
              Due: ৳{customer.currentDue.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    );
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payments data...</p>
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
  // MAIN RENDER – Creative Design
  // ============================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-80 h-32 sm:h-48 md:h-64 lg:h-80 xl:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with glass effect */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-white/30 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                SRBS Admixture & Paint
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 flex flex-wrap items-center gap-1 sm:gap-2">
                <span>Due Collection</span>
                <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-400 rounded-full"></span>
                <span className="text-[10px] sm:text-sm">{new Date().toLocaleDateString()}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="bg-white/40 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl border border-white/50 shadow-sm flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Today's collection</span>
              <span className="font-bold text-blue-700 text-xs sm:text-sm">৳{totalCollected.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Collected</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-700 truncate">৳{totalCollected.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Total Pending Due</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-amber-600 truncate">৳{totalPendingDue.toFixed(2)}</p>
              </div>
              <div className="bg-amber-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-white/50 hover:shadow-xl transition group">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 truncate">Customers with Due</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-700 truncate">{customersWithDue}</p>
              </div>
              <div className="bg-purple-100 p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition flex-shrink-0">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Main Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 mb-4 sm:mb-5 md:mb-6">
                <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Record Payment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Customer Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Customer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm focus-within:ring-4 focus-within:ring-blue-200 focus-within:border-blue-400 transition-all">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 ml-2 sm:ml-3 md:ml-4 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search customer by name, phone or email..."
                        className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 outline-none bg-transparent text-gray-700 text-sm sm:text-base rounded-xl sm:rounded-2xl"
                        value={customerSearch}
                        onChange={(e) => {
                          setCustomerSearch(e.target.value);
                          setShowCustomerDropdown(true);
                        }}
                        onFocus={() => setShowCustomerDropdown(true)}
                        onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                      />
                    </div>
                    {renderCustomerDropdown()}
                  </div>
                  {selectedCustomer && (
                    <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border border-blue-100/60">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">{selectedCustomer.name}</span>
                      <span className="text-gray-500 hidden xs:inline">|</span>
                      <span className="text-gray-600 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]">{selectedCustomer.phone}</span>
                      <span className="text-gray-500 hidden sm:inline">|</span>
                      <span className="font-semibold text-amber-600 bg-amber-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                        Due: ৳{currentDue.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Receive Amount (৳) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm sm:text-base">৳</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={receiveAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0.00"
                      disabled={!selectedCustomer}
                      className={`w-full pl-7 sm:pl-8 md:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border-2 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm ${
                        paymentError ? "border-red-400" : "border-gray-200"
                      } ${!selectedCustomer ? "bg-gray-100/50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {paymentError && (
                    <p className="text-red-500 text-[10px] sm:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                      <span>{paymentError}</span>
                    </p>
                  )}
                  {selectedCustomer && (
                    <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm">
                      <span className="text-gray-500">New due after payment:</span>
                      <span className={`font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${
                        newDue === 0 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        ৳{newDue.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Remarks
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="e.g., Partial payment, full settlement, etc."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Feedback */}
                {submitError && (
                  <div className="bg-red-50/80 backdrop-blur-sm text-red-700 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-start gap-2 border border-red-200">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                {submitSuccess && (
                  <div className="bg-green-50/80 backdrop-blur-sm text-green-700 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-2 border border-green-200">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>Payment recorded successfully!</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedCustomer || !amountNum || amountNum > currentDue || isSubmitting || submitSuccess}
                  className={`w-full py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-white text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 shadow-lg ${
                    !selectedCustomer || !amountNum || amountNum > currentDue || isSubmitting || submitSuccess
                      ? "bg-gray-300 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Record Payment
                    </>
                  )}
                </button>

                <div className="text-[10px] sm:text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                  <IndianRupee className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  Due will be automatically updated
                </div>
              </form>
            </div>
          </div>

          {/* Recent Payments Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/50 sticky top-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2 mb-3 sm:mb-4">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Recent Payments
              </h3>
              {payments.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-400">
                  <Receipt className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-xs sm:text-sm">No payments yet</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1">
                  {payments.slice(0, 10).map((payment) => (
                    <div
                      key={payment.id}
                      className="group p-3 sm:p-4 bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100/60 hover:border-blue-300 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{payment.customerName}</p>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                            <span>{new Date(payment.date).toLocaleDateString()}</span>
                            <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gray-300 rounded-full"></span>
                            <span className="truncate max-w-[80px] sm:max-w-[100px]">{payment.remarks}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-bold text-green-600 text-sm sm:text-base">-৳{payment.amount.toFixed(2)}</span>
                          <div className="text-[10px] sm:text-xs text-gray-400">
                            Due: ৳{payment.newDue.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}