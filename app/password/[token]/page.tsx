"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PasswordSetupPage from "@/components/auth/password-setup-page"

export default function PasswordVerificationPage() {
  const params = useParams()
  const token = params.token as string
  const [isDark, setIsDark] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const urlParams = new URLSearchParams(window.location.search)
    console.log("urlParams",urlParams);
    
    const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
    setEmail(emailParam)
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

  const handleComplete = () => {
    window.location.href = "/"
  }

  return (
    <PasswordSetupPage
      email={email}
      onComplete={handleComplete}
      toggleTheme={toggleTheme}
      isDark={isDark}
      token={token}
    />
  )
}
