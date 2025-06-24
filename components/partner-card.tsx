import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface PartnerCardProps {
  name: string
  logo: string
  description: string
  website?: string
  className?: string
}

export function PartnerCard({ name, logo, description, website, className }: PartnerCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10",
        className,
      )}
    >
      <div className="mb-4 flex h-16 items-center justify-center">
        <Image
          src={logo || "/placeholder.svg"}
          alt={name}
          width={120}
          height={64}
          className="max-h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mb-2 text-center text-xl font-bold text-white group-hover:text-blue-300">{name}</h3>

      <p className="mb-4 text-center text-blue-100/70">{description}</p>

      {website && (
        <div className="flex justify-center">
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            Посетить сайт
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="ml-1 h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
