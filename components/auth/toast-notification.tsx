// "use client"

// import { useEffect, useState } from "react"
// import { X } from "lucide-react"

// interface ToastNotificationProps {
//   title: string
//   description: string | React.ReactNode
//   variant?: "default" | "destructive"
//   onClose: () => void
//   autoClose?: boolean
//   duration?: number
// }

// export function ToastNotification({
//   title,
//   description,
//   variant = "default",
//   onClose,
//   autoClose = true,
//   duration = 4000,
// }: ToastNotificationProps) {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     if (autoClose) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onClose()
//       }, duration)
//       return () => clearTimeout(timer)
//     }
//   }, [autoClose, duration, onClose])

//   if (!isVisible) return null

//   const bgColor = variant === "destructive" ? "bg-destructive/90" : "bg-primary/90"
//   const textColor = variant === "destructive" ? "text-destructive-foreground" : "text-primary-foreground"

//   return (
//     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
//       <div
//         className={`${bgColor} ${textColor} rounded-lg shadow-2xl p-4 backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300`}
//       >
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex-1">
//             <h3 className="font-semibold text-base mb-1">{title}</h3>
//             <p className="text-sm opacity-90">{description}</p>
//           </div>
//           <button
//             onClick={() => {
//               setIsVisible(false)
//               onClose()
//             }}
//             className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useEffect, useState } from "react"
// import { X } from "lucide-react"

// interface ToastNotificationProps {
//   title: string
//   description: string
//   variant?: "default" | "destructive"
//   onClose: () => void
//   autoClose?: boolean
//   duration?: number
// }

// export function ToastNotification({
//   title,
//   description,
//   variant = "default",
//   onClose,
//   autoClose = true,
//   duration = 4000,
// }: ToastNotificationProps) {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     if (autoClose) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onClose()
//       }, duration)
//       return () => clearTimeout(timer)
//     }
//   }, [autoClose, duration, onClose])

//   if (!isVisible) return null

//   const bgColor = variant === "destructive" ? "bg-destructive/90" : "bg-primary/90"
//   const textColor = variant === "destructive" ? "text-destructive-foreground" : "text-primary-foreground"

//   return (
//     <div className="fixed top-4 right-4 z-[9999] w-full max-w-md px-4">
//       <div
//         className={`${bgColor} ${textColor} rounded-lg shadow-2xl p-4 backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300`}
//       >
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex-1">
//             <h3 className="font-semibold text-base mb-1">{title}</h3>
//             <p className="text-sm opacity-90">{description}</p>
//           </div>
//           <button
//             onClick={() => {
//               setIsVisible(false)
//               onClose()
//             }}
//             className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState, ReactNode } from "react"
import { X } from "lucide-react"

interface ToastNotificationProps {
  title: string
  description: ReactNode // Changed from string to ReactNode
  variant?: "default" | "destructive"
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export function ToastNotification({
  title,
  description,
  variant = "default",
  onClose,
  autoClose = true,
  duration = 4000,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  if (!isVisible) return null

  const bgColor = variant === "destructive" ? "bg-destructive/90" : "bg-primary/90"
  const textColor = variant === "destructive" ? "text-destructive-foreground" : "text-primary-foreground"

  return (
    <div className="fixed top-4 right-4 z-[9999] w-full max-w-md px-4">
      <div
        className={`${bgColor} ${textColor} rounded-lg shadow-2xl p-4 backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}