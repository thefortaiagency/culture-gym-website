import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'The Culture Gym Fort Wayne'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#DC2626',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 20,
          }}
        >
          THE CULTURE GYM
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#FFFFFF',
            opacity: 0.9,
          }}
        >
          Fort Wayne's Premier Old School Gym
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}