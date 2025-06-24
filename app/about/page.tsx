import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "О компании",
  description:
    "История ЗАО «Лыткаринское ППЖТ» с 1961 года. Узнайте о наших достижениях, преимуществах и принципах работы в сфере железнодорожных перевозок.",
  keywords: [
    "о компании ЛППЖТ",
    "история железнодорожной компании",
    "достижения ППЖТ",
    "награды железнодорожной компании",
    "Лыткаринское ППЖТ история",
    "железнодорожное предприятие с 1961 года",
  ],
  openGraph: {
    title: "О компании ЗАО «Лыткаринское ППЖТ»",
    description: "История компании с 1961 года, наши достижения и принципы работы в железнодорожной отрасли.",
    url: "/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "О компании ЗАО «Лыткаринское ППЖТ»",
      },
    ],
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
