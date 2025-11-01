import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { loadServices } from '@/services/dataService';
import { updateMetaTags, pageMetadata } from '@/utils/seo';
import type { Service } from '@/types/content';
import { scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Services page
 * US1: Service Discovery - Detailed service information
 * FR-002: Comprehensive service descriptions
 * FR-048, FR-049: SEO meta tags
 */

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = prefersReducedMotion();

  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags({
      ...pageMetadata.services,
      canonicalUrl: `${window.location.origin}/services`,
    });

    // Load services data
    async function fetchServices() {
      try {
        const data = await loadServices();
        // Sort by order
        const sorted = data.sort((a, b) => a.order - b.order);
        setServices(sorted);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : "visible"}
            variants={scrollAnimationVariants.fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      {services.map((service, index) => (
        <ServiceDetail
          key={service.id}
          service={service}
          isReversed={index % 2 !== 0}
        />
      ))}

      {/* Final CTA Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollAnimationVariants.fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

