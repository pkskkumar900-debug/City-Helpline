import React, { useState, useEffect } from 'react';
import { RoommateProfile } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { getUserRoommateProfile, toggleRoommateStatus, deleteRoommateProfile } from '../../lib/roommateService';
import { RoommateCard } from '../roommate/RoommateCard';
import { RoommateModal } from '../roommate/RoommateModal';
import { GlassCard } from '../ui/GlassCard';
import { Link } from 'react-router-dom';
import { 
  BedDouble, PlusCircle, Sparkles, CheckCircle2, 
  ArrowRight, Users, Eye, EyeOff, Trash2, Edit3
} from 'lucide-react';
import { toast } from 'sonner';

export function ProfileRoommateSection() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<RoommateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const load = async () => {
      try {
        const p = await getUserRoommateProfile(currentUser.uid);
        setProfile(p);
      } catch (e) {
        console.warn('Could not load user roommate profile:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  const handleToggleStatus = async () => {
    if (!profile || !currentUser) return;
    const newStatus = profile.status === 'active' ? 'found' : 'active';
    try {
      await toggleRoommateStatus(profile.id, currentUser.uid, newStatus);
      setProfile({ ...profile, status: newStatus });
      toast.success(newStatus === 'active' ? 'Roommate card is now publicly visible!' : 'Roommate card paused (marked as found).');
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!profile || !currentUser) return;
    if (confirm('Are you sure you want to remove your roommate listing?')) {
      try {
        await deleteRoommateProfile(profile.id, currentUser.uid);
        setProfile(null);
        toast.success('Roommate listing removed.');
      } catch (e) {
        toast.error('Failed to delete profile');
      }
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-[#00E5FF]">
            <BedDouble className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              Flatmate & Roommate Finder
            </h2>
            <p className="text-xs text-gray-400">
              Find serious study partners, share rent, and manage your roommate listing.
            </p>
          </div>
        </div>

        <Link
          to="/roommates"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-[#00E5FF] border border-white/10 transition-all shrink-0 active:scale-95"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Browse All Flatmates</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {loading ? (
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-center text-xs text-gray-400 animate-pulse">
          Loading roommate profile...
        </div>
      ) : profile ? (
        /* User already has a profile */
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${profile.status === 'active' ? 'bg-emerald-400 animate-ping' : 'bg-gray-400'}`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Status: {profile.status === 'active' ? '🟢 Actively Looking for Roommate' : '⚪ Paused (Roommate Found)'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Target: {profile.targetExam} • Budget: ₹{profile.budgetMin.toLocaleString()} - {profile.budgetMax.toLocaleString()}/mo in {profile.locality}, {profile.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  profile.status === 'active'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
              >
                {profile.status === 'active' ? 'Pause Listing' : 'Make Active'}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-all cursor-pointer"
                title="Edit Preferences"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#00E5FF]" />
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all cursor-pointer"
                title="Delete Listing"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="max-w-md">
            <RoommateCard
              profile={profile}
              onConnect={() => {}}
              isCurrentUser={true}
              onEdit={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      ) : (
        /* Not listed yet card */
        <GlassCard className="p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden" intensity="low">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center text-[#00E5FF] shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-white">
                  Looking for a Roommate or Flatmate?
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-400/20 text-[#00E5FF]">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                List your exam prep (NEET/JEE/UPSC), budget, locality, and habits (Night Owl/Early Bird, Veg/Non-Veg). Verified students will connect directly via WhatsApp or call.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Myself as Roommate</span>
            </button>
          </div>
        </GlassCard>
      )}

      {/* Roommate Edit/Create Modal */}
      <RoommateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingProfile={profile}
        onSaved={newP => {
          setProfile(newP);
        }}
      />
    </div>
  );
}
