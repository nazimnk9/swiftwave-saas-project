"use client"

import { useState, useEffect } from "react"
import SignUpPage, { type UserData } from "@/components/auth/sign-up-page"
import SignInPage from "@/components/auth/sign-in-page"
import PasswordSetupPage from "@/components/auth/password-setup-page"
import Dashboard from "@/components/dashboard/dashboard"
import { ThemeProvider } from "@/components/theme-provider"

type AuthStep = "signin" | "signup" | "password-setup" | "dashboard"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("signin")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
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

  const handleSignUpClick = (data: UserData) => {
    setUserData(data)
    setCurrentStep("password-setup")
  }

  const handlePasswordSetup = () => {
    setCurrentStep("dashboard")
  }

  const handleSignIn = () => {
    setCurrentStep("dashboard")
  }

  const handleLogout = () => {
    setCurrentStep("signin")
    setUserData(null)
  }

  return (
    <ThemeProvider>
      <div className={isDark ? "dark" : ""}>
        {currentStep === "signin" && (
          <SignInPage
            onSignIn={handleSignIn}
            onSignUpClick={() => setCurrentStep("signup")}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}
        {currentStep === "signup" && (
          <SignUpPage
            onSignUp={handleSignUpClick}
            onSignInClick={() => setCurrentStep("signin")}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}
        {currentStep === "password-setup" && userData && (
          <PasswordSetupPage
            email={userData.email}
            onComplete={handlePasswordSetup}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}
        {currentStep === "dashboard" && <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />}
      </div>
    </ThemeProvider>
  )
}
