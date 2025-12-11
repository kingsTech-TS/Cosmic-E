# Cosmic Explorer - NASA APOD Universe Browser

A stunning Next.js application for exploring the cosmos through NASA's Astronomy Picture of the Day (APOD) API. Experience the beauty of the universe with interactive 3D planets, animated starfields, and daily curated space imagery.

## Features

- **Interactive 3D Planet** - Rotating 3D planet with atmospheric lighting effects powered by Three.js
- **NASA APOD Integration** - Display daily astronomy pictures with detailed descriptions
- **Animated Starfield** - Twinkling background stars with parallax effects
- **Gallery View** - Browse and explore recent APOD images with modal viewer
- **Random Day Picker** - Jump to random astronomy pictures from any date
- **Responsive Design** - Beautiful on desktop, tablet, and mobile devices
- **Dark Mode Theme** - Cosmic dark theme with neon purple, blue, and cyan accents
- **Glass Morphism UI** - Modern frosted glass effects on UI components
- **Smooth Animations** - Framer Motion animations for all interactions
- **Glow Effects** - Neon borders and glowing text throughout the interface
- **Cursor Trail** - Interactive cursor following effect on the homepage
- **Video Support** - Handles both image and video APOD content

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **API**: [NASA APOD API](https://api.nasa.gov/)
- **Font**: [Geist](https://vercel.com/font) from Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- NASA API key (free from https://api.nasa.gov/)

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd cosmic-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here
   \`\`\`

   Get your free NASA API key at: https://api.nasa.gov/

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   
   Visit http://localhost:3000 to see the application

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
cosmic-explorer/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── globals.css             # Global styles and theme
│   ├── page.tsx                # Home page with 3D planet
│   ├── apod/
│   │   └── page.tsx            # APOD viewer page
│   └── gallery/
│       └── page.tsx            # Gallery grid page
├── components/
│   ├── navbar.tsx              # Navigation with active states
│   ├── floating-stars.tsx       # Animated starfield background
│   ├── planet.tsx              # 3D planet component (Three.js)
│   ├── apod-card.tsx           # APOD image card with hover effects
│   └── ui/                     # shadcn UI components
├── hooks/
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notifications hook
├── lib/
│   └── utils.ts                # Utility functions (cn, classnames)
├── public/
│   └── placeholder.svg         # Placeholder image
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
\`\`\`

## Pages Overview

### Home Page (`/`)
- Stunning hero section with rotating 3D planet
- Animated starfield background
- Hero text with call-to-action button
- Stats cards showing 365+ daily pictures
- Cursor trail effect following mouse movement

### APOD Viewer (`/apod`)
- Display today's Astronomy Picture of the Day
- Full image/video with details
- Title, date, and detailed explanation
- NASA copyright information
- Random date picker to explore past images
- Support for both images and embedded videos

### Gallery (`/gallery`)
- Grid view of recent APOD images (12 images)
- Hover effects with tilt and glow
- Modal viewer for full-resolution viewing
- Smooth loading and animations
- Responsive grid layout

## Key Components

### Navbar
Navigation bar with current page highlighting and smooth transitions.

### FloatingStars
Animated background component with twinkling stars and parallax effect.

### Planet
3D rotating planet built with Three.js and React Three Fiber, featuring:
- Sphere geometry with purple-to-blue gradient
- Atmospheric lighting
- Rotation animation
- Point lights for dramatic effect

### APODCard
Card component for displaying APOD images with:
- Hover tilt effect
- Glow animation
- Image preview
- Smooth transitions

## Styling

The application uses a cosmic dark theme with:

- **Primary Color**: Purple (`oklch(0.5 0.28 290)`)
- **Accent Color**: Blue (`oklch(0.65 0.35 250)`)
- **Secondary Accent**: Cyan (`oklch(0.7 0.25 200)`)
- **Background**: Deep slate (`oklch(0.08 0 0)`)
- **Text**: Off-white (`oklch(0.95 0 0)`)

### Custom Animations

- `animate-drift` - Slow horizontal drift for nebula backgrounds
- `animate-float` - Vertical floating motion
- `glow-effect` - Pulsing neon glow
- `twinkle` - Star twinkling effect

### CSS Classes

- `.neon-border` - Purple neon border with glow
- `.neon-border-blue` - Blue neon border variant
- `.glow-text` - Text shadow glow effect
- `.glass-morphism` - Frosted glass effect with blur

## Environment Variables

- `NEXT_PUBLIC_NASA_API_KEY` - Your NASA APOD API key (required)

The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variable `NEXT_PUBLIC_NASA_API_KEY` in Vercel dashboard
4. Deploy with one click

\`\`\`bash
# Using Vercel CLI
vercel
\`\`\`

### Other Platforms

The application can be deployed to any platform supporting Next.js 16:
- Netlify
- Railway
- Render
- Docker containers

## NASA APOD API

This app uses the free NASA APOD API. Learn more at: https://api.nasa.gov/

**API Endpoint**: `https://api.nasa.gov/planetary/apod`

**Parameters Used**:
- `api_key` - Your NASA API key
- `date` - Specific date (format: YYYY-MM-DD)
- `count` - Number of random images (for gallery)

**Rate Limits**: 
- 50 requests per hour
- 1000 requests per day

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Three.js 3D rendering requires WebGL support.

## Performance

- Server-side image optimization with Next.js Image component
- Lazy loading for gallery images
- Code splitting and dynamic imports for 3D components
- CSS animations use GPU acceleration
- Efficient star particle rendering

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast text colors
- Focus visible states

## Troubleshooting

### 3D Planet not rendering
- Ensure your browser supports WebGL
- Try a different browser (Chrome recommended)
- Check browser console for errors

### APOD images not loading
- Verify `NEXT_PUBLIC_NASA_API_KEY` is set correctly
- Check NASA API status at https://api.nasa.gov/
- Ensure API key has not exceeded rate limits
- Try refreshing the page

### Animations not smooth
- Disable hardware acceleration test if needed
- Update your GPU drivers
- Try a different browser
- Check for background processes consuming CPU

## Development

### Available Scripts

\`\`\`bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
\`\`\`

### Adding New Pages

1. Create new directory in `app/` folder
2. Add `page.tsx` file
3. Import layout components and styling
4. Update navbar links if needed

### Customizing Styles

Edit `app/globals.css` to customize:
- Color theme
- Animation speeds
- Neon glow intensity
- Glass morphism blur effects

## Future Enhancements

- User favorites/bookmarks system
- Share APOD images to social media
- Compare images from different dates
- Astronomical event calendar
- User accounts and collections
- Search functionality
- Image analysis and metadata
- Telescope observations integration

## License

Open source - feel free to use and modify for personal or commercial projects.

## Credits

- **NASA** - Astronomy Picture of the Day API
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Vercel** - Hosting and deployment platform

## Support

For issues, questions, or suggestions:
- Check the troubleshooting section above
- Review NASA API documentation
- Check Three.js documentation for 3D issues
- Open an issue on the repository

---

Built with ❤️ for space enthusiasts 🌌
#   C o s m i c - E  
 