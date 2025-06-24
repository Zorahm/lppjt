"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  Train,
  ChevronDown,
  Clock,
  Award,
  User,
  Calendar,
  LogOut,
  LayoutDashboard,
} from "lucide-react"

const services = [
  {
    title: "Подача-уборка вагонов",
    description: "Профессиональная подача и уборка железнодорожных вагонов",
    href: "/services#podacha",
  },
  {
    title: "Аренда путей",
    description: "Предоставление железнодорожных путей в аренду",
    href: "/services#arenda-putey",
  },
  {
    title: "Аренда площадок",
    description: "Складские и производственные площадки",
    href: "/services#arenda-ploshchadok",
  },
  {
    title: "Логистические услуги",
    description: "Комплексные решения для грузоперевозок",
    href: "/services#logistics",
  },
]

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О компании", href: "/about" },
  { name: "Услуги", href: "/services", hasDropdown: true },
  { name: "Вакансии", href: "/vacancies" },
  { name: "Партнеры", href: "/partners" },
  { name: "Контакты", href: "/contact" },
]

interface UserData {
  id: string
  name: string
  position?: string
  department?: string
  role: string
}

export default function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(false)
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Загрузка данных пользователя
  useEffect(() => {
    if (session?.user?.id && !userDataLoaded && !loadingUserData) {
      setLoadingUserData(true)

      // Для фиксированного админа
      if (session.user.email === "admin@lppzt.ru") {
        setUserData({
          id: "1",
          name: "Системный администратор",
          position: "Системный администратор",
          department: "IT отдел",
          role: "admin",
        })
        setLoadingUserData(false)
        setUserDataLoaded(true)
        return
      }

      // Для обычных пользователей загружаем из API
      fetch(`/api/employees/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.employee) {
            setUserData({
              id: data.employee.id,
              name:
                data.employee.name ||
                `${data.employee.lastName || ""} ${data.employee.firstName || ""} ${data.employee.middleName || ""}`.trim(),
              position: data.employee.position,
              department: data.employee.department,
              role: data.employee.role || "employee",
            })
          }
        })
        .catch((error) => {
          console.error("Ошибка загрузки данных пользователя:", error)
        })
        .finally(() => {
          setLoadingUserData(false)
          setUserDataLoaded(true)
        })
    }
  }, [session?.user?.id, userDataLoaded, loadingUserData, session?.user?.email])

  // Сброс состояния при выходе из системы
  useEffect(() => {
    if (status === "unauthenticated") {
      setUserData(null)
      setUserDataLoaded(false)
      setLoadingUserData(false)
    }
  }, [status])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      admin: "Администратор",
      hr: "HR менеджер",
      section_manager: "Начальник участка",
      employee: "Сотрудник",
    }
    return roleNames[role] || "Сотрудник"
  }

  const canAccessDashboard = (role: string) => {
    return ["admin", "hr", "section_manager"].includes(role)
  }

  return (
    <>
      {/* Top Info Bar - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>Пн-Пт: 9:00 - 18:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span>С 1961 года на рынке</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+7 (495) 552-15-50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@lppjt.ru</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Train className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg lg:text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ЛППЖТ
                </div>
                <div className="text-xs lg:text-sm text-slate-500 -mt-1">Железнодорожный транспорт</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          pathname.startsWith("/services")
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Services Dropdown */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200/50 backdrop-blur-sm transition-all duration-200 ${
                          isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                        }`}
                      >
                        <div className="p-2">
                          {services.map((service) => (
                            <Link
                              key={service.title}
                              href={service.href}
                              className="block p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                            >
                              <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                                {service.title}
                              </div>
                              <div className="text-sm text-slate-500 mt-1">{service.description}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              {status === "loading" ? (
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2 hover:bg-slate-50">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-slate-800">
                          {loadingUserData ? (
                            <Skeleton className="h-4 w-24" />
                          ) : (
                            userData?.name || session.user?.name || "Пользователь"
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {loadingUserData ? (
                            <Skeleton className="h-3 w-16" />
                          ) : (
                            getRoleDisplayName(userData?.role || session.user?.role || "employee")
                          )}
                        </div>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-sm">
                          {userData?.name
                            ? getInitials(userData.name)
                            : session.user?.name
                              ? getInitials(session.user.name)
                              : "У"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{userData?.name || session.user?.name}</p>
                      <p className="text-xs text-slate-500">{userData?.position || "Сотрудник"}</p>
                      {userData?.department && <p className="text-xs text-slate-400">{userData.department}</p>}
                    </div>
                    <DropdownMenuSeparator />

                    {userData?.role === "employee" ? (
                      <DropdownMenuItem asChild>
                        <Link href="/schedule" className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          График работы
                        </Link>
                      </DropdownMenuItem>
                    ) : canAccessDashboard(userData?.role || session.user?.role || "employee") ? (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Панель управления
                        </Link>
                      </DropdownMenuItem>
                    ) : null}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Link href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Войти
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0">
                <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Train className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-slate-800">ЛППЖТ</div>
                        <div className="text-sm text-slate-500">Железнодорожный транспорт</div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile User Info */}
                  {session && (
                    <div className="p-6 border-b border-slate-200 bg-slate-50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                            {userData?.name
                              ? getInitials(userData.name)
                              : session.user?.name
                                ? getInitials(session.user.name)
                                : "У"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800">{userData?.name || session.user?.name}</div>
                          <div className="text-sm text-slate-500">
                            {getRoleDisplayName(userData?.role || session.user?.role || "employee")}
                          </div>
                          {userData?.position && <div className="text-xs text-slate-400">{userData.position}</div>}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        {userData?.role === "employee" ? (
                          <Button asChild variant="outline" size="sm" className="w-full justify-start">
                            <Link href="/schedule" onClick={() => setIsMobileMenuOpen(false)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              График работы
                            </Link>
                          </Button>
                        ) : canAccessDashboard(userData?.role || session.user?.role || "employee") ? (
                          <Button asChild variant="outline" size="sm" className="w-full justify-start">
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Панель управления
                            </Link>
                          </Button>
                        ) : null}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Выйти
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {navigation.map((item) => (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                              pathname === item.href ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-medium">{item.name}</span>
                            {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                          </Link>

                          {item.hasDropdown && (
                            <div className="ml-4 mt-2 space-y-1">
                              {services.map((service) => (
                                <Link
                                  key={service.title}
                                  href={service.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block p-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>

                    {/* Mobile Login Button */}
                    {!session && (
                      <div className="mt-6">
                        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <User className="mr-2 h-4 w-4" />
                            Войти в систему
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Mobile Contact Info */}
                  {!session && (
                    <div className="p-6 border-t border-slate-200 bg-slate-50">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-green-500" />
                          <span className="text-slate-700">+7 (495) 552-15-50</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <span className="text-slate-700">info@lppjt.ru</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-red-500" />
                          <span className="text-slate-700">г. Лыткарино</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
