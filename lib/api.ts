export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://hospital-management-backend-r9rq.onrender.com"

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("kenko_token")
}

async function request(path: string, options?: RequestInit) {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body: unknown) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path: string, body: unknown) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path: string) => request(path, { method: "DELETE" }),
}
