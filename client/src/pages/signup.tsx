/* eslint-disable no-useless-escape */
import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  MapPin,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Link, Navigate } from "react-router-dom";

interface Address {
  area: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  gender: "male" | "female";
  age: number;
  phone?: string;
  address: Address;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  profileImage?: string;
  gender?: string;
  age?: string;
  phone?: string;
  address?: {
    area?: string;
    state?: string;
    street?: string;
    zipCode?: string;
  };
}

const egyptianStates = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Fayyum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr el-Sheikh",
  "Luxor",
  "Matruh",
  "Minya",
  "Monufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sharqia",
  "Sohag",
  "South Sinai",
  "Suez",
];

const areasByState: Record<string, string[]> = {
  Alexandria: [
    "EL Mandara",
    "Montaza",
    "Raml Station",
    "Sidi Gaber",
    "Sporting",
    "Stanley",
  ],
  Cairo: [
    "Nasr City",
    "Heliopolis",
    "Maadi",
    "Zamalek",
    "Downtown",
    "New Cairo",
  ],
  Giza: ["Dokki", "Mohandessin", "Agouza", "6th of October", "Sheikh Zayed"],
};

export default function SignupPage() {
  const { register, loading, isAuthenticated, isAdmin } = useAuth();

  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    gender: "male",
    age: 0,
    phone: "",
    address: {
      area: "",
      state: "",
      street: "",
      zipCode: "",
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.profileImage.trim()) {
      newErrors.profileImage = "Profile image URL is required";
    } else {
      try {
        new URL(formData.profileImage);
      } catch {
        newErrors.profileImage = "Please enter a valid URL";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.age || formData.age < 1) {
      newErrors.age = "Please enter a valid age";
    } else if (formData.age < 13) {
      newErrors.age = "You must be at least 13 years old";
    } else if (formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }

    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    newErrors.address = {};
    if (!formData.address.state) {
      newErrors.address.state = "State is required";
    }
    if (!formData.address.area) {
      newErrors.address.area = "Area is required";
    }
    if (!formData.address.street.trim()) {
      newErrors.address.street = "Street address is required";
    }
    if (!formData.address.zipCode.trim()) {
      newErrors.address.zipCode = "ZIP code is required";
    } else if (!/^\d{5}$/.test(formData.address.zipCode)) {
      newErrors.address.zipCode = "ZIP code must be 5 digits";
    }

    if (Object.keys(newErrors.address).length === 0) {
      delete newErrors.address;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/dashboard/insights" : "/events"} />;
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const result = await register(formData);
      return <Navigate to={`${result?.redirect as string}`} />;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const updateField = (
    field: keyof SignupData,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
    setErrors((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: undefined },
    }));
  };

  const availableAreas = formData.address.state
    ? areasByState[formData.address.state] || []
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join EventX</h1>
          <p className="text-xl text-gray-600">
            Create your account and start organizing amazing events
          </p>
        </div>

        {/* Multi-Column Form Layout */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Basic Info */}
            <div className="p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 border-r border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-violet-600" />
                Personal Information
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                        errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) =>
                      updateField("profileImage", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.profileImage
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.profileImage && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.profileImage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Column - Demographics & Contact */}
            <div className="p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 border-r border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-purple-600" />
                Details & Contact
              </h2>

              <div className="space-y-6">
                {/* Gender & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => updateField("gender", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.gender
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age || ""}
                      onChange={(e) => updateField("age", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.age
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Age"
                      min="1"
                      max="120"
                    />
                    {errors.age && (
                      <p className="mt-2 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number{" "}
                    <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="+20 123 456 7890"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Address Title */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                    Address Information
                  </h3>
                </div>

                {/* State & Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      value={formData.address.state}
                      onChange={(e) => {
                        updateAddress("state", e.target.value);
                        updateAddress("area", "");
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.address?.state
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select state</option>
                      {egyptianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.address?.state && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.address.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area
                    </label>
                    <select
                      value={formData.address.area}
                      onChange={(e) => updateAddress("area", e.target.value)}
                      disabled={!formData.address.state}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 ${
                        errors.address?.area
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select area</option>
                      {availableAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.address?.area && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.address.area}
                      </p>
                    )}
                  </div>
                </div>

                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => updateAddress("street", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.address?.street
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="23 st, building 98034"
                  />
                  {errors.address?.street && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address.street}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => updateAddress("zipCode", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.address?.zipCode
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="21520"
                    maxLength={5}
                  />
                  {errors.address?.zipCode && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.address.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Terms & Submit */}
            <div className="p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-violet-600" />
                Final Step
              </h2>

              <div className="space-y-8">
                {/* Benefits Section */}
                <div className="bg-white p-6 rounded-xl border border-violet-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    What you'll get:
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      Create unlimited events
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      Advanced analytics & insights
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      Priority customer support
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      Access to premium features
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating Your Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <UserPlus className="w-6 h-6 mr-3" />
                      Create My Account
                    </span>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-green-200">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-violet-600 hover:text-purple-500 underline font-semibold"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
