import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';
import Button from '@/components/ui/Button';

/**
 * Case Studies section for home page
 * Spec: Carousel or horizontal scroll section showcasing sample projects
 */

const caseStudies = [
  {
    id: '1',
    title: 'AI-Powered Customer Support',
    category: 'AI Agent Development',
    description: 'Developed intelligent AI agents for automated customer support, reducing response time by 80%.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  },
  {
    id: '2',
    title: 'Enterprise Data Visualization',
    category: 'Data Research & Visualization',
    description: 'Created interactive dashboards for real-time business intelligence and decision-making.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Migration',
    category: 'IT Solutioning',
    description: 'Seamlessly migrated enterprise systems to cloud, improving scalability and reducing costs by 40%.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
];

export default function CaseStudies() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const shouldReduceMotion = prefersReducedMotion();

  return (
    <section ref={ref} className="pt-4 pb-4 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.fadeInUp}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Featured Case Studies
          </h2>
          <p className="text-lg md:text-xl text-gray-900">
            Explore our recent projects and research insights
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={scrollAnimationVariants.fadeInUp}
              custom={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-gray-900 mb-4 line-clamp-3">
                  {study.description}
                </p>
                <Link
                  to={`/case-studies/${study.id}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
          variants={scrollAnimationVariants.fadeInUp}
          className="mt-12 text-center"
        >
          <Link to="/case-studies">
            <Button variant="secondary" size="lg">
              View All Case Studies
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

