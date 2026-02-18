import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Shield, Clock, Activity, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API = 'http://localhost:8000'

const RISK_STYLES = {
  'High Risk':     { badge: 'bg-red-100 text-red-700 border-red-200',     dot: 'bg-red-500',     icon: AlertTriangle },
  'Moderate Risk': { badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-400',  icon: AlertTriangle },
  'Low Risk':      { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle },
}

const NAME_MAP = {
  mel: 'Melanoma', bcc: 'Basal Cell Carcinoma', akiec: 'Actinic Keratosis',
  bkl: 'Benign Keratosis', df: 'Dermatofibroma', vasc: 'Vascular Lesion', nv: 'Melanocytic Nevi',
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
)

// ─── Scan History Card ────────────────────────────────────────────────────────
const ScanCard = ({ scan, index }) => {
  const risk = scan.risk_level || 'Low Risk'
  const style = RISK_STYLES[risk] || RISK_STYLES['Low Risk']
  const Icon = style.icon
  const diagnosisName = NAME_MAP[scan.predicted_label] || scan.predicted_label
  const confidence = scan.confidence_score ? Math.round(scan.confidence_score * 100) : 0
  const date = scan.created_at ? new Date(scan.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'Unknown date'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
    >
      {/* Risk dot */}
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${style.dot}`} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900">{diagnosisName}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${style.badge}`}>
            {risk}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {date}
          </span>
        </div>
      </div>

      {/* Confidence */}
      <div className="text-right flex-shrink-0">
        <p className="text-lg font-bold text-gray-800">{confidence}%</p>
        <p className="text-xs text-gray-400">confidence</p>
      </div>
    </motion.div>
  )
}

// ─── Main Profile Page ─────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { user, token } = useAuth()
  const [scans, setScans] = useState([])
  const [loadingScans, setLoadingScans] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (token) {
      axios.get(`${API}/user/scans`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setScans(res.data))
        .catch(() => setScans([]))
        .finally(() => setLoadingScans(false))
    }
  }, [token])

  const highRisk  = scans.filter(s => s.risk_level === 'High Risk').length
  const totalScans = scans.length

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header Card ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-blue-50 p-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
              {getInitials(user?.full_name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.full_name}</h1>
              <p className="text-gray-500">@{user?.username}</p>
              <span className="inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                <Shield className="w-3 h-3" /> {user?.role || 'user'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={Activity} label="Total Scans"     value={totalScans} color="bg-blue-500" />
          <StatCard icon={AlertTriangle} label="High Risk Findings" value={highRisk} color="bg-red-500" />
          <StatCard icon={CheckCircle} label="Safe Results"  value={totalScans - highRisk} color="bg-emerald-500" />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-fit">
          {['profile', 'history'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'profile' ? '👤 Profile' : '🕐 Scan History'}
            </button>
          ))}
        </div>

        {/* ── Profile Tab ── */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-blue-50 p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Full Name</p>
                  <p className="text-gray-800 font-medium">{user?.full_name || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-gray-800 font-medium">{user?.email || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Username</p>
                  <p className="text-gray-800 font-medium">@{user?.username || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Date of Birth</p>
                  <p className="text-gray-800 font-medium">{user?.date_of_birth || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Phone</p>
                  <p className="text-gray-800 font-medium">{user?.phone_number || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Gender</p>
                  <p className="text-gray-800 font-medium">{user?.gender || '—'}</p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ── History Tab ── */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">Scan History</h2>
              <span className="text-sm text-gray-400">{totalScans} total scan{totalScans !== 1 ? 's' : ''}</span>
            </div>

            {loadingScans ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : scans.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Activity className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No scans yet</p>
                <p className="text-gray-400 text-sm mt-1">Upload a skin image on the home page to get started</p>
              </div>
            ) : (
              scans.map((scan, i) => <ScanCard key={scan.id} scan={scan} index={i} />)
            )}
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default ProfilePage