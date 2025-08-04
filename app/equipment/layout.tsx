import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gym Equipment | The Culture Gym Fort Wayne',
  description: 'Explore our extensive collection of gym equipment including 22 Hammer Strength pieces, dumbbells up to 130lbs, power racks, and specialized training equipment at The Culture Gym Fort Wayne.',
  keywords: 'hammer strength fort wayne, gym equipment fort wayne, powerlifting equipment, bodybuilding gym fort wayne, free weights fort wayne, squat racks fort wayne, bench press equipment',
  openGraph: {
    title: 'Premium Gym Equipment - The Culture Gym Fort Wayne',
    description: 'Train with the best equipment in Fort Wayne. 22 Hammer Strength pieces, power racks, and dumbbells up to 130lbs.',
    url: 'https://theculturegym.com/equipment',
    type: 'website',
    images: [
      {
        url: 'https://theculturegym.com/images/hammer-strength.jpg',
        width: 1200,
        height: 630,
        alt: 'Hammer Strength Equipment at The Culture Gym',
      }
    ],
  },
  alternates: {
    canonical: 'https://theculturegym.com/equipment',
  }
}

export default function EquipmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}