import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './layout/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Safety from './pages/Safety'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'

// ─── Guard: if not logged in, redirect to /register ──────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading DermAssist AI...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/register" replace />
  }

  return children
}

// ─── Guard: if already logged in, skip login/register ────────────────────────
const AuthRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

// ─── Routes ───────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages — only for guests */}
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

      {/* Protected pages — only for logged-in users */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Catch all → register */}
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App