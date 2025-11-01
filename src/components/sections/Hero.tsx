import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Hero section for home page
 * FR-001: Impactful value proposition
 * FR-033: Scroll-triggered animations (fade-in)
 * FR-045: Respects prefers-reduced-motion
 */

export default function Hero() {
  const shouldReduceMotion = prefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:32px_32px]"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-24 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
            className="text-center lg:text-left"
        >
          <motion.h1
            variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-cyan-300"
          >
              Empowering Innovation through{' '}
              <span className="text-cyan-300">Technology</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
              className="text-lg sm:text-xl md:text-xl text-black mb-8 leading-relaxed"
          >
              We specialize in IT Solutions, AI Agents Development, and Data Research.
          </motion.p>

          <motion.div
            variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
              <Link to="/services">
              <Button
                variant="primary"
                size="lg"
                  className="bg-sky-300 text-black hover:bg-sky-400 focus:ring-cyan-500 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                  Explore Our Solutions
              </Button>
            </Link>
              <Link to="/contact">
              <Button
                variant="ghost"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                  Contact Us
              </Button>
            </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - IT Services Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* IT Services Visual */}
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Animated background circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-64 h-64 rounded-full border-2 border-cyan-400/20"
                  style={{
                    top: `${25 + i * 25}%`,
                    left: `${15 + i * 20}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.7,
                  }}
                />
              ))}
              
              {/* Website Development Process Visual */}
              <svg
                className="w-96 h-96 relative z-10"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2"/>
                  </filter>
                </defs>
                
                {/* Top: Browser Window (Website) - Refined */}
                <motion.g
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <rect x="80" y="40" width="240" height="160" rx="6" fill="#0ea5e9" opacity="0.8" stroke="#7dd3fc" strokeWidth="1.5" />
                  {/* Browser bar */}
                  <rect x="90" y="50" width="220" height="24" rx="2" fill="white" opacity="0.5" />
                  <circle cx="105" cy="62" r="5" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
                  <circle cx="125" cy="62" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="0.5" />
                  <circle cx="145" cy="62" r="5" fill="#10b981" stroke="#fff" strokeWidth="0.5" />
                  
                  {/* Website content */}
                  <rect x="95" y="82" width="100" height="18" rx="2" fill="#38bdf8" opacity="0.75" />
                  <rect x="95" y="108" width="200" height="10" rx="1" fill="#60a5fa" opacity="0.65" />
                  <rect x="95" y="122" width="160" height="10" rx="1" fill="#60a5fa" opacity="0.65" />
                  <rect x="95" y="142" width="140" height="50" rx="4" fill="#38bdf8" opacity="0.55" stroke="#7dd3fc" strokeWidth="0.5" />
                </motion.g>
                
                {/* Left: Code Symbol - Refined */}
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <rect x="30" y="200" width="120" height="140" rx="6" fill="#38bdf8" opacity="0.75" stroke="#7dd3fc" strokeWidth="1.5" />
                  {/* Syntax highlighting */}
                  <text x="42" y="235" fill="#fbbf24" fontSize="16" fontFamily="monospace">{'<'}</text>
                  <text x="53" y="235" fill="#0ea5e9" fontSize="16" fontFamily="monospace">code</text>
                  <text x="95" y="235" fill="#fbbf24" fontSize="16" fontFamily="monospace">{'>'}</text>
                  
                  <text x="42" y="265" fill="#60a5fa" fontSize="14" fontFamily="monospace">  return</text>
                  <text x="42" y="290" fill="#7dd3fc" fontSize="14" fontFamily="monospace">  {'('}</text>
                  <text x="42" y="315" fill="#38bdf8" fontSize="14" fontFamily="monospace">    {'{'}</text>
                  <text x="42" y="340" fill="#60a5fa" fontSize="14" fontFamily="monospace">      ...</text>
                  <text x="42" y="365" fill="#38bdf8" fontSize="14" fontFamily="monospace">    {'}'}</text>
                </motion.g>
                
                {/* Right: Mobile Device - Refined */}
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <rect x="250" y="210" width="70" height="130" rx="10" fill="#0ea5e9" opacity="0.8" stroke="#7dd3fc" strokeWidth="1.5" />
                  <rect x="260" y="225" width="50" height="95" rx="3" fill="#38bdf8" opacity="0.55" stroke="#7dd3fc" strokeWidth="0.5" />
                  {/* Screen content */}
                  <rect x="268" y="235" width="34" height="8" rx="1" fill="#60a5fa" opacity="0.8" />
                  <rect x="268" y="248" width="24" height="8" rx="1" fill="#60a5fa" opacity="0.8" />
                  <rect x="268" y="270" width="34" height="42" rx="3" fill="#7dd3fc" opacity="0.7" stroke="#60a5fa" strokeWidth="0.5" />
                  
                  {/* Home button */}
                  <circle cx="285" cy="340" r="5" fill="#0ea5e9" opacity="0.65" stroke="#fff" strokeWidth="1" />
                </motion.g>
                
                {/* Bottom: Database - Refined */}
                <motion.g
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  {/* Left Database cylinder */}
                  <ellipse cx="100" cy="360" rx="32" ry="9" fill="#38bdf8" opacity="0.65" />
                  <rect x="68" y="295" width="64" height="65" fill="#38bdf8" opacity="0.7" />
                  <ellipse cx="100" cy="295" rx="32" ry="9" fill="#0ea5e9" opacity="0.85" />
                  
                  {/* Data bars */}
                  <rect x="76" y="308" width="8" height="38" fill="#0ea5e9" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="88" y="298" width="8" height="48" fill="#60a5fa" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="100" y="313" width="8" height="33" fill="#0ea5e9" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="112" y="303" width="8" height="43" fill="#60a5fa" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  
                  {/* Right Database cylinder */}
                  <ellipse cx="250" cy="360" rx="32" ry="9" fill="#38bdf8" opacity="0.65" />
                  <rect x="218" y="295" width="64" height="65" fill="#38bdf8" opacity="0.7" />
                  <ellipse cx="250" cy="295" rx="32" ry="9" fill="#0ea5e9" opacity="0.85" />
                  
                  {/* Data bars */}
                  <rect x="226" y="308" width="8" height="38" fill="#0ea5e9" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="238" y="298" width="8" height="48" fill="#60a5fa" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="250" y="313" width="8" height="33" fill="#0ea5e9" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                  <rect x="262" y="303" width="8" height="43" fill="#60a5fa" rx="2" stroke="#7dd3fc" strokeWidth="0.5" />
                </motion.g>
                
                {/* Cloud (Hosting) - Refined */}
                <motion.path
                  d="M200 180C215 165 245 165 260 180C275 180 290 195 290 215C290 235 275 250 260 250H200C185 250 170 235 170 215C170 195 185 180 200 180Z"
                  fill="url(#cloudGradient)"
                  opacity="0.85"
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                
                {/* Connection lines showing flow - Refined */}
                <motion.path
                  d="M110 180 L80 220 L190 220 L200 220 M300 220 L310 220 M200 200 L200 220 M90 280 L90 300 M310 280 L310 300"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                
                {/* Process flow arrows - Refined */}
                <motion.polygon
                  points="195,230 205,230 200,237"
                  fill="#38bdf8"
                  opacity="0.7"
                  stroke="#7dd3fc"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Data flow particles - Refined */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={90 + i * 30}
                    cy={265}
                    r="3"
                    fill="#60a5fa"
                    stroke="#7dd3fc"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-10"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

