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
          position: 'relative',
        }}
      >
        <img
          src="https://theculturegym.com/images/culturegymhero.png"
          alt="The Culture Gym"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.7))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 60,
            right: 60,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            The Culture Gym
          </h1>
          <p
            style={{
              fontSize: 28,
              margin: '10px 0 0 0',
              opacity: 0.9,
            }}
          >
            Fort Wayne's Premier Old School Gym
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}