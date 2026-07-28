import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FaqAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our engineering process, pricing, and SLAs."
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50/60 border-y border-[#E5E7EB] relative">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-[#4B5563]">
            {subtitle}
          </p>
        </div>

        {/* Search Input Filter */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. SOC2, IP, speed, pricing)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#0066FF] shadow-sm"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 bg-white rounded-2xl border border-gray-200">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search or schedule a call.
            </div>
          ) : (
            filteredItems.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm overflow-hidden transition-all duration-200 chrome-border"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-base font-bold font-heading text-[#0A0A0A] leading-snug">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl transition-colors shrink-0 ${isOpen ? 'bg-blue-50 text-[#0066FF]' : 'bg-slate-100 text-gray-500'}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 text-xs text-[#4B5563] leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </motion.div>
    </section>
  );
};
