# Data Schemas Contract

**Purpose**: Define JSON file structures and validation rules for content management  
**Requirements**: FR-046 (Load content from JSON files), FR-047 (Display images from asset directories)

---

## Overview

All website content is stored in JSON files located in `public/assets/data/`. This document provides JSON schemas, examples, and validation rules for each content type.

---

## Schema Definitions

### 1. Services Schema (`services.json`)

**File Location**: `public/assets/data/services.json`

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 3,
  "maxItems": 3,
  "items": {
    "type": "object",
    "required": ["id", "name", "shortDescription", "fullDescription", "icon", "capabilities", "useCases", "ctaText", "ctaLink", "order"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$",
        "minLength": 3,
        "maxLength": 50
      },
      "name": {
        "type": "string",
        "minLength": 3,
        "maxLength": 50
      },
      "shortDescription": {
        "type": "string",
        "minLength": 50,
        "maxLength": 150
      },
      "fullDescription": {
        "type": "string",
        "minLength": 200,
        "maxLength": 1000
      },
      "icon": {
        "type": "string",
        "minLength": 1
      },
      "capabilities": {
        "type": "array",
        "minItems": 3,
        "maxItems": 8,
        "items": {
          "type": "string",
          "minLength": 10,
          "maxLength": 100
        }
      },
      "useCases": {
        "type": "array",
        "minItems": 2,
        "maxItems": 5,
        "items": {
          "type": "string",
          "minLength": 20,
          "maxLength": 150
        }
      },
      "ctaText": {
        "type": "string",
        "minLength": 10,
        "maxLength": 30
      },
      "ctaLink": {
        "type": "string",
        "pattern": "^/"
      },
      "order": {
        "type": "integer",
        "minimum": 1,
        "maximum": 3
      }
    }
  }
}
```

**Example**:
```json
[
  {
    "id": "it-solutioning",
    "name": "IT Solutioning",
    "shortDescription": "Cloud integration, API design, enterprise architecture, and system automation tailored to your business needs.",
    "fullDescription": "Our IT Solutioning services help businesses modernize their technology infrastructure through cloud integration, API development, enterprise architecture design, and intelligent automation. We analyze your current systems, identify bottlenecks, and implement scalable solutions that reduce costs while improving performance and reliability.",
    "icon": "server",
    "capabilities": [
      "Cloud Integration & Migration (AWS, Azure, GCP)",
      "RESTful & GraphQL API Design",
      "Microservices Architecture",
      "Legacy System Modernization",
      "DevOps & CI/CD Pipeline Setup"
    ],
    "useCases": [
      "Migrating on-premise infrastructure to cloud platforms",
      "Building scalable microservices architectures",
      "Integrating disparate systems via APIs"
    ],
    "ctaText": "Discuss Your IT Needs",
    "ctaLink": "/contact?service=it-solutioning",
    "order": 1
  },
  {
    "id": "ai-agent-development",
    "name": "AI Agent Development",
    "shortDescription": "Custom AI agents, automation tools, and prompt engineering to enhance your business operations with artificial intelligence.",
    "fullDescription": "We design and develop custom AI agents tailored to your specific business needs. From chatbots and virtual assistants to intelligent automation tools and decision-support systems, our AI solutions leverage cutting-edge language models and machine learning techniques. We handle everything from prompt engineering to deployment and monitoring.",
    "icon": "brain",
    "capabilities": [
      "Custom AI Agent Design & Development",
      "LLM Integration (OpenAI, Anthropic, etc.)",
      "Prompt Engineering & Optimization",
      "RAG (Retrieval-Augmented Generation) Systems",
      "AI Agent Monitoring & Fine-tuning"
    ],
    "useCases": [
      "Building customer support chatbots",
      "Automating document processing with AI",
      "Creating intelligent research assistants"
    ],
    "ctaText": "Explore AI Solutions",
    "ctaLink": "/contact?service=ai-agent-development",
    "order": 2
  },
  {
    "id": "data-visualization",
    "name": "Data Research & Visualization",
    "shortDescription": "Data analytics, interactive dashboards, BI integration, and compelling visualizations that turn data into actionable insights.",
    "fullDescription": "Transform your data into actionable insights with our research and visualization services. We help you collect, analyze, and visualize complex datasets through interactive dashboards and custom analytics solutions. Whether you need business intelligence integration, real-time analytics, or beautiful data storytelling, we make your data work for you.",
    "icon": "chart",
    "capabilities": [
      "Custom Dashboard Development (Tableau, Power BI, D3.js)",
      "Data Pipeline & ETL Design",
      "Statistical Analysis & Modeling",
      "Real-time Analytics Systems",
      "Data Storytelling & Reporting"
    ],
    "useCases": [
      "Building executive dashboards for KPI tracking",
      "Visualizing customer behavior patterns",
      "Creating interactive data exploration tools"
    ],
    "ctaText": "Visualize Your Data",
    "ctaLink": "/contact?service=data-visualization",
    "order": 3
  }
]
```

---

### 2. Case Studies Schema (`case-studies.json`)

**File Location**: `public/assets/data/case-studies.json`

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "client", "industryCategory", "serviceCategory", "thumbnail", "heroImage", "summary", "problem", "solution", "outcomes", "publishDate", "featured"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$"
      },
      "title": {
        "type": "string",
        "minLength": 10,
        "maxLength": 100
      },
      "client": {
        "type": "string",
        "minLength": 2,
        "maxLength": 50
      },
      "industryCategory": {
        "type": "string",
        "enum": ["finance", "healthcare", "retail", "technology", "manufacturing", "other"]
      },
      "serviceCategory": {
        "type": "string"
      },
      "thumbnail": {
        "type": "string",
        "pattern": "^/assets/images/"
      },
      "heroImage": {
        "type": "string",
        "pattern": "^/assets/images/"
      },
      "summary": {
        "type": "string",
        "minLength": 50,
        "maxLength": 200
      },
      "problem": {
        "type": "string",
        "minLength": 100,
        "maxLength": 500
      },
      "solution": {
        "type": "string",
        "minLength": 200,
        "maxLength": 800
      },
      "outcomes": {
        "type": "array",
        "minItems": 2,
        "maxItems": 5,
        "items": {
          "type": "string",
          "minLength": 50,
          "maxLength": 200
        }
      },
      "metrics": {
        "type": "array",
        "maxItems": 4,
        "items": {
          "type": "object",
          "required": ["label", "value", "description"],
          "properties": {
            "label": { "type": "string" },
            "value": { "type": "string" },
            "description": { "type": "string" }
          }
        }
      },
      "technologies": {
        "type": "array",
        "maxItems": 10,
        "items": { "type": "string" }
      },
      "duration": {
        "type": "string",
        "pattern": "^\\d+ (months?|weeks?)$"
      },
      "publishDate": {
        "type": "string",
        "format": "date"
      },
      "featured": {
        "type": "boolean"
      }
    }
  }
}
```

