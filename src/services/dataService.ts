import type {
  Service,
  CaseStudy,
  BlogPost,
  TeamMember,
  Milestone,
} from '@/types/content';

/**
 * Data service for loading JSON content files
 * All data is stored in public/assets/data/ and loaded via fetch
 */

export async function loadServices(): Promise<Service[]> {
  try {
    const response = await fetch('/assets/data/services.json');
    if (!response.ok) {
      throw new Error(`Failed to load services: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error loading services:', error);
    return [];
  }
}

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await fetch('/assets/data/case-studies.json');
    if (!response.ok) {
      throw new Error(`Failed to load case studies: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error loading case studies:', error);
    return [];
  }
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/assets/data/blog-posts.json');
    if (!response.ok) {
      throw new Error(`Failed to load blog posts: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function loadTeam(): Promise<TeamMember[]> {
  try {
    const response = await fetch('/assets/data/team.json');
    if (!response.ok) {
      throw new Error(`Failed to load team: ${response.statusText}`);
    }
    const team: TeamMember[] = await response.json();
    // Sort by order
    return team.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading team:', error);
    return [];
  }
}

export async function loadMilestones(): Promise<Milestone[]> {
  try {
    const response = await fetch('/assets/data/milestones.json');
    if (!response.ok) {
      throw new Error(`Failed to load milestones: ${response.statusText}`);
    }
    const milestones: Milestone[] = await response.json();
    // Sort by date (most recent first)
    return milestones.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading milestones:', error);
    return [];
  }
}

/**
 * Get a single service by ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const services = await loadServices();
  return services.find(service => service.id === id) || null;
}

/**
 * Get a single case study by ID
 */
export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const caseStudies = await loadCaseStudies();
  return caseStudies.find(study => study.id === id) || null;
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.id === id) || null;
}




