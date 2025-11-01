# Quickstart Guide: IT Services Website

**Goal**: Get the development environment running locally in under 10 minutes  
**Prerequisites**: Node.js 18+ LTS, npm 9+, git, modern code editor (VS Code recommended)

---

## Quick Start (TL;DR)

```bash
# Clone repository
git clone <repository-url>
cd bit-waves-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

---

## Detailed Setup

### 1. Prerequisites Check

Verify you have the required tools:

```bash
# Check Node.js version (should be 18+ LTS)
node --version

# Check npm version (should be 9+)
npm --version

# Check git
git --version
```

**If missing**:
- **Node.js**: Download from [nodejs.org](https://nodejs.org/) (LTS version)
- **npm**: Comes with Node.js
- **git**: Download from [git-scm.com](https://git-scm.com/)

---

### 2. Clone Repository

```bash
git clone <repository-url>
cd bit-waves-frontend

# Checkout feature branch (if not main)
git checkout 001-it-services-website
```

---

### 3. Install Dependencies

```bash
npm install
```

**This installs**:
- React 18+
- React Router v6
- Tailwind CSS
- Framer Motion
- React Hook Form
- EmailJS
- TypeScript
- Vite
- Testing libraries (Jest, React Testing Library)

**Estimated time**: 2-3 minutes

---

### 4. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local
```

**Edit `.env.local`** with your values:

```bash
# EmailJS Configuration (for contact form)
VITE_EMAIL_SERVICE_ID=service_xxxxxxx
VITE_EMAIL_TEMPLATE_ID=template_xxxxxxx
VITE_EMAIL_PUBLIC_KEY=user_xxxxxxxxxxxxxx

# Google Maps (for office location)
VITE_OFFICE_MAP_EMBED_URL=https://www.google.com/maps/embed?pb=...

# Optional: Analytics (if added later)
# VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Getting credentials**:
- **EmailJS**: Sign up at [emailjs.com](https://www.emailjs.com/), create service and template
- **Maps URL**: Generate from [Google Maps](https://www.google.com/maps) → Share → Embed

**Note**: Development will work without credentials (forms/maps won't function fully).

---

### 5. Start Development Server

```bash
npm run dev
```

**Output**:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

**Open browser**: Navigate to `http://localhost:5173`

**Expected**: You should see the homepage with:
- Header navigation
- Hero section
- Services overview
- (May show placeholder content if JSON files not yet populated)

---

## Development Workflow

### File Structure Overview

```
bit-waves-frontend/
├── public/                    # Static assets
│   └── assets/
│       ├── data/             # JSON content files
│       └── images/           # Images
├── src/
│   ├── components/           # React components
│   │   ├── layout/          # Header, Footer, Nav
│   │   ├── ui/              # Button, Card, Input
│   │   └── sections/        # Hero, Services, etc.
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── services/            # API integrations
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
└── tests/                   # Test files
```

### Common Commands

```bash
# Development
npm run dev                  # Start dev server (http://localhost:5173)
npm run build                # Build for production (outputs to dist/)
npm run preview              # Preview production build locally

# Code Quality
npm run lint                 # Run ESLint
npm run lint:fix             # Fix linting issues automatically
npm run format               # Format code with Prettier
npm run type-check           # TypeScript type checking

# Testing
npm test                     # Run tests (watch mode)
npm run test:ci              # Run tests (CI mode, single run)
npm run test:coverage        # Generate coverage report

# Data Validation
npm run validate:data        # Validate JSON content files

# Build Analysis
npm run analyze              # Analyze bundle size
```

---

## Adding Content

### Add a New Service

**File**: `public/assets/data/services.json`

```json
{
  "id": "new-service",
  "name": "New Service Name",
  "shortDescription": "Brief description (50-150 chars)",
  "fullDescription": "Detailed description (200-1000 chars)",
  "icon": "icon-name",
  "capabilities": [
    "Capability 1",
    "Capability 2",
    "Capability 3"
  ],
  "useCases": [
    "Use case 1",
    "Use case 2"
  ],
  "ctaText": "Learn More",
  "ctaLink": "/contact?service=new-service",
  "order": 4
}
```

**Note**: Must have exactly 3 services as per spec.

### Add a Case Study

**1. Add images** to `public/assets/images/case-studies/`:
- `project-name-thumb.jpg` (600x400px)
- `project-name-hero.jpg` (1920x1080px)

