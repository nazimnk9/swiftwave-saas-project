"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { MainContent } from "./main-content"
import { JobsPage } from "./pages/jobs-page"
import { CandidatesPage } from "./pages/candidates-page"
import { ReportsPage } from "./pages/reports-page"
import { SettingsPage } from "./pages/settings-page"
import { HelpPage } from "./pages/help-page"

interface DashboardProps {
  onLogout: () => void
  toggleTheme: () => void
  isDark: boolean
}

type PageType = "dashboard" | "jobs" | "candidates" | "reports" | "settings" | "help"

export default function Dashboard({ onLogout, toggleTheme, isDark }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "jobs":
        return <JobsPage />
      case "candidates":
        return <CandidatesPage />
      case "reports":
        return <ReportsPage />
      case "settings":
        return <SettingsPage />
      case "help":
        return <HelpPage />
      default:
        return <MainContent />
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
          toggleTheme={toggleTheme}
          isDark={isDark}
          isMobile={isMobile}
        />

        {/* Content Area */}
        {renderPage()}
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
