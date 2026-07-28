import React, { useState, useEffect } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Layers, 
  Briefcase, 
  Users, 
  Inbox, 
  Palette, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Save, 
  RotateCcw, 
  LogOut, 
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Tag,
  Star,
  UserCheck,
  Send,
  Database,
  Copy,
  Download,
  Filter,
  Eye,
  Check,
  RefreshCw,
  MessageSquare,
  FileText,
  Globe,
  Award,
  Zap,
  MapPin,
  HelpCircle,
  Code
} from 'lucide-react';

import { useSiteData, DEFAULT_LOGO_SIZE_CONFIG } from '../context/SiteContext';
import { ServiceItem, ServiceCategory, CaseStudy, TeamMember, Lead, MailInquiry, JobOpening, SiteSettings } from '../types';
import { ImageUploadInput } from './ImageUploadInput';
import { CrifTechLogo } from './CrifTechLogo';

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  displayMin?: number;
  displayMax?: number;
  displayValue?: number;
  onChange: (value: number) => void;
}

const SliderRow: React.FC<SliderRowProps> = ({
  label,
  value,
  min,
  max,
  suffix = '',
  displayMin,
  displayMax,
  displayValue,
  onChange
}) => {
  const shownValue = displayValue !== undefined ? displayValue : value;
  const shownMin = displayMin !== undefined ? displayMin : min;
  const shownMax = displayMax !== undefined ? displayMax : max;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-300">{label}</label>
        <span className="text-[11px] font-mono text-[#0066FF] bg-blue-500/10 border border-blue-500/20 rounded-md px-2 py-0.5">
          {suffix === '×' ? shownValue : shownValue}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0066FF] hover:accent-[#0052CC] transition-all"
      />
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
        <span>{shownMin}{suffix}</span>
        <span>{shownMax}{suffix}</span>
      </div>
    </div>
  );
};

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-full text-left p-3 rounded-xl border transition-all ${
      checked
        ? 'bg-[#0066FF]/10 border-[#0066FF]/40 ring-1 ring-[#0066FF]/20'
        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-0.5 min-w-0">
        <p className={`text-[11px] font-bold leading-tight ${checked ? 'text-white' : 'text-slate-300'}`}>
          {label}
        </p>
        {description && (
          <p className="text-[10px] text-slate-500 leading-tight">{description}</p>
        )}
      </div>
      <div
        className={`shrink-0 w-9 h-5 rounded-full transition-all relative ${
          checked ? 'bg-[#0066FF]' : 'bg-slate-700'
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </div>
    </div>
  </button>
);

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 
  | 'dashboard' 
  | 'services' 
  | 'casestudies' 
  | 'team' 
  | 'leads' 
  | 'mails' 
  | 'hero' 
  | 'about' 
  | 'careers' 
  | 'contact' 
  | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    services, 
    caseStudies, 
    teamMembers, 
    leads,
    mails,
    settings, 
    dbConnected,
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
    updateMail,
    deleteMail,
    updateSettings,
    resetToDefault,
    refetchAll
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modals state
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [editingCaseStudy, setEditingCaseStudy] = useState<Partial<CaseStudy> | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);

  const [editingTeamMember, setEditingTeamMember] = useState<Partial<TeamMember> | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const [editingJob, setEditingJob] = useState<Partial<JobOpening> | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Leads state
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  // Mails Inbox state
  const [selectedMail, setSelectedMail] = useState<MailInquiry | null>(null);
  const [mailFilter, setMailFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [mailSearch, setMailSearch] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const mergeLogoDefaults = (s: SiteSettings): SiteSettings => ({
    ...s,
    logoSizeConfig: { ...DEFAULT_LOGO_SIZE_CONFIG, ...(s?.logoSizeConfig || {}) }
  });

  // Local Form Settings state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(mergeLogoDefaults(settings));

  useEffect(() => {
    if (settings) {
      setSettingsForm(mergeLogoDefaults(settings));
    }
  }, [settings]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await updateSettings(settingsForm);
    showToast('Page Sections & Site Settings Saved to MongoDB Atlas!');
  };

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data and reseed MongoDB Atlas defaults?')) {
      await resetToDefault();
      setSettingsForm(settings);
      showToast('Database reseeded with fresh defaults.');
    }
  };

  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newLeadEmail.trim();
    if (email) {
      const result = await addLead(email, 'Admin Console Manual');
      setNewLeadEmail('');
      if (result?.isDuplicate) {
        showToast(`⚠ ${email} is already a subscriber (skipped duplicate).`);
      } else {
        showToast(`✅ Subscriber ${email} added to Leads database!`);
      }
    }
  };

  const handleCopyEmails = () => {
    const emailList = leads.map(l => l.email).join(', ');
    navigator.clipboard.writeText(emailList);
    showToast(`Copied ${leads.length} subscriber emails to clipboard!`);
  };

  // --- SERVICE SAVE HANDLER ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.category) {
      alert('Please fill out service title and category');
      return;
    }

    const payload: Omit<ServiceItem, 'id'> = {
      slug: editingService.slug || editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: editingService.title,
      category: (editingService.category as ServiceCategory) || 'Core Development',
      shortDesc: editingService.shortDesc || '',
      fullDesc: editingService.fullDesc || '',
      iconName: editingService.iconName || 'Code',
      problemStatement: editingService.problemStatement || { headline: '', points: [] },
      processSteps: editingService.processSteps || [],
      techStack: editingService.techStack || [],
      caseStudyHighlight: editingService.caseStudyHighlight || { client: '', metrics: '', title: '', summary: '' },
      pricingTiers: editingService.pricingTiers || [],
      faqs: editingService.faqs || []
    };

    if (editingService.id) {
      await updateService(editingService.id, payload);
      showToast(`Updated service: "${editingService.title}"`);
    } else {
      await addService(payload);
      showToast(`Created new service: "${editingService.title}"`);
    }

    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // --- CASE STUDY SAVE HANDLER ---
  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCaseStudy?.title || !editingCaseStudy?.client) {
      alert('Please fill out title and client name');
      return;
    }

    const payload: Omit<CaseStudy, 'id'> = {
      slug: editingCaseStudy.slug || editingCaseStudy.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: editingCaseStudy.title,
      client: editingCaseStudy.client,
      industry: editingCaseStudy.industry || 'Technology',
      category: (editingCaseStudy.category as any) || 'Web',
      summary: editingCaseStudy.summary || '',
      metrics: editingCaseStudy.metrics || [],
      challenge: editingCaseStudy.challenge || '',
      solution: editingCaseStudy.solution || '',
      results: editingCaseStudy.results || [],
      techUsed: editingCaseStudy.techUsed || [],
      featuredImage: editingCaseStudy.featuredImage || ''
    };

    if (editingCaseStudy.id) {
      await updateCaseStudy(editingCaseStudy.id, payload);
      showToast(`Updated case study: "${editingCaseStudy.title}"`);
    } else {
      await addCaseStudy(payload);
      showToast(`Created case study: "${editingCaseStudy.title}"`);
    }

    setIsCaseStudyModalOpen(false);
    setEditingCaseStudy(null);
  };

  // --- TEAM MEMBER SAVE HANDLER ---
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeamMember?.name || !editingTeamMember?.role) {
      alert('Please fill out name and role');
      return;
    }

    const payload: Omit<TeamMember, 'id'> = {
      name: editingTeamMember.name,
      role: editingTeamMember.role,
      bio: editingTeamMember.bio || '',
      avatar: editingTeamMember.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      linkedin: editingTeamMember.linkedin || '',
      github: editingTeamMember.github || '',
      expertise: editingTeamMember.expertise || []
    };

    if (editingTeamMember.id) {
      await updateTeamMember(editingTeamMember.id, payload);
      showToast(`Updated team member: "${editingTeamMember.name}"`);
    } else {
      await addTeamMember(payload);
      showToast(`Added team member: "${editingTeamMember.name}"`);
    }

    setIsTeamModalOpen(false);
    setEditingTeamMember(null);
  };

  // --- CAREER JOB OPENING SAVE HANDLER ---
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.department) {
      alert('Please fill out title and department');
      return;
    }

    const newJob: JobOpening = {
      id: editingJob.id || 'job-' + Date.now(),
      title: editingJob.title,
      department: editingJob.department,
      location: editingJob.location || 'Remote',
      type: editingJob.type || 'Full-Time',
      description: editingJob.description || '',
      requirements: editingJob.requirements || []
    };

    const currentJobs = settingsForm.jobOpenings || [];
    let updatedJobs: JobOpening[] = [];

    if (editingJob.id) {
      updatedJobs = currentJobs.map(j => j.id === editingJob.id ? newJob : j);
    } else {
      updatedJobs = [...currentJobs, newJob];
    }

    const newSettings = { ...settingsForm, jobOpenings: updatedJobs };
    setSettingsForm(newSettings);
    await updateSettings(newSettings);
    showToast(`Saved career opportunity: "${editingJob.title}"`);

    setIsJobModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Delete this career opening?')) {
      const updatedJobs = (settingsForm.jobOpenings || []).filter(j => j.id !== jobId);
      const newSettings = { ...settingsForm, jobOpenings: updatedJobs };
      setSettingsForm(newSettings);
      await updateSettings(newSettings);
      showToast('Career opening deleted');
    }
  };

  const filteredMails = mails.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(mailSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(mailSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(mailSearch.toLowerCase()) ||
      (m.company && m.company.toLowerCase().includes(mailSearch.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (mailFilter === 'unread') return !m.isRead;
    if (mailFilter === 'starred') return m.isStarred;
    return true;
  });

  const unreadMailsCount = mails.filter(m => !m.isRead).length;

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950 text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-[210] px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 text-[#0066FF] border border-blue-500/30">
            <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-base tracking-wide text-white">
                {settingsForm.brandName} Master Admin Console
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>{dbConnected ? 'MongoDB Atlas Synced' : 'Active'}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Full CRUD Control over Pages, Sections, Content, Device Uploads & Inbox</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refetchAll}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Sync Data from MongoDB Atlas"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-16 sm:w-64 border-r border-slate-800 bg-slate-900/50 p-2 sm:p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <nav className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1 hidden sm:block">Main Control</p>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Dashboard Overview</span>
            </button>

            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 pt-3 pb-1 hidden sm:block">Content Datasets</p>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'services'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Services Catalog</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('casestudies')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'casestudies'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Case Studies</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {caseStudies.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'team'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Team Members</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {teamMembers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'careers'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 shrink-0 text-amber-400" />
                <span className="hidden sm:inline">Careers & Jobs</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {settingsForm.jobOpenings?.length || 0}
              </span>
            </button>

            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 pt-3 pb-1 hidden sm:block">Page Customization</p>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hero'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4 shrink-0 text-yellow-400" />
              <span className="hidden sm:inline">Hero Section</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'about'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="hidden sm:inline">About & Vision</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'contact'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="hidden sm:inline">Contact & Map</span>
            </button>

            <p className="text-[10px] uppercase font-bold text-slate-500 px-3 pt-3 pb-1 hidden sm:block">Interactions & Leads</p>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'leads'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                <span className="hidden sm:inline">Newsletter Leads</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('mails')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all justify-between ${
                activeTab === 'mails'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-indigo-400" />
                <span className="hidden sm:inline">Client Inbox</span>
              </div>
              {unreadMailsCount > 0 && (
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-bold animate-pulse">
                  {unreadMailsCount} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Branding & Legal</span>
            </button>
          </nav>

          {/* Bottom Action */}
          <div className="pt-4 mt-auto border-t border-slate-800 hidden sm:block">
            <button
              onClick={handleResetData}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 text-[11px] font-bold transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reseed Atlas Defaults</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">Master Systems Dashboard</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complete CRUD management suite connected to MongoDB Atlas database.
                </p>
              </div>

              {/* Atlas Database Connection Status Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>MongoDB Atlas Database Active</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cluster: <code className="font-mono text-emerald-300">admin.jwnuqti.mongodb.net/criftech</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    Total Records: <strong className="text-white">{services.length + caseStudies.length + teamMembers.length + leads.length + mails.length}</strong>
                  </span>
                  <button
                    onClick={refetchAll}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Atlas</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 cursor-pointer hover:border-slate-700 transition-colors" onClick={() => setActiveTab('services')}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Services</span>
                    <Layers className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{services.length}</div>
                  <p className="text-[11px] text-slate-500">Live in Catalog</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 cursor-pointer hover:border-slate-700 transition-colors" onClick={() => setActiveTab('casestudies')}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Case Studies</span>
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{caseStudies.length}</div>
                  <p className="text-[11px] text-slate-500">Portfolio Items</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 cursor-pointer hover:border-slate-700 transition-colors" onClick={() => setActiveTab('team')}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Team Members</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{teamMembers.length}</div>
                  <p className="text-[11px] text-slate-500">Profiles</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 cursor-pointer hover:border-slate-700 transition-colors" onClick={() => setActiveTab('leads')}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Newsletter Leads</span>
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-cyan-300">{leads.length}</div>
                  <p className="text-[11px] text-slate-500">Subscribers</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 cursor-pointer hover:border-slate-700 transition-colors" onClick={() => setActiveTab('mails')}>
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Inbox Mails</span>
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{mails.length}</div>
                  <p className="text-[11px] text-emerald-400 font-bold">
                    {unreadMailsCount} Unread
                  </p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setEditingService({});
                      setIsServiceModalOpen(true);
                    }}
                    className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#0066FF]">
                      <Plus className="w-4 h-4 text-[#0066FF]" />
                      <span>Add New Service</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Add service offering to catalog.</p>
                  </button>

                  <button
                    onClick={() => {
                      setEditingCaseStudy({});
                      setIsCaseStudyModalOpen(true);
                    }}
                    className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-400">
                      <Plus className="w-4 h-4 text-emerald-400" />
                      <span>Add Case Study</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Publish new client success story.</p>
                  </button>

                  <button
                    onClick={() => {
                      setEditingTeamMember({});
                      setIsTeamModalOpen(true);
                    }}
                    className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-purple-400">
                      <Plus className="w-4 h-4 text-purple-400" />
                      <span>Add Team Member</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Add leadership profile.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('hero')}
                    className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-amber-400">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Edit Hero & Headlines</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Customize home page text & images.</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SERVICES CRUD */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">Services Catalog CRUD</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage and edit all service offerings rendered across the website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingService({});
                    setIsServiceModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services by title, category, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Services List Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">Service Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Slug</th>
                        <th className="p-4">Pricing Tiers</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {services
                        .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((srv) => (
                          <tr key={srv.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-bold text-white">{srv.title}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                                {srv.category}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 font-mono text-[11px]">{srv.slug}</td>
                            <td className="p-4 text-slate-300 font-bold">
                              {srv.pricingTiers?.length || 0} Tiers
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingService(srv);
                                    setIsServiceModalOpen(true);
                                  }}
                                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                                  title="Edit Service"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete service "${srv.title}"?`)) {
                                      deleteService(srv.id);
                                      showToast(`Service "${srv.title}" deleted.`);
                                    }
                                  }}
                                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
                                  title="Delete Service"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CASE STUDIES CRUD */}
          {activeTab === 'casestudies' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">Case Studies CRUD</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage portfolio projects, metrics, and featured project cover images uploaded from your device.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCaseStudy({});
                    setIsCaseStudyModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Case Study</span>
                </button>
              </div>

              {/* Case Studies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudies.map((cs) => (
                  <div key={cs.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group flex flex-col justify-between">
                    <div className="space-y-3">
                      {cs.featuredImage && (
                        <div className="h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                          <img src={cs.featuredImage} alt={cs.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                            {cs.category}
                          </span>
                          <h3 className="text-base font-bold font-heading text-white mt-1">{cs.title}</h3>
                          <p className="text-xs text-slate-400">Client: {cs.client} &bull; {cs.industry}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingCaseStudy(cs);
                              setIsCaseStudyModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete case study "${cs.title}"?`)) {
                                deleteCaseStudy(cs.id);
                                showToast(`Case Study deleted.`);
                              }
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2">{cs.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                      {cs.techUsed.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM MEMBERS CRUD */}
          {activeTab === 'team' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">Team & Leadership CRUD</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage team member profiles and upload avatar photos directly from your device.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTeamMember({});
                    setIsTeamModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <h3 className="text-sm font-bold text-white">{member.name}</h3>
                          <p className="text-xs text-[#0066FF] font-semibold">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-3">{member.bio}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setEditingTeamMember(member);
                          setIsTeamModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${member.name}?`)) {
                            deleteTeamMember(member.id);
                            showToast(`Team member removed.`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-red-400 hover:bg-red-950"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CAREERS & JOB OPENINGS CRUD */}
          {activeTab === 'careers' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-400" />
                    <span>Careers & Open Positions CRUD</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, modify, and manage job openings rendered on the Careers page.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingJob({});
                    setIsJobModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Job Opening</span>
                </button>
              </div>

              {/* Careers Page Banner Settings */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase text-slate-400">Careers Header Content</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Careers Page Title</label>
                    <input
                      type="text"
                      value={settingsForm.careersHeaderTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, careersHeaderTitle: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300">Careers Subtitle Description</label>
                    <textarea
                      rows={2}
                      value={settingsForm.careersHeaderDesc}
                      onChange={(e) => setSettingsForm({ ...settingsForm, careersHeaderDesc: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleSaveSettings()}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Careers Banner</span>
                </button>
              </div>

              {/* Job List */}
              <div className="space-y-3">
                {(settingsForm.jobOpenings || []).map((job) => (
                  <div key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                          {job.department}
                        </span>
                        <span className="text-xs text-slate-400">{job.location} &bull; {job.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{job.title}</h3>
                      <p className="text-xs text-slate-400">{job.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setIsJobModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: HERO SECTION EDITOR */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span>Hero Section & Landing Page Content</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Customize main hero headline, subheadline, CTA buttons, and upload hero banner images from device.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Hero Badge Pill Text</label>
                  <input
                    type="text"
                    value={settingsForm.heroBadge}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Main Hero Headline</label>
                  <input
                    type="text"
                    value={settingsForm.heroHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Hero Subheadline Paragraph</label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroSubheadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={settingsForm.primaryCtaText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, primaryCtaText: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300">Secondary CTA Button Label</label>
                    <input
                      type="text"
                      value={settingsForm.secondaryCtaText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, secondaryCtaText: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Hero Tech Pills */}
                <div>
                  <label className="text-xs font-bold text-slate-300">Hero Tech Stack Pills (comma-separated)</label>
                  <input
                    type="text"
                    value={settingsForm.heroTechPills?.join(', ') || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      heroTechPills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="e.g. React & Next.js, Node & Express, Python & AI/ML, MongoDB Atlas, Docker"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-yellow-400"
                  />
                </div>

                {/* Device Image Upload for Hero Banner */}
                <ImageUploadInput
                  label="Hero Banner Media / Illustration (Device Upload Supported)"
                  value={settingsForm.heroBannerImage || ''}
                  onChange={(newUrl) => setSettingsForm({ ...settingsForm, heroBannerImage: newUrl })}
                  helpText="Upload a high-res image from your local device to replace the main hero dashboard graphic."
                />

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Section</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: ABOUT & VISION EDITOR */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <span>About Page, Mission, Vision & Stats</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage company narrative, core value propositions, and enterprise counter metrics.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">About Page Headline</label>
                  <input
                    type="text"
                    value={settingsForm.aboutHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutHeadline: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Company Narrative Story</label>
                  <textarea
                    rows={4}
                    value={settingsForm.aboutStory}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutStory: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={settingsForm.missionStatement}
                      onChange={(e) => setSettingsForm({ ...settingsForm, missionStatement: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300">Vision Statement</label>
                    <textarea
                      rows={3}
                      value={settingsForm.visionStatement}
                      onChange={(e) => setSettingsForm({ ...settingsForm, visionStatement: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Enterprise Counter Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(settingsForm.stats || []).map((st, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const newStats = [...(settingsForm.stats || [])];
                              newStats[idx].value = e.target.value;
                              setSettingsForm({ ...settingsForm, stats: newStats });
                            }}
                            placeholder="Value (e.g. 180)"
                            className="w-1/2 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                          />
                          <input
                            type="text"
                            value={st.suffix}
                            onChange={(e) => {
                              const newStats = [...(settingsForm.stats || [])];
                              newStats[idx].suffix = e.target.value;
                              setSettingsForm({ ...settingsForm, stats: newStats });
                            }}
                            placeholder="Suffix (e.g. +)"
                            className="w-1/2 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...(settingsForm.stats || [])];
                            newStats[idx].label = e.target.value;
                            setSettingsForm({ ...settingsForm, stats: newStats });
                          }}
                          placeholder="Stat Label"
                          className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Content</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: CONTACT & MAP EDITOR */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-rose-400" />
                  <span>Contact Page & Footer Details</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage physical address, support email, hotline numbers, operating hours, and Google Maps location.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Support Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300">Phone Hotline</label>
                    <input
                      type="text"
                      value={settingsForm.contactPhone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Physical Office Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Operating Hours</label>
                  <input
                    type="text"
                    value={settingsForm.operatingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, operatingHours: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Google Maps Embed URL</label>
                  <input
                    type="text"
                    value={settingsForm.mapEmbedUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, mapEmbedUrl: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400 font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: LEADS AREA */}
          {activeTab === 'leads' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-cyan-400" />
                    <span>Website Newsletter Leads</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Export email addresses subscribed to our newsletter via footer & CTA forms.
                  </p>
                </div>

                <button
                  onClick={handleCopyEmails}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy All Emails</span>
                </button>
              </div>

              {/* Add Manual Lead Form */}
              <form onSubmit={handleAddLeadSubmit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  required
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="Enter email address to add to subscriber database manually..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </button>
              </form>

              {/* Leads Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">Subscriber Email</th>
                        <th className="p-4">Subscription Source</th>
                        <th className="p-4">Subscribed At</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                            No subscriber leads found in MongoDB Atlas yet.
                          </td>
                        </tr>
                      ) : (
                        leads
                          .filter(l => l.email.toLowerCase().includes(leadSearch.toLowerCase()) || l.source.toLowerCase().includes(leadSearch.toLowerCase()))
                          .map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                              <td className="p-4 font-bold text-white font-mono">{lead.email}</td>
                              <td className="p-4 text-slate-300">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 text-[11px]">
                                  {lead.source}
                                </span>
                              </td>
                              <td className="p-4 text-slate-400 text-[11px]">
                                {new Date(lead.subscribedAt).toLocaleString()}
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  lead.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Remove subscriber lead ${lead.email}?`)) {
                                      deleteLead(lead.id);
                                      showToast(`Deleted lead ${lead.email}`);
                                    }
                                  }}
                                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MAILS AREA */}
          {activeTab === 'mails' && (
            <div className="space-y-6 max-w-6xl mx-auto h-full flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                    <Mail className="w-6 h-6 text-indigo-400" />
                    <span>Client Inquiry Inbox</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Read and manage client message inquiries submitted through website contact forms.
                  </p>
                </div>

                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setMailFilter('all')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${mailFilter === 'all' ? 'bg-[#0066FF] text-white' : 'text-slate-400'}`}
                  >
                    All ({mails.length})
                  </button>
                  <button
                    onClick={() => setMailFilter('unread')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${mailFilter === 'unread' ? 'bg-[#0066FF] text-white' : 'text-slate-400'}`}
                  >
                    Unread ({unreadMailsCount})
                  </button>
                  <button
                    onClick={() => setMailFilter('starred')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${mailFilter === 'starred' ? 'bg-[#0066FF] text-white' : 'text-slate-400'}`}
                  >
                    Starred ({mails.filter(m => m.isStarred).length})
                  </button>
                </div>
              </div>

              {/* Split Screen Mail Inbox */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[500px]">
                
                {/* Left Side: Email List */}
                <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-2 space-y-2 overflow-y-auto max-h-[600px]">
                  {filteredMails.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                      <Mail className="w-8 h-8 text-slate-700 mx-auto" />
                      <p>No mails match your current filter.</p>
                    </div>
                  ) : (
                    filteredMails.map((m) => {
                      const isSelected = selectedMail?.id === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => {
                            setSelectedMail(m);
                            if (!m.isRead) {
                              updateMail(m.id, { isRead: true });
                            }
                          }}
                          className={`p-3.5 rounded-xl cursor-pointer border transition-all ${
                            isSelected 
                              ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-md' 
                              : m.isRead 
                                ? 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50' 
                                : 'bg-slate-950 border-slate-700 text-white font-semibold hover:bg-slate-800/80 ring-1 ring-blue-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {!m.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>}
                              <span className="text-xs font-bold truncate">{m.name}</span>
                              {m.company && <span className="text-[11px] text-slate-400 truncate">({m.company})</span>}
                            </div>
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateMail(m.id, { isStarred: !m.isStarred });
                              }}
                              className="text-slate-500 hover:text-amber-400 p-1"
                            >
                              <Star className={`w-3.5 h-3.5 ${m.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                          </div>

                          <div className="text-xs font-medium text-slate-200 mt-1 truncate">
                            {m.service || 'Contact Request'} &bull; {m.budget || 'Custom'}
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{m.message}</p>

                          <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between">
                            <span>{new Date(m.submittedAt).toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Side: Message Detail */}
                <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
                  {selectedMail ? (
                    <div className="space-y-6">
                      <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white">{selectedMail.name}</h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold">
                              {selectedMail.service || 'Inquiry'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Email: <a href={`mailto:${selectedMail.email}`} className="text-[#0066FF] hover:underline font-semibold">{selectedMail.email}</a>
                            {selectedMail.company && <span> &bull; Company: {selectedMail.company}</span>}
                            {selectedMail.budget && <span> &bull; Budget: <strong className="text-emerald-400">{selectedMail.budget}</strong></span>}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Received: {new Date(selectedMail.submittedAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${selectedMail.email}?subject=Re: CrifTech - ${encodeURIComponent(selectedMail.service || 'Inquiry')}&body=${encodeURIComponent('\n\n--- Original Inquiry from ' + selectedMail.name + ' ---\n' + selectedMail.message)}`}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>

                          <button
                            onClick={() => {
                              const newRead = !selectedMail.isRead;
                              updateMail(selectedMail.id, { isRead: newRead });
                              setSelectedMail({ ...selectedMail, isRead: newRead });
                              showToast(newRead ? 'Marked as Read' : 'Marked as Unread');
                            }}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
                            title={selectedMail.isRead ? 'Mark Unread' : 'Mark Read'}
                          >
                            {selectedMail.isRead ? 'Mark Unread' : 'Mark Read'}
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm('Delete this mail message?')) {
                                deleteMail(selectedMail.id);
                                setSelectedMail(null);
                                showToast('Message deleted.');
                              }
                            }}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Project Message Body</label>
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {selectedMail.message}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Internal Admin Notes</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={adminNoteInput || selectedMail.notes || ''}
                            onChange={(e) => setAdminNoteInput(e.target.value)}
                            placeholder="Add internal follow-up notes..."
                            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => {
                              const noteToSave = adminNoteInput || selectedMail.notes || '';
                              updateMail(selectedMail.id, { notes: noteToSave });
                              setSelectedMail({ ...selectedMail, notes: noteToSave });
                              showToast('Admin note saved.');
                            }}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs space-y-2 py-20">
                      <Inbox className="w-10 h-10 text-slate-700" />
                      <p>Select a message from the inbox to read details.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB: BRANDING & LEGAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                  <Palette className="w-6 h-6 text-[#0066FF]" />
                  <span>Branding & Legal Policies Settings</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage brand name, tagline, brand logo image upload, primary color, and legal policy pages.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.brandName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300">Primary Theme Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={settingsForm.primaryColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                        className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settingsForm.primaryColor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Brand Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                {/* Device Logo Image Upload */}
                <ImageUploadInput
                  label="Brand Logo Image (Upload from Local Device)"
                  value={settingsForm.logoUrl || ''}
                  onChange={(newUrl) => setSettingsForm({ ...settingsForm, logoUrl: newUrl })}
                  helpText="Upload a logo image file from your device. If empty, the text Brand Name will be rendered."
                />

                {/* Logo Resizer Section */}
                <div className="pt-5 border-t border-slate-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Logo Resizer &amp; Badge Styling
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: {
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
                          }
                        });
                        showToast('Logo sizing reset to defaults');
                      }}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-bold border border-slate-800 transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Logo Sizing
                    </button>
                  </div>

                  {/* Live Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Navbar Preview</p>
                        <span className="text-[10px] font-mono text-slate-400">
                          {(settingsForm.logoSizeConfig?.navbarHeightPx || 40)}px H
                        </span>
                      </div>
                      <div className="h-16 px-4 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center">
                        <CrifTechLogo
                          variant="navbar"
                          previewOverrides={settingsForm.logoSizeConfig}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Footer Preview</p>
                        <span className="text-[10px] font-mono text-slate-400">
                          {(settingsForm.logoSizeConfig?.footerHeightPx || 36)}px H
                        </span>
                      </div>
                      <div className="h-20 px-4 rounded-lg bg-slate-900/70 border border-slate-800 flex items-end pb-4">
                        <CrifTechLogo
                          variant="footer"
                          previewOverrides={settingsForm.logoSizeConfig}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navbar Size Controls */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-[11px] font-bold uppercase text-[#0066FF] tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                      Navbar Logo
                    </h4>

                    <SliderRow
                      label="Height"
                      value={settingsForm.logoSizeConfig?.navbarHeightPx || 40}
                      min={20}
                      max={64}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarHeightPx: v }
                      })}
                    />

                    <SliderRow
                      label="Minimum Width"
                      value={settingsForm.logoSizeConfig?.navbarMinWidthPx || 120}
                      min={60}
                      max={280}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarMinWidthPx: v }
                      })}
                    />

                    <SliderRow
                      label="Corner Radius"
                      value={settingsForm.logoSizeConfig?.navbarRadiusPx || 12}
                      min={0}
                      max={24}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarRadiusPx: v }
                      })}
                    />
                  </div>

                  {/* Footer Size Controls */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Footer Logo
                    </h4>

                    <SliderRow
                      label="Height"
                      value={settingsForm.logoSizeConfig?.footerHeightPx || 36}
                      min={16}
                      max={56}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), footerHeightPx: v }
                      })}
                    />

                    <SliderRow
                      label="Minimum Width"
                      value={settingsForm.logoSizeConfig?.footerMinWidthPx || 100}
                      min={50}
                      max={240}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), footerMinWidthPx: v }
                      })}
                    />

                    <SliderRow
                      label="Corner Radius"
                      value={settingsForm.logoSizeConfig?.footerRadiusPx || 10}
                      min={0}
                      max={20}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), footerRadiusPx: v }
                      })}
                    />
                  </div>

                  {/* Badge / Wrapper Controls */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <h4 className="text-[11px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Badge Wrapper &amp; Styling
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <ToggleRow
                        label="Badge Wrapper"
                        description="Dark gradient frame around logo"
                        checked={settingsForm.logoSizeConfig?.wrapperEnabled ?? true}
                        onChange={(c) => setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), wrapperEnabled: c }
                        })}
                      />
                      <ToggleRow
                        label="Drop Shadow"
                        description="Subtle elevation shadow"
                        checked={settingsForm.logoSizeConfig?.wrapperShadow ?? true}
                        onChange={(c) => setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), wrapperShadow: c }
                        })}
                      />
                      <ToggleRow
                        label="Blue Glow"
                        description="Tinted #0066FF glow"
                        checked={settingsForm.logoSizeConfig?.wrapperBlueGlow ?? true}
                        onChange={(c) => setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), wrapperBlueGlow: c }
                        })}
                      />
                    </div>

                    <SliderRow
                      label="Wrapper Padding"
                      value={settingsForm.logoSizeConfig?.wrapperPaddingPx || 6}
                      min={0}
                      max={16}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), wrapperPaddingPx: v }
                      })}
                    />
                  </div>

                  {/* Position & Zoom Controls */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-bold uppercase text-pink-400 tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        Navbar Position &amp; Zoom
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: {
                            ...(settingsForm.logoSizeConfig || {} as any),
                            navbarZoom: 1,
                            navbarOffsetXPx: 0,
                            navbarOffsetYPx: 0
                          }
                        })}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-bold border border-slate-800 transition-all"
                      >
                        Reset Pos/Zoom
                      </button>
                    </div>

                    <SliderRow
                      label="Zoom Level"
                      value={Math.round((settingsForm.logoSizeConfig?.navbarZoom || 1) * 1000)}
                      min={500}
                      max={2500}
                      suffix="×"
                      displayValue={Math.round((settingsForm.logoSizeConfig?.navbarZoom || 1) * 100) / 100}
                      displayMin={0.5}
                      displayMax={2.5}
                      onChange={(rawV) => {
                        const z = rawV / 1000;
                        setSettingsForm({
                          ...settingsForm,
                          logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarZoom: z }
                        });
                      }}
                    />

                    <SliderRow
                      label="Horizontal Position"
                      value={settingsForm.logoSizeConfig?.navbarOffsetXPx || 0}
                      min={-200}
                      max={200}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarOffsetXPx: v }
                      })}
                    />

                    <SliderRow
                      label="Vertical Position"
                      value={settingsForm.logoSizeConfig?.navbarOffsetYPx || 0}
                      min={-30}
                      max={30}
                      suffix="px"
                      onChange={(v) => setSettingsForm({
                        ...settingsForm,
                        logoSizeConfig: { ...(settingsForm.logoSizeConfig || {} as any), navbarOffsetYPx: v }
                      })}
                    />

                    <div className="text-[10px] text-slate-500 leading-relaxed pt-1 border-t border-slate-800/70">
                      <span className="font-bold text-slate-400">Live shortcuts (on navbar logo):</span> Scroll wheel to zoom (Ctrl=fine), drag body to move, drag edges/corners to resize, double-click to reset position &amp; zoom.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase text-slate-400">Legal Policy Pages</h3>
                  <div>
                    <label className="text-xs font-bold text-slate-300">Privacy Policy Text</label>
                    <textarea
                      rows={3}
                      value={settingsForm.privacyPolicyText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, privacyPolicyText: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300">Terms of Service Text</label>
                    <textarea
                      rows={3}
                      value={settingsForm.termsOfServiceText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, termsOfServiceText: e.target.value })}
                      className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Settings & Branding</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* --- SERVICE CRUD MODAL --- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[220] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-base font-bold text-white">
                {editingService?.id ? 'Edit Service Offering' : 'Add New Service Offering'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 overflow-y-auto space-y-5 flex-1 max-h-[80vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService?.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    placeholder="e.g. Full-Stack Web Development"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Category</label>
                  <select
                    value={editingService?.category || 'Core Development'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as ServiceCategory })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Core Development">Core Development</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Design & Growth">Design & Growth</option>
                    <option value="Cloud & QA">Cloud & QA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">URL Slug</label>
                  <input
                    type="text"
                    value={editingService?.slug || ''}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    placeholder="e.g. full-stack-web-development"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF] font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Icon Name</label>
                  <select
                    value={editingService?.iconName || 'Code'}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Code">Code / Web Dev</option>
                    <option value="Cpu">Cpu / AI & ML</option>
                    <option value="Layers">Layers / Architecture</option>
                    <option value="Globe">Globe / Mobile & Cloud</option>
                    <option value="Database">Database / Data Analytics</option>
                    <option value="ShieldCheck">ShieldCheck / Security & QA</option>
                    <option value="Zap">Zap / Performance</option>
                    <option value="Star">Star / Product Strategy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Short Summary</label>
                <input
                  type="text"
                  required
                  value={editingService?.shortDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  placeholder="1-2 sentence overview..."
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Full Description</label>
                <textarea
                  rows={3}
                  value={editingService?.fullDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  placeholder="Detailed service explanation..."
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Tech Stack comma separated */}
              <div>
                <label className="text-xs font-bold text-slate-300">Tech Stack Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={editingService?.techStack?.flatMap(t => t.items).join(', ') || ''}
                  onChange={(e) => {
                    const items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingService({
                      ...editingService,
                      techStack: [{ category: 'Core Stack', items }]
                    });
                  }}
                  placeholder="e.g. React, Next.js, Node.js, Express, MongoDB Atlas, TypeScript, Docker"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              {/* Problem Statement Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400">Problem Statement Solved</h4>
                <div>
                  <label className="text-[11px] font-bold text-slate-300">Headline</label>
                  <input
                    type="text"
                    value={editingService?.problemStatement?.headline || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      problemStatement: {
                        headline: e.target.value,
                        points: editingService?.problemStatement?.points || []
                      }
                    })}
                    placeholder="e.g. Legacy Systems Slow Down Market Expansion"
                    className="w-full px-3 py-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300">Problem Points (one per line)</label>
                  <textarea
                    rows={2}
                    value={editingService?.problemStatement?.points?.join('\n') || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      problemStatement: {
                        headline: editingService?.problemStatement?.headline || '',
                        points: e.target.value.split('\n').filter(Boolean)
                      }
                    })}
                    placeholder="High maintenance costs&#10;Inability to scale under heavy traffic load"
                    className="w-full px-3 py-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Case Study Highlight */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400">Featured Client Impact Highlight</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300">Client Name</label>
                    <input
                      type="text"
                      value={editingService?.caseStudyHighlight?.client || ''}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        caseStudyHighlight: {
                          ...editingService?.caseStudyHighlight,
                          client: e.target.value,
                          metrics: editingService?.caseStudyHighlight?.metrics || '',
                          title: editingService?.caseStudyHighlight?.title || '',
                          summary: editingService?.caseStudyHighlight?.summary || ''
                        }
                      })}
                      placeholder="e.g. HealthTech Global"
                      className="w-full px-3 py-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300">Key Metric Highlight</label>
                    <input
                      type="text"
                      value={editingService?.caseStudyHighlight?.metrics || ''}
                      onChange={(e) => setEditingService({
                        ...editingService,
                        caseStudyHighlight: {
                          ...editingService?.caseStudyHighlight,
                          metrics: e.target.value,
                          client: editingService?.caseStudyHighlight?.client || '',
                          title: editingService?.caseStudyHighlight?.title || '',
                          summary: editingService?.caseStudyHighlight?.summary || ''
                        }
                      })}
                      placeholder="e.g. 10x Scale in 90 Days"
                      className="w-full px-3 py-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Tiers */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Pricing Packages ({editingService?.pricingTiers?.length || 0})</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = editingService?.pricingTiers || [];
                      setEditingService({
                        ...editingService,
                        pricingTiers: [...current, { name: 'New Tier', price: '$2,500', timeline: '2-4 Weeks', description: 'Package overview', features: ['Feature 1', 'Feature 2'] }]
                      });
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 font-bold hover:bg-blue-600/50 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Tier
                  </button>
                </div>

                <div className="space-y-2">
                  {(editingService?.pricingTiers || []).map((tier, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => {
                            const tiers = [...(editingService?.pricingTiers || [])];
                            tiers[tIdx].name = e.target.value;
                            setEditingService({ ...editingService, pricingTiers: tiers });
                          }}
                          placeholder="Tier Name"
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white"
                        />
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => {
                            const tiers = [...(editingService?.pricingTiers || [])];
                            tiers[tIdx].price = e.target.value;
                            setEditingService({ ...editingService, pricingTiers: tiers });
                          }}
                          placeholder="Price"
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white font-bold"
                        />
                        <input
                          type="text"
                          value={tier.timeline}
                          onChange={(e) => {
                            const tiers = [...(editingService?.pricingTiers || [])];
                            tiers[tIdx].timeline = e.target.value;
                            setEditingService({ ...editingService, pricingTiers: tiers });
                          }}
                          placeholder="Timeline"
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white"
                        />
                        <input
                          type="text"
                          value={tier.features.join(', ')}
                          onChange={(e) => {
                            const tiers = [...(editingService?.pricingTiers || [])];
                            tiers[tIdx].features = e.target.value.split(',').map(s => s.trim());
                            setEditingService({ ...editingService, pricingTiers: tiers });
                          }}
                          placeholder="Features (comma separated)"
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const tiers = (editingService?.pricingTiers || []).filter((_, i) => i !== tIdx);
                          setEditingService({ ...editingService, pricingTiers: tiers });
                        }}
                        className="p-1 rounded text-red-400 hover:bg-red-950 self-end sm:self-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold shadow-lg"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CASE STUDY CRUD MODAL --- */}
      {isCaseStudyModalOpen && (
        <div className="fixed inset-0 z-[220] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-base font-bold text-white">
                {editingCaseStudy?.id ? 'Edit Case Study' : 'Add New Case Study'}
              </h3>
              <button onClick={() => setIsCaseStudyModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCaseStudy} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingCaseStudy?.title || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, title: e.target.value })}
                    placeholder="e.g. NextGen FinTech Platform"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingCaseStudy?.client || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, client: e.target.value })}
                    placeholder="e.g. Nexus Global"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Industry</label>
                  <input
                    type="text"
                    value={editingCaseStudy?.industry || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, industry: e.target.value })}
                    placeholder="Fintech, Healthcare, AI, E-Commerce..."
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Category</label>
                  <select
                    value={editingCaseStudy?.category || 'Web'}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Summary Overview</label>
                <textarea
                  rows={2}
                  value={editingCaseStudy?.summary || ''}
                  onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, summary: e.target.value })}
                  placeholder="Case study summary..."
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Tech Used */}
              <div>
                <label className="text-xs font-bold text-slate-300">Technologies Used (comma-separated)</label>
                <input
                  type="text"
                  value={editingCaseStudy?.techUsed?.join(', ') || ''}
                  onChange={(e) => setEditingCaseStudy({
                    ...editingCaseStudy,
                    techUsed: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="e.g. Next.js, Python, TensorFlow, AWS SageMaker, PostgreSQL"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">The Business Challenge</label>
                  <textarea
                    rows={3}
                    value={editingCaseStudy?.challenge || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, challenge: e.target.value })}
                    placeholder="Describe legacy bottlenecks, goals, and stakes..."
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">The Engineering Solution</label>
                  <textarea
                    rows={3}
                    value={editingCaseStudy?.solution || ''}
                    onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, solution: e.target.value })}
                    placeholder="Architectural design, models built, and cloud deployment..."
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Key Results */}
              <div>
                <label className="text-xs font-bold text-slate-300">Key Business Results (one per line)</label>
                <textarea
                  rows={2}
                  value={editingCaseStudy?.results?.join('\n') || ''}
                  onChange={(e) => setEditingCaseStudy({
                    ...editingCaseStudy,
                    results: e.target.value.split('\n').filter(Boolean)
                  })}
                  placeholder="Reduced latency by 65%&#10;Onboarded 500k active users without downtime"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Upload Featured Cover Image from Device */}
              <ImageUploadInput
                label="Featured Cover Image (Upload from Local Device)"
                value={editingCaseStudy?.featuredImage || ''}
                onChange={(newUrl) => setEditingCaseStudy({ ...editingCaseStudy, featuredImage: newUrl })}
                helpText="Upload a portfolio preview graphic directly from your device."
              />

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCaseStudyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TEAM MEMBER CRUD MODAL --- */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[220] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-base font-bold text-white">
                {editingTeamMember?.id ? 'Edit Team Profile' : 'Add New Team Member'}
              </h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="text-xs font-bold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingTeamMember?.name || ''}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Role Title</label>
                <input
                  type="text"
                  required
                  value={editingTeamMember?.role || ''}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                  placeholder="e.g. Chief Technology Officer"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Bio</label>
                <textarea
                  rows={2}
                  value={editingTeamMember?.bio || ''}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                  placeholder="Professional summary..."
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={editingTeamMember?.linkedin || ''}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={editingTeamMember?.github || ''}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Expertise Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingTeamMember?.expertise?.join(', ') || ''}
                  onChange={(e) => setEditingTeamMember({
                    ...editingTeamMember,
                    expertise: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="e.g. Distributed Systems, Cloud Security, Gemini AI"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Upload Avatar Photo from Device */}
              <ImageUploadInput
                label="Avatar Photo (Upload from Local Device)"
                value={editingTeamMember?.avatar || ''}
                onChange={(newUrl) => setEditingTeamMember({ ...editingTeamMember, avatar: newUrl })}
                helpText="Upload a headshot image file from your device."
              />

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- JOB OPENING CRUD MODAL --- */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-[220] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-base font-bold text-white">
                {editingJob?.id ? 'Edit Job Opening' : 'Add New Job Opening'}
              </h3>
              <button onClick={() => setIsJobModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="text-xs font-bold text-slate-300">Position Title</label>
                <input
                  type="text"
                  required
                  value={editingJob?.title || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  placeholder="e.g. Senior AI Systems Engineer"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Department</label>
                  <input
                    type="text"
                    required
                    value={editingJob?.department || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    placeholder="Engineering, Design, AI Lab..."
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Job Type</label>
                  <select
                    value={editingJob?.type || 'Full-Time'}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Location</label>
                <input
                  type="text"
                  value={editingJob?.location || 'San Francisco, CA / Remote'}
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={editingJob?.description || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  placeholder="Responsibilities & team overview..."
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Key Requirements (one per line)</label>
                <textarea
                  rows={3}
                  value={editingJob?.requirements?.join('\n') || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, requirements: e.target.value.split('\n').filter(Boolean) })}
                  placeholder="5+ years experience in Node.js & TypeScript&#10;Deep understanding of cloud computing & MongoDB"
                  className="w-full px-3.5 py-2 mt-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
