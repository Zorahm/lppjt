import type { Metadata } from "next"
import PartnersClientPage from "./PartnersClientPage"

export const metadata: Metadata = {
  title: "Партнеры",
  description:
    "Партнеры и контрагенты ЗАО «Лыткаринское ППЖТ». Мы сотрудничаем с ведущими компаниями различных отраслей промышленности.",
  keywords: [
    "партнеры ЛППЖТ",
    "контрагенты железнодорожной компании",
    "сотрудничество ППЖТ",
    "клиенты Лыткаринское ППЖТ",
    "партнерство железнодорожные перевозки",
  ],
  openGraph: {
    title: "Партнеры ЗАО «Лыткаринское ППЖТ»",
    description: "Наши надежные партнеры и контрагенты в сфере железнодорожных перевозок.",
    url: "/partners",
    images: [
      {
        url: "/og-partners.jpg",
        width: 1200,
        height: 630,
        alt: "Партнеры ЗАО «Лыткаринское ППЖТ»",
      },
    ],
  },
}

export default function PartnersPage() {
  return <PartnersClientPage />
}
