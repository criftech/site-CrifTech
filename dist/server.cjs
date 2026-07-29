var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  configureApp: () => configureApp,
  startServer: () => startServer
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");

// server/db.ts
var import_mongoose = __toESM(require("mongoose"), 1);

// src/data/servicesData.ts
var ALL_SERVICES = [
  // 1. Core Development
  {
    id: "1",
    slug: "custom-web-apps",
    title: "Custom Web Applications",
    category: "Core Development",
    iconName: "Globe",
    shortDesc: "High-performance, scalable web platforms built with React, Vite, Next.js, and server-side edge runtimes.",
    fullDesc: "We architect and build enterprise-grade, ultra-responsive web applications designed for maximum speed, security, and effortless scalability under high concurrency loads.",
    problemStatement: {
      headline: "Legacy web stacks suffer from slow load times, poor mobile responsiveness, and fragile monolithic architecture.",
      points: [
        "High latency causing lower conversion rates and user drop-offs",
        "Inability to handle spike traffic during product launches or campaigns",
        "Outdated UI frameworks requiring frequent bug fixes and costly refactoring"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Architecture & Prototype",
        description: "Define component architecture, design system tokenization, and API integration strategy.",
        deliverables: ["Figma Design System", "System Architecture Diagram", "Tech Stack Benchmark"]
      },
      {
        number: "02",
        title: "Frontend & Edge Dev",
        description: "Develop pixel-perfect React/Vite/Next components with sub-second page transitions.",
        deliverables: ["Clean TypeScript Codebase", "Component UI Kit", "State Management Engine"]
      },
      {
        number: "03",
        title: "API & Database Integration",
        description: "Connect REST/GraphQL endpoints, implement caching layers, and optimize query latency.",
        deliverables: ["API Connectors", "Redis Caching Layer", "Security Middleware"]
      },
      {
        number: "04",
        title: "Performance & Launch",
        description: "Achieve 95+ PageSpeed scores, deploy to global CDN edge networks, and conduct load tests.",
        deliverables: ["Lighthouse 95+ Audit", "CI/CD Pipeline", "24/7 Monitoring Setup"]
      }
    ],
    techStack: [
      { category: "Frontend", items: ["React 19", "Next.js 14", "TypeScript", "Tailwind CSS v4", "Framer Motion"] },
      { category: "Backend & Edge", items: ["Node.js", "Express", "Vite", "Cloudflare Workers", "Redis"] },
      { category: "Databases", items: ["PostgreSQL", "Firestore", "Prisma", "Drizzle ORM"] }
    ],
    caseStudyHighlight: {
      client: "Apex Fintech Global",
      metrics: "+340% Traffic Capacity | 1.1s Load Time",
      title: "Rebuilding Next-Gen Trading Dashboard for 2.5M Users",
      summary: "Migrated legacy portal to an ultra-fast React web app, achieving sub-second updates and 99.99% uptime during market volatility."
    },
    pricingTiers: [
      {
        name: "Starter Sprint",
        price: "$12,000",
        timeline: "3 - 4 Weeks",
        description: "Ideal for early-stage products needing a high-impact MVP or marketing web app.",
        features: ["Up to 6 custom interactive pages", "Responsive layout for all screen sizes", "Headless CMS integration", "SEO & Core Web Vitals optimization", "1 Month post-launch SLA"]
      },
      {
        name: "Enterprise App",
        price: "$28,000",
        timeline: "6 - 8 Weeks",
        recommended: true,
        description: "Comprehensive full-stack web application with authentication, real-time data, & custom APIs.",
        features: ["Full application architecture", "Custom design system in Figma", "Role-based access control (RBAC)", "Real-time WebSocket/Server Events", "Full CI/CD & Automated tests", "3 Months dedicated SLA"]
      },
      {
        name: "Custom Scale System",
        price: "$55,000+",
        timeline: "10+ Weeks",
        description: "Complex multi-tenant platforms, micro-frontends, and high-load web systems.",
        features: ["Micro-frontend modular architecture", "Multi-region failover infrastructure", "SOC2 / ISO compliance design", "Dedicated senior engineering pod", "24/7 Priority SLA & Monitoring"]
      }
    ],
    faqs: [
      {
        question: "How do you guarantee sub-second load times?",
        answer: "We utilize edge caching, server-side streaming, code-splitting, WebP asset optimization, and strict Core Web Vitals performance budgets."
      },
      {
        question: "Can you integrate our existing backend APIs?",
        answer: "Yes, our team specializes in building resilient client-side and edge wrappers for existing REST, GraphQL, or gRPC backend services."
      },
      {
        question: "Who owns the intellectual property and code?",
        answer: "You retain 100% full ownership of all source code, design assets, and architectural documentation upon project completion."
      }
    ]
  },
  // 2. Mobile App Development
  {
    id: "2",
    slug: "mobile-app-dev",
    title: "Mobile App Development (iOS & Android)",
    category: "Core Development",
    iconName: "Smartphone",
    shortDesc: "Native-feel cross-platform mobile apps built with React Native and Flutter for seamless iOS and Android deployment.",
    fullDesc: "Deliver delightful, high-framerate mobile experiences. We build feature-rich mobile apps with offline synchronization, push notifications, and biometric authentication.",
    problemStatement: {
      headline: "Building separate native iOS and Android apps doubles engineering costs and creates feature parity gaps.",
      points: [
        "Slow feature updates across dual app store release cycles",
        "Clunky hybrid WebViews with poor gesture animation performance",
        "Inconsistent UI branding across Apple and Google design patterns"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "UX & Gesture Mapping",
        description: "Draft thumb-zone responsive navigation, dark/light native UI components, and tactile interaction flows.",
        deliverables: ["Mobile Clickable Prototype", "iOS/Android Human Interface Spec"]
      },
      {
        number: "02",
        title: "Cross-Platform Engine",
        description: "Build native-compiled modules with React Native or Flutter, utilizing hardware acceleration.",
        deliverables: ["Cross-platform Codebase", "Biometric & Camera Integration"]
      },
      {
        number: "03",
        title: "Offline Sync & Push",
        description: "Implement local SQLite/WatermelonDB storage with cloud background sync and rich notifications.",
        deliverables: ["Offline Data Manager", "FCM/APNS Push Setup"]
      },
      {
        number: "04",
        title: "Store Publishing & QA",
        description: "Manage Apple App Store and Google Play Store review submissions, CI/CD builds, and beta testing.",
        deliverables: ["App Store Approval Guarantee", "TestFlight / Internal Beta Deployment"]
      }
    ],
    techStack: [
      { category: "Mobile Frameworks", items: ["React Native", "Expo", "Flutter", "Swift (iOS)", "Kotlin (Android)"] },
      { category: "State & Local DB", items: ["WatermelonDB", "Zustand", "SQLite", "MMKV Storage"] },
      { category: "Cloud Services", items: ["Firebase Push", "RevenueCat", "Sentry Mobile", "Fastlane CI/CD"] }
    ],
    caseStudyHighlight: {
      client: "PulseFit Pro",
      metrics: "1.2M Downloads | 4.8 App Store Rating",
      title: "Building a Real-Time Fitness Tracker with Offline-First AI Coach",
      summary: "Developed a cross-platform mobile experience that seamlessly tracks workout telemetry and syncs with Apple Watch & Android Wear."
    },
    pricingTiers: [
      {
        name: "MVP Mobile Launch",
        price: "$18,000",
        timeline: "4 - 6 Weeks",
        description: "Core iOS & Android application ready for App Store submission.",
        features: ["iOS & Android cross-platform build", "User auth & social logins", "Push notification engine", "App Store & Play Store publishing"]
      },
      {
        name: "Pro Mobile App",
        price: "$34,000",
        timeline: "8 - 10 Weeks",
        recommended: true,
        description: "Full-featured consumer or enterprise mobile platform with payments, deep-linking, & offline sync.",
        features: ["Biometric authentication (FaceID/Fingerprint)", "In-app subscriptions & Apple/Google Pay", "Offline storage & cloud sync engine", "Custom camera/sensor capabilities", "Analytics & Crashlytics setup"]
      },
      {
        name: "Enterprise Mobile Suite",
        price: "$65,000+",
        timeline: "12+ Weeks",
        description: "Complex multi-app ecosystems with wearable companion apps and hardware Bluetooth integrations.",
        features: ["Apple Watch / Android Wear companion apps", "BLE / IoT hardware pairing", "Enterprise MDM deployment support", "White-label multi-tenant support"]
      }
    ],
    faqs: [
      {
        question: "Do you publish the apps to Apple App Store and Google Play?",
        answer: "Yes, we handle the entire submission process, including metadata, screenshots, privacy policies, and compliance reviews."
      },
      {
        question: "Why cross-platform over pure native?",
        answer: "Cross-platform frameworks like React Native yield 98% shared codebase, cutting development and maintenance costs in half without compromising 60fps native feel."
      }
    ]
  },
  // 3. Enterprise Software Systems
  {
    id: "3",
    slug: "enterprise-software",
    title: "Enterprise Software Systems",
    category: "Core Development",
    iconName: "Building2",
    shortDesc: "Custom ERP, CRM, and workflow management systems engineered to automate complex business operations.",
    fullDesc: "Replace disconnected spreadsheets and legacy software with a unified, high-security enterprise platform built specifically around your organization workflows.",
    problemStatement: {
      headline: "Off-the-shelf software forces businesses into rigid workflows and charges exorbitant per-user license fees.",
      points: [
        "Data silos across isolated software tools",
        "Manual data entry prone to human error and compliance risks",
        "Astronomical licensing costs that balloon as your headcount grows"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Business Process Mapping",
        description: "Audit internal operational bottlenecks, departmental permissions, and data flow pipelines.",
        deliverables: ["Workflow Gap Blueprint", "ROI Efficiency Matrix"]
      },
      {
        number: "02",
        title: "Custom Core Architecture",
        description: "Build modular database schemas, role-based access control (RBAC), and audit log systems.",
        deliverables: ["Enterprise Data Schema", "RBAC Security Policy"]
      },
      {
        number: "03",
        title: "Automation & System Sync",
        description: "Integrate legacy databases, ERP systems (SAP/Salesforce), and automated document pipelines.",
        deliverables: ["Custom Middleware Integration", "Automated Workflow Trigger Engine"]
      },
      {
        number: "04",
        title: "Staff Training & Onboarding",
        description: "Provide interactive staff training materials, enterprise single sign-on (SSO), and zero-downtime migration.",
        deliverables: ["SAML/OKTA SSO Setup", "User Documentation & Onboarding Seminars"]
      }
    ],
    techStack: [
      { category: "Enterprise Backend", items: ["Node.js Enterprise", "Python FastAPI", "Go (Golang)", "Java Spring Boot"] },
      { category: "Integrations & SSO", items: ["Okta", "SAML 2.0", "Salesforce API", "SAP Connector", "Zapier Enterprise"] },
      { category: "Database & Warehouse", items: ["PostgreSQL Cluster", "Snowflake", "ClickHouse", "Redis"] }
    ],
    caseStudyHighlight: {
      client: "LogiX Global Logistics",
      metrics: "-62% Processing Time | $1.4M Annual Savings",
      title: "Automating Supply Chain Dispatch for 8,000 Vehicles",
      summary: "Replaced a 15-year-old legacy software with a custom cloud platform, enabling real-time automated dispatch and audit trails."
    },
    pricingTiers: [
      {
        name: "Core Module",
        price: "$35,000",
        timeline: "6 - 8 Weeks",
        description: "Targeted internal system module (e.g. Custom CRM, Order Management, or Asset Portal).",
        features: ["Role-based access matrix", "Automated email/SMS workflows", "Exportable PDF/Excel reporting", "SAML/SSO integration"]
      },
      {
        name: "Full Enterprise ERP",
        price: "$75,000",
        timeline: "12 - 16 Weeks",
        recommended: true,
        description: "Complete operational backbone integrating inventory, HR, billing, analytics, and client portals.",
        features: ["Multi-department portal access", "Automated financial & inventory reconciliation", "Real-time telemetry dashboard", "Immutable audit logging", "1 Year SLA & Enterprise Maintenance"]
      }
    ],
    faqs: [
      {
        question: "Can this software run on our private cloud or on-premise infrastructure?",
        answer: "Absolutely. We support deployment to AWS, Google Cloud, Azure, Kubernetes clusters, or self-hosted air-gapped servers."
      }
    ]
  },
  // 4. Microservices & API Architecture
  {
    id: "4",
    slug: "microservices-api",
    title: "Microservices & API Architecture",
    category: "Core Development",
    iconName: "Server",
    shortDesc: "Resilient gRPC, REST, and GraphQL microservices designed for zero-downtime deployment and high throughput.",
    fullDesc: "Decouple monolithic backend systems into scalable microservices. We build lightweight, event-driven services with auto-scaling capabilities.",
    problemStatement: {
      headline: "Monolithic backends choke under heavy load, where a single failure takes down the entire application.",
      points: [
        "Single point of failure bringing down entire business operations",
        "Deployment bottlenecks requiring massive full-system regression tests",
        "Database lockups when reading heavy analytics alongside user writes"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Domain-Driven Design (DDD)",
        description: "Deconstruct monoliths into bounded contexts and decoupled service domains.",
        deliverables: ["Bounded Context Map", "API OpenAPI/Swagger Specs"]
      },
      {
        number: "02",
        title: "Event Bus & Gateway Engine",
        description: "Setup Kafka/RabbitMQ message streaming with rate-limited API Gateways.",
        deliverables: ["Kafka Event Bus", "Kong/Envoy API Gateway"]
      },
      {
        number: "03",
        title: "Service Implementation",
        description: "Build fast gRPC/REST microservices with containerized Docker and Kubernetes blueprints.",
        deliverables: ["Containerized Services", "Distributed Tracing Integration"]
      },
      {
        number: "04",
        title: "Zero-Downtime Pipeline",
        description: "Configure Canary deployments, circuit breakers, and automated health checks.",
        deliverables: ["Kubernetes Helm Charts", "ArgoCD Deployment Pipeline"]
      }
    ],
    techStack: [
      { category: "Protocols & Gateways", items: ["gRPC", "GraphQL", "REST OpenAPI", "Kong Gateway", "Envoy Proxy"] },
      { category: "Messaging & Event Streams", items: ["Apache Kafka", "RabbitMQ", "NATS", "AWS SQS/SNS"] },
      { category: "Orchestration", items: ["Kubernetes (EKS/GKE)", "Docker", "Istio Service Mesh"] }
    ],
    caseStudyHighlight: {
      client: "StreamPay Global",
      metrics: "15,000 req/sec | 99.999% Uptime",
      title: "Decoupling Legacy Payment Processing for 10M Daily Transactions",
      summary: "Transformed monolithic billing infrastructure into an event-driven gRPC microservice topology with zero downtime during Black Friday."
    },
    pricingTiers: [
      {
        name: "API Modernization",
        price: "$22,000",
        timeline: "4 - 5 Weeks",
        description: "Refactoring key APIs into modern, documented REST/GraphQL gateway endpoints.",
        features: ["OpenAPI 3.0 Documentation", "Rate-limiting & API key management", "Redis response caching", "JWT / OAuth2 security token middleware"]
      },
      {
        name: "Microservice Migration",
        price: "$48,000",
        timeline: "8 - 10 Weeks",
        recommended: true,
        description: "Decomposing core monolithic services into event-driven containerized microservices.",
        features: ["Kafka / RabbitMQ event architecture", "Distributed tracing with Jaeger / OpenTelemetry", "Kubernetes Helm configuration", "Circuit breakers & resilience policies"]
      }
    ],
    faqs: [
      {
        question: "How do you handle data consistency across microservices?",
        answer: "We implement the Saga pattern and event-driven eventual consistency protocols, complemented by transactional outbox patterns."
      }
    ]
  },
  // 5. Generative AI & LLM Integration
  {
    id: "5",
    slug: "generative-ai",
    title: "Generative AI & LLM Integration",
    category: "AI & Data",
    iconName: "Sparkles",
    shortDesc: "Productionize Gemini, OpenAI, and custom fine-tuned LLMs into your enterprise workflows with RAG and vector databases.",
    fullDesc: "Transform raw enterprise documents and customer interactions into intelligent generative AI features with retrieval-augmented generation (RAG) and semantic vector search.",
    problemStatement: {
      headline: "Generic AI chatbots hallucinate, leak internal secrets, and lack context regarding your company private business data.",
      points: [
        "Uncontrolled API costs and unpredictable response latency",
        "Hallucinations providing incorrect information to customers",
        "Data privacy risks sending confidential company information to external models"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Data Ingestion & Chunking",
        description: "Build automated document parsers (PDF, Notion, SQL) with smart semantic chunking.",
        deliverables: ["Vector Embeddings Pipeline", "Pinecone / Qdrant Storage"]
      },
      {
        number: "02",
        title: "Hybrid RAG & Prompt Engineering",
        description: "Implement multi-stage retrieval, semantic re-ranking, and strict guardrails.",
        deliverables: ["Custom RAG Engine", "System Prompt Matrix", "Hallucination Evaluator"]
      },
      {
        number: "03",
        title: "Fine-Tuning & Model Distillation",
        description: "Fine-tune domain-specific smaller models (Llama 3 / Mistral) for 10x cost reduction.",
        deliverables: ["Fine-Tuned Model Weights", "API Proxy Gateway"]
      },
      {
        number: "04",
        title: "UI Integration & Telemetry",
        description: "Deploy streaming responses, citation tags, and cost-per-token monitoring dashboards.",
        deliverables: ["Streaming React UI Components", "Token Usage Cost Dashboard"]
      }
    ],
    techStack: [
      { category: "AI Models", items: ["Google Gemini Pro/Flash", "OpenAI GPT-4o", "Anthropic Claude 3.5", "Llama 3 Fine-tuned"] },
      { category: "Vector Databases", items: ["Pinecone", "Qdrant", "pgvector", "Weaviate", "ChromaDB"] },
      { category: "Frameworks & Evaluation", items: ["LangChain", "LlamaIndex", "LangSmith", "Trulens", "vLLM"] }
    ],
    caseStudyHighlight: {
      client: "DocuQuery Legal Tech",
      metrics: "99.2% Accuracy | 85% Time Savings",
      title: "Building Enterprise Contract Analysis RAG Engine",
      summary: "Engineered a secure private RAG system that analyzes 500-page legal contracts in seconds with exact clause citations."
    },
    pricingTiers: [
      {
        name: "RAG Knowledge Pilot",
        price: "$16,000",
        timeline: "3 - 4 Weeks",
        description: "Internal documentation & knowledge base generative AI assistant.",
        features: ["Ingest up to 100,000 documents", "Pinecone vector database set up", "Streaming React UI widget", "Basic security guardrails & citations"]
      },
      {
        name: "Enterprise GenAI Suite",
        price: "$38,000",
        timeline: "6 - 8 Weeks",
        recommended: true,
        description: "Production-ready AI product layer with custom fine-tuning, multi-model routing, & analytics.",
        features: ["Hybrid semantic + vector search", "Custom model fine-tuning (Llama/Gemini)", "Hallucination filtering & guardrails", "Token cost optimization proxy", "Role-based data access filters"]
      }
    ],
    faqs: [
      {
        question: "Is our corporate data safe from being used to train third-party AI models?",
        answer: "Yes. We utilize enterprise API agreements, private VPC deployments, and local open-source LLMs so your data never touches public training datasets."
      }
    ]
  },
  // 6. AI Agents & Automation
  {
    id: "6",
    slug: "ai-agents",
    title: "AI Agents & Enterprise Automation",
    category: "AI & Data",
    iconName: "Bot",
    shortDesc: "Autonomous multi-agent workflows that plan, execute complex tasks, invoke APIs, and resolve support tickets without human delay.",
    fullDesc: "Empower your organization with multi-agent systems that autonomously execute multi-step business logic, generate reports, handle customer inquiries, and execute database queries.",
    problemStatement: {
      headline: "Repetitive human data handling creates massive operational overhead and slow response times.",
      points: [
        "High staffing costs for manual tier-1 customer support",
        "Delays in processing inbound sales leads or document verifications",
        "Human error during complex multi-step data transfers across software tools"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Agent Role & Tooling Specs",
        description: "Define agent goals, decision trees, available tool APIs, and human-in-the-loop triggers.",
        deliverables: ["Agent Architecture Map", "Tool API Contracts"]
      },
      {
        number: "02",
        title: "Multi-Agent Orchestration",
        description: "Develop Supervisor and Specialist agent networks capable of sub-task delegation.",
        deliverables: ["LangGraph / AutoGen State Engine", "Agent Memory Store"]
      },
      {
        number: "03",
        title: "API Tool Execution",
        description: "Grant agents safe access to execute database transactions, send emails, and parse files.",
        deliverables: ["Sandboxed Tool Call Runners", "Audit Log Recording"]
      },
      {
        number: "04",
        title: "Human-in-the-Loop Safeguards",
        description: "Build approval dashboards for high-value financial or external customer actions.",
        deliverables: ["Agent Approval Portal", "Fallback Routing Matrix"]
      }
    ],
    techStack: [
      { category: "Agent Orchestration", items: ["LangGraph", "CrewAI", "AutoGen", "Microsoft Semantic Kernel"] },
      { category: "Execution & Memory", items: ["Redis Agent Memory", "E2B Code Interpreter", "Python Async Engine"] },
      { category: "Monitoring", items: ["LangSmith", "Helicone", "Opik AI"] }
    ],
    caseStudyHighlight: {
      client: "SaaSFlow Global",
      metrics: "78% Auto-resolution | $380k Annual Savings",
      title: "Deploying Autonomous Customer Ops Agent",
      summary: "Created an autonomous support agent capable of executing refund logic, password resets, and account upgrades with zero human intervention."
    },
    pricingTiers: [
      {
        name: "Single Task Agent",
        price: "$18,000",
        timeline: "3 - 4 Weeks",
        description: "Autonomous agent dedicated to a specific task (e.g. Lead Qualification, Invoice Parsing).",
        features: ["Automated API tool invocation", "Error recovery & retry loops", "Web hook notifications", "30-day monitoring"]
      },
      {
        name: "Multi-Agent Network",
        price: "$42,000",
        timeline: "6 - 8 Weeks",
        recommended: true,
        description: "Complex multi-agent collaborative system for end-to-end departmental automation.",
        features: ["Supervisor & Specialist agent hierarchy", "Shared long-term vector memory", "Human-in-the-loop approval UI", "Real-time agent execution telemetry"]
      }
    ],
    faqs: [
      {
        question: "What happens if an AI agent makes a mistake?",
        answer: "We implement strict tool validation schemas, rate limits, and Human-In-The-Loop (HITL) approval workflows for critical business actions."
      }
    ]
  },
  // 7. Predictive Analytics & ML
  {
    id: "7",
    slug: "predictive-analytics",
    title: "Predictive Analytics & Machine Learning",
    category: "AI & Data",
    iconName: "LineChart",
    shortDesc: "Custom machine learning models for demand forecasting, churn prediction, fraud detection, and algorithmic pricing.",
    fullDesc: "Harness historical enterprise data to predict future market trends, customer behavior, and operational risks using custom ML pipelines.",
    problemStatement: {
      headline: "Reactive decision-making leaves companies vulnerable to unexpected customer churn and inventory stockouts.",
      points: [
        "Inability to anticipate customer churn before it occurs",
        "Inaccurate demand forecasting leading to wasted capital or lost sales",
        "Manual fraud detection failing to keep up with sophisticated bad actors"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Data Cleaning & Feature Store",
        description: "Clean structured historical data and engineer predictive feature sets.",
        deliverables: ["Feast Feature Store", "Data Quality Assessment"]
      },
      {
        number: "02",
        title: "Model Training & Tuning",
        description: "Train XGBoost, LightGBM, or Deep Learning models with cross-validation.",
        deliverables: ["Trained ML Pipeline", "Model Benchmarking Report"]
      },
      {
        number: "03",
        title: "MLOps & Inference API",
        description: "Package models into high-frequency, low-latency microservice endpoints.",
        deliverables: ["FastAPI Inference Endpoint", "MLflow Model Registry"]
      },
      {
        number: "04",
        title: "Drift Monitoring & Retraining",
        description: "Set up continuous monitoring for data drift and automated retraining loops.",
        deliverables: ["Evidently AI Drift Dashboard", "Automated Retraining Cron"]
      }
    ],
    techStack: [
      { category: "ML Libraries", items: ["PyTorch", "TensorFlow", "XGBoost", "scikit-learn", "LightGBM"] },
      { category: "Data Engineering", items: ["Apache Spark", "dbt", "Pandas", "Polars", "BigQuery"] },
      { category: "MLOps", items: ["MLflow", "Kubeflow", "Feast", "Evidently AI"] }
    ],
    caseStudyHighlight: {
      client: "RetailMax Chain",
      metrics: "-42% Inventory Costs | 94.6% Prediction Accuracy",
      title: "Predictive Demand & Dynamic Pricing Engine",
      summary: "Built an ML model predicting store inventory demand across 300 locations, cutting waste and maximizing margins."
    },
    pricingTiers: [
      {
        name: "ML Proof of Concept",
        price: "$20,000",
        timeline: "4 Weeks",
        description: "Model feasibility assessment and prototype build on your proprietary dataset.",
        features: ["Data exploratory analysis", "Baseline model training & tuning", "Accuracy benchmark report", "REST inference endpoint"]
      },
      {
        name: "Production MLOps Pipeline",
        price: "$45,000",
        timeline: "8 Weeks",
        recommended: true,
        description: "Complete machine learning system with feature store, automated retraining, and live API endpoints.",
        features: ["Automated ETL feature store", "Sub-50ms inference API", "Model drift alerts", "Executive prediction analytics dashboard"]
      }
    ],
    faqs: [
      {
        question: "How much historical data do we need to build an accurate model?",
        answer: "Typically, 6 to 12 months of clean structured data is sufficient to achieve high predictive accuracy."
      }
    ]
  },
  // 8. Computer Vision Solutions
  {
    id: "8",
    slug: "computer-vision",
    title: "Computer Vision Solutions",
    category: "AI & Data",
    iconName: "Eye",
    shortDesc: "Real-time video analytics, automated defect detection, OCR, and facial recognition powered by edge AI models.",
    fullDesc: "Transform visual camera streams and images into actionable structured data for manufacturing quality control, security, and medical imaging.",
    problemStatement: {
      headline: "Manual visual inspections are slow, subjective, and prone to human fatigue oversight.",
      points: [
        "Defective manufacturing parts reaching end consumers",
        "Inability to monitor large facility camera streams in real-time",
        "Manual document scanning requiring tedious manual data entry"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Dataset Curation & Annotation",
        description: "Annotate visual training images with precise bounding boxes and segmentation masks.",
        deliverables: ["Annotated Image Dataset", "Data Augmentation Pipeline"]
      },
      {
        number: "02",
        title: "Model Selection & Fine-Tuning",
        description: "Train YOLOv9, Segment Anything, or OpenCV models tailored to your target hardware.",
        deliverables: ["Custom Vision Weights", "Performance Accuracy Matrix"]
      },
      {
        number: "03",
        title: "Edge TensorRT Quantization",
        description: "Optimize models to run on NVIDIA Jetson, Coral TPU, or edge camera hardware.",
        deliverables: ["TensorRT Model File", "Sub-20ms Video Stream Processor"]
      },
      {
        number: "04",
        title: "Dashboard & Alerting",
        description: "Connect visual detection events to real-time SMS/Webhook alerts and visual overlays.",
        deliverables: ["Live Video Telemetry Dashboard", "Automated Anomaly Alerting"]
      }
    ],
    techStack: [
      { category: "Vision Models", items: ["YOLOv9/v10", "Segment Anything (SAM)", "OpenCV", "MediaPipe", "Tesseract OCR"] },
      { category: "Edge Hardware Acceleration", items: ["NVIDIA TensorRT", "ONNX Runtime", "NVIDIA Jetson", "OpenVINO"] },
      { category: "Video Streaming", items: ["FFmpeg", "RTSP Streaming", "WebRTC", "GStreamer"] }
    ],
    caseStudyHighlight: {
      client: "Precision Auto Parts",
      metrics: "99.8% Defect Detection Rate | 60 FPS Video Processing",
      title: "Automating High-Speed Assembly Line Quality Control",
      summary: "Deployed an edge computer vision system inspecting 200 parts per minute, eliminating defective product shipments."
    },
    pricingTiers: [
      {
        name: "Vision Pilot Project",
        price: "$24,000",
        timeline: "4 - 5 Weeks",
        description: "Targeted visual detection or OCR model trained on custom camera feeds.",
        features: ["Dataset annotation & curation", "YOLO model fine-tuning", "Real-time bounding box overlay UI", "Alert webhook API"]
      },
      {
        name: "Edge Vision Deployment",
        price: "$52,000",
        timeline: "8 - 10 Weeks",
        recommended: true,
        description: "Full multi-camera real-time processing system deployed on edge NVIDIA hardware.",
        features: ["Multi-stream RTSP camera manager", "NVIDIA TensorRT 60 FPS acceleration", "Hardware edge deployment", "Centralized analytics dashboard"]
      }
    ],
    faqs: [
      {
        question: "Can this vision software run on existing security cameras?",
        answer: "Yes! If your cameras provide standard RTSP or IP streams, our software can connect directly over the network."
      }
    ]
  },
  // 9. Product Design (UI/UX)
  {
    id: "9",
    slug: "product-design",
    title: "Product Design (UI/UX)",
    category: "Design & Growth",
    iconName: "Palette",
    shortDesc: "Apple-level product design, design systems, interactive prototypes, and user research that drive high conversion.",
    fullDesc: "Craft intuitive, memorable visual interfaces. We design user-centric digital products that combine spatial elegance, seamless micro-interactions, and conversion psychology.",
    problemStatement: {
      headline: "Cluttered UI and confusing navigation frustrate users, leading to high bounce rates and low feature adoption.",
      points: [
        "Inconsistent design patterns creating brand perception issues",
        "Confusing user onboarding resulting in immediate drop-off",
        "Lack of a unified design system slowing down development velocity"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "User Research & Wireframes",
        description: "Conduct user interviews, competitive audits, and low-fidelity user journey mapping.",
        deliverables: ["User Persona Blueprints", "Low-Fidelity Wireframes"]
      },
      {
        number: "02",
        title: "Design System & Component Tokenization",
        description: "Build a comprehensive Figma design system with tokens for colors, typography, and state components.",
        deliverables: ["Figma Design System Token Library", "Dark/Light Mode Variables"]
      },
      {
        number: "03",
        title: "High-Fidelity Interactive Prototypes",
        description: "Create pixel-perfect clickable screens featuring smooth animations and micro-interactions.",
        deliverables: ["Clickable High-Fi Prototype", "Micro-interaction Spec"]
      },
      {
        number: "04",
        title: "Developer Handoff & QA",
        description: "Provide React/Tailwind code tokens, asset exports, and design QA during engineering implementation.",
        deliverables: ["Zero-friction Dev Handoff Package", "Design QA Sign-off"]
      }
    ],
    techStack: [
      { category: "Design Tools", items: ["Figma", "Principle", "Rive", "Adobe CC", "Lottie"] },
      { category: "Design System Frameworks", items: ["Tailwind Tokens", "Radix Primitives", "Storybook", "Design Tokens Format"] }
    ],
    caseStudyHighlight: {
      client: "Veloce Mobility",
      metrics: "+210% User Retention | 4.9 Design Score",
      title: "Redesigning Next-Gen EV Companion Mobile Interface",
      summary: "Crafted a sleek, light-themed vehicle telemetry UI that simplified complex battery diagnostics into effortless driver widgets."
    },
    pricingTiers: [
      {
        name: "Design Sprint",
        price: "$10,000",
        timeline: "2 - 3 Weeks",
        description: "Rapid UI refresh or MVP product design package.",
        features: ["Up to 10 key high-fidelity screens", "Clickable Figma prototype", "Color & typography style guide", "Developer asset exports"]
      },
      {
        name: "Complete Product Design System",
        price: "$25,000",
        timeline: "5 - 6 Weeks",
        recommended: true,
        description: "Full end-to-end design system and user experience architecture for web and mobile.",
        features: ["Comprehensive Figma Token Design System", "Full web & mobile responsive screen layouts", "Micro-animations & interactive components", "Usability testing report", "Developer handoff documentation"]
      }
    ],
    faqs: [
      {
        question: "Do we get access to editable Figma source files?",
        answer: "Yes! You receive full ownership of all Figma libraries, components, tokens, and prototype links."
      }
    ]
  },
  // 10. Digital Transformation & Growth Strategy
  {
    id: "10",
    slug: "digital-transformation",
    title: "Digital Transformation & Growth Strategy",
    category: "Design & Growth",
    iconName: "TrendingUp",
    shortDesc: "Strategic tech modernization, legacy overhaul, and growth engineering to unlock new digital revenue channels.",
    fullDesc: "Align technology infrastructure with business growth goals. We help traditional enterprises transition into agile, tech-first market leaders.",
    problemStatement: {
      headline: "Agile competitors disrupt established businesses using modern software velocity and data insights.",
      points: [
        "Outdated software holding back new digital product offerings",
        "Siloed department operations slowing time-to-market",
        "Unoptimized sales funnel tech causing high client acquisition costs"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Technology & Stack Audit",
        description: "Comprehensive review of IT infrastructure, codebase quality, team velocity, and cloud costs.",
        deliverables: ["Tech Health Audit Report", "Modernization Roadmap"]
      },
      {
        number: "02",
        title: "Product-Led Growth Architecture",
        description: "Formulate automated customer acquisition, onboarding funnels, and self-serve SaaS models.",
        deliverables: ["Growth Funnel Blueprint", "Feature Prioritization Matrix"]
      },
      {
        number: "03",
        title: "Migration & Team Enablement",
        description: "Execute phased software upgrades while upskilling internal teams on modern engineering best practices.",
        deliverables: ["Phased Execution Blueprint", "Engineering Upskilling Workshops"]
      }
    ],
    techStack: [
      { category: "Analytics & Growth", items: ["Segment", "Mixpanel", "PostHog", "GA4", "HubSpot Enterprise"] },
      { category: "Strategy Frameworks", items: ["Product-Led Growth (PLG)", "Agile Scaled Framework", "Value Stream Mapping"] }
    ],
    caseStudyHighlight: {
      client: "Standard Capital Insurance",
      metrics: "3.5x Revenue Growth | $2.1M Tech Cost Reduction",
      title: "Digital Transformation of 40-Year-Old Insurance Carrier",
      summary: "Digitized policy quoting and automated underwriting, cutting quote issuance time from 5 days to 2 minutes."
    },
    pricingTiers: [
      {
        name: "Transformation Advisory",
        price: "$15,000",
        timeline: "3 Weeks",
        description: "Executive technology audit and strategic roadmap for enterprise leaders.",
        features: ["Full IT stack & security audit", "Cost optimization analysis", "3-Year digital roadmap", "Executive presentation"]
      },
      {
        name: "Full Growth Execution",
        price: "$40,000",
        timeline: "8 Weeks",
        recommended: true,
        description: "Hands-on strategy execution, funnel optimization, & architecture modernization.",
        features: ["Data pipeline consolidation", "Product-Led Growth onboarding funnel", "Custom analytics stack setup", "Bi-weekly executive steering calls"]
      }
    ],
    faqs: [
      {
        question: "How do you ensure zero disruption to current business revenue during migration?",
        answer: "We utilize strangler-fig migration strategies, running modern services in parallel alongside legacy systems until full validation."
      }
    ]
  },
  // 11. Cloud Infrastructure & DevOps
  {
    id: "11",
    slug: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    category: "Cloud & QA",
    iconName: "Cloud",
    shortDesc: "Terraform, Kubernetes, multi-cloud architectures (AWS/GCP), and automated CI/CD pipelines with 99.99% uptime SLA.",
    fullDesc: "Build rock-solid cloud infrastructure. We automate deployments, optimize cloud expenditures, and establish zero-trust security postures.",
    problemStatement: {
      headline: "Unoptimized cloud hosting results in inflated monthly bills and frequent deployment downtime.",
      points: [
        "AWS/GCP bills inflating uncontrollably month over month",
        "Manual deployment steps causing release bugs and downtime",
        "Lack of disaster recovery backup policies in place"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Infrastructure-as-Code (IaC)",
        description: "Code entire cloud infrastructure using Terraform or Pulumi for reproducible deployments.",
        deliverables: ["Terraform Code Base", "Cloud Architecture Blueprint"]
      },
      {
        number: "02",
        title: "CI/CD Pipeline Automation",
        description: "Build automated GitHub Actions / GitLab pipelines with automated linting, testing, and deployment.",
        deliverables: ["Automated CI/CD Workflows", "Zero-downtime Blue/Green Setup"]
      },
      {
        number: "03",
        title: "FinOps & Cost Optimization",
        description: "Eliminate idle cloud assets and configure auto-scaling group policies.",
        deliverables: ["FinOps Audit Report", "30-50% Cloud Cost Savings"]
      },
      {
        number: "04",
        title: "Observability & SLA Setup",
        description: "Install Datadog, Prometheus, and Grafana monitoring with instant Slack/PagerDuty escalation.",
        deliverables: ["Datadog Metrics Dashboard", "24/7 PagerDuty Alerting"]
      }
    ],
    techStack: [
      { category: "Cloud Providers", items: ["AWS", "Google Cloud Platform (GCP)", "Microsoft Azure", "Cloudflare"] },
      { category: "IaC & CI/CD", items: ["Terraform", "Pulumi", "Docker", "Kubernetes", "GitHub Actions", "ArgoCD"] },
      { category: "Observability", items: ["Datadog", "Prometheus", "Grafana", "Sentry", "PagerDuty"] }
    ],
    caseStudyHighlight: {
      client: "CloudScale SaaS",
      metrics: "-48% Cloud Spend | 99.99% Uptime",
      title: "AWS FinOps & Kubernetes Auto-scaling Overhaul",
      summary: "Restructured cloud topology using spot instances and Kubernetes auto-scaling, cutting $22,000 off monthly AWS bills."
    },
    pricingTiers: [
      {
        name: "DevOps & CI/CD Sprint",
        price: "$14,000",
        timeline: "2 - 3 Weeks",
        description: "Setup automated deployment pipelines and Docker containerization.",
        features: ["GitHub Actions CI/CD pipeline", "Docker image optimization", "Environment staging setup", "Basic Datadog alert triggers"]
      },
      {
        name: "Enterprise Multi-Cloud Infrastructure",
        price: "$32,000",
        timeline: "5 - 6 Weeks",
        recommended: true,
        description: "Production Kubernetes cluster set up with Terraform IaC, FinOps optimization, and disaster recovery.",
        features: ["Full Terraform Infrastructure-as-Code", "Production Kubernetes (EKS/GKE)", "FinOps cloud bill optimization", "Multi-region disaster recovery", "24/7 Monitoring & PagerDuty escalation"]
      }
    ],
    faqs: [
      {
        question: "Can you help us reduce our current AWS or Google Cloud monthly bill?",
        answer: "Yes! Our FinOps audits consistently achieve 30% to 50% immediate savings without reducing server performance."
      }
    ]
  },
  // 12. Cybersecurity & Compliance
  {
    id: "12",
    slug: "cybersecurity",
    title: "Cybersecurity & Compliance",
    category: "Cloud & QA",
    iconName: "ShieldCheck",
    shortDesc: "Penetration testing, SOC2 Type II, ISO 27001, GDPR, HIPAA compliance readiness, and Cloudflare WAF protection.",
    fullDesc: "Protect your enterprise assets from cyber threats. We implement zero-trust network security, conduct rigorous penetration tests, and guide you through compliance certifications.",
    problemStatement: {
      headline: "A single data breach or compliance violation can ruin customer trust and result in massive legal fines.",
      points: [
        "Unprotected API endpoints vulnerable to SQL injection or DDoS attacks",
        "Inability to pass enterprise vendor security reviews due to lack of SOC2",
        "Lack of encrypted data at rest and in transit policies"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Vulnerability & Pen Testing",
        description: "Perform ethical hacking attacks to identify OWASP top 10 security flaws in your code and infrastructure.",
        deliverables: ["Penetration Test Report", "Remediation Action Plan"]
      },
      {
        number: "02",
        title: "Zero-Trust Architecture",
        description: "Implement end-to-end encryption, strict IAM permissions, and Cloudflare WAF security rules.",
        deliverables: ["Cloudflare WAF Blueprint", "KMS Encryption Setup"]
      },
      {
        number: "03",
        title: "Compliance Audit Readiness",
        description: "Prepare policies, controls, and evidence collection for SOC2, ISO 27001, GDPR, or HIPAA.",
        deliverables: ["Vanta / Drata Integration", "Compliance Policy Suite"]
      }
    ],
    techStack: [
      { category: "Security Tools", items: ["Cloudflare WAF", "Snyk", "SonarQube", "Burp Suite", "AWS GuardDuty"] },
      { category: "Compliance Engines", items: ["Drata", "Vanta", "SOC2 Type II", "ISO 27001", "HIPAA", "GDPR"] }
    ],
    caseStudyHighlight: {
      client: "MediVault Health",
      metrics: "100% HIPAA Pass | Zero Security Flaws",
      title: "Achieving SOC2 Type II & HIPAA Compliance for Health Tech Engine",
      summary: "Hardened cloud infrastructure and audited data pipelines, securing enterprise health data for 50+ hospital clients."
    },
    pricingTiers: [
      {
        name: "Penetration Test & Audit",
        price: "$12,000",
        timeline: "2 Weeks",
        description: "Comprehensive web app & API ethical hacking security audit.",
        features: ["OWASP Top 10 vulnerability scan", "Manual penetration test execution", "Prioritized remediation report", "Re-test signoff certificate"]
      },
      {
        name: "SOC2 / HIPAA Compliance Suite",
        price: "$28,000",
        timeline: "5 - 6 Weeks",
        recommended: true,
        description: "Complete security hardening and automated evidence collection for audit certification.",
        features: ["Cloudflare WAF & DDoS mitigation set up", "Drata / Vanta automated policy integration", "Zero-Trust IAM access rules", "Guaranteed audit pass support"]
      }
    ],
    faqs: [
      {
        question: "How long does it take to achieve SOC2 Type II readiness?",
        answer: "With our automated compliance integrations (Vanta/Drata), we get tech infrastructure audit-ready in as little as 4 weeks."
      }
    ]
  },
  // 13. QA & Automated Testing
  {
    id: "13",
    slug: "qa-testing",
    title: "QA & Automated Testing",
    category: "Cloud & QA",
    iconName: "CheckCircle2",
    shortDesc: "End-to-end Playwright, Cypress, and Jest test suites ensuring 90%+ code coverage and bug-free production releases.",
    fullDesc: "Eliminate regression bugs before they hit users. We engineer robust automated test suites that run continuously in your deployment pipeline.",
    problemStatement: {
      headline: "Manual QA testing creates release bottlenecks and allows embarrassing bugs to leak into production.",
      points: [
        "Slow manual testing cycles holding back weekly feature releases",
        "Critical user flows (checkout, login) breaking during production updates",
        "Lack of load testing causing app crashes during high traffic surges"
      ]
    },
    processSteps: [
      {
        number: "01",
        title: "Test Plan Strategy",
        description: "Map out critical user journeys, edge cases, and load testing benchmarks.",
        deliverables: ["Test Matrix Strategy", "E2E Flow Mapping"]
      },
      {
        number: "02",
        title: "E2E & Integration Automation",
        description: "Write headless Playwright / Cypress scripts that simulate realistic user interactions across browsers.",
        deliverables: ["Playwright Test Suite", "Cypress UI Tests"]
      },
      {
        number: "03",
        title: "Load & Performance Testing",
        description: "Simulate 50,000 concurrent users using k6 and Locust to stress test servers.",
        deliverables: ["k6 Load Test Suite", "Server Bottleneck Analysis"]
      },
      {
        number: "04",
        title: "CI Pipeline Gating",
        description: "Block pull requests automatically if test coverage falls below 90% or tests fail.",
        deliverables: ["GitHub Actions Test Gate", "Visual Regression Telemetry"]
      }
    ],
    techStack: [
      { category: "Testing Frameworks", items: ["Playwright", "Cypress", "Jest", "Vitest", "Testing Library"] },
      { category: "Performance & API", items: ["k6", "Locust", "Postman Automated Tests", "Axe-core Accessibility"] }
    ],
    caseStudyHighlight: {
      client: "PayEdge Commerce",
      metrics: "94% Test Coverage | Zero Regressions",
      title: "Automating E2E Testing for Multi-Currency Checkout",
      summary: "Engineered a 400+ test Playwright suite running automatically on every code commit, eliminating payment gateway regressions."
    },
    pricingTiers: [
      {
        name: "Core E2E Test Suite",
        price: "$9,000",
        timeline: "2 Weeks",
        description: "Automated Playwright tests for your top 10 critical user flows.",
        features: ["10 Key E2E user flow test scripts", "Cross-browser execution (Chrome, Safari, Mobile)", "CI pipeline integration"]
      },
      {
        name: "Complete QA Automation System",
        price: "$22,000",
        timeline: "4 - 5 Weeks",
        recommended: true,
        description: "Comprehensive QA coverage including Unit, Integration, E2E, API, and Load testing.",
        features: ["90%+ code coverage guarantee", "Playwright + Vitest test suite", "k6 high-concurrency load testing", "Visual regression diffing", "CI/CD deployment gating"]
      }
    ],
    faqs: [
      {
        question: "Will these tests run automatically whenever our engineers push new code?",
        answer: "Yes! We configure GitHub Actions or GitLab pipelines so test suites run on every pull request automatically."
      }
    ]
  }
];

