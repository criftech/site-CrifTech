import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, FileText, Lock, CheckCircle2, Download, Mail } from 'lucide-react';

interface LegalViewProps {
  onNavigate: (route: PageRoute) => void;
  defaultTab?: 'privacy' | 'terms';
}

export const LegalView: React.FC<LegalViewProps> = ({ onNavigate, defaultTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(defaultTab === 'privacy' || defaultTab === 'terms' ? defaultTab : 'privacy');

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen space-y-12">
      
      {/* Header Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold uppercase tracking-wider border border-blue-100 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Privacy Documentation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
          Trust, Transparency & Security
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Official legal policies governing CrifTech engineering services, software delivery, data protection, and IP ownership protocols.
        </p>

        <p className="text-xs text-slate-500 font-medium pt-1">
          Effective Date: January 1, 2026 &bull; Last Revised: July 2026 &bull; CrifTech Engineering
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md electric-glow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md electric-glow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>
        </div>
      </section>

      {/* Main Document Content Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed chrome-border">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900">Privacy Policy</h2>
                  <p className="text-xs text-slate-500 mt-1">How CrifTech protects client data, personal information, and proprietary assets.</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">1. Overview & Commitment</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    At CrifTech Engineering (&ldquo;CrifTech&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we hold data privacy and intellectual property protection as fundamental cornerstones of our software development agency. This Privacy Policy details how we collect, handle, store, and safeguard information submitted through our website, communications, client portals, and engineering engagements.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">2. Information Collection</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    We strictly collect information necessary to deliver software development services, process project inquiries, schedule technical consultations, and execute contracts:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <li><strong>Contact & Business Data:</strong> Name, work email address, company name, telephone number, and project specifications submitted via booking or contact forms.</li>
                    <li><strong>Technical Client Data:</strong> API endpoints, wireframes, and architecture parameters shared under mutual Non-Disclosure Agreements (NDAs).</li>
                    <li><strong>Automated Telemetry:</strong> Standard non-identifying browser information (IP address, device operating system, referral source) used solely for website optimization and security monitoring.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">3. Zero AI Model Training Policy</h3>
                  <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2 text-xs sm:text-sm text-blue-950">
                    <div className="font-bold flex items-center gap-2 text-[#0066FF]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                      <span>Strict Proprietary Data Guarantee</span>
                    </div>
                    <p className="leading-relaxed">
                      All codebases, database schemas, custom LLM fine-tuning data, and API payloads processed during CrifTech projects remain 100% confidential. We NEVER use client data, source code, or internal documentation to train public foundation models or share across client accounts.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">4. Data Storage & Encryption Standards</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All data in transit is protected using Industry-Standard TLS 1.3 encryption, and data at rest utilizes AES-256 bit encryption across isolated cloud infrastructure (Google Cloud Platform and AWS). Access is enforced via multi-factor authentication and role-based access control (RBAC).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">5. Third-Party Sharing</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    CrifTech does not sell, lease, or trade personal data or business information to any third parties under any circumstances. Information is only disclosed to authorized cloud infrastructure providers (e.g., Google Cloud, Vercel) strictly required to host or run software systems under binding data processor agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">6. Your Rights & Data Requests</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Clients and visitors possess full rights to request access to, deletion of, or modification of their personal data. To exercise these rights or request a formal Data Processing Addendum (DPA), email our Security Officer at <a href="mailto:criftech@gmail.com" className="text-[#0066FF] font-bold hover:underline">criftech@gmail.com</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900">Terms & Conditions</h2>
                  <p className="text-xs text-slate-500 mt-1">Master Service Agreement terms governing custom software development & engineering engagements.</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">1. Agreement to Terms</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By engaging CrifTech Engineering for web application development, mobile engineering, AI integration, or consulting services, you agree to these Master Terms & Conditions along with any project-specific Statement of Work (SOW).
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">2. 100% Intellectual Property (IP) Ownership</h3>
                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-2 text-xs sm:text-sm">
                    <div className="font-bold flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Complete Ownership Transfer Upon Payment</span>
                    </div>
                    <p className="leading-relaxed">
                      Upon receipt of full payment for agreed deliverables, 100% of all custom source code, Git repositories, Figma design assets, database schemas, and documentation created under the Statement of Work belong exclusively to the client. No recurring licensing fees or vendor lock-in.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">3. Scope & Change Orders</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Engineering scope is defined in individual Statements of Work. Any modifications, feature additions, or timeline adjustments requested during development will be documented via written Change Orders signed by both parties to maintain complete timeline and budget transparency.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">4. Quality Guarantee & Warranty Period</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    CrifTech provides a 60-day post-launch warranty on all custom software builds. During this period, any software defects, bugs, or deviations from agreed technical specifications will be remediated at zero additional cost to the client.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">5. Payment Schedule & Invoicing</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Invoices are issued according to project milestone achievements or monthly retainers. Standard payment terms are Net 15 days via bank transfer unless agreed otherwise in writing.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">6. Limitation of Liability</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Except for breaches of confidentiality or gross negligence, neither party shall be liable for indirect, incidental, or consequential damages. Total liability under any project shall not exceed the total fees paid under the relevant Statement of Work.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Support Footer in Legal Box */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-900">Have questions about our legal policies or security standards?</span>
              <p className="text-slate-500">Our team responds within 24 business hours.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:criftech@gmail.com"
                className="px-4 py-2.5 rounded-xl bg-[#0066FF] text-white font-bold inline-flex items-center gap-2 hover:bg-[#0052CC] transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Legal Team</span>
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <span>Contact Page</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
