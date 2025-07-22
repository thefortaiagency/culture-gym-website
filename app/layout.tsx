import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Culture Gym - Fort Wayne's Old School Gym",
  description: "Large selection of weights, cardio, power lifting, and group fitness. Clean, spacious environment with the most caring, helpful staff and members you'll find!",
  keywords: "gym, fitness, fort wayne, powerlifting, weights, cardio, group fitness",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}