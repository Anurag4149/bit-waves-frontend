import { motion } from 'framer-motion';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Why IT Services section - Flow diagram explaining the importance of IT services
 */

export default function WhyITServices() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const shouldReduceMotion = prefersReducedMotion();

  const reasons = [
    {
      id: 1,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Boost Productivity',
      description: 'Automate workflows and eliminate manual processes to save time and resources.',
    },
    {
      id: 2,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Enhance Security',
      description: 'Protect your data with enterprise-grade security measures and compliance.',
    },
    {
      id: 3,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Drive Growth',
      description: 'Scale your business with flexible IT infrastructure that grows with you.',
    },
    {
      id: 4,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Data-Driven Decisions',
      description: 'Make informed choices with real-time analytics and business intelligence.',
    },
  ];

  return (
    <section ref={ref} className="pt-4 md:pt-6 pb-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Why IT Services Matter
          </h2>
          <p className="text-lg md:text-xl text-gray-900 max-w-3xl mx-auto">
            Transform your business with technology solutions that drive innovation and success
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
                variants={scrollAnimationVariants.fadeInUp}
                custom={index}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white p-8 rounded-xl transition-all duration-300 h-full flex flex-col items-center text-center group hover:shadow-xl">
                  {/* Icon */}
                  <div className="text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {reason.id}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-900 flex-grow">
                    {reason.description}
                  </p>

                  {/* Arrow connector for desktop */}
                  {index < reasons.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Flow Icon */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
            variants={scrollAnimationVariants.scaleIn}
            className="mt-12 flex justify-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-cyan-600 p-8 rounded-full shadow-xl">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
            variants={scrollAnimationVariants.fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-2xl font-heading font-bold text-gray-900 mb-4">
              = Competitive Advantage
            </p>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              In today's digital-first world, quality IT services are not just an option—they're essential for staying competitive, secure, and innovative.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

