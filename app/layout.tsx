import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import ClientLayout from "./clientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ЗАО «Лыткаринское ППЖТ» - Железнодорожные перевозки и услуги",
    template: "%s | ЗАО «Лыткаринское ППЖТ»",
  },
  description:
    "ЗАО «Лыткаринское ППЖТ» - надежный партнер в сфере железнодорожных перевозок с 1961 года. Подача-уборка вагонов, аренда площадок и железнодорожных путей в Московской области.",
  keywords: [
    "железнодорожные перевозки",
    "подача вагонов",
    "уборка вагонов",
    "аренда железнодорожных путей",
    "аренда площадок",
    "ППЖТ",
    "Лыткарино",
    "железнодорожный транспорт",
    "грузовые перевозки",
    "логистика",
    "РЖД",
    "маневровые работы",
    "Московская область",
    "Котельники",
    "Люберцы",
  ],
  authors: [{ name: "ЗАО «Лыткаринское ППЖТ»" }],
  creator: "ЗАО «Лыткаринское ППЖТ»",
  publisher: "ЗАО «Лыткаринское ППЖТ»",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lppjt.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://lppjt.ru",
    title: "ЗАО «Лыткаринское ППЖТ» - Железнодорожные перевозки и услуги",
    description:
      "Надежный партнер в сфере железнодорожных перевозок с 1961 года. Подача-уборка вагонов, аренда площадок и железнодорожных путей.",
    siteName: "ЗАО «Лыткаринское ППЖТ»",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ЗАО «Лыткаринское ППЖТ» - Железнодорожные услуги",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ЗАО «Лыткаринское ППЖТ» - Железнодорожные перевозки",
    description: "Надежный партнер в сфере железнодорожных перевозок с 1961 года.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
    yandex: "",
  },
  category: "business",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ЛППЖТ" />

        {/* Структурная дата */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ЗАО «Лыткаринское ППЖТ»",
              alternateName: "Лыткаринское ППЖТ",
              url: "https://lppjt.ru",
              logo: "https://lppjt.ru/logo.png",
              description: "Железнодорожные перевозки, подача-уборка вагонов, аренда площадок и путей",
              foundingDate: "1961",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ст. Заводская",
                addressLocality: "Лыткарино",
                addressRegion: "Московская область",
                postalCode: "140083",
                addressCountry: "RU",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-495-552-15-50",
                contactType: "customer service",
                availableLanguage: "Russian",
              },
              sameAs: ["https://lppjt.ru"],
              serviceArea: {
                "@type": "Place",
                name: "Московская область",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Железнодорожные услуги",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Подача-уборка вагонов",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Аренда железнодорожных площадок",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Аренда железнодорожных путей",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
