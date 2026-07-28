import React, { useState, useEffect, useRef } from 'react';
import { CrifTechLogo } from './CrifTechLogo';
import { useSiteData } from '../context/SiteContext';
import { PageRoute, ServiceCategory } from '../types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  PhoneCall, 
  Code2, 
  Bot, 
  Palette, 
  Cloud,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  activeServiceSlug?: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
  onBookCallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  activeServiceSlug,
  onNavigate,
  onBookCallClick
}) => {
  const { services } = useSiteData();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Group services by category
  const categories: ServiceCategory[] = [
    'Core Development',
    'AI & Data',
    'Design & Growth',
    'Cloud & QA'
  ];

  const getCategoryIcon = (cat: ServiceCategory) => {
    switch (cat) {
      case 'Core Development': return <Code2 className="w-4 h-4 text-[#0066FF]" />;
      case 'AI & Data': return <Bot className="w-4 h-4 text-indigo-600" />;
      case 'Design & Growth': return <Palette className="w-4 h-4 text-purple-600" />;
      case 'Cloud & QA': return <Cloud className="w-4 h-4 text-cyan-600" />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
        setIsCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceSelect = (slug: string) => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('service-detail', slug);
  };

  const handleRouteSelect = (route: PageRoute) => {
    setIsServicesOpen(false);
    setIsCompanyOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(route);
  };

  const isDarkNav = true;

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b bg-slate-950/98 border-slate-800 text-white shadow-xl backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleRouteSelect('home')} 
          className="cursor-pointer group flex items-center gap-2 py-1 transition-opacity hover:opacity-90 active:scale-98 shrink-0"
        >
          <CrifTechLogo variant="navbar" showTagline={false} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="relative hidden lg:flex items-center gap-1 xl:gap-1.5">
          
          {/* Home */}
          <button
            onClick={() => handleRouteSelect('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'home'
                ? 'text-white bg-[#0066FF] shadow-sm'
                : isDarkNav
                ? 'text-slate-200 hover:text-white hover:bg-slate-900'
                : 'text-slate-800 hover:text-[#0066FF] hover:bg-slate-100'
            }`}
          >
            Home
          </button>

          {/* Services Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => {
              setIsServicesOpen(true);
              setIsCompanyOpen(false);
            }}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsCompanyOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                currentRoute === 'services' || currentRoute === 'service-detail'
                  ? 'text-white bg-[#0066FF] shadow-sm'
                  : isDarkNav
                  ? 'text-slate-200 hover:text-white hover:bg-slate-900'
                  : 'text-slate-800 hover:text-[#0066FF] hover:bg-slate-100'
              }`}
            >
              <span>Services</span>
              
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Dropdown Panel - Centered cleanly under navbar */}
            {isServicesOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-[920px] max-w-[92vw] z-50 pointer-events-auto"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div 
                  className="bg-slate-950 rounded-xl shadow-2xl border border-slate-800 p-5 grid grid-cols-4 gap-5 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-slate-800 text-white"
                >
                  {categories.map((cat) => {
                    const categoryServices = services.filter(s => s.category === cat);
                    return (
                      <div key={cat} className="space-y-2">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-heading text-xs font-bold uppercase tracking-wider text-slate-100">
                          {getCategoryIcon(cat)}
                          <span>{cat}</span>
                        </div>
                        <div className="space-y-1">
                          {categoryServices.map((service) => (
                            <button
                              key={service.slug}
                              onClick={() => handleServiceSelect(service.slug)}
                              className={`w-full text-left p-2 rounded-lg transition-all flex flex-col group ${
                                activeServiceSlug === service.slug
                                  ? 'bg-blue-950/70 text-blue-400 font-semibold border border-blue-800/50'
                                  : 'hover:bg-slate-900 text-slate-300 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center justify-between">
                                {service.title}
                                <ChevronRight className="w-3 h-3 text-transparent group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1 font-normal mt-0.5">
                                {service.shortDesc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Bottom Banner in Mega Dropdown */}
                  <div className="col-span-4 mt-1 pt-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Sparkles className="w-4 h-4 text-[#0066FF]" />
                      <span className="font-bold text-white">Looking for custom software or mobile app development?</span>
                      <span className="text-slate-400 hidden sm:inline">— Free consultation & proposal in 24 hrs.</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsServicesOpen(false);
                        onNavigate('services');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0066FF] hover:underline shrink-0"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Case Studies */}
          <button
            onClick={() => handleRouteSelect('case-studies')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'case-studies'
                ? 'text-white bg-[#0066FF] shadow-sm'
                : 'text-slate-200 hover:text-white hover:bg-slate-900'
            }`}
          >
            Case Studies
          </button>

          {/* Company Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => {
              setIsCompanyOpen(true);
              setIsServicesOpen(false);
            }}
            onMouseLeave={() => setIsCompanyOpen(false)}
          >
            <button
              onClick={() => {
                setIsCompanyOpen(!isCompanyOpen);
                setIsServicesOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                ['about', 'team'].includes(currentRoute)
                  ? 'text-white bg-[#0066FF] shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>Company</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Company Dropdown Panel */}
            {isCompanyOpen && (
              <div className="absolute top-full left-0 pt-1.5 w-56 z-50">
                <div 
                  className="rounded-xl bg-slate-950 shadow-2xl border border-slate-800 p-1.5 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150 text-white"
                >
                  <button
                    onClick={() => handleRouteSelect('about')}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900 transition-all duration-150 flex items-center justify-between group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
                  </button>
                  <button
                    onClick={() => handleRouteSelect('team')}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900 transition-all duration-150 flex items-center justify-between group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Team & Leadership</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us */}
          <button
            onClick={() => handleRouteSelect('contact')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentRoute === 'contact'
                ? 'text-white bg-[#0066FF] shadow-sm'
                : 'text-slate-200 hover:text-white hover:bg-slate-900'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onBookCallClick()}
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all duration-150 active:scale-98"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-colors focus:outline-none border text-slate-200 bg-slate-900 border-slate-800 hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Attached directly under header */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-slate-950 z-[100] border-t border-slate-800 text-slate-100 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto flex flex-col p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-2.5 pb-6">
            
            {/* Home */}
            <button
              onClick={() => handleRouteSelect('home')}
              className={`w-full text-left px-3.5 py-3 rounded-lg font-bold text-sm flex items-center justify-between transition-colors ${
                currentRoute === 'home' ? 'bg-blue-950/80 text-blue-400 border border-blue-800/50' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Collapsible Mobile Services Section */}
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-900">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full text-left px-3.5 py-3 font-bold text-sm text-slate-100 flex items-center justify-between bg-slate-900/90"
              >
                <div className="flex items-center gap-2">
                  <span>Services</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-blue-300 font-extrabold border border-blue-500/30">
                    13 Services
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="p-2 space-y-1 bg-slate-950 border-t border-slate-800 max-h-[260px] overflow-y-auto">
                  <button
                    onClick={() => handleRouteSelect('services')}
                    className="w-full text-left p-2.5 rounded-md text-xs font-bold text-blue-300 bg-blue-950/60 border border-blue-800/40 flex items-center justify-between"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => handleServiceSelect(s.slug)}
                      className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-between ${
                        activeServiceSlug === s.slug ? 'bg-blue-950/80 text-blue-300' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Case Studies */}
            <button
              onClick={() => handleRouteSelect('case-studies')}
              className={`w-full text-left px-3.5 py-3 rounded-lg font-bold text-sm flex items-center justify-between transition-colors ${
                currentRoute === 'case-studies' ? 'bg-blue-950/80 text-blue-400 border border-blue-800/50' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Case Studies</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Collapsible Mobile Company Items */}
            <div className="rounded-lg border border-slate-800 overflow-hidden bg-slate-900">
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="w-full text-left px-3.5 py-3 font-bold text-sm text-slate-100 flex items-center justify-between bg-slate-900/90"
              >
                <span>Company</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileCompanyOpen && (
                <div className="p-2 space-y-1 bg-slate-950 border-t border-slate-800">
                  <button
                    onClick={() => handleRouteSelect('about')}
                    className={`w-full text-left px-3 py-2.5 text-xs font-semibold rounded-md flex items-center justify-between ${
                      currentRoute === 'about' ? 'bg-blue-950/80 text-blue-300' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>About Us</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleRouteSelect('team')}
                    className={`w-full text-left px-3 py-2.5 text-xs font-semibold rounded-md flex items-center justify-between ${
                      currentRoute === 'team' ? 'bg-blue-950/80 text-blue-300' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>Team & Leadership</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={() => handleRouteSelect('contact')}
              className={`w-full text-left px-3.5 py-3 rounded-lg font-bold text-sm flex items-center justify-between transition-colors ${
                currentRoute === 'contact' ? 'bg-blue-950/80 text-blue-400 border border-blue-800/50' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {/* Mobile Schedule Strategy Call CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookCallClick();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

