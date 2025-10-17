"use client"

import { useState } from "react"
import {
  ChevronDown,
  Home,
  Briefcase,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  Mail,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
}

export function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates"])

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleNavigate = (page: string) => {
    onNavigate(page)
    onClose()
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      page: "dashboard",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      page: "jobs",
      submenu: [
        { label: "Active Jobs", page: "jobs" },
        { label: "Draft Jobs", page: "jobs" },
        { label: "Closed Jobs", page: "jobs" },
        { label: "Job Templates", page: "jobs" },
      ],
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: Users,
      page: "candidates",
      submenu: [
        { label: "All Candidates", page: "candidates" },
        { label: "Shortlisted", page: "candidates" },
        { label: "Interviews", page: "candidates" },
        { label: "Offers", page: "candidates" },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      page: "reports",
      submenu: [
        { label: "Hiring Analytics", page: "reports" },
        { label: "Performance", page: "reports" },
        { label: "Pipeline", page: "reports" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      page: "documents",
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      page: "calendar",
    },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
      page: "messages",
    },
  ]

  const bottomItems = [
    { id: "help", label: "Help & Support", icon: HelpCircle, page: "help" },
    { id: "settings", label: "Settings", icon: Settings, page: "settings" },
  ]

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-8 border-b border-sidebar-border flex items-center justify-center min-h-40">
          <div className="relative w-32 h-32">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
              alt="SwiftWave.AI"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.id)
            const hasSubmenu = item.submenu && item.submenu.length > 0

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleExpand(item.id)
                    } else {
                      handleNavigate(item.page)
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {hasSubmenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.submenu.map((subitem, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigate(subitem.page)}
                        className="w-full text-left px-4 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.page)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
