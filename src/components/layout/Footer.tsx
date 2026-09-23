import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ShieldCheck, CheckCircle2, Zap, HeartHandshake, 
  MapPin, ArrowUp, Mail, Phone, Lock, Sparkles, 
  ShoppingBag, Calculator, PlusCircle, ExternalLink, Globe
} from 'lucide-react';
import { useLocationContext } from '../../contexts/LocationContext';

export function Footer() {
  const { userLocation, openLocationModal } = useLocationContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#090D16]/95 backdrop-blur-2xl text-gray-400 overflow-hidden">
      {/* Subtle background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8A2BE2]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Value Proposition Strip */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.15)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Zero Brokerage Always</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Connect directly with PG, hostel, and mess owners. Never pay broker commission or hidden fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">100% Verified Places</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Photos, real amenities (AC, RO water, Wi-Fi, power backup), and genuine student reviews.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Hyper-Local Hub Search</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Filter by major coaching centers, silent libraries, metro stations, and university zones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Student Community Driven</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Buy & sell study modules, chairs, coolers, and calculate precise monthly living expenses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid */}
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 group-hover:border-[#00E5FF]/50 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <Building2 className="h-6 w-6 text-[#00E5FF]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">City Helpline</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                Official
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              India's premier zero-brokerage student habitat directory. Empowering aspirants in Kota, Patna, Delhi, Sikar, and 20+ academic cities to find verified PGs, hygienic food & silent libraries.
            </p>

            {/* Official Domain & Server Status */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="text-gray-400">Official Portal:</span>
                <a 
                  href="https://app.imprince.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-[#00E5FF] hover:underline inline-flex items-center gap-1"
                >
                  app.imprince.me
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-medium">All City Directory Services Active</span>
              </div>
            </div>

            {/* Active City Pill & Switcher */}
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="text-gray-300">
                Current City: <strong className="text-white">{userLocation?.city || 'All India'}</strong>
              </span>
              <button
                type="button"
                onClick={openLocationModal}
                className="text-[11px] font-bold text-[#00E5FF] hover:underline px-1.5 py-0.5 rounded bg-[#00E5FF]/10 cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>

          {/* Quick Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Student Services</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/search?category=PG%20%2F%20Hostel" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>PGs & Hostels</span>
                </Link>
              </li>
              <li>
                <Link to="/search?category=Mess%20%2F%20Tiffin" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>Mess & Tiffin Services</span>
                </Link>
              </li>
              <li>
                <Link to="/search?category=Library" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>AC Study Libraries</span>
                </Link>
              </li>
              <li>
                <Link to="/search?category=Coaching" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>Coaching Institutes</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>Used Study Essentials</span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-cyan-400/20 text-[#00E5FF] rounded">
                    Save 70%
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                  <span>Living Cost Calculator</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Premier Education Hubs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Top Education Hubs</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/search" state={{ city: 'Kota' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>Kota, Rajasthan</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Landmark & Rajiv Gandhi</span>
                </Link>
              </li>
              <li>
                <Link to="/search" state={{ city: 'New Delhi' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>New Delhi</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Mukherjee Ngr & Kalu Sarai</span>
                </Link>
              </li>
              <li>
                <Link to="/search" state={{ city: 'Patna' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>Patna, Bihar</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Boring Rd & Kankarbagh</span>
                </Link>
              </li>
              <li>
                <Link to="/search" state={{ city: 'Sikar' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>Sikar, Rajasthan</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Piprali Road Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/search" state={{ city: 'Prayagraj' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>Prayagraj (Allahabad)</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Katra & Civil Lines</span>
                </Link>
              </li>
              <li>
                <Link to="/search" state={{ city: 'Indore' }} className="hover:text-[#00E5FF] transition-colors flex items-center justify-between group">
                  <span>Indore, MP</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Bhawarkua Student Zone</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Owners & Quick Actions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">For Owners & Students</h5>
            <div className="space-y-3">
              <Link 
                to="/add-listing" 
                className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-white/15 hover:border-[#00E5FF]/40 transition-all block group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      List Property For Free
                    </h6>
                    <p className="text-[11px] text-gray-400 mt-0.5">Reach 10,000+ verified students directly</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/sell-item" 
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all block group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-400/10 text-cyan-300 group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      Sell Second-Hand Gear
                    </h6>
                    <p className="text-[11px] text-gray-400 mt-0.5">Books, study tables, coolers & cycles</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/profile" 
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-xs text-gray-300 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <Calculator className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Your Student Budget</span>
                </span>
                <span className="text-[#00E5FF] font-bold text-[11px]">View Profile →</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Student Safety & Emergency Support Strip */}
      <div className="border-t border-b border-white/10 bg-white/[0.02] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-center md:text-left flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold uppercase tracking-wider text-[10px]">
              <Phone className="w-3 h-3" />
              Student Support & Safety
            </span>
            <span className="text-gray-300">
              National Student Mental Health Tele-MANAS: <strong className="text-white">14416</strong> (Toll Free) • Police: <strong className="text-white">112</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Helpline: <a href="mailto:support@imprince.me" className="text-white hover:underline">support@imprince.me</a></span>
            </span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Lock className="w-3 h-3 text-[#00E5FF]" />
              <span>SSL Secured & Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright & Back to Top */}
      <div className="py-6 pb-24 md:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong>City Helpline</strong>. All rights reserved.
          </p>
          <span className="hidden sm:inline text-gray-600">•</span>
          <p className="text-gray-400">
            Crafted with zero brokerage for Indian students preparing for JEE, NEET, UPSC & Govt. exams.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/search" className="hover:text-white transition-colors">Directory</Link>
          <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
          <Link to="/budget" className="hover:text-white transition-colors">Budget</Link>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-[#00E5FF]/20 text-gray-400 hover:text-[#00E5FF] border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold hidden sm:inline">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
