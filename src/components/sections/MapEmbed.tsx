import { useState } from 'react';
import { motion } from 'framer-motion';
import { scrollAnimationVariants, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Google Maps embed component for office location
 * FR-012: Office location map
 * FR-043: Graceful degradation if map fails to load
 */

export default function MapEmbed() {
  const [hasError, setHasError] = useState(false);
  const mapEmbedUrl = import.meta.env.VITE_OFFICE_MAP_EMBED_URL;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const shouldReduceMotion = prefersReducedMotion();

  // Fallback if map URL is not configured
  if (!mapEmbedUrl) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <svg
          className="h-12 w-12 text-gray-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-gray-600">Map location coming soon</p>
      </div>
    );
  }

  // Error fallback
  if (hasError) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <svg
          className="h-12 w-12 text-gray-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-gray-600 mb-2">Unable to load map</p>
        <p className="text-sm text-gray-500">
          Please visit our office at the address shown, or contact us for directions.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
      variants={scrollAnimationVariants.fadeInUp}
      className="rounded-lg overflow-hidden shadow-md"
    >
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location Map"
        aria-label="Google Maps showing our office location"
        onError={() => setHasError(true)}
        className="w-full"
      />
    </motion.div>
  );
}

