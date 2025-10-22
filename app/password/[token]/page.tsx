// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import PasswordSetupPage from "@/components/auth/password-setup-page"

// type AuthStep = "signin" | "signup" | "dashboard"

// export default function PasswordVerificationPage() {
//   const params = useParams()
//   const token = params.token as string
//   const [isDark, setIsDark] = useState(false)
//   const [email, setEmail] = useState("")
//   const [currentStep, setCurrentStep] = useState<AuthStep>("signin")

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }

//     const urlParams = new URLSearchParams(window.location.search)
//     console.log("urlParams",urlParams);
    
//     const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
//     setEmail(emailParam)
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//     if (!isDark) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     }
//   }

//   const handleComplete = () => {
//     window.location.href = "/"
//     setCurrentStep("dashboard")
//   }

//   return (
//     <PasswordSetupPage
//       email={email}
//       onComplete={handleComplete}
//       toggleTheme={toggleTheme}
//       isDark={isDark}
//       token={token}
//     />
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import PasswordSetupPage from "@/components/auth/password-setup-page"
// import Dashboard from "@/components/dashboard/dashboard"

// export default function PasswordVerificationPage() {
//   const params = useParams()
//   const token = params.token as string
//   const [isDark, setIsDark] = useState(false)
//   const [email, setEmail] = useState("")
//   const [isPasswordSetupComplete, setIsPasswordSetupComplete] = useState(false)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }

//     const urlParams = new URLSearchParams(window.location.search)
//     const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
//     setEmail(emailParam)
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//     if (!isDark) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     }
//   }

//   const handleComplete = () => {
//     setIsPasswordSetupComplete(true)
//   }

//   const handleLogout = () => {
//     setIsPasswordSetupComplete(false)
//   }

//   if (isPasswordSetupComplete) {
//     return <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />
//   }

//   return (
//     <PasswordSetupPage
//       email={email}
//       onComplete={handleComplete}
//       toggleTheme={toggleTheme}
//       isDark={isDark}
//       token={token}
//     />
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import PasswordSetupPage from "@/components/auth/password-setup-page"
// import SignInPage from "@/components/auth/sign-in-page"
// import Dashboard from "@/components/dashboard/dashboard"

// export default function PasswordVerificationPage() {
//   const params = useParams()
//   const token = params.token as string
//   const [isDark, setIsDark] = useState(false)
//   const [email, setEmail] = useState("")
//   const [isPasswordSetupComplete, setIsPasswordSetupComplete] = useState(false)
//   const [currentStep, setCurrentStep] = useState<"password-setup" | "dashboard" | "signin">("password-setup")

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }

//     const urlParams = new URLSearchParams(window.location.search)
//     const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
//     setEmail(emailParam)
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//     if (!isDark) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     }
//   }

//   const handleComplete = () => {
//     setIsPasswordSetupComplete(true)
//     setCurrentStep("dashboard")
//   }

//   const handleLogout = () => {
//     setIsPasswordSetupComplete(false)
//     setCurrentStep("signin")
//   }

//   const handleSignIn = () => {
//     setCurrentStep("password-setup")
//   }

//   const handleSignUpClick = () => {
//     // Keep on sign in page or handle as needed
//   }

//   if (currentStep === "dashboard") {
//     return <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />
//   }

//   if (currentStep === "signin") {
//     return (
//       <SignInPage onSignIn={handleSignIn} onSignUpClick={handleSignUpClick} toggleTheme={toggleTheme} isDark={isDark} />
//     )
//   }

//   return (
//     <PasswordSetupPage
//       email={email}
//       onComplete={handleComplete}
//       toggleTheme={toggleTheme}
//       isDark={isDark}
//       token={token}
//     />
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import PasswordSetupPage from "@/components/auth/password-setup-page"
// import SignInPage from "@/components/auth/sign-in-page"
// import Dashboard from "@/components/dashboard/dashboard"

// export default function PasswordVerificationPage() {
//   const params = useParams()
//   const token = params.token as string
//   const [isDark, setIsDark] = useState(false)
//   const [email, setEmail] = useState("")
//   const [isPasswordSetupComplete, setIsPasswordSetupComplete] = useState(false)
//   const [currentStep, setCurrentStep] = useState<"password-setup" | "dashboard" | "signin">("password-setup")
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }

//     const urlParams = new URLSearchParams(window.location.search)
//     const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
//     setEmail(emailParam)

//     const authToken = localStorage.getItem("authToken")
//     if (authToken) {
//       setCurrentStep("dashboard")
//     }
//     setIsLoading(false)
//   }, [])

//   const toggleTheme = () => {
//     setIsDark(!isDark)
//     if (!isDark) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     }
//   }

//   const handleComplete = () => {
//     setIsPasswordSetupComplete(true)
//     setCurrentStep("signin")
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("authToken")
//     localStorage.removeItem("userEmail")
//     localStorage.removeItem("userPassword")
//     setIsPasswordSetupComplete(false)
//     setCurrentStep("signin")
//   }

//   const handleSignIn = () => {
//     setCurrentStep("password-setup")
//   }

//   const handleSignUpClick = () => {
//     // Keep on sign in page or handle as needed
//   }

//   if (isLoading) {
//     return null
//   }

//   if (currentStep === "dashboard") {
//     return <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />
//   }

//   if (currentStep === "signin") {
//     return (
//       <SignInPage onSignIn={handleSignIn} onSignUpClick={handleSignUpClick} toggleTheme={toggleTheme} isDark={isDark} />
//     )
//   }

//   return (
//     <PasswordSetupPage
//       email={email}
//       onComplete={handleComplete}
//       toggleTheme={toggleTheme}
//       isDark={isDark}
//       token={token}
//     />
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PasswordSetupPage from "@/components/auth/password-setup-page"

export default function PasswordVerificationPage() {
  const params = useParams()
  const token = params.token as string
  const [isDark, setIsDark] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get("email") || localStorage.getItem("verificationEmail") || "user@example.com"
    setEmail(emailParam)

    setIsLoading(false)
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

  if (isLoading) {
    return null
  }

  return <PasswordSetupPage email={email} toggleTheme={toggleTheme} isDark={isDark} token={token} />
}
