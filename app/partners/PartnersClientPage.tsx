"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, Building, Users, Award, Star, Phone, MapPin } from "lucide-react"

const partners = [
  {
    id: 1,
    name: "ДиПОС ПКФ ООО",
    description: "Основной вид деятельности — производство, переработка и продажа металлопроката на территории России.",
    logo: "/placeholder.svg?height=100&width=150&text=DiPOS",
    website: "https://www.dipos.ru/",
    category: "Металлургия",
  },
  {
    id: 2,
    name: "Старатели ООО",
    description: "Производства и продажа сухих строительных смесей в России и странах СНГ.",
    logo: "/placeholder.svg?height=100&width=150&text=Starateli",
    website: "https://www.starateli.ru/",
    category: "Строительство",
  },
  {
    id: 3,
    name: "Ваш Дом Фирма ООО",
    description: "Производства и продажа железобетонных изделий в Москве и Московской области.",
    logo: "/placeholder.svg?height=100&width=150&text=VashDom",
    website: "https://www.vashdom.ru/",
    category: "Строительство",
  },
  {
    id: 4,
    name: "Мистраль Трейдинг ООО",
    description: "Производство риса, круп и дистрибьюция продуктов питания.",
    logo: "/placeholder.svg?height=100&width=150&text=Mistral",
    website: "https://www.mistral-trading.ru/",
    category: "Пищевая промышленность",
  },
  {
    id: 5,
    name: "ТРАК-БЕТОН ООО",
    description: "Производства товарного бетона различных марок и классов, кладочного и строительного раствора.",
    logo: "/placeholder.svg?height=100&width=150&text=TrakBeton",
    website: "https://www.trak-beton.ru/",
    category: "Строительство",
  },
  {
    id: 6,
    name: "Унистром-Трейдинг ООО",
    description: "Производства и продажа сухих строительных смесей в России и странах СНГ.",
    logo: "/placeholder.svg?height=100&width=150&text=Unistrom",
    website: "https://www.unistrom.ru/",
    category: "Строительство",
  },
  {
    id: 7,
    name: "АБЗ-Котельники ООО",
    description: "Производство и продажа асфальтобетонной смеси и товарного бетона.",
    logo: "/placeholder.svg?height=100&width=150&text=ABZ",
    website: "https://www.abz-kotelniki.ru/",
    category: "Строительство",
  },
  {
    id: 8,
    name: "Вторчермет НЛМК Центр ООО",
    description: "Прием и переработка черного металлолома.",
    logo: "/placeholder.svg?height=100&width=150&text=Vtorchermet",
    website: "https://www.vtorchermet.ru/",
    category: "Металлургия",
  },
  {
    id: 9,
    name: "Ареал ТД ООО",
    description: "Оптовая торговля строительными материалами и сантехникой.",
    logo: "/placeholder.svg?height=100&width=150&text=Areal",
    website: "https://arealtd.ru/",
    category: "Торговля",
  },
]

export default function PartnersClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPartners, setFilteredPartners] = useState(partners)

  useEffect(() => {
    const results = partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPartners(results)
  }, [searchTerm])

  const stats = [
    { number: "179", label: "партнеров", icon: Users },
    { number: "60+", label: "лет сотрудничества", icon: Award },
    { number: "100%", label: "надежность", icon: Star },
    { number: "24/7", label: "поддержка", icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg3.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">Наши партнеры</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed drop-shadow-lg">
              Мы гордимся долгосрочными отношениями с ведущими компаниями различных отраслей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="#partners">Посмотреть партнеров</Link>
              </Button>
              <Button
                asChild
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">Стать партнером</Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Прокрутите вниз</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Преимущества партнерства</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Работая с нами, вы получаете надежного партнера с многолетним опытом в железнодорожной отрасли
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Высокое качество",
                description: "Соблюдение всех стандартов и требований железнодорожной отрасли",
              },
              {
                icon: Users,
                title: "Опытная команда",
                description: "Профессиональные специалисты с многолетним опытом работы",
              },
              {
                icon: Star,
                title: "Надежность",
                description: "Стабильное выполнение обязательств и долгосрочное сотрудничество",
              },
              {
                icon: Phone,
                title: "Поддержка 24/7",
                description: "Круглосуточная техническая поддержка и консультации",
              },
              {
                icon: Building,
                title: "Современная инфраструктура",
                description: "Собственные железнодорожные пути и современное оборудование",
              },
              {
                icon: MapPin,
                title: "Удобное расположение",
                description: "Стратегическое расположение в Московской области",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section with Background */}
      <section id="partners" className="py-20 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/bg4.jpg')",
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Наши контрагенты</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Мы сотрудничаем с ведущими компаниями различных отраслей промышленности
            </p>

            {/* Search */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Поиск партнера..."
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center h-32 mb-4 bg-gray-50 rounded-xl">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      width={150}
                      height={100}
                      className="object-contain"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      {partner.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{partner.name}</h2>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{partner.description}</p>

                  <Button
                    asChild
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={partner.website} target="_blank" className="flex items-center justify-center gap-2">
                      Веб-сайт
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Партнеры не найдены</h3>
                <p className="text-gray-600 mb-4">Попробуйте изменить параметры поиска</p>
                <Button
                  onClick={() => setSearchTerm("")}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Сбросить поиск
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Стать нашим партнером</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Мы всегда открыты для новых партнерских отношений. Если вы заинтересованы в сотрудничестве с ЗАО
              «Лыткаринское ППЖТ», свяжитесь с нами для обсуждения возможностей взаимовыгодного партнерства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">Связаться с нами</Link>
              </Button>
              <Button
                asChild
                className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/services">Наши услуги</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
