import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  Shield,
  Zap,
  Globe,
  Bot,
  Smartphone,
  Server,
  ChevronLeft,
  ChevronRight,
  Code2
} from 'lucide-react';
import { PageRoute } from '../types';

import { useSiteData } from '../context/SiteContext';

interface HeroSlide {
  id: string;
  pillBadge: string;
  pillIcon: React.ReactNode;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  bodyText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryRoute: PageRoute;
  statBadge: string;
  guarantees: string[];
  gradientClass: string;
  accentGlow: string;
}

interface HeroTextSliderProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: (prefilledSpec?: string) => void;
}

export const HeroTextSlider: React.FC<HeroTextSliderProps> = ({
  onNavigate,
  onBookCallClick
}) => {
  const { settings } = useSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: 'core-overview',
      pillBadge: settings.heroBadge || 'Custom Web Apps, Mobile Apps & AI Solutions',
      pillIcon: <Sparkles className="w-4 h-4 text-[#0066FF]" />,
      headlinePrefix: '',
      headlineHighlight: settings.heroHeadline || 'Engineering Modern Digital Products & AI Systems',
      headlineSuffix: '',
      bodyText: settings.heroSubheadline || 'CrifTech builds fast web applications, mobile apps, custom AI tools, and reliable cloud software.',
      primaryCtaText: settings.primaryCtaText || 'Schedule Strategy Call',
      secondaryCtaText: settings.secondaryCtaText || 'View Our Work',
      secondaryRoute: 'case-studies',
      statBadge: 'Full Code Ownership',
      guarantees: ['100% Code Ownership', 'Fast Load Speeds', 'Secure & Reliable'],
      gradientClass: 'from-[#0066FF] via-[#0088FF] to-cyan-500',
      accentGlow: 'bg-[#0066FF]/12'
    },
    {
      id: 'web-saas',
      pillBadge: 'React 19 & High-Performance Web Engineering',
      pillIcon: <Globe className="w-4 h-4 text-[#0066FF]" />,
      headlinePrefix: 'Architecting ',
      headlineHighlight: 'Sub-Second Web & SaaS',
      headlineSuffix: ' Platforms.',
      bodyText: 'Modern React 19 frontend architectures coupled with scalable Node.js microservices. Engineered for high search visibility, extreme load speeds, and maximum user conversion.',
      primaryCtaText: 'Schedule Strategy Call',
      secondaryCtaText: 'Explore Web Services',
      secondaryRoute: 'services',
      statBadge: 'Sub-Second Global Speeds',
      guarantees: ['Vite + React 19 Stack', 'SEO & Accessibility', 'Full IP Rights'],
      gradientClass: 'from-[#0066FF] via-cyan-500 to-[#0088FF]',
      accentGlow: 'bg-cyan-500/12'
    },
    {
      id: 'ai-solutions',
      pillBadge: 'Google Gemini 2.5 & Autonomous AI Workflows',
      pillIcon: <Bot className="w-4 h-4 text-[#0066FF]" />,
      headlinePrefix: 'Deploying ',
      headlineHighlight: 'Custom AI Agents',
      headlineSuffix: ' For Operational Growth.',
      bodyText: 'Automate complex business processes, intelligent document extraction, and customer support with isolated, zero-data-leakage RAG pipelines.',
      primaryCtaText: 'Schedule Strategy Call',
      secondaryCtaText: 'See AI Capabilities',
      secondaryRoute: 'services',
      statBadge: 'Sub-Second RAG Queries',
      guarantees: ['Tenant Data Privacy', 'Multimodal Gemini 2.5', 'Automated Agents'],
      gradientClass: 'from-[#0066FF] via-blue-600 to-indigo-500',
      accentGlow: 'bg-blue-600/12'
    },
    {
      id: 'mobile-native',
      pillBadge: 'iOS & Android Cross-Platform Native Apps',
      pillIcon: <Smartphone className="w-4 h-4 text-[#0066FF]" />,
      headlinePrefix: 'Creating ',
      headlineHighlight: 'Fluid Native Mobile',
      headlineSuffix: ' Experiences.',
      bodyText: 'Smooth 60 FPS touch graphics, offline-first local data storage, biometric security, and turnkey publishing to Apple App Store and Google Play.',
      primaryCtaText: 'Schedule Strategy Call',
      secondaryCtaText: 'View Case Studies',
      secondaryRoute: 'case-studies',
      statBadge: '60 FPS Native Graphics',
      guarantees: ['Apple & Google Approved', 'Offline-First Storage', 'Biometric Auth'],
      gradientClass: 'from-[#0066FF] via-teal-500 to-cyan-500',
      accentGlow: 'bg-teal-500/12'
    }
  ];

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Glow Aura matched to current slide */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] ${currentSlide.accentGlow} rounded-full blur-[130px] pointer-events-none transition-all duration-700`}></div>

      {/* Main Slide Carousel Header Controls (Tabs) */}
      <div className="flex items-center justify-between gap-3 mb-8 overflow-x-auto no-scrollbar pb-1 px-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shrink-0 flex items-center gap-2 border ${
                idx === currentIndex
                  ? 'bg-gradient-to-r from-[#0066FF] to-blue-600 text-white border-blue-400/50 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {s.pillIcon}
              <span className="truncate">{s.id === 'core-overview' ? 'Overview' : s.id === 'web-saas' ? 'Web & SaaS' : s.id === 'ai-solutions' ? 'AI & RAG' : 'Mobile Apps'}</span>
            </button>
          ))}
        </div>

        {/* Carousel Prev/Next Arrows & Counter */}
        <div className="flex items-center gap-2 shrink-0 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 shadow-lg">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-200 px-1">
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content Box with Framer Motion transitions */}
      <div className="relative z-10 min-h-[380px] sm:min-h-[340px] flex flex-col justify-between text-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Top Pill Badge */}
            <div className="flex justify-center px-1">
              <div className="max-w-full inline-flex flex-wrap items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-lg backdrop-blur-md text-center">
                {currentSlide.pillIcon}
                <span className="break-words">{currentSlide.pillBadge}</span>
              </div>
            </div>

            {/* Main Animated Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.18] break-words px-1">
              {currentSlide.headlinePrefix}
              <span className={`bg-gradient-to-r ${currentSlide.gradientClass} bg-clip-text text-transparent`}>
                {currentSlide.headlineHighlight}
              </span>
              {currentSlide.headlineSuffix}
            </h1>

            {/* Body Text */}
            <p className="text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal px-2">
              {currentSlide.bodyText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 px-1">
              <button
                onClick={() => onBookCallClick()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0066FF] to-blue-600 hover:from-[#0052CC] hover:to-blue-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>{currentSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => onNavigate(currentSlide.secondaryRoute)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-800 hover:border-[#0066FF] shadow-lg transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <span>{currentSlide.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-300">
              {currentSlide.guarantees.map((guarantee, gIdx) => (
                <div key={gIdx} className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>{guarantee}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Auto Progress Bar */}
      <div className="mt-8 w-full max-w-xs mx-auto bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <motion.div
          key={`progress-${currentIndex}-${isPaused}`}
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '0%' : '100%' }}
          transition={{ duration: isPaused ? 0 : 5.0, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#0066FF] to-cyan-500 rounded-full"
        />
      </div>

    </div>
  );
};
