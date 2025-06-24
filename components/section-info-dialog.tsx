"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon, User, MapPin } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface SectionInfoProps {
  sectionId: number
  buttonVariant?: "default" | "outline" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

interface Section {
  id: number
  name: string
  description: string
  location: string
  managerId: number
}

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  phone: string
  status: string
}

export function SectionInfoDialog({
  sectionId,
  buttonVariant = "outline",
  buttonSize = "sm",
  className = "",
}: SectionInfoProps) {
  const [section, setSection] = useState<Section | null>(null)
  const [manager, setManager] = useState<Employee | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchSectionData = async () => {
      if (!open) return

      setLoading(true)
      setError(null)

      try {
        // Загрузка данных об участке
        const sectionResponse = await fetch(`/api/sections/${sectionId}`)
        if (!sectionResponse.ok) {
          throw new Error("Не удалось загрузить информацию об участке")
        }
        const sectionData = await sectionResponse.json()
        setSection(sectionData.section)

        // Загрузка данных о сотрудниках
        const employeesResponse = await fetch("/api/employees")
        if (employeesResponse.ok) {
          const employeesData = await employeesResponse.json()

          // Находим руководителя
          const manager = employeesData.employees.find((emp: Employee) => emp.id === sectionData.section.managerId)
          setManager(manager || null)

          // Находим сотрудников участка
          const sectionEmployees = employeesData.employees.filter(
            (emp: Employee) => emp.sectionId === sectionId && emp.status === "Активный",
          )
          setEmployees(sectionEmployees)
        }
      } catch (err) {
        console.error("Ошибка при загрузке данных об участке:", err)
        setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке данных")
      } finally {
        setLoading(false)
      }
    }

    fetchSectionData()
  }, [sectionId, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={className}>
          <InfoIcon className="h-4 w-4 mr-2" />
          Об участке
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          {loading ? (
            <Skeleton className="h-7 w-48" />
          ) : (
            <DialogTitle className="text-xl">{section?.name || "Информация об участке"}</DialogTitle>
          )}
          <DialogDescription>Подробная информация об участке и его сотрудниках</DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="py-6 text-center text-red-500">{error}</div>
        ) : loading ? (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Описание</h3>
              <p className="text-muted-foreground">{section?.description || "Описание отсутствует"}</p>
            </div>

            {section?.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Местоположение</h4>
                  <p className="text-sm text-muted-foreground">{section.location}</p>
                </div>
              </div>
            )}

            {manager && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Руководитель</h3>
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{manager.name}</div>
                    <div className="text-sm text-muted-foreground">{manager.position}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Сотрудники участка ({employees.length})</h3>
              {employees.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {employees.map((employee) => (
                    <div key={employee.id} className="p-3 border rounded-md">
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.position}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">На участке нет активных сотрудников</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