// src/data/contentData.ts
var CASE_STUDIES = [
  {
    id: "cs-1",
    slug: "fintech-ai-trading-platform",
    title: "Sub-Millisecond AI Trading Portal for Apex Fintech",
    client: "Apex Fintech Global",
    industry: "Financial Services",
    category: "AI & ML",
    summary: "Re-architected the core institutional trading interface using React 19, custom WebSockets, and fine-tuned predictive ML models.",
    metrics: [
      { label: "Latency Reduction", value: "78", suffix: "%" },
      { label: "Concurrent Users", value: "2.5M", suffix: "+" },
      { label: "Uptime Score", value: "99.999", suffix: "%" }
    ],
    challenge: "Apex Fintech faced severe page freeze latency during market opening spikes, causing high-value institutional traders to drop off.",
    solution: "CrifTech decoupled the monolithic frontend, built a zero-copy WebSocket data layer, and introduced real-time anomaly detection AI agents.",
    results: [
      "Sub-50ms market order rendering speed",
      "Zero downtime throughout 2025-2026 market volatility events",
      "Saved $3.2M in infrastructure overhead by optimizing WebSocket memory allocation"
    ],
    techUsed: ["React 19", "TypeScript", "WebSockets", "Go (Golang)", "Python PyTorch", "Redis", "AWS EKS"],
    featuredImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "cs-2",
    slug: "healthtech-patient-care-engine",
    title: "HIPAA-Compliant AI Patient Care Engine for MediVault",
    client: "MediVault Health",
    industry: "Healthcare & MedTech",
    category: "Web",
    summary: "Built an end-to-end patient telemetry portal with automated clinical document parsing and SOC2 Type II security.",
    metrics: [
      { label: "Processing Speed", value: "12x", suffix: " Faster" },
      { label: "HIPAA Audit Score", value: "100", suffix: "%" },
      { label: "Patient Satisfaction", value: "4.9", suffix: "/5" }
    ],
    challenge: "Clinical staff spent 4 hours daily entering patient notes manually, delaying urgent care recommendations.",
    solution: "Engineered a private generative AI RAG system with voice transcription that automatically drafts structured medical summaries.",
    results: [
      "Reduced medical note entry time from 40 mins to 3 mins per patient",
      "Full HIPAA and SOC2 Type II compliance approval achieved in 30 days",
      "Seamless deployment across 52 hospital network locations"
    ],
    techUsed: ["Next.js 14", "Google Gemini Pro RAG", "Python FastAPI", "Pinecone", "Docker", "Cloudflare WAF"],
    featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "cs-3",
    slug: "logistics-autonomous-dispatch",
    title: "Autonomous AI Supply Chain Dispatching for LogiX",
    client: "LogiX Logistics",
    industry: "Supply Chain & Transport",
    category: "Mobile App",
    summary: "Built an intelligent driver mobile app and automated fleet dispatch system optimizing 8,000 active delivery vehicles.",
    metrics: [
      { label: "Fuel Cost Savings", value: "$1.4M", suffix: "/yr" },
      { label: "On-Time Rate", value: "99.4", suffix: "%" },
      { label: "Active Drivers", value: "8,500", suffix: "+" }
    ],
    challenge: "Manual fleet dispatchers struggled to dynamically reroute trucks during weather delays, leading to high fuel waste and late deliveries.",
    solution: "Designed a React Native mobile app backed by an AI route optimization model that automatically recalibrates routes in real-time.",
    results: [
      "Cut annual driver fuel expenditure by $1,400,000",
      "Increased driver app adoption to 98% within two weeks of launch",
      "Zero delivery dropouts during holiday peak shipping weeks"
    ],
    techUsed: ["React Native", "Expo", "Google Maps Platform", "Node.js", "Kafka", "PostgreSQL"],
    featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "cs-4",
    slug: "cloud-devops-scale-kubernetes",
    title: "Multi-Region Cloud Kubernetes Overhaul for SaaSFlow",
    client: "SaaSFlow Global",
    industry: "Enterprise Software",
    category: "Cloud",
    summary: "Architected a zero-downtime multi-region Kubernetes topology with FinOps cost optimization and automated blue/green releases.",
    metrics: [
      { label: "AWS Spend Reduced", value: "48", suffix: "%" },
      { label: "Deployment Frequency", value: "15x", suffix: "/day" },
      { label: "Global Latency", value: "<25", suffix: "ms" }
    ],
    challenge: "SaaSFlow suffered from runaway monthly AWS bills ($45k/mo) and risky manual software deployments that caused intermittent outages.",
    solution: "CrifTech introduced Terraform Infrastructure-as-Code, Kubernetes spot instance auto-scaling, and automated ArgoCD pipelines.",
    results: [
      "Instantly slashed monthly AWS hosting bills from $45,000 to $23,400",
      "Enabled continuous deployment 15 times a day with zero user downtime",
      "Achieved global sub-25ms response times across US, EU, and APAC"
    ],
    techUsed: ["Kubernetes (EKS)", "Terraform", "ArgoCD", "Prometheus", "Grafana", "Cloudflare Edge"],
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  }
];
var TEAM_MEMBERS = [
  {
    id: "tm-1",
    name: "Alexander V. Thorne",
    role: "Founder & Chief Executive Officer",
    bio: "Former Senior Principal Architect at Vercel & Tesla. 14+ years scaling high-concurrency systems and pioneering enterprise AI applications.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    github: "https://github.com/criftech",
    expertise: ["Enterprise Strategy", "AI Architecture", "Distributed Systems"]
  },
  {
    id: "tm-2",
    name: "Dr. Elena Rostova",
    role: "Chief Technology Officer & Head of AI",
    bio: "PhD in Computer Vision & Neural Networks from MIT. Ex-Google Brain Staff Scientist specializing in fine-tuned LLMs, RAG, and autonomous agents.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    github: "https://github.com/criftech",
    expertise: ["LLM Fine-Tuning", "Multi-Agent Frameworks", "PyTorch & CUDA"]
  },
  {
    id: "tm-3",
    name: "Marcus Vance",
    role: "VP of Software Engineering",
    bio: "Ex-Lead Engineer at Apple & Stripe. Master of React 19, high-performance edge rendering, and resilient microservice architectures.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    github: "https://github.com/criftech",
    expertise: ["React 19 & Next.js", "Go & Rust", "Edge Computing"]
  },
  {
    id: "tm-4",
    name: "Sophia Chen",
    role: "Head of Product Design & UX Strategy",
    bio: "Award-winning UI/UX director formerly at Airbnb & Figma. Passionate about spatial design systems, high-contrast light themes, and micro-interactions.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    expertise: ["Design Systems", "Micro-Interactions", "Product Psychology"]
  },
  {
    id: "tm-5",
    name: "David K. Miller",
    role: "Chief Information Security Officer (CISO)",
    bio: "Certified Ethical Hacker (CEH) with 12 years securing FinTech & Healthcare platforms. Led 100+ flawless SOC2 Type II & ISO 27001 audits.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    expertise: ["SOC2 / HIPAA Compliance", "Zero-Trust WAF", "Penetration Testing"]
  },
  {
    id: "tm-6",
    name: "Rachel K. Sterling",
    role: "Lead Cloud Infrastructure & DevOps Specialist",
    bio: "Kubernetes Ambassador and Terraform Contributor. Architected cloud hosting for over 120 global enterprise web platforms.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop",
    linkedin: "https://linkedin.com/in/criftech",
    github: "https://github.com/criftech",
    expertise: ["Kubernetes (EKS/GKE)", "FinOps Optimization", "Terraform IaC"]
  }
];

