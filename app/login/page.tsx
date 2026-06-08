"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Heart } from "lucide-react"

export default function LoginPage() {
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin">("Patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { loginWithRole } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.")
      setIsLoading(false)
      return
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters and include letters and numbers.")
      setIsLoading(false)
      return
    }

    try {
      const result = await loginWithRole(email, password, role)
      if (result.status === "success") {
        localStorage.setItem("kenko_last_login", email)
        router.push("/dashboard")
        return
      }
      if (result.status === "not_found") {
        setEmailError(`This email is not registered as a ${role}.`)
      } else if (result.status === "invalid_password") {
        setPasswordError("Incorrect password. Please try again.")
      } else if (result.status === "invalid_role") {
        setError(`This account is not registered as a ${role}.`)
      } else {
        setError(result.message || "Invalid credentials. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.{8,})(?=.*[A-Za-z])(?=.*\d).*/

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Kenko</h1>
          <p className="mt-2 text-muted-foreground">Hospital Management System</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              {(["Patient", "Doctor", "Admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setError(""); setEmailError(""); setPasswordError("") }}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    role === r
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:border-primary/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={role === "Patient" ? "patient@kenko.com" : `${role.toLowerCase()}@kenko.com`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  required
                  className="h-11"
                />
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (passwordError) setPasswordError("")
                    }}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              </div>
              <Button type="submit" className="h-11 w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {role === "Patient" && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account? <Link href="/register" className="text-primary underline">Sign up</Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Kenko HMS - Empowering Healthcare Excellence
        </p>
      </div>
    </div>
  )
}
