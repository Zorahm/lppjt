import Link from "next/link"
import { Train, Phone, Mail, MapPin, ArrowRight, ExternalLink } from "lucide-react"

export default function ModernFooter() {
  const currentYear = new Date().getFullYear()
  const foundingYear = 1961

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Основной контент футера */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Логотип и контакты */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl shadow-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ЛППЖТ</h3>
                <p className="text-xs text-blue-200">
                  Лыткаринское Предприятие промышленного железнодорожного транспорта
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-blue-100">140083, Московская область, г. Лыткарино, ст. Заводская</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm text-blue-100">+7 (495) 552-15-50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-100">info@lppjt.ru</span>
              </div>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white">Быстрые ссылки</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/about", text: "О компании" },
                { href: "/services", text: "Услуги" },
                { href: "/vacancies", text: "Вакансии" },
                { href: "/partners", text: "Контрагенты" },
                { href: "/contact", text: "Контакты" },
                { href: "/login", text: "Личный кабинет" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group flex items-center text-sm text-blue-200 hover:text-cyan-400 transition-colors duration-300"
                >
                  <ArrowRight className="h-3 w-3 mr-2 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-bold text-white mb-4">Статистика</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {currentYear - foundingYear}
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">Лет опыта</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  30+
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">км путей</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  9
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">Локомотивов</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  179
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider">Контрагентов</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="border-t border-white/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-blue-300">
              © {foundingYear}-{currentYear} ЗАО «Лыткаринское ППЖТ». Все права защищены.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                {[
                  { href: "/about", text: "О компании" },
                  { href: "/contact", text: "Контакты" },
                  { href: "/requisites", text: "Реквизиты" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-xs text-blue-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-1 text-xs text-blue-300">
                <span>Разработано</span>
                <a
                  href="https://zorahm.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1"
                >
                  <span className="font-medium">ZorahM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
