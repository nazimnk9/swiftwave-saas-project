"use client"

import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"

export function AxiosRegistry() {
    const router = useRouter()

    useEffect(() => {
        // Add a response interceptor
        const interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or unauthorized
                    deleteCookie("authToken")
                    localStorage.removeItem("userEmail")
                    localStorage.removeItem("userPassword")
                    localStorage.removeItem("userFirstName")
                    localStorage.removeItem("userLastName")
                    localStorage.removeItem("userCompany")

                    // Redirect to login page
                    router.push("/")
                }
                return Promise.reject(error)
            },
        )

        // Cleanup interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor)
        }
    }, [router])

    return null
}
