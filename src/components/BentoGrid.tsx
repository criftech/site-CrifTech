import React from 'react';
import { motion } from 'motion/react';
import { ALL_SERVICES } from '../data/servicesData';
import { 
  Globe, 
  Smartphone, 
  Sparkles, 
  Bot, 
  Cloud, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Users, 
  Lock 
} from 'lucide-react';

interface BentoGridProps {
  type: 'services' | 'why-choose-us';
  onServiceSelect?: (slug: string) => void;
  onExploreClick?: () => void;
  onNavigate?: (route: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ 
  type, 
  onServiceSelect, 
  onExploreClick,
  onNavigate
}) => {
  if (type === 'why-choose-us') {
    return (
      <section className="py-20 bg-slate-50/60 border-y border-[#E5E7EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Why Work With Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
              Why Businesses <span className="gradient-text-electric">Choose CrifTech</span>
            </h2>
            <p className="text-base text-[#4B5563]">
              We deliver high-quality software, modern web apps, and mobile solutions with clear communication and fast delivery.
            </p>
          </div>

          {/* Bento Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Senior Developers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-2xl hover:border-[#0066FF] transition-all relative overflow-hidden flex flex-col justify-between group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#0066FF]/10 blur-3xl group-hover:bg-[#0066FF]/20 transition-all"></div>

              <div>
                <div className="p-3 rounded-2xl bg-blue-50 text-[#0066FF] w-fit mb-6 border border-blue-100">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#0A0A0A] mb-3">
                  Experienced Senior Developers
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  Your project is handled directly by experienced senior developers who write clean, reliable, and well-tested code for your application.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct Communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Regular Progress Updates</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Modern AI & Tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl hover:border-[#0066FF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 w-fit mb-6 border border-indigo-100">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#0A0A0A] mb-2">
                  Modern AI & Tech Tools
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  We integrate smart AI tools, modern frameworks, and cloud solutions to make your software faster and easier to use.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="mt-6 text-sm font-bold text-[#0066FF] inline-flex items-center gap-1 hover:text-[#0052CC] transition-colors cursor-pointer"
              >
                <span>Smart Automation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 3: Fast Speeds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl hover:border-[#0066FF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 w-fit mb-6 border border-emerald-100">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#0A0A0A] mb-2">
                  Lightning Fast Speed
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Optimized for super-fast page loading and smooth responsiveness across all smartphones, tablets, and desktop screens.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="mt-6 text-sm font-bold text-emerald-600 inline-flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span>Optimized Performance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 4: Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl hover:border-[#0066FF] transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 w-fit mb-4 border border-cyan-100">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[#0A0A0A]">
                    Strong Security & Data Privacy
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Secure By Default
                </span>
              </div>

              <p className="text-sm text-[#374151] leading-relaxed mb-6">
                All software is built following industry security standards, encrypted connections, and privacy compliance to protect your data.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-gray-100 text-xs font-bold text-gray-800 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">Data Encryption</div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">Secure APIs</div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">Privacy Protection</div>
              </div>
            </motion.div>

            {/* Card 5: Full Code Ownership */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="md:col-span-1 lg:col-span-2 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-xl hover:border-[#0066FF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 w-fit mb-6 border border-amber-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#0A0A0A] mb-2">
                  100% Full Code Ownership
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  You receive 100% ownership of your source code, design files, and documentation. No recurring hidden fees or platform lock-in.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-gray-800">
                Clean Code + Complete Documentation
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    );
  }

  // Default: Services Bento Grid
  const featuredServices = ALL_SERVICES.slice(0, 6);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Engineering Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
              Enterprise Software & <span className="gradient-text-electric">AI Solutions</span>
            </h2>
            <p className="text-base text-[#4B5563]">
              From custom web platforms to autonomous AI agents, we build resilient technology designed to scale seamlessly.
            </p>
          </div>

          {onExploreClick && (
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group shrink-0"
            >
              <span>Explore All 13 Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Bento Grid layout for Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => onServiceSelect && onServiceSelect(service.slug)}
              className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:border-[#0066FF] transition-all duration-150 ease-out cursor-pointer flex flex-col justify-between group relative overflow-hidden chrome-border"
            >
              {/* Subtle Blue Glow Accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066FF]/10 rounded-full blur-2xl group-hover:bg-[#0066FF]/25 transition-all duration-150"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#0066FF] border border-blue-100/80 group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-150">
                    {service.slug.includes('web') && <Globe className="w-6 h-6" />}
                    {service.slug.includes('mobile') && <Smartphone className="w-6 h-6" />}
                    {service.slug.includes('ai') && <Bot className="w-6 h-6" />}
                    {service.slug.includes('enterprise') && <Sparkles className="w-6 h-6" />}
                    {service.slug.includes('microservice') && <Cpu className="w-6 h-6" />}
                    {!['web', 'mobile', 'ai', 'enterprise', 'microservice'].some(k => service.slug.includes(k)) && (
                      <Cloud className="w-6 h-6" />
                    )}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-slate-100 px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-[#0A0A0A] mb-3 group-hover:text-[#0066FF] transition-colors duration-150">
                  {service.title}
                </h3>

                <p className="text-sm text-[#374151] leading-relaxed mb-6 line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0066FF]">
                <span>Explore Service Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
