// "use client"

// import { SettingsPage } from "@/components/dashboard/pages/settings-page"
// import { Sidebar } from "@/components/dashboard/sidebar"
// import { Topbar } from "@/components/dashboard/topbar"

// export default function SettingsRoute() {
//   return (
//     <div className="flex h-screen bg-background overflow-hidden">
//       <Sidebar isOpen={true} onClose={() => {}} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar onMenuClick={() => {}} onLogout={() => {}} toggleTheme={() => {}} isDark={false} isMobile={false} />
//         <SettingsPage />
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState } from "react"
// import { SettingsPage } from "@/components/dashboard/pages/settings-page"
// import { Sidebar } from "@/components/dashboard/sidebar"
// import { Topbar } from "@/components/dashboard/topbar"

// export default function SettingsRoute() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-background overflow-hidden">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar
//           onMenuClick={() => setSidebarOpen(!sidebarOpen)}
//           onLogout={() => {}}
//           toggleTheme={() => {}}
//           isDark={false}
//           isMobile={true}
//         />
//         <SettingsPage />
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { SettingsPage } from "@/components/dashboard/pages/settings-page"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"

export default function SettingsRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => {}}
          toggleTheme={() => {}}
          isDark={false}
          isMobile={true}
        />
        <SettingsPage />
      </div>
    </div>
  )
}
