import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CalendarIcon, MapPinIcon, BuildingIcon } from "lucide-react"

interface VacancyCardProps {
  vacancy: {
    id: string
    title: string
    department: string
    location: string
    salary?: string
    description: string
    requirements: string
    responsibilities: string
    benefits?: string
    contactEmail?: string
    contactPhone?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  className?: string
}

export function VacancyCard({ vacancy, className }: VacancyCardProps) {
  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    } catch {
      return "Недавно"
    }
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {vacancy.title}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">{vacancy.department}</CardDescription>
          </div>
          {vacancy.salary && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              {vacancy.salary}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPinIcon className="mr-1 h-3 w-3" />
            <span>{vacancy.location}</span>
          </div>
          <div className="flex items-center">
            <BuildingIcon className="mr-1 h-3 w-3" />
            <span>{vacancy.department}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>{formatDate(vacancy.updatedAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{vacancy.description}</p>

          <div className="pt-2 border-t border-gray-100">
            <Link href={`/vacancies/${vacancy.id}`}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                Подробнее о вакансии
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
