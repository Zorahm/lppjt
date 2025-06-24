"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Train,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  ChevronDown,
  Home,
  Info,
  Briefcase,
  Users,
  PhoneIcon,
  Building,
  LogIn,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "О компании", href: "/about", icon: Info },
  { name: "Услуги", href: "/services", icon: Briefcase },
  { name: "Вакансии", href: "/vacancies", icon: Users },
  { name: "Контрагенты", href: "/partners", icon: Building },
  { name: "Контакты", href: "/contact", icon: PhoneIcon },
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Добавляем эффект прокрутки для изменения стиля навигации
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300",
        scrolled ? "bg-background/95 shadow-md" : "bg-background/80",
      )}
    >
      {/* Верхняя панель с контактной информацией */}
      <div className="hidden border-b bg-muted/30 py-2 md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 transition-colors hover:text-primary">
              <Phone className="h-3 w-3" />
              <a href="tel:+74955521550">+7 (495) 552-15-50</a>
            </div>
            <div className="flex items-center gap-1 transition-colors hover:text-primary">
              <Mail className="h-3 w-3" />
              <a href="mailto:info@lppjt.ru">info@lppjt.ru</a>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>г. Лыткарино, ст. Заводская</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Пн-Пт: 9:00 - 18:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact#requisites"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <FileText className="h-3 w-3" />
              <span>Реквизиты</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Train className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">ЛППЖТ</span>
        </Link>

        <nav className="hidden md:flex md:gap-1">
          {navigation.map((item) =>
            item.name === "Услуги" ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 transition-all",
                      pathname.startsWith(item.href)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 animate-fade-in">
                  <DropdownMenuItem asChild>
                    <Link href="/services#delivery" className="cursor-pointer">
                      Подача-уборка вагонов
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#rental-areas" className="cursor-pointer">
                      Аренда площадок
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services#rental-tracks" className="cursor-pointer">
                      Аренда путей
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="cursor-pointer">
                      Все услуги
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={cn(
                  "transition-all",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="default" size="sm" className="hidden md:flex gap-2 btn-hover">
              <LogIn className="h-4 w-4" />
              Личный кабинет
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="grid gap-6 py-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Train className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">ЛППЖТ</span>
                </Link>
                <div className="grid gap-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}

                  {/* Подменю услуг для мобильной версии */}
                  <div className="ml-8 mt-2 grid gap-2">
                    <Link
                      href="/services#delivery"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                      Подача-уборка вагонов
                    </Link>
                    <Link
                      href="/services#rental-areas"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                      Аренда площадок
                    </Link>
                    <Link
                      href="/services#rental-tracks"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                      Аренда путей
                    </Link>
                  </div>
                </div>

                {/* Контактная информация в мобильном меню */}
                <div className="grid gap-2 rounded-md border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+74955521550" className="hover:text-primary">
                      +7 (495) 552-15-50
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:info@lppjt.ru" className="hover:text-primary">
                      info@lppjt.ru
                    </a>
                  </div>
                </div>

                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Личный кабинет
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
