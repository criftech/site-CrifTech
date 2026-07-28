import mongoose from 'mongoose';
import { ALL_SERVICES } from '../src/data/servicesData.js';
import { CASE_STUDIES, TEAM_MEMBERS } from '../src/data/contentData.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://criftech_db_user:yvfjvDsb2Kys8IuI@admin.jwnuqti.mongodb.net/criftech?retryWrites=true&w=majority';

// 1. Service Schema
const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  iconName: { type: String, required: true },
  problemStatement: {
    headline: { type: String, default: '' },
    points: [{ type: String }]
  },
  processSteps: [{
    number: String,
    title: String,
    description: String,
    deliverables: [String]
  }],
  techStack: [{
    category: String,
    items: [String]
  }],
  caseStudyHighlight: {
    client: String,
    metrics: String,
    title: String,
    summary: String
  },
  pricingTiers: [{
    name: String,
    price: String,
    timeline: String,
    description: String,
    features: [String],
    recommended: Boolean
  }],
  faqs: [{
    question: String,
    answer: String,
    category: String
  }]
}, { timestamps: true });

// 2. Case Study Schema
const CaseStudySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  metrics: [{
    label: String,
    value: String,
    suffix: String
  }],
  challenge: { type: String, default: '' },
  solution: { type: String, default: '' },
  results: [{ type: String }],
  techUsed: [{ type: String }],
  featuredImage: { type: String, default: '' }
}, { timestamps: true });

// 3. Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  expertise: [{ type: String }]
}, { timestamps: true });

// 4. Lead Schema (Newsletter Subscribers)
const LeadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true },
  subscribedAt: { type: String, required: true },
  source: { type: String, default: 'Footer Newsletter' },
  status: { type: String, enum: ['Active', 'Unsubscribed'], default: 'Active' }
}, { timestamps: true });

LeadSchema.index({ email: 1 }, { unique: true });

// 5. Mail Schema (Contact Form Detailed Inquiries)
const MailSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  budget: { type: String, default: '' },
  message: { type: String, required: true },
  submittedAt: { type: String, required: true },
  type: { type: String, default: 'Contact Form' },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  notes: { type: String, default: '' }
}, { timestamps: true });

// 6. Site Settings Schema
const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'site_settings' },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

export const ServiceModel = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const CaseStudyModel = mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
export const TeamMemberModel = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
export const LeadModel = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export const MailModel = mongoose.models.Mail || mongoose.model('Mail', MailSchema);
export const SettingModel = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log('✅ Connected to MongoDB Atlas successfully');
    await seedDatabase();
  } catch (err: any) {
    console.warn('⚠️ MongoDB Atlas connection skipped or failed (IP whitelist/network restriction). Running in resilient in-memory mode.');
  }
}

// --- In-Memory Fallback Store ---
let memorySettings: any = null;
let memoryServices: any[] = [...ALL_SERVICES];
let memoryCaseStudies: any[] = [...CASE_STUDIES];
let memoryTeam: any[] = [...TEAM_MEMBERS];
let memoryLeads: any[] = [
  {
    id: 'lead-1',
    email: 'cto@nexusfintech.com',
    subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    source: 'Footer Newsletter',
    status: 'Active'
  },
  {
    id: 'lead-2',
    email: 'founder@hypercloud.io',
    subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    source: 'Footer Newsletter',
    status: 'Active'
  }
];
let memoryMails: any[] = [
  {
    id: 'mail-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@vertexlabs.ai',
    company: 'Vertex Labs AI',
    service: 'AI & Machine Learning',
    budget: '$50,000 - $100,000',
    message: 'Hello CrifTech team, we are looking to integrate a custom GenAI agent pipeline into our enterprise SaaS platform.',
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    type: 'Contact Form',
    isRead: false,
    isStarred: true,
    notes: 'High priority lead.'
  }
];

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export async function getSettingsData() {
  if (isDbConnected()) {
    try {
      const setting = await SettingModel.findOne({ key: 'site_settings' } as any);
      if (setting?.data) return setting.data;
    } catch (e) {
      // fallback
    }
  }
  return memorySettings;
}

export async function saveSettingsData(data: any) {
  memorySettings = data;
  if (isDbConnected()) {
    try {
      await SettingModel.findOneAndUpdate(
        { key: 'site_settings' } as any,
        { key: 'site_settings', data },
        { upsert: true, returnDocument: 'after' } as any
      );
    } catch (e) {
      // fallback
    }
  }
  return memorySettings;
}

