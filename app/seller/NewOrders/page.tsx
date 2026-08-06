
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Trash2,
  User,
  Package,
  Warehouse,
  Truck,
  CreditCard,
  Calculator,
  CheckCircle,
  AlertCircle,
  Building2,
  ShoppingBag,
  RefreshCw,
  Printer,
  Store,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  previousDue: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
  commission?: number;
}

interface Dealer {
  id: string;
  name: string;
  location: string;
  contact: string;
}

type DeliverySource = "dealer" | "warehouse";

// ============================================================
// MOCK DATA – replace with your API calls
// ============================================================
const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Green Valley Constructions", email: "info@gvc.com", phone: "+91 98765 43210", previousDue: 0 },
  { id: "c2", name: "Apex Builders", email: "accounts@apex.in", phone: "+91 87654 32109", previousDue: 1250.50 },
  { id: "c3", name: "SRBS Retail Store – Mumbai", email: "mumbai@srbs.com", phone: "+91 76543 21098", previousDue: 450.00 },
  { id: "c4", name: "Kolkata Infrastructure Ltd", email: "procurement@kil.net", phone: "+91 65432 10987", previousDue: 3200.75 },
];

const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "SRBS SuperPlast PC-300", sku: "ADM-1001", price: 1250.00, stock: 45 },
  { id: "p2", name: "SRBS Waterproof Coating – WPC", sku: "PNT-2002", price: 850.00, stock: 28 },
  { id: "p3", name: "SRBS Epoxy Floor Paint (Grey)", sku: "PNT-3003", price: 2200.00, stock: 12 },
  { id: "p4", name: "SRBS Concrete Admixture – A40", sku: "ADM-4004", price: 980.00, stock: 33 },
  { id: "p5", name: "SRBS Acrylic Emulsion (White)", sku: "PNT-5005", price: 640.00, stock: 19 },
  { id: "p6", name: "SRBS Anti‑Corrosive Primer", sku: "PNT-6006", price: 1120.00, stock: 8 },
];

