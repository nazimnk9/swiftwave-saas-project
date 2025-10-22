import { BASE_URL } from "@/lib/baseUrl"

export interface Platform {
  id: number
  name: string
  slug: string
  description: string
  base_url: string | null
  client_id: string
  auth_type: string
  logo: string | null
  status: string
}

export interface PlatformResponse {
  count: number
  next: string | null
  previous: string | null
  results: Platform[]
}

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

export async function getPlatforms(): Promise<PlatformResponse> {
  try {
    const token = getAuthToken()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}/organizations/platform`, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch platforms: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching platforms:", error)
    throw error
  }
}

export interface ConnectPlatformPayload {
  code: string
  redirect_uri: string
  platform_slug: string
}

export async function connectPlatform(payload: ConnectPlatformPayload): Promise<any> {
  try {
    const token = getAuthToken()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}/organizations/platform/connect`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Failed to connect platform: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error connecting platform:", error)
    throw error
  }
}