**Example** (truncated):
```json
[
  {
    "id": "fintech-data-pipeline",
    "title": "Real-Time Data Pipeline for Fintech Platform",
    "client": "Confidential",
    "industryCategory": "finance",
    "serviceCategory": "it-solutioning",
    "thumbnail": "/assets/images/case-studies/fintech-thumb.jpg",
    "heroImage": "/assets/images/case-studies/fintech-hero.jpg",
    "summary": "Built scalable data pipeline processing 1M+ transactions daily with 99.9% uptime.",
    "problem": "Client's legacy batch processing system couldn't handle growing transaction volumes, causing delays of up to 24 hours in reporting and preventing real-time fraud detection.",
    "solution": "Designed event-driven architecture using Apache Kafka for stream processing, implemented microservices in Spring Boot, deployed on AWS with auto-scaling, and integrated real-time analytics dashboard.",
    "outcomes": [
      "Reduced processing latency from 24 hours to under 1 second",
      "Achieved 99.9% system uptime over 12 months",
      "Enabled real-time fraud detection saving $2M annually",
      "Scaled to handle 3x transaction volume growth"
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
      },
      {
        "label": "Latency",
        "value": "<1s",
        "description": "Processing time"
      }
    ],
    "technologies": ["Apache Kafka", "Spring Boot", "PostgreSQL", "AWS ECS", "Redis"],
    "duration": "6 months",
    "publishDate": "2024-09-15",
    "featured": true
  }
]
```

---

### 3. Blog Posts Schema (`blog-posts.json`)

