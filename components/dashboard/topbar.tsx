"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Bell, Settings, LogOut, Moon, Sun, Search, User, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { useRouter } from "next/navigation"

interface TopbarProps {
  onMenuClick: () => void
  onLogout: () => void
  toggleTheme: () => void
  isDark: boolean
  isMobile: boolean
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

interface Organization {
  id: number
  uid: string
  organization: {
    uid: string
    name: string
    slug: string
    website: string | null
    address: string | null
    country: string | null
    logo: object | null
  }
  role: string
  is_active: boolean
  joined_at: string
  last_active: string | null
}

interface CurrentOrg {
  id: number
  slug: string
  email: string
  phone: string
  website: string | null
  address: string | null
  country: string | null
  description: string | null
  logo: object | null
  name: string
  status: string
  first_name: string
  last_name: string
}

export function Topbar({ onMenuClick, onLogout, toggleTheme, isDark, isMobile, isCollapsed = false, onToggleCollapse }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showOrgSelector, setShowOrgSelector] = useState(false)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [currentOrg, setCurrentOrg] = useState<CurrentOrg | null>(null)
  const [isSelectorDisabled, setIsSelectorDisabled] = useState(false)
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  })
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(false)
  const router = useRouter()

  const orgRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setShowOrgSelector(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const firstName = localStorage.getItem("userFirstName") || ""
    const lastName = localStorage.getItem("userLastName") || ""
    const email = localStorage.getItem("userEmail") || ""
    const company = localStorage.getItem("userCompany") || ""

    setUserInfo({ firstName, lastName, email, company })
    fetchOrganizations()
    fetchCurrentOrganization()

    // Check if selector should be disabled based on localStorage
    const disabledOrg = localStorage.getItem("disabledOrgUid")
    if (disabledOrg) {
      setIsSelectorDisabled(true)
    }
  }, [])

  const fetchOrganizations = async () => {
    try {
      setIsLoadingOrgs(true)
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        console.log("[v0] No auth token found")
        setIsLoadingOrgs(false)
        return
      }

      const response = await axios.get(`${BASE_URL}/organizations/my_organizations`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      console.log("[v0] Organizations fetched:", response.data)
      setOrganizations(response.data.results || [])
    } catch (err) {
      console.log("[v0] Error fetching organizations:", err)
    } finally {
      setIsLoadingOrgs(false)
    }
  }

  const fetchCurrentOrganization = async () => {
    try {
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        return
      }

      const response = await axios.get(`${BASE_URL}/organizations/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      console.log("[v0] Current organization fetched:", response.data)
      setCurrentOrg(response.data)
    } catch (err) {
      console.log("[v0] Error fetching current organization:", err)
    }
  }

  const handleSwitchOrganization = async (uid: string) => {
    await fetchOrganizations()
    try {
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        return
      }

      const response = await axios.put(
        `${BASE_URL}/organizations/switch/${uid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      console.log("[v0] Organization switched:", response.data)

      // Store the UID in localStorage to disable selector for this specific organization
      localStorage.setItem("disabledOrgUid", uid)
      setIsSelectorDisabled(true) // Disable selector after switching

      await fetchCurrentOrganization()
      router.push("/dashboard")
      setShowOrgSelector(false)
    } catch (err) {
      console.log("[v0] Error switching organization:", err)
    }
  }

  const notifications = [
    { id: 1, message: "New candidate application", time: "5 min ago", unread: true },
    { id: 2, message: "Job posting approved", time: "1 hour ago", unread: true },
    { id: 3, message: "Interview scheduled", time: "2 hours ago", unread: false },
    { id: 4, message: "New message from recruiter", time: "3 hours ago", unread: false },
  ]

  const handleSignOut = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPassword")
    localStorage.removeItem("userFirstName")
    localStorage.removeItem("userLastName")
    localStorage.removeItem("userCompany")
    localStorage.removeItem("disabledOrgUid") // Clear the disabled org on sign out
    onLogout()
  }

  const displayName = userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : "User"

  return (
    <div className="h-20 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-12 flex-1">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="cursor-pointer md:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hidden md:flex cursor-pointer text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/dashboard">
            <div className="cursor-pointer relative w-18 h-18 flex items-center justify-center">
              <Image
                src="/logo_nav.png"
                alt="SwiftWave.AI"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search jobs, candidates..." className="pl-10 h-10 border-border focus:border-primary" />
          </div>
        </div>
      </div>

      {/* Middle Section - Organization Selector - Visible on all devices */}
      <div className="relative" ref={orgRef}>
        <button
          onClick={() => !isSelectorDisabled && setShowOrgSelector(!showOrgSelector)}
          disabled={isSelectorDisabled}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 border border-border ${isSelectorDisabled
            ? "bg-muted/50 cursor-not-allowed opacity-60"
            : "bg-primary/20 hover:bg-primary/30 cursor-pointer"
            }`}
        >
          <span className="text-sm font-semibold text-foreground">{currentOrg?.name || "Select Org"}</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${showOrgSelector ? "rotate-180" : ""
              } ${isSelectorDisabled ? "opacity-60" : ""}`}
          />
        </button>

        {showOrgSelector && !isSelectorDisabled && (
          <div className="absolute top-full mt-2 left-0 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Switch Organization</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {isLoadingOrgs ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
              ) : organizations.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No organizations</div>
              ) : (
                organizations.map((org) => (
                  <button
                    key={org.uid}
                    onClick={() => {
                      setShowOrgSelector(false)
                      handleSwitchOrganization(org.uid)
                    }}
                    className={`cursor-pointer w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors border-b border-border last:border-b-0 ${currentOrg?.name === org.organization.name ? "bg-primary/10 font-semibold text-primary" : ""
                      }`}
                  >
                    <p className="font-medium">{org.organization.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{org.role}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="cursor-pointer bg-primary/20 hover:bg-primary/30">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="cursor-pointer bg-primary/20 hover:bg-primary/30 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-border hover:bg-muted cursor-pointer transition-colors ${notif.unread ? "bg-primary/5" : ""
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? "bg-primary" : "bg-transparent"}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border text-center">
                <button className="text-sm text-primary hover:text-primary/80 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userRef}>
          <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)} className="hover:bg-muted">
            <div className="cursor-pointer w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary dark:text-white" />
            </div>
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-foreground">{displayName}</p>
                <p className="text-sm font-medium text-muted-foreground break-all">{userInfo.email}</p>
              </div>
              <div className="p-2 space-y-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    handleSignOut()
                  }}
                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}