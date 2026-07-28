import { CaseStudy, TeamMember, Testimonial, BlogPost, FAQItem } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'fintech-ai-trading-platform',
    title: 'Sub-Millisecond AI Trading Portal for Apex Fintech',
    client: 'Apex Fintech Global',
    industry: 'Financial Services',
    category: 'AI & ML',
    summary: 'Re-architected the core institutional trading interface using React 19, custom WebSockets, and fine-tuned predictive ML models.',
    metrics: [
      { label: 'Latency Reduction', value: '78', suffix: '%' },
      { label: 'Concurrent Users', value: '2.5M', suffix: '+' },
      { label: 'Uptime Score', value: '99.999', suffix: '%' }
    ],
    challenge: 'Apex Fintech faced severe page freeze latency during market opening spikes, causing high-value institutional traders to drop off.',
    solution: 'CrifTech decoupled the monolithic frontend, built a zero-copy WebSocket data layer, and introduced real-time anomaly detection AI agents.',
    results: [
      'Sub-50ms market order rendering speed',
      'Zero downtime throughout 2025-2026 market volatility events',
      'Saved $3.2M in infrastructure overhead by optimizing WebSocket memory allocation'
    ],
    techUsed: ['React 19', 'TypeScript', 'WebSockets', 'Go (Golang)', 'Python PyTorch', 'Redis', 'AWS EKS'],
    featuredImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cs-2',
    slug: 'healthtech-patient-care-engine',
    title: 'HIPAA-Compliant AI Patient Care Engine for MediVault',
    client: 'MediVault Health',
    industry: 'Healthcare & MedTech',
    category: 'Web',
    summary: 'Built an end-to-end patient telemetry portal with automated clinical document parsing and SOC2 Type II security.',
    metrics: [
      { label: 'Processing Speed', value: '12x', suffix: ' Faster' },
      { label: 'HIPAA Audit Score', value: '100', suffix: '%' },
      { label: 'Patient Satisfaction', value: '4.9', suffix: '/5' }
    ],
    challenge: 'Clinical staff spent 4 hours daily entering patient notes manually, delaying urgent care recommendations.',
    solution: 'Engineered a private generative AI RAG system with voice transcription that automatically drafts structured medical summaries.',
    results: [
      'Reduced medical note entry time from 40 mins to 3 mins per patient',
      'Full HIPAA and SOC2 Type II compliance approval achieved in 30 days',
      'Seamless deployment across 52 hospital network locations'
    ],
    techUsed: ['Next.js 14', 'Google Gemini Pro RAG', 'Python FastAPI', 'Pinecone', 'Docker', 'Cloudflare WAF'],
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cs-3',
    slug: 'logistics-autonomous-dispatch',
    title: 'Autonomous AI Supply Chain Dispatching for LogiX',
    client: 'LogiX Logistics',
    industry: 'Supply Chain & Transport',
    category: 'Mobile App',
    summary: 'Built an intelligent driver mobile app and automated fleet dispatch system optimizing 8,000 active delivery vehicles.',
    metrics: [
      { label: 'Fuel Cost Savings', value: '$1.4M', suffix: '/yr' },
      { label: 'On-Time Rate', value: '99.4', suffix: '%' },
      { label: 'Active Drivers', value: '8,500', suffix: '+' }
    ],
    challenge: 'Manual fleet dispatchers struggled to dynamically reroute trucks during weather delays, leading to high fuel waste and late deliveries.',
    solution: 'Designed a React Native mobile app backed by an AI route optimization model that automatically recalibrates routes in real-time.',
    results: [
      'Cut annual driver fuel expenditure by $1,400,000',
      'Increased driver app adoption to 98% within two weeks of launch',
      'Zero delivery dropouts during holiday peak shipping weeks'
    ],
    techUsed: ['React Native', 'Expo', 'Google Maps Platform', 'Node.js', 'Kafka', 'PostgreSQL'],
    featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cs-4',
    slug: 'cloud-devops-scale-kubernetes',
    title: 'Multi-Region Cloud Kubernetes Overhaul for SaaSFlow',
    client: 'SaaSFlow Global',
    industry: 'Enterprise Software',
    category: 'Cloud',
    summary: 'Architected a zero-downtime multi-region Kubernetes topology with FinOps cost optimization and automated blue/green releases.',
    metrics: [
      { label: 'AWS Spend Reduced', value: '48', suffix: '%' },
      { label: 'Deployment Frequency', value: '15x', suffix: '/day' },
      { label: 'Global Latency', value: '<25', suffix: 'ms' }
    ],
    challenge: 'SaaSFlow suffered from runaway monthly AWS bills ($45k/mo) and risky manual software deployments that caused intermittent outages.',
    solution: 'CrifTech introduced Terraform Infrastructure-as-Code, Kubernetes spot instance auto-scaling, and automated ArgoCD pipelines.',
    results: [
      'Instantly slashed monthly AWS hosting bills from $45,000 to $23,400',
      'Enabled continuous deployment 15 times a day with zero user downtime',
      'Achieved global sub-25ms response times across US, EU, and APAC'
    ],
    techUsed: ['Kubernetes (EKS)', 'Terraform', 'ArgoCD', 'Prometheus', 'Grafana', 'Cloudflare Edge'],
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alexander V. Thorne',
    role: 'Founder & Chief Executive Officer',
    bio: 'Former Senior Principal Architect at Vercel & Tesla. 14+ years scaling high-concurrency systems and pioneering enterprise AI applications.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    github: 'https://github.com/criftech',
    expertise: ['Enterprise Strategy', 'AI Architecture', 'Distributed Systems']
  },
  {
    id: 'tm-2',
    name: 'Dr. Elena Rostova',
    role: 'Chief Technology Officer & Head of AI',
    bio: 'PhD in Computer Vision & Neural Networks from MIT. Ex-Google Brain Staff Scientist specializing in fine-tuned LLMs, RAG, and autonomous agents.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    github: 'https://github.com/criftech',
    expertise: ['LLM Fine-Tuning', 'Multi-Agent Frameworks', 'PyTorch & CUDA']
  },
  {
    id: 'tm-3',
    name: 'Marcus Vance',
    role: 'VP of Software Engineering',
    bio: 'Ex-Lead Engineer at Apple & Stripe. Master of React 19, high-performance edge rendering, and resilient microservice architectures.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    github: 'https://github.com/criftech',
    expertise: ['React 19 & Next.js', 'Go & Rust', 'Edge Computing']
  },
  {
    id: 'tm-4',
    name: 'Sophia Chen',
    role: 'Head of Product Design & UX Strategy',
    bio: 'Award-winning UI/UX director formerly at Airbnb & Figma. Passionate about spatial design systems, high-contrast light themes, and micro-interactions.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    expertise: ['Design Systems', 'Micro-Interactions', 'Product Psychology']
  },
  {
    id: 'tm-5',
    name: 'David K. Miller',
    role: 'Chief Information Security Officer (CISO)',
    bio: 'Certified Ethical Hacker (CEH) with 12 years securing FinTech & Healthcare platforms. Led 100+ flawless SOC2 Type II & ISO 27001 audits.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    expertise: ['SOC2 / HIPAA Compliance', 'Zero-Trust WAF', 'Penetration Testing']
  },
  {
    id: 'tm-6',
    name: 'Rachel K. Sterling',
    role: 'Lead Cloud Infrastructure & DevOps Specialist',
    bio: 'Kubernetes Ambassador and Terraform Contributor. Architected cloud hosting for over 120 global enterprise web platforms.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    linkedin: 'https://linkedin.com/in/criftech',
    github: 'https://github.com/criftech',
    expertise: ['Kubernetes (EKS/GKE)', 'FinOps Optimization', 'Terraform IaC']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'CrifTech rebuilt our core institutional trading dashboard in record time. The sub-second speed and zero-downtime reliability have given us a decisive edge in the market.',
    author: 'Jonathan Sterling',
    title: 'Chief Technology Officer',
    company: 'Apex Fintech Global',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    metric: '3.4x Page Speed Increase'
  },
  {
    id: 'test-2',
    quote: 'Working with CrifTech felt like hiring the top 1% engineering talent from Apple and Google. Their generative AI RAG integration saved our medical staff hundreds of hours every month.',
    author: 'Dr. Sarah Lin',
    title: 'VP of Medical Informatics',
    company: 'MediVault Health Network',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    metric: '100% HIPAA Compliance'
  },
  {
    id: 'test-3',
    quote: 'Our monthly cloud infrastructure bill was out of control. CrifTech refactored our Kubernetes clusters and saved us nearly $250,000 a year while boosting app speed.',
    author: 'Michael B. Davis',
    title: 'VP of Infrastructure',
    company: 'SaaSFlow Global',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    metric: '48% AWS Cost Reduction'
  },
  {
    id: 'test-4',
    quote: 'The level of craftsmanship and attention to UI/UX detail is extraordinary. CrifTech delivered a sleek light-mode design system that our users absolutely love.',
    author: 'Amanda Vance',
    title: 'Chief Product Officer',
    company: 'Veloce Mobility',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    metric: '+210% User Engagement'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'bp-1',
    slug: 'scaling-ai-agents-enterprise-2026',
    title: 'Architecting Production-Grade Multi-Agent Systems in 2026',
    excerpt: 'How leading enterprises are moving beyond simple ChatGPT wrappers into autonomous multi-agent networks with strict human-in-the-loop safeguards.',
    content: `
      ### The Evolution of Enterprise AI Architecture
      
      In 2026, building software with AI is no longer about simple prompt-and-response API calls. Enterprise software demands autonomous agents that can plan, reason, invoke APIs, and recover gracefully from edge cases.
      
      #### 1. Multi-Agent Orchestration
      Instead of relying on a single monolithic prompt, state-of-the-art platforms split responsibilities between a Supervisor Agent and domain-specific Specialist Agents (e.g. Data Query Specialist, Security Policy Validator, Output Formatter).
      
      #### 2. Sandboxed Tool Execution
      Safety is paramount. Agents must execute database queries and external API calls within isolated, memory-bounded sandboxes with explicit rate limits and rollback hooks.
      
      #### 3. Deterministic Guardrails
      We enforce strict JSON schema outputs and hallucination detectors that cross-verify generated facts against vector database citations before presenting results to human users.
    `,
    category: 'AI & Engineering',
    author: 'Dr. Elena Rostova',
    authorRole: 'Chief Technology Officer',
    date: 'July 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bp-2',
    slug: 'nextjs-react19-performance-guide',
    title: 'Sub-Second Web Apps: React 19, Vite & Edge Acceleration',
    excerpt: 'A technical deep-dive into how CrifTech achieves sub-second page transitions and 99+ Core Web Vitals across complex web platforms.',
    content: `
      ### The Pursuit of Zero Latency
      
      Web application performance directly impacts business revenue. A 100ms latency increase can decrease user conversion by up to 7%.
      
      #### Key Strategies We Implement:
      - **Edge Caching**: Distributing dynamic server responses across Cloudflare edge nodes located within 10ms of end users.
      - **Asset Optimization**: Serving ultra-compressed WebP and AVIF visual assets with responsive srcset boundaries.
      - **Atomic State Updates**: Minimizing re-render cascades by leveraging modern primitives like Zustand and React 19 Compiler directives.
    `,
    category: 'Frontend & Speed',
    author: 'Marcus Vance',
    authorRole: 'VP of Software Engineering',
    date: 'June 29, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bp-3',
    slug: 'finops-aws-cost-optimization-strategies',
    title: 'Cloud FinOps: How We Cut AWS Infrastructure Bills by 40%+',
    excerpt: 'Practical strategies for eliminating idle cloud compute, leveraging spot Kubernetes nodes, and rightsizing database clusters.',
    content: `
      ### Eliminating Unnecessary Cloud Waste
      
      Over 30% of enterprise cloud spend is wasted on idle development instances, unattached EBS storage volumes, and unoptimized multi-region bandwidth transfers.
      
      #### Our 4-Step FinOps Playbook:
      1. Audit idle resources with automated tagging scripts.
      2. Shift stateless workloads to Kubernetes Spot Node Pools with zero downtime.
      3. Implement Redis caching layers to reduce high-cost database IOPS read spikes.
      4. Establish automated cost anomaly alerts in Slack and PagerDuty.
    `,
    category: 'Cloud & DevOps',
    author: 'Rachel K. Sterling',
    authorRole: 'Lead Cloud Specialist',
    date: 'May 14, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
  }
];

