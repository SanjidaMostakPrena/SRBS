
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Separate component that uses useSearchParams
function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill from URL query params (if present)
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const passwordParam = searchParams.get('password');
    if (emailParam) setEmail(decodeURIComponent(emailParam));
    if (passwordParam) setPassword(decodeURIComponent(passwordParam));
  }, [searchParams]);

  // Validate email format
  const validateEmail = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate password: at least one uppercase and one number
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[0-9]/.test(value)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Re-validate both fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('userRole', 'admin');
      router.push('/admin/dashboard');
    } catch (err) {
      setEmailError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Determine if form is valid
  const isFormValid =
    !!email.trim() &&
    !!password &&
    !emailError &&
    !passwordError &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
          {/* Logo - SRBS Branding using an image */}
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
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-6 sm:mb-7 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Admin Login
            </h2>
            <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-sm">
              Sign in to manage the platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`w-full pl-8 sm:pl-9 md:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border ${
                      emailError ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                    placeholder="admin@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={loading}
                  />
                </div>
                {emailError && (
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600">{emailError}</p>
                )}
                {!emailError && email.trim().length > 0 && (
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500">Enter a valid email address</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`w-full pl-8 sm:pl-9 md:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border ${
                      passwordError ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl text-gray-900 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Must contain uppercase & number"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                  />
                </div>
                {passwordError && (
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600">{passwordError}</p>
                )}
                {!passwordError && password.length > 0 && (
                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500">
                    Must have at least 1 uppercase letter and 1 number
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in as Admin
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

            <div className="text-xs sm:text-sm text-center mt-3 sm:mt-4">
              <Link href="/login" className="text-purple-600 hover:text-purple-500 font-medium">
                ← Login as Seller
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image - Full show on all screens */}
      <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 z-10" />
        <Image
          src="/image.png"
          alt="Paint and construction"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

// Loading fallback component
function LoginFormFallback() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md">
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
                  Admin Panel
                </span>
              </div>
            </div>
          </div>
          <div className="mb-6 sm:mb-7 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Admin Login
            </h2>
            <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-sm">
              Loading...
            </p>
          </div>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 sm:h-14 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-screen relative overflow-hidden bg-gray-200 animate-pulse" />
    </div>
  );
}

// Main page component with Suspense
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}