**File Location**: `public/assets/data/blog-posts.json`

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "excerpt", "content", "author", "publishDate", "category", "tags", "thumbnail", "heroImage", "readingTime", "featured"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$"
      },
      "title": {
        "type": "string",
        "minLength": 10,
        "maxLength": 120
      },
      "excerpt": {
        "type": "string",
        "minLength": 100,
        "maxLength": 300
      },
      "content": {
        "type": "string",
        "minLength": 500,
        "maxLength": 50000
      },
      "author": {
        "type": "string",
        "minLength": 2,
        "maxLength": 50
      },
      "publishDate": {
        "type": "string",
        "format": "date"
      },
      "updatedDate": {
        "type": ["string", "null"],
        "format": "date"
      },
      "category": {
        "type": "string",
        "enum": ["ai", "data", "infrastructure", "trends", "tutorials"]
      },
      "tags": {
        "type": "array",
        "minItems": 2,
        "maxItems": 10,
        "items": {
          "type": "string",
          "minLength": 2,
          "maxLength": 30
        }
      },
      "thumbnail": {
        "type": "string",
        "pattern": "^/assets/images/"
      },
      "heroImage": {
        "type": "string",
        "pattern": "^/assets/images/"
      },
      "readingTime": {
        "type": "integer",
        "minimum": 1,
        "maximum": 60
      },
      "relatedServices": {
        "type": "array",
        "maxItems": 3,
        "items": { "type": "string" }
      },
      "featured": {
        "type": "boolean"
      }
    }
  }
}
```

**Example** (content truncated):
```json
[
  {
    "id": "future-of-ai-agents",
    "title": "The Future of AI Agents in Enterprise Automation",
    "excerpt": "Explore how AI agents are transforming business processes and what it means for enterprise automation strategies in 2025 and beyond.",
    "content": "<p>AI agents are rapidly evolving from simple chatbots to sophisticated autonomous systems...</p><p>...</p>",
    "author": "John Smith",
    "publishDate": "2025-10-01",
    "updatedDate": null,
    "category": "ai",
    "tags": ["AI", "automation", "enterprise", "machine-learning", "business"],
    "thumbnail": "/assets/images/blog/ai-agents-thumb.jpg",
    "heroImage": "/assets/images/blog/ai-agents-hero.jpg",
    "readingTime": 8,
    "relatedServices": ["ai-agent-development"],
    "featured": true
  }
]
```

---

### 4. Team Schema (`team.json`)

**File Location**: `public/assets/data/team.json`

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "name", "role", "bio", "order", "isLeadership"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 50
      },
      "role": {
        "type": "string",
        "minLength": 5,
        "maxLength": 100
      },
      "bio": {
        "type": "string",
        "minLength": 100,
        "maxLength": 500
      },
      "photo": {
        "type": ["string", "null"],
        "pattern": "^(/assets/images/|null)"
      },
      "linkedinUrl": {
        "type": ["string", "null"],
        "format": "uri"
      },
      "twitterUrl": {
        "type": ["string", "null"],
        "format": "uri"
      },
      "order": {
        "type": "integer",
        "minimum": 1
      },
      "isLeadership": {
        "type": "boolean"
      }
    }
  }
}
```

**Example**:
```json
[
  {
    "id": "john-smith",
    "name": "John Smith",
    "role": "Chief Technology Officer",
    "bio": "John has 15+ years of experience leading technology teams in fintech and healthcare. Previously CTO at TechCorp where he scaled engineering from 10 to 100+ engineers, and senior architect at BigData Inc. He holds a MS in Computer Science from MIT.",
    "photo": "/assets/images/team/john-smith.jpg",
    "linkedinUrl": "https://linkedin.com/in/johnsmith",
    "twitterUrl": null,
    "order": 1,
    "isLeadership": true
  },
  {
    "id": "jane-doe",
    "name": "Jane Doe",
    "role": "Head of AI Research",
    "bio": "Jane specializes in large language models and AI agent architectures. She has published 20+ papers on NLP and machine learning, and holds a PhD from Stanford. Previously led AI research at Google and taught at UC Berkeley.",
    "photo": "/assets/images/team/jane-doe.jpg",
    "linkedinUrl": "https://linkedin.com/in/janedoe",
    "twitterUrl": "https://twitter.com/janedoe",
    "order": 2,
    "isLeadership": true
  }
]
```

---

### 5. Milestones Schema (`milestones.json`)

**File Location**: `public/assets/data/milestones.json`

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "date", "title", "description", "category"],
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$"
      },
      "date": {
        "type": "string",
        "pattern": "^\\d{4}(-\\d{2}(-\\d{2})?)?$"
      },
      "title": {
        "type": "string",
        "minLength": 10,
        "maxLength": 100
      },
      "description": {
        "type": "string",
        "minLength": 50,
        "maxLength": 300
      },
      "category": {
        "type": "string",
        "enum": ["founding", "growth", "achievement", "partnership"]
      },
      "icon": {
        "type": ["string", "null"]
      }
    }
  }
}
```

**Example**:
```json
[
  {
    "id": "company-founded",
    "date": "2020-06",
    "title": "Company Founded",
    "description": "Started operations with a vision to transform enterprise IT through innovative solutions and cutting-edge technology.",
    "category": "founding",
    "icon": "rocket"
  },
  {
    "id": "first-client",
    "date": "2020-09",
    "title": "First Enterprise Client",
    "description": "Secured our first major enterprise client, a Fortune 500 financial services company, delivering a cloud migration project.",
    "category": "growth",
    "icon": "handshake"
  },
  {
    "id": "series-a",
    "date": "2022-03",
    "title": "Series A Funding",
    "description": "Raised $5M in Series A funding to expand our AI capabilities and grow the engineering team.",
    "category": "achievement",
    "icon": "trophy"
  }
]
```

---

## TypeScript Integration

### Type Definitions

```typescript
// src/types/content.ts
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

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industryCategory: 'finance' | 'healthcare' | 'retail' | 'technology' | 'manufacturing' | 'other';
  serviceCategory: string;
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
  relatedServices?: string[];
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
```

### Runtime Validation with Zod

```typescript
// src/utils/validation.ts
import { z } from 'zod';

const ServiceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(50),
  shortDescription: z.string().min(50).max(150),
  fullDescription: z.string().min(200).max(1000),
  icon: z.string().min(1),
  capabilities: z.array(z.string().min(10).max(100)).min(3).max(8),
  useCases: z.array(z.string().min(20).max(150)).min(2).max(5),
  ctaText: z.string().min(10).max(30),
  ctaLink: z.string().startsWith('/'),
  order: z.number().int().min(1).max(3),
});

export const ServicesSchema = z.array(ServiceSchema).length(3);

// Similarly for other schemas...

export function validateServices(data: unknown): Service[] {
  return ServicesSchema.parse(data);
}
```

---

## Image Asset Requirements

### Directory Structure

```
public/assets/images/
├── case-studies/
│   ├── fintech-thumb.jpg
│   ├── fintech-hero.jpg
│   └── ...
├── blog/
│   ├── ai-agents-thumb.jpg
│   ├── ai-agents-hero.jpg
│   └── ...
├── team/
│   ├── john-smith.jpg
│   ├── jane-doe.jpg
│   └── ...
└── icons/
    ├── server.svg
    ├── brain.svg
    └── chart.svg
```

### Image Specifications

| Type | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| Case Study Thumbnail | 600x400px | JPG/WebP | 100KB |
| Case Study Hero | 1920x1080px | JPG/WebP | 300KB |
| Blog Thumbnail | 600x400px | JPG/WebP | 100KB |
| Blog Hero | 1920x1080px | JPG/WebP | 300KB |
| Team Photo | 400x400px | JPG/WebP | 80KB |
| Icons | 64x64px | SVG/PNG | 10KB |

### Optimization

```bash
# Install sharp for image optimization
npm install sharp

# Optimize script (optional)
node scripts/optimize-images.js
```

---

## Content Update Workflow

### 1. Add New Case Study

```bash
# 1. Add images
public/assets/images/case-studies/
  new-project-thumb.jpg
  new-project-hero.jpg

# 2. Edit case-studies.json
{
  "id": "new-project",
  "title": "...",
  // ... rest of fields
}

# 3. Validate
npm run validate:data

# 4. Test locally
npm run dev

# 5. Commit and deploy
git add public/assets/data/case-studies.json public/assets/images/case-studies/
git commit -m "Add new case study: New Project"
git push
```

### 2. Update Service Description

```bash
# Edit services.json
# Update "fullDescription" field

# Validate
npm run validate:data

# Deploy
git add public/assets/data/services.json
git commit -m "Update IT Solutioning description"
git push
```

---

## Validation Script

```typescript
// scripts/validate-data.ts
import fs from 'fs';
import path from 'path';
import { validateServices, validateCaseStudies, validateBlogPosts, validateTeam, validateMilestones } from '../src/utils/validation';

const dataDir = path.join(process.cwd(), 'public/assets/data');

async function validateAllData() {
  try {
    // Validate services
    const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf-8'));
    validateServices(services);
    console.log('✅ services.json valid');

    // Validate case studies
    const caseStudies = JSON.parse(fs.readFileSync(path.join(dataDir, 'case-studies.json'), 'utf-8'));
    validateCaseStudies(caseStudies);
    console.log('✅ case-studies.json valid');

    // Similarly for other files...

    console.log('\n✅ All data files valid!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Validation failed:', error);
    process.exit(1);
  }
}

validateAllData();
```

**Add to `package.json`**:
```json
{
  "scripts": {
    "validate:data": "tsx scripts/validate-data.ts"
  }
}
```

---

## CI/CD Integration

```yaml
# .github/workflows/validate-data.yml
name: Validate Data Files

on:
  pull_request:
    paths:
      - 'public/assets/data/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run validate:data
```

---

**Status**: ✅ Contract complete. All JSON schemas defined with validation and update workflows.






