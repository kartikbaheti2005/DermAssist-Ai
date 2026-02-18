import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Contains a number', pass: /\d/.test(password) },
    { label: 'Contains uppercase', pass: /[A-Z]/.test(password) },
  ]
  const score = checks.filter(c => c.pass).length
  const colors = ['bg-red-400', 'bg-amber-400', 'bg-emerald-500']

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <div className="space-y-1">
        {checks.map((c, i) => (
          <div key={i} className={`flex items-center gap-1.5 text-xs ${c.pass ? 'text-emerald-600' : 'text-gray-400'}`}>
            <CheckCircle className={`w-3 h-3 ${c.pass ? 'text-emerald-500' : 'text-gray-300'}`} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    full_name: '', username: '', email: '',
    password: '', confirm_password: '',
    phone_number: '', gender: '', date_of_birth: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const validate = () => {
    if (!form.full_name.trim()) return 'Full name is required.'
    if (!form.username.trim()) return 'Username is required.'
    if (form.username.length < 3) return 'Username must be at least 3 characters.'
    if (!form.email.includes('@')) return 'Please enter a valid email address.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    if (form.password !== form.confirm_password) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)
    setError('')

    try {
      await register({
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number || null,
        gender: form.gender || null,
        date_of_birth: form.date_of_birth || null,
      })
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold">D</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-2">Join DermAssist AI — free skin screening, anytime</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-blue-50 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text" name="full_name" value={form.full_name} onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Username + Email row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username <span className="text-red-400">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">@</span>
                  <input
                    type="text" name="username" value={form.username} onChange={handleChange}
                    placeholder="janesmith"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender" value={form.gender} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select...</option>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-400">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
              />
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel" name="phone_number" value={form.phone_number} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'} name="confirm_password"
                  value={form.confirm_password} onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-400
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                              ${form.confirm_password && form.password !== form.confirm_password
                                ? 'border-red-300 bg-red-50'
                                : form.confirm_password && form.password === form.confirm_password
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-gray-200'}`}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.confirm_password && form.password !== form.confirm_password && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700
                         disabled:bg-blue-400 text-white font-semibold rounded-xl
                         transition-all duration-200 shadow-sm hover:shadow-md mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">Already have an account?</span>
            </div>
          </div>

          <Link
            to="/login"
            className="w-full flex items-center justify-center py-3 px-4 border-2 border-blue-600
                       text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            Sign In Instead
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400"
        >
          <span>🔒 Data Encrypted</span>
          <span>🏥 HIPAA-aligned Privacy</span>
          <span>🆓 Always Free</span>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage