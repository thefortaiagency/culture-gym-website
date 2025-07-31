# Social Media Gallery Setup

## Overview
The Culture Gym social media gallery showcases posts from Facebook and Instagram, creating an engaging visual feed that highlights the gym's community and culture.

## Features
- **Platform Filtering**: Toggle between All Posts, Instagram, and Facebook
- **Responsive Grid**: Adapts from 1-4 columns based on screen size
- **Hover Effects**: Shows post details on hover with smooth animations
- **Direct Links**: Each post links to the original social media post
- **Performance Optimized**: Uses Next.js Image component for optimal loading

## Implementation Details

### File Structure
```
app/
├── social/
│   └── page.tsx          # Main social media gallery page
├── components/
│   ├── Navbar.tsx        # Updated with social link
│   └── BottomNav.tsx     # Updated with social link
└── globals.css           # Added social gallery animations
```

### Social Media Data
Currently using static data with existing Facebook images from the public/images folder. The posts include:
- Image path
- Caption
- Date
- Platform (facebook/instagram)
- Likes count
- Direct link to social post

### Styling
- Glassmorphism effects consistent with site theme
- Platform badges (Instagram gradient, Facebook blue)
- Smooth hover transitions
- Staggered animation on load

## Future Enhancements

### Live Social Media Integration
To integrate live feeds, you could:

1. **Instagram Basic Display API**
   - Register app at developers.facebook.com
   - Get access token
   - Fetch recent posts from @culturegymfw

2. **Facebook Graph API**
   - Use Facebook Page Access Token
   - Fetch page posts and media

3. **Third-party Services**
   - Juicer.io
   - Curator.io
   - EmbedSocial

### Adding New Posts
1. Upload new images to `/public/images/`
2. Add post data to the `socialPosts` array in `/app/social/page.tsx`
3. Include: image path, caption, date, platform, likes, and link

### Customization
- Adjust grid columns in the `grid-cols-*` classes
- Modify platform filter buttons
- Update social media handles in the header links
- Change animation timings in CSS

## SEO Considerations
- Alt text on all images
- Proper heading hierarchy
- External links have rel="noopener noreferrer"
- Semantic HTML structure

## Performance
- Images lazy-loaded by Next.js
- Staggered animations prevent layout shift
- Optimized for Core Web Vitals