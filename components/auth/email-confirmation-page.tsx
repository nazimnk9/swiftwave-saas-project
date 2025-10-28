"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Moon, Sun, CheckCircle } from "lucide-react"
import Image from "next/image"

interface EmailConfirmationPageProps {
  email: string
  onSignInClick: () => void
  toggleTheme: () => void
  isDark: boolean
}

export default function EmailConfirmationPage({
  email,
  onSignInClick,
  toggleTheme,
  isDark,
}: EmailConfirmationPageProps) {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    // Simulate resend email
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            <Image src="/logo.png" alt="SwiftWave.AI Logo" fill className="object-contain" />
          </div>
        </div>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-primary">Check Your Email</CardTitle>
            <CardDescription className="text-base">A confirmation link has been sent to your email</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <p className="text-sm font-medium text-foreground break-all">{email}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Please click the confirmation link in your email to verify your account.</p>
              <p>If you don't see the email, check your spam folder or try resending it.</p>
            </div>

            {/* <Button
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              className="w-full h-11 border-2 border-border hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground font-semibold bg-transparent transition-colors"
            >
              {isResending ? "Resending..." : "Resend Confirmation Email"}
            </Button> */}

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Ready to sign in?</span>
              </div>
            </div>

            <Button
              onClick={onSignInClick}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            >
              Sign In
            </Button> */}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By confirming your email, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
