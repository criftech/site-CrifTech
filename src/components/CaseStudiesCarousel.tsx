import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { CaseStudy } from '../types';
import { 
  ArrowRight, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Layers 
} from 'lucide-react';

interface CaseStudiesCarouselProps {
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
}

export const CaseStudiesCarousel: React.FC<CaseStudiesCarouselProps> = ({ onSelectCaseStudy }) => {
  const { caseStudies } = useSiteData();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Web' | 'Mobile App' | 'AI & ML' | 'Cloud'>('All');
  const [activeModal, setActiveModal] = useState<CaseStudy | null>(null);

  const categories = ['All', 'Web', 'Mobile App', 'AI & ML', 'Cloud'] as const;

  const filteredStudies = selectedFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === selectedFilter);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Business Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
              Featured Enterprise <span className="gradient-text-electric">Case Studies</span>
            </h2>
            <p className="text-base text-[#4B5563]">
              Real-world software engineering and generative AI deployments that delivered measurable ROI.
            </p>
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === cat
                    ? 'bg-white text-[#0066FF] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (onSelectCaseStudy) {
                  onSelectCaseStudy(study);
                } else {
                  setActiveModal(study);
                }
              }}
              className="group rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-2xl hover:border-[#0066FF] transition-all cursor-pointer overflow-hidden flex flex-col justify-between chrome-border"
            >
              <div>
                {/* Image & Metric Overlay */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={study.featuredImage}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900">
                    <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{study.client}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="text-xs font-semibold text-slate-300">
                      {study.industry} &bull; {study.category}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-[#0A0A0A] group-hover:text-[#0066FF] transition-colors leading-snug">
                    {study.title}
                  </h3>

                  <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                    {study.summary}
                  </p>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-2">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100/80 text-center">
                        <div className="text-lg font-extrabold font-heading text-[#0066FF]">
                          {m.value}{m.suffix}
                        </div>
                        <div className="text-[10px] text-gray-600 font-semibold line-clamp-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-8 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#0066FF]">
                <span>Read Complete Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative p-6 sm:p-8"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold">
                    <span>{activeModal.client}</span>
                    <span>&bull;</span>
                    <span>{activeModal.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0A0A0A]">
                    {activeModal.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-blue-50/80 border border-blue-100">
                  {activeModal.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-black text-[#0066FF] font-heading">
                        {m.value}{m.suffix}
                      </div>
                      <div className="text-xs font-semibold text-gray-700">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm text-[#4B5563]">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">The Challenge:</h4>
                    <p className="bg-slate-50 p-4 rounded-xl border border-gray-200">{activeModal.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">CrifTech Engineering Solution:</h4>
                    <p className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">{activeModal.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Key Business Impact:</h4>
                    <ul className="space-y-2">
                      {activeModal.results.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-2 text-xs font-medium text-gray-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Tech Stack Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModal.techUsed.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#0066FF] text-white font-bold text-xs hover:bg-[#0052CC]"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
