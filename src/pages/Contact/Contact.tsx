import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';
import MapEmbed from '@/components/sections/MapEmbed';
import { updateMetaTags, pageMetadata } from '@/utils/seo';
import { scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Contact page
 * US2: Contact & Engagement - Full contact page with form, map, and info
 * FR-006: Contact form, email, phone, and social links
 * FR-012: Office location map
 * FR-048, FR-049: SEO meta tags
 */

export default function Contact() {
  const shouldReduceMotion = prefersReducedMotion();

  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags({
      ...pageMetadata.contact,
      canonicalUrl: `${window.location.origin}/contact`,
    });
  }, []);

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
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100">
              Have a project in mind? Let's discuss how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                Visit Our Office
              </h2>
              <p className="text-lg text-gray-600">
                We're located in the heart of San Francisco. Drop by for a coffee and a chat!
              </p>
            </div>
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}

