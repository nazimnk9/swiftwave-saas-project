import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ToastProvider } from "@/components/auth/toast-provider"
import { AxiosRegistry } from "@/components/auth/axios-registry"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SwiftWave.AI - Less is More",
  description: "Professional SaaS Platform",
  generator: "aryan",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`font-sans antialiased`}>
        <ToastProvider>
          <AxiosRegistry />
          {children}
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
