import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, Search, Mail, Wrench, ShieldCheck, 
  PhoneCall, Bot, Sparkles, ChevronDown, 
  ExternalLink, Building2, ShoppingBag, BedDouble, 
  AlertTriangle, CheckCircle2, MessageSquare, Send, ArrowRight
} from 'lucide-react';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';
import { APP_CONFIG } from '../lib/appConfig';
import { toast } from 'sonner';

interface FaqItem {
  id: string;
  category: 'students' | 'owners' | 'marketplace' | 'roommates' | 'technical';
  question: string;
  answer: string;
  action?: {
    text: string;
    url: string;
  };
}

const FAQS: FaqItem[] = [
  {
    id: 'zero-brokerage',
    category: 'students',
    question: 'Kya City Helpline par koi brokerage ya commission lagta hai?',
    answer: 'Nahi, bilkul nahi! City Helpline 100% zero-brokerage platform hai. Sabhi rooms, PGs, hostels aur mess listings verified property owners dwara directly post kiye jaate hain. Aap directly owner se call ya WhatsApp par baat kar sakte hain bina kisi middleman ke.',
    action: { text: 'Browse Verified Rooms', url: '/search' }
  },
  {
    id: 'advance-scam',
    category: 'students',
    question: 'Room lene se pehle advance token payment transfer karna chahiye?',
    answer: 'KABHI NAHI! Kabhi bhi kisi owner ya broker ko online token amount ya gate pass fee transfer mat karein bina room physically din ke ujale me dekhe. Agar koi phone par bole "Advance transfer karo tab room dikhayenge", toh wo 100% fraud hai. Aise cases ko turant report karein.',
    action: { text: 'Read Safety Policy', url: '/safety' }
  },
  {
    id: 'post-listing-free',
    category: 'owners',
    question: 'Kya room owners aur landlords ke liye listing post karna free hai?',
    answer: 'Haan, room owners, PG managers, hostel sanchalak aur library operators City Helpline par apni properties bilkul muft (FREE) me post kar sakte hain. Post karne ke baad hamari verification team 12-24 ghante ke andar listing verify kar deti hai.',
    action: { text: 'Post a Listing', url: '/add-listing' }
  },
  {
    id: 'marketplace-buy-sell',
    category: 'marketplace',
    question: 'Student Marketplace par second-hand items kaise bechein ya khareedein?',
    answer: 'Aap apne puraane Allen/PW/Resonance study modules, reference books, study tables, room coolers ya cycle ko Marketplace me direct post kar sakte hain. Interested students aapse directly WhatsApp par deal kar sakte hain. Payment hamesha physically item check karne ke baad hi karein.',
    action: { text: 'Explore Marketplace', url: '/marketplace' }
  },
  {
    id: 'roommate-matching',
    category: 'roommates',
    question: 'Compatible flatmate ya roommate kaise dhoondein?',
    answer: 'Roommate Finder section me aap apne study timings (night owl vs early bird), food preference (veg / non-veg), smoking/drinking habits aur budget ke hisab se verified student profiles filter kar sakte hain aur unse connect kar sakte hain.',
    action: { text: 'Find Roommates', url: '/roommates' }
  },
  {
    id: 'app-glitch-developer',
    category: 'technical',
    question: 'Agar app me koi technical issue, login error ya loading problem aaye toh?',
    answer: 'Agar app slow chal rahi hai, page crash ho raha hai ya login/OTP me error aa rahi hai, toh aap direct hamare Technical Team ko Developer@imprince.me par email bhej sakte hain. Screenshot aur device model zaroor include karein taaki hum turant fix kar sakein.',
  },
  {
    id: 'listing-edit-delete',
    category: 'owners',
    question: 'Apni listing ko edit ya delete kaise karein?',
    answer: 'Profile me jaakar "My Listings" par click karein. Wahan aap rent update kar sakte hain, naye photos jod sakte hain ya room bhar jaane par listing ko temporarily unpublish ya delete kar sakte hain.',
    action: { text: 'My Listings', url: '/my-listings' }
  },
  {
    id: 'library-booking',
    category: 'students',
    question: 'Silent AC Libraries kaise find karein?',
    answer: 'Search page par "Library" category select karein. Wahan aapko shift timings (Morning, Evening, Night 24x7), AC, Wi-Fi speed aur monthly charges (₹400 – ₹1,200) ke sath libraries mil jaayengi.',
    action: { text: 'Find Libraries', url: '/search?category=Library' }
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('zero-brokerage');

  // Contact Form State
  const [issueType, setIssueType] = useState<'support' | 'developer'>('support');
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  // Filter FAQs based on search & category
  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Kripya apna message ya samasya likhein.');
      return;
    }

    const targetEmail = issueType === 'developer' 
      ? APP_CONFIG.developerEmail 
      : APP_CONFIG.supportEmail;

    const subject = encodeURIComponent(
      issueType === 'developer' 
        ? `[App Bug / Technical Issue] ${name || 'User'}`
        : `[Student Support Inquiry] ${name || 'User'}`
    );

    const body = encodeURIComponent(
      `Name: ${name || 'Not provided'}\nUser Email: ${userEmail || 'Not provided'}\nType: ${issueType === 'developer' ? 'App Working Problem' : 'General / Student Help'}\n\nDescription:\n${message}\n\nDevice & App Info: ${navigator.userAgent}\nURL: ${window.location.href}`
    );

    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    toast.success(`Opening your email client for ${targetEmail}...`);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      {/* Reusable Header */}
      <PersonalPageHeader
        title="Help & Support Center"
        subtitle="24x7 Student Support, Zero-Brokerage Assistance & Technical Help"
        badge="Official Helpdesk"
        badgeColor="bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30"
        icon={HelpCircle}
        iconColor="text-[#00E5FF]"
        exitUrl="/"
        backLabel="Home"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Search Section */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-[#00E5FF]/10 via-purple-900/20 to-[#07090E] border border-white/10 shadow-2xl text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              City Helpline Aspirant Care
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Aapki Kya Madad Kar Sakte Hain?
            </h1>
            <p className="text-sm text-gray-300">
              Room booking queries, zero-brokerage guidance, second-hand marketplace, ya app me koi technical issue — sabka samadhan yahan hai.
            </p>

            {/* Search Input */}
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. advance payment, room verification, app problem, rent)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] transition-all text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Official Channels Grid (Support Email, Developer Support, AI Mitra, Emergency) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Channel 1: Student & General Support */}
          <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between group shadow-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Student Support</h3>
                <p className="text-xs text-gray-400 mt-1">
                  General queries, room help, owner disputes, or report fraud listings.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-[#00E5FF] break-all select-all">
                {APP_CONFIG.supportEmail}
              </div>
            </div>
            <a
              href={`mailto:${APP_CONFIG.supportEmail}`}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Email Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Channel 2: Developer Support (In case of App working problem) */}
          <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white">Developer Support</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-500/20 text-purple-300">
                    Tech
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  In case of App working problems, login glitches, crashes, or bugs.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-purple-300 break-all select-all">
                {APP_CONFIG.developerEmail}
              </div>
            </div>
            <a
              href={`mailto:${APP_CONFIG.developerEmail}?subject=%5BApp%20Bug%20Report%5D%20City%20Helpline`}
              className="mt-4 w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500 text-purple-300 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Contact Developer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Channel 3: AI Mitra Instant Advisor */}
          <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white">AI Mitra Guide</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300">
                    Instant
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Ask rent benchmarks, Kota/Patna coaching areas, food rates & exam areas.
                </p>
              </div>
              <div className="text-xs text-emerald-300 font-medium flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Powered by Gemini 3.6 Flash</span>
              </div>
            </div>
            <Link
              to="/chat"
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Chat with AI Mitra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Channel 4: Emergency & Tele-MANAS */}
          <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:border-rose-500/40 transition-all flex flex-col justify-between group shadow-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Emergency Helplines</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Free 24x7 Government Helplines for exam stress, mental health & safety.
                </p>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Tele-MANAS (Mental Health):</span>
                  <strong className="text-white font-mono">14416</strong>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>National Police Emergency:</span>
                  <strong className="text-white font-mono">112</strong>
                </div>
              </div>
            </div>
            <a
              href="tel:14416"
              className="mt-4 w-full py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Call Tele-MANAS (14416)</span>
            </a>
          </div>
        </div>

        {/* Quick Help Guides By Subject */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Essential Guides for Students & Owners</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00E5FF] font-bold text-sm">
                <Building2 className="w-4 h-4" />
                <span>Room Inspection Checklist</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hamesha din ke ujale me room visit karein. Sub-meter reading note karein (Govt. standard ₹7-10/unit). Water pressure aur cross-ventilation check karein.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <ShoppingBag className="w-4 h-4" />
                <span>Safe Marketplace Trading</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Books, coolers, ya study tables lene se pehle campus ya public place me meetup karein. Condition physically dekhne ke baad hi UPI karein.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <BedDouble className="w-4 h-4" />
                <span>Finding Ideal Roommates</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Roommate choose karte waqt study timings (night study vs morning), diet habits, aur cleanliness expectations pehle hi clear discuss karein.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section with Category Filter */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Common sawaal aur unke vishwasniya jawab
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'All' },
                { id: 'students', label: 'Students & PGs' },
                { id: 'owners', label: 'Room Owners' },
                { id: 'marketplace', label: 'Marketplace' },
                { id: 'technical', label: 'App & Tech' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#00E5FF] text-black shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                      : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 rounded-3xl bg-white/[0.02] border border-white/10 text-gray-400 text-sm">
                Aapke search query ke liye koi FAQ nahi mila. Kripya neeche direct support email par sampark karein.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                          isOpen ? 'rotate-180 text-[#00E5FF]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 space-y-3"
                        >
                          <p>{faq.answer}</p>
                          {faq.action && (
                            <div>
                              <Link
                                to={faq.action.url}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E5FF] hover:underline"
                              >
                                <span>{faq.action.text}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Direct Email Dispatcher Form */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <MessageSquare className="w-3.5 h-3.5" />
                Fast Resolution Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Still Need Help? Send us a Direct Note
              </h3>
              <p className="text-xs text-gray-400">
                Select category and send an email directly to the responsible team inbox.
              </p>
            </div>

            {/* Target Team Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIssueType('support')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  issueType === 'support'
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <Mail className={`w-5 h-5 shrink-0 mt-0.5 ${issueType === 'support' ? 'text-[#00E5FF]' : 'text-gray-500'}`} />
                <div>
                  <div className="text-sm font-bold text-white">General / Student Support</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Rooms, dispute, account help ({APP_CONFIG.supportEmail})</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIssueType('developer')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  issueType === 'developer'
                    ? 'bg-purple-500/10 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <Wrench className={`w-5 h-5 shrink-0 mt-0.5 ${issueType === 'developer' ? 'text-purple-400' : 'text-gray-500'}`} />
                <div>
                  <div className="text-sm font-bold text-white">Developer / App Problem</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">App crashes, bugs, errors ({APP_CONFIG.developerEmail})</div>
                </div>
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Aapka Naam (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Aapka Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Samasya ya Sawaal (Description) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    issueType === 'developer'
                      ? 'App me kya problem aa rahi hai? Kaun sa page kholne par error aati hai?'
                      : 'Aapko kis shehar ya room me madad chahiye? Detailed jaankari likhein...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF] resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  issueType === 'developer'
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-[#00E5FF] hover:bg-[#00B8D4] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  Compose Email to {issueType === 'developer' ? APP_CONFIG.developerEmail : APP_CONFIG.supportEmail}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
