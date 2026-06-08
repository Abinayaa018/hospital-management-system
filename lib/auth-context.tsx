"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API_BASE_URL } from "@/lib/api"

interface User {
  name: string
  email: string
  role: string
  avatar?: string
}

type LoginResult =
  | { status: "success" }
  | { status: "not_found" }
  | { status: "invalid_password" }
  | { status: "error"; message: string }

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loaded: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("kenko_user")
    const storedToken = localStorage.getItem("kenko_token")
    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedToken) setToken(storedToken)
    setLoaded(true)
  }, [])

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (res.status === 404) return { status: "not_found" }
      if (res.status === 401) return { status: "invalid_password" }
      if (!res.ok) {
        const message = await res.text()
        return { status: "error", message: message || "Unexpected login failure" }
      }
      const data = await res.json()
      const loggedInUser = {
        name: data.name || "User",
        email: data.email,
        role: data.role || "Patient",
        avatar: data.avatar,
      }
      setUser(loggedInUser)
      setToken(data.token || null)
      localStorage.setItem("kenko_user", JSON.stringify(loggedInUser))
      if (data.token) localStorage.setItem("kenko_token", data.token)
      return { status: "success" }
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("kenko_user")
    localStorage.removeItem("kenko_token")
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
