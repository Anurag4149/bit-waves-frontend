import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import type { Service } from '@/types/content';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Service card component with icon, description, and hover effects
 * FR-002: Service information display
 * FR-034: Hover effects for interactive elements
 * FR-045: Respects prefers-reduced-motion
 */

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const shouldReduceMotion = prefersReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
      }
      className="h-full"
    >
      <Card hover padding="lg" className="h-full flex flex-col">
        {/* Icon */}
        <div className="w-16 h-16 mb-6 text-primary-600">
          <img src={service.icon} alt="" aria-hidden="true" className="w-full h-full" />
        </div>

        {/* Name */}
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
          {service.shortDescription}
        </p>

        {/* CTA */}
        <Link to={service.ctaLink} className="mt-auto">
          <Button
            variant="primary"
            fullWidth
            className="group"
          >
            {service.ctaText}
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
}

