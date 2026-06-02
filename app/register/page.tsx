"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const router = useRouter()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.{8,})(?=.*[A-Za-z])(?=.*\d).*/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!name.trim()) return setFormError("Please enter your name.")
    if (!emailRegex.test(email)) return setEmailError("Please enter a valid email.")
    if (!passwordRegex.test(password)) return setPasswordError("Password must be at least 8 characters and include letters and numbers.")
    if (password !== confirmPassword) return setFormError("Passwords do not match.")

    setIsLoading(true)
    try {
      const raw = localStorage.getItem("kenko_users")
      const users = raw ? JSON.parse(raw) as Array<any> : []
      const exists = users.some((u: any) => u.email === email)
      if (exists) {
        setFormError("An account with this email already exists.")
        setIsLoading(false)
        return
      }

      users.push({ name, email, password, role: "User" })
      localStorage.setItem("kenko_users", JSON.stringify(users))
      // redirect to login
      router.push("/login")
    } catch (e) {
      setFormError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create account</h1>
          <p className="mt-2 text-muted-foreground">Register to access Kenko HMS</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Enter your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{formError}</div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError("") }}
                  onBlur={() => { if (email && !emailRegex.test(email)) setEmailError("Please enter a valid email.") }}
                  className="h-11"
                />
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError("") }}
                  onBlur={() => { if (password && !passwordRegex.test(password)) setPasswordError("Password must be at least 8 characters and include letters and numbers.") }}
                  className="h-11"
                />
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm password</label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11" />
              </div>

              <Button type="submit" className="h-11 w-full" disabled={isLoading}>{isLoading ? "Creating..." : "Create account"}</Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <a className="text-primary" href="/login">Sign in</a></p>
      </div>
    </div>
  )
}
