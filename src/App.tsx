import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { SiteProvider, useSiteData } from './context/SiteContext';

import { HomeView } from './views/HomeView';
import { AllServicesView } from './views/AllServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { CaseStudiesView } from './views/CaseStudiesView';
import { AboutView } from './views/AboutView';
import { TeamView } from './views/TeamView';
import { CareersView } from './views/CareersView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';

import { PageRoute } from './types';
import { ShieldCheck, Settings, X, PhoneCall, CheckCircle2, AlertCircle, ArrowRight, Mail, User, FileText } from 'lucide-react';

const ROUTE_TO_PATH: Record<PageRoute, string | ((slug: string) => string)> = {
  home: '/',
  services: '/services',
  'service-detail': (slug: string) => `/services/${encodeURIComponent(slug)}`,
  'case-studies': '/case-studies',
  'case-study-detail': '/case-studies',
  about: '/about',
  team: '/team',
  careers: '/careers',
  blog: '/blog',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms'
};

const PATH_TO_ROUTE: Array<{ match: RegExp; route: PageRoute; slug?: (m: RegExpMatchArray) => string }> = [
  { match: /^\/services\/([^/]+)\/?$/i, route: 'service-detail', slug: (m) => decodeURIComponent(m[1]) },
  { match: /^\/services\/?$/i, route: 'services' },
  { match: /^\/case-studies\/?$/i, route: 'case-studies' },
  { match: /^\/about\/?$/i, route: 'about' },
  { match: /^\/team\/?$/i, route: 'team' },
  { match: /^\/careers\/?$/i, route: 'careers' },
  { match: /^\/blog\/?$/i, route: 'blog' },
  { match: /^\/contact\/?$/i, route: 'contact' },
  { match: /^\/privacy\/?$/i, route: 'privacy' },
  { match: /^\/terms\/?$/i, route: 'terms' },
  { match: /^\/$/i, route: 'home' }
];

function buildPath(route: PageRoute, slug?: string): string {
  const entry = ROUTE_TO_PATH[route];
  if (typeof entry === 'function') return slug ? entry(slug) : '/services';
  return entry;
}

function parsePath(pathname: string): { route: PageRoute; slug?: string } | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const rule of PATH_TO_ROUTE) {
    const m = clean.match(rule.match);
    if (m) {
      return {
        route: rule.route,
        slug: rule.slug ? rule.slug(m) : undefined
      };
    }
  }
  return null;
}

let _suppressPopstateSync = false;

