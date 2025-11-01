import { z } from 'zod';

/**
 * Zod validation schemas for JSON data
 * Ensures type safety and runtime validation
 */

// Service schema
export const ServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  icon: z.string().min(1),
  capabilities: z.array(z.string()),
  useCases: z.array(z.string()),
  ctaText: z.string().min(1),
  ctaLink: z.string().min(1),
  order: z.number().int().positive(),
});

export const ServicesArraySchema = z.array(ServiceSchema);

// Metric schema
export const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
});

// Case Study schema
export const CaseStudySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  client: z.string().min(1),
  industryCategory: z.enum([
    'finance',
    'healthcare',
    'retail',
    'technology',
    'manufacturing',
    'other',
  ]),
  serviceCategory: z.string().min(1),
  thumbnail: z.string().min(1),
  heroImage: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  outcomes: z.array(z.string()),
  metrics: z.array(MetricSchema).optional(),
  technologies: z.array(z.string()).optional(),
  duration: z.string().optional(),
  publishDate: z.string().min(1),
  featured: z.boolean(),
});

export const CaseStudiesArraySchema = z.array(CaseStudySchema);

// Blog Post schema
export const BlogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  publishDate: z.string().min(1),
  updatedDate: z.string().optional(),
  category: z.enum(['ai', 'data', 'infrastructure', 'trends', 'tutorials']),
  tags: z.array(z.string()),
  thumbnail: z.string().min(1),
  heroImage: z.string().min(1),
  readingTime: z.number().int().positive(),
  relatedServices: z.array(z.string()).optional(),
  featured: z.boolean(),
});

export const BlogPostsArraySchema = z.array(BlogPostSchema);

// Team Member schema
export const TeamMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  photo: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
  order: z.number().int().nonnegative(),
  isLeadership: z.boolean(),
});

export const TeamMembersArraySchema = z.array(TeamMemberSchema);

// Milestone schema
export const MilestoneSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['founding', 'growth', 'achievement', 'partnership']),
  icon: z.string().optional(),
});

export const MilestonesArraySchema = z.array(MilestoneSchema);

// Contact Form Data schema
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Helper function to validate and parse JSON data
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

