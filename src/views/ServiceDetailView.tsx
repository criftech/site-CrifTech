import React from 'react';
import { useSiteData } from '../context/SiteContext';
import { PageRoute } from '../types';
import { CtaBanner } from '../components/CtaBanner';
import { FaqAccordion } from '../components/FaqAccordion';
import { NotFoundView } from './NotFoundView';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Layers, 
  Code2, 
  Building2 
} from 'lucide-react';

interface ServiceDetailViewProps {
  slug: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: (prefilledSpec?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  slug,
  onNavigate,
  onBookCallClick
}) => {
  const { services } = useSiteData();
  const service = services.find(s => s.slug === slug);
  if (!service) {
    return (
      <NotFoundView
        onNavigate={onNavigate}
        title="404 — Service not found"
        message="This service page doesn’t exist. Please check the URL or go back to all services."
      />
    );
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-20">
      
      {/* 1. HERO SECTION FOR SERVICE */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#0066FF] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-extrabold uppercase tracking-wider border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category} Service</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-lg text-[#4B5563] leading-relaxed font-normal max-w-3xl">
              {service.fullDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onBookCallClick(`Interested in ${service.title}`)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 electric-glow"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Get Service Proposal & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold text-sm transition-all text-center"
              >
                Request Free Consultation
              </button>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-50 border border-[#E5E7EB] shadow-xl chrome-border space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              Service Guarantees
            </div>

            <div className="space-y-3 text-xs font-bold text-gray-800">
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>High Security & Data Protection</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0066FF]" />
                <span>Fast Speeds & Mobile Optimization</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                <span>100% Full Code Ownership</span>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 2. PROBLEM STATEMENT */}
      <section className="bg-slate-50/80 py-16 border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Challenges We Solve</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0A0A0A]">
              {service.problemStatement.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.problemStatement.points.map((point, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-red-100 shadow-sm flex items-start gap-4"
              >
                <div className="p-2 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-gray-700 leading-relaxed">
                  {point}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. OUR PROCESS FOR THIS SERVICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Execution Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A0A0A]">
            Our Engineering Process for {service.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl transition-all space-y-4 chrome-border flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black text-[#0066FF] font-heading mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-lg font-bold font-heading text-[#0A0A0A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-1.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Deliverables:</div>
                {step.deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="text-[11px] font-semibold text-gray-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECH STACK GRID */}
      <section className="bg-slate-50 py-16 border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Engineered With Best-In-Class Tools</span>
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-[#0A0A0A]">
              Technology Stack & Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.techStack.map((group, gIdx) => (
              <div key={gIdx} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-sm text-[#0A0A0A] pb-2 border-b border-gray-100">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-3 py-1.5 rounded-xl bg-blue-50/80 text-[#0066FF] text-xs font-semibold border border-blue-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELEVANT CASE STUDY HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{service.caseStudyHighlight.client} Case Study</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {service.caseStudyHighlight.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {service.caseStudyHighlight.summary}
            </p>

            <div className="inline-block p-4 rounded-2xl bg-blue-500/10 border border-blue-400/30 text-blue-300 font-bold text-sm">
              Verified Metric: {service.caseStudyHighlight.metrics}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING & ENGAGEMENT TIERS */}
      <section className="bg-slate-50 py-20 border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A0A0A]">
              Engagement Tiers for {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {service.pricingTiers.map((tier, tIdx) => (
              <div
                key={tIdx}
                className={`p-8 rounded-3xl bg-white border shadow-md flex flex-col justify-between relative ${
                  tier.recommended
                    ? 'border-[#0066FF] shadow-2xl ring-2 ring-[#0066FF]/20'
                    : 'border-[#E5E7EB]'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0066FF] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#0A0A0A]">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-3xl font-extrabold font-heading text-[#0066FF]">
                      {tier.price}
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      Timeline: {tier.timeline}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <div className="text-[10px] font-bold uppercase text-gray-400">Included Features:</div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-gray-800 flex items-start gap-2 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onBookCallClick(`Tier: ${tier.name} for ${service.title}`)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm ${
                      tier.recommended
                        ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white electric-glow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-gray-900'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SERVICE SPECIFIC FAQS */}
      <FaqAccordion
        items={service.faqs}
        title={`Frequently Asked Questions: ${service.title}`}
        subtitle="Common questions regarding architecture, security, and IP ownership."
      />

      {/* 8. CTA BANNER */}
      <CtaBanner
        onBookCallClick={() => onBookCallClick(`Interested in ${service.title}`)}
        headline={`Ready to Implement ${service.title}?`}
      />

    </div>
  );
};
