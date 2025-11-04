// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Home, ArrowRight, Search } from "lucide-react"

// export default function NotFound() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   const handleGoHome = () => {
//     setIsLoading(true)
//     router.push("/")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 overflow-hidden relative">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       {/* Interactive cursor follower */}
//       {/* <div
//         className="fixed w-8 h-8 border-2 border-primary/30 rounded-full pointer-events-none transition-all duration-100 ease-out"
//         style={{
//           left: `${mousePosition.x - 16}px`,
//           top: `${mousePosition.y - 16}px`,
//         }}
//       ></div> */}

//       {/* Main content */}
//       <div className="relative z-10 max-w-2xl w-full">
//         <div className="text-center space-y-8">
//           {/* Animated 404 */}
//           <div className="relative h-32 flex items-center justify-center">
//             <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-pulse">
//               404
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-spin-slow"></div>
//             </div>
//           </div>

//           {/* Error message */}
//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground">Page Not Found</h1>
//             <p className="text-lg text-muted-foreground max-w-md mx-auto">
//               Oops! The page you're looking for seems to have wandered off into the digital void. Let's get you back on
//               track.
//             </p>
//           </div>

//           {/* Search suggestion */}
//           <div className="bg-card border border-border rounded-lg p-6 space-y-4">
//             <div className="flex items-center gap-3 text-muted-foreground">
//               <Search className="w-5 h-5" />
//               <span className="text-sm">The page might have been moved or deleted</span>
//             </div>
//           </div>

//           {/* Action buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//             <button
//               onClick={handleGoHome}
//               disabled={isLoading}
//               className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <Home className="w-5 h-5" />
//                 {isLoading ? "Going Home..." : "Back to Home"}
//               </span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
//             </button>

//             <Link
//               href="/dashboard"
//               className="group inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all duration-300"
//             >
//               Go to Dashboard
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {/* Helpful links */}
//           <div className="pt-8 border-t border-border">
//             <p className="text-sm text-muted-foreground mb-4">Need help? Try these:</p>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {[
//                 { label: "Home", href: "/" },
//                 { label: "Dashboard", href: "/dashboard" },
//                 { label: "Jobs", href: "/dashboard/jobs" },
//                 { label: "Candidates", href: "/dashboard/candidates" },
//                 { label: "Settings", href: "/dashboard/settings" },
//                 { label: "Help", href: "/dashboard/help" },
//               ].map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating elements */}
//       {/* <div className="absolute top-10 right-10 w-20 h-20 border-2 border-primary/20 rounded-lg rotate-45 animate-pulse"></div>
//       <div
//         className="absolute bottom-10 left-10 w-16 h-16 border-2 border-primary/10 rounded-full animate-pulse"
//         style={{ animationDelay: "0.5s" }}
//       ></div> */}
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Home, ArrowRight, Search } from "lucide-react"

// export default function NotFound() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const isDarkMode = document.documentElement.classList.contains("dark")
//     setIsDark(isDarkMode)

//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     const observer = new MutationObserver(() => {
//       const isDarkMode = document.documentElement.classList.contains("dark")
//       setIsDark(isDarkMode)
//     })

//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
//     window.addEventListener("mousemove", handleMouseMove)

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//       observer.disconnect()
//     }
//   }, [])

//   const handleGoHome = () => {
//     setIsLoading(true)
//     router.push("/")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 flex items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">
//       {/* Animated background elements - optimized for both themes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/15 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       {/* Interactive cursor follower - theme aware */}
//       {/* <div
//         className="fixed w-8 h-8 border-2 border-primary/30 dark:border-primary/50 rounded-full pointer-events-none transition-all duration-100 ease-out"
//         style={{
//           left: `${mousePosition.x - 16}px`,
//           top: `${mousePosition.y - 16}px`,
//         }}
//       ></div> */}

//       {/* Main content */}
//       <div className="relative z-10 max-w-2xl w-full">
//         <div className="text-center space-y-8">
//           {/* Animated 404 - enhanced for dark mode */}
//           <div className="relative h-32 flex items-center justify-center">
//             <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-primary/90 dark:via-primary dark:to-primary/80 animate-pulse">
//               404
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-32 h-32 border-4 border-primary/20 dark:border-primary/40 rounded-full animate-spin-slow"></div>
//             </div>
//           </div>

