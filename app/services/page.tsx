import type { Metadata } from "next"
import ServicesClientPage from "./ServicesClientPage"

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Железнодорожные услуги ЗАО «Лыткаринское ППЖТ»: подача-уборка вагонов, аренда площадок и железнодорожных путей. Профессиональные логистические решения.",
  keywords: [
    "подача вагонов",
    "уборка вагонов",
    "аренда железнодорожных путей",
    "аренда площадок для погрузки",
    "железнодорожные услуги",
    "маневровые работы",
    "грузовые перевозки",
    "логистические услуги",
    "железнодорожная логистика",
  ],
  openGraph: {
    title: "Услуги ЗАО «Лыткаринское ППЖТ»",
    description: "Профессиональные железнодорожные услуги: подача-уборка вагонов, аренда площадок и путей.",
    url: "/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Услуги ЗАО «Лыткаринское ППЖТ»",
      },
    ],
  },
}

export default function ServicesPage() {
  return <ServicesClientPage />
}
