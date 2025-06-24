import Link from "next/link"
import { Mail, MapPin, Phone, Train, Clock, Shield, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40">
      {/* Основная часть футера */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <Train className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ЛППЖТ</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              ЗАО «Лыткаринское ППЖТ» — надежный партнер в сфере железнодорожных перевозок с 1961 года.
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <div className="flex items-start gap-2 group">
                <MapPin className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  140083, Московская область, г. Лыткарино, ст. Заводская
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <Phone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <a
                  href="tel:+74955521550"
                  className="text-sm text-muted-foreground group-hover:text-primary transition-colors"
                >
                  +7 (495) 552-15-50 / +7 (495) 552-16-42
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:info@lppjt.ru"
                  className="text-sm text-muted-foreground group-hover:text-primary transition-colors"
                >
                  info@lppjt.ru
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <Clock className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Пн-Пт: 9:00 - 18:00
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="inline-flex text-muted-foreground transition-colors hover:text-primary">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-flex text-muted-foreground transition-colors hover:text-primary">
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Вакансии
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Контрагенты
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/login" className="inline-flex text-muted-foreground transition-colors hover:text-primary">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services#delivery"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Подача-уборка вагонов
                </Link>
              </li>
              <li>
                <Link
                  href="/services#rental-areas"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Аренда площадок
                </Link>
              </li>
              <li>
                <Link
                  href="/services#rental-tracks"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Аренда железнодорожных путей
                </Link>
              </li>
              <li>
                <Link
                  href="/about#documents"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Документы
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#requisites"
                  className="inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  Реквизиты компании
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">О компании</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2 group">
                <Shield className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Более 60 лет опыта в сфере железнодорожных перевозок
                </p>
              </div>
              <div className="flex items-start gap-2 group">
                <Award className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Лауреат премии «За обустройство Земли Российской»
                </p>
              </div>
              <div className="flex items-start gap-2 group">
                <Users className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Квалифицированный персонал и современное оборудование
                </p>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full btn-hover">
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера с копирайтом */}
      <div className="border-t bg-muted/60 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2000-{currentYear} ЗАО «Лыткаринское ППЖТ». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              О компании
            </Link>
            <Link href="/contact" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Контакты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
