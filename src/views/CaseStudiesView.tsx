import React from 'react';
import { motion } from 'motion/react';
import { CaseStudiesCarousel } from '../components/CaseStudiesCarousel';
import { CtaBanner } from '../components/CtaBanner';
import { PageRoute, CaseStudy } from '../types';
import { Trophy } from 'lucide-react';

interface CaseStudiesViewProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: () => void;
  onSelectCaseStudy?: (study: CaseStudy) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({
  onNavigate,
  onBookCallClick,
  onSelectCaseStudy
}) => {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-16">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
          <Trophy className="w-3.5 h-3.5" />
          <span>Engineering Impact</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
          Client Success & <span className="gradient-text-electric">Case Studies</span>
        </h1>
        <p className="text-base text-[#4B5563]">
          In-depth technical breakdowns of how we helped high-growth startups and global enterprises engineer competitive advantages.
        </p>
      </motion.section>

      <CaseStudiesCarousel onSelectCaseStudy={onSelectCaseStudy} />

      <CtaBanner
        onBookCallClick={() => onNavigate('contact')}
        buttonText="Contact Us"
      />
    </div>
  );
};
