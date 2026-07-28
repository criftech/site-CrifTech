import React from 'react';
import { motion } from 'motion/react';
import { TechBackgroundCanvas } from '../components/TechBackgroundCanvas';
import { HeroTextSlider } from '../components/HeroTextSlider';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { BentoGrid } from '../components/BentoGrid';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { CaseStudiesCarousel } from '../components/CaseStudiesCarousel';
import { TestimonialsSlider } from '../components/TestimonialsSlider';
import { CtaBanner } from '../components/CtaBanner';
import { FaqAccordion } from '../components/FaqAccordion';
import { GLOBAL_FAQS } from '../data/contentData';
import { PageRoute, CaseStudy } from '../types';

interface HomeViewProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: (prefilledSpec?: string) => void;
  onSelectCaseStudy?: (study: CaseStudy) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onBookCallClick,
  onSelectCaseStudy
}) => {
  return (
    <div className="space-y-0 bg-[#FAFBFD] text-slate-900">
      
      {/* 1. HIGH-TECH DARK HERO SECTION WITH 3D VISUALS & LOGO VIDEO ANIMATOR */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-24 md:pb-14 overflow-hidden bg-slate-950 text-white border-b border-slate-800"
      >
        {/* Tech Grid Canvas Overlay */}
        <TechBackgroundCanvas opacity={0.5} />

        {/* Ambient Radial Electric Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#0066FF]/15 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[480px] h-[480px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HeroTextSlider
            onNavigate={onNavigate}
            onBookCallClick={onBookCallClick}
          />
        </div>
      </motion.section>

      {/* 2. SLOW MARQUEE TICKER WITH LOGOS & TECH STACK (OUTSIDE HERO) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <MarqueeTicker />
      </motion.div>

      {/* 3. SERVICES BENTO GRID */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <BentoGrid
          type="services"
          onServiceSelect={(slug) => onNavigate('service-detail', slug)}
          onExploreClick={() => onNavigate('services')}
        />
      </motion.div>

      {/* 4. PROCESS TIMELINE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProcessTimeline />
      </motion.div>

      {/* 5. CASE STUDIES CAROUSEL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <CaseStudiesCarousel onSelectCaseStudy={onSelectCaseStudy} />
      </motion.div>

      {/* 6. WHY CHOOSE US BENTO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <BentoGrid
          type="why-choose-us"
          onNavigate={(route) => onNavigate(route as any)}
        />
      </motion.div>

      {/* 7. TESTIMONIALS SLIDER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <TestimonialsSlider />
      </motion.div>

      {/* 8. FAQ ACCORDION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <FaqAccordion items={GLOBAL_FAQS} />
      </motion.div>

      {/* 9. CTA BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <CtaBanner onBookCallClick={() => onBookCallClick()} />
      </motion.div>

    </div>
  );
};

