import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onBookCallClick: () => void;
  headline?: string;
  subtext?: string;
  buttonText?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onBookCallClick,
  headline = "Ready to Build Your Enterprise Future?",
  subtext = "Schedule a strategy call with our Senior Engineering Team to discuss your roadmap, timelines, and custom architecture.",
  buttonText = "Schedule Strategy Call"
}) => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metallic Chrome & Electric Blue Container */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 p-6 sm:p-12 lg:p-16 shadow-xl overflow-hidden border border-slate-200/90 chrome-border"
        >
          
          {/* Subtle Electric Blue Glow Aura */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-[#0066FF]/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Direct Senior Access</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
              {headline}
            </h2>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {subtext}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onBookCallClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg inline-flex items-center justify-center gap-2.5 transform hover:scale-[1.02] active:scale-[0.98] electric-glow"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="w-full sm:w-auto justify-center flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 px-4 py-2.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NDA Protected Consultation</span>
              </div>
            </div>

            {/* Guarantees Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200/90 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Proposal in &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Senior Engineers Only</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