const MOCK_DEALERS: Dealer[] = [
  { id: "d1", name: "Mumbai Construction Supplies", location: "Mumbai, Maharashtra", contact: "+91 98765 43210" },
  { id: "d2", name: "Delhi Building Materials", location: "Delhi, NCR", contact: "+91 87654 32109" },
  { id: "d3", name: "Chennai Hardware Store", location: "Chennai, Tamil Nadu", contact: "+91 76543 21098" },
  { id: "d4", name: "Kolkata Paint House", location: "Kolkata, West Bengal", contact: "+91 65432 10987" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function NewOrderPage() {
  // ---------- State ----------
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [deliverySource, setDeliverySource] = useState<DeliverySource>("warehouse");
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [dealerSearch, setDealerSearch] = useState("");
  const [showDealerDropdown, setShowDealerDropdown] = useState(false);

  const [paymentReceived, setPaymentReceived] = useState<number>(0);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderNotes, setOrderNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ---------- Derived: filtered customers, products & dealers ----------
  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) return MOCK_CUSTOMERS;
    const q = customerSearch.toLowerCase();
    return MOCK_CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [customerSearch]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return MOCK_PRODUCTS;
    const q = productSearch.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }, [productSearch]);

  const filteredDealers = useMemo(() => {
    if (!dealerSearch.trim()) return MOCK_DEALERS;
    const q = dealerSearch.toLowerCase();
    return MOCK_DEALERS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.contact.includes(q)
    );
  }, [dealerSearch]);

  // ---------- Derived: totals ----------
  const subtotal = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  }, [orderItems]);

  const totalCommission = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + (item.commission || 0), 0);
  }, [orderItems]);

  const previousDue = selectedCustomer?.previousDue || 0;

  const totalPayable = useMemo(() => {
    return subtotal + totalCommission + previousDue;
  }, [subtotal, totalCommission, previousDue]);

  const dueAmount = useMemo(() => {
    return Math.max(0, totalPayable - paymentReceived);
  }, [totalPayable, paymentReceived]);

  // Validate payment whenever total payable changes
  useEffect(() => {
    if (paymentReceived > totalPayable) {
      setPaymentError("Payment cannot exceed total payable");
    } else {
      setPaymentError(null);
    }
  }, [totalPayable, paymentReceived]);

  // Reset dealer when switching to warehouse
  useEffect(() => {
    if (deliverySource === "warehouse") {
      setSelectedDealer(null);
      setDealerSearch("");
    }
  }, [deliverySource]);

  // ---------- Handlers ----------
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
    setPaymentReceived(0);
    setPaymentError(null);
  };

  const handleSelectDealer = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setDealerSearch(dealer.name);
    setShowDealerDropdown(false);
  };

  const handleAddProduct = (product: Product) => {
    const existing = orderItems.find((item) => item.productId === product.id);
    if (existing) {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems((prev) => [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          quantity: 1,
          sellingPrice: product.price,
          commission: 0,
        },
      ]);
    }
    setProductSearch("");
    setShowProductDropdown(false);
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateItemField = (
    productId: string,
    field: keyof OrderItem,
    value: number
  ) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, [field]: value } : item
      )
    );
  };

  const handlePaymentChange = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      setPaymentReceived(0);
      setPaymentError("Please enter a valid amount");
      return;
    }
    setPaymentReceived(num);
    if (num > totalPayable) {
      setPaymentError("Payment cannot exceed total payable");
    } else {
      setPaymentError(null);
    }
  };

  const clearOrder = () => {
    setOrderItems([]);
    setSelectedCustomer(null);
    setCustomerSearch("");
    setPaymentReceived(0);
    setOrderNotes("");
    setSelectedDealer(null);
    setDealerSearch("");
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedCustomer) {
      setSubmitError("Please select a customer");
      return;
    }
    if (orderItems.length === 0) {
      setSubmitError("Please add at least one product");
      return;
    }
    if (deliverySource === "dealer" && !selectedDealer) {
      setSubmitError("Please select a dealer");
      return;
    }
    if (paymentReceived < 0) {
      setSubmitError("Payment cannot be negative");
      return;
    }
    if (paymentReceived > totalPayable) {
      setSubmitError("Payment exceeds total payable amount");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call – replace with your actual fetch
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  // ---------- Render dropdowns ----------
  const renderCustomerDropdown = () => {
    if (!showCustomerDropdown) return null;
    if (filteredCustomers.length === 0) {
      return (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 text-center text-gray-500">
          <AlertCircle className="inline mr-2 h-4 w-4" />
          No customers found
        </div>
      );
    }
    return (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
        {filteredCustomers.map((customer) => (
          <button
            key={customer.id}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
            onClick={() => handleSelectCustomer(customer)}
          >
            <div>
              <div className="font-medium text-gray-800">{customer.name}</div>
              <div className="text-sm text-gray-500">
                {customer.email} · {customer.phone}
              </div>
            </div>
            <div
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                customer.previousDue > 0
                  ? "bg-amber-100 text-amber-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Due: ৳{customer.previousDue.toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderProductDropdown = () => {
    if (!showProductDropdown) return null;
    if (filteredProducts.length === 0) {
      return (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 text-center text-gray-500">
          <AlertCircle className="inline mr-2 h-4 w-4" />
          No products found
        </div>
      );
    }
    return (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
            onClick={() => handleAddProduct(product)}
          >
            <div>
              <div className="font-medium text-gray-800">{product.name}</div>
              <div className="text-sm text-gray-500">SKU: {product.sku}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">
                ৳{product.price.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">{product.stock} in stock</div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderDealerDropdown = () => {
    if (!showDealerDropdown) return null;
    if (filteredDealers.length === 0) {
      return (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 text-center text-gray-500">
          <AlertCircle className="inline mr-2 h-4 w-4" />
          No dealers found
        </div>
      );
    }
    return (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
        {filteredDealers.map((dealer) => (
          <button
            key={dealer.id}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
            onClick={() => handleSelectDealer(dealer)}
          >
            <div>
              <div className="font-medium text-gray-800">{dealer.name}</div>
              <div className="text-sm text-gray-500">
                {dealer.location} · {dealer.contact}
              </div>
            </div>
            <Store className="h-4 w-4 text-gray-400" />
          </button>
        ))}
      </div>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ---------- HEADER with SRBS branding ---------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 text-white p-3 rounded-xl shadow-md">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">SRBS Admixture & Paint</h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>New Order</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {submitSuccess && (
              <span className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200 animate-pulse">
                <CheckCircle className="h-5 w-5" />
                Order submitted!
              </span>
            )}
            <button
              onClick={clearOrder}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={() => window.print()}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>

        {/* ---------- MAIN GRID ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Customer + Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* --- Customer Selection --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-blue-600" />
                Select Customer
              </h2>
              <div className="relative">
                <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                  <Search className="h-5 w-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search customer by name, email or phone..."
                    className="w-full px-3 py-3 outline-none bg-transparent text-gray-700 rounded-xl"
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
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <span className="font-medium text-gray-800">{selectedCustomer.name}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">{selectedCustomer.email}</span>
                  <span className="text-gray-500">|</span>
                  <span
                    className={`font-semibold ${
                      selectedCustomer.previousDue > 0 ? "text-amber-600" : "text-green-600"
                    }`}
                  >
                    Previous Due: ৳{selectedCustomer.previousDue.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* --- Product Search & Add --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 text-blue-600" />
                Add Products
              </h2>
              <div className="relative">
                <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                  <Search className="h-5 w-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search product by name or SKU..."
                    className="w-full px-3 py-3 outline-none bg-transparent text-gray-700 rounded-xl"
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                  />
                </div>
                {renderProductDropdown()}
              </div>
            </div>

            {/* --- Order Items List --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                  Order Items ({orderItems.length})
                </h2>
                {orderItems.length > 0 && (
                  <button
                    onClick={() => setOrderItems([])}
                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear all
                  </button>
                )}
              </div>

              {orderItems.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="font-medium">No items added yet</p>
                  <p className="text-sm">Search and add products above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800">{item.productName}</div>
                        <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-gray-500 font-medium">Qty</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemField(
                                item.productId,
                                "quantity",
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        {/* Selling Price (editable) */}
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-gray-500 font-medium">Price</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.sellingPrice}
                            onChange={(e) =>
                              updateItemField(
                                item.productId,
                                "sellingPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        {/* Commission (optional) */}
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-gray-500 font-medium">Comm.</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                            value={item.commission || 0}
                            onChange={(e) =>
                              updateItemField(
                                item.productId,
                                "commission",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-400 hover:text-red-600 p-1 transition"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------- RIGHT COLUMN: Summary & Actions ---------- */}
          <div className="space-y-6">
            {/* --- Delivery Source --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Truck className="h-4 w-4 text-blue-600" />
                Delivery Source
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliverySource("dealer")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                    deliverySource === "dealer"
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <Store className="h-4 w-4" />
                  Dealer
                </button>
                <button
                  onClick={() => setDeliverySource("warehouse")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                    deliverySource === "warehouse"
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Warehouse
                </button>
              </div>

              {/* Dealer Selection - Show only when Dealer is selected */}
              {deliverySource === "dealer" && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Select Dealer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                      <Search className="h-5 w-5 text-gray-400 ml-3" />
                      <input
                        type="text"
                        placeholder="Search dealer by name, location or contact..."
                        className="w-full px-3 py-3 outline-none bg-transparent text-gray-700 rounded-xl"
                        value={dealerSearch}
                        onChange={(e) => {
                          setDealerSearch(e.target.value);
                          setShowDealerDropdown(true);
                        }}
                        onFocus={() => setShowDealerDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDealerDropdown(false), 200)}
                      />
                    </div>
                    {renderDealerDropdown()}
                  </div>
                  {selectedDealer && (
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <Store className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-800">{selectedDealer.name}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">{selectedDealer.location}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">{selectedDealer.contact}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* --- Payment & Due --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <CreditCard className="h-4 w-4 text-blue-600" />
                Payment
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1 font-medium">
                    Receive Payment (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">৳</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={paymentReceived || ""}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  {paymentError && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {paymentError}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-xl">
                  <div className="text-gray-500">Subtotal</div>
                  <div className="text-right font-medium">৳{subtotal.toFixed(2)}</div>

                  <div className="text-gray-500">Commission</div>
                  <div className="text-right font-medium">৳{totalCommission.toFixed(2)}</div>

                  <div className="text-gray-500">Previous Due</div>
                  <div className="text-right font-medium text-amber-600">
                    ৳{previousDue.toFixed(2)}
                  </div>

                  <div className="text-gray-700 font-semibold border-t border-gray-200 pt-2">
                    Total Payable
                  </div>
                  <div className="text-right font-bold text-gray-800 border-t border-gray-200 pt-2">
                    ৳{totalPayable.toFixed(2)}
                  </div>

                  <div className="text-gray-700 font-semibold">Due</div>
                  <div
                    className={`text-right font-bold ${
                      dueAmount === 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ৳{dueAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Notes (optional) --- */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Order Notes (optional)
              </label>
              <textarea
                rows={2}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                placeholder="Any special instructions..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>

            {/* --- Submit --- */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitSuccess}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-2 shadow-md ${
                isSubmitting || submitSuccess
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span> Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5" /> Submitted
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" /> Submit Order
                </>
              )}
            </button>

            {submitError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-start gap-2 border border-red-200">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
              <Calculator className="h-3 w-3" />
              Auto due calculated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}