import type React from "react"
import { cn } from "@/lib/utils"

interface ContactInfoItemProps {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
  className?: string
}

export function ContactInfoItem({ icon, title, content, className }: ContactInfoItemProps) {
  return (
    <div
      className={cn(
        "group flex items-start rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10",
        className,
      )}
    >
      <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="mt-1 text-blue-100/80">{content}</div>
      </div>
    </div>
  )
}
