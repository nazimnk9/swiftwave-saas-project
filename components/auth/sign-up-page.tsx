"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Moon, Sun, User, Phone, Building, MapPin } from "lucide-react"
import Image from "next/image"

interface SignUpPageProps {
  onSignUp: (userData: UserData) => void
  onSignInClick: () => void
  toggleTheme: () => void
  isDark: boolean
}

export interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  country: string
}

export default function SignUpPage({ onSignUp, onSignInClick, toggleTheme, isDark }: SignUpPageProps) {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    country: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.firstName.trim()) {
      setError("First name is required")
      return
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required")
      return
    }
    if (!formData.email) {
      setError("Email is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email")
      return
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return
    }
    if (!formData.company.trim()) {
      setError("Company name is required")
      return
    }
    if (!formData.position.trim()) {
      setError("Position is required")
      return
    }
    if (!formData.country.trim()) {
      setError("Country is required")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onSignUp(formData)
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

      <div className="w-full max-w-2xl">
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
            <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
            <CardDescription className="text-base">Join SwiftWave.AI and start your journey</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="pl-10 h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="pl-10 h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 h-11 border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 h-11 border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              {/* Company and Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="pl-10 h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Position</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="position"
                      placeholder="HR Manager"
                      value={formData.position}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="pl-10 h-11 border-2 border-border focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Country Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10 h-11 border-2 border-border focus:border-primary"
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
                    <span className="opacity-70">Creating Account...</span>
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={onSignInClick}
                disabled={isLoading}
                className="w-full h-11 border-2 border-border hover:bg-muted text-foreground font-semibold bg-transparent"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
