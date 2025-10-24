// "use client"

// import { useState } from "react"
// import {
//   ChevronDown,
//   Home,
//   Briefcase,
//   Users,
//   Settings,
//   BarChart3,
//   FileText,
//   Calendar,
//   Mail,
//   HelpCircle,
// } from "lucide-react"
// import Image from "next/image"

// interface SidebarProps {
//   isOpen: boolean
//   onClose: () => void
//   onNavigate: (page: string) => void
// }

// export function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
//   const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates"])

//   const toggleExpand = (item: string) => {
//     setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//   }

//   const handleNavigate = (page: string) => {
//     onNavigate(page)
//     onClose()
//   }

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: Home,
//       page: "dashboard",
//     },
//     {
//       id: "jobs",
//       label: "Jobs",
//       icon: Briefcase,
//       page: "jobs",
//       submenu: [
//         { label: "Active Jobs", page: "jobs" },
//         { label: "Draft Jobs", page: "jobs" },
//         { label: "Closed Jobs", page: "jobs" },
//         { label: "Job Templates", page: "jobs" },
//       ],
//     },
//     {
//       id: "candidates",
//       label: "Candidates",
//       icon: Users,
//       page: "candidates",
//       submenu: [
//         { label: "All Candidates", page: "candidates" },
//         { label: "Shortlisted", page: "candidates" },
//         { label: "Interviews", page: "candidates" },
//         { label: "Offers", page: "candidates" },
//       ],
//     },
//     {
//       id: "reports",
//       label: "Reports",
//       icon: BarChart3,
//       page: "reports",
//       submenu: [
//         { label: "Hiring Analytics", page: "reports" },
//         { label: "Performance", page: "reports" },
//         { label: "Pipeline", page: "reports" },
//       ],
//     },
//     {
//       id: "documents",
//       label: "Documents",
//       icon: FileText,
//       page: "documents",
//     },
//     {
//       id: "calendar",
//       label: "Calendar",
//       icon: Calendar,
//       page: "calendar",
//     },
//     {
//       id: "messages",
//       label: "Messages",
//       icon: Mail,
//       page: "messages",
//     },
//   ]

//   const bottomItems = [
//     { id: "help", label: "Help & Support", icon: HelpCircle, page: "help" },
//     { id: "settings", label: "Settings", icon: Settings, page: "settings" },
//   ]

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         {/* Logo */}
//         <div className="p-8 border-b border-sidebar-border flex items-center justify-center min-h-40">
//           <div className="relative w-32 h-32">
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//               alt="SwiftWave.AI"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             const isExpanded = expandedItems.includes(item.id)
//             const hasSubmenu = item.submenu && item.submenu.length > 0

//             return (
//               <div key={item.id}>
//                 <button
//                   onClick={() => {
//                     if (hasSubmenu) {
//                       toggleExpand(item.id)
//                     } else {
//                       handleNavigate(item.page)
//                     }
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="flex-1 text-left font-medium">{item.label}</span>
//                   {hasSubmenu && (
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 {hasSubmenu && isExpanded && (
//                   <div className="ml-4 space-y-1 mt-1">
//                     {item.submenu.map((subitem, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleNavigate(subitem.page)}
//                         className="w-full text-left px-4 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
//                       >
//                         {subitem.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </nav>

//         {/* Bottom Menu */}
//         <div className="border-t border-sidebar-border p-4 space-y-2">
//           {bottomItems.map((item) => {
//             const Icon = item.icon
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigate(item.page)}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }


// "use client"

// import { useState } from "react"
// import {
//   ChevronDown,
//   Home,
//   Briefcase,
//   Users,
//   Settings,
//   BarChart3,
//   FileText,
//   Calendar,
//   Mail,
//   HelpCircle,
//   Zap,
// } from "lucide-react"
// import Image from "next/image"

// interface SidebarProps {
//   isOpen: boolean
//   onClose: () => void
//   onNavigate: (page: string) => void
// }

// export function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
//   const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates", "integrations"])

//   const toggleExpand = (item: string) => {
//     setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//   }

