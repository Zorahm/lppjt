"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Calendar, History, MapPin, Shield, Users, Building, Target, Zap } from "lucide-react"

export default function AboutClientPage() {
  const [activeTab, setActiveTab] = useState("about")

  const stats = [
    { number: "60+", label: "лет на рынке", icon: Calendar },
    { number: "179", label: "контрагентов", icon: Users },
    { number: "30+", label: "км путей", icon: MapPin },
    { number: "9", label: "локомотивов", icon: Building },
  ]

  const achievements = [
    {
      title: "Меценат года",
      description: "От международного благотворительного фонда «Меценат столетия»",
      icon: Award,
    },
    {
      title: "За обустройство Земли Российской",
      description: "Лауреат премии",
      icon: Target,
    },
    {
      title: "Лучший налогоплательщик года",
      description: "Лауреат ежегодной международной премии",
      icon: Zap,
    },
    {
      title: "Правительственные награды",
      description: "Почетные грамоты РФ и Московской области",
      icon: Shield,
    },
  ]

  const advantages = [
    {
      icon: Shield,
      title: "Надежность",
      description:
        "Выполнение задач обеспечивается наличием более 30 км железнодорожного пути, 9 собственных локомотивов типа ТЭМ-2, ТЭМ-18.",
    },
    {
      icon: Users,
      title: "Профессионализм",
      description: "Многолетний опыт работы, профессионализм, ответственность и четкая организация маневровой работы.",
    },
    {
      icon: Award,
      title: "Качество услуг",
      description: "Экономическая политика направлена на сдерживание цен при высоком качестве предоставляемых услуг.",
    },
  ]

  const timeline = [
    {
      year: "1961",
      title: "Основание компании",
      description: "Основание компании путем объединения транспортных цехов предприятий Люберецкого района.",
    },
    {
      year: "1994",
      title: "Акционерное общество",
      description: "Преобразование в акционерное общество ЗАО «Лыткаринское ППЖТ».",
    },
    {
      year: "2000-е",
      title: "Модернизация",
      description: "Расширение клиентской базы, модернизация локомотивного парка и железнодорожной инфраструктуры.",
    },
    {
      year: "Сегодня",
      title: "Современность",
      description: "Компания продолжает успешно развиваться, имеет договорные отношения с 179 контрагентами.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg4.jpg" alt="Железнодорожный транспорт" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">О компании</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg">
              ЗАО «Лыткаринское ППЖТ» — надежный партнер в сфере железнодорожных перевозок с 1961 года
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
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
            <span className="text-sm mb-2">Узнать больше</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">ЗАО «Лыткаринское ППЖТ»</h2>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p className="text-lg">
                    ЗАО «Лыткаринское ППЖТ» как самостоятельное юридическое лицо организовано в июле 1961 года в
                    результате объединения транспортных цехов предприятий Люберецкого района с целью создания
                    специализированного железнодорожного предприятия.
                  </p>
                  <p className="text-lg">
                    Не меняя основной вид деятельности, которым является деятельность железнодорожного транспорта,
                    грузовые перевозки, ЗАО «Лыткаринское ППЖТ» действует как акционерное общество с 22 июля 1994 года.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <Calendar className="h-10 w-10 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Основано в 1961 году</h3>
                  <p className="text-sm text-slate-600">Более 60 лет опыта в железнодорожных перевозках</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <MapPin className="h-10 w-10 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Широкая география</h3>
                  <p className="text-sm text-slate-600">
                    Работаем в Котельниках, Люберцах, Лыткарино и промзоне Тураево
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
                <Image src="/bg3.jpg" alt="Железнодорожные вагоны РЖД" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Наши преимущества</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Многолетний опыт, современное оборудование и профессиональная команда — основа нашего успеха
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-slate-200"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{advantage.title}</h3>
                <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/bg4.jpg" alt="Background" fill className="object-cover" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">История развития</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Путь от небольшого транспортного предприятия до ведущей железнодорожной компании региона
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`flex gap-8 items-center mb-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <History className="h-10 w-10 text-white" />
                </div>
                <div
                  className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex-1 ${index % 2 === 1 ? "text-right" : ""}`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{milestone.year}</h3>
                  <h4 className="text-lg font-medium text-cyan-400 mb-3">{milestone.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Достижения и награды</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              За годы работы ЗАО «Лыткаринское ППЖТ» было удостоено множества наград и почетных званий
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group border border-slate-200"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{achievement.title}</h3>
                <p className="text-sm text-slate-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Принципы работы</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Принципами работы ЗАО «Лыткаринское ППЖТ» являются открытость, ответственность, добросовестность,
              профессионализм и уважение к контрагенту. Мы входим в единую транспортную систему Российской Федерации и
              подтверждаем традиции легендарной надежности российского железнодорожного транспорта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-cyan-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">Связаться с нами</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-cyan-600 hover:bg-white hover:text-cyan-600 px-8 py-3 text-lg font-semibold transition-all duration-300"
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
