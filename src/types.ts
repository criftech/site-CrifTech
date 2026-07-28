export type PageRoute =
  | 'home'
  | 'services'
  | 'service-detail'
  | 'case-studies'
  | 'case-study-detail'
  | 'about'
  | 'team'
  | 'careers'
  | 'blog'
  | 'contact'
  | 'privacy'
  | 'terms';

export type ServiceCategory =
  | 'Core Development'
  | 'AI & Data'
  | 'Design & Growth'
  | 'Cloud & QA';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  problemStatement: {
    headline: string;
    points: string[];
  };
  processSteps: ProcessStep[];
  techStack: {
    category: string;
    items: string[];
  }[];
  caseStudyHighlight: {
    client: string;
    metrics: string;
    title: string;
    summary: string;
  };
  pricingTiers: PricingTier[];
  faqs: FAQItem[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: 'Web' | 'Mobile App' | 'AI & ML' | 'Cloud';
  summary: string;
  metrics: { label: string; value: string; suffix?: string }[];
  challenge: string;
  solution: string;
  results: string[];
  techUsed: string[];
  featuredImage: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin: string;
  github?: string;
  expertise: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  metric: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Lead {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'Active' | 'Unsubscribed';
}

export interface MailInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  submittedAt: string;
  type: string;
  isRead: boolean;
  isStarred?: boolean;
  notes?: string;
}

export interface LogoSizeConfig {
  navbarHeightPx: number;
  navbarMinWidthPx: number;
  navbarRadiusPx: number;
  footerHeightPx: number;
  footerMinWidthPx: number;
  footerRadiusPx: number;
  wrapperEnabled: boolean;
  wrapperPaddingPx: number;
  wrapperShadow: boolean;
  wrapperBlueGlow: boolean;
  navbarZoom: number;
  navbarOffsetXPx: number;
  navbarOffsetYPx: number;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  operatingHours: string;
  primaryColor: string;
  logoUrl?: string;
  logoSizeConfig: LogoSizeConfig;

  // Social
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;

  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroBannerImage?: string;
  heroTechPills: string[];

  // About & Vision
  aboutHeadline: string;
  aboutStory: string;
  missionStatement: string;
  visionStatement: string;
  stats: { label: string; value: string; suffix: string }[];
  coreValues: { title: string; description: string; icon: string }[];

  // Services Headers
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;

  // Case Studies Headers
  caseStudiesSectionTitle: string;
  caseStudiesSectionSubtitle: string;

  // Careers Page
  careersHeaderTitle: string;
  careersHeaderDesc: string;
  jobOpenings: JobOpening[];

  // Contact Page
  contactHeaderTitle: string;
  contactHeaderDesc: string;
  mapEmbedUrl: string;

  // Legal Pages
  privacyPolicyText: string;
  termsOfServiceText: string;
}