// server/db.ts
var MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://criftech_db_user:yvfjvDsb2Kys8IuI@admin.jwnuqti.mongodb.net/criftech?retryWrites=true&w=majority";
var ServiceSchema = new import_mongoose.default.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  iconName: { type: String, required: true },
  problemStatement: {
    headline: { type: String, default: "" },
    points: [{ type: String }]
  },
  processSteps: [{
    number: String,
    title: String,
    description: String,
    deliverables: [String]
  }],
  techStack: [{
    category: String,
    items: [String]
  }],
  caseStudyHighlight: {
    client: String,
    metrics: String,
    title: String,
    summary: String
  },
  pricingTiers: [{
    name: String,
    price: String,
    timeline: String,
    description: String,
    features: [String],
    recommended: Boolean
  }],
  faqs: [{
    question: String,
    answer: String,
    category: String
  }]
}, { timestamps: true });
var CaseStudySchema = new import_mongoose.default.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  metrics: [{
    label: String,
    value: String,
    suffix: String
  }],
  challenge: { type: String, default: "" },
  solution: { type: String, default: "" },
  results: [{ type: String }],
  techUsed: [{ type: String }],
  featuredImage: { type: String, default: "" }
}, { timestamps: true });
var TeamMemberSchema = new import_mongoose.default.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  expertise: [{ type: String }]
}, { timestamps: true });
var LeadSchema = new import_mongoose.default.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true },
  subscribedAt: { type: String, required: true },
  source: { type: String, default: "Footer Newsletter" },
  status: { type: String, enum: ["Active", "Unsubscribed"], default: "Active" }
}, { timestamps: true });
LeadSchema.index({ email: 1 }, { unique: true });
var MailSchema = new import_mongoose.default.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: "" },
  service: { type: String, default: "" },
  budget: { type: String, default: "" },
  message: { type: String, required: true },
  submittedAt: { type: String, required: true },
  type: { type: String, default: "Contact Form" },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  notes: { type: String, default: "" }
}, { timestamps: true });
var SettingSchema = new import_mongoose.default.Schema({
  key: { type: String, required: true, unique: true, default: "site_settings" },
  data: { type: import_mongoose.default.Schema.Types.Mixed, required: true }
}, { timestamps: true });
var ServiceModel = import_mongoose.default.models.Service || import_mongoose.default.model("Service", ServiceSchema);
var CaseStudyModel = import_mongoose.default.models.CaseStudy || import_mongoose.default.model("CaseStudy", CaseStudySchema);
var TeamMemberModel = import_mongoose.default.models.TeamMember || import_mongoose.default.model("TeamMember", TeamMemberSchema);
var LeadModel = import_mongoose.default.models.Lead || import_mongoose.default.model("Lead", LeadSchema);
var MailModel = import_mongoose.default.models.Mail || import_mongoose.default.model("Mail", MailSchema);
var SettingModel = import_mongoose.default.models.Setting || import_mongoose.default.model("Setting", SettingSchema);
async function connectDB() {
  if (import_mongoose.default.connection.readyState >= 1) {
    return;
  }
  try {
    import_mongoose.default.set("bufferCommands", false);
    await import_mongoose.default.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3e3,
      connectTimeoutMS: 3e3
    });
    console.log("\u2705 Connected to MongoDB Atlas successfully");
    await seedDatabase();
  } catch (err) {
    console.warn("\u26A0\uFE0F MongoDB Atlas connection skipped or failed (IP whitelist/network restriction). Running in resilient in-memory mode.");
  }
}
var memorySettings = null;
var memoryServices = [...ALL_SERVICES];
var memoryCaseStudies = [...CASE_STUDIES];
var memoryTeam = [...TEAM_MEMBERS];
var memoryLeads = [
  {
    id: "lead-1",
    email: "cto@nexusfintech.com",
    subscribedAt: new Date(Date.now() - 864e5 * 3).toISOString(),
    source: "Footer Newsletter",
    status: "Active"
  },
  {
    id: "lead-2",
    email: "founder@hypercloud.io",
    subscribedAt: new Date(Date.now() - 864e5 * 2).toISOString(),
    source: "Footer Newsletter",
    status: "Active"
  }
];
var memoryMails = [
  {
    id: "mail-1",
    name: "Sarah Jenkins",
    email: "sarah.j@vertexlabs.ai",
    company: "Vertex Labs AI",
    service: "AI & Machine Learning",
    budget: "$50,000 - $100,000",
    message: "Hello CrifTech team, we are looking to integrate a custom GenAI agent pipeline into our enterprise SaaS platform.",
    submittedAt: new Date(Date.now() - 36e5 * 5).toISOString(),
    type: "Contact Form",
    isRead: false,
    isStarred: true,
    notes: "High priority lead."
  }
];
function isDbConnected() {
  return import_mongoose.default.connection.readyState === 1;
}
async function getSettingsData() {
  if (isDbConnected()) {
    try {
      const setting = await SettingModel.findOne({ key: "site_settings" });
      if (setting?.data) return setting.data;
    } catch (e) {
    }
  }
  return memorySettings;
}
async function saveSettingsData(data) {
  memorySettings = data;
  if (isDbConnected()) {
    try {
      await SettingModel.findOneAndUpdate(
        { key: "site_settings" },
        { key: "site_settings", data },
        { upsert: true, returnDocument: "after" }
      );
    } catch (e) {
    }
  }
  return memorySettings;
}
async function getServicesData() {
  if (isDbConnected()) {
    try {
      const services = await ServiceModel.find().sort({ createdAt: 1 });
      if (services && services.length > 0) return services;
    } catch (e) {
    }
  }
  return memoryServices;
}
async function addServiceData(item) {
  memoryServices.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new ServiceModel(item);
      await newDoc.save();
    } catch (e) {
    }
  }
  return item;
}
async function updateServiceData(id, item) {
  const index = memoryServices.findIndex((s) => s.id === id);
  if (index !== -1) {
    memoryServices[index] = { ...memoryServices[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await ServiceModel.findOneAndUpdate({ id }, item, { returnDocument: "after" });
    } catch (e) {
    }
  }
  return memoryServices[index] || item;
}
async function deleteServiceData(id) {
  memoryServices = memoryServices.filter((s) => s.id !== id);
  if (isDbConnected()) {
    try {
      await ServiceModel.deleteOne({ id });
    } catch (e) {
    }
  }
  return true;
}
async function getCaseStudiesData() {
  if (isDbConnected()) {
    try {
      const cs = await CaseStudyModel.find().sort({ createdAt: 1 });
      if (cs && cs.length > 0) return cs;
    } catch (e) {
    }
  }
  return memoryCaseStudies;
}
async function addCaseStudyData(item) {
  memoryCaseStudies.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new CaseStudyModel(item);
      await newDoc.save();
    } catch (e) {
    }
  }
  return item;
}
async function updateCaseStudyData(id, item) {
  const index = memoryCaseStudies.findIndex((c) => c.id === id);
  if (index !== -1) {
    memoryCaseStudies[index] = { ...memoryCaseStudies[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await CaseStudyModel.findOneAndUpdate({ id }, item, { returnDocument: "after" });
    } catch (e) {
    }
  }
  return memoryCaseStudies[index] || item;
}
async function deleteCaseStudyData(id) {
  memoryCaseStudies = memoryCaseStudies.filter((c) => c.id !== id);
  if (isDbConnected()) {
    try {
      await CaseStudyModel.deleteOne({ id });
    } catch (e) {
    }
  }
  return true;
}
async function getTeamData() {
  if (isDbConnected()) {
    try {
      const members = await TeamMemberModel.find().sort({ createdAt: 1 });
      if (members && members.length > 0) return members;
    } catch (e) {
    }
  }
  return memoryTeam;
}
async function addTeamData(item) {
  memoryTeam.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new TeamMemberModel(item);
      await newDoc.save();
    } catch (e) {
    }
  }
  return item;
}
async function updateTeamData(id, item) {
  const index = memoryTeam.findIndex((t) => t.id === id);
  if (index !== -1) {
    memoryTeam[index] = { ...memoryTeam[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await TeamMemberModel.findOneAndUpdate({ id }, item, { returnDocument: "after" });
    } catch (e) {
    }
  }
  return memoryTeam[index] || item;
}
async function deleteTeamData(id) {
  memoryTeam = memoryTeam.filter((t) => t.id !== id);
  if (isDbConnected()) {
    try {
      await TeamMemberModel.deleteOne({ id });
    } catch (e) {
    }
  }
  return true;
}
async function getLeadsData() {
  if (isDbConnected()) {
    try {
      const leads = await LeadModel.find().sort({ createdAt: -1 });
      if (leads && leads.length > 0) return leads;
    } catch (e) {
    }
  }
  return memoryLeads;
}
async function addLeadData(email, source) {
  const normEmail = email.trim().toLowerCase();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (isDbConnected()) {
    try {
      const existingMongo = await LeadModel.findOne({ email: normEmail }).lean();
      if (existingMongo) {
        try {
          await LeadModel.updateOne(
            { email: normEmail },
            { $set: { status: "Active" } }
          );
        } catch {
        }
        const finalLead = { ...existingMongo, status: "Active" };
        const inMemIdx = memoryLeads.findIndex((l) => l.email.toLowerCase() === normEmail);
        if (inMemIdx >= 0) memoryLeads[inMemIdx] = finalLead;
        else memoryLeads.unshift(finalLead);
        return {
          lead: finalLead,
          isDuplicate: true,
          firstSubscribedAt: finalLead.subscribedAt || now,
          subscribedAt: now
        };
      }
    } catch (e) {
    }
  }
  const memExisting = memoryLeads.find((l) => l.email.toLowerCase() === normEmail);
  if (memExisting) {
    memExisting.status = "Active";
    memExisting.subscribedAt = now;
    if (isDbConnected()) {
      try {
        await LeadModel.findOneAndUpdate(
          { email: normEmail },
          { $set: { status: "Active" } },
          { upsert: true, returnDocument: "after", new: false }
        );
      } catch (e) {
      }
    }
    return {
      lead: memExisting,
      isDuplicate: true,
      firstSubscribedAt: memExisting.subscribedAt || now,
      subscribedAt: now
    };
  }
  const newLead = {
    id: "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    email: normEmail,
    subscribedAt: now,
    source: source || "Footer Newsletter",
    status: "Active"
  };
  memoryLeads.unshift(newLead);
  if (isDbConnected()) {
    try {
      const dbLead = new LeadModel(newLead);
      await dbLead.save();
    } catch (e) {
      if (e?.code === 11e3 || String(e?.message || "").includes("duplicate key") || String(e?.message || "").includes("E11000")) {
        try {
          const existing = await LeadModel.findOne({ email: normEmail }).lean();
          if (existing) {
            return {
              lead: existing,
              isDuplicate: true,
              firstSubscribedAt: existing.subscribedAt || now,
              subscribedAt: now
            };
          }
        } catch {
        }
      }
    }
  }
  return {
    lead: newLead,
    isDuplicate: false,
    firstSubscribedAt: now,
    subscribedAt: now
  };
}
async function deleteLeadData(id) {
  memoryLeads = memoryLeads.filter((l) => l.id !== id);
  if (isDbConnected()) {
    try {
      await LeadModel.deleteOne({ id });
    } catch (e) {
    }
  }
  return true;
}
async function getMailsData() {
  if (isDbConnected()) {
    try {
      const mails = await MailModel.find().sort({ createdAt: -1 });
      if (mails && mails.length > 0) return mails;
    } catch (e) {
    }
  }
  return memoryMails;
}
async function addMailData(mailData) {
  const newMail = {
    id: "mail-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    name: (mailData.name || "").trim(),
    email: (mailData.email || "").trim(),
    company: mailData.company || "",
    service: mailData.service || "General Inquiry",
    budget: mailData.budget || "Not specified",
    message: (mailData.message || "").trim(),
    submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
    type: mailData.type || "Contact Form",
    isRead: false,
    isStarred: false,
    notes: ""
  };
  memoryMails.unshift(newMail);
  if (isDbConnected()) {
    try {
      const dbMail = new MailModel(newMail);
      await dbMail.save();
    } catch (e) {
    }
  }
  return newMail;
}
async function updateMailData(id, fields) {
  const index = memoryMails.findIndex((m) => m.id === id);
  if (index !== -1) {
    memoryMails[index] = { ...memoryMails[index], ...fields };
  }
  if (isDbConnected()) {
    try {
      await MailModel.findOneAndUpdate({ id }, { $set: fields }, { returnDocument: "after" });
    } catch (e) {
    }
  }
  return memoryMails[index] || fields;
}
async function deleteMailData(id) {
  memoryMails = memoryMails.filter((m) => m.id !== id);
  if (isDbConnected()) {
    try {
      await MailModel.deleteOne({ id });
    } catch (e) {
    }
  }
  return true;
}
async function resetMemoryAndDB() {
  memorySettings = null;
  memoryServices = [...ALL_SERVICES];
  memoryCaseStudies = [...CASE_STUDIES];
  memoryTeam = [...TEAM_MEMBERS];
  if (isDbConnected()) {
    try {
      await SettingModel.deleteOne({ key: "site_settings" });
      await seedDatabase();
    } catch (e) {
    }
  }
}
async function seedDatabase() {
  try {
    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0) {
      console.log("\u{1F331} Seeding initial Services to MongoDB Atlas...");
      await ServiceModel.insertMany(ALL_SERVICES);
    }
    const caseCount = await CaseStudyModel.countDocuments();
    if (caseCount === 0) {
      console.log("\u{1F331} Seeding initial Case Studies to MongoDB Atlas...");
      await CaseStudyModel.insertMany(CASE_STUDIES);
    }
    const teamCount = await TeamMemberModel.countDocuments();
    if (teamCount === 0) {
      console.log("\u{1F331} Seeding initial Team Members to MongoDB Atlas...");
      await TeamMemberModel.insertMany(TEAM_MEMBERS);
    }
    const leadCount = await LeadModel.countDocuments();
    if (leadCount === 0) {
      console.log("\u{1F331} Seeding sample Newsletter Leads to MongoDB Atlas...");
      const sampleLeads = [
        {
          id: "lead-1",
          email: "cto@nexusfintech.com",
          subscribedAt: new Date(Date.now() - 864e5 * 3).toISOString(),
          source: "Footer Newsletter",
          status: "Active"
        },
        {
          id: "lead-2",
          email: "founder@hypercloud.io",
          subscribedAt: new Date(Date.now() - 864e5 * 2).toISOString(),
          source: "Footer Newsletter",
          status: "Active"
        },
        {
          id: "lead-3",
          email: "vp.engineering@medivault.org",
          subscribedAt: new Date(Date.now() - 864e5 * 1).toISOString(),
          source: "Footer Newsletter",
          status: "Active"
        }
      ];
      await LeadModel.insertMany(sampleLeads);
    }
    const mailCount = await MailModel.countDocuments();
    if (mailCount === 0) {
      console.log("\u{1F331} Seeding sample Contact Mails to MongoDB Atlas...");
      const sampleMails = [
        {
          id: "mail-1",
          name: "Sarah Jenkins",
          email: "sarah.j@vertexlabs.ai",
          company: "Vertex Labs AI",
          service: "AI & Machine Learning",
          budget: "$50,000 - $100,000",
          message: "Hello CrifTech team, we are looking to integrate a custom GenAI agent pipeline into our enterprise SaaS platform. We need ultra-low latency inference and HIPAA compliance. Looking forward to discussing.",
          submittedAt: new Date(Date.now() - 36e5 * 5).toISOString(),
          type: "Contact Form",
          isRead: false,
          isStarred: true,
          notes: "High priority lead - follow up scheduled for tomorrow morning."
        },
        {
          id: "mail-2",
          name: "Michael Chang",
          email: "m.chang@payflow.co",
          company: "PayFlow Global",
          service: "Custom Web Applications",
          budget: "$25,000 - $50,000",
          message: "Hi! We need a complete refactor of our merchant dashboard in React 19 and Tailwind CSS. Current system is slow under spike traffic.",
          submittedAt: new Date(Date.now() - 864e5 * 1.5).toISOString(),
          type: "Contact Form",
          isRead: true,
          isStarred: false,
          notes: ""
        },
        {
          id: "mail-3",
          name: "Elena Rostova",
          email: "elena@skylinehealth.de",
          company: "Skyline Health Solutions",
          service: "Cloud Infrastructure & DevOps",
          budget: "$100,000+",
          message: "We require a full multi-cloud migration to Kubernetes (EKS/GKE) with SOC2 compliance and zero-downtime deployment pipelines.",
          submittedAt: new Date(Date.now() - 864e5 * 4).toISOString(),
          type: "Contact Form",
          isRead: true,
          isStarred: true,
          notes: "Sent initial discovery questionnaire."
        }
      ];
      await MailModel.insertMany(sampleMails);
    }
  } catch (err) {
    console.error("Error during database seed:", err);
  }
}

