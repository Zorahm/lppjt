import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  gradient?: boolean
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, gradient = true, className, children }: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl",
              gradient ? "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" : "text-white",
            )}
          >
            {title}
          </h1>
          {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100/80">{subtitle}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </div>
  )
}
