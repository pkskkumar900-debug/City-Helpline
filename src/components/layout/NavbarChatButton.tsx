import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUnreadChatCount } from '../../hooks/useUnreadChatCount';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarChatButtonProps {
  className?: string;
  isMobile?: boolean;
}

/**
 * Segmented circular minimalist speech bubble icon matching reference design
 */
export const SegmentedChatIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
  >
    {/* Segment 1: Top Arc */}
    <path d="M 7.6 6.8 A 7.2 7.2 0 0 1 16.4 6.8" />

    {/* Segment 2: Right Arc */}
    <path d="M 19 10.2 A 7.2 7.2 0 0 1 16.6 16.8" />

    {/* Segment 3: Bottom-Left Arc with Speech Bubble Corner/Tail */}
    <path d="M 13.4 19.1 C 11.9 19.1 10.5 18.7 9.3 18.1 L 6.3 19.8 C 5.7 20.1 5.1 19.7 5.3 19 L 5.8 16.7 C 4.9 15.3 4.5 13.7 4.5 12 C 4.5 10.9 4.8 9.8 5.3 8.8" />
  </svg>
);

export const NavbarChatButton: React.FC<NavbarChatButtonProps> = ({ className = '', isMobile = false }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const unreadCount = useUnreadChatCount();
  const isActive = location.pathname.startsWith('/messages');

  const targetPath = currentUser ? '/messages' : '/login';

  return (
    <Link
      to={targetPath}
      aria-label="Direct Messages"
      title={unreadCount > 0 ? `${unreadCount} new message${unreadCount > 1 ? 's' : ''}` : "Messages"}
      className={`relative group inline-flex items-center justify-center rounded-full select-none transition-all duration-300 active:scale-90 cursor-pointer ${
        isMobile ? 'w-9 h-9' : 'w-10 h-10'
      } ${
        isActive
          ? 'bg-gradient-to-b from-[#1c2c44] via-[#101b2c] to-[#0a111e] border border-[#00E5FF] text-[#00E5FF] shadow-[0_0_22px_rgba(0,229,255,0.45),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_0_12px_rgba(0,229,255,0.25)]'
          : 'bg-gradient-to-b from-[#2a3042] via-[#171b26] to-[#0e111a] border border-white/20 hover:border-[#00E5FF]/70 text-white hover:text-[#00E5FF] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.28),inset_0_-1px_2px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_22px_rgba(0,229,255,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)]'
      } ${className}`}
    >
      {/* Ambient background bloom on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00E5FF]/0 via-[#00E5FF]/15 to-[#8A2BE2]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

      {/* Segmented Chat Icon from reference image */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <SegmentedChatIcon
          className={`${
            isMobile ? 'w-4 h-4' : 'w-[18px] h-[18px]'
          } transition-all duration-300 ${
            isActive 
              ? 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' 
              : 'text-white group-hover:text-[#00E5FF] group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]'
          }`}
        />
      </div>

      {/* Glowing Ruby/Neon Unread Badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full border-2 border-[#0B0F1A] shadow-[0_0_12px_rgba(244,63,94,0.95)] animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  );
};
