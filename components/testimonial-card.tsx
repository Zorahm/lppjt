import { cn } from "@/lib/utils"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  image?: string
  className?: string
}

export function TestimonialCard({ quote, author, role, company, image, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10",
        className,
      )}
    >
      <div className="mb-4 text-blue-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 opacity-50"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>
      <p className="mb-6 text-blue-100/80 italic">{quote}</p>
      <div className="flex items-center">
        {image && (
          <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500/30">
            <Image
              src={image || "/placeholder.svg"}
              alt={author}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className="text-sm text-blue-100/70">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  )
}
