"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Moon, Sun, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface EmailVerificationPageProps {
  email: string
  onVerificationComplete: (token: string) => void
  onBackClick: () => void
  toggleTheme: () => void
  isDark: boolean
}

export default function EmailVerificationPage({
  email,
  onVerificationComplete,
  onBackClick,
  toggleTheme,
  isDark,
}: EmailVerificationPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!verificationCode.trim()) {
      setError("Please enter the verification code from your email")
      return
    }

    setIsLoading(true)
    try {
      // Simulate email verification - in real app, this would validate the token
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onVerificationComplete(verificationCode)
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
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

      {/* Back Button */}
      <button
        onClick={onBackClick}
        className="absolute top-4 left-4 p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-amAg8THqjWHBmPKqbcD6xZh8k5ZJlf.png"
              alt="SwiftWave.AI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Verify Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent a verification link to <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-2">Check your email for:</p>
                <ul className="space-y-1 text-xs">
                  <li>• A verification link to confirm your email</li>
                  <li>• A verification code (if link doesn't work)</li>
                  <li>• Check spam folder if you don't see it</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Verification Code</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter code from email"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 h-11 border-2 border-border rounded-lg focus:border-primary focus:outline-none bg-background text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base relative"
              >
                {isLoading ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
                    <span className="opacity-70">Verifying...</span>
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Didn't receive the email?</p>
                <button
                  type="button"
                  className="text-primary hover:bg-muted bg-gradient-to-r from-primary/20 to-primary/20 dark:hover:text-white/50 font-medium mt-1"
                  disabled={isLoading}
                >
                  Resend verification code
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
