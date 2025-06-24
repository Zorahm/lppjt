import type React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CardHoverProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  className?: string
  iconClassName?: string
}

export function CardHover({ title, description, icon, href, className, iconClassName }: CardHoverProps) {
  const CardComponent = href ? Link : "div"
  const props = href ? { href } : {}

  return (
    <CardComponent
      {...props}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10",
        href && "cursor-pointer",
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg",
            iconClassName,
          )}
        >
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-300">{title}</h3>
      <p className="text-blue-100/70 group-hover:text-blue-100/90">{description}</p>
      {href && (
        <div className="absolute bottom-6 right-6 translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      )}
    </CardComponent>
  )
}
