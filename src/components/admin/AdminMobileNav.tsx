import React from 'react';
import { LayoutDashboard, Building2, Users, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminMobileNavProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  pendingCount: number;
}

export const AdminMobileNav: React.FC<AdminMobileNavProps> = ({
  activeTab,
  onSelectTab,
  pendingCount,
}) => {
  const tabs: Array<{
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'listings', label: 'Directory', icon: Building2, badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'marketplace', label: 'Market', icon: ShoppingBag },
    { id: 'broadcast', label: 'Ops Tools', icon: MoreHorizontal },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07090E]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-1 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-500 text-black shadow-md">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'font-bold text-white' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-6 h-0.5 bg-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
