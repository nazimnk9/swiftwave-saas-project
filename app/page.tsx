// "use client"

// import { useState, useEffect } from "react"
// import SignUpPage, { type UserData } from "@/components/auth/sign-up-page"
// import SignInPage from "@/components/auth/sign-in-page"
// import PasswordSetupPage from "@/components/auth/password-setup-page"
// import Dashboard from "@/components/dashboard/dashboard"
// import { ThemeProvider } from "@/components/theme-provider"

// type AuthStep = "signin" | "signup" | "password-setup" | "dashboard"

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState<AuthStep>("signin")
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }
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

//   const handleSignUpClick = (data: UserData) => {
//     setUserData(data)
//     setCurrentStep("password-setup")
//   }

//   const handlePasswordSetup = () => {
//     setCurrentStep("dashboard")
//   }

//   const handleSignIn = () => {
//     setCurrentStep("dashboard")
//   }

//   const handleLogout = () => {
//     setCurrentStep("signin")
//     setUserData(null)
//   }

//   return (
//     <ThemeProvider>
//       <div className={isDark ? "dark" : ""}>
//         {currentStep === "signin" && (
//           <SignInPage
//             onSignIn={handleSignIn}
//             onSignUpClick={() => setCurrentStep("signup")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "signup" && (
//           <SignUpPage
//             onSignUp={handleSignUpClick}
//             onSignInClick={() => setCurrentStep("signin")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "password-setup" && userData && (
//           <PasswordSetupPage
//             email={userData.email}
//             onComplete={handlePasswordSetup}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "dashboard" && <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />}
//       </div>
//     </ThemeProvider>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import SignUpPage, { type UserData } from "@/components/auth/sign-up-page"
// import SignInPage from "@/components/auth/sign-in-page"
// import Dashboard from "@/components/dashboard/dashboard"
// import { ThemeProvider } from "@/components/theme-provider"

// type AuthStep = "signin" | "signup" | "dashboard"

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState<AuthStep>("signin")
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }
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

//   const handleSignUpClick = (data: UserData) => {
//     // The sign-up page handles the navigation
//     setCurrentStep("signup")
//   }

//   const handleSignIn = () => {
//     setCurrentStep("dashboard")
//   }

//   const handleLogout = () => {
//     setCurrentStep("signin")
//   }

//   return (
//     <ThemeProvider>
//       <div className={isDark ? "dark" : ""}>
//         {currentStep === "signin" && (
//           <SignInPage
//             onSignIn={handleSignIn}
//             onSignUpClick={() => setCurrentStep("signup")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "signup" && (
//           <SignUpPage
//             onSignUp={handleSignUpClick}
//             onSignInClick={() => setCurrentStep("signin")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "dashboard" && <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />}
//       </div>
//     </ThemeProvider>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import SignUpPage, { type UserData } from "@/components/auth/sign-up-page"
// import SignInPage from "@/components/auth/sign-in-page"
// import PasswordSetupPage from "@/components/auth/password-setup-page"
// import Dashboard from "@/components/dashboard/dashboard"
// import { ThemeProvider } from "@/components/theme-provider"

// type AuthStep = "signin" | "signup" | "password-setup" | "dashboard"

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState<AuthStep>("signin")
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [isDark, setIsDark] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDark(true)
//       document.documentElement.classList.add("dark")
//     }

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

//   const handleSignUpClick = (data: UserData) => {
//     setUserData(data)
//     setCurrentStep("password-setup")
//   }

//   const handlePasswordSetup = () => {
//     setCurrentStep("signin")
//   }

//   const handleSignIn = () => {
//     setCurrentStep("dashboard")
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("authToken")
//     localStorage.removeItem("userEmail")
//     localStorage.removeItem("userPassword")
//     setCurrentStep("signin")
//     setUserData(null)
//   }

//   if (isLoading) {
//     return null
//   }

//   return (
//     <ThemeProvider>
//       <div className={isDark ? "dark" : ""}>
//         {currentStep === "signin" && (
//           <SignInPage
//             onSignIn={handleSignIn}
//             onSignUpClick={() => setCurrentStep("signup")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "signup" && (
//           <SignUpPage
//             onSignUp={handleSignUpClick}
//             onSignInClick={() => setCurrentStep("signin")}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "password-setup" && userData && (
//           <PasswordSetupPage
//             email={userData.email}
//             onComplete={handlePasswordSetup}
//             toggleTheme={toggleTheme}
//             isDark={isDark}
//           />
//         )}
//         {currentStep === "dashboard" && <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />}
//       </div>
//     </ThemeProvider>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import SignUpPage from "@/components/auth/sign-up-page"
import SignInPage from "@/components/auth/sign-in-page"
import PasswordSetupPage from "@/components/auth/password-setup-page"
import Dashboard from "@/components/dashboard/dashboard"
import { ThemeProvider } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

type AuthStep = "signin" | "signup" | "password-setup" | "dashboard"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("signin")
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const authToken = localStorage.getItem("authToken")
    if (authToken) {
      setCurrentStep("dashboard")
    }
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

  const handleSignIn = () => {
     setCurrentStep("dashboard")
   }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPassword")
    //router.push("/")
    setCurrentStep("signin")
  }

  if (isLoading) {
    return null
  }

  return (
    <ThemeProvider>
      <div className={isDark ? "dark" : ""}>
        {currentStep === "signin" && (
          <SignInPage onSignIn={handleSignIn} onSignUpClick={() => setCurrentStep("signup")} toggleTheme={toggleTheme} isDark={isDark} />
        )}
        {currentStep === "signup" && (
          <SignUpPage onSignInClick={() => setCurrentStep("signin")} toggleTheme={toggleTheme} isDark={isDark} />
        )}
        {currentStep === "password-setup" && (
          <PasswordSetupPage
            email={localStorage.getItem("userEmail") || ""}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}
        {currentStep === "dashboard" && <Dashboard onLogout={handleLogout} toggleTheme={toggleTheme} isDark={isDark} />}
      </div>
    </ThemeProvider>
  )
}
