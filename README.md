# Bit Waves - IT Services Website

Modern, responsive website for an IT Services startup specializing in IT Solutioning, AI Agent Development, and Data Research & Visualization.

## 🎯 Project Status

**✅ MVP Complete!** (55/110 tasks - 50%)

The website is fully functional with:
- Home, Services, and Contact pages
- Responsive design (mobile, tablet, desktop)
- Contact form with validation
- Smooth animations
- Accessibility features
- SEO optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
bit-waves-frontend/
├── public/
│   └── assets/
│       ├── data/              # JSON content files
│       │   └── services.json
│       └── images/            # Static images
│           └── icons/         # Service icons
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── sections/         # Page sections
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── services/             # Data and API services
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── styles/               # Global styles
├── specs/                    # Feature specifications
└── tests/                    # Test files (future)
```

## 🎨 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **Email**: EmailJS (optional configuration)

## 📋 Available Pages

| Page | Status | Route | Description |
|------|--------|-------|-------------|
| Home | ✅ Complete | `/` | Hero + Services overview |
| Services | ✅ Complete | `/services` | Detailed service information |
| Contact | ✅ Complete | `/contact` | Contact form + info + map |
| About | 🚧 Placeholder | `/about` | Company information (future) |
| Case Studies | 🚧 Placeholder | `/case-studies` | Portfolio showcase (future) |
| Blog | 🚧 Placeholder | `/blog` | Content marketing (future) |

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# EmailJS (for contact form)
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key

# Google Maps (for office location)
VITE_OFFICE_MAP_EMBED_URL=your_maps_embed_url
```

### EmailJS Setup (Optional but Recommended)

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Copy credentials to `.env.local`

### Google Maps Setup (Optional)

1. Get embed URL from Google Maps
2. Add to `.env.local`

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

### Quick Test

```bash
# Start dev server
npm run dev

# Open http://localhost:5173
# Follow testing checklist in TESTING_GUIDE.md
```

### Responsive Testing

Use browser DevTools (F12) → Device Toolbar to test:
- Mobile: 320px, 375px, 414px
- Tablet: 768px, 820px
- Desktop: 1024px, 1280px, 1920px

## 🏗️ Development Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check

# Clean
rm -rf node_modules dist .vite
npm install          # Fresh install
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy Options

**Recommended: Vercel** (Zero Config)
```bash
npm i -g vercel
vercel
```

**Alternative: Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

**Alternative: GitHub Pages / AWS Amplify / Cloudflare Pages**
- Connect your Git repository
- Set build command: `npm run build`
- Set publish directory: `dist`

## 🎯 Features

### ✅ Implemented

- **Responsive Design**: Mobile-first, adapts to all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation
- **Animations**: Smooth scroll-triggered animations with Framer Motion
- **Forms**: Contact form with real-time validation
- **SEO**: Meta tags, semantic HTML, proper document structure
- **Performance**: Code splitting, lazy loading, optimized assets

### 🚧 Future Enhancements

- About Us page with team profiles
- Case Studies showcase
- Blog with CMS integration
- Advanced analytics
- Multi-language support

## 📖 Documentation

- [Specification](./specs/001-it-services-website/spec.md) - Feature requirements
- [Implementation Plan](./specs/001-it-services-website/plan.md) - Technical design
- [Tasks Breakdown](./specs/001-it-services-website/tasks.md) - Detailed task list
- [Testing Guide](./TESTING_GUIDE.md) - QA checklist
- [Responsive Testing](./RESPONSIVE_TEST.md) - Device testing guide

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# Check Node version (need 18+)
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Type check
npx tsc --noEmit

# Lint check
npm run lint
```

### Contact Form Not Working

**Expected behavior** without EmailJS configuration:
- Form validates properly
- Shows error message about missing configuration
- This is not a bug - configure EmailJS to enable email sending

## 🤝 Contributing

This is a feature-complete MVP. Future enhancements welcome:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary software for Bit Waves.

## 📞 Support

For questions or issues:
- Check [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- Review browser console for errors
- Verify environment variables are set correctly

---

**Built with** ❤️ **by the Bit Waves team**

*Last updated: October 19, 2025*