export const GLOBAL_FAQS: FAQItem[] = [
  {
    question: 'What makes CrifTech different from traditional software agencies?',
    answer: 'CrifTech operates as a high-tier product engineering pod. We combine elite software engineering (React 19, Go, Kubernetes) with cutting-edge AI expertise (Gemini, RAG, autonomous agents) and Apple-level light-theme UI design. Every line of code is clean, typed, and built for scale.'
  },
  {
    question: 'How fast can CrifTech kick off a new software or AI project?',
    answer: 'We can deploy a dedicated engineering and design team within 5 to 7 business days following our initial technical discovery call.'
  },
  {
    question: 'How do you handle project communication and transparency?',
    answer: 'You get direct access to a dedicated Slack channel, bi-weekly video sprint demos, live Figma prototypes, and a real-time GitHub/Jira board updating code commits continuously.'
  },
  {
    question: 'What happens after project launch?',
    answer: 'We provide dedicated Service Level Agreements (SLAs) offering 24/7 proactive system monitoring, security patch management, performance tuning, and feature iterations.'
  },
  {
    question: 'Can you sign a non-disclosure agreement (NDA) before our call?',
    answer: 'Absolutely. We respect corporate confidentiality and will happily execute a mutual NDA prior to reviewing your proprietary specifications or data.'
  }
];
