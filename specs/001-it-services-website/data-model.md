# Data Model: IT Services Startup Website

**Phase**: 1 (Design & Contracts)  
**Date**: October 19, 2025  
**Status**: Complete

## Overview

This document defines the data structures for all content entities in the IT Services website. All entities are stored as JSON files in `public/assets/data/` and loaded at runtime. No persistent storage or database is used.

---

## Entity Definitions

### 1. Service

Represents one of the three core service offerings of the company.

**Source**: `public/assets/data/services.json`

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string | ✅ | Unique identifier (slug) | Lowercase, hyphenated (e.g., "it-solutioning") |
| `name` | string | ✅ | Display name | 3-50 characters |
| `shortDescription` | string | ✅ | Brief overview for home page | 50-150 characters |
| `fullDescription` | string | ✅ | Detailed description for services page | 200-1000 characters |
| `icon` | string | ✅ | Icon identifier or path | Valid icon name or image path |
| `capabilities` | string[] | ✅ | List of key capabilities | 3-8 items, each 10-100 chars |
| `useCases` | string[] | ✅ | Target use cases | 2-5 items, each 20-150 chars |
| `ctaText` | string | ✅ | Call-to-action button text | 10-30 characters |
| `ctaLink` | string | ✅ | CTA destination | Valid path (e.g., "/contact?service=it-solutioning") |
| `order` | number | ✅ | Display order | 1-3 |

**Relationships**:
- Referenced by Case Studies (via `serviceCategory`)
- Referenced by Blog Posts (via `relatedServices`)
- Referenced by Contact Form (via `serviceInterest` dropdown)

**Example**:
```json
{
  "id": "it-solutioning",
  "name": "IT Solutioning",
  "shortDescription": "Cloud integration, API design, enterprise architecture, and system automation tailored to your business needs.",
  "fullDescription": "Our IT Solutioning services help businesses modernize their technology infrastructure...",
  "icon": "server",
  "capabilities": [
    "Cloud Integration & Migration",
    "API Design & Development",
    "Enterprise Architecture",
    "System Automation",
    "Legacy System Modernization"
  ],
  "useCases": [
    "Migrating on-premise infrastructure to AWS/Azure",
    "Building scalable microservices architectures",
    "Automating repetitive business processes"
  ],
  "ctaText": "Discuss Your IT Needs",
  "ctaLink": "/contact?service=it-solutioning",
  "order": 1
}
```

**Validation Rules**:
- Exactly 3 services must exist (per business requirement)
- IDs must be unique
- Order values must be 1, 2, 3

---

### 2. Case Study

Represents a completed client project showcasing the company's work.

**Source**: `public/assets/data/case-studies.json`

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string | ✅ | Unique identifier (slug) | Lowercase, hyphenated |
| `title` | string | ✅ | Project title | 10-100 characters |
| `client` | string | ⚠️ | Client name (anonymized if needed) | 2-50 characters, or "Confidential" |
| `industryCategory` | string | ✅ | Industry type | One of: finance, healthcare, retail, technology, manufacturing, other |
| `serviceCategory` | string | ✅ | Related service | Must match Service.id |
| `thumbnail` | string | ✅ | Preview image path | Valid path to image in /assets/images/ |
| `heroImage` | string | ✅ | Detail page main image | Valid path to image in /assets/images/ |
| `summary` | string | ✅ | Brief description for grid view | 50-200 characters |
| `problem` | string | ✅ | Problem statement | 100-500 characters |
| `solution` | string | ✅ | Solution approach | 200-800 characters |
| `outcomes` | string[] | ✅ | Measurable results | 2-5 items, each 50-200 chars |
| `metrics` | Metric[] | ❌ | Quantitative metrics | 0-4 metrics |
| `technologies` | string[] | ❌ | Technologies used (optional) | 0-10 items |
| `duration` | string | ❌ | Project duration | Format: "X months" or "X weeks" |
| `publishDate` | string | ✅ | Publication date | ISO 8601 format (YYYY-MM-DD) |
| `featured` | boolean | ✅ | Show in featured section | true/false |

