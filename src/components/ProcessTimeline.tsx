import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Layers, 
  Code2, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discovery & Architecture Blueprint',
      subtitle: 'Mapping business goals to tech stack & API contracts',
      icon: <Search className="w-5 h-5" />,
      deliverables: [
        'Figma Design System Token Library',
        'OpenAPI / Data Schema Specification',
        'Tech Stack & Security Risk Assessment'
      ],
      description: 'We audit your existing legacy systems, define exact component requirements, and map out scalable database and API architectures.'
    },
    {
      number: '02',
      title: 'UX Design & Tokenization',
      subtitle: 'Apple-level spatial layouts & micro-interactions',
      icon: <Layers className="w-5 h-5" />,
      deliverables: [
        'High-Fidelity Figma Clickable Prototypes',
        'Light-Theme Color & Typography System',
        'Accessibility (WCAG 2.1 AA) Compliance'
      ],
      description: 'Our design team creates responsive, intuitive user interfaces that emphasize negative space and effortless navigation.'
    },
    {
      number: '03',
      title: 'AI & Full-Stack Development',
      subtitle: 'Clean TypeScript, React 19 & fine-tuned LLM agents',
      icon: <Code2 className="w-5 h-5" />,
      deliverables: [
        'Modular Clean TypeScript Codebase',
        'Gemini / OpenAI RAG Vector Integration',
        'Automated Unit & E2E Test Coverage'
      ],
      description: 'Senior engineers build your application using modern frameworks, edge functions, and vectorized generative AI pipelines.'
    },
    {
      number: '04',
      title: 'Automated QA & Cloud Deployment',
      subtitle: 'Sub-second edge caching & zero-downtime releases',
      icon: <Rocket className="w-5 h-5" />,
      deliverables: [
        'Lighthouse 95+ Core Web Vitals Audit',
        'Cloudflare WAF & SOC2 Security Policy',
        'GitHub Actions / ArgoCD Automated Pipeline'
      ],
      description: 'Rigorous penetration testing, load testing with 50k concurrent virtual users, and multi-region cloud deployment.'
    },
    {
      number: '05',
      title: 'Scale & 24/7 SLA SLA Monitoring',
      subtitle: 'Continuous FinOps optimization & feature iteration',
      icon: <TrendingUp className="w-5 h-5" />,
      deliverables: [
        '24/7 PagerDuty & Slack Emergency Channel',
        'Proactive FinOps Cloud Cost Auditing',
        'Bi-weekly Sprint Feature Enhancements'
      ],
      description: 'Post-launch, our dedicated SLA team monitors application health, optimizes cloud costs, and rolls out continuous updates.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            <span>Engineering Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
            Our 5-Step <span className="gradient-text-electric">Execution Methodology</span>
          </h2>
          <p className="text-base text-[#4B5563]">
            From initial discovery to continuous cloud scaling — transparent, predictable, and exceptionally fast.
          </p>
        </div>

        {/* Timeline Navigation Tabs for Mobile & Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Step Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.button
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isActive
                      ? 'bg-white border-[#0066FF] shadow-lg text-[#0066FF]'
                      : 'bg-white/60 border-gray-200/80 hover:bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isActive ? 'bg-[#0066FF] text-white shadow-md' : 'bg-slate-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-[#0066FF]'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider uppercase text-gray-400">
                        Step {step.number}
                      </div>
                      <div className="text-base font-bold font-heading text-[#0A0A0A] group-hover:text-[#0066FF] transition-colors">
                        {step.title.split('&')[0]}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#0066FF]' : 'text-gray-300'}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right Detailed Active Step Showcase Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl relative overflow-hidden chrome-border"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10"></div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold font-heading text-[#0066FF]">
                  Step {steps[activeStep].number}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-bold">
                  Phase Execution
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0A0A0A] mb-2">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm font-semibold text-[#0066FF] mb-4">
                {steps[activeStep].subtitle}
              </p>

              <p className="text-sm text-[#4B5563] leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
                  Key Phase Deliverables:
                </h4>
                <div className="space-y-3">
                  {steps[activeStep].deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 text-xs font-semibold text-gray-800">
                      <div className="p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
