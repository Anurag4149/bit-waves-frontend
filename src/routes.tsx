import { lazy } from 'react';

/**
 * Route configuration for the application
 * Uses lazy loading for code splitting (SC-005: performance)
 * FR-003: All primary pages accessible
 * FR-036: 404 error page
 */

// Lazy-loaded page components
const Home = lazy(() => import('@/pages/Home/Home'));
const Services = lazy(() => import('@/pages/Services/Services'));
const About = lazy(() => import('@/pages/About/About'));
const CaseStudiesIndex = lazy(() => import('@/pages/CaseStudies/CaseStudiesIndex'));
const CaseStudyDetail = lazy(() => import('@/pages/CaseStudies/CaseStudyDetail'));
const BlogIndex = lazy(() => import('@/pages/Blog/BlogIndex'));
const BlogDetail = lazy(() => import('@/pages/Blog/BlogDetail'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

/**
 * Application routes
 */
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/case-studies',
    element: <CaseStudiesIndex />,
  },
  {
    path: '/case-studies/:id',
    element: <CaseStudyDetail />,
  },
  {
    path: '/blog',
    element: <BlogIndex />,
  },
  {
    path: '/blog/:id',
    element: <BlogDetail />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];