**Metric Subtype**:
```typescript
interface Metric {
  label: string;     // e.g., "Cost Reduction"
  value: string;     // e.g., "40%"
  description: string; // e.g., "Reduced operational costs"
}
```

**Relationships**:
- References Service (via `serviceCategory`)
- Used by Case Studies page (filterable list)
- Used by Case Study detail page

**Example**:
```json
{
  "id": "fintech-data-pipeline",
  "title": "Real-Time Data Pipeline for Fintech Platform",
  "client": "Confidential",
  "industryCategory": "finance",
  "serviceCategory": "it-solutioning",
  "thumbnail": "/assets/images/case-studies/fintech-thumb.jpg",
  "heroImage": "/assets/images/case-studies/fintech-hero.jpg",
  "summary": "Built scalable data pipeline processing 1M+ transactions daily with 99.9% uptime.",
  "problem": "Legacy batch processing system couldn't handle real-time transaction volumes...",
  "solution": "Designed event-driven architecture using Apache Kafka and microservices...",
  "outcomes": [
    "Reduced processing latency from 24 hours to under 1 second",
    "Achieved 99.9% system uptime",
    "Enabled real-time fraud detection saving $2M annually"
  ],
  "metrics": [
    {
      "label": "Processing Speed",
      "value": "1M+",
      "description": "Transactions per day"
    },
    {
      "label": "Uptime",
      "value": "99.9%",
      "description": "System availability"
    }
  ],
  "technologies": ["Apache Kafka", "Spring Boot", "PostgreSQL", "AWS"],
  "duration": "6 months",
  "publishDate": "2024-09-15",
  "featured": true
}
```

**Validation Rules**:
- ID must be unique
- `serviceCategory` must reference existing Service.id
- `industryCategory` must be from allowed enum
- `publishDate` must be valid ISO date
- At least 1 outcome required, max 5

---

### 3. Blog Post

Represents published content demonstrating expertise.

**Source**: `public/assets/data/blog-posts.json`

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string | ✅ | Unique identifier (slug) | Lowercase, hyphenated |
| `title` | string | ✅ | Article title | 10-120 characters |
| `excerpt` | string | ✅ | Brief summary for list view | 100-300 characters |
| `content` | string | ✅ | Full article content (HTML or Markdown) | 500-10000 characters |
| `author` | string | ✅ | Author name | 2-50 characters |
| `publishDate` | string | ✅ | Publication date | ISO 8601 format (YYYY-MM-DD) |
| `updatedDate` | string | ❌ | Last updated date | ISO 8601 format (YYYY-MM-DD) |
| `category` | string | ✅ | Primary category | One of: ai, data, infrastructure, trends, tutorials |
| `tags` | string[] | ✅ | Searchable tags | 2-10 tags, each 2-30 chars |
| `thumbnail` | string | ✅ | List view image | Valid path to image in /assets/images/ |
| `heroImage` | string | ✅ | Article page main image | Valid path to image in /assets/images/ |
| `readingTime` | number | ✅ | Estimated reading time (minutes) | 1-60 minutes |
| `relatedServices` | string[] | ❌ | Related service IDs | 0-3 Service.id references |
| `featured` | boolean | ✅ | Show in featured section | true/false |

**Relationships**:
- May reference Services (via `relatedServices`)
- Used by Blog listing page (searchable, filterable)
- Used by Blog detail page
- Related articles computed by tag similarity

