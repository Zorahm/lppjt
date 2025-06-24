import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
  Mail,
  MapPin,
  Award,
  Zap,
  Target,
  Truck,
  Building,
  BarChart3,
} from "lucide-react"

export default function HomePage() {
  const currentYear = new Date().getFullYear()
  const yearsOfExperience = currentYear - 1961

  return (
    <>
      {/* Hero Section - Полностью новый дизайн с фоновым изображением */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0">
          <Image
            src="/bg4.jpg"
            alt="Железнодорожный состав в осеннем лесу"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="scale-105"
          />
          {/* Темное наложение для лучшей читаемости */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Градиентное наложение */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-transparent to-slate-900/70"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Бейдж */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <Award className="h-5 w-5 mr-3 text-amber-400" />
              <span className="text-sm font-medium text-white">Лауреат премии «За обустройство Земли Российской»</span>
            </div>

            {/* Заголовок */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                <span className="block drop-shadow-lg">Железнодорожные</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                  решения
                </span>
                <span className="block drop-shadow-lg">нового уровня</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                ЗАО «Лыткаринское ППЖТ» — ваш надежный партнер в сфере железнодорожного транспорта с{" "}
                <span className="font-semibold text-cyan-300">{yearsOfExperience}-летним опытом</span>
              </p>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-600"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  Наши услуги
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 backdrop-blur-sm"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Связаться с нами
                </Button>
              </Link>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-md mb-2">
                  {yearsOfExperience}
                </div>
                <div className="text-white/80 text-sm uppercase tracking-wider">лет надежности</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-md mb-2">30+</div>
                <div className="text-white/80 text-sm uppercase tracking-wider">км путей</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-md mb-2">179</div>
                <div className="text-white/80 text-sm uppercase tracking-wider">партнеров</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги - Новый дизайн */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Комплексные железнодорожные решения</h2>
            <p className="text-xl text-gray-600">
              Предоставляем полный спектр услуг для эффективной работы вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Подача-уборка вагонов",
                description:
                  "Профессиональная подача вагонов с полным документооборотом и круглосуточной диспетчерской службой",
                features: ["Железнодорожный код", "Документооборот", "24/7 диспетчерская"],
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Building,
                title: "Аренда площадок",
                description: "Современные площадки для погрузки-выгрузки с удобными подъездными путями и охраной",
                features: ["Различная вместимость", "Удобное расположение", "Охраняемая территория"],
                color: "from-cyan-500 to-cyan-600",
              },
              {
                icon: BarChart3,
                title: "Аренда путей",
                description: "Железнодорожные пути для отстоя вагонов, погрузочных работ и временного складирования",
                features: ["Отстой вагонов", "Погрузочные работы", "Временные склады"],
                color: "from-indigo-500 to-indigo-600",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white`}>
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества - Новый дизайн */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Наши преимущества</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Почему выбирают нас</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Мы сочетаем многолетний опыт с современными технологиями для достижения максимальных результатов
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Безопасность",
                    desc: "100% соблюдение норм безопасности и стандартов качества",
                  },
                  { icon: Clock, title: "Пунктуальность", desc: "Точное соблюдение сроков и графиков перевозок" },
                  { icon: Users, title: "Профессионализм", desc: "Команда опытных специалистов с многолетним стажем" },
                  { icon: Target, title: "Надежность", desc: "Гарантированное выполнение всех взятых обязательств" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl">
                    Узнать больше о компании
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder-kfln4.png"
                  alt="Железнодорожная инфраструктура"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl"
                />
              </div>

              {/* Статистические карточки */}
              <div className="absolute -top-8 -right-8 bg-white p-6 rounded-xl shadow-xl border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{yearsOfExperience}</div>
                  <div className="text-sm text-gray-600">лет на рынке</div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">9</div>
                  <div className="text-sm text-gray-600">локомотивов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы - Новый дизайн */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Отзывы клиентов</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Что говорят наши клиенты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Сотрудничаем с ЛППЖТ более 10 лет. Всегда качественный сервис и профессиональный подход.",
                author: "ООО «ТрансЛогистик»",
                position: "Генеральный директор",
                rating: 5,
              },
              {
                text: "Благодарим за многолетнее сотрудничество. Ценим надежность и высокий уровень сервиса.",
                author: "АО «СтройМатериалы»",
                position: "Коммерческий директор",
                rating: 5,
              },
              {
                text: "Выражаем благодарность за оперативность и профессионализм в выполнении работ.",
                author: "ООО «ПромТорг»",
                position: "Руководитель отдела логистики",
                rating: 5,
              },
            ].map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6 italic">"{review.text}"</blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.position}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Новый дизайн */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Готовы начать сотрудничество?</h2>
            <p className="text-xl text-blue-100">Свяжитесь с нами сегодня и получите индивидуальное предложение</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: Phone, title: "Позвоните", desc: "+7 (495) 552-15-50" },
                { icon: Mail, title: "Напишите", desc: "info@lppjt.ru" },
                { icon: MapPin, title: "Приезжайте", desc: "г. Лыткарино, ст. Заводская" },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                  <p className="text-blue-100">{contact.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-blue-700"
                >
                  Все услуги
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
