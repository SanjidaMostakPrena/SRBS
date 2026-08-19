// "use client"

// import React, { useState } from "react"
// import {
//   Store,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   CheckCircle,
//   Loader2,
//   Shield,
//   Building2,
// } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function DealerLoginPage() {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState(false)

//   // Form data
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   })

//   // Mock dealer credentials for demo
//   const DEALER_CREDENTIALS = {
//     email: "dealer@srbs.com",
//     password: "1234",
//   }

//   // ---------- Handlers ----------
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//     setError(null)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!formData.email.trim()) {
//       setError("Email is required")
//       return
//     }
//     if (!formData.password.trim()) {
//       setError("Password is required")
//       return
//     }
//     if (formData.password.length < 4) {
//       setError("Password must be at least 4 characters")
//       return
//     }

//     setIsLoading(true)
//     setError(null)

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500))
      
//       if (formData.email === DEALER_CREDENTIALS.email && 
//           formData.password === DEALER_CREDENTIALS.password) {
//         localStorage.setItem("dealerAuth", "true")
//         localStorage.setItem("dealerId", "d1")
//         localStorage.setItem("dealerEmail", formData.email)
//         localStorage.setItem("dealerName", "Mumbai Hardware Stores")
        
//         setSuccess(true)
//         setTimeout(() => {
//           router.push("/dealer/order")
//         }, 1000)
//       } else {
//         setError("Invalid email or password. Please try again.")
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
//       <div className="absolute top-20 left-10 animate-bounce opacity-20">
//         <Building2 className="h-16 w-16 text-blue-600" />
//       </div>
//       <div className="absolute bottom-20 right-10 animate-bounce delay-100 opacity-20">
//         <Store className="h-20 w-20 text-indigo-600" />
//       </div>
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl" />

//       <div className="relative z-10 w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg mb-4">
//             <Store className="h-10 w-10 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
//             Dealer Portal
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Sign in to manage your business
//           </p>
//         </div>

//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8">
//           <div className="mb-4 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
//             <AlertCircle className="h-5 w-5 flex-shrink-0" />
//             <div>
//               <p className="font-medium">Demo Credentials</p>
//               <p className="text-xs mt-0.5">Email: dealer@srbs.com • Password: 1234</p>
//             </div>
//           </div>

//           {success && (
//             <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 animate-fadeIn">
//               <CheckCircle className="h-5 w-5 flex-shrink-0" />
//               <span>Login successful! Redirecting to dashboard...</span>
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 animate-fadeIn">
//               <AlertCircle className="h-5 w-5 flex-shrink-0" />
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <Mail className="h-5 w-5" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="dealer@srbs.com"
//                   className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   disabled={isLoading || success}
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-1.5">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <Link
//                   href="/dealer/forgot-password"
//                   className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <Lock className="h-5 w-5" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-12 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   disabled={isLoading || success}
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
//                   disabled={isLoading || success}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   disabled={isLoading || success}
//                 />
//                 Remember me
//               </label>
//               <span className="text-xs text-gray-400 flex items-center gap-1">
//                 <Shield className="h-3 w-3" />
//                 Secure Login
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading || success}
//               className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 <>
//                   <Lock className="h-5 w-5" />
//                   Sign In
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200" />
//             </div>
//             <div className="relative flex justify-center text-xs">
//               <span className="px-3 bg-white/80 text-gray-500">New to the portal?</span>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link
//                 href="/dealer/register"
//                 className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
//               >
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-xs text-gray-400">
//             © {new Date().getFullYear()} SRBS. All rights reserved.
//           </p>
//           <div className="flex items-center justify-center gap-4 mt-2">
//             <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
//               Home
//             </Link>
//             <span className="text-gray-300">|</span>
//             <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition">
//               Privacy Policy
//             </Link>
//             <span className="text-gray-300">|</span>
//             <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-bounce { animation: bounce 3s ease-in-out infinite; }
//         .delay-100 { animation-delay: 1s; }
//       `}</style>
//     </div>
//   )
// }
"use client"

import React, { useState } from "react"
import {
  Store,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DealerLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    phone: "",
    pin: "",
    rememberMe: false,
  })

  // ---------- Handlers ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    
    // Allow only digits for phone and pin
    if (name === "phone" || name === "pin") {
      const digitsOnly = value.replace(/\D/g, "")
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return
    }
    if (formData.phone.length < 10) {
      setError("Phone number must be at least 10 digits")
      return
    }
    if (!formData.pin.trim()) {
      setError("PIN is required")
      return
    }
    if (formData.pin.length < 4) {
      setError("PIN must be at least 4 digits")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // ✅ Accept any phone number and PIN (minimum 4 digits)
      // Store the phone number as the dealer identifier
      localStorage.setItem("dealerAuth", "true")
      localStorage.setItem("dealerId", `d${Date.now()}`)
      localStorage.setItem("dealerPhone", formData.phone)
      localStorage.setItem("dealerName", `Dealer ${formData.phone.slice(-4)}`)
      
      setSuccess(true)
      setTimeout(() => {
        router.push("/dealer/order")
      }, 1000)
      
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
          {/* Logo - SRBS Branding */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 flex-shrink-0">
                <Image
                  src="/image/image.png"
                  alt="SRBS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-gray-900">SRBS</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 font-medium tracking-wider uppercase">
                  Admixture &amp; Paint
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Text with Larger Title */}
          <div className="mb-6 sm:mb-7 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Dealer Portal
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-500 text-sm sm:text-base">
              Sign in to manage your paint and admixture solutions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 animate-fadeIn">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>Login successful! Redirecting to dashboard...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 animate-fadeIn">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Phone Field - Only digits */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                Phone Number (only digits)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-8 sm:pl-9 md:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading || success}
                  autoComplete="tel"
                  maxLength={15}
                />
              </div>
              {formData.phone.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">Only digits allowed</p>
              )}
            </div>

            {/* PIN Field - Only digits */}
            <div>
              <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                  PIN (only digits)
                </label>
                <Link
                  href="/dealer/forgot-pin"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot PIN?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter your PIN"
                  className="w-full pl-8 sm:pl-9 md:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading || success}
                  autoComplete="current-password"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                  disabled={isLoading || success}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {formData.pin.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">Only digits allowed</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={isLoading || success}
                />
                Remember me
              </label>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Secure Login
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.phone || !formData.pin || isLoading || success}
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            
          </form>

         
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 z-10" />
        <Image
          src="/image.png"
          alt="Paint and construction"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}