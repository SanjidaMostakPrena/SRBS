// "use client";

// import React, { useState } from "react";
// import {
//   Building2,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Briefcase,
//   Edit,
//   Save,
//   X,
//   CheckCircle,
//   AlertCircle,
//   ShoppingBag,
//   TrendingUp,
//   Wallet,
//   Clock,
//   Loader2,
//   Camera,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   avatar: string;
//   joinDate: string;
//   stats: {
//     totalOrders: number;
//     totalSales: number;
//     totalCollection: number;
//     totalDue: number;
//   };
// }

// // ============================================================
// // MOCK DATA – Replace with API calls
// // ============================================================
// const MOCK_PROFILE: UserProfile = {
//   id: "usr_001",
//   name: "Rajesh Kumar",
//   email: "rajesh.kumar@srbs.com",
//   phone: "+91 98765 43210",
//   role: "Senior Seller",
//   address: "123, BKC Complex",
//   city: "Mumbai",
//   state: "Maharashtra",
//   pincode: "400051",
//   avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=120&background=1a56db&color=fff&bold=true",
//   joinDate: "2023-01-15",
//   stats: {
//     totalOrders: 156,
//     totalSales: 245000,
//     totalCollection: 187500,
//     totalDue: 57500,
//   },
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function ProfilePage() {
//   // ---------- State ----------
//   const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Edit modal state
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);

//   // ---------- Handlers ----------
//   const handleEditClick = () => {
//     setEditForm({
//       name: profile.name,
//       email: profile.email,
//       phone: profile.phone,
//       address: profile.address,
//       city: profile.city,
//       state: profile.state,
//       pincode: profile.pincode,
//     });
//     setShowEditModal(true);
//     setSubmitError(null);
//     setSubmitSuccess(false);
//   };

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitError(null);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Update profile
//     setProfile((prev) => ({
//       ...prev,
//       ...editForm,
//     }));

//     setIsSubmitting(false);
//     setSubmitSuccess(true);
//     setTimeout(() => {
//       setShowEditModal(false);
//       setSubmitSuccess(false);
//     }, 1500);
//   };

//   // ---------- Loading / Error ----------
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//         <div className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-xl">
//           <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-red-700">Error</h2>
//           <p className="text-red-600 mt-2">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40">
//           <div className="flex items-center gap-4">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-2xl shadow-lg">
//               <User className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
//                 My Profile
//               </h1>
//               <p className="text-gray-600">View and manage your personal information</p>
//             </div>
//           </div>
//           <button
//             onClick={handleEditClick}
//             className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition"
//           >
//             <Edit className="h-5 w-5" />
//             Edit Profile
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
//           <div className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 <img
//                   src={profile.avatar}
//                   alt={profile.name}
//                   className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
//                 />
//                 <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-blue-700 transition">
//                   <Camera className="h-4 w-4" />
//                 </button>
//               </div>

//               {/* Basic Info */}
//               <div className="flex-1">
//                 <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
//                 <div className="flex flex-wrap items-center gap-4 mt-1">
//                   <span className="flex items-center gap-1 text-sm text-gray-600">
//                     <Briefcase className="h-4 w-4" />
//                     {profile.role}
//                   </span>
//                   <span className="text-gray-300">|</span>
//                   <span className="flex items-center gap-1 text-sm text-gray-600">
//                     <Clock className="h-4 w-4" />
//                     Joined {new Date(profile.joinDate).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-4 mt-3 text-sm">
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Mail className="h-4 w-4" />
//                     {profile.email}
//                   </span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Phone className="h-4 w-4" />
//                     {profile.phone}
//                   </span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <MapPin className="h-4 w-4" />
//                     {profile.city}, {profile.state}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200/50">
//               <div className="text-center">
//                 <p className="text-sm text-gray-500">Total Orders</p>
//                 <p className="text-2xl font-bold text-blue-700">{profile.stats.totalOrders}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-500">Total Sales</p>
//                 <p className="text-2xl font-bold text-green-700">৳{profile.stats.totalSales.toFixed(2)}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-500">Total Collection</p>
//                 <p className="text-2xl font-bold text-purple-700">৳{profile.stats.totalCollection.toFixed(2)}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-500">Total Due</p>
//                 <p className="text-2xl font-bold text-amber-700">৳{profile.stats.totalDue.toFixed(2)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info (optional) */}
//         <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-500">Address</p>
//               <p className="font-medium text-gray-700">{profile.address}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">City</p>
//               <p className="font-medium text-gray-700">{profile.city}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">State</p>
//               <p className="font-medium text-gray-700">{profile.state}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Pincode</p>
//               <p className="font-medium text-gray-700">{profile.pincode}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fadeIn border border-white/50">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <Edit className="h-6 w-6 text-blue-600" />
//                 Edit Profile
//               </h2>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <form onSubmit={handleEditSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editForm.name || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={editForm.email || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={editForm.phone || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={editForm.address || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={editForm.city || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={editForm.state || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={editForm.pincode || ""}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
//                   />
//                 </div>
//               </div>

