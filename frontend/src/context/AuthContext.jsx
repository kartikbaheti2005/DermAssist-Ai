import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API = 'http://localhost:8000'

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(() => localStorage.getItem('dermassist_token'))
  const [loading, setLoading] = useState(true)

  // On mount — verify stored token and load full profile
  useEffect(() => {
    if (token) {
      axios.get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('dermassist_token')
          setToken(null)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const register = async ({ full_name, username, email, password, phone_number, gender, date_of_birth }) => {
    const res = await axios.post(`${API}/auth/register`, {
      full_name, username, email, password, phone_number, gender, date_of_birth
    })
    const { access_token } = res.data
    localStorage.setItem('dermassist_token', access_token)
    setToken(access_token)

    // Fetch full profile after register
    const profile = await axios.get(`${API}/user/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    setUser(profile.data)
    return profile.data
  }

  const login = async ({ username, password }) => {
    const form = new URLSearchParams()
    form.append('username', username)
    form.append('password', password)

    const res = await axios.post(`${API}/auth/login`, form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    const { access_token } = res.data
    localStorage.setItem('dermassist_token', access_token)
    setToken(access_token)

    // Fetch full profile after login
    const profile = await axios.get(`${API}/user/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    setUser(profile.data)
    return profile.data
  }

  const logout = () => {
    localStorage.removeItem('dermassist_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthContext