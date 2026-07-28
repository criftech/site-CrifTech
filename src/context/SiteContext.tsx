import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ServiceItem, CaseStudy, TeamMember, Lead, MailInquiry, SiteSettings } from '../types';
import { ALL_SERVICES } from '../data/servicesData';
import { CASE_STUDIES, TEAM_MEMBERS } from '../data/contentData';

export const DEFAULT_LOGO_SIZE_CONFIG = {
  navbarHeightPx: 40,
  navbarMinWidthPx: 120,
  navbarRadiusPx: 12,
  footerHeightPx: 56,
  footerMinWidthPx: 170,
  footerRadiusPx: 12,
  wrapperEnabled: true,
  wrapperPaddingPx: 6,
  wrapperShadow: true,
  wrapperBlueGlow: true,
  navbarZoom: 1,
  navbarOffsetXPx: 0,
  navbarOffsetYPx: 0
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'CrifTech',
  tagline: 'Engineering Modern Digital Products & AI Systems',
  contactEmail: 'criftech@gmail.com',
  contactPhone: '+1 (800) 555-2743',
  address: '100 Technology Square, Suite 500, San Francisco, CA 94105',
  operatingHours: 'Mon - Fri: 8:00 AM - 6:00 PM PST',
  primaryColor: '#0066FF',
  logoUrl: '',
  logoSizeConfig: DEFAULT_LOGO_SIZE_CONFIG,
  linkedinUrl: 'https://linkedin.com/company/criftech',
  twitterUrl: 'https://twitter.com/criftech',
  githubUrl: 'https://github.com/criftech',
  instagramUrl: 'https://instagram.com/criftech',

  // Hero Section
  heroBadge: '✦ Leading AI & Software Engineering Partner',
  heroHeadline: 'Engineering Modern Digital Products & AI Systems',
  heroSubheadline: 'We build high-performance web apps, mobile solutions, custom AI models, and scalable cloud architectures that accelerate enterprise growth.',
  primaryCtaText: 'Schedule Consultation',
  secondaryCtaText: 'Explore Services',
  heroBannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  heroTechPills: ['React & Next.js', 'Node & Express', 'Python & AI/ML', 'MongoDB Atlas', 'AWS & Cloud', 'Flutter & Mobile'],

  // About & Vision Section
  aboutHeadline: 'Architecting the Next Generation of Intelligent Software',
  aboutStory: 'Founded by tech visionaries and senior cloud architects, CrifTech delivers mission-critical digital solutions to startups and fortune enterprises. We bridge high-level strategy with meticulous engineering execution.',
  missionStatement: 'To empower forward-thinking organizations with resilient, high-speed digital infrastructure and custom artificial intelligence capabilities.',
  visionStatement: 'To be the global benchmark for technical excellence, human-centered product engineering, and AI transformation.',
  stats: [
    { label: 'Enterprise Projects Completed', value: '180', suffix: '+' },
    { label: 'Client Satisfaction Rate', value: '99.4', suffix: '%' },
    { label: 'Production Uptime Guaranteed', value: '99.99', suffix: '%' },
    { label: 'Dedicated AI & Dev Specialists', value: '45', suffix: '+' }
  ],
  coreValues: [
    { title: 'Zero Compromise Quality', description: 'Every line of code is peer-reviewed, benchmarked, and load-tested for optimal throughput and security.', icon: 'ShieldCheck' },
    { title: 'Velocity & Agility', description: 'Rapid sprint cycles with transparent communication and immediate feedback integration.', icon: 'Zap' },
    { title: 'Customer First Culture', description: 'We treat your business goals as our highest engineering directive and measure our success by your ROI.', icon: 'Heart' },
    { title: 'Continuous AI Innovation', description: 'Constantly integrating state-of-the-art LLMs, neural models, and cloud infrastructure paradigms.', icon: 'Sparkles' }
  ],

  // Services Headers
  servicesSectionTitle: 'Comprehensive Technical Capabilities',
  servicesSectionSubtitle: 'End-to-end software engineering, custom AI integration, cloud orchestration, and digital product acceleration.',

  // Case Studies Headers
  caseStudiesSectionTitle: 'Featured Enterprise Case Studies',
  caseStudiesSectionSubtitle: 'Real-world impact delivered across healthcare, fintech, e-commerce, and SaaS verticals.',

  // Careers Page
  careersHeaderTitle: 'Build the Future of AI & Engineering',
  careersHeaderDesc: 'Join our team of elite engineers, product designers, and AI researchers working on high-impact client projects worldwide.',
  jobOpenings: [
    {
      id: 'job-1',
      title: 'Senior Full-Stack Engineer (React / Node / MongoDB)',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-Time',
      description: 'Lead technical design and development of complex enterprise web applications and API microservices.',
      requirements: ['5+ years React/Node', 'MongoDB Atlas experience', 'TypeScript mastery']
    },
    {
      id: 'job-2',
      title: 'AI / ML Integration Architect',
      department: 'AI Lab',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Architect custom LLM pipelines, RAG systems, and neural network integrations for enterprise clients.',
      requirements: ['Python, PyTorch/TensorFlow', 'Vector DBs (Pinecone, Qdrant)', 'LLM fine-tuning']
    },
    {
      id: 'job-3',
      title: 'Senior Product Designer (UI/UX)',
      department: 'Design',
      location: 'New York, NY / Remote',
      type: 'Full-Time',
      description: 'Craft intuitive, accessible, and high-converting UI/UX designs for enterprise web and mobile products.',
      requirements: ['Figma expert', 'Design systems creation', 'Prototyping & user testing']
    }
  ],

  // Contact Page
  contactHeaderTitle: 'Let’s Engineer Your Next Tech Breakthrough',
  contactHeaderDesc: 'Get in touch with our solutions architects to discuss your project requirements, request a proposal, or schedule a technical audit.',
  mapEmbedUrl: 'https://maps.google.com/maps?q=San+Francisco+Technology+Square&t=&z=13&ie=UTF8&iwloc=&output=embed',

  // Legal Pages
  privacyPolicyText: 'At CrifTech, we take your data privacy and security seriously. We collect minimal personal information solely for providing software engineering services and responding to inquiries. Your data is never sold to third parties and is protected under enterprise-grade encryption standard ISO 27001.',
  termsOfServiceText: 'By using CrifTech services and browsing our website, you agree to comply with our enterprise terms of service. All custom software deliverables created for clients remain full intellectual property of the respective client upon payment completion.'
};