//               {submitError && (
//                 <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-200">
//                   <AlertCircle className="h-4 w-4" />
//                   {submitError}
//                 </div>
//               )}
//               {submitSuccess && (
//                 <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2 border border-green-200">
//                   <CheckCircle className="h-4 w-4" />
//                   Profile updated successfully!
//                 </div>
//               )}

//               <div className="flex gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || submitSuccess}
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5" />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Animation keyframes */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Clock,
  Loader2,
  Camera,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  avatar: string;
  joinDate: string;
  stats: {
    totalOrders: number;
    totalSales: number;
    totalCollection: number;
    totalDue: number;
  };
}

// ============================================================
// MOCK DATA – Replace with API calls
// ============================================================
const MOCK_PROFILE: UserProfile = {
  id: "usr_001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@srbs.com",
  phone: "+91 98765 43210",
  role: "Senior Seller",
  address: "123, BKC Complex",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400051",
  avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=120&background=1a56db&color=fff&bold=true",
  joinDate: "2023-01-15",
  stats: {
    totalOrders: 156,
    totalSales: 245000,
    totalCollection: 187500,
    totalDue: 57500,
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ProfilePage() {
  // ---------- State ----------
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ---------- Handlers ----------
  const handleEditClick = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      pincode: profile.pincode,
    });
    setShowEditModal(true);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update profile
    setProfile((prev) => ({
      ...prev,
      ...editForm,
    }));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowEditModal(false);
      setSubmitSuccess(false);
    }, 1500);
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
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
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-bl from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl border border-white/40">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <User className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent truncate">
                My Profile
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">View and manage your personal information</p>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition text-sm sm:text-base flex-shrink-0"
          >
            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Edit Profile</span>
            <span className="xs:inline sm:hidden">Edit</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 md:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 sm:p-1.5 rounded-full border-2 border-white hover:bg-blue-700 transition">
                  <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{profile.name}</h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 mt-0.5 sm:mt-1">
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    {profile.role}
                  </span>
                  <span className="text-gray-300 hidden xs:inline">|</span>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm">
                  <span className="flex items-center gap-1 text-gray-600 truncate max-w-[120px] sm:max-w-none">
                    <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                    {profile.phone}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 hidden sm:flex">
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                    {profile.city}, {profile.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6 lg:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200/50">
              <div className="text-center p-2 sm:p-3 bg-white/40 rounded-xl">
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">Total Orders</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-700">{profile.stats.totalOrders}</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/40 rounded-xl">
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">Total Sales</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-green-700">৳{profile.stats.totalSales.toFixed(2)}</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/40 rounded-xl">
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">Total Collection</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-purple-700">৳{profile.stats.totalCollection.toFixed(2)}</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white/40 rounded-xl">
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">Total Due</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-amber-700">৳{profile.stats.totalDue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg border border-white/50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Address Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="p-2 sm:p-3 bg-white/40 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500">Address</p>
              <p className="font-medium text-gray-700 break-words">{profile.address}</p>
            </div>
            <div className="p-2 sm:p-3 bg-white/40 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500">City</p>
              <p className="font-medium text-gray-700">{profile.city}</p>
            </div>
            <div className="p-2 sm:p-3 bg-white/40 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500">State</p>
              <p className="font-medium text-gray-700">{profile.state}</p>
            </div>
            <div className="p-2 sm:p-3 bg-white/40 rounded-xl">
              <p className="text-[10px] sm:text-xs text-gray-500">Pincode</p>
              <p className="font-medium text-gray-700">{profile.pincode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-5 md:p-6 animate-fadeIn border border-white/50">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Edit className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Edit Profile
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editForm.city || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={editForm.state || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={editForm.pincode || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-red-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}
              {submitSuccess && (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-green-200">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
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
        @media (max-width: 400px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
        @media (min-width: 401px) {
          .xs\\:inline { display: none; }
          .xs\\:hidden { display: inline; }
        }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
        }
      `}</style>
    </div>
  );
}