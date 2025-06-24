import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  className?: string
  children: React.ReactNode
  id?: string
  dark?: boolean
}

export function SectionContainer({ className, children, id, dark = false }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 sm:py-24",
        dark ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" : "bg-white",
        className,
      )}
    >
      {dark && (
        <>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </>
      )}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
