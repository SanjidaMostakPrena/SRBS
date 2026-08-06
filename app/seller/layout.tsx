

"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, Package, Users, ShoppingCart, 
  Settings, LogOut, Bell, User, Search, ChevronDown,
  DollarSign, PanelLeftClose, PanelLeftOpen, X
} from "lucide-react";

export default function SellerDashboardLayout({
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

  const isLoginPage = pathname === "/login" || pathname === "/";

  // Responsive check
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

  // Auth check – except on login page
  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true); // allow login page without check
      return;
    }
    const auth = localStorage.getItem('sellerAuth');
    if (!auth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router, isLoginPage]);

  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/seller/dashboard" },
    { icon: ShoppingCart, label: "New Order", href: "/seller/NewOrders" },
    { icon: Package, label: "Order History", href: "/seller/history" },
    { icon: Users, label: "My Customers", href: "/seller/customer" },
    { icon: Users, label: "My Dealer", href: "/seller/dealer" },
    { icon: Package, label: "Stock", href: "/seller/stock" },
    { icon: DollarSign, label: "Payment Collection", href: "/seller/payment" },
    { icon: Settings, label: "Profile", href: "/seller/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sellerAuth");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed */}
      <aside 
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed top-0 left-0 h-full
          w-64 sm:w-72 lg:w-80
          bg-gradient-to-b from-indigo-900 to-indigo-800 
          text-white flex flex-col transition-transform duration-300 ease-in-out
          z-30 flex-shrink-0
        `}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-indigo-700/50 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/image/image.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight block truncate">SRBS</span>
              <p className="text-[10px] sm:text-xs text-indigo-300 truncate">Seller Panel</p>
            </div>
          </div>
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-lg hover:bg-indigo-700/50 transition-colors flex-shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 sm:py-4 px-2 sm:px-3">
          <ul className="space-y-1 sm:space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-sm
                      ${isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-indigo-700/50 p-3 sm:p-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 w-full rounded-xl text-indigo-100 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 cursor-pointer text-xs sm:text-sm"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={toggleSidebar} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header 
          className={`
            fixed top-0 right-0 h-14 sm:h-16
            bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3
            flex items-center justify-between z-10
            transition-all duration-300 ease-in-out
            ${isSidebarOpen && !isMobile ? 'left-64 sm:left-72 lg:left-80' : 'left-0'}
          `}
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <button
              onClick={toggleSidebar}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors group relative flex-shrink-0"
            >
              {isSidebarOpen ? (
                <PanelLeftClose size={20} className="sm:w-6 sm:h-6 text-gray-700 group-hover:text-indigo-600" />
              ) : (
                <PanelLeftOpen size={20} className="sm:w-6 sm:h-6 text-gray-700 group-hover:text-indigo-600" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Add any header items here */}
          </div>
        </header>

        <main 
          className={`
            flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50 
            mt-14 sm:mt-16 transition-all duration-300 ease-in-out
            ${isSidebarOpen && !isMobile ? 'ml-64 sm:ml-72 lg:ml-80' : 'ml-0'}
          `}
        >
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}