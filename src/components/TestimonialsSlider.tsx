import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/contentData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-slate-50/80 border-y border-[#E5E7EB] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            <span>Verified Executive Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
            Trusted by CTOs & <span className="gradient-text-electric">Engineering Leaders</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-xl chrome-border">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-500/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Star Rating & Verified Metric Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Outcome: {activeTestimonial.metric}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed italic">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              {/* Author Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#0066FF] shadow-md"
                />
                <div>
                  <div className="text-base font-bold text-[#0A0A0A] font-heading">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-xs font-semibold text-[#0066FF]">
                    {activeTestimonial.title} &bull; {activeTestimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#0066FF]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