export async function getServicesData() {
  if (isDbConnected()) {
    try {
      const services = await ServiceModel.find().sort({ createdAt: 1 });
      if (services && services.length > 0) return services;
    } catch (e) {
      // fallback
    }
  }
  return memoryServices;
}

export async function addServiceData(item: any) {
  memoryServices.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new ServiceModel(item);
      await newDoc.save();
    } catch (e) {
      // fallback
    }
  }
  return item;
}

export async function updateServiceData(id: string, item: any) {
  const index = memoryServices.findIndex(s => s.id === id);
  if (index !== -1) {
    memoryServices[index] = { ...memoryServices[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await ServiceModel.findOneAndUpdate({ id } as any, item, { returnDocument: 'after' } as any);
    } catch (e) {
      // fallback
    }
  }
  return memoryServices[index] || item;
}

export async function deleteServiceData(id: string) {
  memoryServices = memoryServices.filter(s => s.id !== id);
  if (isDbConnected()) {
    try {
      await ServiceModel.deleteOne({ id } as any);
    } catch (e) {
      // fallback
    }
  }
  return true;
}

export async function getCaseStudiesData() {
  if (isDbConnected()) {
    try {
      const cs = await CaseStudyModel.find().sort({ createdAt: 1 });
      if (cs && cs.length > 0) return cs;
    } catch (e) {
      // fallback
    }
  }
  return memoryCaseStudies;
}

export async function addCaseStudyData(item: any) {
  memoryCaseStudies.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new CaseStudyModel(item);
      await newDoc.save();
    } catch (e) {
      // fallback
    }
  }
  return item;
}

