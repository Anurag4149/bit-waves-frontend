/**
 * SEO utility functions for managing meta tags and page metadata
 * FR-048, FR-049, FR-050: Basic SEO optimization
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

/**
 * Update document title and meta tags
 */
export function updateMetaTags(metadata: PageMetadata): void {
  // Update title
  document.title = metadata.title;

  // Update or create meta description
  updateMetaTag('name', 'description', metadata.description);

  // Update keywords if provided
  if (metadata.keywords) {
    updateMetaTag('name', 'keywords', metadata.keywords);
  }

  // Open Graph tags for social sharing
  updateMetaTag('property', 'og:title', metadata.title);
  updateMetaTag('property', 'og:description', metadata.description);
  
  if (metadata.ogImage) {
    updateMetaTag('property', 'og:image', metadata.ogImage);
  }
  
  if (metadata.ogType) {
    updateMetaTag('property', 'og:type', metadata.ogType);
  } else {
    updateMetaTag('property', 'og:type', 'website');
  }

  // Canonical URL
  if (metadata.canonicalUrl) {
    updateLinkTag('canonical', metadata.canonicalUrl);
  }

  // Twitter Card tags
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', metadata.title);
  updateMetaTag('name', 'twitter:description', metadata.description);
  
  if (metadata.ogImage) {
    updateMetaTag('name', 'twitter:image', metadata.ogImage);
  }
}

/**
 * Helper to update or create a meta tag
 */
function updateMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
): void {
  let element = document.querySelector(
    `meta[${attributeName}="${attributeValue}"]`
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.content = content;
}

/**
 * Helper to update or create a link tag
 */
function updateLinkTag(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

/**
 * Default metadata for the site
 */
export const defaultMetadata: PageMetadata = {
  title: 'IT Services | AI Agents | Data Visualization - Bit Waves',
  description:
    'Transform your business with cutting-edge IT solutions, custom AI agents, and powerful data visualization. Expert IT solutioning, AI agent development, and data research services.',
  keywords:
    'IT services, AI agents, data visualization, cloud integration, API design, enterprise architecture, system automation, machine learning, business intelligence',
  ogType: 'website',
};

/**
 * Page-specific metadata templates
 */
export const pageMetadata = {
  home: {
    title: 'IT Services | AI Agents | Data Visualization - Bit Waves',
    description:
      'Transform your business with cutting-edge IT solutions, custom AI agents, and powerful data visualization. Expert services in IT solutioning, AI development, and data research.',
  },
  services: {
    title: 'Our Services | IT Solutioning, AI Agents, Data Visualization',
    description:
      'Explore our comprehensive services: cloud integration, API design, custom AI agent development, data analytics, and visualization solutions tailored to your business needs.',
  },
  about: {
    title: 'About Us | Expert IT & AI Solutions Team',
    description:
      'Meet our team of experts in IT solutioning, AI agent development, and data visualization. Learn about our vision, mission, and approach to technology innovation.',
  },
  caseStudies: {
    title: 'Case Studies | Proven IT & AI Solutions',
    description:
      'Explore real-world examples of our IT solutions, AI agent implementations, and data visualization projects. See how we deliver measurable results for clients.',
  },
  blog: {
    title: 'Blog | Insights on IT, AI, and Data',
    description:
      'Expert insights and articles on IT solutioning, AI agent development, data visualization, cloud architecture, and emerging technology trends.',
  },
  contact: {
    title: 'Contact Us | Get in Touch',
    description:
      'Ready to transform your business? Contact us to discuss your IT needs, AI solutions, or data visualization requirements. Book a consultation today.',
  },
};




