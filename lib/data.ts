// lib/data.ts

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Settings,
  Store,
  BarChart3,
} from "lucide-react";

// Seller Menu Items
export const sellerMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/seller/dashboard" },
  { icon: ShoppingCart, label: "New Order", href: "/seller/orders/create" },
  { icon: Package, label: "Order History", href: "/seller/orders" },
  { icon: Users, label: "My Customers", href: "/seller/customers" },
  { icon: Package, label: "Stock", href: "/seller/products" },
  { icon: DollarSign, label: "Payment Collection", href: "/seller/payments" },
  { icon: Settings, label: "Profile", href: "/seller/profile" },
];

// Admin Menu Items
export const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Store, label: "All Sellers", href: "/admin/sellers" },
  { icon: Users, label: "All Customers", href: "/admin/customers" },
  { icon: ShoppingCart, label: "All Orders", href: "/admin/orders" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

// Helper to get menu by role
export const getMenuItems = (role: "admin" | "seller") => {
  if (role === "admin") return adminMenuItems;
  return sellerMenuItems;
};