import React from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../types';
import { CtaBanner } from '../components/CtaBanner';
import { useSiteData } from '../context/SiteContext';
import { Briefcase, ArrowRight, MapPin } from 'lucide-react';

interface CareersViewProps {
  onNavigate: (route: PageRoute) => void;
  onBookCallClick: () => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate, onBookCallClick }) => {
  const { settings } = useSiteData();

  const openRoles = settings.jobOpenings && settings.jobOpenings.length > 0 
    ? settings.jobOpenings 
    : [
      {
        id: 'job-1',
        title: 'Staff AI / ML Systems Engineer',
        department: 'AI & Data Engineering',
        location: 'Remote / San Francisco',
        type: 'Full-Time',
        description: 'Architect custom LLM pipelines, RAG systems, and neural network integrations.',
        requirements: ['PyTorch / CUDA', 'LangGraph & Multi-Agent Frameworks', 'Pinecone / Qdrant RAG Pipelines']
      },
      {
        id: 'job-2',
        title: 'Senior Principal Frontend Architect',
        department: 'Core Web Platform',
        location: 'Remote / London',
        type: 'Full-Time',
        description: 'Build fast React 19 web applications and high-throughput SaaS dashboards.',
        requirements: ['React 19 & Next.js 14 Expert', 'TypeScript & Vite Tooling', 'Sub-1s Core Web Vitals Optimization']
      }
    ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-16">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Careers at {settings.brandName}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
          {settings.careersHeaderTitle || 'Join the Top 1% Engineering Pod'}
        </h1>
        <p className="text-base text-[#4B5563]">
          {settings.careersHeaderDesc || 'We work on high-stakes enterprise software and generative AI systems with zero bureaucratic fluff.'}
        </p>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold font-heading text-[#0A0A0A]">
          Open Senior Positions
        </h2>

        <div className="space-y-4">
          {openRoles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-[#E5E7EB] hover:border-[#0066FF] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 chrome-border"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#0066FF]">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100/80">{role.department}</span>
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {role.location}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    {role.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-[#0A0A0A]">
                  {role.title}
                </h3>

                <p className="text-xs text-slate-600">{role.description}</p>

                {role.requirements && role.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {role.requirements.map((req, rIdx) => (
                      <span key={rIdx} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700">
                        {req}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={`mailto:${settings.contactEmail || 'criftech@gmail.com'}?subject=Application:%20${encodeURIComponent(role.title)}`}
                className="px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-md transition-all shrink-0 inline-flex items-center justify-center gap-2"
              >
                <span>Apply Direct (Send CV)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBanner onBookCallClick={onBookCallClick} />
    </div>
  );
};
