"use client"

import { useState } from "react"
import { Menu, Bell, Settings, LogOut, Moon, Sun, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface TopbarProps {
  onMenuClick: () => void
  onLogout: () => void
  toggleTheme: () => void
  isDark: boolean
  isMobile: boolean
}

export function Topbar({ onMenuClick, onLogout, toggleTheme, isDark, isMobile }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, message: "New candidate application", time: "5 min ago", unread: true },
    { id: 2, message: "Job posting approved", time: "1 hour ago", unread: true },
    { id: 3, message: "Interview scheduled", time: "2 hours ago", unread: false },
    { id: 4, message: "New message from recruiter", time: "3 hours ago", unread: false },
  ]

  return (
    <div className="h-40 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative w-32 h-32">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
              alt="SwiftWave.AI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search jobs, candidates..." className="pl-10 h-10 border-border focus:border-primary" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-muted">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="hover:bg-muted relative"
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
                    className={`p-4 border-b border-border hover:bg-muted cursor-pointer transition-colors ${
                      notif.unread ? "bg-primary/5" : ""
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
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)} className="hover:bg-muted">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="border-t border-border my-1" />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
