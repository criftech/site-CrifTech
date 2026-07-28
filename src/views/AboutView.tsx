import React from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../types';
import { CtaBanner } from '../components/CtaBanner';
import { useSiteData } from '../context/SiteContext';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Sparkles 
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
  onBookCallClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onBookCallClick }) => {
  const { settings } = useSiteData();

  const values = [
    {
      title: 'Craftsmanship Over Volume',
      desc: 'We refuse to accept sloppy AI templates or junior code hand-offs. Every system is built to pristine architectural standards.',
      icon: <Award className="w-5 h-5 text-[#0066FF]" />
    },
    {
      title: 'Sub-Second Speed Mandate',
      desc: 'Performance is a core product feature. We optimize Core Web Vitals and edge network latency relentlessly.',
      icon: <Zap className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'AI-Native Innovation',
      desc: 'We do not just wrap LLM APIs. We build custom fine-tuned agents and vectorized RAG memory systems that transform industries.',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Uncompromising Security',
      desc: 'SOC2 Type II, ISO 27001, and HIPAA compliance readiness are baked into our software from day one.',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-600" />
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-20">
      
      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
          <Building2 className="w-3.5 h-3.5" />
          <span>About {settings.brandName}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
          {settings.aboutHeadline || 'Engineered for Excellence & Velocity'}
        </h1>
        <p className="text-base text-[#4B5563] leading-relaxed">
          {settings.aboutStory || 'CrifTech was founded by senior cloud architects to build enterprise software and artificial intelligence systems that set new global benchmarks for speed, security, and design.'}
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-[#E5E7EB] space-y-4 chrome-border"
          >
            <div className="p-3 rounded-2xl bg-blue-50 text-[#0066FF] w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#0A0A0A]">Our Mission</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {settings.missionStatement || 'To empower world-changing enterprises with ultra-fast web software, autonomous AI agent pods, and unbreakable cloud infrastructure.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-[#E5E7EB] space-y-4 chrome-border"
          >
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#0A0A0A]">Our Vision</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {settings.visionStatement || 'To define the next era of AI-native software architecture, where enterprise software is intelligent, self-healing, exceptionally fast, and beautiful to use.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <h2 className="text-3xl font-extrabold font-heading text-[#0A0A0A]">
              Our Operating Principles
            </h2>
            <p className="text-sm text-gray-600">The core values guiding every line of code we write.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 w-fit">{v.icon}</div>
                <h3 className="font-bold text-base font-heading text-[#0A0A0A]">{v.title}</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Hubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Engineering Presence</span>
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-[#0A0A0A]">
            Global Hubs, 24/7 Coverage
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#0066FF] transition-all"
          >
            <h3 className="font-bold text-base text-[#0A0A0A]">Silicon Valley HQ</h3>
            <p className="text-xs text-gray-500 mt-1">Palo Alto, CA &bull; Product Strategy & Executive AI</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#0066FF] transition-all"
          >
            <h3 className="font-bold text-base text-[#0A0A0A]">London Engineering Hub</h3>
            <p className="text-xs text-gray-500 mt-1">London, UK &bull; FinTech & Security Architecture</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#0066FF] transition-all"
          >
            <h3 className="font-bold text-base text-[#0A0A0A]">Singapore Tech Lab</h3>
            <p className="text-xs text-gray-500 mt-1">Singapore &bull; High-Concurrency Edge & Cloud Pods</p>
          </motion.div>
        </div>
      </section>

      <CtaBanner
        onBookCallClick={() => onNavigate('contact')}
        buttonText="Contact Us"
      />

    </div>
  );
};
