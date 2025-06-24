import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контактная информация ЗАО «Лыткаринское ППЖТ»: адрес, телефоны, email, реквизиты компании. Свяжитесь с нами для получения консультации.",
  keywords: [
    "контакты ЛППЖТ",
    "телефон железнодорожной компании",
    "адрес Лыткаринское ППЖТ",
    "реквизиты компании",
    "связаться с ППЖТ",
    "консультация железнодорожные перевозки",
  ],
  openGraph: {
    title: "Контакты ЗАО «Лыткаринское ППЖТ»",
    description: "Свяжитесь с нами для получения консультации по железнодорожным перевозкам и услугам.",
    url: "/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Контакты ЗАО «Лыткаринское ППЖТ»",
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
