import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, FileText, Scale, AlertTriangle, Lock, 
  Mail, CheckCircle2, Building2, ShoppingBag, PhoneCall,
  UserCheck, HelpCircle, ExternalLink, ArrowRight, ShieldAlert,
  Clock, MapPin, Eye, Sparkles, ChevronRight
} from 'lucide-react';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';

export type LegalTab = 'privacy' | 'terms' | 'safety' | 'listing-policy' | 'grievance';

interface LegalProps {
  defaultTab?: LegalTab;
}

export default function Legal({ defaultTab = 'privacy' }: LegalProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<LegalTab>(defaultTab);

  // Sync tab with route query or state if provided
  useEffect(() => {
    if (location.pathname === '/privacy') setActiveTab('privacy');
    else if (location.pathname === '/terms') setActiveTab('terms');
    else if (location.pathname === '/safety') setActiveTab('safety');
    else {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get('tab') as LegalTab;
      if (tabParam && ['privacy', 'terms', 'safety', 'listing-policy', 'grievance'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  const navItems: Array<{ id: LegalTab; label: string; icon: React.ComponentType<{ className?: string }>; tag: string }> = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock, tag: 'DPDP & IT Act' },
    { id: 'terms', label: 'Terms of Service', icon: Scale, tag: 'Intermediary Terms' },
    { id: 'safety', label: 'Student Safety & Anti-Fraud', icon: ShieldAlert, tag: 'Aspirant Protection' },
    { id: 'listing-policy', label: 'Listing & Owner Rules', icon: Building2, tag: 'Verification Norms' },
    { id: 'grievance', label: 'Grievance & Legal Officer', icon: Mail, tag: 'Official Redressal' },
  ];

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'safety':
        return {
          title: 'Student Safety & Anti-Fraud Advisory',
          subtitle: 'Safety checklist, scam protection, verified owner protocols & emergency helplines',
          badge: 'Safety First',
          badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: ShieldAlert,
          iconColor: 'text-amber-400'
        };
      case 'terms':
        return {
          title: 'Terms of Service & Platform Rules',
          subtitle: 'Zero-brokerage terms, user conduct, code of compliance and intermediary policies',
          badge: 'User Terms',
          badgeColor: 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/30',
          icon: Scale,
          iconColor: 'text-[#00E5FF]'
        };
      case 'listing-policy':
        return {
          title: 'Listing & Verification Policy',
          subtitle: 'Verification standards, safety norms & guidelines for PG, hostel and mess owners',
          badge: 'Verification',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: Building2,
          iconColor: 'text-emerald-400'
        };
      case 'grievance':
        return {
          title: 'Grievance Redressal & Legal Officer',
          subtitle: 'Official escalation cell and contact channel under IT Rules 2021',
          badge: 'Grievance Cell',
          badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          icon: Mail,
          iconColor: 'text-rose-400'
        };
      case 'privacy':
      default:
        return {
          title: 'Privacy Policy & Data Protection',
          subtitle: 'Digital Personal Data Protection (DPDP) Act 2023 & India IT Act compliance',
          badge: 'DPDP 2023',
          badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: Lock,
          iconColor: 'text-purple-400'
        };
    }
  };

  const headerMeta = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-2 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Top Sticky Navigation Header with Back and Cut (X) Button */}
      <PersonalPageHeader
        title={headerMeta.title}
        subtitle={headerMeta.subtitle}
        badge={headerMeta.badge}
        badgeColor={headerMeta.badgeColor}
        icon={headerMeta.icon}
        iconColor={headerMeta.iconColor}
        backLabel="Back"
        exitUrl="/profile"
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#8A2BE2]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust, Compliance & Student Welfare</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Legal, Privacy & Platform Policies
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
              City Helpline is dedicated to zero-brokerage transparent accommodation and educational resource discovery for Indian aspirants. Read our legally binding terms, privacy practices, and student protection guidelines.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                Last Updated: September 2026
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#8A2BE2]" />
                Jurisdiction: India
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Brokerage Platform
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/[0.03] border border-white/10 overflow-x-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#8A2BE2]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                  isActive ? 'bg-[#00E5FF] text-black' : 'bg-white/10 text-gray-500'
                }`}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Document Content Area */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl">
          
          {/* ========================================================================= */}
          {/* 1. PRIVACY POLICY */}
          {/* ========================================================================= */}
          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-sm text-gray-300 leading-relaxed"
            >
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Lock className="w-6 h-6 text-[#00E5FF]" />
                  Privacy Policy & Data Protection
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Compliant with the Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) standards.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">1</span>
                  Introduction & Overview
                </h3>
                <p>
                  City Helpline (<code className="text-[#00E5FF] bg-black/40 px-1.5 py-0.5 rounded">https://app.imprince.me</code>) is an educational community platform designed exclusively to empower students preparing for competitive examinations (including JEE, NEET, UPSC, BPSC, SSC, and State PSCs) to find zero-brokerage PGs, hostels, mess services, study libraries, and peer-to-peer marketplace items.
                </p>
                <p>
                  We are deeply committed to protecting your privacy. This Privacy Policy details the types of information we collect, how it is stored and utilized, your legal rights under Indian Law, and the security protocols implemented.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">2</span>
                  Information We Collect
                </h3>
                <p>We only collect data strictly necessary to facilitate student accommodation and educational resource connectivity:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF]">Student / User Information</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-gray-400">
                      <li>Full Name and Email address (via Firebase Auth / Google OAuth)</li>
                      <li>City preference or voluntarily detected educational hub (e.g. Kota, Patna, Delhi)</li>
                      <li>Saved / Bookmarked PG and library listings</li>
                      <li>Second-hand marketplace items submitted by student sellers</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A2BE2]">Contributor & Property Provider Data</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-gray-400">
                      <li>Business name / PG hostel name</li>
                      <li>Direct contact phone number & WhatsApp contact</li>
                      <li>Physical property address, monthly room rent, and amenity descriptions</li>
                      <li>Photographs of rooms, study areas, and meal facilities</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">3</span>
                  Geolocation & Device Permissions
                </h3>
                <p>
                  To suggest the closest hostels, libraries, and tiffin services, City Helpline offers automated city detection via the browser Geolocation API. This detection is <strong>completely optional</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-400 text-xs">
                  <li>Geolocation coordinates (latitude/longitude) are processed locally to map you to the nearest coaching cluster (such as Indraprastha in Kota, Boring Road in Patna, or Old Rajinder Nagar in Delhi).</li>
                  <li>We never track your real-time GPS continuous movement in the background.</li>
                  <li>You may override or reset your city at any time via the top location selector.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">4</span>
                  How We Use Your Data
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li>To provide, personalize, and improve student search results.</li>
                  <li>To enable direct, unhindered communication between students and PG owners without middlemen or brokerage commissions.</li>
                  <li>To authenticate user sessions securely through Google Firebase Authentication.</li>
                  <li>To prevent fraud, fake listings, duplicate property submissions, and malicious accounts.</li>
                  <li>To display emergency mental health resources (Tele-MANAS) and student helpline broadcasts.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">5</span>
                  Data Sharing & Third-Party Disclosure
                </h3>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed">
                  <strong className="text-white block mb-1">Zero Commercial Data Monetization:</strong>
                  We do <strong>NOT</strong> sell, trade, rent, or lease your personal information, contact numbers, or student profiles to private telemarketers, coaching admission brokers, or third-party advertising networks.
                </div>
                <p className="text-xs text-gray-400">
                  Data is only hosted and processed via enterprise-grade Google Cloud Platform and Firebase infrastructure complying with strict encryption protocols (TLS 1.3 in transit and AES-256 at rest).
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">6</span>
                  Your Privacy Rights & Account Deletion
                </h3>
                <p>As a student or property contributor, you retain full ownership of your data:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li><strong>Update & Edit:</strong> You can edit your profile details, contact numbers, and posted listings at any time from your account profile.</li>
                  <li><strong>Delete Listing / Item:</strong> Property owners and student sellers can delete their listings instantly.</li>
                  <li><strong>Account Eradication:</strong> You may request permanent deletion of your account and all associated submissions by writing to <a href="mailto:support@imprince.me" className="text-[#00E5FF] hover:underline font-semibold">support@imprince.me</a>. Requests are processed within 48 hours.</li>
                </ul>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 2. TERMS & CONDITIONS */}
          {/* ========================================================================= */}
          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-sm text-gray-300 leading-relaxed"
            >
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#00E5FF]" />
                  Terms & Conditions of Service
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Legally binding agreement between Users, Property Contributors, and City Helpline.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">1</span>
                  Acceptance of Terms
                </h3>
                <p>
                  By accessing, browsing, or registering on City Helpline (<code className="text-[#00E5FF] bg-black/40 px-1.5 py-0.5 rounded">https://app.imprince.me</code>), you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions. If you do not agree to these terms, you must discontinue using the platform.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">2</span>
                  Nature of Platform (Information Intermediary)
                </h3>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 space-y-2">
                  <p>
                    <strong>Intermediary Status:</strong> City Helpline functions strictly as an electronic discovery platform and digital intermediary under Section 79 of the Indian Information Technology Act, 2000.
                  </p>
                  <p>
                    City Helpline is <strong>NOT</strong> a real estate agency, broker, landlord, pg operator, hostel manager, or food catering provider. We connect students directly with independent local property owners and peer students.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">3</span>
                  Zero Brokerage Principle
                </h3>
                <p>
                  City Helpline operates on a strict <strong>Zero Brokerage</strong> philosophy:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li>No student or parent will ever be charged a commission, token brokerage fee, or finder fee by City Helpline.</li>
                  <li>If any third-party claiming to represent City Helpline requests brokerage or deposit transfer on telephone or UPI, immediately report them to our Grievance Officer.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">4</span>
                  Student Marketplace Terms (Peer-to-Peer)
                </h3>
                <p>
                  Our Student Marketplace allows registered students to list second-hand educational essentials (e.g., NCERT/JEE/NEET coaching study modules, coolers, study lamps, bicycles):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                  <li>Sellers must accurately describe the physical condition of goods.</li>
                  <li>City Helpline does not hold custody of items, process escrow, or provide shipping warranties.</li>
                  <li><strong>Physical Handover Rule:</strong> Buyers must physically inspect items and verify functioning before handing over cash or UPI payment.</li>
                  <li>Listing prohibited items (drugs, alcohol, weapons, unauthorized academic pirated software) will lead to immediate account banning and report to law enforcement.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">5</span>
                  Limitation of Liability & Due Diligence
                </h3>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                  <strong className="text-white block font-bold">Mandatory In-Person Verification:</strong>
                  <p>
                    While our administration team moderates and vets listings for authenticity, students and parents are strictly advised to visit the PG/Hostel in person, inspect room amenities, check cleanliness, test water/electricity supplies, and execute written rent agreements with the property owner before paying any security deposits or advance rent.
                  </p>
                  <p>
                    City Helpline is not liable for interpersonal landlord-tenant disputes, deposit refund disputes, service quality disagreements, or theft at third-party premises.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-black flex items-center justify-center">6</span>
                  Jurisdiction & Governing Law
                </h3>
                <p className="text-xs text-gray-400">
                  These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or related to the platform shall be subject to the exclusive jurisdiction of the competent courts in India.
                </p>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 3. STUDENT SAFETY & ANTI-FRAUD ADVISORY */}
          {/* ========================================================================= */}
          {activeTab === 'safety' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-sm text-gray-300 leading-relaxed"
            >
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                  Student Safety, Scam Protection & Anti-Fraud Advisory
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Practical checklist for aspirants relocating to Kota, Patna, Delhi, Sikar, and other study hubs.
                </p>
              </div>

              {/* Golden Safety Rules Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-black/40 to-transparent border border-amber-500/30 space-y-4">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  The 4 Golden Rules of PG & Hostel Booking
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider">Rule 1: Never Pay Advance Online</span>
                    <p className="text-xs text-gray-300">
                      Never transfer "booking token" or "advance gate pass fees" via QR codes or UPI to anyone before physically visiting the room. Genuine PG owners in Kota and Patna will always show you the room first.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider">Rule 2: Inspect During Daytime</span>
                    <p className="text-xs text-gray-300">
                      Visit during daylight hours. Inspect natural ventilation, mobile network signal reception, water pressure in bathrooms, and power backup during peak summer coaching hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider">Rule 3: Get Written Rent Receipts</span>
                    <p className="text-xs text-gray-300">
                      Always demand written, signed receipts for monthly rent and security deposits clearly stating electricity charges (commercial vs. domestic sub-meter per unit rate).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider">Rule 4: Verify Mess Hygiene</span>
                    <p className="text-xs text-gray-300">
                      Ask for a 1-day or 2-day paid trial meal at the mess before locking into quarterly or half-yearly meal subscriptions. Verify RO purified water availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mental Health & Emergency Hotlines */}
              <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300">
                    <PhoneCall className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Student Mental Health & Emergency Lifeline</h3>
                    <p className="text-xs text-rose-300">Free, confidential 24/7 tele-counseling for academic pressure, exam anxiety and student distress.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                    <p className="text-xs text-gray-400">National Tele-MANAS</p>
                    <p className="text-xl font-black text-white mt-1">14416</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Toll-Free 24x7</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                    <p className="text-xs text-gray-400">National Emergency Support</p>
                    <p className="text-xl font-black text-white mt-1">112</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Police, Ambulance, Fire</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                    <p className="text-xs text-gray-400">Women & Girl Student Helpline</p>
                    <p className="text-xl font-black text-white mt-1">1090 / 181</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Safety & Support</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 4. LISTING & OWNER RULES */}
          {/* ========================================================================= */}
          {activeTab === 'listing-policy' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-sm text-gray-300 leading-relaxed"
            >
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#00E5FF]" />
                  Property Contributor & Listing Verification Standards
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Standards required for Hostels, PGs, Mess, and Study Libraries listed on City Helpline.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Guidelines for Property Owners & Contributors</h3>
                
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block mb-1">Authentic Pricing Transparency</strong>
                      Listings must reflect genuine monthly rent. Hidden mandatory charges or sudden rate hikes upon arrival are grounds for immediate delisting.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block mb-1">Genuine Real Photographs Only</strong>
                      Property owners must provide authentic photos of the actual rooms, study desks, and washrooms. Stock 3D renders or images copied from hotel sites will be rejected by our moderation queue.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block mb-1">CCTV & Student Safety Norms</strong>
                      Hostels and PGs are strongly encouraged to maintain 24/7 security personnel, entry log registers, and functional CCTV coverage in common entry areas for student security.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block mb-1">Zero Discrimination Policy</strong>
                      Listings may specify gender accommodation (Boys Hostel, Girls PG) for safety compliance, but discriminatory restrictions based on caste, religion, or community are strictly prohibited.
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 5. GRIEVANCE REDRESSAL & CONTACT */}
          {/* ========================================================================= */}
          {activeTab === 'grievance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-sm text-gray-300 leading-relaxed"
            >
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#00E5FF]" />
                  Grievance Officer & Legal Contact
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Designated compliance under Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white">Designated Grievance Redressal Officer</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-gray-400">Designated Officer:</span>
                    <p className="text-white font-bold text-sm">Prince Raj / Legal Team</p>
                    <p className="text-gray-400">Platform Administrator & Intermediary Compliance</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-gray-400">Direct Email:</span>
                    <p className="text-[#00E5FF] font-bold text-sm">
                      <a href="mailto:support@imprince.me" className="hover:underline">support@imprince.me</a>
                    </p>
                    <p className="text-gray-400">Alternative: <a href="mailto:imprince.dev@gmail.com" className="hover:underline">imprince.dev@gmail.com</a></p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 space-y-2">
                  <p>
                    <strong>Turnaround Time (SLA):</strong> In compliance with Rule 3(2) of the Information Technology (Intermediary Guidelines) Rules, 2021:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Acknowledgment of grievance received: within <strong>24 hours</strong>.</li>
                    <li>Disposal / Resolution of grievance: within <strong>15 days</strong> (typically resolved within 48 to 72 hours for urgent student safety concerns).</li>
                  </ul>
                </div>
              </div>

              {/* Fast Feedback / Inquiry Form CTA */}
              <div className="p-6 rounded-3xl bg-[#00E5FF]/5 border border-[#00E5FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Report a Fraudulent PG, Fake Listing or Abuse</h4>
                  <p className="text-xs text-gray-400 mt-1">Our moderation desk takes immediate action against deceptive listings or scammers.</p>
                </div>
                <a
                  href="mailto:support@imprince.me?subject=Reporting%20Listing%20or%20Security%20Issue%20-%20City%20Helpline"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-black font-black text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] shrink-0"
                >
                  Send Grievance Report &rarr;
                </a>
              </div>

            </motion.div>
          )}

        </div>

        {/* Bottom Quick Links / Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Link
            to="/search"
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group"
          >
            <Building2 className="w-5 h-5 text-[#00E5FF] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">Find Verified PGs & Libraries</h4>
            <p className="text-[11px] text-gray-400 mt-1">Browse verified student accommodations in your city.</p>
          </Link>

          <Link
            to="/marketplace"
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-[#8A2BE2] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white group-hover:text-[#8A2BE2] transition-colors">Student Marketplace</h4>
            <p className="text-[11px] text-gray-400 mt-1">Buy and sell books, cycles, coolers from peers safely.</p>
          </Link>

          <Link
            to="/budget"
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group"
          >
            <Scale className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Student Budget Calculator</h4>
            <p className="text-[11px] text-gray-400 mt-1">Plan monthly living allowance with zero hidden costs.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
