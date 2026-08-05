
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Separate component that uses useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill from URL query params (if present)
  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    const passwordParam = searchParams.get('password');
    if (phoneParam) setPhone(decodeURIComponent(phoneParam));
    if (passwordParam) setPassword(decodeURIComponent(passwordParam));
  }, [searchParams]);

  // Validate phone: only check if empty (filtering ensures digits only)
  const validatePhone = (value: string) => {
    if (!value.trim()) {
      setPhoneError('Phone number is required');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  // Validate password: only check if empty (filtering ensures digits only)
  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setPasswordError('Password is required');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Handle phone change – allow only digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, '');
    setPhone(digitsOnly);
    validatePhone(digitsOnly);
  };

  // Handle password change – allow only digits
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, '');
    setPassword(digitsOnly);
    validatePassword(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Re-validate both fields
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    if (!isPhoneValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      // ✅ Accept any valid credentials – no hardcoded check
      localStorage.setItem('sellerAuth', 'true');
      localStorage.setItem('userRole', 'seller');
      router.push('/seller/dashboard');
    } catch (err) {
      setPhoneError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Determine if form is valid for enabling the submit button
  const isFormValid = !!phone.trim() && !!password.trim() && !phoneError && !passwordError;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          {/* Logo - SRBS Branding using an image */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/image/image.png"      // place your square logo icon here
                  alt="SRBS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900">SRBS</span>
                <span className="block text-xs text-gray-500 font-medium tracking-wider uppercase">
                  Admixture &amp; Paint
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Sign in to manage your paint and admixture solutions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Phone Field - only digits */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Phone Number (only digits)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                      phoneError ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm`}
                    placeholder="Enter numeric phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={loading}
                  />
                </div>
                {phoneError && (
                  <p className="mt-1.5 text-sm text-red-600">{phoneError}</p>
                )}
                {!phoneError && phone.length > 0 && (
                  <p className="mt-1.5 text-sm text-gray-500">
                    Only digits allowed
                  </p>
                )}
              </div>

              {/* Password Field - only digits */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password (only digits)
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                      passwordError ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 sm:text-sm`}
                    placeholder="Enter numeric password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                  />
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-sm text-red-600">{passwordError}</p>
                )}
                {!passwordError && password.length > 0 && (
                  <p className="mt-1.5 text-sm text-gray-500">
                    Only digits allowed
                  </p>
                )}
              </div>
            </div>

            {/* General error (fallback) */}
            {phoneError === 'An error occurred. Please try again.' && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{phoneError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Sign in
                  <svg
                    className="h-4 w-4"
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
      <div className="hidden lg:block w-[50%] min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-amber-900/30 z-10" />
        <Image
          src="/image.png"          // your background image
          alt="Paint and construction"
          fill
          className="object-cover"
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
    <div className="min-h-screen flex bg-white">
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/image/image.png"
                  alt="SRBS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900">SRBS</span>
                <span className="block text-xs text-gray-500 font-medium tracking-wider uppercase">
                  Admixture &amp; Paint
                </span>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Loading...
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div>
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[50%] min-h-screen relative overflow-hidden bg-gray-200 animate-pulse" />
    </div>
  );
}

// Main page component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}