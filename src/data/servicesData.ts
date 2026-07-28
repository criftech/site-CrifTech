import { ServiceItem } from '../types';

export const ALL_SERVICES: ServiceItem[] = [
  // 1. Core Development
  {
    id: '1',
    slug: 'custom-web-apps',
    title: 'Custom Web Applications',
    category: 'Core Development',
    iconName: 'Globe',
    shortDesc: 'High-performance, scalable web platforms built with React, Vite, Next.js, and server-side edge runtimes.',
    fullDesc: 'We architect and build enterprise-grade, ultra-responsive web applications designed for maximum speed, security, and effortless scalability under high concurrency loads.',
    problemStatement: {
      headline: 'Legacy web stacks suffer from slow load times, poor mobile responsiveness, and fragile monolithic architecture.',
      points: [
        'High latency causing lower conversion rates and user drop-offs',
        'Inability to handle spike traffic during product launches or campaigns',
        'Outdated UI frameworks requiring frequent bug fixes and costly refactoring'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Architecture & Prototype',
        description: 'Define component architecture, design system tokenization, and API integration strategy.',
        deliverables: ['Figma Design System', 'System Architecture Diagram', 'Tech Stack Benchmark']
      },
      {
        number: '02',
        title: 'Frontend & Edge Dev',
        description: 'Develop pixel-perfect React/Vite/Next components with sub-second page transitions.',
        deliverables: ['Clean TypeScript Codebase', 'Component UI Kit', 'State Management Engine']
      },
      {
        number: '03',
        title: 'API & Database Integration',
        description: 'Connect REST/GraphQL endpoints, implement caching layers, and optimize query latency.',
        deliverables: ['API Connectors', 'Redis Caching Layer', 'Security Middleware']
      },
      {
        number: '04',
        title: 'Performance & Launch',
        description: 'Achieve 95+ PageSpeed scores, deploy to global CDN edge networks, and conduct load tests.',
        deliverables: ['Lighthouse 95+ Audit', 'CI/CD Pipeline', '24/7 Monitoring Setup']
      }
    ],
    techStack: [
      { category: 'Frontend', items: ['React 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'] },
      { category: 'Backend & Edge', items: ['Node.js', 'Express', 'Vite', 'Cloudflare Workers', 'Redis'] },
      { category: 'Databases', items: ['PostgreSQL', 'Firestore', 'Prisma', 'Drizzle ORM'] }
    ],
    caseStudyHighlight: {
      client: 'Apex Fintech Global',
      metrics: '+340% Traffic Capacity | 1.1s Load Time',
      title: 'Rebuilding Next-Gen Trading Dashboard for 2.5M Users',
      summary: 'Migrated legacy portal to an ultra-fast React web app, achieving sub-second updates and 99.99% uptime during market volatility.'
    },
    pricingTiers: [
      {
        name: 'Starter Sprint',
        price: '$12,000',
        timeline: '3 - 4 Weeks',
        description: 'Ideal for early-stage products needing a high-impact MVP or marketing web app.',
        features: ['Up to 6 custom interactive pages', 'Responsive layout for all screen sizes', 'Headless CMS integration', 'SEO & Core Web Vitals optimization', '1 Month post-launch SLA']
      },
      {
        name: 'Enterprise App',
        price: '$28,000',
        timeline: '6 - 8 Weeks',
        recommended: true,
        description: 'Comprehensive full-stack web application with authentication, real-time data, & custom APIs.',
        features: ['Full application architecture', 'Custom design system in Figma', 'Role-based access control (RBAC)', 'Real-time WebSocket/Server Events', 'Full CI/CD & Automated tests', '3 Months dedicated SLA']
      },
      {
        name: 'Custom Scale System',
        price: '$55,000+',
        timeline: '10+ Weeks',
        description: 'Complex multi-tenant platforms, micro-frontends, and high-load web systems.',
        features: ['Micro-frontend modular architecture', 'Multi-region failover infrastructure', 'SOC2 / ISO compliance design', 'Dedicated senior engineering pod', '24/7 Priority SLA & Monitoring']
      }
    ],
    faqs: [
      {
        question: 'How do you guarantee sub-second load times?',
        answer: 'We utilize edge caching, server-side streaming, code-splitting, WebP asset optimization, and strict Core Web Vitals performance budgets.'
      },
      {
        question: 'Can you integrate our existing backend APIs?',
        answer: 'Yes, our team specializes in building resilient client-side and edge wrappers for existing REST, GraphQL, or gRPC backend services.'
      },
      {
        question: 'Who owns the intellectual property and code?',
        answer: 'You retain 100% full ownership of all source code, design assets, and architectural documentation upon project completion.'
      }
    ]
  },

  // 2. Mobile App Development
  {
    id: '2',
    slug: 'mobile-app-dev',
    title: 'Mobile App Development (iOS & Android)',
    category: 'Core Development',
    iconName: 'Smartphone',
    shortDesc: 'Native-feel cross-platform mobile apps built with React Native and Flutter for seamless iOS and Android deployment.',
    fullDesc: 'Deliver delightful, high-framerate mobile experiences. We build feature-rich mobile apps with offline synchronization, push notifications, and biometric authentication.',
    problemStatement: {
      headline: 'Building separate native iOS and Android apps doubles engineering costs and creates feature parity gaps.',
      points: [
        'Slow feature updates across dual app store release cycles',
        'Clunky hybrid WebViews with poor gesture animation performance',
        'Inconsistent UI branding across Apple and Google design patterns'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'UX & Gesture Mapping',
        description: 'Draft thumb-zone responsive navigation, dark/light native UI components, and tactile interaction flows.',
        deliverables: ['Mobile Clickable Prototype', 'iOS/Android Human Interface Spec']
      },
      {
        number: '02',
        title: 'Cross-Platform Engine',
        description: 'Build native-compiled modules with React Native or Flutter, utilizing hardware acceleration.',
        deliverables: ['Cross-platform Codebase', 'Biometric & Camera Integration']
      },
      {
        number: '03',
        title: 'Offline Sync & Push',
        description: 'Implement local SQLite/WatermelonDB storage with cloud background sync and rich notifications.',
        deliverables: ['Offline Data Manager', 'FCM/APNS Push Setup']
      },
      {
        number: '04',
        title: 'Store Publishing & QA',
        description: 'Manage Apple App Store and Google Play Store review submissions, CI/CD builds, and beta testing.',
        deliverables: ['App Store Approval Guarantee', 'TestFlight / Internal Beta Deployment']
      }
    ],
    techStack: [
      { category: 'Mobile Frameworks', items: ['React Native', 'Expo', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)'] },
      { category: 'State & Local DB', items: ['WatermelonDB', 'Zustand', 'SQLite', 'MMKV Storage'] },
      { category: 'Cloud Services', items: ['Firebase Push', 'RevenueCat', 'Sentry Mobile', 'Fastlane CI/CD'] }
    ],
    caseStudyHighlight: {
      client: 'PulseFit Pro',
      metrics: '1.2M Downloads | 4.8 App Store Rating',
      title: 'Building a Real-Time Fitness Tracker with Offline-First AI Coach',
      summary: 'Developed a cross-platform mobile experience that seamlessly tracks workout telemetry and syncs with Apple Watch & Android Wear.'
    },
    pricingTiers: [
      {
        name: 'MVP Mobile Launch',
        price: '$18,000',
        timeline: '4 - 6 Weeks',
        description: 'Core iOS & Android application ready for App Store submission.',
        features: ['iOS & Android cross-platform build', 'User auth & social logins', 'Push notification engine', 'App Store & Play Store publishing']
      },
      {
        name: 'Pro Mobile App',
        price: '$34,000',
        timeline: '8 - 10 Weeks',
        recommended: true,
        description: 'Full-featured consumer or enterprise mobile platform with payments, deep-linking, & offline sync.',
        features: ['Biometric authentication (FaceID/Fingerprint)', 'In-app subscriptions & Apple/Google Pay', 'Offline storage & cloud sync engine', 'Custom camera/sensor capabilities', 'Analytics & Crashlytics setup']
      },
      {
        name: 'Enterprise Mobile Suite',
        price: '$65,000+',
        timeline: '12+ Weeks',
        description: 'Complex multi-app ecosystems with wearable companion apps and hardware Bluetooth integrations.',
        features: ['Apple Watch / Android Wear companion apps', 'BLE / IoT hardware pairing', 'Enterprise MDM deployment support', 'White-label multi-tenant support']
      }
    ],
    faqs: [
      {
        question: 'Do you publish the apps to Apple App Store and Google Play?',
        answer: 'Yes, we handle the entire submission process, including metadata, screenshots, privacy policies, and compliance reviews.'
      },
      {
        question: 'Why cross-platform over pure native?',
        answer: 'Cross-platform frameworks like React Native yield 98% shared codebase, cutting development and maintenance costs in half without compromising 60fps native feel.'
      }
    ]
  },

  // 3. Enterprise Software Systems
  {
    id: '3',
    slug: 'enterprise-software',
    title: 'Enterprise Software Systems',
    category: 'Core Development',
    iconName: 'Building2',
    shortDesc: 'Custom ERP, CRM, and workflow management systems engineered to automate complex business operations.',
    fullDesc: 'Replace disconnected spreadsheets and legacy software with a unified, high-security enterprise platform built specifically around your organization workflows.',
    problemStatement: {
      headline: 'Off-the-shelf software forces businesses into rigid workflows and charges exorbitant per-user license fees.',
      points: [
        'Data silos across isolated software tools',
        'Manual data entry prone to human error and compliance risks',
        'Astronomical licensing costs that balloon as your headcount grows'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Business Process Mapping',
        description: 'Audit internal operational bottlenecks, departmental permissions, and data flow pipelines.',
        deliverables: ['Workflow Gap Blueprint', 'ROI Efficiency Matrix']
      },
      {
        number: '02',
        title: 'Custom Core Architecture',
        description: 'Build modular database schemas, role-based access control (RBAC), and audit log systems.',
        deliverables: ['Enterprise Data Schema', 'RBAC Security Policy']
      },
      {
        number: '03',
        title: 'Automation & System Sync',
        description: 'Integrate legacy databases, ERP systems (SAP/Salesforce), and automated document pipelines.',
        deliverables: ['Custom Middleware Integration', 'Automated Workflow Trigger Engine']
      },
      {
        number: '04',
        title: 'Staff Training & Onboarding',
        description: 'Provide interactive staff training materials, enterprise single sign-on (SSO), and zero-downtime migration.',
        deliverables: ['SAML/OKTA SSO Setup', 'User Documentation & Onboarding Seminars']
      }
    ],
    techStack: [
      { category: 'Enterprise Backend', items: ['Node.js Enterprise', 'Python FastAPI', 'Go (Golang)', 'Java Spring Boot'] },
      { category: 'Integrations & SSO', items: ['Okta', 'SAML 2.0', 'Salesforce API', 'SAP Connector', 'Zapier Enterprise'] },
      { category: 'Database & Warehouse', items: ['PostgreSQL Cluster', 'Snowflake', 'ClickHouse', 'Redis'] }
    ],
    caseStudyHighlight: {
      client: 'LogiX Global Logistics',
      metrics: '-62% Processing Time | $1.4M Annual Savings',
      title: 'Automating Supply Chain Dispatch for 8,000 Vehicles',
      summary: 'Replaced a 15-year-old legacy software with a custom cloud platform, enabling real-time automated dispatch and audit trails.'
    },
    pricingTiers: [
      {
        name: 'Core Module',
        price: '$35,000',
        timeline: '6 - 8 Weeks',
        description: 'Targeted internal system module (e.g. Custom CRM, Order Management, or Asset Portal).',
        features: ['Role-based access matrix', 'Automated email/SMS workflows', 'Exportable PDF/Excel reporting', 'SAML/SSO integration']
      },
      {
        name: 'Full Enterprise ERP',
        price: '$75,000',
        timeline: '12 - 16 Weeks',
        recommended: true,
        description: 'Complete operational backbone integrating inventory, HR, billing, analytics, and client portals.',
        features: ['Multi-department portal access', 'Automated financial & inventory reconciliation', 'Real-time telemetry dashboard', 'Immutable audit logging', '1 Year SLA & Enterprise Maintenance']
      }
    ],
    faqs: [
      {
        question: 'Can this software run on our private cloud or on-premise infrastructure?',
        answer: 'Absolutely. We support deployment to AWS, Google Cloud, Azure, Kubernetes clusters, or self-hosted air-gapped servers.'
      }
    ]
  },

  // 4. Microservices & API Architecture
  {
    id: '4',
    slug: 'microservices-api',
    title: 'Microservices & API Architecture',
    category: 'Core Development',
    iconName: 'Server',
    shortDesc: 'Resilient gRPC, REST, and GraphQL microservices designed for zero-downtime deployment and high throughput.',
    fullDesc: 'Decouple monolithic backend systems into scalable microservices. We build lightweight, event-driven services with auto-scaling capabilities.',
    problemStatement: {
      headline: 'Monolithic backends choke under heavy load, where a single failure takes down the entire application.',
      points: [
        'Single point of failure bringing down entire business operations',
        'Deployment bottlenecks requiring massive full-system regression tests',
        'Database lockups when reading heavy analytics alongside user writes'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Domain-Driven Design (DDD)',
        description: 'Deconstruct monoliths into bounded contexts and decoupled service domains.',
        deliverables: ['Bounded Context Map', 'API OpenAPI/Swagger Specs']
      },
      {
        number: '02',
        title: 'Event Bus & Gateway Engine',
        description: 'Setup Kafka/RabbitMQ message streaming with rate-limited API Gateways.',
        deliverables: ['Kafka Event Bus', 'Kong/Envoy API Gateway']
      },
      {
        number: '03',
        title: 'Service Implementation',
        description: 'Build fast gRPC/REST microservices with containerized Docker and Kubernetes blueprints.',
        deliverables: ['Containerized Services', 'Distributed Tracing Integration']
      },
      {
        number: '04',
        title: 'Zero-Downtime Pipeline',
        description: 'Configure Canary deployments, circuit breakers, and automated health checks.',
        deliverables: ['Kubernetes Helm Charts', 'ArgoCD Deployment Pipeline']
      }
    ],
    techStack: [
      { category: 'Protocols & Gateways', items: ['gRPC', 'GraphQL', 'REST OpenAPI', 'Kong Gateway', 'Envoy Proxy'] },
      { category: 'Messaging & Event Streams', items: ['Apache Kafka', 'RabbitMQ', 'NATS', 'AWS SQS/SNS'] },
      { category: 'Orchestration', items: ['Kubernetes (EKS/GKE)', 'Docker', 'Istio Service Mesh'] }
    ],
    caseStudyHighlight: {
      client: 'StreamPay Global',
      metrics: '15,000 req/sec | 99.999% Uptime',
      title: 'Decoupling Legacy Payment Processing for 10M Daily Transactions',
      summary: 'Transformed monolithic billing infrastructure into an event-driven gRPC microservice topology with zero downtime during Black Friday.'
    },
    pricingTiers: [
      {
        name: 'API Modernization',
        price: '$22,000',
        timeline: '4 - 5 Weeks',
        description: 'Refactoring key APIs into modern, documented REST/GraphQL gateway endpoints.',
        features: ['OpenAPI 3.0 Documentation', 'Rate-limiting & API key management', 'Redis response caching', 'JWT / OAuth2 security token middleware']
      },
      {
        name: 'Microservice Migration',
        price: '$48,000',
        timeline: '8 - 10 Weeks',
        recommended: true,
        description: 'Decomposing core monolithic services into event-driven containerized microservices.',
        features: ['Kafka / RabbitMQ event architecture', 'Distributed tracing with Jaeger / OpenTelemetry', 'Kubernetes Helm configuration', 'Circuit breakers & resilience policies']
      }
    ],
    faqs: [
      {
        question: 'How do you handle data consistency across microservices?',
        answer: 'We implement the Saga pattern and event-driven eventual consistency protocols, complemented by transactional outbox patterns.'
      }
    ]
  },

  // 5. Generative AI & LLM Integration
  {
    id: '5',
    slug: 'generative-ai',
    title: 'Generative AI & LLM Integration',
    category: 'AI & Data',
    iconName: 'Sparkles',
    shortDesc: 'Productionize Gemini, OpenAI, and custom fine-tuned LLMs into your enterprise workflows with RAG and vector databases.',
    fullDesc: 'Transform raw enterprise documents and customer interactions into intelligent generative AI features with retrieval-augmented generation (RAG) and semantic vector search.',
    problemStatement: {
      headline: 'Generic AI chatbots hallucinate, leak internal secrets, and lack context regarding your company private business data.',
      points: [
        'Uncontrolled API costs and unpredictable response latency',
        'Hallucinations providing incorrect information to customers',
        'Data privacy risks sending confidential company information to external models'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Data Ingestion & Chunking',
        description: 'Build automated document parsers (PDF, Notion, SQL) with smart semantic chunking.',
        deliverables: ['Vector Embeddings Pipeline', 'Pinecone / Qdrant Storage']
      },
      {
        number: '02',
        title: 'Hybrid RAG & Prompt Engineering',
        description: 'Implement multi-stage retrieval, semantic re-ranking, and strict guardrails.',
        deliverables: ['Custom RAG Engine', 'System Prompt Matrix', 'Hallucination Evaluator']
      },
      {
        number: '03',
        title: 'Fine-Tuning & Model Distillation',
        description: 'Fine-tune domain-specific smaller models (Llama 3 / Mistral) for 10x cost reduction.',
        deliverables: ['Fine-Tuned Model Weights', 'API Proxy Gateway']
      },
      {
        number: '04',
        title: 'UI Integration & Telemetry',
        description: 'Deploy streaming responses, citation tags, and cost-per-token monitoring dashboards.',
        deliverables: ['Streaming React UI Components', 'Token Usage Cost Dashboard']
      }
    ],
    techStack: [
      { category: 'AI Models', items: ['Google Gemini Pro/Flash', 'OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Llama 3 Fine-tuned'] },
      { category: 'Vector Databases', items: ['Pinecone', 'Qdrant', 'pgvector', 'Weaviate', 'ChromaDB'] },
      { category: 'Frameworks & Evaluation', items: ['LangChain', 'LlamaIndex', 'LangSmith', 'Trulens', 'vLLM'] }
    ],
    caseStudyHighlight: {
      client: 'DocuQuery Legal Tech',
      metrics: '99.2% Accuracy | 85% Time Savings',
      title: 'Building Enterprise Contract Analysis RAG Engine',
      summary: 'Engineered a secure private RAG system that analyzes 500-page legal contracts in seconds with exact clause citations.'
    },
    pricingTiers: [
      {
        name: 'RAG Knowledge Pilot',
        price: '$16,000',
        timeline: '3 - 4 Weeks',
        description: 'Internal documentation & knowledge base generative AI assistant.',
        features: ['Ingest up to 100,000 documents', 'Pinecone vector database set up', 'Streaming React UI widget', 'Basic security guardrails & citations']
      },
      {
        name: 'Enterprise GenAI Suite',
        price: '$38,000',
        timeline: '6 - 8 Weeks',
        recommended: true,
        description: 'Production-ready AI product layer with custom fine-tuning, multi-model routing, & analytics.',
        features: ['Hybrid semantic + vector search', 'Custom model fine-tuning (Llama/Gemini)', 'Hallucination filtering & guardrails', 'Token cost optimization proxy', 'Role-based data access filters']
      }
    ],
    faqs: [
      {
        question: 'Is our corporate data safe from being used to train third-party AI models?',
        answer: 'Yes. We utilize enterprise API agreements, private VPC deployments, and local open-source LLMs so your data never touches public training datasets.'
      }
    ]
  },

  // 6. AI Agents & Automation
  {
    id: '6',
    slug: 'ai-agents',
    title: 'AI Agents & Enterprise Automation',
    category: 'AI & Data',
    iconName: 'Bot',
    shortDesc: 'Autonomous multi-agent workflows that plan, execute complex tasks, invoke APIs, and resolve support tickets without human delay.',
    fullDesc: 'Empower your organization with multi-agent systems that autonomously execute multi-step business logic, generate reports, handle customer inquiries, and execute database queries.',
    problemStatement: {
      headline: 'Repetitive human data handling creates massive operational overhead and slow response times.',
      points: [
        'High staffing costs for manual tier-1 customer support',
        'Delays in processing inbound sales leads or document verifications',
        'Human error during complex multi-step data transfers across software tools'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Agent Role & Tooling Specs',
        description: 'Define agent goals, decision trees, available tool APIs, and human-in-the-loop triggers.',
        deliverables: ['Agent Architecture Map', 'Tool API Contracts']
      },
      {
        number: '02',
        title: 'Multi-Agent Orchestration',
        description: 'Develop Supervisor and Specialist agent networks capable of sub-task delegation.',
        deliverables: ['LangGraph / AutoGen State Engine', 'Agent Memory Store']
      },
      {
        number: '03',
        title: 'API Tool Execution',
        description: 'Grant agents safe access to execute database transactions, send emails, and parse files.',
        deliverables: ['Sandboxed Tool Call Runners', 'Audit Log Recording']
      },
      {
        number: '04',
        title: 'Human-in-the-Loop Safeguards',
        description: 'Build approval dashboards for high-value financial or external customer actions.',
        deliverables: ['Agent Approval Portal', 'Fallback Routing Matrix']
      }
    ],
    techStack: [
      { category: 'Agent Orchestration', items: ['LangGraph', 'CrewAI', 'AutoGen', 'Microsoft Semantic Kernel'] },
      { category: 'Execution & Memory', items: ['Redis Agent Memory', 'E2B Code Interpreter', 'Python Async Engine'] },
      { category: 'Monitoring', items: ['LangSmith', 'Helicone', 'Opik AI'] }
    ],
    caseStudyHighlight: {
      client: 'SaaSFlow Global',
      metrics: '78% Auto-resolution | $380k Annual Savings',
      title: 'Deploying Autonomous Customer Ops Agent',
      summary: 'Created an autonomous support agent capable of executing refund logic, password resets, and account upgrades with zero human intervention.'
    },
    pricingTiers: [
      {
        name: 'Single Task Agent',
        price: '$18,000',
        timeline: '3 - 4 Weeks',
        description: 'Autonomous agent dedicated to a specific task (e.g. Lead Qualification, Invoice Parsing).',
        features: ['Automated API tool invocation', 'Error recovery & retry loops', 'Web hook notifications', '30-day monitoring']
      },
      {
        name: 'Multi-Agent Network',
        price: '$42,000',
        timeline: '6 - 8 Weeks',
        recommended: true,
        description: 'Complex multi-agent collaborative system for end-to-end departmental automation.',
        features: ['Supervisor & Specialist agent hierarchy', 'Shared long-term vector memory', 'Human-in-the-loop approval UI', 'Real-time agent execution telemetry']
      }
    ],
    faqs: [
      {
        question: 'What happens if an AI agent makes a mistake?',
        answer: 'We implement strict tool validation schemas, rate limits, and Human-In-The-Loop (HITL) approval workflows for critical business actions.'
      }
    ]
  },

  // 7. Predictive Analytics & ML
  {
    id: '7',
    slug: 'predictive-analytics',
    title: 'Predictive Analytics & Machine Learning',
    category: 'AI & Data',
    iconName: 'LineChart',
    shortDesc: 'Custom machine learning models for demand forecasting, churn prediction, fraud detection, and algorithmic pricing.',
    fullDesc: 'Harness historical enterprise data to predict future market trends, customer behavior, and operational risks using custom ML pipelines.',
    problemStatement: {
      headline: 'Reactive decision-making leaves companies vulnerable to unexpected customer churn and inventory stockouts.',
      points: [
        'Inability to anticipate customer churn before it occurs',
        'Inaccurate demand forecasting leading to wasted capital or lost sales',
        'Manual fraud detection failing to keep up with sophisticated bad actors'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Data Cleaning & Feature Store',
        description: 'Clean structured historical data and engineer predictive feature sets.',
        deliverables: ['Feast Feature Store', 'Data Quality Assessment']
      },
      {
        number: '02',
        title: 'Model Training & Tuning',
        description: 'Train XGBoost, LightGBM, or Deep Learning models with cross-validation.',
        deliverables: ['Trained ML Pipeline', 'Model Benchmarking Report']
      },
      {
        number: '03',
        title: 'MLOps & Inference API',
        description: 'Package models into high-frequency, low-latency microservice endpoints.',
        deliverables: ['FastAPI Inference Endpoint', 'MLflow Model Registry']
      },
      {
        number: '04',
        title: 'Drift Monitoring & Retraining',
        description: 'Set up continuous monitoring for data drift and automated retraining loops.',
        deliverables: ['Evidently AI Drift Dashboard', 'Automated Retraining Cron']
      }
    ],
    techStack: [
      { category: 'ML Libraries', items: ['PyTorch', 'TensorFlow', 'XGBoost', 'scikit-learn', 'LightGBM'] },
      { category: 'Data Engineering', items: ['Apache Spark', 'dbt', 'Pandas', 'Polars', 'BigQuery'] },
      { category: 'MLOps', items: ['MLflow', 'Kubeflow', 'Feast', 'Evidently AI'] }
    ],
    caseStudyHighlight: {
      client: 'RetailMax Chain',
      metrics: '-42% Inventory Costs | 94.6% Prediction Accuracy',
      title: 'Predictive Demand & Dynamic Pricing Engine',
      summary: 'Built an ML model predicting store inventory demand across 300 locations, cutting waste and maximizing margins.'
    },
    pricingTiers: [
      {
        name: 'ML Proof of Concept',
        price: '$20,000',
        timeline: '4 Weeks',
        description: 'Model feasibility assessment and prototype build on your proprietary dataset.',
        features: ['Data exploratory analysis', 'Baseline model training & tuning', 'Accuracy benchmark report', 'REST inference endpoint']
      },
      {
        name: 'Production MLOps Pipeline',
        price: '$45,000',
        timeline: '8 Weeks',
        recommended: true,
        description: 'Complete machine learning system with feature store, automated retraining, and live API endpoints.',
        features: ['Automated ETL feature store', 'Sub-50ms inference API', 'Model drift alerts', 'Executive prediction analytics dashboard']
      }
    ],
    faqs: [
      {
        question: 'How much historical data do we need to build an accurate model?',
        answer: 'Typically, 6 to 12 months of clean structured data is sufficient to achieve high predictive accuracy.'
      }
    ]
  },

  // 8. Computer Vision Solutions
  {
    id: '8',
    slug: 'computer-vision',
    title: 'Computer Vision Solutions',
    category: 'AI & Data',
    iconName: 'Eye',
    shortDesc: 'Real-time video analytics, automated defect detection, OCR, and facial recognition powered by edge AI models.',
    fullDesc: 'Transform visual camera streams and images into actionable structured data for manufacturing quality control, security, and medical imaging.',
    problemStatement: {
      headline: 'Manual visual inspections are slow, subjective, and prone to human fatigue oversight.',
      points: [
        'Defective manufacturing parts reaching end consumers',
        'Inability to monitor large facility camera streams in real-time',
        'Manual document scanning requiring tedious manual data entry'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Dataset Curation & Annotation',
        description: 'Annotate visual training images with precise bounding boxes and segmentation masks.',
        deliverables: ['Annotated Image Dataset', 'Data Augmentation Pipeline']
      },
      {
        number: '02',
        title: 'Model Selection & Fine-Tuning',
        description: 'Train YOLOv9, Segment Anything, or OpenCV models tailored to your target hardware.',
        deliverables: ['Custom Vision Weights', 'Performance Accuracy Matrix']
      },
      {
        number: '03',
        title: 'Edge TensorRT Quantization',
        description: 'Optimize models to run on NVIDIA Jetson, Coral TPU, or edge camera hardware.',
        deliverables: ['TensorRT Model File', 'Sub-20ms Video Stream Processor']
      },
      {
        number: '04',
        title: 'Dashboard & Alerting',
        description: 'Connect visual detection events to real-time SMS/Webhook alerts and visual overlays.',
        deliverables: ['Live Video Telemetry Dashboard', 'Automated Anomaly Alerting']
      }
    ],
    techStack: [
      { category: 'Vision Models', items: ['YOLOv9/v10', 'Segment Anything (SAM)', 'OpenCV', 'MediaPipe', 'Tesseract OCR'] },
      { category: 'Edge Hardware Acceleration', items: ['NVIDIA TensorRT', 'ONNX Runtime', 'NVIDIA Jetson', 'OpenVINO'] },
      { category: 'Video Streaming', items: ['FFmpeg', 'RTSP Streaming', 'WebRTC', 'GStreamer'] }
    ],
    caseStudyHighlight: {
      client: 'Precision Auto Parts',
      metrics: '99.8% Defect Detection Rate | 60 FPS Video Processing',
      title: 'Automating High-Speed Assembly Line Quality Control',
      summary: 'Deployed an edge computer vision system inspecting 200 parts per minute, eliminating defective product shipments.'
    },
    pricingTiers: [
      {
        name: 'Vision Pilot Project',
        price: '$24,000',
        timeline: '4 - 5 Weeks',
        description: 'Targeted visual detection or OCR model trained on custom camera feeds.',
        features: ['Dataset annotation & curation', 'YOLO model fine-tuning', 'Real-time bounding box overlay UI', 'Alert webhook API']
      },
      {
        name: 'Edge Vision Deployment',
        price: '$52,000',
        timeline: '8 - 10 Weeks',
        recommended: true,
        description: 'Full multi-camera real-time processing system deployed on edge NVIDIA hardware.',
        features: ['Multi-stream RTSP camera manager', 'NVIDIA TensorRT 60 FPS acceleration', 'Hardware edge deployment', 'Centralized analytics dashboard']
      }
    ],
    faqs: [
      {
        question: 'Can this vision software run on existing security cameras?',
        answer: 'Yes! If your cameras provide standard RTSP or IP streams, our software can connect directly over the network.'
      }
    ]
  },

  // 9. Product Design (UI/UX)
  {
    id: '9',
    slug: 'product-design',
    title: 'Product Design (UI/UX)',
    category: 'Design & Growth',
    iconName: 'Palette',
    shortDesc: 'Apple-level product design, design systems, interactive prototypes, and user research that drive high conversion.',
    fullDesc: 'Craft intuitive, memorable visual interfaces. We design user-centric digital products that combine spatial elegance, seamless micro-interactions, and conversion psychology.',
    problemStatement: {
      headline: 'Cluttered UI and confusing navigation frustrate users, leading to high bounce rates and low feature adoption.',
      points: [
        'Inconsistent design patterns creating brand perception issues',
        'Confusing user onboarding resulting in immediate drop-off',
        'Lack of a unified design system slowing down development velocity'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'User Research & Wireframes',
        description: 'Conduct user interviews, competitive audits, and low-fidelity user journey mapping.',
        deliverables: ['User Persona Blueprints', 'Low-Fidelity Wireframes']
      },
      {
        number: '02',
        title: 'Design System & Component Tokenization',
        description: 'Build a comprehensive Figma design system with tokens for colors, typography, and state components.',
        deliverables: ['Figma Design System Token Library', 'Dark/Light Mode Variables']
      },
      {
        number: '03',
        title: 'High-Fidelity Interactive Prototypes',
        description: 'Create pixel-perfect clickable screens featuring smooth animations and micro-interactions.',
        deliverables: ['Clickable High-Fi Prototype', 'Micro-interaction Spec']
      },
      {
        number: '04',
        title: 'Developer Handoff & QA',
        description: 'Provide React/Tailwind code tokens, asset exports, and design QA during engineering implementation.',
        deliverables: ['Zero-friction Dev Handoff Package', 'Design QA Sign-off']
      }
    ],
    techStack: [
      { category: 'Design Tools', items: ['Figma', 'Principle', 'Rive', 'Adobe CC', 'Lottie'] },
      { category: 'Design System Frameworks', items: ['Tailwind Tokens', 'Radix Primitives', 'Storybook', 'Design Tokens Format'] }
    ],
    caseStudyHighlight: {
      client: 'Veloce Mobility',
      metrics: '+210% User Retention | 4.9 Design Score',
      title: 'Redesigning Next-Gen EV Companion Mobile Interface',
      summary: 'Crafted a sleek, light-themed vehicle telemetry UI that simplified complex battery diagnostics into effortless driver widgets.'
    },
    pricingTiers: [
      {
        name: 'Design Sprint',
        price: '$10,000',
        timeline: '2 - 3 Weeks',
        description: 'Rapid UI refresh or MVP product design package.',
        features: ['Up to 10 key high-fidelity screens', 'Clickable Figma prototype', 'Color & typography style guide', 'Developer asset exports']
      },
      {
        name: 'Complete Product Design System',
        price: '$25,000',
        timeline: '5 - 6 Weeks',
        recommended: true,
        description: 'Full end-to-end design system and user experience architecture for web and mobile.',
        features: ['Comprehensive Figma Token Design System', 'Full web & mobile responsive screen layouts', 'Micro-animations & interactive components', 'Usability testing report', 'Developer handoff documentation']
      }
    ],
    faqs: [
      {
        question: 'Do we get access to editable Figma source files?',
        answer: 'Yes! You receive full ownership of all Figma libraries, components, tokens, and prototype links.'
      }
    ]
  },

  // 10. Digital Transformation & Growth Strategy
  {
    id: '10',
    slug: 'digital-transformation',
    title: 'Digital Transformation & Growth Strategy',
    category: 'Design & Growth',
    iconName: 'TrendingUp',
    shortDesc: 'Strategic tech modernization, legacy overhaul, and growth engineering to unlock new digital revenue channels.',
    fullDesc: 'Align technology infrastructure with business growth goals. We help traditional enterprises transition into agile, tech-first market leaders.',
    problemStatement: {
      headline: 'Agile competitors disrupt established businesses using modern software velocity and data insights.',
      points: [
        'Outdated software holding back new digital product offerings',
        'Siloed department operations slowing time-to-market',
        'Unoptimized sales funnel tech causing high client acquisition costs'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Technology & Stack Audit',
        description: 'Comprehensive review of IT infrastructure, codebase quality, team velocity, and cloud costs.',
        deliverables: ['Tech Health Audit Report', 'Modernization Roadmap']
      },
      {
        number: '02',
        title: 'Product-Led Growth Architecture',
        description: 'Formulate automated customer acquisition, onboarding funnels, and self-serve SaaS models.',
        deliverables: ['Growth Funnel Blueprint', 'Feature Prioritization Matrix']
      },
      {
        number: '03',
        title: 'Migration & Team Enablement',
        description: 'Execute phased software upgrades while upskilling internal teams on modern engineering best practices.',
        deliverables: ['Phased Execution Blueprint', 'Engineering Upskilling Workshops']
      }
    ],
    techStack: [
      { category: 'Analytics & Growth', items: ['Segment', 'Mixpanel', 'PostHog', 'GA4', 'HubSpot Enterprise'] },
      { category: 'Strategy Frameworks', items: ['Product-Led Growth (PLG)', 'Agile Scaled Framework', 'Value Stream Mapping'] }
    ],
    caseStudyHighlight: {
      client: 'Standard Capital Insurance',
      metrics: '3.5x Revenue Growth | $2.1M Tech Cost Reduction',
      title: 'Digital Transformation of 40-Year-Old Insurance Carrier',
      summary: 'Digitized policy quoting and automated underwriting, cutting quote issuance time from 5 days to 2 minutes.'
    },
    pricingTiers: [
      {
        name: 'Transformation Advisory',
        price: '$15,000',
        timeline: '3 Weeks',
        description: 'Executive technology audit and strategic roadmap for enterprise leaders.',
        features: ['Full IT stack & security audit', 'Cost optimization analysis', '3-Year digital roadmap', 'Executive presentation']
      },
      {
        name: 'Full Growth Execution',
        price: '$40,000',
        timeline: '8 Weeks',
        recommended: true,
        description: 'Hands-on strategy execution, funnel optimization, & architecture modernization.',
        features: ['Data pipeline consolidation', 'Product-Led Growth onboarding funnel', 'Custom analytics stack setup', 'Bi-weekly executive steering calls']
      }
    ],
    faqs: [
      {
        question: 'How do you ensure zero disruption to current business revenue during migration?',
        answer: 'We utilize strangler-fig migration strategies, running modern services in parallel alongside legacy systems until full validation.'
      }
    ]
  },

  // 11. Cloud Infrastructure & DevOps
  {
    id: '11',
    slug: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    category: 'Cloud & QA',
    iconName: 'Cloud',
    shortDesc: 'Terraform, Kubernetes, multi-cloud architectures (AWS/GCP), and automated CI/CD pipelines with 99.99% uptime SLA.',
    fullDesc: 'Build rock-solid cloud infrastructure. We automate deployments, optimize cloud expenditures, and establish zero-trust security postures.',
    problemStatement: {
      headline: 'Unoptimized cloud hosting results in inflated monthly bills and frequent deployment downtime.',
      points: [
        'AWS/GCP bills inflating uncontrollably month over month',
        'Manual deployment steps causing release bugs and downtime',
        'Lack of disaster recovery backup policies in place'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Infrastructure-as-Code (IaC)',
        description: 'Code entire cloud infrastructure using Terraform or Pulumi for reproducible deployments.',
        deliverables: ['Terraform Code Base', 'Cloud Architecture Blueprint']
      },
      {
        number: '02',
        title: 'CI/CD Pipeline Automation',
        description: 'Build automated GitHub Actions / GitLab pipelines with automated linting, testing, and deployment.',
        deliverables: ['Automated CI/CD Workflows', 'Zero-downtime Blue/Green Setup']
      },
      {
        number: '03',
        title: 'FinOps & Cost Optimization',
        description: 'Eliminate idle cloud assets and configure auto-scaling group policies.',
        deliverables: ['FinOps Audit Report', '30-50% Cloud Cost Savings']
      },
      {
        number: '04',
        title: 'Observability & SLA Setup',
        description: 'Install Datadog, Prometheus, and Grafana monitoring with instant Slack/PagerDuty escalation.',
        deliverables: ['Datadog Metrics Dashboard', '24/7 PagerDuty Alerting']
      }
    ],
    techStack: [
      { category: 'Cloud Providers', items: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Cloudflare'] },
      { category: 'IaC & CI/CD', items: ['Terraform', 'Pulumi', 'Docker', 'Kubernetes', 'GitHub Actions', 'ArgoCD'] },
      { category: 'Observability', items: ['Datadog', 'Prometheus', 'Grafana', 'Sentry', 'PagerDuty'] }
    ],
    caseStudyHighlight: {
      client: 'CloudScale SaaS',
      metrics: '-48% Cloud Spend | 99.99% Uptime',
      title: 'AWS FinOps & Kubernetes Auto-scaling Overhaul',
      summary: 'Restructured cloud topology using spot instances and Kubernetes auto-scaling, cutting $22,000 off monthly AWS bills.'
    },
    pricingTiers: [
      {
        name: 'DevOps & CI/CD Sprint',
        price: '$14,000',
        timeline: '2 - 3 Weeks',
        description: 'Setup automated deployment pipelines and Docker containerization.',
        features: ['GitHub Actions CI/CD pipeline', 'Docker image optimization', 'Environment staging setup', 'Basic Datadog alert triggers']
      },
      {
        name: 'Enterprise Multi-Cloud Infrastructure',
        price: '$32,000',
        timeline: '5 - 6 Weeks',
        recommended: true,
        description: 'Production Kubernetes cluster set up with Terraform IaC, FinOps optimization, and disaster recovery.',
        features: ['Full Terraform Infrastructure-as-Code', 'Production Kubernetes (EKS/GKE)', 'FinOps cloud bill optimization', 'Multi-region disaster recovery', '24/7 Monitoring & PagerDuty escalation']
      }
    ],
    faqs: [
      {
        question: 'Can you help us reduce our current AWS or Google Cloud monthly bill?',
        answer: 'Yes! Our FinOps audits consistently achieve 30% to 50% immediate savings without reducing server performance.'
      }
    ]
  },

  // 12. Cybersecurity & Compliance
  {
    id: '12',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Compliance',
    category: 'Cloud & QA',
    iconName: 'ShieldCheck',
    shortDesc: 'Penetration testing, SOC2 Type II, ISO 27001, GDPR, HIPAA compliance readiness, and Cloudflare WAF protection.',
    fullDesc: 'Protect your enterprise assets from cyber threats. We implement zero-trust network security, conduct rigorous penetration tests, and guide you through compliance certifications.',
    problemStatement: {
      headline: 'A single data breach or compliance violation can ruin customer trust and result in massive legal fines.',
      points: [
        'Unprotected API endpoints vulnerable to SQL injection or DDoS attacks',
        'Inability to pass enterprise vendor security reviews due to lack of SOC2',
        'Lack of encrypted data at rest and in transit policies'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Vulnerability & Pen Testing',
        description: 'Perform ethical hacking attacks to identify OWASP top 10 security flaws in your code and infrastructure.',
        deliverables: ['Penetration Test Report', 'Remediation Action Plan']
      },
      {
        number: '02',
        title: 'Zero-Trust Architecture',
        description: 'Implement end-to-end encryption, strict IAM permissions, and Cloudflare WAF security rules.',
        deliverables: ['Cloudflare WAF Blueprint', 'KMS Encryption Setup']
      },
      {
        number: '03',
        title: 'Compliance Audit Readiness',
        description: 'Prepare policies, controls, and evidence collection for SOC2, ISO 27001, GDPR, or HIPAA.',
        deliverables: ['Vanta / Drata Integration', 'Compliance Policy Suite']
      }
    ],
    techStack: [
      { category: 'Security Tools', items: ['Cloudflare WAF', 'Snyk', 'SonarQube', 'Burp Suite', 'AWS GuardDuty'] },
      { category: 'Compliance Engines', items: ['Drata', 'Vanta', 'SOC2 Type II', 'ISO 27001', 'HIPAA', 'GDPR'] }
    ],
    caseStudyHighlight: {
      client: 'MediVault Health',
      metrics: '100% HIPAA Pass | Zero Security Flaws',
      title: 'Achieving SOC2 Type II & HIPAA Compliance for Health Tech Engine',
      summary: 'Hardened cloud infrastructure and audited data pipelines, securing enterprise health data for 50+ hospital clients.'
    },
    pricingTiers: [
      {
        name: 'Penetration Test & Audit',
        price: '$12,000',
        timeline: '2 Weeks',
        description: 'Comprehensive web app & API ethical hacking security audit.',
        features: ['OWASP Top 10 vulnerability scan', 'Manual penetration test execution', 'Prioritized remediation report', 'Re-test signoff certificate']
      },
      {
        name: 'SOC2 / HIPAA Compliance Suite',
        price: '$28,000',
        timeline: '5 - 6 Weeks',
        recommended: true,
        description: 'Complete security hardening and automated evidence collection for audit certification.',
        features: ['Cloudflare WAF & DDoS mitigation set up', 'Drata / Vanta automated policy integration', 'Zero-Trust IAM access rules', 'Guaranteed audit pass support']
      }
    ],
    faqs: [
      {
        question: 'How long does it take to achieve SOC2 Type II readiness?',
        answer: 'With our automated compliance integrations (Vanta/Drata), we get tech infrastructure audit-ready in as little as 4 weeks.'
      }
    ]
  },

  // 13. QA & Automated Testing
  {
    id: '13',
    slug: 'qa-testing',
    title: 'QA & Automated Testing',
    category: 'Cloud & QA',
    iconName: 'CheckCircle2',
    shortDesc: 'End-to-end Playwright, Cypress, and Jest test suites ensuring 90%+ code coverage and bug-free production releases.',
    fullDesc: 'Eliminate regression bugs before they hit users. We engineer robust automated test suites that run continuously in your deployment pipeline.',
    problemStatement: {
      headline: 'Manual QA testing creates release bottlenecks and allows embarrassing bugs to leak into production.',
      points: [
        'Slow manual testing cycles holding back weekly feature releases',
        'Critical user flows (checkout, login) breaking during production updates',
        'Lack of load testing causing app crashes during high traffic surges'
      ]
    },
    processSteps: [
      {
        number: '01',
        title: 'Test Plan Strategy',
        description: 'Map out critical user journeys, edge cases, and load testing benchmarks.',
        deliverables: ['Test Matrix Strategy', 'E2E Flow Mapping']
      },
      {
        number: '02',
        title: 'E2E & Integration Automation',
        description: 'Write headless Playwright / Cypress scripts that simulate realistic user interactions across browsers.',
        deliverables: ['Playwright Test Suite', 'Cypress UI Tests']
      },
      {
        number: '03',
        title: 'Load & Performance Testing',
        description: 'Simulate 50,000 concurrent users using k6 and Locust to stress test servers.',
        deliverables: ['k6 Load Test Suite', 'Server Bottleneck Analysis']
      },
      {
        number: '04',
        title: 'CI Pipeline Gating',
        description: 'Block pull requests automatically if test coverage falls below 90% or tests fail.',
        deliverables: ['GitHub Actions Test Gate', 'Visual Regression Telemetry']
      }
    ],
    techStack: [
      { category: 'Testing Frameworks', items: ['Playwright', 'Cypress', 'Jest', 'Vitest', 'Testing Library'] },
      { category: 'Performance & API', items: ['k6', 'Locust', 'Postman Automated Tests', 'Axe-core Accessibility'] }
    ],
    caseStudyHighlight: {
      client: 'PayEdge Commerce',
      metrics: '94% Test Coverage | Zero Regressions',
      title: 'Automating E2E Testing for Multi-Currency Checkout',
      summary: 'Engineered a 400+ test Playwright suite running automatically on every code commit, eliminating payment gateway regressions.'
    },
    pricingTiers: [
      {
        name: 'Core E2E Test Suite',
        price: '$9,000',
        timeline: '2 Weeks',
        description: 'Automated Playwright tests for your top 10 critical user flows.',
        features: ['10 Key E2E user flow test scripts', 'Cross-browser execution (Chrome, Safari, Mobile)', 'CI pipeline integration']
      },
      {
        name: 'Complete QA Automation System',
        price: '$22,000',
        timeline: '4 - 5 Weeks',
        recommended: true,
        description: 'Comprehensive QA coverage including Unit, Integration, E2E, API, and Load testing.',
        features: ['90%+ code coverage guarantee', 'Playwright + Vitest test suite', 'k6 high-concurrency load testing', 'Visual regression diffing', 'CI/CD deployment gating']
      }
    ],
    faqs: [
      {
        question: 'Will these tests run automatically whenever our engineers push new code?',
        answer: 'Yes! We configure GitHub Actions or GitLab pipelines so test suites run on every pull request automatically.'
      }
    ]
  }
];
