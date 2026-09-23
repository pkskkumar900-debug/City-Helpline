import React, { useState } from 'react';
import { 
  Users, Search, Shield, Ban, Trash2, CheckCircle2, 
  Briefcase, Phone, MapPin, Calendar, ExternalLink, Info
} from 'lucide-react';
import { UserProfile, Role } from '../../types';

interface AdminUsersTabProps {
  users: UserProfile[];
  onRoleChange: (uid: string, newRole: Role) => void;
  onBanToggle: (uid: string, currentBanned: boolean) => void;
  onDeleteUser: (uid: string) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  users,
  onRoleChange,
  onBanToggle,
  onDeleteUser,
}) => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'contributor' | 'admin'>('all');
  const [search, setSearch] = useState('');
  const [inspectUser, setInspectUser] = useState<UserProfile | null>(null);

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const q = search.toLowerCase();
    const matchesSearch = search === '' ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.city?.toLowerCase().includes(q) ||
      u.businessName?.toLowerCase().includes(q) ||
      u.phone?.includes(q);

    return matchesRole && matchesSearch;
  });

  const contributorsCount = users.filter(u => u.role === 'contributor').length;
  const adminsCount = users.filter(u => u.role === 'admin').length;
  const studentsCount = users.filter(u => u.role === 'user').length;
  const bannedCount = users.filter(u => u.banned).length;

  return (
    <div className="space-y-6">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Role Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === 'all' ? 'bg-white/15 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('contributor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === 'contributor' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30' : 'text-gray-400 hover:text-[#00E5FF]'
            }`}
          >
            Contributors ({contributorsCount})
          </button>
          <button
            onClick={() => setRoleFilter('user')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === 'user' ? 'bg-[#8A2BE2]/20 text-[#8A2BE2] border border-[#8A2BE2]/30' : 'text-gray-400 hover:text-[#8A2BE2]'
            }`}
          >
            Students ({studentsCount})
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              roleFilter === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-gray-400 hover:text-amber-300'
            }`}
          >
            Admins ({adminsCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/50"
          />
        </div>

      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">User Profile</th>
                <th className="py-3.5 px-4">Contact & Location</th>
                <th className="py-3.5 px-4">Account Role</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300">
              {filtered.map((u) => (
                <tr 
                  key={u.uid} 
                  className={`hover:bg-white/[0.03] transition-colors ${
                    u.banned ? 'opacity-60 bg-rose-500/[0.03]' : ''
                  }`}
                >
                  {/* Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-sm shrink-0">
                        {u.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm truncate">{u.name}</span>
                          {u.banned && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              Banned
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-[11px] truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact & Location */}
                  <td className="py-3.5 px-4">
                    <div className="text-white font-medium">{u.phone || 'No phone'}</div>
                    <div className="text-gray-400 text-[11px]">{u.city || 'Location unassigned'}</div>
                  </td>

                  {/* Role Selector */}
                  <td className="py-3.5 px-4">
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.uid, e.target.value as Role)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border focus:outline-none transition-all [&>option]:bg-[#0B0E14] ${
                        u.role === 'admin' ? 'bg-[#8A2BE2]/20 text-[#8A2BE2] border-[#8A2BE2]/40' :
                        u.role === 'contributor' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40' :
                        'bg-white/5 text-gray-300 border-white/10'
                      }`}
                    >
                      <option value="user">Student / User</option>
                      <option value="contributor">Contributor (Provider)</option>
                      <option value="admin">System Admin</option>
                    </select>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 text-gray-400">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>

                  {/* Controls */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* View Provider Info Drawer */}
                      {u.role === 'contributor' && (
                        <button
                          onClick={() => setInspectUser(u)}
                          className="p-2 rounded-xl text-gray-400 hover:text-[#00E5FF] hover:bg-white/5 transition-colors"
                          title="View Business Profile"
                        >
                          <Briefcase className="w-4 h-4" />
                        </button>
                      )}

                      {/* Ban / Unban */}
                      <button
                        onClick={() => onBanToggle(u.uid, u.banned || false)}
                        className={`p-2 rounded-xl transition-colors ${
                          u.banned 
                            ? 'text-emerald-400 hover:bg-emerald-500/10' 
                            : 'text-amber-400 hover:bg-amber-500/10'
                        }`}
                        title={u.banned ? "Unban Account" : "Ban Account"}
                      >
                        <Ban className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteUser(u.uid)}
                        className="p-2 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete User Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-500">
                    <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-white text-sm">No users found</p>
                    <p className="text-xs text-gray-500 mt-1">Try adjusting search parameters or role filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contributor Inspect Modal */}
      {inspectUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B0E14] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold">
                <Briefcase className="w-5 h-5 text-[#00E5FF]" />
                <span>Provider Business Profile</span>
              </div>
              <button 
                onClick={() => setInspectUser(null)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-400">Business Name</p>
                <p className="text-white font-bold text-sm mt-0.5">{inspectUser.businessName || inspectUser.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Business Type</p>
                <p className="text-white font-semibold mt-0.5">{inspectUser.businessType || 'PG / Hostel / Mess'}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone & Contact</p>
                <p className="text-[#00E5FF] font-semibold mt-0.5">{inspectUser.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-400">City & Address</p>
                <p className="text-white mt-0.5">{inspectUser.city ? `${inspectUser.city} (${inspectUser.pincode || ''})` : 'Unassigned'}</p>
                <p className="text-gray-400 mt-0.5">{inspectUser.address || ''}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
