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
  Zap,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
}

export function Sidebar({ isOpen, onClose, isCollapsed = false }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpand = (item: string) => {
    if (isCollapsed) return
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleCloseOnMobile = () => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    
    {
      id: "integrations",
      label: "Integrations",
      icon: Zap,
      href: "/dashboard/integrations",
      submenu: [{ label: "Business Settings", href: "/dashboard/business-settings" }],
    },
    {
      id: "apps",
      label: "Apps",
      icon: Zap,
      href: "/dashboard/apps",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      href: "/dashboard/jobs",
      submenu: [
        { label: "Live Jobs", href: "/dashboard/jobs" },
        // { label: "Draft Jobs", href: "/dashboard/jobs/draft" },
        { label: "Closed Jobs", href: "/dashboard/jobs" },
        // { label: "Job Templates", href: "/dashboard/jobs/templates" },
      ],
    },
    // {
    //   id: "candidates",
    //   label: "Candidates",
    //   icon: Users,
    //   href: "/dashboard/candidates",
    //   submenu: [
    //     { label: "All Candidates", href: "/dashboard/candidates" },
    //     { label: "Shortlisted", href: "/dashboard/candidates/shortlisted" },
    //     { label: "Interviews", href: "/dashboard/candidates/interviews" },
    //     { label: "Offers", href: "/dashboard/candidates/offers" },
    //   ],
    // },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      submenu: [
        { label: "Hiring Analytics", href: "/dashboard/reports/analytics" },
        { label: "Performance", href: "/dashboard/reports/performance" },
        { label: "Pipeline", href: "/dashboard/reports/pipeline" },
      ],
    },
    // {
    //   id: "documents",
    //   label: "Documents",
    //   icon: FileText,
    //   href: "/dashboard/documents",
    // },
    // {
    //   id: "calendar",
    //   label: "Calendar",
    //   icon: Calendar,
    //   href: "/dashboard/calendar",
    // },
    // {
    //   id: "messages",
    //   label: "Messages",
    //   icon: Mail,
    //   href: "/dashboard/messages",
    // },
    {
      id: "organization-users",
      label: "Organization User",
      icon: Users,
      href: "/dashboard/user-list",
      submenu: [
        { label: "User List", href: "/dashboard/user-list" },
        { label: "Invite List", href: "/dashboard/invite-list" },
      ],
    },
  ]

  const bottomItems = [
    { id: "help", label: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  const isSubmenuActive = (submenu: { href: string }[] | undefined) => {
    return submenu?.some(subitem => isActive(subitem.href)) || false
  }

  // Auto-expand menu if any of its submenu items is active
  const shouldExpand = (item: typeof menuItems[0]) => {
    if (isCollapsed) return false
    if (item.submenu) {
      return item.submenu.some(subitem => isActive(subitem.href))
    }
    return false
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-screen ${isCollapsed ? "w-20" : "w-64"} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Logo and Close Button */}
        <div className={`px-4 border-b border-sidebar-border flex items-center ${isCollapsed ? "justify-center" : "justify-between"} h-20`}>

          <button
            onClick={onClose}
            className="cursor-pointer md:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isExpanded = expandedItems.includes(item.id) || shouldExpand(item)
            const active = isActive(item.href) || (hasSubmenu && isSubmenuActive(item.submenu))

            return (
              <div key={item.id}>
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${active
                      ? "bg-sidebar-accent text-primary/80"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      } ${isCollapsed ? "justify-center px-2" : ""}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleCloseOnMobile}
                    className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${active
                      ? "bg-sidebar-accent text-primary/80"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      } ${isCollapsed ? "justify-center px-2" : ""}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span className="flex-1 text-left font-medium">{item.label}</span>}
                  </Link>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && !isCollapsed && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.submenu.map((subitem, idx) => (
                      <Link
                        key={idx}
                        href={subitem.href}
                        onClick={handleCloseOnMobile}
                        className={`cursor-pointer block px-4 py-2 text-sm rounded-lg transition-colors ${isActive(subitem.href)
                          ? "text-primary/80 bg-sidebar-accent"
                          : "text-sidebar-foreground/70 hover:text-primary/80 hover:bg-sidebar-accent"
                          }`}
                      >
                        {subitem.label}
                      </Link>
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
            const active = isActive(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleCloseOnMobile}
                className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                  ? "bg-sidebar-accent text-primary/80"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
