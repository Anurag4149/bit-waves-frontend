import { motion } from 'framer-motion';
import { scrollAnimationVariants, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Contact information component with clickable email, phone, and social links
 * FR-011: Clickable email, phone, and social media links
 */

export default function ContactInfo() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const shouldReduceMotion = prefersReducedMotion();

  const contactDetails = [
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: 'Email',
      value: 'contact@bitwaves.com',
      href: 'mailto:contact@bitwaves.com',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
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
      ),
      label: 'Address',
      value: '123 Tech Street, San Francisco, CA 94105',
      href: null,
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
      variants={scrollAnimationVariants.fadeInUp}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-8"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">
          Contact Information
        </h2>

        {/* Contact Details */}
        <div className="space-y-4">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 text-primary-600 mt-1">{detail.icon}</div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">{detail.label}</div>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-base text-gray-900 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <div className="text-base text-gray-900">{detail.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded p-2"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday:</span>
            <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span className="font-medium text-gray-900">Closed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

