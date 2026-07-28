import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Award, Star } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      id: 1,
      value: '$120M+',
      label: 'Client Revenue Generated',
      subtext: 'Across FinTech, SaaS & HealthTech',
      icon: <TrendingUp className="w-5 h-5 text-[#0066FF]" />
    },
    {
      id: 2,
      value: '99.4%',
      label: 'On-Time Sprint Delivery',
      subtext: 'Guaranteed SLA performance',
      icon: <Clock className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 3,
      value: '120+',
      label: 'AI & Web Products Delivered',
      subtext: 'Zero critical vulnerability reports',
      icon: <Award className="w-5 h-5 text-purple-400" />
    },
    {
      id: 4,
      value: '4.9/5',
      label: 'Client Satisfaction Rating',
      subtext: 'Based on 85+ verified reviews',
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-xl hover:shadow-2xl hover:border-[#0066FF] transition-all duration-150 ease-out relative group overflow-hidden"
          >
            {/* Top Glowing Blue Accent Line on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 group-hover:bg-[#0066FF]/20 group-hover:border-[#0066FF]/40 transition-colors duration-150">
                {s.icon}
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Metric 0{s.id}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight group-hover:text-[#38BDF8] transition-colors duration-150">
              {s.value}
            </div>

            <div className="text-sm font-bold text-slate-200 mt-1">
              {s.label}
            </div>

            <div className="text-xs text-slate-400 mt-0.5">
              {s.subtext}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