**Example**:
```json
{
  "id": "future-of-ai-agents",
  "title": "The Future of AI Agents in Enterprise Automation",
  "excerpt": "Explore how AI agents are transforming business processes and what it means for enterprise automation strategies.",
  "content": "<p>AI agents are rapidly evolving...</p>",
  "author": "John Smith",
  "publishDate": "2025-10-01",
  "updatedDate": null,
  "category": "ai",
  "tags": ["AI", "automation", "enterprise", "machine-learning"],
  "thumbnail": "/assets/images/blog/ai-agents-thumb.jpg",
  "heroImage": "/assets/images/blog/ai-agents-hero.jpg",
  "readingTime": 8,
  "relatedServices": ["ai-agent-development"],
  "featured": true
}
```

**Validation Rules**:
- ID must be unique
- `category` must be from allowed enum
- `tags` array must have 2-10 items
- `relatedServices` must reference existing Service.id values
- `publishDate` must be valid ISO date
- `readingTime` auto-calculated from content length (250 words/minute)

---

### 4. Team Member

Represents company personnel featured on About Us page.

**Source**: `public/assets/data/team.json`

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string | ✅ | Unique identifier (slug) | Lowercase, hyphenated |
| `name` | string | ✅ | Full name | 2-50 characters |
| `role` | string | ✅ | Job title | 5-100 characters |
| `bio` | string | ✅ | Professional background | 100-500 characters |
| `photo` | string | ❌ | Profile photo path | Valid path to image in /assets/images/, or null |
| `linkedinUrl` | string | ❌ | LinkedIn profile | Valid URL or null |
| `twitterUrl` | string | ❌ | Twitter/X profile | Valid URL or null |
| `order` | number | ✅ | Display order | Positive integer |
| `isLeadership` | boolean | ✅ | Show in leadership section | true/false |

**Relationships**:
- Used by About Us page (Team section)
- No relationships to other entities

**Example**:
```json
{
  "id": "john-smith",
  "name": "John Smith",
  "role": "Chief Technology Officer",
  "bio": "John has 15+ years of experience leading technology teams in fintech and healthcare. Previously CTO at TechCorp and architect at BigData Inc.",
  "photo": "/assets/images/team/john-smith.jpg",
  "linkedinUrl": "https://linkedin.com/in/johnsmith",
  "twitterUrl": null,
  "order": 1,
  "isLeadership": true
}
```

**Validation Rules**:
- ID must be unique
- Order must be unique (no duplicate display orders)
- URLs must be valid if provided

---

### 5. Milestone

Represents significant events in company history.

**Source**: `public/assets/data/milestones.json`

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string | ✅ | Unique identifier | Lowercase, hyphenated |
| `date` | string | ✅ | Event date | ISO 8601 format (YYYY-MM-DD or YYYY-MM) |
| `title` | string | ✅ | Milestone title | 10-100 characters |
| `description` | string | ✅ | Event description | 50-300 characters |
| `category` | string | ✅ | Milestone type | One of: founding, growth, achievement, partnership |
| `icon` | string | ❌ | Icon identifier | Valid icon name or null |

**Relationships**:
- Used by About Us page (Timeline section)
- No relationships to other entities

**Example**:
```json
{
  "id": "company-founded",
  "date": "2020-06",
  "title": "Company Founded",
  "description": "Started operations with a vision to transform enterprise IT through innovative solutions.",
  "category": "founding",
  "icon": "rocket"
}
```

**Validation Rules**:
- ID must be unique
- Date must be valid ISO date (can be year-month only)
- Category must be from allowed enum
- Timeline displays in chronological order (sorted by date)

---

### 6. Contact Submission (Ephemeral)

Represents a contact form submission (not persisted - sent via email only).

**Source**: Form input (not stored in JSON)

**Fields**:
| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `name` | string | ✅ | Visitor's name | 2-100 characters |
| `email` | string | ✅ | Email address | Valid email format |
| `phone` | string | ❌ | Phone number | Optional, 10-15 digits with optional formatting |
| `serviceInterest` | string | ✅ | Service inquiry about | Must match Service.id or "general" |
| `message` | string | ✅ | Inquiry message | 10-1000 characters |
| `timestamp` | string | ✅ | Submission time (generated) | ISO 8601 timestamp |

