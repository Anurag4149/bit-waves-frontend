# GitHub Pages Deployment Guide

This document describes how to deploy the bit-waves-frontend application to GitHub Pages.

## Repository Information

- **Username**: `Anurag4149`
- **Repository Name**: `bit-waves-frontend`
- **Deployment URL**: `https://Anurag4149.github.io/bit-waves-frontend/`
- **Base Path**: `/bit-waves-frontend/`

## Prerequisites

1. GitHub repository: `Anurag4149/bit-waves-frontend`
2. GitHub Pages enabled in repository settings
3. GitHub Actions enabled in repository settings

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Anurag4149/bit-waves-frontend`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Save the changes

### 2. Repository Settings

Ensure the following are enabled:
- **Settings** → **Actions** → **General**:
  - Workflow permissions: Select "Read and write permissions"
  - Allow GitHub Actions to create and approve pull requests: Enabled (optional)

### 3. Initial Deployment

1. Push the code to the `main` branch
2. The GitHub Actions workflow will automatically:
   - Build the project with the correct base path (`/bit-waves-frontend/`)
   - Deploy to GitHub Pages
3. Monitor the deployment in **Actions** tab

### 4. Verify Deployment

After the workflow completes successfully:
1. Visit `https://Anurag4149.github.io/bit-waves-frontend/`
2. Test navigation to all routes (e.g., `/about`, `/services`, `/contact`)
3. Verify assets load correctly (images, CSS, JavaScript)

## How It Works

### Base Path Configuration

The application is configured with base path `/bit-waves-frontend/` in:
- `vite.config.ts`: Sets `base: '/bit-waves-frontend/'` for production builds
- `src/App.tsx`: Uses `basename={basename}` in BrowserRouter

### Client-Side Routing

GitHub Pages doesn't support server-side routing. To handle React Router routes:
- `public/404.html` contains a redirect script that converts paths to query strings
- React Router then reads the query string and renders the correct component
- This ensures all routes work correctly on GitHub Pages

### Build Process

1. **Local Development**: Base path is `/` (root)
2. **Production Build**: Base path is `/bit-waves-frontend/`
3. The `build:gh-pages` script sets `NODE_ENV=production` to use the correct base path

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Install gh-pages package (if not already installed)
npm install --save-dev gh-pages

# Add deploy script to package.json:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## Troubleshooting

### Issue: 404 errors on routes

**Solution**: 
- Ensure `public/404.html` exists and is being copied to `dist/`
- Verify the base path is set correctly in `vite.config.ts`
- Check that `basename` prop is set in BrowserRouter

### Issue: Assets not loading

**Solution**:
- Verify the base path in `vite.config.ts` matches your repository name
- Check browser console for 404 errors
- Ensure asset paths are relative or use the base path

### Issue: Build fails in GitHub Actions

**Solution**:
- Check the Actions tab for error details
- Verify Node.js version matches locally
- Ensure all dependencies are in `package.json` (not just `package-lock.json`)
- Check that TypeScript compilation succeeds

### Issue: Deployment not triggering

**Solution**:
- Verify the workflow file is in `.github/workflows/deploy.yml`
- Check that you're pushing to the `main` branch (or update workflow to match your branch)
- Ensure GitHub Actions is enabled in repository settings

### Issue: Wrong base path

**Solution**:
If you change the repository name, update:
1. `vite.config.ts`: Change `base: '/bit-waves-frontend/'` to match new repo name
2. `public/404.html`: Update `pathSegmentsToKeep` if needed
3. This documentation

## Updating the Deployment

Any push to the `main` branch will trigger a new deployment:
1. Make your changes
2. Commit and push to `main`
3. GitHub Actions will automatically build and deploy

## Local Testing

To test the production build locally:

```bash
# Build for production
npm run build:gh-pages

# Preview the built site
npm run preview
```

Note: The preview might not work perfectly due to base path differences. For best results, test on GitHub Pages directly.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Router Deployment](https://reactrouter.com/en/main/routers/create-browser-router#deployment)

