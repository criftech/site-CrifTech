import React from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteContext';
import { PageRoute } from '../types';
import { CtaBanner } from '../components/CtaBanner';
import { Users, Linkedin, Github, CheckCircle2 } from 'lucide-react';

interface TeamViewProps {
  onNavigate: (route: PageRoute) => void;
  onBookCallClick: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ onNavigate, onBookCallClick }) => {
  const { teamMembers } = useSiteData();
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen space-y-16">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100">
          <Users className="w-3.5 h-3.5" />
          <span>Senior Leadership</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0A0A0A] tracking-tight">
          Meet Our Senior <span className="gradient-text-electric">Engineering Pod</span>
        </h1>
        <p className="text-base text-[#4B5563]">
          Experienced staff engineers leading your product architecture.
        </p>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-md hover:shadow-2xl hover:border-[#0066FF] transition-all flex flex-col justify-between chrome-border group"
            >
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="text-xs font-bold font-heading">{member.name}</div>
                    <div className="flex items-center gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {member.expertise.map((exp, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-gray-700"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available for Architecture Review</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBanner
        onBookCallClick={() => onNavigate('contact')}
        buttonText="Contact Us"
      />
    </div>
  );
};
