import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { PageRoute } from '../types';
import { CtaBanner } from '../components/CtaBanner';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface AllServicesViewProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: () => void;
}

export const AllServicesView: React.FC<AllServicesViewProps> = ({
  onNavigate,
  onBookCallClick
}) => {
  const { services } = useSiteData();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Core Development',
    'AI & Data',
    'Design & Growth',
    'Cloud & QA'
  ];

  const filteredServices = services.filter(s => {
    const matchesCat = selectedCat === 'All' || s.category === selectedCat;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-16">
      
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Engineering Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
          Our Specialized <span className="gradient-text-electric">Engineering Services</span>
        </h1>
        <p className="text-base text-[#4B5563]">
          Explore our full spectrum of software development, artificial intelligence, product design, and cloud infrastructure offerings.
        </p>

        {/* Search & Filters */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search across all  services..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? 'bg-white text-[#0066FF] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                layout
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate('service-detail', service.slug)}
                className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:border-[#0066FF] transition-all cursor-pointer flex flex-col justify-between group chrome-border"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {service.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      SLA Ready
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-[#0A0A0A] group-hover:text-[#0066FF] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#374151] leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-gray-400 uppercase">Key Capabilities:</div>
                    {service.techStack.slice(0, 2).flatMap(g => g.items.slice(0, 3)).map((item, iIdx) => (
                      <div key={iIdx} className="text-xs font-semibold text-gray-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0066FF]">
                  <span>View Full Service Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <CtaBanner onBookCallClick={onBookCallClick} />

    </div>
  );
};