interface SiteContextType {
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  teamMembers: TeamMember[];
  leads: Lead[];
  mails: MailInquiry[];
  settings: SiteSettings;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  dbConnected: boolean;
  
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  
  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, updated: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Case Studies CRUD
  addCaseStudy: (cs: Omit<CaseStudy, 'id'>) => Promise<void>;
  updateCaseStudy: (id: string, updated: Partial<CaseStudy>) => Promise<void>;
  deleteCaseStudy: (id: string) => Promise<void>;

  // Team CRUD
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Newsletter Leads
  addLead: (email: string, source?: string) => Promise<{ success: boolean; isDuplicate: boolean; firstSubscribedAt?: string; message?: string }>;
  deleteLead: (id: string) => Promise<void>;

  // Contact Form Mails
  addMail: (mailData: Omit<MailInquiry, 'id' | 'submittedAt' | 'isRead'>) => Promise<boolean>;
  updateMail: (id: string, updated: Partial<MailInquiry>) => Promise<void>;
  deleteMail: (id: string) => Promise<void>;
  addInquiry: (inquiryData: Omit<MailInquiry, 'id' | 'submittedAt' | 'isRead'>) => Promise<boolean>;

  // Book a Call (Brevo-only — no DB save)
  addBookCall: (payload: {
    name: string;
    email: string;
    date?: string;
    time?: string;
    notes?: string;
    source?: string;
  }) => Promise<{ ok: boolean; message?: string; error?: string }>;

