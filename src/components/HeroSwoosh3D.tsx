import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Server, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';

interface SlideItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  badge: string;
  features: string[];
  visualGraphic: React.ReactNode;
}

export const HeroSwoosh3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: SlideItem[] = [
    {
      id: 'web-saas',
      category: 'Web Applications',
      title: 'High-Performance Web & SaaS Platforms',
      subtitle: 'Modern React 19 architecture built for sub-second speeds, smooth animations, and maximum conversion.',
      icon: <Globe className="w-5 h-5 text-sky-400" />,
      accentColor: 'from-[#0066FF] to-sky-500',
      badge: 'React 19 & TypeScript',
      features: [
        'Custom Tailored UX/UI Design',
        'Sub-second Global Page Speeds',
        'Secure API & Database Integration',
        'Full IP & Source Code Ownership'
      ],
      visualGraphic: (
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Full-Stack Architecture
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
              Clean React 19
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-medium">Frontend Stack</div>
              <div className="text-xs font-bold text-white mt-0.5">Vite + React 19 + Tailwind v4</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-medium">Backend & APIs</div>
              <div className="text-xs font-bold text-sky-400 mt-0.5">Node.js / Express Server</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-solutions',
      category: 'AI & Automation',
      title: 'Custom AI Tools & Smart RAG Pipelines',
      subtitle: 'Integrate Gemini 2.5 and custom neural agents directly into your business processes for automated efficiency.',
      icon: <Bot className="w-5 h-5 text-amber-400" />,
      accentColor: 'from-amber-500 to-purple-600',
      badge: 'Google Gemini 2.5',
      features: [
        'Vector RAG Search & Knowledge Base',
        'Automated Customer & Operations Agents',
        'Tenant Data Isolation & Security',
        'Real-time Multimodal Document AI'
      ],
      visualGraphic: (
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Autonomous Neural Agent
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Sub-second RAG
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
            &ldquo;Processing customer knowledge graph with Gemini 2.5 grounded search.&rdquo;
          </div>
        </div>
      )
    },
    {
      id: 'mobile-apps',
      category: 'Mobile Applications',
      title: 'Native Quality iOS & Android Apps',
      subtitle: 'Fluid, cross-platform mobile apps engineered for Apple App Store and Google Play Store deployment.',
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      accentColor: 'from-emerald-500 to-teal-500',
      badge: 'iOS & Android',
      features: [
        'Smooth 60 FPS Native Touch Experience',
        'Offline-First Local Storage Caching',
        'Biometric Auth & Apple/Google Pay',
        'Turnkey Store Deployment & SLA'
      ],
      visualGraphic: (
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Mobile App Engine
            </span>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
              SwiftUI & Kotlin
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-center">
              App Store Certified
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-center">
              Google Play Ready
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cloud-devops',
      category: 'Cloud Engineering',
      title: 'Reliable Cloud Software & DevOps',
      subtitle: 'Scalable cloud architecture engineered on GCP, Docker, and serverless containers with zero lock-in.',
      icon: <Server className="w-5 h-5 text-purple-400" />,
      accentColor: 'from-purple-500 to-indigo-600',
      badge: 'Google Cloud Run',
      features: [
        'Containerized Microservices Architecture',
        'Scale-to-Zero Auto Scaling Infrastructure',
        'Automated CI/CD Pipeline Deployment',
        '100% IP & Source Code Ownership'
      ],
      visualGraphic: (
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              DevOps & Containerization
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              SLA Active
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
            <span>Container Image: Docker GCP Cloud Run</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      )
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

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
      className="relative w-full max-w-xl mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Glow Aura */}
      <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${currentSlide.accentColor} opacity-25 blur-2xl pointer-events-none transition-all duration-700`}></div>

      {/* Main Interactive Slider Card */}
      <div className="relative z-10 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl text-white">
        
        {/* Top Header Bar with Slide Selector Tabs */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  idx === currentIndex
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.category}</span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Slide Body */}
        <div className="p-6 min-h-[300px] flex flex-col justify-between bg-slate-950/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  {currentSlide.category}
                </span>

                <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                  {currentSlide.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Visual Graphic Container */}
              {currentSlide.visualGraphic}

              {/* Feature Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {currentSlide.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Bar */}
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tailored specifically for your business goals</span>
            </span>

            <div className="flex items-center gap-1 text-[#0066FF] font-bold text-xs shrink-0">
              <span>{currentIndex + 1} / {slides.length}</span>
            </div>
          </div>
        </div>

        {/* Animated Progress Timer Line */}
        <div className="w-full bg-slate-950 h-1 overflow-hidden">
          <motion.div
            key={`progress-${currentIndex}-${isPaused}`}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{ duration: isPaused ? 0 : 4.5, ease: 'linear' }}
            className={`h-full bg-gradient-to-r ${currentSlide.accentColor}`}
          />
        </div>

      </div>
    </div>
  );
};
