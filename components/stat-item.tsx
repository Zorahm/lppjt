import type React from "react"
import { cn } from "@/lib/utils"

interface StatItemProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  className?: string
}

export function StatItem({ value, label, icon, className }: StatItemProps) {
  return (
    <div className={cn("group flex flex-col items-center p-4 text-center", className)}>
      {icon && <div className="mb-3 text-blue-400">{icon}</div>}
      <div className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:to-cyan-200 md:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-sm text-blue-100/70 md:text-base">{label}</div>
    </div>
  )
}
