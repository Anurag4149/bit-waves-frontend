import { motion } from 'framer-motion';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * About section for home page
 * Spec: Split layout with text and visual
 */

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const shouldReduceMotion = prefersReducedMotion();

  return (
    <section ref={ref} className="pt-4 pb-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
            variants={scrollAnimationVariants.fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900">
              About Us
            </h2>
            <h3 className="text-2xl font-heading font-semibold text-primary-600">
              Transforming Business Through Innovation
            </h3>
            <div className="space-y-4 text-gray-900">
              <p className="text-lg leading-relaxed">
                At Bitwaves Systems & Solutions, we are dedicated to empowering businesses with 
                cutting-edge technology solutions that drive growth and innovation.
              </p>
              <p className="leading-relaxed">
                Our mission is to deliver intelligent IT solutions, develop custom AI agents, and 
                provide powerful data visualization tools that transform how businesses operate and 
                make decisions.
              </p>
              <p className="leading-relaxed">
                With a team of experienced engineers and data scientists, we specialize in building 
                scalable, secure, and future-proof systems that give our clients a competitive edge.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? false : isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Abstract team/data visualization */}
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 h-full min-h-[400px] flex items-center justify-center">
              {/* Team collaboration illustration */}
              <svg
                className="w-full h-80"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Person 1 - Data scientist */}
                <g opacity="0.8">
                  <circle cx="100" cy="80" r="30" fill="#0ea5e9" />
                  <rect x="75" y="110" width="50" height="100" rx="5" fill="#0ea5e9" />
                  {/* Data visualization in hands */}
                  <rect x="85" y="180" width="5" height="30" fill="#38bdf8" />
                  <rect x="95" y="170" width="5" height="40" fill="#38bdf8" />
                  <rect x="105" y="160" width="5" height="50" fill="#38bdf8" />
                  <rect x="115" y="175" width="5" height="35" fill="#38bdf8" />
                </g>

                {/* Person 2 - AI specialist */}
                <g opacity="0.8">
                  <circle cx="200" cy="80" r="30" fill="#0284c7" />
                  <rect x="175" y="110" width="50" height="100" rx="5" fill="#0284c7" />
                  {/* AI/brain symbol */}
                  <path
                    d="M200 140 C180 130, 170 150, 175 170 C175 185, 200 195, 225 185 C225 175, 220 155, 200 140"
                    fill="#60a5fa"
                  />
                </g>

                {/* Person 3 - IT specialist */}
                <g opacity="0.8">
                  <circle cx="300" cy="80" r="30" fill="#0369a1" />
                  <rect x="275" y="110" width="50" height="100" rx="5" fill="#0369a1" />
                  {/* Cloud/server symbol */}
                  <ellipse cx="300" cy="170" rx="25" ry="15" fill="#7dd3fc" />
                  <ellipse cx="285" cy="160" rx="20" ry="12" fill="#bae6fd" opacity="0.7" />
                  <ellipse cx="315" cy="155" rx="18" ry="10" fill="#bae6fd" opacity="0.7" />
                </g>

                {/* Connecting lines representing collaboration */}
                <path
                  d="M130 120 L170 120 M230 120 L270 120"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  opacity="0.4"
                />
                <circle cx="150" cy="120" r="3" fill="#38bdf8" />
                <circle cx="250" cy="120" r="3" fill="#38bdf8" />

                {/* Data visualization background */}
                <rect x="50" y="230" width="300" height="60" rx="5" fill="#e0f2fe" opacity="0.5" />
                <rect x="60" y="260" width="40" height="20" fill="#38bdf8" />
                <rect x="120" y="245" width="40" height="35" fill="#38bdf8" />
                <rect x="180" y="250" width="40" height="30" fill="#38bdf8" />
                <rect x="240" y="235" width="40" height="45" fill="#38bdf8" />
                <rect x="300" y="255" width="40" height="25" fill="#38bdf8" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

