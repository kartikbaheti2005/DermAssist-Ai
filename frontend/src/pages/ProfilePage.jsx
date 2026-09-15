// ProfilePage.jsx
// NOTE:
// I cannot faithfully generate the complete implementation from the uploaded
// project because the backend/frontend source needed to reuse existing project
// components and APIs is incomplete in the execution environment.
//
// This placeholder file is generated so it can be downloaded. Once the full
// source is available, it can be replaced with the project-specific
// implementation.
// ======================================================
// Profile Page
// ======================================================

import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Activity,
  Shield,
  Droplets,
  Save,
  X,
  Loader2,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

import {
  getCurrentProfile,
  updateProfile,
} from "../api/userApi";

// ======================================================
// Component
// ======================================================

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  // ====================================================
  // State
  // ====================================================

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    bio: "",
    profile_picture: "",
    height_cm: "",
    weight_kg: "",
    blood_group: "",
    medical_history: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ====================================================
  // Load Profile
  // ====================================================

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCurrentProfile();

      setProfile(data);

      setFormData({
        full_name: data.full_name || "",
        phone_number: data.phone_number || "",
        gender: data.gender || "",
        date_of_birth: data.date_of_birth || "",
        bio: data.bio || "",
        profile_picture: data.profile_picture || "",
        height_cm: data.height_cm || "",
        weight_kg: data.weight_kg || "",
        blood_group: data.blood_group || "",
        medical_history: data.medical_history || "",
        allergies: data.allergies || "",
      });
    } catch (err) {
      let message = "Unable to update profile.";
        
      if (Array.isArray(err?.response?.data?.detail)) {
        message =
          err.response.data.detail[0]?.msg || message;
      } else if (
        typeof err?.response?.data?.detail === "string"
      ) {
        message = err.response.data.detail;
      }
    
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  // ====================================================
  // Handle Input
  // ====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const normalizePayload = (data) => ({
      ...data,

      full_name: data.full_name || null,
      phone_number: data.phone_number || null,
      gender: data.gender || null,
      date_of_birth: data.date_of_birth || null,
      bio: data.bio || null,
      profile_picture: data.profile_picture || null,
      blood_group: data.blood_group || null,
      medical_history: data.medical_history || null,
      allergies: data.allergies || null,

      height_cm:
        data.height_cm === ""
          ? null
          : Number(data.height_cm),

      weight_kg:
        data.weight_kg === ""
          ? null
          : Number(data.weight_kg),
    });
  // ====================================================
  // Save Profile
  // ====================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
      ...formData,

      date_of_birth:
        formData.date_of_birth || null,

      height_cm:
        formData.height_cm === ""
          ? null
          : Number(formData.height_cm),

      weight_kg:
        formData.weight_kg === ""
          ? null
          : Number(formData.weight_kg),
    };
    
    console.log("Payload being sent:", payload);
    const updatedUser = await updateProfile(payload);

      setProfile(updatedUser);

      if (setUser) {
        setUser(updatedUser);
      }

      setSuccess(
        "Profile updated successfully."
      );
    }catch (err) {
      let message = "Unable to update profile.";

      if (Array.isArray(err?.response?.data?.detail)) {
        message =
          err.response.data.detail[0]?.msg || message;
      } else if (
        typeof err?.response?.data?.detail === "string"
      ) {
        message = err.response.data.detail;
      }

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ====================================================
  // Cancel Changes
  // ====================================================

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      full_name: profile.full_name || "",
      phone_number: profile.phone_number || "",
      gender: profile.gender || "",
      date_of_birth: profile.date_of_birth || "",
      bio: profile.bio || "",
      profile_picture:
        profile.profile_picture || "",
      height_cm: profile.height_cm || "",
      weight_kg: profile.weight_kg || "",
      blood_group: profile.blood_group || "",
      medical_history:
        profile.medical_history || "",
      allergies: profile.allergies || "",
    });

    setError("");
    setSuccess("");
  };

  // ====================================================
  // Loading
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2
          size={40}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information,
          health details, and account
          preferences.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Success */}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* Remaining UI continues in Part 2 */}

            {/* ====================================================== */}
      {/* Profile Header */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          {/* Avatar */}

          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-blue-100 bg-slate-100">

            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt={profile.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User
                size={60}
                className="text-slate-400"
              />
            )}

          </div>

          {/* User Information */}

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-slate-800">
              {profile?.full_name}
            </h2>

            <p className="mt-2 text-slate-500">
              @{profile?.username}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                {profile?.role}
              </span>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  profile?.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile?.is_active
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Account Information */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Account Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <User size={16} />
              Username
            </label>

            <input
              value={profile?.username || ""}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Mail size={16} />
              Email
            </label>

            <input
              value={profile?.email || ""}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 text-sm font-medium text-slate-700">
              Role
            </label>

            <input
              value={profile?.role || ""}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Shield size={16} />
              Account Status
            </label>

            <input
              value={
                profile?.is_active
                  ? "Active"
                  : "Inactive"
              }
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Personal Information */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Personal Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <User size={16} />
              Full Name
            </label>

            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Phone size={16} />
              Phone Number
            </label>

            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-2 text-sm font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Calendar size={16} />
              Date of Birth
            </label>

            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Health Information */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-800">
          <Heart size={22} />
          Health Information
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Activity size={16} />
              Height (cm)
            </label>

            <input
              type="number"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Activity size={16} />
              Weight (kg)
            </label>

            <input
              type="number"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Droplets size={16} />
              Blood Group
            </label>

            <input
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

          </div>

        </div>

      </div>

            {/* ====================================================== */}
      {/* Medical Information */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Medical Information
        </h3>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Allergies
            </label>

            <textarea
              name="allergies"
              rows={3}
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Enter known allergies..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Medical History
            </label>

            <textarea
              name="medical_history"
              rows={5}
              value={formData.medical_history}
              onChange={handleChange}
              placeholder="Enter previous medical history..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* About */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          About
        </h3>

        <textarea
          name="bio"
          rows={5}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:border-blue-500 focus:outline-none"
        />

      </div>

      {/* ====================================================== */}
      {/* Profile Picture */}
      {/* ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Profile Picture
        </h3>

        <input
          type="text"
          name="profile_picture"
          value={formData.profile_picture}
          onChange={handleChange}
          placeholder="Profile image URL"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <p className="mt-2 text-sm text-slate-500">
          Avatar upload will be supported once the backend image upload endpoint
          is implemented.
        </p>

      </div>

      {/* ====================================================== */}
      {/* Action Buttons */}
      {/* ====================================================== */}

      <div className="sticky bottom-6 z-20">

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:flex-row md:justify-end">

          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;