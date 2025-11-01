import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import type { Service } from '@/types/content';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Service detail component for Services page
 * FR-002: Detailed service information with capabilities and use cases
 * FR-033: Scroll-triggered animations
 */

interface ServiceDetailProps {
  service: Service;
  isReversed?: boolean;
}

export default function ServiceDetail({ service, isReversed = false }: ServiceDetailProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const shouldReduceMotion = prefersReducedMotion();

  return (
    <section
      ref={ref}
      id={service.id}
      className={`py-16 md:py-24 ${isReversed ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Icon & Overview - Left/Right alternating */}
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={
              shouldReduceMotion
                ? {}
                : isReversed
                ? scrollAnimationVariants.fadeInRight
                : scrollAnimationVariants.fadeInLeft
            }
            className={`${isReversed ? 'lg:order-2' : ''}`}
          >
            {/* Icon */}
            <div className="w-20 h-20 mb-6 text-primary-600">
              <img src={service.icon} alt="" aria-hidden="true" className="w-full h-full" />
            </div>

            {/* Name */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {service.name}
            </h2>

            {/* Full Description */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* CTA */}
            <Link to={service.ctaLink}>
              <Button variant="primary" size="lg">
                {service.ctaText}
              </Button>
            </Link>
          </motion.div>

          {/* Capabilities & Use Cases */}
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={
              shouldReduceMotion
                ? {}
                : isReversed
                ? scrollAnimationVariants.fadeInLeft
                : scrollAnimationVariants.fadeInRight
            }
            className={`${isReversed ? 'lg:order-1' : ''} space-y-8`}
          >
            {/* Capabilities */}
            <div>
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                Core Capabilities
              </h3>
              <ul className="space-y-3">
                {service.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
                Common Use Cases
              </h3>
              <ul className="space-y-3">
                {service.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-cyan-600 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

