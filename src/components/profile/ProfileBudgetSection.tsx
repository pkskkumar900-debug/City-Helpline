import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calculator, IndianRupee, MapPin, Building2, Utensils, 
  BookOpen, Bike, Shirt, ArrowRight, Lightbulb, 
  CheckCircle2, Sparkles, Sliders, ExternalLink
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import { getCityBenchmark, CITY_BENCHMARKS } from '../../lib/budgetBenchmarks';
import { useLocationContext } from '../../contexts/LocationContext';

const POPULAR_HUBS = ['Kota', 'New Delhi', 'Patna', 'Sikar', 'Prayagraj', 'Indore', 'Jaipur', 'Lucknow'];

export function ProfileBudgetSection() {
  const { userLocation } = useLocationContext();

  const [selectedCity, setSelectedCity] = useState<string>(() => {
    if (userLocation?.city && CITY_BENCHMARKS[userLocation.city]) {
      return userLocation.city;
    }
    return 'Kota';
  });

  const [roomType, setRoomType] = useState<'singleAC' | 'singleNonAC' | 'doubleAC' | 'doubleNonAC' | 'tripleSharing'>('doubleNonAC');
  const [foodPlan, setFoodPlan] = useState<'fullMess3Meals' | 'twoMealsTiffin' | 'selfCooking' | 'budgetThali'>('fullMess3Meals');
  const [libraryShift, setLibraryShift] = useState<'twentyFourSevenAC' | 'twelveHourShift' | 'sixHourShift' | 'none'>('twelveHourShift');
  const [commuteMode, setCommuteMode] = useState<'walking' | 'bicycle' | 'autoRickshaw' | 'twoWheelerPetrol'>('walking');
  const [laundryMode, setLaundryMode] = useState<'selfWash' | 'maidOrHostelService' | 'commercialLaundry'>('maidOrHostelService');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const benchmark = useMemo(() => {
    return getCityBenchmark(selectedCity);
  }, [selectedCity]);

  // Calculated costs
  const rentCost = benchmark.rentRanges[roomType] || 4500;
  const messCost = benchmark.messRanges[foodPlan] || 3000;
  const libraryCost = benchmark.libraryRanges[libraryShift] || 800;
  const commuteCost = benchmark.commuteRanges[commuteMode] || 0;
  const laundryCost = benchmark.laundryRanges[laundryMode] || 400;
  const miscCost = benchmark.miscAllowance || 750;

  const totalMonthly = rentCost + messCost + libraryCost + commuteCost + laundryCost + miscCost;

  const handleSaveBudget = () => {
    const budgetData = {
      city: selectedCity,
      roomType,
      foodPlan,
      libraryShift,
      commuteMode,
      laundryMode,
      totalMonthly,
      savedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('user_saved_student_budget', JSON.stringify(budgetData));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.warn('Could not save budget to storage', e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Student Living Cost Manager</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Monthly Budget & Living Costs
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Personalize and plan your expenses across room rent, 3-time meals, AC library pass & commute.
          </p>
        </div>

        <Link to="/budget">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs font-bold text-white transition-all shadow-md group cursor-pointer"
          >
            <span>Full Calculator Mode</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Target City Selector */}
      <GlassCard className="p-6" intensity="low">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00E5FF]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Study Hub / Target City
            </h3>
          </div>
          <span className="text-xs text-gray-400">
            Average in {selectedCity}: <strong className="text-white">₹{benchmark.avgTotalMonthly.toLocaleString('en-IN')}/mo</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_HUBS.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-slate-950 font-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 border border-white/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Interactive Expense Configurator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Room Rent */}
        <GlassCard className="p-5" intensity="low">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF]">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white">Room & Accommodation</span>
            </div>
            <span className="text-sm font-black text-[#00E5FF]">₹{rentCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'singleAC', label: 'Single Room (AC)' },
              { id: 'singleNonAC', label: 'Single (Cooler/Fan)' },
              { id: 'doubleAC', label: '2-Sharing (AC)' },
              { id: 'doubleNonAC', label: '2-Sharing (Cooler)' },
              { id: 'tripleSharing', label: '3-Sharing Budget' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setRoomType(opt.id as any)}
                className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer ${
                  roomType === opt.id
                    ? 'bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-white font-bold'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* 2. Food & Mess */}
        <GlassCard className="p-5" intensity="low">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white">Food & Mess Service</span>
            </div>
            <span className="text-sm font-black text-amber-400">₹{messCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'fullMess3Meals', label: 'Full 3-Meals Daily' },
              { id: 'twoMealsTiffin', label: '2-Meals Lunch+Dinner' },
              { id: 'budgetThali', label: 'Budget Student Thali' },
              { id: 'selfCooking', label: 'Self / Shared Cooking' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFoodPlan(opt.id as any)}
                className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer ${
                  foodPlan === opt.id
                    ? 'bg-amber-500/20 border border-amber-500/40 text-white font-bold'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* 3. Silent Study Library */}
        <GlassCard className="p-5" intensity="low">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white">AC Study Library</span>
            </div>
            <span className="text-sm font-black text-purple-400">₹{libraryCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'twentyFourSevenAC', label: '24x7 Reserved AC Seat' },
              { id: 'twelveHourShift', label: '12-Hour Morning/Night' },
              { id: 'sixHourShift', label: '6-Hour Part Time' },
              { id: 'none', label: 'Study in Room (₹0)' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLibraryShift(opt.id as any)}
                className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer ${
                  libraryShift === opt.id
                    ? 'bg-purple-500/20 border border-purple-500/40 text-white font-bold'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* 4. Commute & Daily Travel */}
        <GlassCard className="p-5" intensity="low">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white">Commute & Travel</span>
            </div>
            <span className="text-sm font-black text-emerald-400">₹{commuteCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'walking', label: 'Walking / Hostels (₹0)' },
              { id: 'bicycle', label: 'Bicycle (₹100)' },
              { id: 'autoRickshaw', label: 'Auto / E-Rickshaw' },
              { id: 'twoWheelerPetrol', label: 'Bike / Scooter Fuel' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCommuteMode(opt.id as any)}
                className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer ${
                  commuteMode === opt.id
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-white font-bold'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Total Monthly Projection Card */}
      <LiquidGlassCard className="p-6 sm:p-8" glowColor="rgba(0, 229, 255, 0.3)">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Projected Student Expense</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ₹{totalMonthly.toLocaleString('en-IN')}
              </span>
              <span className="text-gray-400 text-sm font-semibold">/ month</span>
            </div>
            <p className="text-gray-300 text-xs mt-2 max-w-md">
              Estimated living expenses for {selectedCity}, including room rent, mess, library pass, and daily student pocket allowance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleSaveBudget}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer ${
                isSaved
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-white/[0.1] hover:bg-white/[0.18] text-white border border-white/20'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Target Budget Saved!</span>
                </>
              ) : (
                <>
                  <Sliders className="w-4 h-4 text-[#00E5FF]" />
                  <span>Save Target to Profile</span>
                </>
              )}
            </button>

            <Link
              to="/search"
              state={{ city: selectedCity }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-slate-950 text-xs font-black shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all hover:scale-[1.02] w-full sm:w-auto group"
            >
              <span>Explore Verified PGs in {selectedCity}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-semibold">
            <span>Expense Distribution</span>
            <span>{selectedCity} Benchmark</span>
          </div>
          <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/10">
            <div style={{ width: `${(rentCost / totalMonthly) * 100}%` }} className="bg-[#00E5FF] rounded-full" title={`Rent: ₹${rentCost}`} />
            <div style={{ width: `${(messCost / totalMonthly) * 100}%` }} className="bg-amber-400 rounded-full" title={`Mess: ₹${messCost}`} />
            <div style={{ width: `${(libraryCost / totalMonthly) * 100}%` }} className="bg-purple-400 rounded-full" title={`Library: ₹${libraryCost}`} />
            <div style={{ width: `${((commuteCost + laundryCost + miscCost) / totalMonthly) * 100}%` }} className="bg-emerald-400 rounded-full" title={`Other: ₹${commuteCost + laundryCost + miscCost}`} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
              <span>Room Rent (₹{rentCost})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Food & Mess (₹{messCost})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Study Library (₹{libraryCost})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Misc & Commute (₹{commuteCost + laundryCost + miscCost})</span>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* City Specific Money-Saving Tips */}
      {benchmark.savingTips && benchmark.savingTips.length > 0 && (
        <GlassCard className="p-6" intensity="low">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Smart Student Saving Tips for {selectedCity}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benchmark.savingTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
