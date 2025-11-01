import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import WhyITServices from '@/components/sections/WhyITServices';
import About from '@/components/sections/About';
import CaseStudies from '@/components/sections/CaseStudies';
import ContactCTA from '@/components/sections/ContactCTA';
import { updateMetaTags, pageMetadata } from '@/utils/seo';

/**
 * Home page
 * Spec: Complete homepage with all sections
 * - Hero Section
 * - About Us
 * - Case Studies
 * - Contact/CTA
 */

export default function Home() {
  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags({
      ...pageMetadata.home,
      canonicalUrl: `${window.location.origin}/`,
    });
    // Debug: Log when component renders
    console.log('Home page component rendered');
  }, []);

  return (
    <>
      <Hero />
      <WhyITServices />
      <About />
      <CaseStudies />
      <ContactCTA />
    </>
  );
}

