// "use client"

// import { Sidebar } from "@/components/dashboard/sidebar"
// import { Topbar } from "@/components/dashboard/topbar"
// import PaymentPage from "@/components/dashboard/pages/payment-page"
// import { ThemeProvider } from "@/components/theme-provider"

// export default function PaymentDashboardPage() {
//   return (
//     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
//       <div className="flex h-screen bg-background overflow-hidden">
//         <Sidebar />
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           <Topbar />
//           <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
//             <PaymentPage />
//           </main>
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import PaymentPage from "@/components/dashboard/pages/payment-page"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { useRouter } from "next/navigation"

export default function AppsRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
        setIsCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPassword")
    localStorage.removeItem("userFirstName")
    localStorage.removeItem("userLastName")
    localStorage.removeItem("userCompany")
    router.push("/")
  }

  return (
    <div className={`flex h-screen bg-background overflow-hidden ${isDark ? "dark" : ""}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
          toggleTheme={toggleTheme}
          isDark={isDark}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <PaymentPage />
        </main>
      </div>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
