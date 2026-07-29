import React, { useState } from 'react';
import { CrifTechLogo } from './CrifTechLogo';
import { TechBackgroundCanvas } from './TechBackgroundCanvas';
import { ALL_SERVICES } from '../data/servicesData';
import { useSiteData } from '../context/SiteContext';
import { PageRoute } from '../types';
import { 
  Mail, 
  Linkedin, 
  Facebook,
  Instagram,
  Youtube,
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall,
  MapPin,
  Clock,
  Phone,
  Lock
} from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22 6.33 6.33 0 0 0 15.67 15.67V8.8a8.16 8.16 0 0 0 4.77 1.52V6.87a4.85 4.85 0 0 1-.85-.18z"/>
  </svg>
);

interface FooterProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookCallClick, onOpenAdminModal }) => {
  const { addLead } = useSiteData();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState<'idle' | 'success' | 'already'>('idle');

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: ' https://www.facebook.com/people/CrifTech/61592702301806/', color: 'hover:text-blue-500 hover:border-blue-500/50' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/criftech/', color: 'hover:text-pink-500 hover:border-pink-500/50' },
    { name: 'TikTok', icon: <TikTokIcon className="w-5 h-5" />, href: 'https://www.tiktok.com/@criftech17', color: 'hover:text-cyan-400 hover:border-cyan-400/50' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/@criftech', color: 'hover:text-red-500 hover:border-red-500/50' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/criftech', color: 'hover:text-sky-400 hover:border-sky-400/50' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      const result = await addLead(newsletterEmail, 'Footer Newsletter');
      if (result?.isDuplicate) {
        setSubscribeState('already');
      } else {
        setSubscribeState('success');
      }
      setTimeout(() => setSubscribeState('idle'), 6000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0F19] text-white pt-16 pb-10 relative overflow-hidden border-t border-slate-800">
      
      {/* Live Tech Canvas Background */}
      <TechBackgroundCanvas opacity={0.65} />

      {/* Top Ambient Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0052CC]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. The 5-Column Hierarchy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Anchor & Narrative (Far Left) */}
          <div className="space-y-4 lg:col-span-1">
            <div onClick={() => onNavigate('home')} className="cursor-pointer inline-block">
              <CrifTechLogo variant="footer" showTagline={true} />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              CrifTech is a software engineering agency building fast web apps, mobile apps, custom AI tools, and cloud software with 100% code ownership.
            </p>

            <div className="space-y-2 text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>Silicon Valley, CA & Global Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>24/7 Engineering Support</span>
              </div>
            </div>

            {/* Social Icons Series under Column 1 */}
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Follow Us
              </div>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className={`p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 ${social.color} transition-all duration-150 hover:scale-110 hover:bg-slate-800 shadow-sm`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Internal Navigation (Quick Links) */}
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-extrabold text-base uppercase tracking-wider text-white">
                Quick Links
              </h4>
              <div className="w-10 h-1 bg-[#0066FF] mt-1.5 mb-4 rounded-full"></div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-left block">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors text-left block">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-blue-400 transition-colors text-left block">
                  Team & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-blue-400 transition-colors text-left block">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors text-left block">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-extrabold text-base uppercase tracking-wider text-white">
                Our Services
              </h4>
              <div className="w-10 h-1 bg-[#0066FF] mt-1.5 mb-4 rounded-full"></div>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
              {ALL_SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="hover:text-blue-400 transition-colors text-left block line-clamp-1"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-blue-400 font-bold hover:underline inline-flex items-center gap-1.5 pt-1"
                >
                  <span>All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Iconographic Association) */}
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-extrabold text-base uppercase tracking-wider text-white">
                Contact Info
              </h4>
              <div className="w-10 h-1 bg-[#0066FF] mt-1.5 mb-4 rounded-full"></div>
            </div>

            <div className="space-y-3 text-sm text-slate-200 font-medium">
              <a
                href="mailto:criftech@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[#0066FF] text-slate-200 transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#0066FF] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">criftech@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200">
                <Phone className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span className="truncate">+923377530718</span>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full mt-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 electric-glow-sm"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Book Free Call</span>
              </button>
            </div>
          </div>

          {/* Column 5: Conversion & Engagement (Far Right) */}
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-extrabold text-base uppercase tracking-wider text-white">
                Stay Updated
              </h4>
              <div className="w-10 h-1 bg-[#0066FF] mt-1.5 mb-4 rounded-full"></div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Subscribe to CrifTech Dispatch for insights on React 19, Gemini AI, and cloud architecture.
            </p>

            {subscribeState === 'success' ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : subscribeState === 'already' ? (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-sm font-semibold flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <div className="text-amber-100">Already subscribed.</div>
                  <div className="text-xs font-medium text-amber-200/80 mt-0.5">This email is already on the Dispatch list.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF]"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg electric-glow-sm"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 2. Functional Bottom Baseline (Copyright & Trust Parameters) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300 font-medium">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} CrifTech Engineering. All Rights Reserved.</span>
          </div>

          {/* Center / Right: Legal Links & Admin Portal Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-slate-300 font-medium">
            <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </button>
            <span className="text-slate-600">&bull;</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors">
              Terms & Conditions
            </button>
            <span className="text-slate-600">&bull;</span>
            <button
              onClick={onOpenAdminModal}
              className="p-1 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-slate-900 transition-all flex items-center gap-1 group"
              title="Admin Security Access"
              aria-label="Admin Security Access"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