**2. Add entry** to `public/assets/data/case-studies.json`:

```json
{
  "id": "project-name",
  "title": "Project Title",
  "client": "Client Name or Confidential",
  "industryCategory": "technology",
  "serviceCategory": "it-solutioning",
  "thumbnail": "/assets/images/case-studies/project-name-thumb.jpg",
  "heroImage": "/assets/images/case-studies/project-name-hero.jpg",
  "summary": "Brief summary (50-200 chars)",
  "problem": "Problem statement (100-500 chars)",
  "solution": "Solution description (200-800 chars)",
  "outcomes": [
    "Outcome 1 (50-200 chars)",
    "Outcome 2"
  ],
  "publishDate": "2025-10-19",
  "featured": false
}
```

**3. Validate**:
```bash
npm run validate:data
```

**4. Refresh browser** - changes appear immediately in dev mode.

---

## Troubleshooting

### Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Option 1: Kill process on port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- --port 3000
```

---

### Module Not Found Errors

**Error**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

---

### TypeScript Errors

**Error**: Type errors in IDE but dev server runs

**Solution**:
```bash
# Run type check
npm run type-check

# Restart TypeScript server in VS Code
# Command Palette (Cmd/Ctrl + Shift + P) → "TypeScript: Restart TS Server"
```

---

### Slow Development Server

**Issue**: HMR (Hot Module Replacement) is slow

**Solutions**:
- Close unused browser tabs
- Disable browser extensions
- Check system resource usage
- Update to latest Node.js LTS
- Add to `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
  },
});
```

---

### Email Form Not Working

**Issue**: Contact form submission fails

**Check**:
1. Is `.env.local` configured with EmailJS credentials?
2. Are credentials correct? (Check EmailJS dashboard)
3. Check browser console for errors
4. Test EmailJS directly: [emailjs.com/docs](https://www.emailjs.com/docs/examples/reactjs/)

**Temporary workaround**: Forms can be tested without email service (UI validation still works).

---

### Map Not Loading

**Issue**: Google Maps embed not displaying

**Check**:
1. Is `VITE_OFFICE_MAP_EMBED_URL` set in `.env.local`?
2. Is embed URL valid? (Test in standalone HTML file)
3. Ad blocker enabled? (Some block Google Maps)
4. Check browser console for CORS or CSP errors

---

## Testing

### Run Tests

```bash
# Watch mode (for development)
npm test

# Single run (for CI)
npm run test:ci

# With coverage
npm run test:coverage
```

### Write a Test

**Example**: Component test

```typescript
// tests/unit/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Building for Production

### Local Build

```bash
# Build optimized production bundle
npm run build

# Output: dist/ directory
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview

# Open http://localhost:4173
```

### Build Analysis

```bash
# Analyze bundle size
npm run analyze

# Opens bundle visualization in browser
```

---

## Deployment

### Recommended: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

**OR**: Connect GitHub repo to Vercel dashboard (auto-deploys on push).

### Alternative: Netlify

```bash
# Build command: npm run build
# Publish directory: dist

# Drag-and-drop dist/ folder to Netlify
```

### Environment Variables in Production

Add environment variables in hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment

---

## VS Code Setup (Recommended)

### Install Extensions

```
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dsznajder.es7-react-js-snippets
```

**OR** manually install:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Getting Help

### Documentation

- **Project Docs**: See `specs/001-it-services-website/` directory
- **React**: [react.dev](https://react.dev/)
- **Vite**: [vitejs.dev](https://vitejs.dev/)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com/)
- **React Router**: [reactrouter.com](https://reactrouter.com/)

### Common Issues

Check `specs/001-it-services-website/plan.md` for architecture decisions and technical context.

### Debugging

```bash
# Enable debug logging
DEBUG=* npm run dev

# Vite-specific logs
VITE_DEBUG=* npm run dev
```

---

## Next Steps

After setup is complete:

1. **Review task breakdown**: See `tasks.md` (generated by `/speckit.tasks`)
2. **Review component structure**: See `src/components/`
3. **Add content**: Populate JSON files in `public/assets/data/`
4. **Start implementing**: Follow tasks in order (setup → layout → pages)

---

**Status**: ✅ Quickstart complete. Development environment ready to use.






