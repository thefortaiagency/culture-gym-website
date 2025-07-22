# Culture Gym Website

Modern, high-performance website for The Culture Gym in Fort Wayne, Indiana.

## Overview

A Next.js 15 website featuring:
- 🎨 Glassmorphism design with culture-themed branding
- ⚡ Lightning-fast performance with React 19
- 📱 Fully responsive mobile-first design
- 🏋️ Professional fitness facility showcase
- 🎯 Interactive components and smooth animations

## Tech Stack

- **Framework**: Next.js 15.4.2
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript 5.8.3
- **Font**: Bebas Neue, Oswald
- **Testing**: Puppeteer for automated screenshots

## Features

- Hero section with rotating gym statistics
- About section with expandable story content
- Equipment showcase with high-quality imagery
- Group fitness class schedule
- Membership pricing with special discounts
- Contact information and location
- Smooth scroll animations with intersection observer
- Custom glassmorphism effects throughout

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
culture-gym-website/
├── app/
│   ├── components/       # React components
│   ├── calendar/        # Calendar page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/
│   └── images/          # Site images
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Design Philosophy

The Culture Gym website embodies the "old school gym" aesthetic with modern web technologies:
- **Black & Red Theme**: Culture Gym's signature colors
- **Glassmorphism**: Modern UI effects with depth and transparency
- **Performance**: Optimized images and lazy loading
- **Accessibility**: Semantic HTML and proper contrast ratios

## License

© 2025 The Culture Gym. All rights reserved.