"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Train, Warehouse, Map, Clock, Shield, Phone, CheckCircle, Users, Award, Zap } from "lucide-react"

export default function ServicesClientPage() {
  const router = useRouter()

  const redirectToContact = (e) => {
    e.preventDefault()
    router.push("/contact")
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Add a small offset to account for the fixed header
      const yOffset = -100
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }

  const services = [
    {
      icon: Train,
      title: "Подача-уборка вагонов",
      description: "Подача вагонов к фронтам погрузки-выгрузки по станциям примыкания",
      features: ["Надежность и своевременность", "Широкая география", "Оперативность"],
      anchor: "podacha",
    },
    {
      icon: Warehouse,
      title: "Аренда площадок",
      description: "Аренда площадок под погрузку-выгрузку с железнодорожными путями",
      features: ["800 кв.м - 8 вагонов", "1620 кв.м - 14 вагонов", "Круглосуточная работа"],
      anchor: "arenda-ploshchadok",
    },
    {
      icon: Map,
      title: "Аренда железнодорожных путей",
      description: "Предоставление в аренду железнодорожных путей для различных целей",
      features: ["Краткосрочная аренда", "Долгосрочная аренда", "Техническая поддержка"],
      anchor: "arenda-putey",
    },
  ]

  const stats = [
    { number: "63+", label: "Года опыта", icon: Award },
    { number: "1000+", label: "Довольных клиентов", icon: Users },
    { number: "24/7", label: "Круглосуточная работа", icon: Clock },
    { number: "100%", label: "Гарантия качества", icon: Shield },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg4.jpg" alt="Железнодорожные услуги" fill className="object-cover" priority />
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">Наши услуги</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg">
              ЗАО «Лыткаринское ППЖТ» предоставляет полный комплекс услуг в сфере железнодорожных перевозок
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
                onClick={redirectToContact}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Заказать услугу
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("services-grid")}
                className="bg-slate-800/80 hover:bg-slate-900/90 text-white border-2 border-slate-700/50 hover:border-slate-600/50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Узнать больше
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

      {/* Services Grid */}
      <section id="services-grid" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Профессиональные услуги</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мы предлагаем широкий спектр железнодорожных услуг для эффективного решения ваших логистических задач
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Button
                      onClick={() => scrollToSection(service.anchor)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 w-full font-semibold transition-all duration-300"
                    >
                      Подробнее
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      onClick={redirectToContact}
                      className="bg-slate-800 hover:bg-slate-900 text-white border-2 border-slate-800 hover:border-slate-900 w-full font-semibold transition-all duration-300"
                    >
                      Заказать услугу
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}

      {/* Подача-уборка вагонов */}
      <section id="podacha" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Подача-уборка вагонов</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Подача вагонов к фронтам погрузки – выгрузки по станциям примыкания Мальчики (Люберцы 1), Яничкино в
                город Котельники, Люберцы, Лыткарино, промзону Тураево.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: Shield,
                    title: "Надежность и своевременность",
                    desc: "Гарантируем своевременную подачу и уборку вагонов согласно графику",
                  },
                  {
                    icon: Map,
                    title: "Широкая география обслуживания",
                    desc: "Работаем в городах Котельники, Люберцы, Лыткарино и промзоне Тураево",
                  },
                  {
                    icon: Clock,
                    title: "Оперативность",
                    desc: "Быстрое оформление документов и организация перевозок",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={redirectToContact}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Заказать услугу
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative h-96 lg:h-full overflow-hidden rounded-2xl">
              <Image src="/bg3.jpg" alt="Подача-уборка вагонов" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Аренда площадок */}
      <section id="arenda-ploshchadok" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <div className="relative h-96 lg:h-full overflow-hidden rounded-2xl lg:order-1">
              <Image src="/bg4.jpg" alt="Аренда площадок" fill className="object-cover" />
            </div>
            <div className="lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Аренда площадок</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Аренда площадок под погрузку-выгрузку с железнодорожными путями. Мы предлагаем площадки различной
                площади и вместимости для удовлетворения потребностей вашего бизнеса.
              </p>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Площадка 800 кв.м.</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Вместимость: 8 вагонов
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Удобное расположение
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Подъездные пути
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Круглосуточная работа
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Площадка 1620 кв.м.</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Вместимость: 14 вагонов
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Удобное расположение
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Подъездные пути
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Круглосуточная работа
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={redirectToContact}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Арендовать площадку
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Аренда железнодорожных путей */}
      <section id="arenda-putey" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Аренда железнодорожных путей</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Предоставляем в аренду железнодорожные пути для различных целей: отстоя вагонов, проведения
                погрузочно-разгрузочных работ, организации временных складских площадок и других нужд вашего бизнеса.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: Shield,
                    title: "Безопасность",
                    desc: "Все пути соответствуют требованиям безопасности и регулярно обслуживаются",
                  },
                  {
                    icon: Clock,
                    title: "Гибкие условия аренды",
                    desc: "Возможность краткосрочной и долгосрочной аренды на выгодных условиях",
                  },
                  {
                    icon: Phone,
                    title: "Техническая поддержка",
                    desc: "Оперативное решение технических вопросов и консультации специалистов",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={redirectToContact}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Арендовать пути
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative h-96 lg:h-full overflow-hidden rounded-2xl">
              <Image src="/bg3.jpg" alt="Аренда железнодорожных путей" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Почему выбирают нас</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Более 60 лет опыта в сфере железнодорожных перевозок и безупречная репутация
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "Опыт и надежность",
                desc: "Более 60 лет успешной работы в отрасли",
              },
              {
                icon: Users,
                title: "Профессиональная команда",
                desc: "Квалифицированные специалисты с большим опытом",
              },
              {
                icon: Zap,
                title: "Оперативность",
                desc: "Быстрое решение любых логистических задач",
              },
              {
                icon: Shield,
                title: "Гарантия качества",
                desc: "100% гарантия качества предоставляемых услуг",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Готовы начать сотрудничество?</h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Свяжитесь с нами, чтобы получить подробную информацию о наших услугах или задать интересующие вас вопросы.
              Наши специалисты готовы помочь вам подобрать оптимальное решение для вашего бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={redirectToContact}
                className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-600 hover:border-cyan-700 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Связаться с нами
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => router.push("/about")}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Узнать о компании
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
