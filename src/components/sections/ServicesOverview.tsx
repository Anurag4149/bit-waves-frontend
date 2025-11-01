import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { loadServices } from '@/services/dataService';
import type { Service } from '@/types/content';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Services overview section for home page
 * FR-002: Display 3 core services
 * FR-033: Scroll-triggered animations
 */

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const shouldReduceMotion = prefersReducedMotion();

  useEffect(() => {
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="pt-0 pb-4 md:pb-6 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-900 max-w-3xl mx-auto">
            Comprehensive technology solutions to accelerate your digital transformation
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={scrollAnimationVariants.fadeInUp}
              custom={index}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.fadeInUp}
          className="text-center"
        >
          <Link to="/services">
            <Button variant="secondary" size="lg">
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