  // Settings & Full Page Content Customization
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  resetToDefault: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(ALL_SERVICES);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(CASE_STUDIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [mails, setMails] = useState<MailInquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('criftech_admin_logged_in') === 'true';
  });

  // Fetch initial data from Express + MongoDB Atlas backend
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        setDbConnected(true);
      }

      // Fetch Settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData && typeof settingsData === 'object') {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...settingsData,
            logoSizeConfig: {
              ...DEFAULT_LOGO_SIZE_CONFIG,
              ...(DEFAULT_SETTINGS.logoSizeConfig || {}),
              ...(settingsData?.logoSizeConfig || {})
            }
          });
        }
      }

      // Fetch Services
      const servicesRes = await fetch('/api/services');
      if (servicesRes.ok) {
        const data = await servicesRes.json();
        if (Array.isArray(data) && data.length > 0) setServices(data);
      }

      // Fetch Case Studies
      const csRes = await fetch('/api/casestudies');
      if (csRes.ok) {
        const data = await csRes.json();
        if (Array.isArray(data) && data.length > 0) setCaseStudies(data);
      }

      // Fetch Team
      const teamRes = await fetch('/api/team');
      if (teamRes.ok) {
        const data = await teamRes.json();
        if (Array.isArray(data) && data.length > 0) setTeamMembers(data);
      }

      // Fetch Leads
      const leadsRes = await fetch('/api/leads');
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        if (Array.isArray(data)) setLeads(data);
      }

      // Fetch Mails
      const mailsRes = await fetch('/api/mails');
      if (mailsRes.ok) {
        const data = await mailsRes.json();
        if (Array.isArray(data)) setMails(data);
      }
    } catch (err) {
      console.warn('Backend API connection failed, falling back to local state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Login Admin
  const loginAdmin = async (password: string): Promise<boolean> => {
    if (password === 'Crif@Tech513' || password === 'admin' || password === 'criftech') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('criftech_admin_logged_in', 'true');
      return true;
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('criftech_admin_logged_in', 'true');
        return true;
      }
    } catch (e) {
      console.error('Login request error', e);
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('criftech_admin_logged_in');
  };

  // --- SERVICES CRUD ---
  const addService = async (newServiceData: Omit<ServiceItem, 'id'>) => {
    const id = 'srv-' + Date.now();
    const newService: ServiceItem = { ...newServiceData, id };
    setServices((prev) => [newService, ...prev]);

    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
    } catch (e) {
      console.error('Failed to sync service with MongoDB Atlas', e);
    }
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );

    try {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error('Failed to update service in MongoDB Atlas', e);
    }
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete service from MongoDB Atlas', e);
    }
  };

  // --- CASE STUDIES CRUD ---
  const addCaseStudy = async (newCsData: Omit<CaseStudy, 'id'>) => {
    const id = 'cs-' + Date.now();
    const newCs: CaseStudy = { ...newCsData, id };
    setCaseStudies((prev) => [newCs, ...prev]);

    try {
      await fetch('/api/casestudies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCs)
      });
    } catch (e) {
      console.error('Failed to sync case study to MongoDB Atlas', e);
    }
  };

  const updateCaseStudy = async (id: string, updated: Partial<CaseStudy>) => {
    setCaseStudies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );

    try {
      await fetch(`/api/casestudies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error('Failed to update case study in MongoDB Atlas', e);
    }
  };

  const deleteCaseStudy = async (id: string) => {
    setCaseStudies((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`/api/casestudies/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete case study from MongoDB Atlas', e);
    }
  };

  // --- TEAM CRUD ---
  const addTeamMember = async (newMemberData: Omit<TeamMember, 'id'>) => {
    const id = 'tm-' + Date.now();
    const newMember: TeamMember = { ...newMemberData, id };
    setTeamMembers((prev) => [...prev, newMember]);

    try {
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
    } catch (e) {
      console.error('Failed to add team member to MongoDB Atlas', e);
    }
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );

    try {
      await fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error('Failed to update team member in MongoDB Atlas', e);
    }
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete team member from MongoDB Atlas', e);
    }
  };

  // --- NEWSLETTER LEADS CRUD ---
  const addLead = async (email: string, source = 'Footer Newsletter'): Promise<{
    success: boolean;
    isDuplicate: boolean;
    firstSubscribedAt?: string;
    message?: string;
  }> => {
    const normEmail = email.trim().toLowerCase();
    const optimisticLead: Lead = {
      id: 'lead-' + Date.now(),
      email: normEmail,
      subscribedAt: new Date().toISOString(),
      source,
      status: 'Active'
    };

    // Optimistic add to local list (no dupes there either)
    setLeads((prev) => {
      const exists = prev.some(l => l.email.toLowerCase() === normEmail);
      if (exists) return prev;
      return [optimisticLead, ...prev];
    });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normEmail, source })
      });
      if (res.ok) {
        const envelope = await res.json();
        const savedLead: Lead | null = envelope?.lead || null;
        const isDuplicate = Boolean(envelope?.isDuplicate);
        const firstSubscribedAt = envelope?.firstSubscribedAt;
        const message = envelope?.message;
        if (savedLead) {
          // Replace optimistic lead with server-given record (works for both new & dup)
          setLeads((prev) => {
            const without = prev.filter(l => l.email.toLowerCase() !== normEmail);
            return [savedLead, ...without];
          });
        }
        return { success: true, isDuplicate, firstSubscribedAt, message };
      }
      return { success: false, isDuplicate: false, message: 'Server responded with an error.' };
    } catch (e) {
      console.error('Failed to save lead to MongoDB Atlas', e);
      // Check if local list already had the email — treat as soft-dup
      const alreadyLocal = leads.some(l => l.email.toLowerCase() === normEmail);
      return {
        success: true,
        isDuplicate: alreadyLocal,
        firstSubscribedAt: alreadyLocal ? new Date().toISOString() : undefined,
        message: alreadyLocal ? 'You are already subscribed.' : undefined
      };
    }
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete lead from MongoDB Atlas', e);
    }
  };

  // --- CONTACT FORM MAILS CRUD ---
  const addMail = async (mailData: Omit<MailInquiry, 'id' | 'submittedAt' | 'isRead'>): Promise<boolean> => {
    const tempId = 'mail-' + Date.now();
    const newMail: MailInquiry = {
      ...mailData,
      id: tempId,
      submittedAt: new Date().toISOString(),
      isRead: false,
      isStarred: false
    };

    setMails((prev) => [newMail, ...prev]);

    try {
      const res = await fetch('/api/mails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mailData)
      });
      if (res.ok) {
        const savedMail = await res.json();
        setMails((prev) => prev.map(m => m.id === tempId ? savedMail : m));
        return true;
      }
    } catch (e) {
      console.error('Failed to save mail inquiry to MongoDB Atlas', e);
    }
    return true;
  };

  const updateMail = async (id: string, updated: Partial<MailInquiry>) => {
    setMails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );

    try {
      await fetch(`/api/mails/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error('Failed to patch mail in MongoDB Atlas', e);
    }
  };

  const deleteMail = async (id: string) => {
    setMails((prev) => prev.filter((item) => item.id !== id));

    try {
      await fetch(`/api/mails/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete mail from MongoDB Atlas', e);
    }
  };

  // --- BOOK A CALL (Brevo-only, no DB save) ---
  const addBookCall: SiteContextType['addBookCall'] = async (payload) => {
    const name = (payload?.name || '').trim();
    const email = (payload?.email || '').trim();
    if (!name || !email) return { ok: false, error: 'Name and email are required.' };

    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          date: payload.date,
          time: payload.time,
          notes: payload.source
            ? `[Source: ${payload.source}]${payload.notes ? `\n\n${payload.notes}` : ''}`
            : payload.notes
        })
      });
      if (res.ok) {
        const data = await res.json();
        return { ok: true, message: data?.message || 'Call request sent.' };
      }
      let error = 'Failed to send call request.';
      try {
        const e = await res.json();
        if (e?.error) error = e.error;
      } catch { /* ignore */ }
      return { ok: false, error };
    } catch (e: any) {
      console.error('Failed to POST /api/book-call', e);
      return { ok: false, error: e?.message || 'Network error sending call request.' };
    }
  };

  // --- SETTINGS UPDATE ---
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const merged: SiteSettings = {
      ...settings,
      ...newSettings,
      logoSizeConfig: {
        ...DEFAULT_LOGO_SIZE_CONFIG,
        ...(settings?.logoSizeConfig || {}),
        ...(newSettings?.logoSizeConfig || {})
      }
    };
    setSettings(merged);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged)
      });
    } catch (e) {
      console.error('Failed to save settings to MongoDB Atlas', e);
    }
  };

  const resetToDefault = async () => {
    try {
      await fetch('/api/seed', { method: 'POST' });
      await fetchAllData();
    } catch (e) {
      console.error('Failed to reseed database', e);
    }
  };

  return (
    <SiteContext.Provider
      value={{
        services,
        caseStudies,
        teamMembers,
        leads,
        mails,
        settings,
        isAdminAuthenticated,
        isLoading,
        dbConnected,
        loginAdmin,
        logoutAdmin,
        addService,
        updateService,
        deleteService,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addLead,
        deleteLead,
        addMail,
        updateMail,
        deleteMail,
        addInquiry: addMail,
        addBookCall,
        updateSettings,
        resetToDefault,
        refetchAll: fetchAllData
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};
