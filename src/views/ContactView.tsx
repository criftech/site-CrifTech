import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../types';
import { useSiteData } from '../context/SiteContext';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.888-9.885 9.888m0-18.001A11.722 11.722 0 003.78 6.42 11.72 11.72 0 001.2 13.79c0 2.371.693 4.686 2.006 6.666l-2.13 7.78 7.962-2.088a11.714 11.714 0 005.688 1.48h.005c6.48 0 11.754-5.274 11.757-11.757a11.68 11.68 0 00-3.443-8.312 11.68 11.68 0 00-8.312-3.439"/>
  </svg>
);

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
  onBookCallClick: () => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const { addInquiry, services } = useSiteData();

  const BUDGET_OPTIONS_BY_CURRENCY: Record<string, string[]> = {
    '$': [
      'Under $10,000',
      '$10,000 - $20,000',
      '$20,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000+'
    ],
    '€': [
      'Under €9,000',
      '€9,000 - €18,000',
      '€18,000 - €45,000',
      '€45,000 - €90,000',
      '€90,000+'
    ],
    'PKR': [
      'Under PKR 75,000',
      'PKR 75,000 - PKR 200,000',
      'PKR 200,000 - PKR 500,000',
      'PKR 500,000 - PKR 1,500,000',
      'PKR 1,500,000+'
    ]
  };

  const DEFAULT_BUDGET_BY_CURRENCY: Record<string, string> = {
    '$': '$20,000 - $50,000',
    '€': '€18,000 - €45,000',
    'PKR': 'PKR 200,000 - PKR 500,000'
  };

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    currency: '$',
    service: services[0]?.title || 'Custom Web Applications',
    budget: DEFAULT_BUDGET_BY_CURRENCY['$'],
    message: ''
  });

  const currentBudgetOptions = BUDGET_OPTIONS_BY_CURRENCY[formState.currency] || BUDGET_OPTIONS_BY_CURRENCY['$'];

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      addInquiry({
        name: formState.name,
        email: formState.email,
        phone: formState.whatsapp,
        company: formState.company,
        service: formState.service,
        budget: formState.budget,
        message: formState.message || 'Direct contact request',
        type: 'Contact Form'
      });
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setFormState({
      name: '',
      email: '',
      company: '',
      whatsapp: '',
      currency: '$',
      service: services[0]?.title || 'Custom Web Applications',
      budget: DEFAULT_BUDGET_BY_CURRENCY['$'],
      message: ''
    });
  };

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen space-y-16 relative">
      
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>Direct Architectural Inquiry</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
          Let&apos;s Build <span className="gradient-text-electric">Something Great</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Reach out for a direct response from our principal engineering team within 24 hours.
        </p>
      </motion.section>

      {/* 2-Column Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-8 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl chrome-border"
          >
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Average response time: &lt; 2 Hours (Mon - Fri)
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-blue-50/80 text-[#0066FF] font-bold text-xs flex items-center gap-2 border border-blue-100 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <span>NDA Protected Inquiry</span>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold font-heading">Message Dispatched!</h3>
                <p className="text-xs text-emerald-700">
                  Thank you! Our senior architectural team will review your specs and email you a proposal outline within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Thorne"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="e.g. Apex Global"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Primary Target</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none bg-white transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id || s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">WhatsApp Number</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 select-none pointer-events-none">
                        WA
                      </span>
                      <input
                        type="tel"
                        value={formState.whatsapp}
                        onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-emerald-500 focus:outline-none bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Project Budget</label>
                    <div className="flex items-stretch gap-2">
                      <select
                        value={formState.currency}
                        onChange={(e) => {
                          const newCurrency = e.target.value;
                          setFormState((prev) => ({
                            ...prev,
                            currency: newCurrency,
                            budget: DEFAULT_BUDGET_BY_CURRENCY[newCurrency] || prev.budget
                          }));
                        }}
                        className="w-20 shrink-0 px-2.5 py-3.5 rounded-xl border border-slate-200 text-xs font-extrabold focus:border-[#0066FF] focus:outline-none bg-white transition-colors text-center"
                      >
                        <option value="$">$</option>
                        <option value="€">€</option>
                        <option value="PKR">PKR</option>
                      </select>
                      <select
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none bg-white transition-colors"
                      >
                        {currentBudgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">Project Goals & Requirements</label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your software goals, desired features, or target timelines..."
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0066FF] focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Mutual NDA Standard</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 electric-glow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}

          </motion.div>

          {/* Right Column: Direct Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-slate-950 text-white space-y-6 shadow-2xl border border-slate-800/90 relative overflow-hidden">
              
              {/* Subtle ambient accent glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold uppercase tracking-wider border border-blue-500/20">
                  <Sparkles className="w-3 h-3 text-[#0066FF]" />
                  <span>Direct Engineering Hub</span>
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-white tracking-tight">
                  Get in Touch
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Have questions or need technical advice? Connect with our senior engineers directly.
                </p>
              </div>

              <div className="space-y-5 text-xs pt-4 border-t border-slate-800/90 relative z-10">
                
                {/* Email Item */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-[#0066FF]/50 transition-all group">
                  <div className="p-2.5 rounded-xl bg-[#0066FF]/20 text-[#0066FF] shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300">Email Engineering:</div>
                    <a href="mailto:criftech@gmail.com" className="text-[#0066FF] font-extrabold text-sm hover:underline block mt-0.5">
                      criftech@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-500/60 transition-all group">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300">WhatsApp Direct Chat:</div>
                    <a 
                      href="https://wa.me/03375307138?text=Hello%20CrifTech%20Engineering%20Team" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-extrabold text-sm hover:underline block mt-0.5 flex items-center gap-1.5"
                    >
                      <span>+9233775307138</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Engineering Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300">Engineering Hours:</div>
                    <div className="text-slate-300 font-medium mt-0.5">
                      Mon - Fri: 24/5 Active Response
                    </div>
                  </div>
                </div>

                {/* Response Guarantee */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-300">Response Guarantee:</div>
                    <div className="text-slate-300 font-medium mt-0.5">
                      Proposal outline delivered within 24 hours.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FLOATING WHATSAPP ICON BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/18005552743?text=Hello%20CrifTech%20Engineering%20Team"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="group relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-400/50 ring-4 ring-emerald-500/20"
        >
          {/* Pulsing online badge indicator */}
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-emerald-700"></span>
          </span>

          <WhatsAppIcon className="w-7 h-7 text-white" />
          
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none border border-slate-800">
            Chat on WhatsApp
          </span>
        </a>
      </div>

    </div>
  );
};
