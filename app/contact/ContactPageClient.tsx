"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  Building,
  FileText,
  MessageCircle,
  Users,
  Award,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface ContactData {
  id: string
  address: string
  phone: string
  email: string
  workingHours: string
  requisites: {
    name: string
    director: string
    accountant: string
    inn: string
    kpp: string
    ogrn: string
    address: string
    bankDetails: string
  }
}

export default function ContactPageClient() {
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const mockContactData = {
          id: "1",
          address: "140083, Московская область, г. Лыткарино, ст. Заводская",
          phone: "+7 (495) 552-15-50",
          email: "info@lppjt.ru",
          workingHours: "Пн-Пт: 9:00 - 18:00",
          requisites: {
            name: "ЗАО «Лыткаринское ППЖТ»",
            director: "Кравец Нина Алексеевна",
            accountant: "Солоделова Татьяна Владимировна",
            inn: "5026001223",
            kpp: "502701001",
            ogrn: "1025003177363",
            address: "140083, Московская область, г. Лыткарино, ст. Заводская",
            bankDetails: `ПАО «Сбербанк России» г. Москва
БИК: 044525225
Расчетный счет: 40702810140240100546
Кор. счет: 30101810400000000225
ОКПО: 03104645
ОКВЭД: 49.20`,
          },
        }
        setContactData(mockContactData)
      } catch (err) {
        console.error("Ошибка при загрузке контактных данных:", err)
        setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке контактных данных")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [])

  useEffect(() => {
    // Загружаем скрипт Яндекс Карт
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.charset = "utf-8"
    script.async = true
    script.src =
      "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ac1d7bc0b5d56a62bdec4658eca966fd01bc2e08b3edf1e3924a95127b7f51532&width=100%&height=100%&lang=ru_RU&scroll=true"

    const mapContainer = document.getElementById("yandex-map-container")
    if (mapContainer) {
      mapContainer.appendChild(script)
    }

    return () => {
      if (mapContainer && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const downloadRequisites = () => {
    if (!contactData) return

    const { name, director, accountant, inn, kpp, ogrn, address, bankDetails } = contactData.requisites

    const requisitesText = `
Реквизиты компании

Наименование организации: ${name}
Генеральный директор: ${director}
Главный бухгалтер: ${accountant}
Юридический и почтовый адрес: ${address}
ИНН/КПП: ${inn}/${kpp}
ОГРН: ${ogrn}

Банковские реквизиты:
${bankDetails}

Контакты:
Бухгалтерия: ${contactData.phone}
Приёмная: +7 (495) 552-15-50 / +7 (495) 552-16-42
Email: ${contactData.email}
Режим работы: ${contactData.workingHours}
  `.trim()

    const blob = new Blob([requisitesText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Реквизиты_ЛППЖТ.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto py-32 px-4">
          <div className="mb-8 text-center">
            <Skeleton className="h-16 w-96 mx-auto bg-slate-200" />
            <Skeleton className="h-6 w-[500px] mx-auto mt-4 bg-slate-200" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <Skeleton className="h-6 w-48 bg-slate-200 mb-4" />
                <Skeleton className="h-32 w-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !contactData) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto py-32 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-slate-800">Контактная информация</h1>
          </div>
          <Alert variant="destructive" className="bg-red-50 border-red-200 max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error || "Контактные данные не найдены"}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const stats = [
    { number: "63+", label: "Года опыта", icon: Award },
    { number: "24/7", label: "Поддержка", icon: Clock },
    { number: "100%", label: "Надежность", icon: MessageCircle },
    { number: "1000+", label: "Клиентов", icon: Users },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg3.jpg" alt="Контакты ЗАО Лыткаринское ППЖТ" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-slate-900/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">Свяжитесь с нами</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg">
              ЗАО «Лыткаринское ППЖТ» — ваш надежный партнер в сфере железнодорожных перевозок
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("contact-info")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Наши контакты
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => document.getElementById("requisites")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-slate-800 hover:bg-slate-900 text-white border-2 border-slate-800 hover:border-slate-900 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Реквизиты компании
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Прокрутите вниз</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section id="contact-info" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Контактная информация</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мы всегда готовы ответить на ваши вопросы и предоставить профессиональную консультацию
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Основные контакты</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Адрес</h4>
                      <p className="text-slate-600">{contactData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Бухгалтерия</h4>
                      <a
                        href={`tel:${contactData.phone}`}
                        className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
                      >
                        {contactData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Приёмная</h4>
                      <p className="text-slate-600">Тел/Факс: +7 (495) 552-15-50 / +7 (495) 552-16-42</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Режим работы</h4>
                      <p className="text-slate-600">{contactData.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Руководство</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Генеральный директор</h4>
                      <p className="text-slate-600">{contactData.requisites.director}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Главный бухгалтер</h4>
                      <p className="text-slate-600">{contactData.requisites.accountant}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Карта проезда</h3>
              <div
                id="yandex-map-container"
                className="h-96 bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Загрузка карты...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Image */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Наша инфраструктура</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Современное оборудование и развитая железнодорожная инфраструктура для качественного обслуживания
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 overflow-hidden rounded-2xl max-w-6xl mx-auto"
          >
            <Image src="/bg4.jpg" alt="Железнодорожная инфраструктура" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Company Requisites */}
      <section id="requisites" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Реквизиты компании</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Полная информация о компании для ведения деловой переписки и заключения договоров
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Основная информация</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Наименование организации</h4>
                      <p className="text-slate-600">{contactData.requisites.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Юридический адрес</h4>
                      <p className="text-slate-600">{contactData.requisites.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">ИНН / КПП / ОГРН</h4>
                      <p className="text-slate-600">
                        {contactData.requisites.inn} / {contactData.requisites.kpp} / {contactData.requisites.ogrn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Банковские реквизиты</h3>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {contactData.requisites.bankDetails}
                  </p>
                </div>
                <Button
                  onClick={downloadRequisites}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 mt-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Скачать реквизиты
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Готовы к сотрудничеству?</h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Свяжитесь с нами любым удобным способом. Наши специалисты готовы предоставить профессиональную
              консультацию и помочь решить ваши логистические задачи.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = `tel:${contactData.phone}`)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Позвонить сейчас
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => (window.location.href = `mailto:${contactData.email}`)}
                className="bg-slate-700 hover:bg-slate-800 text-white border-2 border-slate-700 hover:border-slate-800 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Написать письмо
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
