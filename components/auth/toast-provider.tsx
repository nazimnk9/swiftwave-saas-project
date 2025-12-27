"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { ToastNotification } from "@/components/auth/toast-notification"

interface ToastData {
    title: string
    description: string | ReactNode
    variant?: "default" | "destructive"
    duration?: number
}

interface ToastContextType {
    toast: (data: ToastData) => void
    showToast: (data: ToastData) => void // Alias for flexibility
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [currentToast, setCurrentToast] = useState<ToastData | null>(null)

    const showToast = (data: ToastData) => {
        setCurrentToast(data)
    }

    // Allow "toast" to be used as a function name similar to shadcn
    const toast = showToast

    return (
        <ToastContext.Provider value={{ toast, showToast }}>
            {children}
            {currentToast && (
                <ToastNotification
                    key={Date.now()} // Force re-mount to restart animations/timers if new toast comes rapidly
                    title={currentToast.title}
                    description={currentToast.description}
                    variant={currentToast.variant}
                    onClose={() => setCurrentToast(null)}
                    duration={currentToast.duration}
                />
            )}
        </ToastContext.Provider>
    )
}

export function useToastNotification() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToastNotification must be used within a ToastProvider")
    }
    return context
}
