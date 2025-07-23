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
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
          }}
        />
        
        {/* Logo/Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#DC2626',
              textShadow: '0 0 30px rgba(220, 38, 38, 0.5)',
              marginBottom: 20,
            }}
          >
            THE CULTURE GYM
          </h1>
          <p
            style={{
              fontSize: 32,
              margin: '0 0 40px 0',
              opacity: 0.9,
              color: '#FFFFFF',
              letterSpacing: '0.1em',
            }}
          >
            FORT WAYNE'S PREMIER OLD SCHOOL GYM
          </p>
          
          {/* Feature badges */}
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 'bold', color: '#DC2626' }}>22</span>
              <span style={{ fontSize: 16, opacity: 0.8 }}>HAMMER STRENGTH</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 'bold', color: '#DC2626' }}>30+</span>
              <span style={{ fontSize: 16, opacity: 0.8 }}>GROUP CLASSES</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 'bold', color: '#DC2626' }}>500+</span>
              <span style={{ fontSize: 16, opacity: 0.8 }}>MEMBERS</span>
            </div>
          </div>
        </div>
        
        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            color: '#FFFFFF',
            opacity: 0.7,
            fontSize: 18,
          }}
        >
          <span>SPIECE FIELDHOUSE</span>
          <span style={{ color: '#DC2626' }}>•</span>
          <span>NO CONTRACTS</span>
          <span style={{ color: '#DC2626' }}>•</span>
          <span>OPEN EARLY & LATE</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}