function MainAppContent() {
  const { isAdminAuthenticated, addBookCall } = useSiteData();

  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedSlug, setSelectedSlug] = useState<string>('custom-web-apps');

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Book a Call modal state
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [bookCallPrefilledSpec, setBookCallPrefilledSpec] = useState<string>('');
  const [bookCallForm, setBookCallForm] = useState({ name: '', email: '', notes: '' });
  const [bookCallLoading, setBookCallLoading] = useState(false);
  const [bookCallError, setBookCallError] = useState<string | null>(null);
  const [bookCallSuccess, setBookCallSuccess] = useState(false);

  // Sync React route state ↔ browser URL ONCE on first mount.
  // (Kept out of useState initializer so it runs AFTER Render/index.html
  // hydration completes — fixes slug pages bouncing back to home on deploy.)
  useEffect(() => {
    const parsed = parsePath(window.location.pathname);
    if (parsed) {
      setCurrentRoute(parsed.route);
      if (parsed.slug) setSelectedSlug(parsed.slug);
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedSlug]);

  // Browser back / forward buttons → sync state
  useEffect(() => {
    const onPopstate = () => {
      if (_suppressPopstateSync) {
        _suppressPopstateSync = false;
        return;
      }
      const parsed = parsePath(window.location.pathname);
      if (!parsed) return;
      setCurrentRoute(parsed.route);
      if (parsed.slug) setSelectedSlug(parsed.slug);
    };
    window.addEventListener('popstate', onPopstate);
    return () => window.removeEventListener('popstate', onPopstate);
  }, []);

  const handleNavigate = (route: PageRoute, slug?: string) => {
    if (slug) {
      setSelectedSlug(slug);
    }
    setCurrentRoute(route);
    try {
      const newPath = buildPath(route, slug);
      if (newPath && window.location.pathname !== newPath) {
        window.history.pushState({ route, slug }, '', newPath);
      }
    } catch { /* ignore history API errors */ }
  };

  const goToContactPage = () => {
    setCurrentRoute('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCallClick = (prefilledSpec?: string) => {
    setBookCallPrefilledSpec(prefilledSpec || '');
    setBookCallForm({ name: '', email: '', notes: prefilledSpec || '' });
    setBookCallError(null);
    setBookCallSuccess(false);
    setBookCallLoading(false);
    setIsBookCallOpen(true);
  };

  const closeBookCallAndNavigate = () => {
    setIsBookCallOpen(false);
    goToContactPage();
  };

  const handleBookCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookCallForm.name.trim() || !bookCallForm.email.trim()) {
      setBookCallError('Name and email are required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookCallForm.email.trim())) {
      setBookCallError('Please enter a valid email address.');
      return;
    }
    setBookCallError(null);
    setBookCallLoading(true);
    try {
      const result = await addBookCall({
        name: bookCallForm.name.trim(),
        email: bookCallForm.email.trim(),
        notes: bookCallForm.notes.trim() || undefined
      });
      setBookCallLoading(false);
      if (result.ok) {
        setBookCallSuccess(true);
        // After showing success for ~2s, close modal + go to contact page
        setTimeout(() => {
          setIsBookCallOpen(false);
          setBookCallSuccess(false);
          goToContactPage();
        }, 2200);
      } else {
        setBookCallError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setBookCallLoading(false);
      setBookCallError(err?.message || 'Network error. Please try again.');
    }
  };

  const handleOpenAdminModal = () => {
    if (isAdminAuthenticated) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased selection:bg-[#0066FF] selection:text-white flex flex-col justify-between relative">
      
      {/* Sticky Glassmorphism Header Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onBookCallClick={handleBookCallClick}
      />

      {/* Main View Router Content with Smooth Page Transitions */}
      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute + (currentRoute === 'service-detail' ? `-${selectedSlug}` : '')}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {currentRoute === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
                onSelectCaseStudy={() => handleNavigate('case-studies')}
              />
            )}

            {currentRoute === 'services' && (
              <AllServicesView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'service-detail' && (
              <ServiceDetailView
                slug={selectedSlug}
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'case-studies' && (
              <CaseStudiesView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'about' && (
              <AboutView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'team' && (
              <TeamView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'careers' && (
              <CareersView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                onBookCallClick={handleBookCallClick}
              />
            )}

            {currentRoute === 'privacy' && (
              <LegalView
                onNavigate={handleNavigate}
                defaultTab="privacy"
              />
            )}

            {currentRoute === 'terms' && (
              <LegalView
                onNavigate={handleNavigate}
                defaultTab="terms"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Admin Active Button */}
      {isAdminAuthenticated && (
        <button
          onClick={() => setIsAdminPanelOpen(true)}
          className="fixed bottom-5 left-5 z-[100] px-3.5 py-2 rounded-xl bg-slate-900 border border-blue-500/40 text-blue-400 font-bold text-xs shadow-2xl flex items-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
          <span>Admin Panel Active</span>
          <Settings className="w-3.5 h-3.5 text-slate-400 animate-spin" style={{ animationDuration: '8s' }} />
        </button>
      )}

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onBookCallClick={handleBookCallClick}
        onOpenAdminModal={handleOpenAdminModal}
      />

      {/* --- Book a Call Modal (quick intake that actually triggers Brevo emails) --- */}
      {isBookCallOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white space-y-5 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsBookCallOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {bookCallSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">Request received!</h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2">
                    A discovery-call confirmation email is on its way. CrifTech will follow up within 1 business day.
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 pt-2">Redirecting you to the contact page…</p>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0066FF]/15 border border-blue-500/40 text-[#0066FF] flex items-center justify-center shadow-lg shadow-blue-500/10">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Book a Discovery Call
                  </h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Pop in your details and we'll hold a 30-minute slot on our calendar.
                    {bookCallPrefilledSpec && (
                      <span className="block mt-2 pt-2 border-t border-slate-800/80 text-slate-500">
                        Context: <span className="text-blue-300">{bookCallPrefilledSpec}</span>
                      </span>
                    )}
                  </p>
                </div>

                <form onSubmit={handleBookCallSubmit} className="space-y-4">
                  {bookCallError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{bookCallError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={bookCallForm.name}
                        onChange={(e) => { setBookCallForm({ ...bookCallForm, name: e.target.value }); setBookCallError(null); }}
                        placeholder="e.g. Alex Thorne"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={bookCallForm.email}
                        onChange={(e) => { setBookCallForm({ ...bookCallForm, email: e.target.value }); setBookCallError(null); }}
                        placeholder="alex@company.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Project / Notes (optional)
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-slate-500">
                        <FileText className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={3}
                        value={bookCallForm.notes}
                        onChange={(e) => setBookCallForm({ ...bookCallForm, notes: e.target.value })}
                        placeholder="Brief note about the project you have in mind, preferred day/time, etc."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bookCallLoading || !bookCallForm.name.trim() || !bookCallForm.email.trim()}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {bookCallLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        <span>Sending request…</span>
                      </span>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4 text-white" />
                        <span>Book My Call</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={closeBookCallAndNavigate}
                  className="w-full text-center text-[11px] text-slate-500 hover:text-slate-300 font-semibold pt-1 transition-colors underline-offset-2 hover:underline"
                >
                  Or just take me to the contact page instead →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Admin Panel Overlay */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

    </div>
  );
}

export function App() {
  return (
    <SiteProvider>
      <MainAppContent />
    </SiteProvider>
  );
}

export default App;
