import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Culture Gym Fort Wayne - Best Gym in Northeast Indiana",
  description: "Fort Wayne's premier old school gym with 22 Hammer Strength pieces, 120lb dumbbells, 30+ group fitness classes, and sauna. Located in the heart of Fort Wayne at Spiece Fieldhouse. No contracts, just results!",
  keywords: "fort wayne gym, northeast indiana gym, gym near me, fort wayne fitness center, powerlifting fort wayne, group fitness classes fort wayne, hammer strength gym, old school gym fort wayne, spiece fieldhouse gym, best gym fort wayne indiana",
  metadataBase: new URL('https://theculturegym.com'),
  openGraph: {
    title: "The Culture Gym - Fort Wayne's Premier Fitness Destination",
    description: "Experience Fort Wayne's best gym with 30+ group classes and old school atmosphere. Located at historic Spiece Fieldhouse.",
    url: "https://theculturegym.com",
    siteName: "The Culture Gym Fort Wayne",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://theculturegym.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Culture Gym Fort Wayne",
      },
    ],
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
  twitter: {
    card: "summary_large_image",
    title: "The Culture Gym Fort Wayne",
    description: "Fort Wayne's premier old school gym with 30+ group classes. Located at historic Spiece Fieldhouse.",
    images: ["https://theculturegym.com/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "The Culture Gym",
    description: "Fort Wayne's premier old school gym located at historic Spiece Fieldhouse",
    url: "https://theculturegym.com",
    telephone: "+1-260-000-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5310 Merchandise Dr",
      addressLocality: "Fort Wayne",
      addressRegion: "IN",
      postalCode: "46808",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0793,
      longitude: -85.1394
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    },
    priceRange: "$45-$65",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Weights" },
      { "@type": "LocationFeatureSpecification", name: "Cardio Equipment" },
      { "@type": "LocationFeatureSpecification", name: "Group Fitness Classes" },
      { "@type": "LocationFeatureSpecification", name: "Sauna" },
      { "@type": "LocationFeatureSpecification", name: "Shower Facilities" },
      { "@type": "LocationFeatureSpecification", name: "Indoor Track" },
      { "@type": "LocationFeatureSpecification", name: "Personal Training" }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "250"
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}