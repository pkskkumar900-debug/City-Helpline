import React, { useState, useEffect } from 'react';
import { RoommateProfile, RoomType, StudyHabit, DietHabit } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useLocationContext } from '../../contexts/LocationContext';
import { saveRoommateProfile } from '../../lib/roommateService';
import { motion } from 'motion/react';
import { 
  X, BedDouble, User, Phone, MapPin, IndianRupee, 
  BookOpen, Sparkles, Moon, Utensils, CheckCircle2, Loader2, AlertCircle
} from 'lucide-react';
import { ALL_CITIES } from '../../lib/constants';
import { toast } from 'sonner';

interface RoommateModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingProfile?: RoommateProfile | null;
  onSaved: (savedProfile: RoommateProfile) => void;
}

export function RoommateModal({ isOpen, onClose, existingProfile, onSaved }: RoommateModalProps) {
  const { currentUser, userProfile } = useAuth();
  const { userLocation } = useLocationContext();

  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [targetExam, setTargetExam] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [budgetMin, setBudgetMin] = useState<number>(3500);
  const [budgetMax, setBudgetMax] = useState<number>(5500);
  const [roomType, setRoomType] = useState<RoomType>('Shared Room');
  const [studyTime, setStudyTime] = useState<StudyHabit>('Night Owl (10 PM - 4 AM)');
  const [dietary, setDietary] = useState<DietHabit>('Strict Vegetarian');
  const [cleanliness, setCleanliness] = useState<'High / Very Neat' | 'Moderate / Casual'>('High / Very Neat');
  const [smokingDrinking, setSmokingDrinking] = useState<'Strict No' | 'No Smoking in Room'>('Strict No');
  const [userPhone, setUserPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [moveInDate, setMoveInDate] = useState('Immediate');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState<'active' | 'found'>('active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingProfile) {
      setUserName(existingProfile.userName || '');
      setGender(existingProfile.gender || 'male');
      setTargetExam(existingProfile.targetExam || '');
      setCity(existingProfile.city || '');
      setLocality(existingProfile.locality || '');
      setBudgetMin(existingProfile.budgetMin || 3500);
      setBudgetMax(existingProfile.budgetMax || 5500);
      setRoomType(existingProfile.roomType || 'Shared Room');
      setStudyTime(existingProfile.habits?.studyTime || 'Night Owl (10 PM - 4 AM)');
      setDietary(existingProfile.habits?.dietary || 'Strict Vegetarian');
      setCleanliness(existingProfile.habits?.cleanliness || 'High / Very Neat');
      setSmokingDrinking(existingProfile.habits?.smokingDrinking || 'Strict No');
      setUserPhone(existingProfile.userPhone || '');
      setWhatsappNumber(existingProfile.whatsappNumber || '');
      setMoveInDate(existingProfile.moveInDate || 'Immediate');
      setBio(existingProfile.bio || '');
      setStatus(existingProfile.status || 'active');
    } else {
      setUserName(userProfile?.name || currentUser?.displayName || '');
      setCity(userLocation?.city || 'Kota');
      setLocality(userLocation?.area || '');
      setUserPhone(userProfile?.phone || '');
      setWhatsappNumber(userProfile?.phone || '');
      setTargetExam('NEET 2025');
      setBio('Looking for a focused and peaceful roommate to share room rent & electricity. Serious study environment.');
      setStatus('active');
    }
  }, [existingProfile, currentUser, userProfile, userLocation]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please sign in to list your roommate profile');
      return;
    }

    if (!userName.trim() || !city.trim() || !locality.trim() || !userPhone.trim() || !bio.trim()) {
      toast.error('Please fill in all required fields (Name, City, Locality, Phone, Bio)');
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = await saveRoommateProfile({
        id: existingProfile?.id,
        userId: currentUser.uid,
        userName: userName.trim(),
        userEmail: currentUser.email || undefined,
        userPhone: userPhone.trim(),
        whatsappNumber: (whatsappNumber || userPhone).trim(),
        gender,
        city: city.trim(),
        locality: locality.trim(),
        budgetMin: Number(budgetMin) || 3000,
        budgetMax: Number(budgetMax) || 6000,
        roomType,
        targetExam: targetExam.trim() || 'Student',
        habits: {
          studyTime,
          dietary,
          cleanliness,
          smokingDrinking
        },
        bio: bio.trim(),
        moveInDate,
        status,
        photoURL: userProfile?.photoURL || undefined
      });

      toast.success(existingProfile ? 'Roommate profile updated successfully!' : '🎉 You are now listed on the Roommate Finder!');
      onSaved(saved);
      onClose();
    } catch (err: any) {
      console.error('Error saving roommate profile:', err);
      toast.error('Failed to save profile. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-[#090D16] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.15)] my-auto max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-[#00E5FF]">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {existingProfile ? 'Edit Roommate Profile' : 'List Yourself as a Flatmate / Roommate'}
              </h2>
              <p className="text-xs text-gray-400">
                Find verified students, share rent, and study together peacefully.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="e.g. Rohit Kumar (Allen NEET)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Gender *</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="male">👨 Male / Boys</option>
                <option value="female">👩 Female / Girls</option>
                <option value="other">Any / Other</option>
              </select>
            </div>
          </div>

          {/* Row 2: Target Exam & Room Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Target Exam / Course *</label>
              <input
                type="text"
                required
                value={targetExam}
                onChange={e => setTargetExam(e.target.value)}
                placeholder="e.g. NEET UG 2025 (Allen), JEE Adv, UPSC"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Looking For *</label>
              <select
                value={roomType}
                onChange={e => setRoomType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="Shared Room">Double / Shared Room Partner</option>
                <option value="Private Room">Private Room in Shared Flat</option>
                <option value="Looking for 1RK/1BHK Flatmate">1RK / 1BHK Flatmate</option>
                <option value="Any">Any Suitable Option</option>
              </select>
            </div>
          </div>

          {/* Row 3: City & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">City *</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              >
                {ALL_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Locality / Landmark *</label>
              <input
                type="text"
                required
                value={locality}
                onChange={e => setLocality(e.target.value)}
                placeholder="e.g. Landmark City, Talwandi, Boring Road"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Row 4: Budget Range & Move In Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Min Budget (₹/mo)</label>
              <input
                type="number"
                min="1000"
                step="500"
                value={budgetMin}
                onChange={e => setBudgetMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Max Budget (₹/mo)</label>
              <input
                type="number"
                min="1000"
                step="500"
                value={budgetMax}
                onChange={e => setBudgetMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Move-In Timeline</label>
              <select
                value={moveInDate}
                onChange={e => setMoveInDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="Immediate">Immediate / Available Now</option>
                <option value="Within 10 Days">Within 10 Days</option>
                <option value="Next Month 1st">Next Month 1st</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Row 5: Habits & Preferences */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Study Habits & Living Style
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Study Hours</label>
                <select
                  value={studyTime}
                  onChange={e => setStudyTime(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                >
                  <option value="Night Owl (10 PM - 4 AM)">🌙 Night Owl (Late Night Study)</option>
                  <option value="Early Bird (5 AM - 11 PM)">🌅 Early Bird (Morning Study)</option>
                  <option value="Flexible">⏱️ Flexible / Moderate</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Diet / Food</label>
                <select
                  value={dietary}
                  onChange={e => setDietary(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                >
                  <option value="Strict Vegetarian">🥗 Strict Vegetarian</option>
                  <option value="Non-Vegetarian">🍗 Non-Vegetarian Friendly</option>
                  <option value="No Preference">No Preference</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Cleanliness</label>
                <select
                  value={cleanliness}
                  onChange={e => setCleanliness(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                >
                  <option value="High / Very Neat">✨ High / Very Neat</option>
                  <option value="Moderate / Casual">👍 Moderate / Casual</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Smoking & Drinking</label>
                <select
                  value={smokingDrinking}
                  onChange={e => setSmokingDrinking(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                >
                  <option value="Strict No">🚭 Strict No (Strictly Prohibited)</option>
                  <option value="No Smoking in Room">No Smoking in Room</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 6: Phone & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Calling Phone *</label>
              <input
                type="tel"
                required
                value={userPhone}
                onChange={e => setUserPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">WhatsApp Number</label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="WhatsApp number for instant chat"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Row 7: Bio / Note */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">About Your Room & Expectations *</label>
            <textarea
              required
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="e.g. Already rented a 2BHK flat near Allen Sangyan. Need 1 flatmate to split rent. Serious study environment, high-speed Wi-Fi included."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          {/* Active status switch if editing */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="text-xs font-bold text-white block">Listing Visibility Status</span>
              <span className="text-[11px] text-gray-400">
                {status === 'active' ? '🟢 Publicly visible in Roommate Finder' : '⚪ Paused (Roommate Found)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStatus(status === 'active' ? 'found' : 'active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                status === 'active' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {status === 'active' ? 'Active: Looking' : 'Mark: Roommate Found'}
            </button>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{existingProfile ? 'Update Roommate Card' : 'Publish Roommate Listing'}</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
