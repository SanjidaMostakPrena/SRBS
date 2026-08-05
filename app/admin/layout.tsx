
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronDown,
  DollarSign,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart3,
  Store,
  Tag,
  Boxes,
  Warehouse,
  ChartColumn,
  Coins,
  Truck,
  FileText,
  HandCoins,
  UserCog,
  ShoppingBag,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check admin authentication
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  // ✅ Full menu items with all requested features
  const menuItems = [
    // Dashboard
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },

    // Management Sections
    { icon: Store, label: "Seller Management", href: "/admin/sellers" },
    { icon: UserCog, label: "Dealer Management", href: "/admin/dealers" },
    { icon: Users, label: "Area Management", href: "/admin/area" },
    { icon: ShoppingCart, label: "Order Management", href: "/admin/orders" },
    { icon: Package, label: "Product Management", href: "/admin/products" },
    { icon: Tag, label: "Category Management", href: "/admin/categories" },
    { icon: Boxes, label: "Stock", href: "/admin/stock" },
    { icon: HandCoins, label: "Payment Management", href: "/admin/payments" },

    // Reports & Settings
    { icon: FileText, label: "Reports (Daily/Monthly/Yearly)", href: "/admin/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("userRole");
    router.push("/admin");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - fixed on all screens */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-gradient-to-b from-purple-900 to-purple-800 
          text-white flex flex-col transition-transform duration-300 ease-in-out
          z-30
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/image/image.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">Admin</span>
          </div>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-purple-700/50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm
                      ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-purple-100 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-purple-700/50 p-4">
       <button
  onClick={handleLogout}
  className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-indigo-100 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 cursor-pointer"
>
  <LogOut size={20} />
  <span className="text-sm font-medium">Logout</span>
</button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={toggleSidebar} />
      )}

      {/* Main content - margin-left changes based on sidebar state */}
      <div
        className={`
          flex-1 flex flex-col overflow-hidden transition-all duration-300
          ${isSidebarOpen && !isMobile ? "ml-64" : "ml-0"}
        `}
      >
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? (
                <PanelLeftClose size={24} className="text-gray-700" />
              ) : (
                <PanelLeftOpen size={24} className="text-gray-700" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="  w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}