export async function updateCaseStudyData(id: string, item: any) {
  const index = memoryCaseStudies.findIndex(c => c.id === id);
  if (index !== -1) {
    memoryCaseStudies[index] = { ...memoryCaseStudies[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await CaseStudyModel.findOneAndUpdate({ id } as any, item, { returnDocument: 'after' } as any);
    } catch (e) {
      // fallback
    }
  }
  return memoryCaseStudies[index] || item;
}

export async function deleteCaseStudyData(id: string) {
  memoryCaseStudies = memoryCaseStudies.filter(c => c.id !== id);
  if (isDbConnected()) {
    try {
      await CaseStudyModel.deleteOne({ id } as any);
    } catch (e) {
      // fallback
    }
  }
  return true;
}

export async function getTeamData() {
  if (isDbConnected()) {
    try {
      const members = await TeamMemberModel.find().sort({ createdAt: 1 });
      if (members && members.length > 0) return members;
    } catch (e) {
      // fallback
    }
  }
  return memoryTeam;
}

export async function addTeamData(item: any) {
  memoryTeam.push(item);
  if (isDbConnected()) {
    try {
      const newDoc = new TeamMemberModel(item);
      await newDoc.save();
    } catch (e) {
      // fallback
    }
  }
  return item;
}

export async function updateTeamData(id: string, item: any) {
  const index = memoryTeam.findIndex(t => t.id === id);
  if (index !== -1) {
    memoryTeam[index] = { ...memoryTeam[index], ...item };
  }
  if (isDbConnected()) {
    try {
      await TeamMemberModel.findOneAndUpdate({ id } as any, item, { returnDocument: 'after' } as any);
    } catch (e) {
      // fallback
    }
  }
  return memoryTeam[index] || item;
}

export async function deleteTeamData(id: string) {
  memoryTeam = memoryTeam.filter(t => t.id !== id);
  if (isDbConnected()) {
    try {
      await TeamMemberModel.deleteOne({ id } as any);
    } catch (e) {
      // fallback
    }
  }
  return true;
}

export async function getLeadsData() {
  if (isDbConnected()) {
    try {
      const leads = await LeadModel.find().sort({ createdAt: -1 });
      if (leads && leads.length > 0) return leads;
    } catch (e) {
      // fallback
    }
  }
  return memoryLeads;
}

export async function addLeadData(email: string, source: string): Promise<{
  lead: any;
  isDuplicate: boolean;
  firstSubscribedAt: string;
  subscribedAt: string;
}> {
  const normEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  // Tier 1: MongoDB is authoritative — check first (prevents duplicates on restart)
  if (isDbConnected()) {
    try {
      const existingMongo = await LeadModel.findOne({ email: normEmail } as any).lean();
      if (existingMongo) {
        // Keep the Mongo record, but ensure status is Active and sync into memory cache.
        try {
          await LeadModel.updateOne(
            { email: normEmail } as any,
            { $set: { status: 'Active' } }
          );
        } catch { /* ignore, record still matches */ }
        const finalLead = { ...(existingMongo as any), status: 'Active' as const };
        // Also sync to memory cache for in-memory reads
        const inMemIdx = memoryLeads.findIndex(l => l.email.toLowerCase() === normEmail);
        if (inMemIdx >= 0) memoryLeads[inMemIdx] = finalLead;
        else memoryLeads.unshift(finalLead);
        return {
          lead: finalLead,
          isDuplicate: true,
          firstSubscribedAt: finalLead.subscribedAt || now,
          subscribedAt: now
        };
      }
    } catch (e) {
      // fall through to in-memory check
    }
  }

  // Tier 2: in-memory fallback check
  const memExisting = memoryLeads.find(l => l.email.toLowerCase() === normEmail);
  if (memExisting) {
    memExisting.status = 'Active';
    memExisting.subscribedAt = now;
    // Attempt to sync back to Mongo if DB just came up
    if (isDbConnected()) {
      try {
        await LeadModel.findOneAndUpdate(
          { email: normEmail } as any,
          { $set: { status: 'Active' } },
          { upsert: true, returnDocument: 'after', new: false as any }
        );
      } catch (e) { /* ignore */ }
    }
    return {
      lead: memExisting,
      isDuplicate: true,
      firstSubscribedAt: memExisting.subscribedAt || now,
      subscribedAt: now
    };
  }

  // Brand new subscriber
  const newLead = {
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    email: normEmail,
    subscribedAt: now,
    source: source || 'Footer Newsletter',
    status: 'Active'
  };
  memoryLeads.unshift(newLead);

  if (isDbConnected()) {
    try {
      const dbLead = new LeadModel(newLead);
      await dbLead.save();
    } catch (e: any) {
      // Mongo unique-constraint race condition — same email inserted between findOne & save
      if (e?.code === 11000 || String(e?.message || '').includes('duplicate key') || String(e?.message || '').includes('E11000')) {
        try {
          const existing = await LeadModel.findOne({ email: normEmail } as any).lean();
          if (existing) {
            return {
              lead: existing,
              isDuplicate: true,
              firstSubscribedAt: (existing as any).subscribedAt || now,
              subscribedAt: now
            };
          }
        } catch { /* ignore */ }
      }
      // otherwise silently swallow (memory already has the record)
    }
  }
  return {
    lead: newLead,
    isDuplicate: false,
    firstSubscribedAt: now,
    subscribedAt: now
  };
}

export async function deleteLeadData(id: string) {
  memoryLeads = memoryLeads.filter(l => l.id !== id);
  if (isDbConnected()) {
    try {
      await LeadModel.deleteOne({ id } as any);
    } catch (e) {
      // fallback
    }
  }
  return true;
}

export async function getMailsData() {
  if (isDbConnected()) {
    try {
      const mails = await MailModel.find().sort({ createdAt: -1 });
      if (mails && mails.length > 0) return mails;
    } catch (e) {
      // fallback
    }
  }
  return memoryMails;
}

export async function addMailData(mailData: any) {
  const newMail = {
    id: 'mail-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    name: (mailData.name || '').trim(),
    email: (mailData.email || '').trim(),
    company: mailData.company || '',
    service: mailData.service || 'General Inquiry',
    budget: mailData.budget || 'Not specified',
    message: (mailData.message || '').trim(),
    submittedAt: new Date().toISOString(),
    type: mailData.type || 'Contact Form',
    isRead: false,
    isStarred: false,
    notes: ''
  };
  memoryMails.unshift(newMail);

  if (isDbConnected()) {
    try {
      const dbMail = new MailModel(newMail);
      await dbMail.save();
    } catch (e) {
      // fallback
    }
  }
  return newMail;
}

export async function updateMailData(id: string, fields: any) {
  const index = memoryMails.findIndex(m => m.id === id);
  if (index !== -1) {
    memoryMails[index] = { ...memoryMails[index], ...fields };
  }
  if (isDbConnected()) {
    try {
      await MailModel.findOneAndUpdate({ id } as any, { $set: fields }, { returnDocument: 'after' } as any);
    } catch (e) {
      // fallback
    }
  }
  return memoryMails[index] || fields;
}

export async function deleteMailData(id: string) {
  memoryMails = memoryMails.filter(m => m.id !== id);
  if (isDbConnected()) {
    try {
      await MailModel.deleteOne({ id } as any);
    } catch (e) {
      // fallback
    }
  }
  return true;
}

export async function resetMemoryAndDB() {
  memorySettings = null;
  memoryServices = [...ALL_SERVICES];
  memoryCaseStudies = [...CASE_STUDIES];
  memoryTeam = [...TEAM_MEMBERS];
  if (isDbConnected()) {
    try {
      await SettingModel.deleteOne({ key: 'site_settings' } as any);
      await seedDatabase();
    } catch (e) {
      // fallback
    }
  }
}

export async function seedDatabase() {
  try {
    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0) {
      console.log('🌱 Seeding initial Services to MongoDB Atlas...');
      await ServiceModel.insertMany(ALL_SERVICES as any[]);
    }

    const caseCount = await CaseStudyModel.countDocuments();
    if (caseCount === 0) {
      console.log('🌱 Seeding initial Case Studies to MongoDB Atlas...');
      await CaseStudyModel.insertMany(CASE_STUDIES as any[]);
    }

    const teamCount = await TeamMemberModel.countDocuments();
    if (teamCount === 0) {
      console.log('🌱 Seeding initial Team Members to MongoDB Atlas...');
      await TeamMemberModel.insertMany(TEAM_MEMBERS as any[]);
    }

    const leadCount = await LeadModel.countDocuments();
    if (leadCount === 0) {
      console.log('🌱 Seeding sample Newsletter Leads to MongoDB Atlas...');
      const sampleLeads = [
        {
          id: 'lead-1',
          email: 'cto@nexusfintech.com',
          subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          source: 'Footer Newsletter',
          status: 'Active'
        },
        {
          id: 'lead-2',
          email: 'founder@hypercloud.io',
          subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          source: 'Footer Newsletter',
          status: 'Active'
        },
        {
          id: 'lead-3',
          email: 'vp.engineering@medivault.org',
          subscribedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          source: 'Footer Newsletter',
          status: 'Active'
        }
      ];
      await LeadModel.insertMany(sampleLeads as any[]);
    }

    const mailCount = await MailModel.countDocuments();
    if (mailCount === 0) {
      console.log('🌱 Seeding sample Contact Mails to MongoDB Atlas...');
      const sampleMails = [
        {
          id: 'mail-1',
          name: 'Sarah Jenkins',
          email: 'sarah.j@vertexlabs.ai',
          company: 'Vertex Labs AI',
          service: 'AI & Machine Learning',
          budget: '$50,000 - $100,000',
          message: 'Hello CrifTech team, we are looking to integrate a custom GenAI agent pipeline into our enterprise SaaS platform. We need ultra-low latency inference and HIPAA compliance. Looking forward to discussing.',
          submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          type: 'Contact Form',
          isRead: false,
          isStarred: true,
          notes: 'High priority lead - follow up scheduled for tomorrow morning.'
        },
        {
          id: 'mail-2',
          name: 'Michael Chang',
          email: 'm.chang@payflow.co',
          company: 'PayFlow Global',
          service: 'Custom Web Applications',
          budget: '$25,000 - $50,000',
          message: 'Hi! We need a complete refactor of our merchant dashboard in React 19 and Tailwind CSS. Current system is slow under spike traffic.',
          submittedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
          type: 'Contact Form',
          isRead: true,
          isStarred: false,
          notes: ''
        },
        {
          id: 'mail-3',
          name: 'Elena Rostova',
          email: 'elena@skylinehealth.de',
          company: 'Skyline Health Solutions',
          service: 'Cloud Infrastructure & DevOps',
          budget: '$100,000+',
          message: 'We require a full multi-cloud migration to Kubernetes (EKS/GKE) with SOC2 compliance and zero-downtime deployment pipelines.',
          submittedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          type: 'Contact Form',
          isRead: true,
          isStarred: true,
          notes: 'Sent initial discovery questionnaire.'
        }
      ];
      await MailModel.insertMany(sampleMails as any[]);
    }
  } catch (err) {
    console.error('Error during database seed:', err);
  }
}