//   const handleNavigate = (page: string) => {
//     onNavigate(page)
//     onClose()
//   }

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: Home,
//       page: "dashboard",
//     },
//     {
//       id: "jobs",
//       label: "Jobs",
//       icon: Briefcase,
//       page: "jobs",
//       submenu: [
//         { label: "Active Jobs", page: "jobs" },
//         { label: "Draft Jobs", page: "jobs" },
//         { label: "Closed Jobs", page: "jobs" },
//         { label: "Job Templates", page: "jobs" },
//       ],
//     },
//     {
//       id: "candidates",
//       label: "Candidates",
//       icon: Users,
//       page: "candidates",
//       submenu: [
//         { label: "All Candidates", page: "candidates" },
//         { label: "Shortlisted", page: "candidates" },
//         { label: "Interviews", page: "candidates" },
//         { label: "Offers", page: "candidates" },
//       ],
//     },
//     {
//       id: "reports",
//       label: "Reports",
//       icon: BarChart3,
//       page: "reports",
//       submenu: [
//         { label: "Hiring Analytics", page: "reports" },
//         { label: "Performance", page: "reports" },
//         { label: "Pipeline", page: "reports" },
//       ],
//     },
//     {
//       id: "documents",
//       label: "Documents",
//       icon: FileText,
//       page: "documents",
//     },
//     {
//       id: "calendar",
//       label: "Calendar",
//       icon: Calendar,
//       page: "calendar",
//     },
//     {
//       id: "messages",
//       label: "Messages",
//       icon: Mail,
//       page: "messages",
//     },
//     {
//       id: "integrations",
//       label: "Integrations",
//       icon: Zap,
//       page: "integrations",
//       submenu: [{ label: "Business Settings", page: "business-settings" }],
//     },
//   ]

//   const bottomItems = [
//     { id: "help", label: "Help & Support", icon: HelpCircle, page: "help" },
//     { id: "settings", label: "Settings", icon: Settings, page: "settings" },
//   ]

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         {/* Logo */}
//         <div className="p-8 border-b border-sidebar-border flex items-center justify-center min-h-40">
//           <div className="relative w-32 h-32">
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//               alt="SwiftWave.AI"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             const isExpanded = expandedItems.includes(item.id)
//             const hasSubmenu = item.submenu && item.submenu.length > 0

//             return (
//               <div key={item.id}>
//                 <button
//                   onClick={() => {
//                     if (hasSubmenu) {
//                       toggleExpand(item.id)
//                     } else {
//                       handleNavigate(item.page)
//                     }
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="flex-1 text-left font-medium">{item.label}</span>
//                   {hasSubmenu && (
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 {hasSubmenu && isExpanded && (
//                   <div className="ml-4 space-y-1 mt-1">
//                     {item.submenu.map((subitem, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleNavigate(subitem.page)}
//                         className="w-full text-left px-4 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
//                       >
//                         {subitem.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </nav>

//         {/* Bottom Menu */}
//         <div className="border-t border-sidebar-border p-4 space-y-2">
//           {bottomItems.map((item) => {
//             const Icon = item.icon
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigate(item.page)}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }

// "use client"

// import { useState } from "react"
// import {
//   ChevronDown,
//   Home,
//   Briefcase,
//   Users,
//   Settings,
//   BarChart3,
//   FileText,
//   Calendar,
//   Mail,
//   HelpCircle,
//   Zap,
// } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// interface SidebarProps {
//   isOpen: boolean
//   onClose: () => void
//   onNavigate: (page: string) => void
// }

// export function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
//   const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates", "integrations"])

//   const toggleExpand = (item: string) => {
//     setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//   }

//   const handleNavigate = (page: string) => {
//     onNavigate(page)
//     onClose()
//   }

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: Home,
//       page: "dashboard",
//     },
//     {
//       id: "jobs",
//       label: "Jobs",
//       icon: Briefcase,
//       page: "jobs",
//       submenu: [
//         { label: "Active Jobs", page: "jobs" },
//         { label: "Draft Jobs", page: "jobs" },
//         { label: "Closed Jobs", page: "jobs" },
//         { label: "Job Templates", page: "jobs" },
//       ],
//     },
//     {
//       id: "candidates",
//       label: "Candidates",
//       icon: Users,
//       page: "candidates",
//       submenu: [
//         { label: "All Candidates", page: "candidates" },
//         { label: "Shortlisted", page: "candidates" },
//         { label: "Interviews", page: "candidates" },
//         { label: "Offers", page: "candidates" },
//       ],
//     },
//     {
//       id: "reports",
//       label: "Reports",
//       icon: BarChart3,
//       page: "reports",
//       submenu: [
//         { label: "Hiring Analytics", page: "reports" },
//         { label: "Performance", page: "reports" },
//         { label: "Pipeline", page: "reports" },
//       ],
//     },
//     {
//       id: "documents",
//       label: "Documents",
//       icon: FileText,
//       page: "documents",
//     },
//     {
//       id: "calendar",
//       label: "Calendar",
//       icon: Calendar,
//       page: "calendar",
//     },
//     {
//       id: "messages",
//       label: "Messages",
//       icon: Mail,
//       page: "messages",
//     },
//     {
//       id: "integrations",
//       label: "Integrations",
//       icon: Zap,
//       page: "integrations",
//       submenu: [{ label: "Business Settings", page: "business-settings" }],
//     },
//   ]

