"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export function useRoleGuard(allowedRoles: string[]) {
  const { user, loaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loaded && user && !allowedRoles.includes(user.role || "")) {
      router.push("/dashboard")
    }
  }, [loaded, user, router, allowedRoles])

  return { hasAccess: loaded && user && allowedRoles.includes(user.role || ""), loaded }
}
