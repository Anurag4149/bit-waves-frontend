// Entity type definitions for IT Services Website

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  capabilities: string[];
  useCases: string[];
  ctaText: string;
  ctaLink: string;
  order: number;
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industryCategory: 'finance' | 'healthcare' | 'retail' | 'technology' | 'manufacturing' | 'other';
  serviceCategory: string; // References Service.id
  thumbnail: string;
  heroImage: string;
  summary: string;
  problem: string;
  solution: string;
  outcomes: string[];
  metrics?: Metric[];
  technologies?: string[];
  duration?: string;
  publishDate: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  category: 'ai' | 'data' | 'infrastructure' | 'trends' | 'tutorials';
  tags: string[];
  thumbnail: string;
  heroImage: string;
  readingTime: number;
  relatedServices?: string[]; // References Service.id[]
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  order: number;
  isLeadership: boolean;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'founding' | 'growth' | 'achievement' | 'partnership';
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  timestamp: string;
}





