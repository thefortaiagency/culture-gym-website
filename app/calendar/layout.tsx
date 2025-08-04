import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class Schedule | The Culture Gym Fort Wayne',
  description: 'View our full schedule of 20+ group fitness classes including Spinning, Yoga, Barre, Tai Chi, and Strength training. Classes for all fitness levels at The Culture Gym Fort Wayne.',
  keywords: 'fort wayne fitness classes, group fitness fort wayne, spinning classes fort wayne, yoga fort wayne, barre classes fort wayne, tai chi fort wayne, strength training classes, gym class schedule fort wayne',
  openGraph: {
    title: 'Group Fitness Classes Schedule - The Culture Gym',
    description: 'Join 20+ weekly group fitness classes at Fort Wayne\'s premier gym. From spinning to yoga, find your perfect workout.',
    url: 'https://theculturegym.com/calendar',
    type: 'website',
    images: [
      {
        url: 'https://theculturegym.com/images/group-fitness.jpg',
        width: 1200,
        height: 630,
        alt: 'Group Fitness Classes at The Culture Gym',
      }
    ],
  },
  alternates: {
    canonical: 'https://theculturegym.com/calendar',
  }
}

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}