"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import ModernNavigation from "@/components/modern-navigation"
import ModernFooter from "@/components/modern-footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <ModernNavigation />}
      <main className="flex-1">{children}</main>
      {!isDashboard && <ModernFooter />}
    </div>
  )
}