**Lifecycle**:
1. User fills form (FR-006)
2. Client-side validation (FR-007)
3. Submit to EmailJS
4. Send email to company address (FR-008)
5. Show confirmation to user (FR-009)
6. **No data persisted** (per clarification)

**Email Template**:
```
Subject: New Contact Form Submission - [Service Interest]

From: [Name]
Email: [Email]
Phone: [Phone]
Service Interest: [Service Interest]
Timestamp: [Timestamp]

Message:
[Message]
```

**Validation Rules**:
- Name: Required, 2-100 characters
- Email: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone: Optional, digits only with optional +, -, (, ), spaces
- Service Interest: Required, must be valid Service.id or "general"
- Message: Required, 10-1000 characters, no HTML

---

## JSON Schema Definitions

TypeScript interfaces for type safety:

```typescript
// services.json
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

// case-studies.json
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

export interface Metric {
  label: string;
  value: string;
  description: string;
}

// blog-posts.json
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

// team.json
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

// milestones.json
export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'founding' | 'growth' | 'achievement' | 'partnership';
  icon?: string;
}

// Contact form (not persisted)
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  timestamp: string;
}
```

---

## Data Loading Strategy

### Client-Side Fetch

All JSON files loaded via `fetch()` at runtime:

```typescript
// src/services/dataService.ts
export async function loadServices(): Promise<Service[]> {
  const response = await fetch('/assets/data/services.json');
  if (!response.ok) throw new Error('Failed to load services');
  return response.json();
}

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  const response = await fetch('/assets/data/case-studies.json');
  if (!response.ok) throw new Error('Failed to load case studies');
  return response.json();
}

// Similar functions for blog posts, team, milestones
```

### Caching Strategy

- JSON files cached by browser (set appropriate Cache-Control headers)
- In-memory cache after first load (React Context or custom hook)
- Rebuild/redeploy when JSON content changes

---

## Content Update Workflow

Per clarifications, content updates require developer involvement:

1. **Edit JSON file** in `public/assets/data/`
2. **Validate schema** using TypeScript types or JSON Schema validator
3. **Add/update images** in `public/assets/images/`
4. **Test locally** (`npm run dev`)
5. **Commit changes** to git
6. **Deploy** (triggers rebuild and redeploy)

**Future Enhancement**: Consider git-based CMS (TinaCMS, Decap CMS) if content updates become frequent.

---

## Validation & Error Handling

### Runtime Validation

Use Zod or similar for runtime validation:

```typescript
import { z } from 'zod';

const ServiceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(50),
  // ... other fields
});

export function validateServices(data: unknown): Service[] {
  return z.array(ServiceSchema).parse(data);
}
```

### Error Handling

- **Missing files**: Show error boundary with user-friendly message
- **Malformed JSON**: Log error, show fallback content
- **Missing images**: Use placeholder image, log warning
- **Invalid references**: Validate during build, fail CI if broken

---

## File Size Estimates

| File | Estimated Size | Items |
|------|----------------|-------|
| services.json | 2-5 KB | 3 services |
| case-studies.json | 10-20 KB | 10-15 case studies |
| blog-posts.json | 50-100 KB | 20-30 articles (with full content) |
| team.json | 3-6 KB | 5-10 team members |
| milestones.json | 2-4 KB | 8-12 milestones |
| **Total** | **~75-135 KB** | All content |

**Performance Impact**: Minimal. Total JSON size <150KB, compressed to ~40-50KB with gzip. Acceptable for initial page load.

---

## Future Considerations

1. **Content Splitting**: If blog content grows significantly, consider separate files per post
2. **Search Index**: Pre-generate search index for faster client-side search
3. **Internationalization**: Add locale field to each entity for multi-language support
4. **Versioning**: Add version field to track content changes over time
5. **CMS Migration**: Evaluate git-based or headless CMS if update frequency increases

---

**Status**: ✅ Data model complete. All entity structures defined with validation rules and TypeScript types.