//   const bottomItems = [
//     { id: "help", label: "Help & Support", icon: HelpCircle, page: "help" },
//     { id: "settings", label: "Settings", icon: Settings, page: "settings" },
//   ]

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         {/* Logo */}
//         <div className="p-8 border-b border-sidebar-border flex items-center justify-center min-h-40">
//           <Link href="/dashboard" onClick={() => handleNavigate("dashboard")}>
//             <div className="relative w-32 h-32">
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//                 alt="SwiftWave.AI"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           </Link>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             const isExpanded = expandedItems.includes(item.id)
//             const hasSubmenu = item.submenu && item.submenu.length > 0

//             return (
//               <div key={item.id}>
//                 <button
//                   onClick={() => {
//                     if (hasSubmenu) {
//                       toggleExpand(item.id)
//                     } else {
//                       handleNavigate(item.page)
//                     }
//                   }}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="flex-1 text-left font-medium">{item.label}</span>
//                   {hasSubmenu && (
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 {hasSubmenu && isExpanded && (
//                   <div className="ml-4 space-y-1 mt-1">
//                     {item.submenu.map((subitem, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleNavigate(subitem.page)}
//                         className="w-full text-left px-4 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
//                       >
//                         {subitem.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </nav>

//         {/* Bottom Menu */}
//         <div className="border-t border-sidebar-border p-4 space-y-2">
//           {bottomItems.map((item) => {
//             const Icon = item.icon
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigate(item.page)}
//                 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }


// "use client"

// import { useState } from "react"
// import {
//   ChevronDown,
//   Home,
//   Briefcase,
//   Users,
//   Settings,
//   BarChart3,
//   FileText,
//   Calendar,
//   Mail,
//   HelpCircle,
//   Zap,
// } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// interface SidebarProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates", "integrations"])
//   const pathname = usePathname()

//   const toggleExpand = (item: string) => {
//     setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//   }

//   const handleCloseOnMobile = () => {
//     if (window.innerWidth < 768) {
//       onClose()
//     }
//   }

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: Home,
//       href: "/dashboard",
//     },
//     {
//       id: "jobs",
//       label: "Jobs",
//       icon: Briefcase,
//       href: "/dashboard/jobs",
//       submenu: [
//         { label: "Active Jobs", href: "/dashboard/jobs" },
//         { label: "Draft Jobs", href: "/dashboard/jobs" },
//         { label: "Closed Jobs", href: "/dashboard/jobs" },
//         { label: "Job Templates", href: "/dashboard/jobs" },
//       ],
//     },
//     {
//       id: "candidates",
//       label: "Candidates",
//       icon: Users,
//       href: "/dashboard/candidates",
//       submenu: [
//         { label: "All Candidates", href: "/dashboard/candidates" },
//         { label: "Shortlisted", href: "/dashboard/candidates" },
//         { label: "Interviews", href: "/dashboard/candidates" },
//         { label: "Offers", href: "/dashboard/candidates" },
//       ],
//     },
//     {
//       id: "reports",
//       label: "Reports",
//       icon: BarChart3,
//       href: "/dashboard/reports",
//       submenu: [
//         { label: "Hiring Analytics", href: "/dashboard/reports" },
//         { label: "Performance", href: "/dashboard/reports" },
//         { label: "Pipeline", href: "/dashboard/reports" },
//       ],
//     },
//     {
//       id: "documents",
//       label: "Documents",
//       icon: FileText,
//       href: "/dashboard/documents",
//     },
//     {
//       id: "calendar",
//       label: "Calendar",
//       icon: Calendar,
//       href: "/dashboard/calendar",
//     },
//     {
//       id: "messages",
//       label: "Messages",
//       icon: Mail,
//       href: "/dashboard/messages",
//     },
//     {
//       id: "integrations",
//       label: "Integrations",
//       icon: Zap,
//       href: "/dashboard/integrations",
//       submenu: [{ label: "Business Settings", href: "/dashboard/business-settings" }],
//     },
//   ]

//   const bottomItems = [
//     { id: "help", label: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
//     { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
//   ]

//   const isActive = (href: string) => {
//     return pathname === href
//   }

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         {/* Logo */}
//         <div className="p-8 border-b border-sidebar-border flex items-center justify-center min-h-40">
//           <Link href="/dashboard" onClick={handleCloseOnMobile}>
//             <div className="relative w-32 h-32">
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
//                 alt="SwiftWave.AI"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           </Link>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             const isExpanded = expandedItems.includes(item.id)
//             const hasSubmenu = item.submenu && item.submenu.length > 0
//             const active = isActive(item.href)

//             return (
//               <div key={item.id}>
//                 {hasSubmenu ? (
//                   <button
//                     onClick={() => toggleExpand(item.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
//                       active
//                         ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                         : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="flex-1 text-left font-medium">{item.label}</span>
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
//                   </button>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     onClick={handleCloseOnMobile}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
//                       active
//                         ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                         : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="flex-1 text-left font-medium">{item.label}</span>
//                   </Link>
//                 )}

//                 {/* Submenu */}
//                 {hasSubmenu && isExpanded && (
//                   <div className="ml-4 space-y-1 mt-1">
//                     {item.submenu.map((subitem, idx) => (
//                       <Link
//                         key={idx}
//                         href={subitem.href}
//                         onClick={handleCloseOnMobile}
//                         className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
//                           isActive(subitem.href)
//                             ? "text-sidebar-accent-foreground bg-sidebar-accent"
//                             : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
//                         }`}
//                       >
//                         {subitem.label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </nav>

//         {/* Bottom Menu */}
//         <div className="border-t border-sidebar-border p-4 space-y-2">
//           {bottomItems.map((item) => {
//             const Icon = item.icon
//             const active = isActive(item.href)

//             return (
//               <Link
//                 key={item.id}
//                 href={item.href}
//                 onClick={handleCloseOnMobile}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                   active
//                     ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                     : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }


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
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["jobs", "candidates", "integrations"])
  const pathname = usePathname()

  const toggleExpand = (item: string) => {
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
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      href: "/dashboard/jobs",
      submenu: [
        { label: "Active Jobs", href: "/dashboard/jobs" },
        { label: "Draft Jobs", href: "/dashboard/jobs" },
        { label: "Closed Jobs", href: "/dashboard/jobs" },
        { label: "Job Templates", href: "/dashboard/jobs" },
      ],
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: Users,
      href: "/dashboard/candidates",
      submenu: [
        { label: "All Candidates", href: "/dashboard/candidates" },
        { label: "Shortlisted", href: "/dashboard/candidates" },
        { label: "Interviews", href: "/dashboard/candidates" },
        { label: "Offers", href: "/dashboard/candidates" },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      submenu: [
        { label: "Hiring Analytics", href: "/dashboard/reports" },
        { label: "Performance", href: "/dashboard/reports" },
        { label: "Pipeline", href: "/dashboard/reports" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
    },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
      href: "/dashboard/messages",
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Zap,
      href: "/dashboard/integrations",
      submenu: [{ label: "Business Settings", href: "/dashboard/business-settings" }],
    },
  ]

  const bottomItems = [
    { id: "help", label: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo and Close Button */}
        <div className="p-8 border-b border-sidebar-border flex items-center justify-between h-30">
          <Link href="/dashboard" onClick={handleCloseOnMobile}>
            <div className="relative w-32 h-32">
              <Image
                src="/logo.png"
                alt="SwiftWave.AI"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.id)
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const active = isActive(item.href)

            return (
              <div key={item.id}>
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleCloseOnMobile}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                  </Link>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.submenu.map((subitem, idx) => (
                      <Link
                        key={idx}
                        href={subitem.href}
                        onClick={handleCloseOnMobile}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive(subitem.href)
                            ? "text-sidebar-accent-foreground bg-sidebar-accent"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
