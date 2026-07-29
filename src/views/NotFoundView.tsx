import React from 'react';
import { PageRoute } from '../types';
import { AlertTriangle, ArrowRight, Home, PhoneCall } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  title?: string;
  message?: string;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigate,
  title,
  message
}) => {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 tracking-tight">
            {title || '404 — Page not found'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
            {message || 'The link you opened doesn’t exist. Please check the URL or use the buttons below to continue.'}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 text-[#0066FF]" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

