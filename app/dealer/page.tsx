"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DealerPage() {
  const router = useRouter()
  
  useEffect(() => {
    const auth = localStorage.getItem("dealerAuth")
    if (auth) {
      router.push("/dealer/dashboard")
    } else {
      router.push("/dealer/login")
    }
  }, [router])
  
  return null
}