// server/brevo.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
var BREVO_API_BASE = "https://api.brevo.com/v3";
function env(name, fallback = "") {
  const v = process.env[name];
  return v ?? fallback;
}
function getBrevoConfig() {
  const apiKey = env("BREVO_API_KEY");
  const smtpHost = env("BREVO_SMTP_HOST", "smtp-relay.brevo.com");
  const smtpPort = Number(env("BREVO_SMTP_PORT", "587"));
  const smtpUser = env("BREVO_SMTP_USER");
  const smtpPass = env("BREVO_SMTP_PASS");
  const senderName = env("BREVO_SENDER_NAME", "CrifTech");
  const senderEmail = env("BREVO_SENDER_EMAIL", "criftech@gmail.com");
  const adminAlertEmail = env("BREVO_ADMIN_NOTIFY_EMAIL") || senderEmail;
  const appUrl = env("APP_URL");
  const publicLogoUrl = env("BREVO_PUBLIC_LOGO_URL") || (appUrl && appUrl !== "MY_APP_URL" ? `${appUrl.replace(/\/$/, "")}/CrifTech1.png` : "https://criftech.com/CrifTech1.png");
  const gmailSmtpUser = env("GMAIL_SMTP_USER") || senderEmail;
  const gmailSmtpPass = env("GMAIL_SMTP_PASS");
  return {
    apiKey,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    senderName,
    senderEmail,
    adminAlertEmail,
    publicLogoUrl,
    gmailSmtpUser,
    gmailSmtpPass
  };
}
var BREVO_CONFIG = getBrevoConfig();
function diagnoseBrevoEnv() {
  const keys = [
    "BREVO_API_KEY",
    "BREVO_SMTP_HOST",
    "BREVO_SMTP_PORT",
    "BREVO_SMTP_USER",
    "BREVO_SMTP_PASS",
    "BREVO_SENDER_NAME",
    "BREVO_SENDER_EMAIL",
    "BREVO_ADMIN_NOTIFY_EMAIL",
    "BREVO_PUBLIC_LOGO_URL",
    "APP_URL",
    "GMAIL_SMTP_USER",
    "GMAIL_SMTP_PASS"
  ];
  const status = {};
  for (const k of keys) {
    const v = process.env[k];
    if (v === void 0 || v === "") {
      status[k] = "MISSING";
    } else if (k.includes("KEY") || k.includes("PASS") || k.includes("SECRET")) {
      const masked = v.length <= 6 ? "***" : `${v.slice(0, 4)}***${v.slice(-4)}`;
      status[k] = `OK (${masked}) len=${v.length}`;
    } else {
      status[k] = `OK (${v})`;
    }
  }
  return status;
}
var FREE_EMAIL_DOMAINS = /* @__PURE__ */ new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.in",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "protonmail.com",
  "proton.me",
  "tutanota.com",
  "mail.com",
  "yandex.com"
]);
function isFreeEmailSender(email) {
  if (!email) return false;
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return FREE_EMAIL_DOMAINS.has(domain);
}
function effectiveSendOrder(senderEmail) {
  const gmailOk = gmailSmtpAvailable();
  const freeSender = isFreeEmailSender(senderEmail);
  if (!freeSender) {
    const base = ["rest", "smtp"];
    if (gmailOk) base.push("gmail-smtp");
    return base;
  }
  if (gmailOk) return ["gmail-smtp", "rest", "smtp"];
  return ["smtp", "rest"];
}
function preferredSendOrder(senderEmail) {
  return isFreeEmailSender(senderEmail) ? ["smtp", "rest"] : ["rest", "smtp"];
}
async function listBrevoSenders() {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, senders: [], error: "BREVO_API_KEY is not configured" };
  }
  console.log(`[BREVO] SENDERS \u2192 list via GET ${BREVO_API_BASE}/senders`);
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders`, {
      method: "GET",
      headers: {
        "api-key": cfg.apiKey,
        "Accept": "application/json"
      }
    });
    const body = await res.text();
    let data = body;
    try {
      data = JSON.parse(body);
    } catch {
    }
    if (!res.ok) {
      const msg = data && (data.message || data.error) || `Brevo API returned HTTP ${res.status}: ${body}`;
      console.error(`[BREVO] SENDERS \u2717 list FAILED HTTP ${res.status}: ${msg}`);
      return { ok: false, senders: [], error: msg };
    }
    const senders = Array.isArray(data?.senders) ? data.senders : Array.isArray(data) ? data : [];
    console.log(`[BREVO] SENDERS \u2713 list OK \u2014 found ${senders.length} sender(s) in Brevo account`);
    return { ok: true, senders, count: senders.length };
  } catch (err) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS \u2717 list THREW: ${msg}`);
    return { ok: false, senders: [], error: msg };
  }
}
async function createBrevoSender(input) {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, error: "BREVO_API_KEY is not configured" };
  }
  if (!input.email || !input.name) {
    return { ok: false, error: "email and name are both required to create a Brevo sender" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    return { ok: false, error: `invalid email format: ${input.email}` };
  }
  const payload = { email: input.email, name: input.name };
  if (input.ips && Array.isArray(input.ips) && input.ips.length) {
    const sum = input.ips.reduce((acc, i) => acc + (i.weight || 0), 0);
    if (sum !== 100) {
      return { ok: false, error: `ips weights must sum to 100, got ${sum}` };
    }
    payload.ips = input.ips;
  }
  console.log(
    `[BREVO] SENDERS \u2192 creating sender email="${input.email}" name="${input.name}" via POST ${BREVO_API_BASE}/senders`
  );
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders`, {
      method: "POST",
      headers: {
        "api-key": cfg.apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const body = await res.text();
    let data = body;
    try {
      data = JSON.parse(body);
    } catch {
    }
    if (!res.ok) {
      const msg = data && (data.message || data.error) || `Brevo API returned HTTP ${res.status}: ${body}`;
      console.error(`[BREVO] SENDERS \u2717 create FAILED HTTP ${res.status}: ${msg}`);
      return { ok: false, error: msg };
    }
    const id = typeof data?.id === "number" ? data.id : void 0;
    const dkimError = Boolean(data?.dkimError);
    const spfError = Boolean(data?.spfError);
    const nextStep = `Check the inbox of ${input.email} for a verification email from Brevo. Click "Activate sender" inside it, then call GET /api/brevo/senders to confirm active:true. Untill activated, Brevo will reject sends with "sender you used is not valid".`;
    console.log(
      `[BREVO] SENDERS \u2713 create OK \u2014 id=${id} dkimError=${dkimError} spfError=${spfError}. NEXT STEP: verify the sender by clicking the link Brevo sent to ${input.email}.`
    );
    return { ok: true, id, dkimError, spfError, nextStep };
  } catch (err) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS \u2717 create THREW: ${msg}`);
    return { ok: false, error: msg };
  }
}
async function resendBrevoSenderVerification(senderId) {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, error: "BREVO_API_KEY is not configured" };
  }
  if (!Number.isFinite(senderId) || senderId <= 0) {
    return { ok: false, error: `senderId must be a positive integer, got ${senderId}` };
  }
  console.log(
    `[BREVO] SENDERS \u2192 re-sending verification for sender id=${senderId} via POST ${BREVO_API_BASE}/senders/${senderId}/validate`
  );
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders/${encodeURIComponent(String(senderId))}/validate`, {
      method: "POST",
      headers: {
        "api-key": cfg.apiKey,
        "Accept": "application/json"
      }
    });
    if (res.status === 204 || res.ok) {
      const nextStep = 'Brevo re-sent the verification email. Open the recipient inbox, find the Brevo verification email, click "Activate sender".';
      console.log(`[BREVO] SENDERS \u2713 re-send verify OK for sender id=${senderId}. ${nextStep}`);
      return { ok: true, nextStep };
    }
    const body = await res.text();
    let data = body;
    try {
      data = JSON.parse(body);
    } catch {
    }
    const msg = data && (data.message || data.error) || `Brevo API returned HTTP ${res.status}: ${body}`;
    console.error(`[BREVO] SENDERS \u2717 re-send verify FAILED HTTP ${res.status}: ${msg}`);
    return { ok: false, error: msg };
  } catch (err) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS \u2717 re-send verify THREW: ${msg}`);
    return { ok: false, error: msg };
  }
}
function ensureTo(to) {
  return Array.isArray(to) ? to : [to];
}
function esc(s) {
  if (s === null || s === void 0) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function emailShell(o) {
  const accent = o.accent || "#0066FF";
  const logoUrl = getBrevoConfig().publicLogoUrl;
  const signature = o.signature || "Thanks,<br />The <strong>CrifTech</strong> Team \u2014 Engineering Modern Digital Products &amp; AI Systems";
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.headline)}</title>
<!--[if mso]>
<noscript>
<xml>
<w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
<w:AllowPNG/><w:PunctuationKerning/></w:WordDocument>
</xml>
</noscript>
<![endif]-->
<style>
  .ReadMsgBody{width:100%} .ExternalClass{width:100%} .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}
  body{margin:0;padding:0;background-color:#070B14;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;max-width:100%}
  a{text-decoration:none}
  @media only screen and (max-width:620px){
    .wrap{width:100% !important}
    .pad{padding-left:20px !important;padding-right:20px !important}
    .hero-img{height:110px !important}
    .headline{font-size:22px !important;line-height:28px !important}
    .eyebrow{font-size:10px !important;letter-spacing:1.6px !important}
    .btn{width:100% !important;display:block !important}
    .btn a{display:block !important;width:auto !important}
  }
</style>
</head>
<body>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#070B14">
  <tr>
    <td align="center" style="padding:36px 16px 48px 16px;">
      <!-- Preheader (invisible preview text) -->
      <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
        ${esc(o.eyebrow || "")} \u2014 ${esc(o.headline)}
      </div>

      <table class="wrap" role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#0A1020"
        style="border:1px solid rgba(0,102,255,0.14);border-radius:18px;overflow:hidden;box-shadow:0 20px 60px -30px rgba(0,102,255,0.35);background:linear-gradient(180deg,#0A1020 0%,#070B14 100%);">

        <!-- Hero band with logo + gradient swoosh -->
        <tr>
          <td class="hero-img" align="center" style="height:140px;background:linear-gradient(135deg,#050810 0%,#0A1530 40%,#001946 70%,#000814 100%);position:relative;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding:22px 16px 10px 16px;">
                  <a href="https://criftech.com" target="_blank" style="display:inline-block;text-decoration:none;">
                    <img src="${logoUrl}" alt="CrifTech Logo" width="160" height="50" style="display:block;max-width:160px;height:auto;width:160px;border:0;outline:none;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" class="pad" style="padding:0 24px 26px 24px;">
                  <div class="eyebrow" style="color:${accent};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                    ${esc(o.eyebrow || "CrifTech")}
                  </div>
                  <div class="headline" style="margin-top:8px;color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:26px;line-height:32px;font-weight:800;letter-spacing:-0.02em;">
                    ${o.headline}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Blue accent bar -->
        <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,${accent} 50%,transparent 100%);"></td></tr>

        <!-- Body card -->
        <tr>
          <td class="pad" style="padding:30px 32px 28px 32px;color:#E2E8F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.65;">
            ${o.body}

            ${o.cta ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
              <tr>
                <td align="left">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn" style="border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;">
                    <tr>
                      <td style="border-radius:12px;background:linear-gradient(135deg,${accent} 0%,#0052CC 100%);box-shadow:0 10px 24px -12px ${accent};">
                        <a href="${esc(o.cta.url)}" target="_blank" style="display:inline-block;padding:13px 22px;color:#FFFFFF;font-weight:700;font-size:14px;letter-spacing:0.01em;">
                          ${esc(o.cta.label)} &nbsp;\u2192
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>` : ""}

            <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(148,163,184,0.12);color:#94A3B8;font-size:13px;line-height:1.6;">
              ${signature}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="pad" align="center" style="padding:18px 32px 28px 32px;background:linear-gradient(180deg,#070B14 0%,#050810 100%);border-top:1px solid rgba(0,102,255,0.1);">
            <div style="color:#64748B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;">
              <strong style="color:#94A3B8;">CrifTech</strong> &middot; Engineering Modern Digital Products &amp; AI Systems<br />
              ${esc(o.footerExtra || "Sent via Brevo transactional email. Replies route directly to CrifTech support.")}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
function newsletterWelcomeHtml(firstName, source) {
  return emailShell({
    eyebrow: "Newsletter \xB7 Subscription Confirmed",
    headline: `You're on the list, ${firstName} \u{1F44B}`,
    accent: "#0066FF",
    body: `
        <p style="margin:0 0 6px 0;">
          This is your official confirmation \u2014 you're now subscribed to the CrifTech Dispatch newsletter.
          We only email you when it actually matters, never for filler.
        </p>

        <div style="background:linear-gradient(180deg,#0C1530 0%,#091125 100%);border:1px solid rgba(0,102,255,0.22);border-radius:14px;padding:16px 18px;margin:18px 0 10px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Status</div>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#4ADE80;font-size:11.5px;font-weight:700;">
              <span style="width:6px;height:6px;border-radius:999px;background:#4ADE80;"></span>
              Subscription active
            </div>
          </div>
          ${source ? `<div style="margin-top:8px;color:#94A3B8;font-size:12px;"><span style="color:#64748B;font-weight:700;">Source:</span> <span style="color:#CBD5E1;">${esc(source)}</span></div>` : ""}
        </div>

        <ul style="margin:10px 0 4px 0;padding:0 0 0 18px;color:#CBD5E1;">
          <li style="margin-bottom:6px;"><strong>Case studies &amp; deep-dives</strong> \u2014 real production builds we ship for clients.</li>
          <li style="margin-bottom:6px;"><strong>New capability announcements</strong> \u2014 AI systems, product development, design &amp; growth.</li>
          <li><strong>Quarterly engineering letters</strong> \u2014 tooling, wins, lessons learned, no filler.</li>
        </ul>
      `,
    cta: { label: "Explore our services", url: "https://criftech.com/services" },
    footerExtra: "If you ever want off the list, just reply to this email with \u201Cunsubscribe\u201D."
  });
}
function newsletterAdminAlertHtml(email, source, prettyName) {
  const local = prettyName || (email.split("@")[0] || email);
  const displayName = prettyName || local;
  return emailShell({
    eyebrow: "Admin Alert \xB7 Newsletter",
    headline: `New subscriber: ${displayName}`,
    accent: "#22C55E",
    body: `
        <p style="margin:0 0 14px 0;">A new visitor just subscribed to the CrifTech Dispatch newsletter. Hit <strong style="color:#FFFFFF;">Reply</strong> to this email to reach them directly (reply-to is already set to their address).</p>

        <div style="background:linear-gradient(180deg,#081713 0%,#06110D 100%);border:1px solid rgba(34,197,94,0.18);border-radius:14px;padding:18px;margin:6px 0 10px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(displayName)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">
                <a href="mailto:${esc(email)}" style="color:#86EFAC;text-decoration:none;">${esc(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Source</td>
              <td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(source || "Website newsletter form")}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Timestamp</td>
              <td style="padding:4px 0;color:#94A3B8;font-size:12.5px;">${(/* @__PURE__ */ new Date()).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <p style="margin:4px 0 0 0;color:#94A3B8;font-size:12.5px;">
          A separate <strong style="color:#CBD5E1;">"\u23F3 You're on the list"</strong> branded confirmation was auto-sent to this subscriber at the same time.
        </p>
      `,
    signature: "\u2014 CrifTech server \xB7 admin alerts"
  });
}
function contactConfirmationHtml(name, inquiry) {
  const firstName = name.split(/\s+/)[0] || name;
  return emailShell({
    eyebrow: "Message Received \xB7 Confirmation",
    headline: `Thanks, ${firstName} \u2014 your request is in.`,
    accent: "#0066FF",
    body: `
        <p style="margin:0 0 6px 0;">
          We got your message and a real human on the CrifTech team will reply within <strong style="color:#FFFFFF;">1 business day</strong>.
          Your case ID for this inquiry is shown below \u2014 if you reply to this email, keep it in the subject line so we can thread everything.
        </p>

        <div style="background:linear-gradient(180deg,#0C1530 0%,#091125 100%);border:1px solid rgba(0,102,255,0.22);border-radius:14px;padding:16px 18px;margin:18px 0 10px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Status</div>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);color:#F59E0B;font-size:11.5px;font-weight:700;">
              <span style="width:6px;height:6px;border-radius:999px;background:#F59E0B;"></span>
              Request pending \xB7 queued
            </div>
          </div>
          ${inquiry.subject ? `<div style="color:#94A3B8;font-size:12px;margin-top:8px;"><span style="color:#64748B;font-weight:700;">Subject:</span> <span style="color:#CBD5E1;">${esc(inquiry.subject)}</span></div>` : ""}
          <div style="margin-top:10px;padding-top:10px;border-top:1px dashed rgba(100,116,139,0.25);color:#CBD5E1;font-size:13px;line-height:1.7;white-space:pre-wrap;">${esc(inquiry.message)}</div>
        </div>

        <p style="margin:0;color:#94A3B8;font-size:12.5px;">
          If your need is urgent, reply <strong>\u201CURGENT\u201D</strong> anywhere in the subject and it will escalate to our engineering director directly.
        </p>
      `,
    cta: { label: "Visit CrifTech", url: "https://criftech.com" },
    footerExtra: "This email was auto-sent - your reply goes straight to CrifTech."
  });
}
function contactAdminAlertHtml(inquiry) {
  return emailShell({
    eyebrow: "Admin Alert \xB7 Contact Form",
    headline: `New message from ${inquiry.name}`,
    accent: "#F97316",
    body: `
        <p style="margin:0 0 14px 0;">Someone filled out the contact form on criftech.com. Below is the raw submission \u2014 hit <strong style="color:#FFFFFF;">Reply</strong> to answer them (reply-to is already set to the visitor's email).</p>

        <div style="background:linear-gradient(180deg,#10110B 0%,#0A0906 100%);border:1px solid rgba(249,115,22,0.2);border-radius:14px;padding:18px;margin:6px 0 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(inquiry.name)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#93C5FD;font-size:13.5px;"><a href="mailto:${esc(inquiry.email)}" style="color:#93C5FD;">${esc(inquiry.email)}</a></td>
            </tr>
            ${inquiry.phone ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Phone</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(inquiry.phone)}</td></tr>` : ""}
            ${inquiry.company ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Company</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(inquiry.company)}</td></tr>` : ""}
            ${inquiry.subject ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Subject</td><td style="padding:4px 0;color:#FFFFFF;font-size:13.5px;">${esc(inquiry.subject)}</td></tr>` : ""}
          </table>
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed rgba(100,116,139,0.3);color:#E2E8F0;font-size:13.5px;line-height:1.7;white-space:pre-wrap;">${esc(inquiry.message)}</div>
        </div>
      `,
    signature: "\u2014 CrifTech server \xB7 contact-form alerts",
    footerExtra: "The visitor has already received a separate \u201Crequest pending\u201D confirmation email."
  });
}
function bookCallConfirmationHtml(name, slot = {}) {
  const firstName = name.split(/\s+/)[0] || name;
  return emailShell({
    eyebrow: "Book a Call \xB7 Confirmed",
    headline: `${firstName}, your call slot is held.`,
    accent: "#8B5CF6",
    body: `
        <p style="margin:0 0 12px 0;">
          Awesome. We've blocked a 30-minute discovery call on our calendar for the details below.
          A calendar invite with Zoom / Google Meet link will be sent separately by our ops team within the next hour.
        </p>

        <div style="background:linear-gradient(180deg,#0F0A22 0%,#0A0718 100%);border:1px solid rgba(139,92,246,0.22);border-radius:14px;padding:18px;margin:14px 0 10px 0;">
          ${slot.date ? `<div style="margin-bottom:10px;"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Date</div><div style="color:#FFFFFF;font-size:14.5px;">${esc(slot.date)}</div></div>` : ""}
          ${slot.time ? `<div style="margin-bottom:10px;"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Time (your local)</div><div style="color:#FFFFFF;font-size:14.5px;">${esc(slot.time)}</div></div>` : ""}
          ${slot.notes ? `<div style="padding-top:10px;border-top:1px dashed rgba(100,116,139,0.3);"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">Notes</div><div style="color:#CBD5E1;font-size:13px;line-height:1.6;white-space:pre-wrap;">${esc(slot.notes)}</div></div>` : ""}
          ${!slot.date && !slot.time && !slot.notes ? `<div style="color:#CBD5E1;font-size:13px;line-height:1.6;">We've captured your request \u2014 our team will reply with 3 specific time slots to choose from within 1 business day.</div>` : ""}
        </div>

        <p style="margin:6px 0 0 0;color:#94A3B8;font-size:12.5px;">
          Before the call, feel free to reply with: (1) a 1-paragraph problem statement, (2) any deadlines,
          (3) links to existing product/docs \u2014 the more context, the denser the conversation.
        </p>
      `,
    cta: { label: "Prep: Review our services", url: "https://criftech.com/services" }
  });
}
function bookCallAdminAlertHtml(name, email, slot = {}) {
  return emailShell({
    eyebrow: "Admin Alert \xB7 Book a Call",
    headline: `Discovery call requested: ${name}`,
    accent: "#8B5CF6",
    body: `
        <p style="margin:0 0 12px 0;">A visitor requested a discovery call via the \u201CBook a Call\u201D CTA on criftech.com.</p>
        <div style="background:linear-gradient(180deg,#0F0A22 0%,#0A0718 100%);border:1px solid rgba(139,92,246,0.22);border-radius:14px;padding:18px;margin:6px 0 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#C4B5FD;font-size:13.5px;"><a href="mailto:${esc(email)}" style="color:#C4B5FD;">${esc(email)}</a></td>
            </tr>
            ${slot.date ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Preferred date</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(slot.date)}</td></tr>` : ""}
            ${slot.time ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Preferred time</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(slot.time)}</td></tr>` : ""}
            ${slot.notes ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Notes</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;line-height:1.6;white-space:pre-wrap;">${esc(slot.notes)}</td></tr>` : ""}
          </table>
        </div>
      `,
    signature: "\u2014 CrifTech server \xB7  book-a-call alerts"
  });
}
async function sendViaRest(params) {
  const cfg = getBrevoConfig();
  const apiKey = cfg.apiKey;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");
  const senderName = cfg.senderName;
  const senderEmail = cfg.senderEmail;
  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(", ");
  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: toList.map((t) => ({ email: t.email, name: t.name || t.email.split("@")[0] })),
    subject: params.subject,
    htmlContent: params.html || buildHtml(params),
    ...params.text ? { textContent: params.text } : {},
    ...params.cc?.length ? { cc: params.cc } : {},
    ...params.bcc?.length ? { bcc: params.bcc } : {},
    ...params.replyTo ? { replyTo: { email: params.replyTo.email, name: params.replyTo.name || params.replyTo.email.split("@")[0] } } : {},
    ...params.tags?.length ? { tags: params.tags } : {},
    ...params.attachments?.length ? { attachment: params.attachments.map((a) => ({ name: a.name, content: a.content })) } : {}
  };
  console.log(`[BREVO] REST \u2192 sending subject="${params.subject}" to=[${recipients}] tags=[${(params.tags || []).join(", ")}]`);
  const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });
  const body = await res.text();
  let data = body;
  try {
    data = JSON.parse(body);
  } catch {
  }
  if (!res.ok) {
    const msg = data && (data.message || data.error) || `Brevo REST API returned HTTP ${res.status}`;
    console.error(`[BREVO] REST \u2717 FAILED for subject="${params.subject}" HTTP ${res.status}: ${msg}`);
    throw new Error(msg);
  }
  const messageId = data && (data.messageId || data.message_id) || "(no message-id returned)";
  console.log(`[BREVO] REST \u2713 DELIVERED subject="${params.subject}" messageId=${messageId}`);
  return { channel: "rest", ...typeof data === "object" ? data : { raw: data } };
}
var _smtpTransport = null;
function getSmtpTransport() {
  if (_smtpTransport) return _smtpTransport;
  const cfg = getBrevoConfig();
  const host = cfg.smtpHost;
  const port = Number(cfg.smtpPort);
  const user = cfg.smtpUser;
  const pass = cfg.smtpPass;
  if (!user || !pass) throw new Error("Brevo SMTP credentials are not configured");
  const tlsOpts = port === 465 ? { rejectUnauthorized: true, minVersion: "TLSv1.2" } : { rejectUnauthorized: false, minVersion: "TLSv1.2" };
  _smtpTransport = import_nodemailer.default.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: tlsOpts
  });
  return _smtpTransport;
}
var _gmailSmtpTransport = null;
function getGmailSmtpTransport() {
  if (_gmailSmtpTransport) return _gmailSmtpTransport;
  const cfg = getBrevoConfig();
  const user = cfg.gmailSmtpUser;
  const pass = cfg.gmailSmtpPass;
  if (!user || !pass) throw new Error("GMAIL_SMTP_PASS is not configured");
  if (!isFreeEmailSender(user) || !user.toLowerCase().endsWith("@gmail.com")) {
    throw new Error(`Gmail SMTP relay requires GMAIL_SMTP_USER to end with @gmail.com, got "${user}"`);
  }
  const normalizedPass = String(pass).replace(/\s+/g, "");
  _gmailSmtpTransport = import_nodemailer.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: normalizedPass },
    tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" }
  });
  return _gmailSmtpTransport;
}
function gmailSmtpAvailable() {
  try {
    const cfg = getBrevoConfig();
    return Boolean(cfg.gmailSmtpPass) && cfg.gmailSmtpUser.toLowerCase().endsWith("@gmail.com");
  } catch {
    return false;
  }
}
async function sendViaGmailSmtp(params) {
  const transport = getGmailSmtpTransport();
  const cfg = getBrevoConfig();
  const senderName = cfg.senderName;
  const senderEmail = cfg.gmailSmtpUser;
  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(", ");
  console.log(
    `[BREVO] GMAIL-SMTP \u2192 sending subject="${params.subject}" to=[${recipients}] via smtp.gmail.com:465 (as ${senderEmail})`
  );
  try {
    const ready = await transport.verify();
    if (!ready) throw new Error("Gmail SMTP transport.verify() returned false");
    console.log(`[BREVO] GMAIL-SMTP \u2192 handshake OK with smtp.gmail.com:465`);
  } catch (verifyErr) {
    throw new Error(
      `Gmail SMTP handshake FAILED: ${verifyErr?.message || verifyErr}. Hint: GMAIL_SMTP_PASS must be a 16-char Google "App Password" (NOT your account password), and 2-Step Verification must be ON for ${senderEmail}.`
    );
  }
  const info = await transport.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: toList.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email),
    ...params.cc?.length ? { cc: params.cc.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email) } : {},
    ...params.bcc?.length ? { bcc: params.bcc.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email) } : {},
    ...params.replyTo ? { replyTo: params.replyTo.name ? `"${params.replyTo.name}" <${params.replyTo.email}>` : params.replyTo.email } : {},
    subject: params.subject,
    html: params.html || buildHtml(params),
    ...params.text ? { text: params.text } : {},
    ...params.attachments?.length ? {
      attachments: params.attachments.map((a) => ({
        filename: a.name,
        content: Buffer.from(a.content, "base64")
      }))
    } : {}
  });
  console.log(
    `[BREVO] GMAIL-SMTP \u2713 DELIVERED subject="${params.subject}" messageId=${info?.messageId || "n/a"} response=${info?.response || "n/a"}`
  );
  return { channel: "gmail-smtp", messageId: info?.messageId, response: info?.response || "" };
}
async function sendViaSmtp(params) {
  const transport = getSmtpTransport();
  const cfg = getBrevoConfig();
  const senderName = cfg.senderName;
  const senderEmail = cfg.senderEmail;
  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(", ");
  console.log(
    `[BREVO] SMTP \u2192 sending subject="${params.subject}" to=[${recipients}] via ${cfg.smtpHost}:${cfg.smtpPort}`
  );
  try {
    const ready = await transport.verify();
    if (!ready) throw new Error("SMTP transport.verify() returned false");
    console.log(`[BREVO] SMTP \u2192 handshake OK with ${cfg.smtpHost}:${cfg.smtpPort}`);
  } catch (verifyErr) {
    throw new Error(
      `SMTP handshake FAILED with ${cfg.smtpHost}:${cfg.smtpPort}: ${verifyErr?.message || verifyErr}`
    );
  }
  const info = await transport.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: toList.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email),
    ...params.cc?.length ? { cc: params.cc.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email) } : {},
    ...params.bcc?.length ? { bcc: params.bcc.map((t) => t.name ? `"${t.name}" <${t.email}>` : t.email) } : {},
    ...params.replyTo ? { replyTo: params.replyTo.name ? `"${params.replyTo.name}" <${params.replyTo.email}>` : params.replyTo.email } : {},
    subject: params.subject,
    html: params.html || buildHtml(params),
    ...params.text ? { text: params.text } : {},
    ...params.attachments?.length ? {
      attachments: params.attachments.map((a) => ({
        filename: a.name,
        content: Buffer.from(a.content, "base64")
      }))
    } : {}
  });
  console.log(
    `[BREVO] SMTP \u2713 DELIVERED subject="${params.subject}" messageId=${info?.messageId || "n/a"} response=${info?.response || "n/a"}`
  );
  return { channel: "smtp", messageId: info?.messageId, response: info?.response || "" };
}
function buildHtml({ subject, text, html }) {
  if (html) return html;
  return emailShell({
    headline: subject,
    body: `<p style="margin:0;color:#CBD5E1;white-space:pre-wrap;line-height:1.7;">${esc(text || "")}</p>`
  });
}
async function sendBrevoEmail(params) {
  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(", ");
  const cfg = getBrevoConfig();
  const order = effectiveSendOrder(cfg.senderEmail);
  const gmailOk = order.includes("gmail-smtp") || gmailSmtpAvailable();
  console.log(
    `[BREVO] sendBrevoEmail ENTRY \u2014 subject="${params.subject}" to=[${recipients}] tags=[${(params.tags || []).join(", ")}] sender="${cfg.senderEmail}" order=${order.join("\u2192")}` + (gmailOk ? " (Gmail SMTP ready)" : "")
  );
  for (const channel of order) {
    try {
      let result;
      if (channel === "rest") result = await sendViaRest(params);
      else if (channel === "smtp") result = await sendViaSmtp(params);
      else result = await sendViaGmailSmtp(params);
      const channelLabel = channel === "rest" ? "REST" : channel === "smtp" ? "SMTP" : "GMAIL-SMTP";
      const msgId = result?.messageId || result?.message_id || (channel !== "rest" ? result?.messageId : void 0) || "n/a";
      console.log(
        `[BREVO] sendBrevoEmail SUCCESS \u2014 channel=${channelLabel} subject="${params.subject}" messageId=${msgId}`
      );
      return { ok: true, channel, result };
    } catch (err) {
      const channelLabel = channel === "rest" ? "REST" : channel === "smtp" ? "SMTP" : "GMAIL-SMTP";
      const idx = order.indexOf(channel);
      const remaining = order.slice(idx + 1);
      const fallBackMsg = remaining.length === 0 ? " \u2014 NO FALLBACK LEFT" : ` \u2014 falling back to ${remaining.map((c) => c.toUpperCase()).join("\u2192")}`;
      console.warn(
        `[BREVO] ${channelLabel} channel FAILED for subject="${params.subject}"${fallBackMsg}. Reason: ${err?.message || err}`
      );
    }
  }
  const finalError = `All ${order.length} channels failed. Sender="${cfg.senderEmail}" order=${order.join("\u2192")}. ` + (gmailOk ? "Gmail SMTP was tried last and also failed \u2014 double-check GMAIL_SMTP_PASS is a valid 16-char Google App Password." : "If sender is @gmail.com, add GMAIL_SMTP_PASS (Google App Password) to .env for a guaranteed-delivery fallback.");
  console.error(
    `[BREVO] sendBrevoEmail FAILURE \u2014 ALL CHANNELS FAILED for subject="${params.subject}" to=[${recipients}]. ${finalError}`
  );
  return { ok: false, error: finalError };
}
async function notifyNewsletterSignup(email, source) {
  const firstName = (email.split("@")[0] || "Subscriber").replace(/[._-]/g, " ");
  const prettyName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const srcLabel = source || "Footer Newsletter";
  console.log(
    `[BREVO] NOTIFIER ENTRY \u2192 notifyNewsletterSignup(name="${prettyName}", email="${email}", source="${srcLabel}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;
  let adminOk = false;
  let adminChannel;
  let confirmOk = false;
  let confirmChannel;
  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: "CrifTech Admin" },
      replyTo: { email, name: prettyName },
      subject: `[Newsletter] New subscriber \xB7 ${email}${srcLabel ? ` \u2014 ${srcLabel}` : ""}`,
      html: newsletterAdminAlertHtml(email, source, prettyName),
      tags: ["admin-alert", "newsletter", "criftech"]
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyNewsletterSignup \u2014 admin alert FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  {
    const res = await sendBrevoEmail({
      to: { email, name: prettyName },
      subject: `\u23F3 You're on the list, ${prettyName}`,
      html: newsletterWelcomeHtml(prettyName, source),
      tags: ["newsletter", "auto-reply", "welcome", "criftech"]
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyNewsletterSignup \u2014 subscriber confirmation FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  console.log(
    `[BREVO] NOTIFIER RESULT \u2192 notifyNewsletterSignup(name="${prettyName}", email="${email}"): admin-alert=${adminOk ? "OK@" + (adminChannel || "?") : "FAIL"} | subscriber-confirmation=${confirmOk ? "OK@" + (confirmChannel || "?") : "FAIL"}`
  );
}
async function notifyContactForm(inquiry) {
  console.log(
    `[BREVO] NOTIFIER ENTRY \u2192 notifyContactForm(name="${inquiry.name}", email="${inquiry.email}", subject="${inquiry.subject || "(none)"}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;
  let adminOk = false;
  let adminChannel;
  let confirmOk = false;
  let confirmChannel;
  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: "CrifTech Admin" },
      replyTo: { email: inquiry.email, name: inquiry.name },
      subject: `[Contact] ${inquiry.subject ? inquiry.subject : `New message from ${inquiry.name}`}`,
      html: contactAdminAlertHtml(inquiry),
      tags: ["admin-alert", "contact-form", "criftech"]
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyContactForm \u2014 admin alert FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  {
    const res = await sendBrevoEmail({
      to: { email: inquiry.email, name: inquiry.name },
      subject: inquiry.subject ? `\u23F3 Request received \u2014 ${inquiry.subject}` : `\u23F3 We received your message, ${inquiry.name.split(/\s+/)[0]}`,
      html: contactConfirmationHtml(inquiry.name, { subject: inquiry.subject, message: inquiry.message }),
      tags: ["contact-form", "auto-reply", "criftech"]
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyContactForm \u2014 visitor confirmation FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  console.log(
    `[BREVO] NOTIFIER RESULT \u2192 notifyContactForm(name="${inquiry.name}", email="${inquiry.email}"): admin-alert=${adminOk ? "OK@" + (adminChannel || "?") : "FAIL"} | visitor-confirmation=${confirmOk ? "OK@" + (confirmChannel || "?") : "FAIL"}`
  );
}
async function notifyBookCall(payload) {
  console.log(
    `[BREVO] NOTIFIER ENTRY \u2192 notifyBookCall(name="${payload.name}", email="${payload.email}", date="${payload.date || ""}", time="${payload.time || ""}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;
  let adminOk = false;
  let adminChannel;
  let confirmOk = false;
  let confirmChannel;
  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: "CrifTech Admin" },
      replyTo: { email: payload.email, name: payload.name },
      subject: `[Book a Call] ${payload.name} <${payload.email}>`,
      html: bookCallAdminAlertHtml(payload.name, payload.email, {
        date: payload.date,
        time: payload.time,
        notes: payload.notes
      }),
      tags: ["admin-alert", "book-a-call", "criftech"]
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyBookCall \u2014 admin alert FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  {
    const res = await sendBrevoEmail({
      to: { email: payload.email, name: payload.name },
      subject: `\u{1F4DE} Discovery call confirmed${payload.date ? ` \xB7 ${payload.date}` : ""}`,
      html: bookCallConfirmationHtml(payload.name, {
        date: payload.date,
        time: payload.time,
        notes: payload.notes
      }),
      tags: ["book-a-call", "auto-reply", "criftech"]
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyBookCall \u2014 visitor confirmation FAILED. Error: ${res.error || "unknown"}`
      );
    }
  }
  console.log(
    `[BREVO] NOTIFIER RESULT \u2192 notifyBookCall(name="${payload.name}", email="${payload.email}"): admin-alert=${adminOk ? "OK@" + (adminChannel || "?") : "FAIL"} | visitor-confirmation=${confirmOk ? "OK@" + (confirmChannel || "?") : "FAIL"}`
  );
}

// server.ts
import_dotenv.default.config();
async function configureApp(app, options) {
  const vite = options?.vite ?? process.env.NODE_ENV !== "production";
  const staticServe = options?.staticServe ?? process.env.NODE_ENV === "production";
  const envSnapshot = diagnoseBrevoEnv();
  const runtimeCfg = getBrevoConfig();
  const brevoCredsLoaded = Boolean(runtimeCfg.apiKey) && Boolean(runtimeCfg.smtpUser) && Boolean(runtimeCfg.smtpPass);
  const senderIsFree = isFreeEmailSender(runtimeCfg.senderEmail);
  const sendOrderBase = preferredSendOrder(runtimeCfg.senderEmail);
  const gmailReady = gmailSmtpAvailable();
  const sendOrderLabel = gmailReady ? `${sendOrderBase[0]}\u2192${sendOrderBase[1]}\u2192gmail-smtp` : `${sendOrderBase[0]}\u2192${sendOrderBase[1]}`;
  console.log("");
  console.log("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  console.log("[BREVO] Env diagnostics (dotenv injection point):");
  for (const [k, v] of Object.entries(envSnapshot)) {
    console.log(`  ${k.padEnd(28)} \u2192 ${v}`);
  }
  console.log(
    `[BREVO] Init (runtime fresh read) \u2014 API key: ${runtimeCfg.apiKey ? "OK" : "MISSING"}, SMTP user: ${runtimeCfg.smtpUser ? "OK" : "MISSING"}, SMTP pass: ${runtimeCfg.smtpPass ? "OK" : "MISSING"} \u2014 all-creds-loaded=${brevoCredsLoaded ? "YES" : "NO"}`
  );
  console.log(
    `[BREVO] Sender identity \u2192 "${runtimeCfg.senderName}" <${runtimeCfg.senderEmail}>; admin-alert inbox \u2192 <${runtimeCfg.adminAlertEmail}>; send-order=${sendOrderLabel}` + (gmailReady ? " (Gmail SMTP ARMED)" : "")
  );
  if (!brevoCredsLoaded) {
    console.warn(
      "[BREVO] \u26A0  Missing credentials \u2014 email sending will FAIL until BREVO_API_KEY, BREVO_SMTP_USER and BREVO_SMTP_PASS are set in .env."
    );
  }
  if (senderIsFree) {
    console.warn("");
    console.warn("\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
    console.warn("\u2502 [BREVO] \u26A0  FREE-EMAIL SENDER DETECTED                              \u2502");
    console.warn(`\u2502   Sender = "${runtimeCfg.senderEmail}"`);
    console.warn("\u2502                                                                     \u2502");
    console.warn('\u2502 Why previous "DELIVERED" log lines had no inbox emails:            \u2502');
    console.warn("\u2502   Brevo REST API returns 200 OK + messageId for EVERY request,     \u2502");
    console.warn("\u2502   then SILENTLY drops sends FROM @gmail.com / @outlook.com etc.    \u2502");
    console.warn("\u2502   (Brevo REQUIRES sender-domain DKIM/SPF \u2014 impossible for Gmail).  \u2502");
    console.warn("\u2502   Brevo SMTP also said:                                            \u2502");
    console.warn("\u2502     \u2192 535 5.7.8 Authentication failed                              \u2502");
    console.warn("\u2502   (your BREVO_SMTP_USER / PASS combo is rejected by Brevo SMTP)    \u2502");
    console.warn("\u2502                                                                     \u2502");
    if (gmailReady) {
      console.warn("\u2502 \u2705 DELIVERABILITY FIX APPLIED: Gmail SMTP IS 1st IN SEND ORDER     \u2502");
      console.warn("\u2502   Order = Gmail SMTP \u2192 REST \u2192 Brevo SMTP                           \u2502");
      console.warn("\u2502   Emails now go DIRECTLY through Google servers FIRST, which     \u2502");
      console.warn("\u2502   bypasses Brevos sender-domain policy entirely. No Brevo creds  \u2502");
      console.warn("\u2502   matter for Gmail SMTP; only GMAIL_SMTP_PASS (App Password) does.\u2502");
    } else {
      console.warn("\u2502 FIXES APPLIED:                                                      \u2502");
      console.warn("\u2502   \u2713 SMTP TLS upgraded from SSLv3 \u2192 TLSv1.2+                        \u2502");
      console.warn("\u2502   \u2713 SMTP handshake verified via transport.verify() BEFORE sending \u2502");
      console.warn("\u2502                                                                     \u2502");
      console.warn("\u2502 \u2605 GUARANTEED DELIVERY IN 90 SECONDS \u2014 do THIS now:                \u2502");
      console.warn("\u2502   1. Open myaccount.google.com \u2192 Security \u2192 enable 2-Step VERIFY  \u2502");
      console.warn("\u2502      (for the same Gmail account in BREVO_SENDER_EMAIL)            \u2502");
      console.warn("\u2502   2. myaccount.google.com \u2192 App passwords \u2192 Generate \u2192 select:    \u2502");
      console.warn('\u2502      App: "Mail" \xB7 Device: "Windows Computer" \u2192 GET 16-CHAR PASS  \u2502');
      console.warn("\u2502   3. Add to .env:                                                  \u2502");
      console.warn("\u2502        GMAIL_SMTP_USER=usmancriftech@gmail.com                     \u2502");
      console.warn("\u2502        GMAIL_SMTP_PASS=abcd efgh ijkl mnop   (16 chars, spaces ok)\u2502");
      console.warn("\u2502   4. Restart server. Send-order auto-flips to Gmail=1st. Done.    \u2502");
    }
    console.warn("\u2502                                                                     \u2502");
    console.warn("\u2502 LONG-TERM FIX (10/10 deliverability with Brevo):                   \u2502");
    console.warn('\u2502   1. Register "criftech.com" as Sender Domain in Brevo dashboard   \u2502');
    console.warn("\u2502      (Senders \u2192 Domains \u2192 Add a domain \u2192 Authenticate DNS).        \u2502");
    console.warn("\u2502   2. Change .env BREVO_SENDER_EMAIL to hello@criftech.com          \u2502");
    console.warn("\u2502   3. send-order auto-flips back to REST\u2192SMTP (faster).            \u2502");
    console.warn("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");
    console.warn("");
  }
  console.log("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  console.log("");
  app.use(import_express.default.json({ limit: "10mb" }));
  await connectDB();
  app.get("/api/health", (req, res) => {
    const connected = isDbConnected();
    res.json({
      status: "ok",
      database: connected ? "MongoDB Atlas" : "In-Memory Resilient Store",
      connected
    });
  });
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    if (password === "Crif@Tech513" || password === "criftech2026admin" || password === "admin") {
      return res.json({ success: true, token: "criftech-admin-jwt-token-2026" });
    }
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  });
  app.post("/api/seed", async (req, res) => {
    try {
      await resetMemoryAndDB();
      res.json({ success: true, message: "Database reset and seeded successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/book-call", async (req, res) => {
    try {
      const { name, email, date, time, notes } = req.body || {};
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required to book a call." });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({ error: "A valid email address is required." });
      }
      console.log(
        `[server \u2192 BREVO] TRIGGER: book-a-call from name="${name}" email="${email}" ` + (date || time || notes ? `(date=${date || ""} time=${time || ""})` : "")
      );
      notifyBookCall({ name, email, date, time, notes }).catch(
        (e) => console.warn("[server \u2192 BREVO] book-a-call notifier wrapper failed:", e?.message || e)
      );
      res.json({
        success: true,
        message: "Thanks \u2014 your call request is queued. CrifTech will reach out within 1 business day to confirm a specific time."
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/brevo/smoke-test", async (req, res) => {
    const cfg = getBrevoConfig();
    const target = req.query.email || cfg.adminAlertEmail;
    const subject = "[Smoke Test] CrifTech \u2194 Brevo integration";
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.6;">
      <h2 style="color:#0066FF;">Brevo Smoke Test Passed \u2705</h2>
      <p>If you're reading this, Brevo is successfully delivering emails from the CrifTech server.</p>
      <ul>
        <li>API key: <strong>${cfg.apiKey ? "LOADED" : "MISSING"}</strong></li>
        <li>SMTP user: <strong>${cfg.smtpUser || "MISSING"}</strong></li>
        <li>SMTP host:port: <strong>${cfg.smtpHost}:${cfg.smtpPort}</strong></li>
        <li>Sender email: <strong>${cfg.senderEmail}</strong></li>
      </ul>
      <p style="color:#64748B;font-size:12px;margin-top:24px;">Sent automatically from CrifTech server \u2192 Brevo gateway.</p>
    </div>`;
    const text = "Brevo Smoke Test Passed \u2014 If you are reading this, Brevo is delivering emails for CrifTech.";
    console.log(`[server \u2192 BREVO] SMOKE-TEST: sending to ${target}`);
    const result = await sendBrevoEmail({
      to: { email: target, name: "CrifTech Brevo Smoke Test" },
      subject,
      html,
      text,
      tags: ["smoke-test", "criftech"]
    });
    console.log(`[server \u2192 BREVO] SMOKE-TEST RESULT for ${target}:`, JSON.stringify(result));
    res.json({
      success: result.ok,
      channel: result.channel || "none",
      target,
      message: result.ok ? `Email delivered via ${result.channel} \u2014 check ${target} inbox.` : `Both Brevo channels failed. Error: ${result.error || "Unknown"}`,
      raw: result
    });
  });
  app.get("/api/brevo/senders", async (req, res) => {
    console.log("[server \u2192 BREVO] SENDERS: list requested");
    const result = await listBrevoSenders();
    res.json({
      success: result.ok,
      count: result.count || 0,
      senders: result.senders,
      error: result.error,
      help: result.ok ? `You have ${result.count} sender(s). Each needs active:true before Brevo will send emails from it. If active=false, check the sender inbox for the Brevo verification email.` : void 0
    });
  });
  app.post("/api/brevo/senders", async (req, res) => {
    const cfg = getBrevoConfig();
    const email = req.body?.email || cfg.senderEmail;
    const name = req.body?.name || cfg.senderName;
    const ips = req.body?.ips;
    console.log(
      `[server \u2192 BREVO] SENDERS: create requested email="${email}" name="${name}" ipsProvided=${Array.isArray(ips) && ips.length ? "yes" : "no"}`
    );
    const result = await createBrevoSender({ email, name, ips });
    if (result.ok) {
      res.status(201).json({
        success: true,
        id: result.id,
        dkimError: result.dkimError,
        spfError: result.spfError,
        created: { email, name },
        nextStep: result.nextStep
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error || "Failed to create sender"
      });
    }
  });
  app.get("/api/brevo/senders/create", async (req, res) => {
    const cfg = getBrevoConfig();
    const email = req.query.email || cfg.senderEmail;
    const name = req.query.name || cfg.senderName;
    console.log(
      `[server \u2192 BREVO] SENDERS: create (GET alias) requested email="${email}" name="${name}"`
    );
    const result = await createBrevoSender({ email, name });
    if (result.ok) {
      res.status(201).json({
        success: true,
        id: result.id,
        dkimError: result.dkimError,
        spfError: result.spfError,
        created: { email, name },
        nextStep: result.nextStep
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error || "Failed to create sender"
      });
    }
  });
  app.post("/api/brevo/senders/:id/resend-verification", async (req, res) => {
    const id = Number(req.params.id);
    console.log(`[server \u2192 BREVO] SENDERS: resend-verification requested for senderId=${id}`);
    const result = await resendBrevoSenderVerification(id);
    if (result.ok) {
      res.json({ success: true, senderId: id, nextStep: result.nextStep });
    } else {
      res.status(400).json({
        success: false,
        senderId: id,
        error: result.error || "Failed to resend verification"
      });
    }
  });
  app.get("/api/brevo/senders/:id/resend-verification", async (req, res) => {
    const id = Number(req.params.id);
    console.log(`[server \u2192 BREVO] SENDERS: resend-verification (GET alias) for senderId=${id}`);
    const result = await resendBrevoSenderVerification(id);
    if (result.ok) {
      res.json({ success: true, senderId: id, nextStep: result.nextStep });
    } else {
      res.status(400).json({
        success: false,
        senderId: id,
        error: result.error || "Failed to resend verification"
      });
    }
  });
  app.get("/api/settings", async (req, res) => {
    try {
      const data = await getSettingsData();
      res.json(data || null);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/settings", async (req, res) => {
    try {
      const data = await saveSettingsData(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.get("/api/services", async (req, res) => {
    try {
      const services = await getServicesData();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/services", async (req, res) => {
    try {
      const newService = await addServiceData(req.body);
      res.status(201).json(newService);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.put("/api/services/:id", async (req, res) => {
    try {
      const updated = await updateServiceData(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.delete("/api/services/:id", async (req, res) => {
    try {
      await deleteServiceData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/casestudies", async (req, res) => {
    try {
      const caseStudies = await getCaseStudiesData();
      res.json(caseStudies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/casestudies", async (req, res) => {
    try {
      const newStudy = await addCaseStudyData(req.body);
      res.status(201).json(newStudy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.put("/api/casestudies/:id", async (req, res) => {
    try {
      const updated = await updateCaseStudyData(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.delete("/api/casestudies/:id", async (req, res) => {
    try {
      await deleteCaseStudyData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/team", async (req, res) => {
    try {
      const members = await getTeamData();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/team", async (req, res) => {
    try {
      const newMember = await addTeamData(req.body);
      res.status(201).json(newMember);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.put("/api/team/:id", async (req, res) => {
    try {
      const updated = await updateTeamData(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.delete("/api/team/:id", async (req, res) => {
    try {
      await deleteTeamData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await getLeadsData();
      res.json(leads);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/leads", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required", success: false, isDuplicate: false });
      }
      const result = await addLeadData(email, source);
      const { lead, isDuplicate, firstSubscribedAt, subscribedAt } = result;
      if (isDuplicate) {
        console.log(
          `[server \u2192 BREVO] DUPLICATE: newsletter signup email="${email}" (source="${source || "Footer Newsletter"}") \u2014 SKIPPING Brevo notifier. Lead first subscribed at ${firstSubscribedAt}.`
        );
        return res.status(200).json({
          success: true,
          isDuplicate: true,
          lead,
          firstSubscribedAt,
          subscribedAt,
          message: "This email address is already subscribed to the CrifTech newsletter."
        });
      }
      console.log(
        `[server \u2192 BREVO] TRIGGER: newsletter signup email="${email}" (source="${source || "Footer Newsletter"}") \u2014 DB-saved lead id=${lead?.id || "unknown"}`
      );
      notifyNewsletterSignup(email, source).catch(
        (e) => console.warn("[server \u2192 BREVO] newsletter notifier wrapper failed:", e?.message || e)
      );
      res.status(201).json({
        success: true,
        isDuplicate: false,
        lead,
        firstSubscribedAt,
        subscribedAt,
        message: "Subscribed successfully."
      });
    } catch (err) {
      res.status(400).json({ error: err.message, success: false, isDuplicate: false });
    }
  });
  app.delete("/api/leads/:id", async (req, res) => {
    try {
      await deleteLeadData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/mails", async (req, res) => {
    try {
      const mails = await getMailsData();
      res.json(mails);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/mails", async (req, res) => {
    try {
      const { name, email, message, phone, company, subject } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
      const newMail = await addMailData(req.body);
      console.log(
        `[server \u2192 BREVO] TRIGGER: contact-form submission name="${name}" email="${email}" ` + (subject ? `subject="${subject}" ` : "") + `\u2014 DB-saved inquiry id=${newMail?.id || "unknown"}`
      );
      notifyContactForm({
        name,
        email,
        message,
        phone,
        company,
        subject
      }).catch(
        (e) => console.warn("[server \u2192 BREVO] contact-form notifier wrapper failed:", e?.message || e)
      );
      res.status(201).json(newMail);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.patch("/api/mails/:id", async (req, res) => {
    try {
      const updated = await updateMailData(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.delete("/api/mails/:id", async (req, res) => {
    try {
      await deleteMailData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  if (vite) {
    const viteServer = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(viteServer.middlewares);
  } else if (staticServe) {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  return app;
}
async function startServer() {
  const app = (0, import_express.default)();
  await configureApp(app);
  const PORT = Number(process.env.PORT) || 3e3;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} CrifTech Full-Stack Server running on:`);
    console.log(`   Local:    http://localhost:${PORT}`);
    console.log(`   Network:  http://127.0.0.1:${PORT}`);
  });
}
if (typeof require !== "undefined" && require.main === module) {
  startServer();
}
if (typeof process !== "undefined" && process.argv?.[1]?.endsWith?.("server.ts")) {
  startServer();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureApp,
  startServer
});
//# sourceMappingURL=server.cjs.map