//           {/* Error message */}
//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground">Page Not Found</h1>
//             <p className="text-lg text-muted-foreground max-w-md mx-auto">
//               Oops! The page you're looking for seems to have wandered off into the digital void. Let's get you back on
//               track.
//             </p>
//           </div>

//           {/* Search suggestion - theme aware */}
//           <div className="bg-card dark:bg-card border border-border dark:border-border rounded-lg p-6 space-y-4 transition-colors duration-300">
//             <div className="flex items-center gap-3 text-muted-foreground">
//               <Search className="w-5 h-5" />
//               <span className="text-sm">The page might have been moved or deleted</span>
//             </div>
//           </div>

//           {/* Action buttons - enhanced for both themes */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//             <button
//               onClick={handleGoHome}
//               disabled={isLoading}
//               className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <Home className="w-5 h-5" />
//                 {isLoading ? "Going Home..." : "Back to Home"}
//               </span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
//             </button>

//             <Link
//               href="/dashboard"
//               className="group inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 font-semibold rounded-lg transition-all duration-300"
//             >
//               Go to Dashboard
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {/* Helpful links - theme aware */}
//           <div className="pt-8 border-t border-border dark:border-border transition-colors duration-300">
//             <p className="text-sm text-muted-foreground mb-4">Need help? Try these:</p>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {[
//                 { label: "Home", href: "/" },
//                 { label: "Dashboard", href: "/dashboard" },
//                 { label: "Jobs", href: "/dashboard/jobs" },
//                 { label: "Candidates", href: "/dashboard/candidates" },
//                 { label: "Settings", href: "/dashboard/settings" },
//                 { label: "Help", href: "/dashboard/help" },
//               ].map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-sm text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary hover:underline transition-colors duration-200"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating elements - theme aware */}
//       {/* <div className="absolute top-10 right-10 w-20 h-20 border-2 border-primary/20 dark:border-primary/40 rounded-lg rotate-45 animate-pulse"></div>
//       <div
//         className="absolute bottom-10 left-10 w-16 h-16 border-2 border-primary/10 dark:border-primary/30 rounded-full animate-pulse"
//         style={{ animationDelay: "0.5s" }}
//       ></div> */}
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, ArrowRight, Search } from "lucide-react"

export default function NotFound() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = theme === "dark" || (theme === null && prefersDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }

    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const handleGoHome = () => {
    setIsLoading(true)
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 flex items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">
      {/* Animated background elements - optimized for both themes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Interactive cursor follower - theme aware */}
      {/* <div
        className="fixed w-8 h-8 border-2 border-primary/30 dark:border-primary/50 rounded-full pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
        }}
      ></div> */}

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center space-y-8">
          {/* Animated 404 - enhanced for dark mode */}
          <div className="relative h-32 flex items-center justify-center">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-primary/90 dark:via-primary dark:to-primary/80 animate-pulse">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-primary/20 dark:border-primary/40 rounded-full animate-spin-slow"></div>
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off into the digital void. Let's get you back on
              track.
            </p>
          </div>

          {/* Search suggestion - theme aware */}
          <div className="bg-card dark:bg-card border border-border dark:border-border rounded-lg p-6 space-y-4 transition-colors duration-300">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Search className="w-5 h-5" />
              <span className="text-sm">The page might have been moved or deleted</span>
            </div>
          </div>

          {/* Action buttons - enhanced for both themes */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={handleGoHome}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary/50 hover:bg-primary/70 dark:bg-primary/90 dark:hover:bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-5 h-5" />
                {isLoading ? "Going Home..." : "Back to Home"}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>

            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary/50 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 font-semibold rounded-lg transition-all duration-300"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Helpful links - theme aware */}
          <div className="pt-8 border-t border-border dark:border-border transition-colors duration-300">
            <p className="text-sm text-muted-foreground mb-4">Need help? Try these:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Jobs", href: "/dashboard/jobs" },
                { label: "Candidates", href: "/dashboard/candidates" },
                { label: "Settings", href: "/dashboard/settings" },
                { label: "Help", href: "/dashboard/help" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary hover:underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements - theme aware */}
      {/* <div className="absolute top-10 right-10 w-20 h-20 border-2 border-primary/20 dark:border-primary/40 rounded-lg rotate-45 animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-16 h-16 border-2 border-primary/10 dark:border-primary/30 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div> */}
    </div>
  )
}
