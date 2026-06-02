"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  name: string
  email: string
  role: string
  avatar?: string
}

type LoginResult = "success" | "invalid_password" | "not_found" | "error"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const raw = localStorage.getItem("kenko_users")
      const users = raw ? JSON.parse(raw) as Array<any> : []
      const user = users.find((u: any) => u.email === email)
      if (!user) {
        return "not_found"
      }
      if (user.password !== password) {
        return "invalid_password"
      }
      setUser({
        name: user.name || "User",
        email: user.email,
        role: user.role || "User",
        avatar: user.avatar,
      })
      return "success"
    } catch (e) {
      return "error"
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
