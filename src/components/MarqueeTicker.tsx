import React from 'react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

export const MarqueeTicker: React.FC = () => {
  const techStack: TechItem[] = [
    {
      name: 'React 19',
      category: 'Frontend Framework',
      icon: (
        <svg className="w-5 h-5 text-[#0066FF] fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3.5-8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
      )
    },
    {
      name: 'React Native',
      category: 'Mobile Engine',
      icon: (
        <svg className="w-5 h-5 text-[#0088FF] fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.4" />
        </svg>
      )
    },
    {
      name: 'TypeScript',
      category: 'Type-Safe Code',
      icon: (
        <span className="w-5 h-5 rounded-md bg-[#0066FF] text-white font-extrabold text-[10px] flex items-center justify-center shadow-sm">
          TS
        </span>
      )
    },
    {
      name: 'JavaScript ES6+',
      category: 'Core Runtime',
      icon: (
        <span className="w-5 h-5 rounded-md bg-amber-400 text-slate-900 font-extrabold text-[10px] flex items-center justify-center shadow-sm">
          JS
        </span>
      )
    },
    {
      name: 'PyTorch',
      category: 'Deep Learning',
      icon: (
        <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15L12 6.5z"/>
        </svg>
      )
    },
    {
      name: 'HuggingFace',
      category: 'LLMs & Neural Nets',
      icon: (
        <span className="text-base leading-none">🤗</span>
      )
    },
    {
      name: 'Git',
      category: 'Version Control',
      icon: (
        <svg className="w-5 h-5 text-orange-600 fill-current" viewBox="0 0 24 24">
          <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2-.8-2.8 0L8.2 4.5l3.5 3.5c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l3.4 3.4c.6-.2 1.3 0 1.8.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.5-.7-1.2-.5-1.8L12.5 11c-.2.2-.5.3-.8.3s-.6-.1-.8-.3c-.5-.5-.7-1.2-.5-1.8L6.9 5.7 2.4 10.2c-.8.8-.8 2 0 2.8l8.5 8.5c.8.8 2 .8 2.8 0l7.9-7.9c.8-.7.8-1.9 0-2.7z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      category: 'DevOps & CI/CD',
      icon: (
        <svg className="w-5 h-5 text-slate-800 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'MongoDB Atlas',
      category: 'NoSQL Database',
      icon: (
        <svg className="w-5 h-5 text-emerald-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 22s-7-4.5-7-11.5C5 5 12 2 12 2s7 3 7 8.5c0 7-7 11.5-7 11.5z"/>
        </svg>
      )
    },
    {
      name: 'Supabase',
      category: 'Postgres & Auth',
      icon: (
        <svg className="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 24 24">
          <path d="M13.35 20.13c-.63 1.09-2.22.64-2.22-.62V13H3.68c-.96 0-1.52-1.07-.98-1.87L10.65 3.87c.63-1.09 2.22-.64 2.22.62V11h7.45c.96 0 1.52 1.07.98 1.87l-7.95 7.26z"/>
        </svg>
      )
    },
    {
      name: 'Vercel',
      category: 'Cloud Edge Hosting',
      icon: (
        <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
          <path d="M12 1L24 22H0L12 1z"/>
        </svg>
      )
    },
    {
      name: 'Render',
      category: 'Application Cloud',
      icon: (
        <svg className="w-5 h-5 text-sky-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        </svg>
      )
    },
    {
      name: 'Railway',
      category: 'Infrastructure',
      icon: (
        <svg className="w-5 h-5 text-purple-600 fill-current" viewBox="0 0 24 24">
          <path d="M2 12h20M12 2v20"/>
        </svg>
      )
    },
    {
      name: 'Netlify',
      category: 'Jamstack & Serverless',
      icon: (
        <svg className="w-5 h-5 text-teal-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5l5.5 5.5-5.5 5.5-5.5-5.5L12 6.5z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-y border-slate-200/80 py-5 overflow-hidden relative select-none shadow-inner">
      
      {/* Left/Right Metallic Shadow Overlay for Smooth Fading Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none"></div>

      <div className="animate-marquee flex items-center gap-6">
        {/* Triple clone array for continuous seamless scrolling */}
        {[...techStack, ...techStack, ...techStack].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white border border-slate-200/90 hover:border-[#0066FF] px-4 py-2.5 rounded-2xl shrink-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#0066FF]/30 transition-colors">
              {item.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors leading-snug">
                {item.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
